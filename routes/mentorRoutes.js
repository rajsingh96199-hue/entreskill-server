import express from 'express'
import {
  getAllMentors,
  getMentorById,
  registerMentor,
  getMyMentorProfile,
  bookSession,
  getMySessions,
  verifyMentor
} from '../controllers/mentorController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.get('/', getAllMentors)
router.get('/:id', getMentorById)

// Private Routes
router.post('/register', protect, registerMentor)
router.get('/me/profile', protect, getMyMentorProfile)
router.post('/:id/book', protect, bookSession)
router.get('/sessions/my', protect, getMySessions)

// Admin Routes
router.put('/:id/verify', protect, adminOnly, verifyMentor)

export default router