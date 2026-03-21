import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import BusinessIdea from '../models/BusinessIdea.js'

// ── Get All Users ─────────────────────────────────────────────────────────────
// GET /api/v1/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 })
  res.json({ success: true, count: users.length, data: users })
})

// ── Delete User ───────────────────────────────────────────────────────────────
// DELETE /api/v1/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  await user.deleteOne()
  res.json({ success: true, message: 'User deleted successfully' })
})

// ── Update User Role ──────────────────────────────────────────────────────────
// PUT /api/v1/admin/users/:id/role
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body
  if (!['user', 'mentor', 'admin'].includes(role)) {
    res.status(400)
    throw new Error('Invalid role')
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password')

  res.json({ success: true, message: 'Role updated', data: user })
})

// ── Get All Ideas ─────────────────────────────────────────────────────────────
// GET /api/v1/admin/ideas
export const getAllIdeasAdmin = asyncHandler(async (req, res) => {
  const ideas = await BusinessIdea.find({}).sort({ createdAt: -1 })
  res.json({ success: true, count: ideas.length, data: ideas })
})

// ── Create Idea ───────────────────────────────────────────────────────────────
// POST /api/v1/admin/ideas
export const createIdeaAdmin = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.create(req.body)
  res.status(201).json({ success: true, message: 'Idea created', data: idea })
})

// ── Delete Idea ───────────────────────────────────────────────────────────────
// DELETE /api/v1/admin/ideas/:id
export const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findById(req.params.id)
  if (!idea) {
    res.status(404)
    throw new Error('Idea not found')
  }
  await idea.deleteOne()
  res.json({ success: true, message: 'Idea deleted successfully' })
})

// ── Toggle Idea Active Status ─────────────────────────────────────────────────
// PUT /api/v1/admin/ideas/:id/toggle
export const toggleIdeaStatus = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findById(req.params.id)
  if (!idea) {
    res.status(404)
    throw new Error('Idea not found')
  }
  idea.isActive = !idea.isActive
  await idea.save()
  res.json({ success: true, message: `Idea ${idea.isActive ? 'activated' : 'deactivated'}`, data: idea })
})

// ── Get Platform Stats ────────────────────────────────────────────────────────
// GET /api/v1/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalIdeas, totalMentors] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    BusinessIdea.countDocuments({}),
    User.countDocuments({ role: 'mentor' }),
  ])

  res.json({
    success: true,
    data: { totalUsers, totalIdeas, totalMentors }
  })
})