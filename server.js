import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import ideaRoutes from './routes/ideaRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import mentorRoutes from './routes/mentorRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://entreskill-client.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ EntreSkill API is running!' })
})

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/ideas', ideaRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/mentors', mentorRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})