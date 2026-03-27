import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: 500
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    default: null
  }
}, {
  timestamps: true
})

// Prevent duplicate reviews
reviewSchema.index({ mentor: 1, reviewer: 1 }, { unique: true })

// Auto update mentor rating after review
reviewSchema.post('save', async function () {
  try {
    const Mentor = mongoose.model('Mentor')
    const reviews = await mongoose.model('Review').find({ mentor: this.mentor })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await Mentor.findByIdAndUpdate(this.mentor, {
      rating: Math.round(avgRating * 10) / 10
    })
  } catch (err) {
    console.error('Rating update error:', err)
  }
})

const Review = mongoose.model('Review', reviewSchema)
export default Review