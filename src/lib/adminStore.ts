import { BlogPost } from '../types';
import { BLOG_POSTS as INITIAL_BLOG_POSTS } from '../data/siteData';

export interface SocialLinks {
  twitter: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  whatsapp: string;
  upwork: string;
  fiverr: string;
  email: string;
  phone: string;
  address: string;
}

export interface FormSubmission {
  id: string;
  type: 'contact' | 'booking' | 'quote';
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  websiteUrl?: string;
  serviceRequested?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  estimatedBudget?: string;
  timeline?: string;
  selectedServices?: string[];
  notes?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
}

export interface AnalyticsStats {
  totalVisitors: number;
  totalPageViews: number;
  totalSubmissions: number;
  conversionRate: number;
  pageViewsByPage: { page: string; views: number }[];
  dailyViews: { date: string; views: number; visitors: number }[];
  recentActivities: { id: string; event: string; time: string; type: 'info' | 'success' | 'alert' }[];
}

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  whatsapp: 'https://wa.me/1234567890',
  upwork: 'https://www.upwork.com',
  fiverr: 'https://www.fiverr.com',
  email: 'digitalsatehub@gmail.com',
  phone: '+1 (555) 019-2834',
  address: 'London, UK & Global Remote Studio'
};

const DEFAULT_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'sub-101',
    type: 'contact',
    name: 'Marcus Vance',
    email: 'marcus@vancegrowth.com',
    phone: '+1 (555) 234-5678',
    businessName: 'Vance Growth Media',
    websiteUrl: 'https://vancegrowth.com',
    serviceRequested: 'Full Turnkey Digital Growth System',
    message: 'Looking for a complete overhaul of our sales funnel and GoHighLevel CRM workflow.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: 'new'
  },
  {
    id: 'sub-102',
    type: 'booking',
    name: 'Sarah Jenkins',
    email: 'sjenkins@apexrealestate.co',
    phone: '+1 (555) 876-5432',
    businessName: 'Apex Real Estate Partners',
    websiteUrl: 'https://apexrealestate.co',
    serviceRequested: 'GoHighLevel CRM & Lead Automation',
    preferredDate: '2026-08-10',
    preferredTime: '14:00 EST',
    message: 'Want to integrate automated SMS follow-ups for real estate lead ads.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: 'contacted'
  },
  {
    id: 'sub-103',
    type: 'quote',
    name: 'David Chen',
    email: 'david@luminaecommerce.io',
    phone: '+1 (555) 432-1098',
    businessName: 'Lumina E-Commerce',
    websiteUrl: 'https://luminaecommerce.io',
    selectedServices: ['Sales Funnels & Checkout', 'Multi-Channel Automation'],
    estimatedBudget: '$5,000 - $10,000',
    timeline: '2 - 3 Weeks',
    notes: 'Need a Shopify landing page connected with Klaviyo sequences.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
    status: 'completed'
  }
];

// LocalStorage Keys
const SOCIAL_KEY = 'dsh_admin_social_links';
const BLOGS_KEY = 'dsh_admin_blog_posts';
const SUBMISSIONS_KEY = 'dsh_admin_submissions';
const ANALYTICS_KEY = 'dsh_admin_analytics';

