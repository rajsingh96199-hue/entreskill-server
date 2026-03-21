import express from 'express'
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllIdeasAdmin,
  createIdeaAdmin,
  deleteIdea,
  toggleIdeaStatus,
  getStats
} from '../controllers/adminController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// All admin routes are protected + admin only
router.use(protect, adminOnly)

// Stats
router.get('/stats', getStats)

// Users
router.get('/users', getAllUsers)
router.put('/users/:id/role', updateUserRole)
router.delete('/users/:id', deleteUser)

// Ideas
router.get('/ideas', getAllIdeasAdmin)
router.post('/ideas', createIdeaAdmin)
router.delete('/ideas/:id', deleteIdea)
router.put('/ideas/:id/toggle', toggleIdeaStatus)

export default router