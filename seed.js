import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import BusinessIdea from './models/BusinessIdea.js'

await connectDB()

await BusinessIdea.deleteMany({})

await BusinessIdea.insertMany([
  {
    title: 'Home Bakery',
    description: 'Sell baked goods from home — cakes, breads, and snacks.',
    icon: '🍰',
    category: 'Food & Beverages',
    requiredSkills: ['baking', 'cooking'],
    interests: ['food'],
    difficulty: 'beginner',
    estimatedCost: '₹5,000 - ₹15,000',
    tags: ['food', 'home', 'baking']
  },
  {
    title: 'Tailoring Studio',
    description: 'Offer custom stitching and alteration services.',
    icon: '👔',
    category: 'Fashion & Apparel',
    requiredSkills: ['tailoring'],
    interests: ['fashion'],
    difficulty: 'beginner',
    estimatedCost: '₹10,000 - ₹25,000',
    tags: ['fashion', 'stitching', 'tailoring']
  },
  {
    title: 'Freelance Designer',
    description: 'Create logos, social media graphics and branding.',
    icon: '🎨',
    category: 'Technology',
    requiredSkills: ['design'],
    interests: ['tech'],
    difficulty: 'intermediate',
    estimatedCost: '₹2,000 - ₹5,000',
    tags: ['design', 'freelance', 'digital']
  },
  {
    title: 'Online Tutor',
    description: 'Teach subjects online through video calls and worksheets.',
    icon: '📖',
    category: 'Education',
    requiredSkills: ['teaching'],
    interests: ['education'],
    difficulty: 'beginner',
    estimatedCost: '₹1,000 - ₹3,000',
    tags: ['teaching', 'online', 'education']
  },
  {
    title: 'Photo Studio',
    description: 'Offer portrait and product photography services locally.',
    icon: '📸',
    category: 'Digital & Media',
    requiredSkills: ['photography'],
    interests: ['media'],
    difficulty: 'intermediate',
    estimatedCost: '₹15,000 - ₹40,000',
    tags: ['photography', 'media', 'studio']
  },
  {
    title: 'Electronics Repair',
    description: 'Provide doorstep electronics and appliance repair.',
    icon: '🔌',
    category: 'Home Services',
    requiredSkills: ['repair'],
    interests: ['home'],
    difficulty: 'beginner',
    estimatedCost: '₹5,000 - ₹10,000',
    tags: ['repair', 'home', 'electronics']
  },
  {
    title: 'Handicraft Store',
    description: 'Sell handmade crafts online via Instagram or Etsy.',
    icon: '🪡',
    category: 'Arts & Crafts',
    requiredSkills: ['handicrafts'],
    interests: ['art'],
    difficulty: 'beginner',
    estimatedCost: '₹3,000 - ₹8,000',
    tags: ['crafts', 'handmade', 'art']
  },
  {
    title: 'Beauty & Makeup Studio',
    description: 'Offer makeup services for weddings and events.',
    icon: '💄',
    category: 'Health & Wellness',
    requiredSkills: ['beauty'],
    interests: ['wellness'],
    difficulty: 'beginner',
    estimatedCost: '₹8,000 - ₹20,000',
    tags: ['beauty', 'makeup', 'wellness']
  },
  {
    title: 'Fitness Trainer',
    description: 'Offer personal training sessions online or at home.',
    icon: '🏋️',
    category: 'Health & Wellness',
    requiredSkills: ['fitness'],
    interests: ['wellness'],
    difficulty: 'intermediate',
    estimatedCost: '₹2,000 - ₹5,000',
    tags: ['fitness', 'health', 'training']
  },
  {
    title: 'Content Writing Agency',
    description: 'Write blogs, articles and social media content for brands.',
    icon: '✍️',
    category: 'Digital & Media',
    requiredSkills: ['writing'],
    interests: ['media'],
    difficulty: 'beginner',
    estimatedCost: '₹1,000 - ₹3,000',
    tags: ['writing', 'content', 'digital']
  },
])

console.log('✅ 10 Business ideas seeded successfully!')
process.exit()