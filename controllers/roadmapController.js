import asyncHandler from 'express-async-handler'
import Roadmap from '../models/Roadmap.js'
import User from '../models/User.js'

// ── Get Roadmap by Idea ID ────────────────────────────────────────────────────
// GET /api/v1/roadmaps/:ideaId
export const getRoadmapByIdeaId = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findOne({ ideaId: req.params.ideaId })
    .populate('ideaId', 'title icon category')

  if (!roadmap) {
    res.status(404)
    throw new Error('Roadmap not found for this idea')
  }

  res.json({ success: true, data: roadmap })
})

// ── Get All Roadmaps ──────────────────────────────────────────────────────────
// GET /api/v1/roadmaps
export const getAllRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await Roadmap.find({})
    .populate('ideaId', 'title icon category')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: roadmaps.length, data: roadmaps })
})

// ── Create Roadmap (Admin) ────────────────────────────────────────────────────
// POST /api/v1/roadmaps
export const createRoadmap = asyncHandler(async (req, res) => {
  const existing = await Roadmap.findOne({ ideaId: req.body.ideaId })
  if (existing) {
    res.status(400)
    throw new Error('Roadmap already exists for this idea')
  }

  const roadmap = await Roadmap.create(req.body)
  res.status(201).json({ success: true, data: roadmap })
})

// ── Update Roadmap (Admin) ────────────────────────────────────────────────────
// PUT /api/v1/roadmaps/:id
export const updateRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  )

  if (!roadmap) {
    res.status(404)
    throw new Error('Roadmap not found')
  }

  res.json({ success: true, data: roadmap })
})

// ── Update Step Progress ──────────────────────────────────────────────────────
// PUT /api/v1/roadmaps/:id/progress
export const updateProgress = asyncHandler(async (req, res) => {
  const { completedSteps } = req.body

  const user = await User.findById(req.user._id)

  // Find existing progress for this roadmap
  const progressIndex = user.progress
    ? user.progress.findIndex(p => p.roadmapId?.toString() === req.params.id)
    : -1

  if (progressIndex > -1) {
    user.progress[progressIndex].completedSteps = completedSteps
  } else {
    if (!user.progress) user.progress = []
    user.progress.push({ roadmapId: req.params.id, completedSteps })
  }

  await user.save()

  res.json({
    success: true,
    message: 'Progress updated!',
    data: { roadmapId: req.params.id, completedSteps }
  })
})

// ── Get User Progress ─────────────────────────────────────────────────────────
// GET /api/v1/roadmaps/:id/progress
export const getProgress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  const progress = user.progress
    ? user.progress.find(p => p.roadmapId?.toString() === req.params.id)
    : null

  res.json({
    success: true,
    data: progress || { roadmapId: req.params.id, completedSteps: [] }
  })
})