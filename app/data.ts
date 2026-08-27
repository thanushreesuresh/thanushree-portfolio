export type Project = {
  slug: string;
  name: string;
  descriptor: string;
  description: string;
  tech?: string;
  features?: string;
  note: string;
  tone: string;
};

export const projects: Project[] = [
  {
    slug: "tiamo",
    name: "Tiamo",
    descriptor: "AI-Powered Emotional Presence Mobile App",
    tech: "Flutter, Supabase, PostgreSQL, Groq LLaMA 3.3 API",
    description: "Cross-platform Flutter app for long-distance couples.",
    features: "Features: real-time pairing, mood sharing, shared diary, time-locked messages, virtual presence lamp. Supabase used for auth, database, real-time sync. AI Companion Mode built with Groq LLaMA 3.3 for conversational interaction.",
    note: "MOBILE / AI",
    tone: "warm"
  },
  {
    slug: "prism",
    name: "PRISM",
    descriptor: "Paper Recognition and Intelligent Scoring Matrix",
    description: "AI-powered handwritten exam assessment platform using multimodal AI and rubric-based evaluation. Features human-in-the-loop grading, evidence-backed scoring, confidence-aware review, learning-gap analysis.",
    note: "2nd Prize, Adi Shankara AI Innovation Hackathon",
    tone: "paper"
  },
  {
    slug: "synth-and-steel",
    name: "Synth and Steel",
    descriptor: "AI Forklift Safety Solution",
    description: "AI-integrated forklift safety solution combining intelligent monitoring and automated safety measures to improve workplace accident prevention.",
    note: "1st Prize, Riti 11.0 - AI for Safer Workplaces",
    tone: "industrial"
  },
  {
    slug: "veritas-ai",
    name: "Veritas AI",
    descriptor: "Evidence-Driven AI Interview Platform",
    description: "AI interview platform that continuously verifies each claimed competency by collecting evidence throughout the interview, using a two-agent architecture (Interview Director + Evidence Engine), unlike traditional fixed-question scoring systems.",
    note: "ABtalks ViCodeathon",
    tone: "evidence"
  },
  {
    slug: "food-expiry-tracker",
    name: "Food Expiry Tracker",
    descriptor: "Group Project",
    tech: "HTML, CSS, JavaScript",
    description: "Web app to help users track food expiry dates and reduce food waste. Features for adding, monitoring, and managing food items.",
    note: "WEB",
    tone: "fresh"
  },
  {
    slug: "educational-game",
    name: "Educational Game for Students with Dyslexia and Dyspraxia",
    descriptor: "Accessibility-focused educational game",
    tech: "JavaScript, UI/UX Design",
    description: "Accessibility-focused educational game for students with learning difficulties, focused on visual clarity, simple navigation, engaging learning activities.",
    note: "ACCESSIBILITY",
    tone: "play"
  },
  {
    slug: "rental-equipment-platform",
    name: "Rental Equipment Platform",
    descriptor: "Web Platform",
    description: "Web platform enabling equipment rental in rural communities, focused on accessibility for non-technical users.",
    note: "COMMUNITY",
    tone: "community"
  }
];

export const skills = [
  ["Programming Languages", "Python, Java, C, SQL"],
  ["Mobile Development", "Flutter"],
  ["Web Development", "HTML, CSS, JavaScript"],
  ["Database & Backend", "PostgreSQL, Supabase"],
  ["UI/UX & Data Tools", "Figma, Canva, Excel, Google Sheets dashboards, data cleaning"],
  ["Concepts & Platforms", "OOP, APIs, Database Management, Problem Solving, GitHub, VS Code"]
] as const;

export const achievements = [
  "1st Prize - Synth and Steel ideathon, Riti 11.0 (AI for Safer Workplaces)",
  "2nd Prize - PRISM, Adi Shankara AI Innovation Hackathon",
  "3rd Prize - FreshTrack, TinkerHack 3.0",
  "Best Project Award - Intruder Alert System"
];

export const internships = [
  ["IBM SkillsBuild - AI Agent Architect Certification Program", "4 weeks, Jul 2025"],
  ["Python for Data Science, Sands Lab, Infopark Koratty, Thrissur", "3 weeks"],
  ["Data Analytics Intern, Analytics Career Connect", "1 month - Excel, data cleaning, pivot tables, dashboard creation"]
] as const;

export type Certification = {
  name: string;
  certificateFile?: string;
  status: "available" | "coming-soon";
};

export const certifications: Certification[] = [
  { name: "IBM SkillsBuild – Agentic AI", status: "coming-soon" },
  { name: "Intel – AI Certification", status: "coming-soon" },
  { name: "ICT Academy Kerala – MERN Full Stack", status: "coming-soon" },
  { name: "NASSCOM Digital 101 (Gold)", status: "coming-soon" },
  { name: "MathWorks Course Completion Certificate", status: "coming-soon" },
  { name: "C++ Training Completion Certificate", status: "coming-soon" }
];
