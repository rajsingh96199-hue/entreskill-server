import mongoose from 'mongoose'

const businessIdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  icon: {
    type: String,
    default: '💡'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Food & Beverages',
      'Fashion & Apparel',
      'Technology',
      'Home Services',
      'Education',
      'Health & Wellness',
      'Arts & Crafts',
      'Digital & Media'
    ]
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  interests: {
    type: [String],
    default: []
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner'
  },
  estimatedCost: {
    type: String,
    default: '₹5,000 - ₹20,000'
  },
  duration: {
    type: String,
    default: '4-8 weeks'
  },
  tags: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema)

export default BusinessIdea