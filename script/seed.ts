import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { services, teamMembers, projects, testimonials } from "../shared/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed Services
  await db.insert(services).values([
    {
      title: "AI Automation Strategy",
      description: "Transform your business operations with intelligent automation solutions tailored to your unique workflows.",
      icon: "Cpu",
      features: ["Process Analysis", "Custom AI Models", "Workflow Optimization", "ROI Tracking"],
      order: 1,
    },
    {
      title: "Intelligent Chatbots",
      description: "Deploy conversational AI agents that understand context, provide accurate answers, and scale customer support 24/7.",
      icon: "MessageSquare",
      features: ["Natural Language Processing", "Multi-language Support", "CRM Integration", "Analytics Dashboard"],
      order: 2,
    },
    {
      title: "Data Pipeline Automation",
      description: "Streamline data collection, transformation, and analysis with autonomous pipelines that never sleep.",
      icon: "Database",
      features: ["ETL Automation", "Real-time Processing", "Data Quality Checks", "Custom Connectors"],
      order: 3,
    },
    {
      title: "RPA Implementation",
      description: "Eliminate repetitive tasks with robotic process automation that integrates seamlessly with your existing systems.",
      icon: "Zap",
      features: ["Task Recording", "Exception Handling", "Cross-platform Support", "Monitoring & Alerts"],
      order: 4,
    },
  ]);

  // Seed Team Members
  await db.insert(teamMembers).values([
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former AI research lead at Google Brain. 15+ years building intelligent systems that actually work in production.",
      linkedIn: "https://linkedin.com/in/sarahchen",
      order: 1,
    },
    {
      name: "Marcus Rivera",
      role: "CTO",
      bio: "Ex-SpaceX engineer who believes automation should be elegant, reliable, and maintainable. Obsessed with system design.",
      linkedIn: "https://linkedin.com/in/marcusrivera",
      order: 2,
    },
    {
      name: "Priya Sharma",
      role: "Head of Product",
      bio: "Product leader who shipped AI features to 100M+ users at Microsoft. Turns complex tech into intuitive experiences.",
      linkedIn: "https://linkedin.com/in/priyasharma",
      order: 3,
    },
    {
      name: "Alex Thompson",
      role: "Lead ML Engineer",
      bio: "Published researcher in reinforcement learning. Built autonomous trading systems managing $2B in assets.",
      linkedIn: "https://linkedin.com/in/alexthompson",
      order: 4,
    },
  ]);

  // Seed Projects
  await db.insert(projects).values([
    {
      title: "FinTech Fraud Detection",
      description: "Built a real-time fraud detection system that processes 50,000 transactions per second with 99.7% accuracy.",
      category: "Financial Services",
      client: "GlobalBank Inc",
      year: 2024,
      featured: true,
      tags: ["Machine Learning", "Real-time Processing", "Security"],
      results: "Reduced fraud losses by 87% while decreasing false positives by 42%.",
    },
    {
      title: "Healthcare Document Processing",
      description: "Automated medical records processing using advanced OCR and NLP, extracting structured data from unstructured documents.",
      category: "Healthcare",
      client: "MediCare Systems",
      year: 2024,
      featured: true,
      tags: ["NLP", "OCR", "HIPAA Compliance"],
      results: "Processing time reduced from 45 minutes to 2 minutes per document. 95% accuracy rate.",
    },
    {
      title: "E-commerce Personalization Engine",
      description: "Implemented AI-driven product recommendations that adapt in real-time based on user behavior and inventory.",
      category: "Retail",
      client: "ShopNow",
      year: 2023,
      featured: true,
      tags: ["Recommendation Systems", "A/B Testing", "Real-time Analytics"],
      results: "35% increase in conversion rate and 28% boost in average order value.",
    },
    {
      title: "Supply Chain Optimization",
      description: "Developed predictive models for inventory management and demand forecasting across 200+ warehouses.",
      category: "Logistics",
      client: "LogisticsPro",
      year: 2023,
      featured: false,
      tags: ["Forecasting", "Optimization", "Dashboard"],
      results: "Inventory costs reduced by 23%, stockouts decreased by 67%.",
    },
  ]);

  // Seed Testimonials
  await db.insert(testimonials).values([
    {
      clientName: "Jennifer Wu",
      company: "GlobalBank Inc",
      role: "VP of Operations",
      testimonial: "Automation OS delivered a fraud detection system that exceeded all our expectations. The team's expertise in financial ML was evident from day one.",
      rating: 5,
    },
    {
      clientName: "Dr. Robert Klein",
      company: "MediCare Systems",
      role: "Chief Medical Officer",
      testimonial: "Their healthcare automation solution transformed how we handle patient records. The accuracy and speed are remarkable, and they understood HIPAA compliance inside and out.",
      rating: 5,
    },
    {
      clientName: "Amanda Foster",
      company: "ShopNow",
      role: "Head of E-commerce",
      testimonial: "The personalization engine they built for us has been a game-changer. Our customers are engaging more, and our revenue has grown significantly.",
      rating: 5,
    },
  ]);

  console.log("✅ Database seeded successfully!");
  await pool.end();
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
