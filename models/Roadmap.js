import mongoose from 'mongoose'

const roadmapStepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: { type: [String], default: [] },
  resources: { type: [String], default: [] },
  estimatedTime: { type: String, default: '1 week' },
  tips: { type: [String], default: [] }
})

const roadmapSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessIdea',
    required: true,
    unique: true
  },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  totalDuration: { type: String, default: '8-12 weeks' },
  estimatedCost: { type: String, default: '₹5,000 - ₹20,000' },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner'
  },
  steps: [roadmapStepSchema]
}, {
  timestamps: true
})

const Roadmap = mongoose.model('Roadmap', roadmapSchema)
export default Roadmap