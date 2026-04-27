import { storage } from "./storage";

async function seed() {
  console.log("Seeding database with SynqAI services...");

  const services = [
    {
      title: "WhatsApp AI Chatbots",
      description: "Auto-replies, sales, and 24/7 support directly on WhatsApp.",
      icon: "MessageSquare",
      features: ["Auto-replies", "Lead qualification", "Support integration"],
      order: 1
    },
    {
      title: "Social Auto DM",
      description: "Instagram & Facebook auto DM + comment replies to boost engagement.",
      icon: "Instagram",
      features: ["Auto DM", "Comment replies", "Mass outreach"],
      order: 2
    },
    {
      title: "Website Lead Capture",
      description: "High-converting lead capture with automated follow-up systems.",
      icon: "Layout",
      features: ["Sticky forms", "Popup capture", "Auto follow-up"],
      order: 3
    },
    {
      title: "CRM Automation",
      description: "Automated pipeline management from lead to closing.",
      icon: "Database",
      features: ["Lead routing", "Pipeline sync", "Automated tasks"],
      order: 4
    },
    {
      title: "AI Calling Agents",
      description: "Automated calls for reminders and sales outreach.",
      icon: "Phone",
      features: ["Voice AI", "Appointment setting", "Follow-up calls"],
      order: 5
    },
    {
      title: "Invoice & Billing Automation",
      description: "End-to-end automated invoicing and payment tracking.",
      icon: "Receipt",
      features: ["Auto-invoicing", "Late payment reminders", "Sync with accounting"],
      order: 6
    },
    {
      title: "AI Customer Support",
      description: "Intelligent support agents that handle 80% of common inquiries.",
      icon: "Users",
      features: ["Knowledge base sync", "Ticket escalation", "24/7 availability"],
      order: 7
    },
    {
      title: "AI Video & Content",
      description: "AI-driven video and content generation for consistent presence.",
      icon: "Video",
      features: ["Video scripting", "Automated editing", "Content scheduling"],
      order: 8
    },
    {
      title: "Excel / Data Automation",
      description: "Automated data entry and report generation to eliminate error.",
      icon: "FileSpreadsheet",
      features: ["Auto-reporting", "Data scraping", "Data cleaning"],
      order: 9
    },
    {
      title: "Social Posting Automation",
      description: "AI-optimized posting schedules across all major platforms.",
      icon: "Share2",
      features: ["Multi-platform sync", "AI caption generation", "Time optimization"],
      order: 10
    },
    {
      title: "Custom Business AI",
      description: "Bespoke AI assistants tailored to your unique business logic.",
      icon: "Bot",
      features: ["Custom training", "Process optimization", "System integration"],
      order: 11
    },
    {
      title: "Appointment Booking",
      description: "Seamless booking automation with calendar synchronization.",
      icon: "Calendar",
      features: ["Calendar sync", "Auto reminders", "Payment integration"],
      order: 12
    },
    {
      title: "Email Marketing Automation",
      description: "Behavior-based email flows for maximum conversion rates.",
      icon: "Mail",
      features: ["Drip campaigns", "Segmentation", "Analytics tracking"],
      order: 13
    }
  ];

  for (const s of services) {
    await storage.createService(s as any);
  }

  console.log("Seeding completed!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
