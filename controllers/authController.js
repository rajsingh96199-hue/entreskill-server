import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// ── Register User ─────────────────────────────────────────────────────────────
// POST /api/v1/auth/register
// Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists with this email')
  }

  // Create user
  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        interests: user.interests,
        experience: user.experience,
        token: generateToken(user._id)
      }
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// ── Login User ────────────────────────────────────────────────────────────────
// POST /api/v1/auth/login
// Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter email and password')
  }

  // Find user
  const user = await User.findOne({ email })

  // Check password
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        interests: user.interests,
        experience: user.experience,
        token: generateToken(user._id)
      }
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// ── Get Current User ──────────────────────────────────────────────────────────
// GET /api/v1/auth/me
// Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  res.json({
    success: true,
    data: user
  })
})

// ── Logout User ───────────────────────────────────────────────────────────────
// POST /api/v1/auth/logout
// Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})