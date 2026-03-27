import express from 'express'
import {
  getMentorReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
  getMentorReviewStats
} from '../controllers/reviewController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.get('/mentor/:mentorId', getMentorReviews)
router.get('/mentor/:mentorId/stats', getMentorReviewStats)

// Private Routes
router.post('/', protect, createReview)
router.put('/:id', protect, updateReview)
router.delete('/:id', protect, deleteReview)
router.get('/my', protect, getMyReviews)

export default router