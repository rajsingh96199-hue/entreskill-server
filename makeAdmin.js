import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import User from './models/User.js'

await connectDB()

const email = 'admin@gmail.com' // ← put your real email here

const user = await User.findOneAndUpdate(
  { email },
  { role: 'admin' },
  { new: true }
)

if (user) {
  console.log(`✅ Admin role set for: ${user.name} (${user.email})`)
} else {
  console.log('❌ User not found — check your email!')
  
  // Show all users in DB
  const allUsers = await User.find({}).select('name email')
  console.log('📋 Users in database:')
  allUsers.forEach(u => console.log(`  - ${u.name}: ${u.email}`))
}

process.exit()