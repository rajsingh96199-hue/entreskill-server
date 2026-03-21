import mongoose from 'mongoose'

const mentorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: 500
  },
  expertise: {
    type: [String],
    required: true,
    default: []
  },
  experience: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    default: ['English']
  },
  sessionPrice: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
    default: '👤'
  },
  linkedIn: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const Mentor = mongoose.model('Mentor', mentorSchema)
export default Mentor