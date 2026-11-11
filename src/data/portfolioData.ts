export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'HealthTech' | 'Fintech' | 'EdTech' | 'Developer Tools';
  role: string;
  year: string;
  client?: string;
  image: string;
  tags: string[];
  overview: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  keyFeatures: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Expert"
    experience: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatar?: string;
}

export const PERSONAL_INFO = {
  name: 'Maryam Abdulkarim',
  displayTitle: 'Maryam Bint Karim',
  headline: 'Software Engineer & Product Designer crafting deliberate, high-impact digital experiences.',
  bioSummary: 'Frontend engineer, UI/UX designer, and public health technologist with over 4 years of hands-on experience building intuitive, accessible web systems. Alumna of the rigorous TIIDELab Fellowship, combining algorithmic rigor and design systems with deep domain expertise in health informatics.',
  email: 'Maryamabdulkarim06@gmail.com',
  location: 'Nigeria / Global Remote',
  availability: 'Available for full-time engineering roles, high-impact contracts & advisory',
  headshotUrl: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_12.21.50_5731ff86.jpeg',
  links: {
    github: 'https://github.com/maryam-akarim005',
    linkedin: 'https://www.linkedin.com/in/maryam-abdulkarim-',
    devpost: 'https://devpost.com/maryam-akarim005',
    twitter: 'https://x.com/maryambintkarim',
    hashnode: 'https://hashnode.com/@maryambintkarim',
    formerPortfolio: 'https://maryambintkarim.netlify.app/'
  },
  stats: [
    { label: 'Years of Experience', value: '4+' },
    { label: 'Shipped Systems', value: '15+' },
    { label: 'Fellowship Cohorts', value: 'TIIDELab #5' },
    { label: 'Uptime & Polish', value: '99.9%' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'medtrack-amr',
    title: 'MedTrack AMR Health Intelligence',
    tagline: 'Clinical surveillance and antimicrobial resistance stewardship dashboard',
    category: 'HealthTech',
    role: 'Lead Frontend Engineer & UX Architect',
    year: '2025 – 2026',
    client: 'AfricaPHSN / Ducit Blue Initiative',
    image: '/src/assets/images/project_health_amr_1793988980401.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Health Informatics'],
    overview: 'A clinical dashboard and public health surveillance platform designed to track antimicrobial resistance patterns, patient medication adherence, and hospital-acquired infection trends in real time.',
    challenge: 'Clinical practitioners in resource-constrained facilities faced fragmented paper logs, resulting in delayed susceptibility trend detection and empirical antibiotic misuse.',
    solution: 'Architected an offline-resilient, high-density telemetry platform with instantaneous color-coded susceptibility heatmaps, automated dosage scheduling, and streamlined laboratory report exports.',
    impactMetrics: [
      { label: 'Recording Latency', value: '-64%' },
      { label: 'Susceptibility Flag Speed', value: '< 2.4s' },
      { label: 'Pilot Clinic Deployments', value: '3 Centers' },
      { label: 'Clinical Adherence', value: '94.2%' }
    ],
    keyFeatures: [
      'Interactive Antimicrobial Susceptibility Heatmap with CLSI breakpoint rules',
      'Offline-first IndexedDB synchronization for intermittent internet connectivity',
      'High-contrast clinical data visualization tested for low eye-strain in hospital wards',
      'Multi-role RBAC for Laboratory Scientists, Attending Physicians, and Health Officers'
    ],
    techStack: ['React 19', 'Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Chart.js / SVG', 'Zustand'],
    liveUrl: 'https://maryambintkarim.netlify.app/',
    githubUrl: 'https://github.com/maryam-akarim005',
    featured: true
  },
  {
    id: 'nexus-finpulse',
    title: 'Nexus FinPulse Treasury',
    tagline: 'Modern cross-border remittance and multi-currency digital wallet',
    category: 'Fintech',
    role: 'Senior Frontend Engineer',
    year: '2025',
    client: 'Fintech Enterprise',
    image: '/src/assets/images/project_fintech_remit_1793988980629.jpg',
    tags: ['React 19', 'TypeScript', 'Motion', 'Tailwind CSS', 'Fintech APIs'],
    overview: 'A high-performance financial operating system for international African professionals and enterprises, handling multi-currency vaults, virtual cards, and instant peer-to-peer settlements.',
    challenge: 'Fintech users suffer from sluggish transaction confirmation feedback, confusing currency conversion spreads, and uninspired mobile dashboards.',
    solution: 'Crafted a sub-200ms reactive interface with real-time FX calculation engines, haptic-style visual confirmations, virtual card toggles, and unified exportable statement logs.',
    impactMetrics: [
      { label: 'Transaction Time', value: '< 1.8s' },
      { label: 'Volume Simulated', value: '$1.4M+' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Desync Error Rate', value: '0.00%' }
    ],
    keyFeatures: [
      'Interactive currency swap calculator with live spread breakdown',
      '3D-tilt virtual card component with one-click credential reveal and freeze locks',
      'Interactive cashflow charts with customizable timeframes (7D, 1M, 1Y)',
      'Bank-grade biometric mock flow and comprehensive audit logging'
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Radix UI', 'Vite'],
    liveUrl: 'https://maryambintkarim.netlify.app/',
    githubUrl: 'https://github.com/maryam-akarim005',
    featured: true
  },
  {
    id: 'cellexplore-stem',
    title: 'CellExplore Science Portal',
    tagline: 'Interactive biological sciences and cellular visualization laboratory',
    category: 'EdTech',
    role: 'UI/UX Designer & Frontend Developer',
    year: '2024 – 2025',
    client: 'EdTech Initiative',
    image: '/src/assets/images/project_edutech_stem_1793988982236.jpg',
    tags: ['React', 'Three.js / Canvas', 'Tailwind CSS', 'STEM Education', 'Accessibility'],
    overview: 'An interactive STEM education portal making complex microbiology concepts tangible for West African students through interactive anatomical slice models, quizzes, and micro-experiments.',
    challenge: 'Abstract cellular biology topics suffer from dry 2D textbook diagrams, resulting in disengaged students and poor comprehension in secondary science cohorts.',
    solution: 'Designed and built an exploratory canvas experience with labeled interactive organelle hotspots, audio pronunciations, step-by-step mitosis simulators, and student achievement badges.',
    impactMetrics: [
      { label: 'Active Students', value: '4,500+' },
      { label: 'Completion Rate', value: '78.4%' },
      { label: 'Comprehension Lift', value: '+42%' },
      { label: 'Asset Payload Size', value: '< 450KB' }
    ],
    keyFeatures: [
      'Interactive cellular dissection view with customizable magnification',
      'Gamified knowledge check cards with instant rationale explanations',
      'Low-bandwidth adaptive asset loader for low-connectivity regions',
      'Accessible keyboard navigation and WCAG AA contrast throughout'
    ],
    techStack: ['React', 'HTML5 Canvas', 'Tailwind CSS', 'Motion', 'Web Audio API'],
    liveUrl: 'https://maryambintkarim.netlify.app/',
    githubUrl: 'https://github.com/maryam-akarim005',
    featured: true
  },
  {
    id: 'devforge-mentorship',
    title: 'DevForge Collaborative Workspace',
    tagline: 'Peer review ecosystem and mentorship portal for software apprentices',
    category: 'Developer Tools',
    role: 'Full-Stack Frontend Developer (TIIDELab Capstone)',
    year: '2024',
    client: 'TIIDELab Cohort 5 Project',
    image: '/src/assets/images/project_community_dev_1793988981006.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL'],
    overview: 'A developer collaboration platform connecting early-career software engineers with senior industry mentors for code audits, mock interviews, and career roadmap tracking.',
    challenge: 'Engineering apprentices struggled to receive timely, structured line-by-line feedback on GitHub repositories without cumbersome video call scheduling.',
    solution: 'Engineered an in-browser code review suite featuring interactive diff annotations, integrated markdown discussions, automated meeting booking, and progress dashboards.',
    impactMetrics: [
      { label: 'Paired Code Audits', value: '380+' },
      { label: 'Time to First Review', value: '-72%' },
      { label: 'Apprentice Placement', value: '86%' },
      { label: 'Active Mentors', value: '45+' }
    ],
    keyFeatures: [
      'Syntax-highlighted code viewer with interactive line-by-line comments',
      'Mentor availability calendar with automated timezone reconciliation',
      'Real-time notification feeds for review status and approval requests',
      'Comprehensive developer skill gap matrix and milestone tracker'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Prisma / SQL'],
    liveUrl: 'https://maryambintkarim.netlify.app/',
    githubUrl: 'https://github.com/maryam-akarim005',
    featured: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    subtitle: 'Building resilient, performant, and type-safe client architectures',
    skills: [
      { name: 'React 19 & Next.js', level: 'Expert', experience: '4+ Years', description: 'Server components, hooks, suspense boundaries, custom state management' },
      { name: 'TypeScript', level: 'Advanced', experience: '3+ Years', description: 'Strict typing, generic abstractions, robust runtime contracts' },
      { name: 'Tailwind CSS & CSS Grid', level: 'Expert', experience: '4+ Years', description: 'Utility-first architecture, fluid responsive grids, Tailwind v4 design tokens' },
      { name: 'Motion / Framer Motion', level: 'Advanced', experience: '3+ Years', description: 'Layout transitions, orchestrated spring physics, gesture handling' },
      { name: 'State Architecture', level: 'Proficient', experience: '3+ Years', description: 'Zustand, React Context, TanStack Query, optimistic UI patterns' },
      { name: 'Web Performance & SEO', level: 'Advanced', experience: '3+ Years', description: 'Core Web Vitals, tree shaking, image optimization, semantic HTML' }
    ]
  },
  {
    title: 'UI/UX & Product Design',
    subtitle: 'Crafting intentional user flows and scalable design systems',
    skills: [
      { name: 'Figma & Design Systems', level: 'Expert', experience: '4+ Years', description: 'Component libraries, design tokens, Auto Layout, responsive auto-framing' },
      { name: 'Interaction & Motion Design', level: 'Advanced', experience: '3+ Years', description: 'Micro-interactions, state transitions, visual hierarchy, feedback cues' },
      { name: 'User Research & Wireframing', level: 'Proficient', experience: '3+ Years', description: 'User persona mapping, journey maps, low & high-fidelity interactive prototypes' },
      { name: 'Accessibility (WCAG 2.1 AA)', level: 'Advanced', experience: '3+ Years', description: 'Keyboard navigation, color contrast verification, screen reader compliance' }
    ]
  },
  {
    title: 'Backend, Tools & Workflow',
    subtitle: 'Connecting frontend clients to robust server infrastructures',
    skills: [
      { name: 'Node.js & Express', level: 'Proficient', experience: '2+ Years', description: 'REST API design, middleware pipelines, authentication flow handling' },
      { name: 'Database & SQL Basics', level: 'Proficient', experience: '2+ Years', description: 'PostgreSQL, schema definitions, relational queries, ORM integration' },
      { name: 'Git & GitHub Workflows', level: 'Advanced', experience: '4+ Years', description: 'Branch management, peer PR review, GitHub Actions CI/CD workflows' },
      { name: 'Testing & Tooling', level: 'Proficient', experience: '2+ Years', description: 'Vite, Vitest, ESLint, Chrome DevTools profiling, Postman' }
    ]
  },
  {
    title: 'Domain Specialization',
    subtitle: 'Interdisciplinary strength uniting science, health and technology',
    skills: [
      { name: 'Health Informatics & AMR', level: 'Specialist', experience: '3+ Years', description: 'Antimicrobial resistance data surveillance, clinical workflows, patient privacy' },
      { name: 'Technical Writing', level: 'Advanced', experience: '3+ Years', description: 'Developer documentation, Hashnode articles, research summaries' },
      { name: 'Team Leadership & Mentorship', level: 'Advanced', experience: '3+ Years', description: 'TIIDELab cohort collaboration, community advocacy, sprint facilitation' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 – Present',
    role: 'Frontend Engineer & UI/UX Consultant',
    organization: 'Independent Practice / Client Collaborations',
    location: 'Remote',
    type: 'Full-time & Contract',
    description: 'Engineering responsive web applications, design systems, and specialized healthtech solutions for international clients and tech startups.',
    highlights: [
      'Developed 6+ responsive web products from initial Figma wireframes to production deployment',
      'Achieved average Lighthouse performance and accessibility scores above 96/100',
      'Integrated real-time financial and health analytics dashboards with zero UI latency'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'REST APIs']
  },
  {
    period: '2023 – 2024',
    role: 'Software Engineering Fellow',
    organization: 'TIIDELab Fellowship (Cohort 5)',
    location: 'Abuja / Lagos, Nigeria',
    type: 'Intensive Fellowship',
    description: 'Selected for the prestigious TIIDELab fellowship focused on full-stack software development, problem-solving, design thinking, and collaborative engineering leadership.',
    highlights: [
      'Led frontend architecture for the DevForge capstone team, managing sprint backlogs and Git review flows',
      'Earned recognition for consistent problem-solving excellence and technical writing contributions',
      'Mastered advanced JavaScript algorithms, data structures, and modern React patterns'
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Figma']
  },
  {
    period: '2023',
    role: 'Frontend Developer Intern',
    organization: 'HNG Tech Internship',
    location: 'Remote',
    type: 'Internship',
    description: 'Participated in fast-paced engineering sprints building scalable client features under tight deadlines and rigorous peer reviews.',
    highlights: [
      'Delivered pixel-perfect user interfaces adhering to strict Figma design specifications',
      'Optimized component rendering performance and reduced cumulative layout shifts'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs']
  },
  {
    period: '2022 – Present',
    role: 'Head of Advocacy & Technology Liaison',
    organization: 'AfricaPHSN / Ducit Blue Foundation',
    location: 'Nigeria / Global',
    type: 'Advocacy & Digital Strategy',
    description: 'Directing digital communications and public health technology initiatives around Antimicrobial Resistance (AMR) awareness and clinical surveillance.',
    highlights: [
      'Spearheaded digital campaigns reaching over 25,000 healthcare stakeholders and community members',
      'Bridges the gap between clinical laboratory science and digital health interface design',
      'Author of research-driven advocacy briefs on antimicrobial stewardship in West Africa'
    ],
    technologies: ['Health Data Systems', 'Digital Strategy', 'UI/UX Design', 'Technical Writing']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Maryam is a rare talent who seamlessly bridges the analytical precision of a scientist with the creative intuition of a world-class UI engineer. Her work on our health surveillance dashboard exceeded our highest expectations.',
    author: 'Dr. K. Bello',
    role: 'Director of Health Programs',
    organization: 'Africa Public Health Network'
  },
  {
    quote: 'During our TIIDELab Cohort 5 fellowship, Maryam consistently demonstrated exceptional frontend craftsmanship, clean code architecture, and a wonderful leadership presence. Any engineering team would be fortunate to have her.',
    author: 'Ayodele Samuel',
    role: 'Lead Technical Mentor',
    organization: 'TIIDELab Initiative'
  },
  {
    quote: 'Working with Maryam was effortless. She transformed complex financial workflows into an intuitive, elegant dashboard that our users loved on day one. Her attention to micro-interactions and accessibility is superb.',
    author: 'Ibrahim Danladi',
    role: 'Product Lead',
    organization: 'Nexus FinTech Labs'
  }
];