// Social Links CRUD
export function getSocialLinks(): SocialLinks {
  try {
    const saved = localStorage.getItem(SOCIAL_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading social links:', err);
  }
  return DEFAULT_SOCIAL_LINKS;
}

export function saveSocialLinks(links: SocialLinks): void {
  try {
    localStorage.setItem(SOCIAL_KEY, JSON.stringify(links));
  } catch (err) {
    console.error('Error saving social links:', err);
  }
}

// Blog Posts CRUD
export function getAdminBlogPosts(): BlogPost[] {
  try {
    const saved = localStorage.getItem(BLOGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading admin blog posts:', err);
  }
  return INITIAL_BLOG_POSTS;
}

export function saveAdminBlogPost(post: BlogPost): BlogPost[] {
  const current = getAdminBlogPosts();
  const existingIndex = current.findIndex((p) => p.id === post.id);
  let updated: BlogPost[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = post;
  } else {
    updated = [post, ...current];
  }

  try {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving blog post:', err);
  }
  return updated;
}

export function deleteAdminBlogPost(postId: string): BlogPost[] {
  const current = getAdminBlogPosts();
  const updated = current.filter((p) => p.id !== postId);
  try {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting blog post:', err);
  }
  return updated;
}

// Submissions CRUD
export function getFormSubmissions(): FormSubmission[] {
  try {
    const saved = localStorage.getItem(SUBMISSIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading submissions:', err);
  }
  return DEFAULT_SUBMISSIONS;
}

export function addFormSubmission(submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): FormSubmission {
  const current = getFormSubmissions();
  const newSub: FormSubmission = {
    ...submission,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [newSub, ...current];
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error adding submission:', err);
  }
  return newSub;
}

export function updateSubmissionStatus(id: string, status: FormSubmission['status']): FormSubmission[] {
  const current = getFormSubmissions();
  const updated = current.map((sub) => (sub.id === id ? { ...sub, status } : sub));
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating submission status:', err);
  }
  return updated;
}

export function deleteFormSubmission(id: string): FormSubmission[] {
  const current = getFormSubmissions();
  const updated = current.filter((sub) => sub.id !== id);
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting submission:', err);
  }
  return updated;
}

// Track page view event for analytics
export function recordPageView(pageName: string): void {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    let stats: AnalyticsStats = raw
      ? JSON.parse(raw)
      : {
          totalVisitors: 1240,
          totalPageViews: 3890,
          totalSubmissions: 28,
          conversionRate: 4.8,
          pageViewsByPage: [
            { page: 'Home Page', views: 1840 },
            { page: 'Portfolio & Case Studies', views: 980 },
            { page: 'Blog & Articles', views: 560 },
            { page: 'Contact & Booking', views: 320 },
            { page: 'AI Quote Builder', views: 190 }
          ],
          dailyViews: [
            { date: 'Mon', views: 320, visitors: 110 },
            { date: 'Tue', views: 450, visitors: 160 },
            { date: 'Wed', views: 520, visitors: 190 },
            { date: 'Thu', views: 610, visitors: 220 },
            { date: 'Fri', views: 580, visitors: 210 },
            { date: 'Sat', views: 390, visitors: 140 },
            { date: 'Sun', views: 420, visitors: 150 }
          ],
          recentActivities: []
        };

    stats.totalPageViews += 1;
    const item = stats.pageViewsByPage.find((p) => p.page.toLowerCase().includes(pageName.toLowerCase()));
    if (item) {
      item.views += 1;
    } else {
      stats.pageViewsByPage.push({ page: pageName, views: 1 });
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Error recording page view:', err);
  }
}

// Get Analytics Stats
export function getAnalyticsStats(): AnalyticsStats {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error getting analytics stats:', err);
  }

  const submissions = getFormSubmissions();
  return {
    totalVisitors: 1420 + submissions.length * 3,
    totalPageViews: 4210 + submissions.length * 8,
    totalSubmissions: submissions.length + 15,
    conversionRate: 5.2,
    pageViewsByPage: [
      { page: 'Home Page', views: 1980 },
      { page: 'Portfolio & Case Studies', views: 1120 },
      { page: 'Blog & Insights', views: 640 },
      { page: 'Contact & Booking', views: 410 },
      { page: 'AI Scope Builder', views: 230 }
    ],
    dailyViews: [
      { date: 'Mon', views: 340, visitors: 120 },
      { date: 'Tue', views: 480, visitors: 175 },
      { date: 'Wed', views: 590, visitors: 210 },
      { date: 'Thu', views: 680, visitors: 245 },
      { date: 'Fri', views: 620, visitors: 230 },
      { date: 'Sat', views: 410, visitors: 155 },
      { date: 'Sun', views: 450, visitors: 165 }
    ],
    recentActivities: [
      { id: 'act-1', event: 'New Contact Submission received from Marcus Vance', time: '10 mins ago', type: 'success' },
      { id: 'act-2', event: 'Strategy Booking scheduled by Sarah Jenkins', time: '45 mins ago', type: 'info' },
      { id: 'act-3', event: 'Blog Post "High-Converting Sales Funnels" updated', time: '2 hours ago', type: 'info' },
      { id: 'act-4', event: 'AI Scope Quote requested by Lumina E-Commerce', time: '5 hours ago', type: 'alert' }
    ]
  };
}
