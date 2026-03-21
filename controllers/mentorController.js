import asyncHandler from 'express-async-handler'
import Mentor from '../models/Mentor.js'
import Session from '../models/Session.js'
import User from '../models/User.js'

// ── Get All Mentors ───────────────────────────────────────────────────────────
// GET /api/v1/mentors
export const getAllMentors = asyncHandler(async (req, res) => {
  const { expertise, available } = req.query

  let filter = { verified: true }
  if (available) filter.available = available === 'true'
  if (expertise) filter.expertise = { $in: [expertise] }

  const mentors = await Mentor.find(filter)
    .populate('userId', 'name email')
    .sort({ rating: -1 })

  res.json({ success: true, count: mentors.length, data: mentors })
})

// ── Get Single Mentor ─────────────────────────────────────────────────────────
// GET /api/v1/mentors/:id
export const getMentorById = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id)
    .populate('userId', 'name email')

  if (!mentor) {
    res.status(404)
    throw new Error('Mentor not found')
  }

  res.json({ success: true, data: mentor })
})

// ── Register as Mentor ────────────────────────────────────────────────────────
// POST /api/v1/mentors/register
export const registerMentor = asyncHandler(async (req, res) => {
  const { bio, expertise, experience, languages, sessionPrice, avatar, linkedIn } = req.body

  // Check if already a mentor
  const existing = await Mentor.findOne({ userId: req.user._id })
  if (existing) {
    res.status(400)
    throw new Error('You are already registered as a mentor')
  }

  const mentor = await Mentor.create({
    userId: req.user._id,
    bio, expertise, experience,
    languages, sessionPrice,
    avatar, linkedIn
  })

  // Update user role
  await User.findByIdAndUpdate(req.user._id, { role: 'mentor' })

  res.status(201).json({
    success: true,
    message: 'Mentor application submitted! Pending verification.',
    data: mentor
  })
})

// ── Get My Mentor Profile ─────────────────────────────────────────────────────
// GET /api/v1/mentors/me
export const getMyMentorProfile = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findOne({ userId: req.user._id })
    .populate('userId', 'name email')

  if (!mentor) {
    res.status(404)
    throw new Error('Mentor profile not found')
  }

  res.json({ success: true, data: mentor })
})

// ── Book a Session ────────────────────────────────────────────────────────────
// POST /api/v1/mentors/:id/book
export const bookSession = asyncHandler(async (req, res) => {
  const { topic, message, scheduledDate } = req.body

  const mentor = await Mentor.findById(req.params.id)
  if (!mentor) {
    res.status(404)
    throw new Error('Mentor not found')
  }

  if (!mentor.available) {
    res.status(400)
    throw new Error('Mentor is not available for sessions')
  }

  // Prevent booking own profile
  if (mentor.userId.toString() === req.user._id.toString()) {
    res.status(400)
    throw new Error('You cannot book your own mentor profile')
  }

  const session = await Session.create({
    mentor: mentor._id,
    mentee: req.user._id,
    topic,
    message,
    scheduledDate,
    price: mentor.sessionPrice
  })

  // Increment total sessions
  mentor.totalSessions += 1
  await mentor.save()

  res.status(201).json({
    success: true,
    message: 'Session booked successfully!',
    data: session
  })
})

// ── Get My Sessions (as mentee) ───────────────────────────────────────────────
// GET /api/v1/mentors/sessions/my
export const getMySessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ mentee: req.user._id })
    .populate({
      path: 'mentor',
      populate: { path: 'userId', select: 'name email' }
    })
    .sort({ createdAt: -1 })

  res.json({ success: true, count: sessions.length, data: sessions })
})

// ── Verify Mentor (Admin) ─────────────────────────────────────────────────────
// PUT /api/v1/mentors/:id/verify
export const verifyMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findByIdAndUpdate(
    req.params.id,
    { verified: true },
    { new: true }
  )

  if (!mentor) {
    res.status(404)
    throw new Error('Mentor not found')
  }

  res.json({ success: true, message: 'Mentor verified!', data: mentor })
})