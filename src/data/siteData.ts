import {
  ServiceItem,
  PortfolioItem,
  VideoTestimonial,
  BlogPost,
  FAQItem,
  IndustryItem
} from '../types';

export const LOGO_URL = 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1784891326/Digital_Sate_Hub_Logo_raunki.png';

export const PLATFORMS_LIST = [
  'GoHighLevel',
  'WordPress',
  'Shopify',
  'Kajabi',
  'Systeme.io',
  'ClickFunnels',
  'Webflow',
  'Squarespace',
  'Wix',
  'HubSpot',
  'Mailchimp',
  'ActiveCampaign',
  'Zapier',
  'Make',
  'Stripe'
];

export const HERO_SHOWCASE_ITEMS = [
  {
    id: 'websites',
    title: 'High-Converting Website Design',
    category: 'Web Design',
    caption: 'Custom ultra-fast website architecture with built-in conversion psychology.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    type: 'Website'
  },
  {
    id: 'landing-pages',
    title: 'High-Yield Landing Pages',
    category: 'Landing Pages',
    caption: 'Precision lead capture pages optimized for paid ad traffic and high opt-in rates.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    type: 'Landing Page'
  },
  {
    id: 'funnels',
    title: 'Multi-Step Sales Funnels',
    category: 'Sales Funnels',
    caption: 'Seamless upsell, order bump, and checkout sequences maximizing average order value.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    type: 'Funnel'
  },
  {
    id: 'crm-dashboards',
    title: 'GoHighLevel CRM & Pipeline Dashboards',
    category: 'CRM Systems',
    caption: 'Unified lead tracking, deal pipelines, and automated revenue attribution visuals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    type: 'CRM Dashboard'
  },
  {
    id: 'mobile-responsiveness',
    title: 'Mobile-First Responsiveness',
    category: 'Mobile UX',
    caption: 'Lightning-fast mobile experiences designed for touch navigation and instant load times.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    type: 'Mobile UX'
  },
  {
    id: 'automation-workflows',
    title: 'Automated Follow-Up Workflows',
    category: 'Automation',
    caption: 'Triggered 5-minute SMS & email sequences ensuring zero lead leakage.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    type: 'Workflow Engine'
  },
  {
    id: 'transformations',
    title: 'Before & After Conversion Overhauls',
    category: 'CRO Optimization',
    caption: 'Transforming slow, static websites into automated revenue engines.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    type: 'Transformation'
  },
  {
    id: 'notifications',
    title: 'Real-Time Lead & Analytics Alerts',
    category: 'Lead Tracking',
    caption: 'Instant Slack, SMS, and Mobile push notifications when high-intent leads book calls.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    type: 'Analytics'
  }
];

export const STATS_COUNTERS = [
  { value: 150, suffix: '+', label: 'Projects Completed', highlight: 'Turnkey Digital Assets' },
  { value: 20, suffix: '+', label: 'Industries Served', highlight: 'Proven Across B2B & B2C' },
  { value: 500, suffix: '+', label: 'Marketing Automations Built', highlight: 'Hours Saved Daily' },
  { value: 95, suffix: '%', label: 'Client Satisfaction', highlight: 'Long-Term Retention' },
  { value: 10, suffix: '+', label: 'Platforms Supported', highlight: 'CRM & Funnel Ecosystems' }
];

