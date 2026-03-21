import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: [true, 'Session topic is required'],
    trim: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date,
    default: null
  },
  duration: {
    type: Number,
    default: 60
  },
  price: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Session = mongoose.model('Session', sessionSchema)
export default Session