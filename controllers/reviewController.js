import asyncHandler from 'express-async-handler'
import Review from '../models/Review.js'
import Mentor from '../models/Mentor.js'

// ── Get All Reviews for a Mentor ──────────────────────────────────────────────
// GET /api/v1/reviews/mentor/:mentorId
export const getMentorReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ mentor: req.params.mentorId })
    .populate('reviewer', 'name')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: reviews.length, data: reviews })
})

// ── Create Review ─────────────────────────────────────────────────────────────
// POST /api/v1/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { mentorId, rating, comment, sessionId } = req.body

  if (!mentorId || !rating || !comment) {
    res.status(400)
    throw new Error('Please provide mentorId, rating and comment')
  }

  // Check if mentor exists
  const mentor = await Mentor.findById(mentorId)
  if (!mentor) {
    res.status(404)
    throw new Error('Mentor not found')
  }

  // Check if user already reviewed
  const existing = await Review.findOne({
    mentor: mentorId,
    reviewer: req.user._id
  })
  if (existing) {
    res.status(400)
    throw new Error('You have already reviewed this mentor')
  }

  // Prevent reviewing own profile
  if (mentor.userId.toString() === req.user._id.toString()) {
    res.status(400)
    throw new Error('You cannot review your own profile')
  }

  const review = await Review.create({
    mentor: mentorId,
    reviewer: req.user._id,
    rating,
    comment,
    session: sessionId || null
  })

  const populated = await Review.findById(review._id)
    .populate('reviewer', 'name')

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully!',
    data: populated
  })
})

// ── Update Review ─────────────────────────────────────────────────────────────
// PUT /api/v1/reviews/:id
export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  // Only reviewer can update
  if (review.reviewer.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error('Not authorized to update this review')
  }

  review.rating = req.body.rating || review.rating
  review.comment = req.body.comment || review.comment
  await review.save()

  res.json({ success: true, message: 'Review updated!', data: review })
})

// ── Delete Review ─────────────────────────────────────────────────────────────
// DELETE /api/v1/reviews/:id
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  if (
    review.reviewer.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Not authorized to delete this review')
  }

  await review.deleteOne()
  res.json({ success: true, message: 'Review deleted!' })
})

// ── Get My Reviews ────────────────────────────────────────────────────────────
// GET /api/v1/reviews/my
export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ reviewer: req.user._id })
    .populate('mentor')
    .sort({ createdAt: -1 })

  res.json({ success: true, count: reviews.length, data: reviews })
})

// ── Get Review Stats for Mentor ───────────────────────────────────────────────
// GET /api/v1/reviews/mentor/:mentorId/stats
export const getMentorReviewStats = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ mentor: req.params.mentorId })

  const total = reviews.length
  const avg = total > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10) / 10
    : 0

  // Count per star
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(r => { distribution[r.rating]++ })

  res.json({
    success: true,
    data: { total, average: avg, distribution }
  })
})