export const PAIN_POINTS = [
  {
    id: 'no-conversion',
    title: "Visitors Aren't Converting",
    desc: "You get steady web traffic, but your contact form sits empty and bounce rates remain dangerously high.",
    icon: 'TrendingDown',
    stat: '88% of visitors bounce due to poor UX'
  },
  {
    id: 'cracks',
    title: 'Leads Slip Through the Cracks',
    desc: 'Potential customers inquire outside office hours or during busy days without instant follow-ups, losing them to competitors.',
    icon: 'UserX',
    stat: '78% buy from the first business that responds'
  },
  {
    id: 'manual-time',
    title: 'Manual Follow-ups Waste Time',
    desc: 'Your sales team wastes precious hours copying email templates, scheduling calls manually, and pasting data between apps.',
    icon: 'Clock',
    stat: '15+ hrs lost weekly per team member'
  },
  {
    id: 'fragmented-tools',
    title: "Marketing Tools Don't Work Together",
    desc: 'You pay for 5 different software tools that don\'t sync, creating data silos and double data entry.',
    icon: 'Unplug',
    stat: '$1,200/mo spent on redundant subscriptions'
  },
  {
    id: 'no-revenue',
    title: 'Websites Look Good But Fail to Generate Revenue',
    desc: 'Your site looks pretty like an online brochure, but lacks clear CTA visual hierarchy, lead magnets, or automated booking engines.',
    icon: 'AlertTriangle',
    stat: 'Zero correlation between "pretty" and conversion'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    shortDesc: 'Custom, high-performing websites engineered to position your brand as the market leader and turn traffic into booked meetings.',
    fullDesc: 'We build fast, responsive, conversion-focused websites that go beyond aesthetic appeal. Every layout is crafted around user journey mapping, strategic contrast, clear call-to-actions, and mobile-first performance.',
    icon: 'Globe',
    keyResult: '2.8x Average Increase in Lead Conversion Rate',
    features: [
      'Custom Brand Strategy & Wireframing',
      'Mobile-First Responsive Architecture',
      'SEO-Optimized Speed & Clean Code',
      'Seamless Calendar & Form Integrations',
      'Built-In Analytics & Event Tracking'
    ],
    platforms: ['WordPress', 'Webflow', 'GoHighLevel', 'Shopify', 'Squarespace', 'Wix'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sales-funnels',
    title: 'Sales Funnels',
    shortDesc: 'Strategic multi-step sales paths designed to guide cold prospects into high-ticket buyers and repeat clients.',
    fullDesc: 'A sales funnel removes distraction. We design laser-focused sales pages, application funnels, webinar funnels, and checkout flows equipped with order bumps, upsells, and automated abandoned-cart recovery.',
    icon: 'Filter',
    keyResult: '+42% Increase in Average Order Value (AOV)',
    features: [
      'Application & VSL Funnel Architecture',
      'Order Bumps & One-Click Upsells',
      'A/B Split Testing Setup',
      'Payment Gateway & Stripe Integrations',
      'Instant Conversion & CRM Sync'
    ],
    platforms: ['GoHighLevel', 'ClickFunnels', 'Systeme.io', 'Kajabi', 'Webflow'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    shortDesc: 'Laser-focused lead capture and direct-response pages optimized for ad campaigns and product launches.',
    fullDesc: 'When running Google or Meta Ads, sending traffic to a homepage wastes money. Our dedicated landing pages target single pain points with high-converting copy and zero visual clutter.',
    icon: 'Layout',
    keyResult: '35% to 55% Lead Magnet Opt-In Rates',
    features: [
      'Ad-to-Page Messaging Matching',
      'High-Speed Sub-Second Loading',
      'Dynamic Keyword Insertion',
      'Interactive Lead Magnets & Quizzes',
      'Pixel & Conversion API Tracking'
    ],
    platforms: ['GoHighLevel', 'WordPress', 'Webflow', 'Unbounce', 'Systeme.io'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'crm-setup',
    title: 'CRM Setup & Optimization',
    shortDesc: 'Unified CRM pipelines and contact management engines to track every opportunity from lead to closed customer.',
    fullDesc: 'Stop losing deal visibility. We set up custom GoHighLevel or HubSpot CRM pipelines, complete with deal stages, automated task assignments, review requests, and live team activity dashboards.',
    icon: 'Database',
    keyResult: '100% Pipeline Visibility & 3x Faster Deal Cycles',
    features: [
      'Custom Deal Stages & Lead Tagging',
      'Automated Opportunity Pipelines',
      'Two-Way SMS & Email Inbox Setup',
      'Team Assignment & Lead Distribution',
      'Revenue Reporting & KPI Dashboards'
    ],
    platforms: ['GoHighLevel', 'HubSpot', 'ActiveCampaign'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    shortDesc: 'Automated 24/7 workflows that handle lead routing, instant follow-ups, and appointment reminders automatically.',
    fullDesc: 'Never send a manual follow-up email again. We build automated workflow trees that send personalized SMS and email messages within seconds of form submission, boosting appointment show rates.',
    icon: 'Zap',
    keyResult: '98% Instant Lead Contact Rate Within 5 Minutes',
    features: [
      'Triggered SMS & Email Nurture Chains',
      'Multi-Channel Zapier & Make Workflows',
      'Automated Appointment Reminders & No-Show Recovery',
      'Smart Conditional If/Else Logic',
      'Webhook & API Multi-Tool Integrations'
    ],
    platforms: ['Zapier', 'Make', 'GoHighLevel', 'ActiveCampaign'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    shortDesc: 'Behavioral email sequences and newsletter systems that nurture cold leads into loyal, repeat customers.',
    fullDesc: 'Email remains the highest ROI marketing channel. We write, design, and automate welcome series, re-engagement campaigns, product launches, and weekly broadcast templates.',
    icon: 'Mail',
    keyResult: '$38 ROI per $1 Spent on Email Sequences',
    features: [
      'Automated Welcome & Lead Magnet Delivery',
      'Segmentation & Behavioral Tagging',
      'Custom HTML & Plain Text Templates',
      'Spam Score Optimization & Deliverability Audits',
      'Automated Review Generation Sequences'
    ],
    platforms: ['GoHighLevel', 'Mailchimp', 'ActiveCampaign', 'Kajabi', 'HubSpot'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    shortDesc: 'Cutting-edge AI conversational agents and automated content engines to qualify leads and answer FAQs 24/7.',
    fullDesc: 'Integrate custom AI chat and voice agents directly into your website and CRM. Qualify incoming prospects, answer service questions instantly, and book appointments directly into your calendar without human intervention.',
    icon: 'Bot',
    keyResult: '24/7 Instant Lead Qualification & Booking',
    features: [
      'Custom AI Web Chat Bots Trained on Your Business',
      'SMS AI Booking Assistant Integrations',
      'Automated AI Proposal & Quote Generators',
      'Instant Lead Scoring & Sentiment Analysis',
      'Multi-Lingual Customer Support Agents'
    ],
    platforms: ['GoHighLevel', 'Zapier', 'Make', 'OpenAI / Gemini API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cro',
    title: 'Conversion Rate Optimization (CRO)',
    shortDesc: 'Data-driven UI/UX enhancements and A/B split testing to squeeze maximum revenue out of your existing web traffic.',
    fullDesc: 'Instead of spending more money on ads, convert a higher percentage of the visitors you already have. We perform UX audits, heatmaps analysis, copy refactoring, and frictionless checkout overhauls.',
    icon: 'LineChart',
    keyResult: '+30% to +85% Revenue Lift Without Increasing Ad Spend',
    features: [
      'Heatmap & Session Recording Audits',
      'Headline & CTA Copywriting Overhauls',
      'Frictionless Form & Checkout Redesigns',
      'A/B & Multivariate Split Testing',
      'Speed & Performance Optimization'
    ],
    platforms: ['Google Analytics', 'GoHighLevel', 'Hotjar', 'Webflow'],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
  }
];

export const DIFFERENTIATORS = [
  {
    title: 'Conversion-Driven Strategy',
    desc: 'We don\'t just design pretty interfaces. Every pixel, heading, and button is strategically engineered for maximum lead capture and sales conversion.',
    icon: 'Target'
  },
  {
    title: 'Modern, Responsive Design',
    desc: 'Flawless loading speeds and pixel-perfect responsiveness across desktop, tablet, and mobile screens to keep bounce rates minimal.',
    icon: 'Smartphone'
  },
  {
    title: 'Automation That Saves Time',
    desc: 'Eliminate manual tasks with automated follow-ups, instantaneous SMS alerts, appointment scheduling, and CRM pipeline syncing.',
    icon: 'Cpu'
  },
  {
    title: 'Platform-Agnostic Solutions',
    desc: 'We work inside your preferred tech stack — GoHighLevel, WordPress, Webflow, Shopify, ClickFunnels, Zapier — or recommend the ultimate stack.',
    icon: 'Layers'
  },
  {
    title: 'Scalable Systems',
    desc: 'We build future-proof digital infrastructure designed to handle 10x traffic spikes and growing sales teams seamlessly.',
    icon: 'TrendingUp'
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We don\'t disappear after launch. We provide ongoing support, split-testing guidance, and system optimizations as your business grows.',
    icon: 'ShieldCheck'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'apex-coaching',
    title: 'Apex Growth Academy - High-Ticket Application Funnel',
    clientName: 'Apex Growth Academy',
    industry: 'Coaching & Consulting',
    challenge: 'Relying on manual direct messages to book strategy calls, resulting in low qualified leads and high calendar drop-off.',
    solution: 'Designed a VSL (Video Sales Letter) application funnel on GoHighLevel with dynamic lead scoring and automated SMS reminders.',
    outcome: 'Generated $140,000+ in new high-ticket coaching revenue within 60 days with an 84% call show-up rate.',
    platforms: ['GoHighLevel', 'Stripe', 'Zapier'],
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    previewType: 'funnel',
    featured: true,
    stats: [
      { label: 'New Revenue', value: '$140k+' },
      { label: 'Call Show Rate', value: '84%' },
      { label: 'Time Saved/Wk', value: '18 hrs' }
    ]
  },
  {
    id: 'lumina-skin',
    title: 'Lumina Medical Aesthetics - Multi-Location Booking Engine',
    clientName: 'Lumina Aesthetics',
    industry: 'Healthcare & Beauty',
    challenge: 'Old WordPress site was slow, confusing for patients, and required phone calls during business hours to schedule appointments.',
    solution: 'Built a sleek Webflow front-end integrated with GoHighLevel calendar booking, deposit payment flow, and automated pre-treatment SMS instructions.',
    outcome: 'Increased online appointment bookings by 210% and reduced front-desk phone volume by 65%.',
    platforms: ['Webflow', 'GoHighLevel', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    previewType: 'website',
    featured: true,
    stats: [
      { label: 'Booking Lift', value: '+210%' },
      { label: 'Call Reduction', value: '65%' },
      { label: 'Deposit Revenue', value: '$28k/mo' }
    ]
  },
  {
    id: 'vanguard-realty',
    title: 'Vanguard Luxury Real Estate - Automated Buyer Funnel',
    clientName: 'Vanguard Realty Group',
    industry: 'Real Estate',
    challenge: 'Expensive Zillow leads were sitting untouched for hours, leading to cold buyers and low conversion rates.',
    solution: 'Created an instant lead response system that sends custom property video brochures via SMS within 60 seconds of inquiry.',
    outcome: 'Achieved a 4.2x increase in agent-client consultations and converted 14 luxury listings in 90 days.',
    platforms: ['GoHighLevel', 'ActiveCampaign', 'WordPress'],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    previewType: 'dashboard',
    featured: true,
    stats: [
      { label: 'Response Time', value: '< 60 sec' },
      { label: 'Consultations', value: '4.2x' },
      { label: 'Closed Listings', value: '14 Deals' }
    ]
  },
  {
    id: 'solarpulse-homes',
    title: 'SolarPulse Solutions - High-Yield Lead Generation Site',
    clientName: 'SolarPulse Home Services',
    industry: 'Home Services',
    challenge: 'Generic lead form resulted in poor quality leads and endless phone tag for quotes.',
    solution: 'Engineered an interactive 4-step savings calculator lead magnet with instant qualifying questions and automated SMS appointment scheduling.',
    outcome: 'Boosted qualified lead volume by 310% and cut cost-per-lead (CPL) by 45%.',
    platforms: ['GoHighLevel', 'Zapier', 'Meta Ads'],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    previewType: 'mobile',
    featured: false,
    stats: [
      { label: 'Lead Volume', value: '+310%' },
      { label: 'CPL Reduction', value: '-45%' },
      { label: 'Opt-in Rate', value: '41%' }
    ]
  },
  {
    id: 'fitpro-membership',
    title: 'FitPro All-Access - Hybrid SaaS & Coaching Platform',
    clientName: 'FitPro Global',
    industry: 'Fitness & E-commerce',
    challenge: 'Fragmented membership portal on Kajabi was clunky and had high monthly subscriber churn.',
    solution: 'Redesigned Kajabi portal with custom video curriculum pages, automated workout check-in text sequences, and community onboarding.',
    outcome: 'Decreased 30-day member churn from 18% down to 4.2% and scaled to 2,400 active paying members.',
    platforms: ['Kajabi', 'Stripe', 'ActiveCampaign'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    previewType: 'website',
    featured: false,
    stats: [
      { label: 'Active Members', value: '2,400' },
      { label: 'Churn Reduction', value: '18% → 4.2%' },
      { label: 'MRR Growth', value: '+$64k' }
    ]
  },
  {
    id: 'scale-agency',
    title: 'ScaleFlow B2B Agency - Automated Client Acquisition System',
    clientName: 'ScaleFlow Marketing',
    industry: 'Agencies',
    challenge: 'Founders spent 20 hours a week on sales calls with unqualified prospects looking for budget services.',
    solution: 'Built a 2-step qualifying survey funnel that auto-disqualifies low budget leads and routes high-intent leads straight to senior calendar slots.',
    outcome: 'Saved 15 hours/week of founder time while increasing average retainer deal size by 60%.',
    platforms: ['Webflow', 'GoHighLevel', 'Make'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    previewType: 'funnel',
    featured: false,
    stats: [
      { label: 'Deal Size', value: '+60%' },
      { label: 'Hours Saved', value: '15 hrs/wk' },
      { label: 'Qualified Rate', value: '89%' }
    ]
  }
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'david-m',
    clientName: 'David Miller',
    company: 'Apex Growth Academy',
    role: 'Founder & CEO',
    serviceProvided: 'Sales Funnel & GoHighLevel Setup',
    shortQuote: '"Digital Sate Hub completely transformed our client acquisition. Our lead-to-booking rate tripled within 30 days of launch!"',
    videoThumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    duration: '1:45',
    keyResultStat: '3x Booking Conversion Rate',
    rating: 5
  },
  {
    id: 'dr-sarah-j',
    clientName: 'Dr. Sarah Jenkins',
    company: 'Lumina Medical Spa',
    role: 'Medical Director',
    serviceProvided: 'Website Redesign & Automated CRM',
    shortQuote: '"Our clinic went from phone tag headaches to automated deposit bookings every single night. They built us a true revenue engine."',
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    duration: '2:10',
    keyResultStat: '+210% Patient Bookings',
    rating: 5
  },
  {
    id: 'marcus-v',
    clientName: 'Marcus Vance',
    company: 'Vanguard Luxury Realty',
    role: 'Managing Broker',
    serviceProvided: 'Automated Lead Follow-up System',
    shortQuote: '"In luxury real estate, speed to lead is everything. Digital Sate Hub\'s 60-second automated video SMS pipeline closed us 14 deals in 3 months."',
    videoThumbnail: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    duration: '1:30',
    keyResultStat: '14 Listings Closed in 90 Days',
    rating: 5
  },
  {
    id: 'elena-r',
    clientName: 'Elena Rostova',
    company: 'FitPro Memberships',
    role: 'Head of Growth',
    serviceProvided: 'Kajabi Portal & Email Automation',
    shortQuote: '"Their attention to conversion detail and seamless automated emails dropped our churn to an all-time low. Truly outstanding partner."',
    videoThumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    duration: '1:55',
    keyResultStat: 'Churn Dropped from 18% to 4.2%',
    rating: 5
  }
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'coaches-consultants',
    name: 'Coaches & Consultants',
    icon: 'GraduationCap',
    description: 'High-ticket VSL funnels, application filters, and automated calendar scheduling systems.',
    keyFocus: 'Application Funnels & Qualification'
  },
  {
    id: 'agencies',
    name: 'Agencies',
    icon: 'Briefcase',
    description: 'White-label GoHighLevel pipelines, onboarding automations, and client reporting dashboards.',
    keyFocus: 'Client Onboarding & Sub-Accounts'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness',
    icon: 'HeartPulse',
    description: 'HIPAA-friendly patient booking engines, automated intake forms, and appointment SMS reminders.',
    keyFocus: 'Online Appointments & SMS Reminders'
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: 'Home',
    description: 'Interactive instant quote calculators, speed-to-lead SMS routing, and Google review generation.',
    keyFocus: 'Instant Quote Calculators & Speed-to-Lead'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Building',
    description: 'Property showcase funnels, SMS listing alerts, and lead nurturing pipelines for agents & brokers.',
    keyFocus: 'Lead Nurture Pipelines & Listing Funnels'
  },
  {
    id: 'e-commerce',
    name: 'E-commerce & Brands',
    icon: 'ShoppingBag',
    description: 'High-converting landing pages, custom Shopify setups, abandoned cart recoveries, and upsells.',
    keyFocus: 'Order Bumps & Cart Recovery'
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: 'Shield',
    description: 'Legal, accounting, and financial firm sites designed for authority positioning and consultation bookings.',
    keyFocus: 'Authority Positioning & Consultations'
  },
  {
    id: 'education',
    name: 'Education & Online Courses',
    icon: 'BookOpen',
    description: 'Kajabi & Systeme.io course portals, automated webinar funnels, and student engagement workflows.',
    keyFocus: 'Webinar Funnels & Membership Portals'
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    icon: 'Sparkles',
    description: 'Visual medical spa websites, online deposit bookings, and automated review request sequences.',
    keyFocus: 'Visual Booking & Deposit Systems'
  },
  {
    id: 'nonprofits',
    name: 'Nonprofits',
    icon: 'Users',
    description: 'Donor engagement landing pages, recurring donation funnels, and volunteer management automations.',
    keyFocus: 'Donor Landing Pages & Email Nurture'
  },
  {
    id: 'fitness',
    name: 'Fitness & Gyms',
    icon: 'Dumbbell',
    description: '7-day trial pass lead magnets, class booking calendars, and automated SMS no-show follow-ups.',
    keyFocus: 'Trial Pass Funnels & SMS Attendance'
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Events',
    icon: 'Utensils',
    description: 'Direct venue booking funnels, event ticket sales pages, and automated confirmation reminders.',
    keyFocus: 'Direct Event Booking & Ticket Sales'
  }
];

export const FAQS_LIST: FAQItem[] = [
  {
    id: 'redesign-existing',
    question: 'Can you redesign my existing website without breaking my current setup?',
    answer: 'Absolutely! We can completely overhaul your website\'s visual design, copy structure, and speed on your current domain without losing any search engine rankings or customer data. We work in a staging environment so your current site remains live until the new high-converting build is 100% ready.',
    category: 'redesign'
  },
  {
    id: 'gohighlevel-need',
    question: 'Do I need to use GoHighLevel, or can you work with my current tools?',
    answer: 'While GoHighLevel is our top recommendation for businesses looking for an all-in-one CRM, pipeline, calendar, and SMS automation system, it is NOT required. We are platform-agnostic and regularly build and optimize systems on WordPress, Webflow, Shopify, Kajabi, Systeme.io, HubSpot, ActiveCampaign, Zapier, and Make.',
    category: 'platforms'
  },
  {
    id: 'current-platform',
    question: 'Can you work with my current website platform or CRM?',
    answer: 'Yes! Whether you are on WordPress, Webflow, Shopify, Squarespace, Wix, HubSpot, or custom code, we can design, refactor, or integrate automation webhooks directly into your existing infrastructure.',
    category: 'platforms'
  },
  {
    id: 'custom-funnels',
    question: 'Do you build custom sales funnels tailored specifically to my offer?',
    answer: 'Yes, every single funnel we build is 100% custom-tailored to your specific customer journey, offer price point, and target market. We don\'t use generic templates. We write custom conversion copy, build custom wireframes, and set up bespoke tracking pixel sequences.',
    category: 'funnels'
  },
  {
    id: 'automated-follow-up',
    question: 'Can you automate my lead follow-up process so no leads are lost?',
    answer: 'Yes, this is one of our highest-ROI specialties. We build automated "Speed-to-Lead" multi-channel workflows that send personalized SMS messages, email notifications, calendar booking links, and internal team alerts within 60 seconds of a prospect submitting a form.',
    category: 'automation'
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take from start to launch?',
    answer: 'A dedicated high-converting landing page or single funnel typically takes 7 to 12 business days. A complete website redesign with full CRM pipeline and automation workflows takes 2 to 4 weeks depending on scope and client feedback turnarounds.',
    category: 'timeline'
  },
  {
    id: 'post-launch-support',
    question: 'Do you provide ongoing technical support and optimization after launch?',
    answer: 'Yes! All projects include a complimentary 30-day post-launch optimization window with team training calls. We also offer monthly growth partnerships for ongoing split testing, monthly funnel updates, and technical maintenance.',
    category: 'support'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'turn-visitors-into-leads',
    title: 'How to Turn 1,000 Visitors into High-Paying Leads (The 2026 Funnel Framework)',
    slug: 'turn-visitors-into-leads',
    excerpt: 'Most websites convert less than 2% of traffic. Here is the exact conversion-first architecture we use to elevate opt-in rates above 15% across 20+ industries.',
    content: `
# How to Turn 1,000 Visitors into High-Paying Leads

If your website is receiving 1,000 visitors a month but generating fewer than 20 booked calls, you don't have a traffic problem—you have a **conversion friction problem**.

## The 3 Fundamentals of Conversion-First Architecture

### 1. The 5-Second Above-The-Fold Clarity Test
When a potential client lands on your homepage, they must understand within 5 seconds:
- What high-value result you deliver
- Who you deliver it for
- The single next step to take (Primary CTA)

### 2. Eliminating Choice Overload
A traditional corporate website features 12 navigation menu items, social media icons leading off-site, and multiple competing buttons. High-converting pages focus on a single primary call-to-action (e.g., "Book Your Strategy Call").

### 3. The Power of Speed-to-Lead Automation
Studies prove that contacting a lead within 5 minutes increases conversion rates by **391%** compared to waiting 30 minutes. Integrating automated SMS & email booking reminders transforms cold prospects into scheduled appointments before they leave your site.
    `,
    category: 'Conversion Rate Optimization',
    readTime: '5 min read',
    publishDate: 'July 2026',
    author: {
      name: 'Digital Sate Hub Strategy Team',
      role: 'Growth & Automation Architects',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Conversion', 'Sales Funnels', 'GoHighLevel', 'Lead Gen']
  },
  {
    id: 'gohighlevel-stack-2026',
    title: 'Why GoHighLevel + Custom Webflow is the Ultimate Growth Tech Stack in 2026',
    slug: 'gohighlevel-stack-2026',
    excerpt: 'Stop paying $2,000/month for 8 disconnected SaaS tools. Discover how unifying your website front-end with GoHighLevel CRM creates an unstoppable sales machine.',
    content: `
# Why GoHighLevel + Custom Webflow is the Ultimate Growth Tech Stack

Managing 6 different marketing platforms—a WordPress site, Calendly, ActiveCampaign, Twilio, ClickFunnels, and Stripe—leads to broken Zapier webhooks and massive subscription overhead.

## Unifying Your Digital Infrastructure

By pairing **Webflow** for front-end design with **GoHighLevel** as your background CRM and automation engine, you get:
- Sub-second page load speeds for maximum SEO & ad conversion
- Unified pipeline management with live deal stage tracking
- Integrated two-way SMS, email, and Google review requests
- Zero third-party Zapier fees between your site forms and CRM
    `,
    category: 'CRM & Automation',
    readTime: '6 min read',
    publishDate: 'July 2026',
    author: {
      name: 'Digital Sate Hub Strategy Team',
      role: 'Growth & Automation Architects',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    tags: ['GoHighLevel', 'CRM', 'Webflow', 'Automation']
  },
  {
    id: 'ai-lead-followup-automation',
    title: 'Automating Lead Follow-ups Without Losing the Human Touch',
    slug: 'ai-lead-followup-automation',
    excerpt: 'Learn how to combine smart conditional workflows with conversational AI agents to qualify prospects 24/7 while preserving genuine brand warmth.',
    content: `
# Automating Lead Follow-ups Without Losing the Human Touch

Automating your communication doesn't mean sending cold, robotic broadcast blasts. Modern marketing automation relies on **dynamic personalization** and **behavioral triggers**.

## Key Rules for Authentic Automation
1. **Use First Names & Dynamic Fields**: Mention the specific service or product they inquired about.
2. **Short, Conversational SMS**: Send text messages that sound like a friendly assistant confirming an appointment.
3. **Instant Calendar Integration**: Give prospects direct control over booking their preferred time slot.
    `,
    category: 'AI & Automations',
    readTime: '4 min read',
    publishDate: 'June 2026',
    author: {
      name: 'Digital Sate Hub AI Lab',
      role: 'Automation Specialists',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Agents', 'SMS Marketing', 'Workflow', 'CRM']
  }
];
