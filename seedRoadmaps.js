import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import Roadmap from './models/Roadmap.js'
import BusinessIdea from './models/BusinessIdea.js'

await connectDB()

// Get all ideas
const ideas = await BusinessIdea.find({})
const getIdea = (title) => ideas.find(i => i.title === title)?._id

await Roadmap.deleteMany({})

await Roadmap.insertMany([
  {
    ideaId: getIdea('Home Bakery'),
    title: 'Home Bakery Launch Roadmap',
    description: 'Complete guide to starting your home bakery business.',
    totalDuration: '8-10 weeks',
    estimatedCost: '₹5,000 - ₹15,000',
    difficulty: 'beginner',
    steps: [
      {
        stepNumber: 1,
        title: 'Idea Validation',
        description: 'Validate your bakery idea by researching the market.',
        tasks: [
          'Survey 20 potential customers',
          'Research competitors in your area',
          'Identify your unique selling point',
          'Decide your product range'
        ],
        tips: ['Start with 3-5 signature items', 'Ask friends and family for honest feedback'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 2,
        title: 'Skills & Equipment',
        description: 'Identify skills to learn and equipment to buy.',
        tasks: [
          'List all required baking equipment',
          'Take an online baking course if needed',
          'Practice your signature recipes',
          'Calculate ingredient costs'
        ],
        tips: ['Start with basic equipment — upgrade later', 'YouTube has free baking tutorials'],
        estimatedTime: '2 weeks'
      },
      {
        stepNumber: 3,
        title: 'Legal & Registration',
        description: 'Get your business legally registered.',
        tasks: [
          'Register as sole proprietor or MSME',
          'Apply for FSSAI food license',
          'Open a separate business bank account',
          'Get GST registration if turnover > ₹20L'
        ],
        tips: ['FSSAI basic registration costs ~₹100/year', 'Udyam registration is free for MSMEs'],
        estimatedTime: '2 weeks'
      },
      {
        stepNumber: 4,
        title: 'Cost Estimation',
        description: 'Calculate your startup and running costs.',
        tasks: [
          'List all one-time equipment costs',
          'Calculate monthly ingredient budget',
          'Set pricing for each product',
          'Plan for 3 months of expenses'
        ],
        tips: ['Price = Cost × 3 for home bakeries', 'Keep a simple expense spreadsheet'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 5,
        title: 'Marketing & Branding',
        description: 'Create your brand and start marketing.',
        tasks: [
          'Choose a business name',
          'Create Instagram and WhatsApp Business accounts',
          'Take professional photos of your products',
          'Get first 10 orders from friends and family'
        ],
        tips: ['Instagram Reels get most visibility', 'Offer free samples to food bloggers'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 6,
        title: 'Launch!',
        description: 'Go live and start taking orders!',
        tasks: [
          'Announce launch on social media',
          'Set up online payment (UPI/Razorpay)',
          'Create order tracking system',
          'Collect and share customer reviews'
        ],
        tips: ['Offer launch discount for first 50 customers', 'Always deliver on time'],
        estimatedTime: '1 week'
      }
    ]
  },
  {
    ideaId: getIdea('Tailoring Studio'),
    title: 'Tailoring Studio Launch Roadmap',
    description: 'Step-by-step guide to starting your tailoring business.',
    totalDuration: '6-8 weeks',
    estimatedCost: '₹10,000 - ₹25,000',
    difficulty: 'beginner',
    steps: [
      {
        stepNumber: 1,
        title: 'Idea Validation',
        description: 'Research the local tailoring market.',
        tasks: [
          'Visit local tailors to understand pricing',
          'Identify your speciality (wedding, alterations, kids)',
          'Survey potential customers',
          'Decide home-based vs shop'
        ],
        tips: ['Wedding season brings highest demand', 'Alteration services have quick turnaround'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 2,
        title: 'Skills & Equipment',
        description: 'Get the right tools and sharpen your skills.',
        tasks: [
          'Buy a good sewing machine (₹8,000-15,000)',
          'Stock up on threads, needles, fabric',
          'Learn latest fashion trends',
          'Practice on sample garments'
        ],
        tips: ['Usha or Singer machines are reliable', 'Join tailoring groups on Facebook'],
        estimatedTime: '2 weeks'
      },
      {
        stepNumber: 3,
        title: 'Legal & Registration',
        description: 'Register your tailoring business.',
        tasks: [
          'Register as MSME on Udyam portal',
          'Open business bank account',
          'Create simple order receipt book',
          'Get basic business insurance'
        ],
        tips: ['Udyam registration is completely free', 'Keep records of all orders'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 4,
        title: 'Cost Estimation',
        description: 'Plan your finances.',
        tasks: [
          'Calculate equipment costs',
          'Set rates for different services',
          'Plan monthly material budget',
          'Track income and expenses'
        ],
        tips: ['Charge per piece not per hour', 'Offer package deals for weddings'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 5,
        title: 'Marketing & Branding',
        description: 'Get your first customers.',
        tasks: [
          'Create WhatsApp Business profile',
          'Take before/after photos of work',
          'Partner with local cloth shops',
          'Ask satisfied customers for referrals'
        ],
        tips: ['Word of mouth works best for tailoring', 'Show your work on Instagram'],
        estimatedTime: '1 week'
      },
      {
        stepNumber: 6,
        title: 'Launch!',
        description: 'Open your studio for business!',
        tasks: [
          'Set working hours',
          'Create order tracking system',
          'Offer launch discount',
          'Collect customer testimonials'
        ],
        tips: ['Promise realistic delivery dates', 'Quality over quantity always'],
        estimatedTime: '1 week'
      }
    ]
  }
])

console.log('✅ Roadmaps seeded successfully!')
process.exit()