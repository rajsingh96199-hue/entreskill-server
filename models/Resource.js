import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  type: {
    type: String,
    enum: ['video', 'article', 'checklist', 'pdf', 'tool'],
    required: true
  },
  url: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: [
      'Food & Beverages', 'Fashion & Apparel', 'Technology',
      'Home Services', 'Education', 'Health & Wellness',
      'Arts & Crafts', 'Digital & Media', 'General'
    ],
    default: 'General'
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessIdea',
    default: null
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Resource = mongoose.model('Resource', resourceSchema)
export default Resource