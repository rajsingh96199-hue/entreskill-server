import express from 'express'
import {
  getRoadmapByIdeaId,
  getAllRoadmaps,
  createRoadmap,
  updateRoadmap,
  updateProgress,
  getProgress
} from '../controllers/roadmapController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.get('/', getAllRoadmaps)
router.get('/:ideaId', getRoadmapByIdeaId)

// Private Routes
router.put('/:id/progress', protect, updateProgress)
router.get('/:id/progress', protect, getProgress)

// Admin Routes
router.post('/', protect, adminOnly, createRoadmap)
router.put('/:id', protect, adminOnly, updateRoadmap)

export default router