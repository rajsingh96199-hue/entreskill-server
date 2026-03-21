import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import Mentor from './models/Mentor.js'
import User from './models/User.js'

await connectDB()

// Create mentor users first
const mentorUsers = await User.insertMany([
  {
    name: 'Priya Mehta',
    email: 'priya@mentor.com',
    password: 'mentor123',
    role: 'mentor'
  },
  {
    name: 'Arjun Kapoor',
    email: 'arjun@mentor.com',
    password: 'mentor123',
    role: 'mentor'
  },
  {
    name: 'Sneha Sharma',
    email: 'sneha@mentor.com',
    password: 'mentor123',
    role: 'mentor'
  },
])

// Create mentor profiles
await Mentor.deleteMany({})
await Mentor.insertMany([
  {
    userId: mentorUsers[0]._id,
    bio: 'Food entrepreneur with 8 years experience. Started my own bakery from scratch and scaled it to 3 outlets.',
    expertise: ['Food & Beverages', 'Marketing', 'Operations'],
    experience: '8 years',
    languages: ['English', 'Hindi', 'Marathi'],
    sessionPrice: 500,
    rating: 4.9,
    totalSessions: 120,
    verified: true,
    available: true,
    avatar: '👩‍🍳'
  },
  {
    userId: mentorUsers[1]._id,
    bio: 'Digital marketing expert helping small businesses grow their online presence.',
    expertise: ['Digital & Media', 'Marketing', 'Technology'],
    experience: '6 years',
    languages: ['English', 'Hindi'],
    sessionPrice: 400,
    rating: 4.7,
    totalSessions: 85,
    verified: true,
    available: true,
    avatar: '👨‍💼'
  },
  {
    userId: mentorUsers[2]._id,
    bio: 'Fashion designer turned entrepreneur. Helping artisans sell their crafts online.',
    expertise: ['Fashion & Apparel', 'Arts & Crafts', 'E-commerce'],
    experience: '5 years',
    languages: ['English', 'Hindi', 'Gujarati'],
    sessionPrice: 300,
    rating: 4.8,
    totalSessions: 64,
    verified: true,
    available: true,
    avatar: '👩‍🎨'
  },
])

console.log('✅ Mentors seeded successfully!')
process.exit()