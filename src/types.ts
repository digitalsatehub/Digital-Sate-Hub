export type NavigationPage = 'home' | 'portfolio' | 'blog' | 'contact' | 'quote';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  keyResult: string;
  features: string[];
  platforms: string[];
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  platforms: string[];
  imageUrl: string;
  previewType: 'website' | 'funnel' | 'dashboard' | 'mobile';
  stats: { label: string; value: string }[];
  featured?: boolean;
}

export interface VideoTestimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  serviceProvided: string;
  shortQuote: string;
  videoThumbnail: string;
  videoUrl?: string;
  duration: string;
  keyResultStat: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'redesign' | 'platforms' | 'funnels' | 'automation' | 'timeline' | 'support';
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyFocus: string;
}

export interface StrategyCallFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  websiteUrl: string;
  serviceRequested: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface AIStrategyResult {
  headline: string;
  conversionGaps: string[];
  recommendedStack: string[];
  actionPlan: string[];
  estimatedLift: string;
}
