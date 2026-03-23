import express from 'express'
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  approveResource,
  likeResource,
  getMyResources,
  getPendingResources
} from '../controllers/resourceController.js'
import { protect, adminOnly, mentorOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.get('/', getAllResources)
router.get('/:id', getResourceById)
router.post('/:id/like', likeResource)

// Private Routes
router.post('/', protect, mentorOnly, createResource)
router.put('/:id', protect, updateResource)
router.delete('/:id', protect, deleteResource)
router.get('/user/my', protect, getMyResources)

// Admin Routes
router.get('/admin/pending', protect, adminOnly, getPendingResources)
router.put('/:id/approve', protect, adminOnly, approveResource)

export default router