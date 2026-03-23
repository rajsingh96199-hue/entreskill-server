import asyncHandler from 'express-async-handler'
import Resource from '../models/Resource.js'

// ── Get All Resources ─────────────────────────────────────────────────────────
// GET /api/v1/resources
export const getAllResources = asyncHandler(async (req, res) => {
  const { type, category, ideaId, search } = req.query

  let filter = { isApproved: true }

  if (type) filter.type = type
  if (category) filter.category = category
  if (ideaId) filter.ideaId = ideaId
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ]
  }

  const resources = await Resource.find(filter)
    .populate('uploadedBy', 'name')
    .populate('ideaId', 'title icon')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: resources.length, data: resources })
})

// ── Get Single Resource ───────────────────────────────────────────────────────
// GET /api/v1/resources/:id
export const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)
    .populate('uploadedBy', 'name')
    .populate('ideaId', 'title icon')

  if (!resource) {
    res.status(404)
    throw new Error('Resource not found')
  }

  // Increment views
  resource.views += 1
  await resource.save()

  res.json({ success: true, data: resource })
})

// ── Create Resource (Mentor/Admin) ────────────────────────────────────────────
// POST /api/v1/resources
export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create({
    ...req.body,
    uploadedBy: req.user._id,
    isApproved: req.user.role === 'admin'
  })

  res.status(201).json({
    success: true,
    message: req.user.role === 'admin'
      ? 'Resource created and published!'
      : 'Resource submitted for approval!',
    data: resource
  })
})

// ── Update Resource ───────────────────────────────────────────────────────────
// PUT /api/v1/resources/:id
export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)

  if (!resource) {
    res.status(404)
    throw new Error('Resource not found')
  }

  // Only owner or admin can update
  if (
    resource.uploadedBy.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Not authorized to update this resource')
  }

  const updated = await Resource.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  )

  res.json({ success: true, data: updated })
})

// ── Delete Resource ───────────────────────────────────────────────────────────
// DELETE /api/v1/resources/:id
export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)

  if (!resource) {
    res.status(404)
    throw new Error('Resource not found')
  }

  if (
    resource.uploadedBy.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Not authorized to delete this resource')
  }

  await resource.deleteOne()
  res.json({ success: true, message: 'Resource deleted!' })
})

// ── Approve Resource (Admin) ──────────────────────────────────────────────────
// PUT /api/v1/resources/:id/approve
export const approveResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  )

  if (!resource) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.json({ success: true, message: 'Resource approved!', data: resource })
})

// ── Like Resource ─────────────────────────────────────────────────────────────
// POST /api/v1/resources/:id/like
export const likeResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)

  if (!resource) {
    res.status(404)
    throw new Error('Resource not found')
  }

  resource.likes += 1
  await resource.save()

  res.json({ success: true, likes: resource.likes })
})

// ── Get My Resources (Mentor) ─────────────────────────────────────────────────
// GET /api/v1/resources/my
export const getMyResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ uploadedBy: req.user._id })
    .populate('ideaId', 'title icon')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: resources.length, data: resources })
})

// ── Get Pending Resources (Admin) ─────────────────────────────────────────────
// GET /api/v1/resources/pending
export const getPendingResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ isApproved: false })
    .populate('uploadedBy', 'name email')
    .populate('ideaId', 'title')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: resources.length, data: resources })
})