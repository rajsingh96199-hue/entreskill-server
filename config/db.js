import mongoose from 'mongoose'

const createDefaultAdmin = async () => {
  try {
    // Import here to avoid circular dependency
    const { default: User } = await import('../models/User.js')

    const adminExists = await User.findOne({ role: 'admin' })
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@entreskill.com',
        password: 'Admin@1234',
        role: 'admin'
      })
      console.log('✅ Default admin created!')
      console.log('📧 Email: admin@entreskill.com')
      console.log('🔑 Password: Admin@1234')
    }
  } catch (error) {
    console.error('Admin creation error:', error.message)
  }
}

const seedDefaultIdeas = async () => {
  try {
    const { default: BusinessIdea } = await import('../models/BusinessIdea.js')

    const count = await BusinessIdea.countDocuments()
    if (count === 0) {
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
      console.log('✅ Default business ideas seeded!')
    }
  } catch (error) {
    console.error('Seeding error:', error.message)
  }
}

const seedDefaultRoadmaps = async () => {
  try {
    const { default: Roadmap } = await import('../models/Roadmap.js')
    const { default: BusinessIdea } = await import('../models/BusinessIdea.js')

    const count = await Roadmap.countDocuments()
    if (count === 0) {
      const ideas = await BusinessIdea.find({})
      const getIdea = (title) => ideas.find(i => i.title === title)?._id

      const bakeryId = getIdea('Home Bakery')
      const tailoringId = getIdea('Tailoring Studio')

      if (bakeryId) {
        await Roadmap.create({
          ideaId: bakeryId,
          title: 'Home Bakery Launch Roadmap',
          description: 'Complete guide to starting your home bakery business.',
          totalDuration: '8-10 weeks',
          estimatedCost: '₹5,000 - ₹15,000',
          difficulty: 'beginner',
          steps: [
            {
              stepNumber: 1, title: 'Idea Validation',
              description: 'Validate your bakery idea by researching the market.',
              tasks: ['Survey 20 potential customers', 'Research competitors', 'Identify your unique selling point', 'Decide your product range'],
              tips: ['Start with 3-5 signature items', 'Ask friends and family for honest feedback'],
              estimatedTime: '1 week'
            },
            {
              stepNumber: 2, title: 'Skills & Equipment',
              description: 'Identify skills to learn and equipment to buy.',
              tasks: ['List all required baking equipment', 'Take an online baking course', 'Practice your signature recipes', 'Calculate ingredient costs'],
              tips: ['Start with basic equipment', 'YouTube has free baking tutorials'],
              estimatedTime: '2 weeks'
            },
            {
              stepNumber: 3, title: 'Legal & Registration',
              description: 'Get your business legally registered.',
              tasks: ['Register as sole proprietor', 'Apply for FSSAI food license', 'Open a business bank account', 'Get GST registration if needed'],
              tips: ['FSSAI basic registration costs ~₹100/year', 'Udyam registration is free'],
              estimatedTime: '2 weeks'
            },
            {
              stepNumber: 4, title: 'Cost Estimation',
              description: 'Calculate your startup and running costs.',
              tasks: ['List all one-time equipment costs', 'Calculate monthly ingredient budget', 'Set pricing for each product', 'Plan for 3 months of expenses'],
              tips: ['Price = Cost × 3 for home bakeries', 'Keep a simple expense spreadsheet'],
              estimatedTime: '1 week'
            },
            {
              stepNumber: 5, title: 'Marketing & Branding',
              description: 'Create your brand and start marketing.',
              tasks: ['Choose a business name', 'Create Instagram and WhatsApp Business', 'Take professional photos', 'Get first 10 orders from friends'],
              tips: ['Instagram Reels get most visibility', 'Offer free samples to food bloggers'],
              estimatedTime: '1 week'
            },
            {
              stepNumber: 6, title: 'Launch!',
              description: 'Go live and start taking orders!',
              tasks: ['Announce launch on social media', 'Set up online payment', 'Create order tracking system', 'Collect customer reviews'],
              tips: ['Offer launch discount for first 50 customers', 'Always deliver on time'],
              estimatedTime: '1 week'
            }
          ]
        })
        console.log('✅ Default roadmaps seeded!')
      }
    }
  } catch (error) {
    console.error('Roadmap seeding error:', error.message)
  }
}

const seedDefaultResources = async () => {
  try {
    const { default: Resource } = await import('../models/Resource.js')
    const { default: User } = await import('../models/User.js')

    const count = await Resource.countDocuments()
    if (count === 0) {
      const admin = await User.findOne({ role: 'admin' })
      if (!admin) return

      await Resource.insertMany([
        {
          title: 'How to Start a Food Business in India',
          description: 'Complete guide to starting a food business from home.',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: 'Food & Beverages',
          duration: '15 min',
          tags: ['food', 'startup', 'india'],
          uploadedBy: admin._id,
          isApproved: true
        },
        {
          title: 'FSSAI Registration Guide for Home Bakers',
          description: 'Step by step guide to get your food license.',
          type: 'article',
          url: 'https://fssai.gov.in',
          category: 'Food & Beverages',
          duration: '5 min read',
          tags: ['fssai', 'legal', 'food'],
          uploadedBy: admin._id,
          isApproved: true
        },
        {
          title: 'Home Bakery Launch Checklist',
          description: 'Everything you need before launching your bakery.',
          type: 'checklist',
          url: '',
          category: 'Food & Beverages',
          duration: '10 items',
          tags: ['bakery', 'checklist', 'launch'],
          uploadedBy: admin._id,
          isApproved: true
        },
        {
          title: 'Digital Marketing for Small Businesses',
          description: 'Learn how to market your business on social media.',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: 'General',
          duration: '20 min',
          tags: ['marketing', 'social media', 'digital'],
          uploadedBy: admin._id,
          isApproved: true
        },
        {
          title: 'Udyam Registration Guide',
          description: 'How to register your business as MSME for free.',
          type: 'article',
          url: 'https://udyamregistration.gov.in',
          category: 'General',
          duration: '8 min read',
          tags: ['msme', 'registration', 'legal'],
          uploadedBy: admin._id,
          isApproved: true
        },
        {
          title: 'Pricing Strategy for Home Businesses',
          description: 'How to price your products for maximum profit.',
          type: 'article',
          url: '',
          category: 'General',
          duration: '6 min read',
          tags: ['pricing', 'profit', 'strategy'],
          uploadedBy: admin._id,
          isApproved: true
        },
      ])
      console.log('✅ Default resources seeded!')
    }
  } catch (error) {
    console.error('Resource seeding error:', error.message)
  }
}


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    // Auto-setup on first run
    await createDefaultAdmin()
    await seedDefaultIdeas()
    await seedDefaultRoadmaps() // ← Add this line!
    await seedDefaultResources()
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB