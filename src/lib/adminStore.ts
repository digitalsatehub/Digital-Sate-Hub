import { BlogPost, PortfolioItem, VideoTestimonial } from '../types';
import { BLOG_POSTS as INITIAL_BLOG_POSTS, PORTFOLIO_PROJECTS as INITIAL_PORTFOLIO, VIDEO_TESTIMONIALS as INITIAL_REVIEWS } from '../data/siteData';

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

export interface BookingAppointment {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  businessName?: string;
  serviceRequested: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientCount: number;
  status: 'sent' | 'draft';
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
const REVIEWS_KEY = 'dsh_admin_reviews';
const PORTFOLIO_KEY = 'dsh_admin_portfolio';
const BOOKINGS_KEY = 'dsh_admin_bookings';
const NEWSLETTER_SUBS_KEY = 'dsh_newsletter_subscribers';
const NEWSLETTER_CAMPAIGNS_KEY = 'dsh_newsletter_campaigns';

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
    window.dispatchEvent(new Event('dsh_blogs_updated'));
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
    window.dispatchEvent(new Event('dsh_blogs_updated'));
  } catch (err) {
    console.error('Error deleting blog post:', err);
  }
  return updated;
}

// Reviews & Testimonials CRUD
export function getAdminReviews(): VideoTestimonial[] {
  try {
    const saved = localStorage.getItem(REVIEWS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading reviews:', err);
  }
  return INITIAL_REVIEWS;
}

export function saveAdminReview(review: VideoTestimonial): VideoTestimonial[] {
  const current = getAdminReviews();
  const idx = current.findIndex((r) => r.id === review.id);
  let updated: VideoTestimonial[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = review;
  } else {
    updated = [review, ...current];
  }
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_reviews_updated'));
  } catch (err) {
    console.error('Error saving review:', err);
  }
  return updated;
}

export function deleteAdminReview(id: string): VideoTestimonial[] {
  const current = getAdminReviews();
  const updated = current.filter((r) => r.id !== id);
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_reviews_updated'));
  } catch (err) {
    console.error('Error deleting review:', err);
  }
  return updated;
}

// Portfolio Projects CRUD
export function getAdminPortfolio(): PortfolioItem[] {
  try {
    const saved = localStorage.getItem(PORTFOLIO_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading portfolio projects:', err);
  }
  return INITIAL_PORTFOLIO;
}

export function saveAdminPortfolioItem(item: PortfolioItem): PortfolioItem[] {
  const current = getAdminPortfolio();
  const idx = current.findIndex((p) => p.id === item.id);
  let updated: PortfolioItem[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = item;
  } else {
    updated = [item, ...current];
  }
  try {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_portfolio_updated'));
  } catch (err) {
    console.error('Error saving portfolio item:', err);
  }
  return updated;
}

export function deleteAdminPortfolioItem(id: string): PortfolioItem[] {
  const current = getAdminPortfolio();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_portfolio_updated'));
  } catch (err) {
    console.error('Error deleting portfolio item:', err);
  }
  return updated;
}

// Bookings CRUD
export function getAdminBookings(): BookingAppointment[] {
  try {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading bookings:', err);
  }
  return [];
}

export function addAdminBooking(booking: Omit<BookingAppointment, 'id' | 'createdAt' | 'status'>): BookingAppointment {
  const current = getAdminBookings();
  const newBooking: BookingAppointment = {
    ...booking,
    id: `bk-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const updated = [newBooking, ...current];
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_bookings_updated'));
  } catch (err) {
    console.error('Error adding booking:', err);
  }
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingAppointment['status']): BookingAppointment[] {
  const current = getAdminBookings();
  const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_bookings_updated'));
  } catch (err) {
    console.error('Error updating booking status:', err);
  }
  return updated;
}

export function deleteAdminBooking(id: string): BookingAppointment[] {
  const current = getAdminBookings();
  const updated = current.filter((b) => b.id !== id);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_bookings_updated'));
  } catch (err) {
    console.error('Error deleting booking:', err);
  }
  return updated;
}

// Newsletter Contacts & Campaigns CRUD
export function getNewsletterSubscribers(): string[] {
  try {
    const saved = localStorage.getItem(NEWSLETTER_SUBS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading newsletter subscribers:', err);
  }
  return ['digitalsatehub@gmail.com'];
}

export function addNewsletterSubscriber(email: string): string[] {
  const clean = email.toLowerCase().trim();
  if (!clean || !clean.includes('@')) return getNewsletterSubscribers();
  const current = getNewsletterSubscribers();
  if (current.includes(clean)) return current;
  const updated = [clean, ...current];
  try {
    localStorage.setItem(NEWSLETTER_SUBS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error adding newsletter subscriber:', err);
  }
  return updated;
}

export function getNewsletterCampaigns(): NewsletterCampaign[] {
  try {
    const saved = localStorage.getItem(NEWSLETTER_CAMPAIGNS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Error reading newsletter campaigns:', err);
  }
  return [];
}

export function addNewsletterCampaign(campaign: Omit<NewsletterCampaign, 'id' | 'sentAt'>): NewsletterCampaign[] {
  const current = getNewsletterCampaigns();
  const newCampaign: NewsletterCampaign = {
    ...campaign,
    id: `camp-${Date.now()}`,
    sentAt: new Date().toISOString()
  };
  const updated = [newCampaign, ...current];
  try {
    localStorage.setItem(NEWSLETTER_CAMPAIGNS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error adding newsletter campaign:', err);
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
    window.dispatchEvent(new Event('dsh_submissions_updated'));
  } catch (err) {
    console.error('Error adding submission:', err);
  }

  // Also record subscriber email
  if (submission.email) {
    addNewsletterSubscriber(submission.email);
  }

  // If this is a booking submission, also sync to bookings
  if (submission.type === 'booking') {
    addAdminBooking({
      clientName: submission.name,
      email: submission.email,
      phone: submission.phone,
      businessName: submission.businessName,
      serviceRequested: submission.serviceRequested || 'Strategy Call',
      preferredDate: submission.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: submission.preferredTime || '10:00 AM',
      notes: submission.message
    });
  }

  return newSub;
}

export function updateSubmissionStatus(id: string, status: FormSubmission['status']): FormSubmission[] {
  const current = getFormSubmissions();
  const updated = current.map((sub) => (sub.id === id ? { ...sub, status } : sub));
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsh_submissions_updated'));
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
    window.dispatchEvent(new Event('dsh_submissions_updated'));
  } catch (err) {
    console.error('Error deleting submission:', err);
  }
  return updated;
}

export function clearAllSubmissions(): FormSubmission[] {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('dsh_submissions_updated'));
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
    window.dispatchEvent(new Event('dsh_analytics_updated'));
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
    window.dispatchEvent(new Event('dsh_analytics_updated'));
  } catch (err) {
    console.error('Error clearing analytics stats:', err);
  }
  return clean;
}

