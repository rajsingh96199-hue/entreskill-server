import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

// ── Get Profile ───────────────────────────────────────────────────────────────
// GET /api/v1/profile
// Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({
    success: true,
    data: user
  })
})

// ── Update Skills ─────────────────────────────────────────────────────────────
// PUT /api/v1/profile/skills
// Private
export const updateSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body

  if (!skills || !Array.isArray(skills)) {
    res.status(400)
    throw new Error('Please provide skills as an array')
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { skills },
    { new: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Skills updated successfully',
    data: user
  })
})

// ── Update Interests ──────────────────────────────────────────────────────────
// PUT /api/v1/profile/interests
// Private
export const updateInterests = asyncHandler(async (req, res) => {
  const { interests } = req.body

  if (!interests || !Array.isArray(interests)) {
    res.status(400)
    throw new Error('Please provide interests as an array')
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { interests },
    { new: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Interests updated successfully',
    data: user
  })
})

// ── Update Experience ─────────────────────────────────────────────────────────
// PUT /api/v1/profile/experience
// Private
export const updateExperience = asyncHandler(async (req, res) => {
  const { experience } = req.body

  if (!experience) {
    res.status(400)
    throw new Error('Please provide experience level')
  }

  if (!['beginner', 'intermediate', 'expert'].includes(experience)) {
    res.status(400)
    throw new Error('Experience must be beginner, intermediate or expert')
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { experience },
    { new: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Experience updated successfully',
    data: user
  })
})

// ── Update Full Profile ───────────────────────────────────────────────────────
// PUT /api/v1/profile
// Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, skills, interests, experience } = req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, skills, interests, experience },
    { new: true, runValidators: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  })
})