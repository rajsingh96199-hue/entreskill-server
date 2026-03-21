import express from 'express'
import {
  getAllIdeas,
  getRecommendedIdeas,
  getIdeaById,
  saveIdea,
  getSavedIdeas,
  createIdea
} from '../controllers/ideaController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.get('/', getAllIdeas)
router.get('/:id', getIdeaById)

// Private Routes
router.get('/user/recommended', protect, getRecommendedIdeas)
router.get('/user/saved', protect, getSavedIdeas)
router.post('/:id/save', protect, saveIdea)

// Admin Routes
router.post('/', protect, adminOnly, createIdea)

export default router