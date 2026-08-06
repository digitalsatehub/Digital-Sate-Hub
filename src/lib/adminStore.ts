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

const DEFAULT_SUBMISSIONS: FormSubmission[] = [];

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
    window.dispatchEvent(new Event('dsh_socials_updated'));
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

export function clearAllSubmissions(): FormSubmission[] {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing submissions:', err);
  }
  return [];
}

// Initial clean analytics state template
function createEmptyAnalyticsStats(): AnalyticsStats {
  const submissions = getFormSubmissions();
  return {
    totalVisitors: 0,
    totalPageViews: 0,
    totalSubmissions: submissions.length,
    conversionRate: 0,
    pageViewsByPage: [
      { page: 'Home Page', views: 0 },
      { page: 'Portfolio & Case Studies', views: 0 },
      { page: 'Blog & Insights', views: 0 },
      { page: 'Contact & Booking', views: 0 },
      { page: 'AI Scope Builder', views: 0 }
    ],
    dailyViews: [
      { date: 'Mon', views: 0, visitors: 0 },
      { date: 'Tue', views: 0, visitors: 0 },
      { date: 'Wed', views: 0, visitors: 0 },
      { date: 'Thu', views: 0, visitors: 0 },
      { date: 'Fri', views: 0, visitors: 0 },
      { date: 'Sat', views: 0, visitors: 0 },
      { date: 'Sun', views: 0, visitors: 0 }
    ],
    recentActivities: []
  };
}

// Track page view event for analytics
export function recordPageView(pageName: string): void {
  try {
    const submissions = getFormSubmissions();
    const raw = localStorage.getItem(ANALYTICS_KEY);
    let stats: AnalyticsStats = raw ? JSON.parse(raw) : createEmptyAnalyticsStats();

    // Track session visitor once per session
    const sessionKey = 'dsh_visited_session';
    const isNewSession = !sessionStorage.getItem(sessionKey);
    if (isNewSession) {
      sessionStorage.setItem(sessionKey, 'true');
      stats.totalVisitors += 1;
    }

    stats.totalPageViews += 1;
    stats.totalSubmissions = submissions.length;
    stats.conversionRate = stats.totalPageViews > 0 
      ? Number(((submissions.length / stats.totalPageViews) * 100).toFixed(1)) 
      : 0;

    // Update page breakdowns
    const pageIndex = stats.pageViewsByPage.findIndex((p) => p.page.toLowerCase().includes(pageName.toLowerCase()));
    if (pageIndex >= 0) {
      stats.pageViewsByPage[pageIndex].views += 1;
    } else {
      stats.pageViewsByPage.push({ page: pageName, views: 1 });
    }

    // Update today's view count in daily views
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayName = days[new Date().getDay()];
    const dayItem = stats.dailyViews.find((d) => d.date === todayName);
    if (dayItem) {
      dayItem.views += 1;
      if (isNewSession) dayItem.visitors += 1;
    }

    // Add activity log entry
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: `act-${Date.now()}`,
      event: `Page visit recorded: ${pageName}`,
      time: `Today at ${timestamp}`,
      type: 'info' as const
    };
    stats.recentActivities = [newLog, ...(stats.recentActivities || []).slice(0, 9)];

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

  const initial = createEmptyAnalyticsStats();
  return initial;
}

// Reset / Clear Analytics Stats
export function clearAnalyticsStats(): AnalyticsStats {
  const clean = createEmptyAnalyticsStats();
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(clean));
  } catch (err) {
    console.error('Error clearing analytics stats:', err);
  }
  return clean;
}
