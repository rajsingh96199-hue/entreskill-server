import express from 'express'
import {
  getProfile,
  updateSkills,
  updateInterests,
  updateExperience,
  updateProfile
} from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are private (must be logged in)
router.get('/', protect, getProfile)
router.put('/', protect, updateProfile)
router.put('/skills', protect, updateSkills)
router.put('/interests', protect, updateInterests)
router.put('/experience', protect, updateExperience)

export default router