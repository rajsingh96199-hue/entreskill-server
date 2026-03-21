import asyncHandler from 'express-async-handler'
import BusinessIdea from '../models/BusinessIdea.js'
import User from '../models/User.js'

// ── Get All Ideas ─────────────────────────────────────────────────────────────
// GET /api/v1/ideas
// Public
export const getAllIdeas = asyncHandler(async (req, res) => {
  const { category, difficulty, search } = req.query

  let filter = { isActive: true }

  if (category) filter.category = category
  if (difficulty) filter.difficulty = difficulty
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ]
  }

  const ideas = await BusinessIdea.find(filter).sort({ createdAt: -1 })

  res.json({
    success: true,
    count: ideas.length,
    data: ideas
  })
})

// ── Get Recommended Ideas ─────────────────────────────────────────────────────
// GET /api/v1/ideas/recommended
// Private
export const getRecommendedIdeas = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  const { skills, interests, experience } = user

  // Get all active ideas
  const allIdeas = await BusinessIdea.find({ isActive: true })

  // Score each idea based on user profile
  const scoredIdeas = allIdeas.map(idea => {
    let score = 0

    // Match skills
    idea.requiredSkills.forEach(skill => {
      if (skills.includes(skill)) score += 2
    })

    // Match interests
    idea.interests.forEach(interest => {
      if (interests.includes(interest)) score += 1
    })

    // Match difficulty to experience
    if (idea.difficulty === experience) score += 1

    // Calculate match percentage
    const maxScore = (idea.requiredSkills.length * 2) +
                     idea.interests.length + 1
    const matchPct = maxScore > 0
      ? Math.min(Math.round((score / maxScore) * 100), 99)
      : 50

    return {
      ...idea.toObject(),
      matchScore: score,
      matchPercentage: matchPct
    }
  })

  // Filter ideas with score > 0 and sort by score
  const recommended = scoredIdeas
    .filter(idea => idea.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)

  // If no matches found return top 3 ideas
  const result = recommended.length > 0
    ? recommended
    : scoredIdeas.slice(0, 3)

  res.json({
    success: true,
    count: result.length,
    data: result
  })
})

// ── Get Single Idea ───────────────────────────────────────────────────────────
// GET /api/v1/ideas/:id
// Public
export const getIdeaById = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findById(req.params.id)

  if (!idea) {
    res.status(404)
    throw new Error('Business idea not found')
  }

  res.json({
    success: true,
    data: idea
  })
})

// ── Save / Bookmark Idea ──────────────────────────────────────────────────────
// POST /api/v1/ideas/:id/save
// Private
export const saveIdea = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const ideaId = req.params.id

  // Check if idea exists
  const idea = await BusinessIdea.findById(ideaId)
  if (!idea) {
    res.status(404)
    throw new Error('Business idea not found')
  }

  // Check if already saved
  const alreadySaved = user.savedIdeas.includes(ideaId)

  if (alreadySaved) {
    // Unsave it
    user.savedIdeas = user.savedIdeas.filter(
      id => id.toString() !== ideaId
    )
    await user.save()
    res.json({
      success: true,
      message: 'Idea removed from saved list',
      saved: false
    })
  } else {
    // Save it
    user.savedIdeas.push(ideaId)
    await user.save()
    res.json({
      success: true,
      message: 'Idea saved successfully',
      saved: true
    })
  }
})

// ── Get Saved Ideas ───────────────────────────────────────────────────────────
// GET /api/v1/ideas/saved
// Private
export const getSavedIdeas = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('savedIdeas')

  res.json({
    success: true,
    count: user.savedIdeas.length,
    data: user.savedIdeas
  })
})

// ── Create Idea (Admin) ───────────────────────────────────────────────────────
// POST /api/v1/ideas
// Private/Admin
export const createIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Business idea created successfully',
    data: idea
  })
})