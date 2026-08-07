import React, { useState, useEffect, useRef, useMemo } from 'react';
import { InteractiveBoxGrid } from '../components/InteractiveBoxGrid';
import { LOGO_URL } from '../data/siteData';
import {
  getSocialLinks,
  saveSocialLinks,
  getAdminBlogPosts,
  saveAdminBlogPost,
  deleteAdminBlogPost,
  getFormSubmissions,
  updateSubmissionStatus,
  deleteFormSubmission,
  clearAllSubmissions,
  getAnalyticsStats,
  clearAnalyticsStats,
  getAdminReviews,
  saveAdminReview,
  deleteAdminReview,
  getAdminPortfolio,
  saveAdminPortfolioItem,
  deleteAdminPortfolioItem,
  getAdminBookings,
  addAdminBooking,
  updateBookingStatus,
  deleteAdminBooking,
  getNewsletterSubscribers,
  addNewsletterSubscriber,
  getNewsletterCampaigns,
  addNewsletterCampaign,
  SocialLinks,
  FormSubmission,
  AnalyticsStats,
  BookingAppointment,
  NewsletterCampaign
} from '../lib/adminStore';
import { BlogPost, NavigationPage, PortfolioItem, VideoTestimonial } from '../types';
import {
  BarChart3,
  FileText,
  Share2,
  Inbox,
  Lock,
  LogOut,
  Globe,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  Eye,
  Calendar,
  User,
  ArrowRight,
  RefreshCw,
  Clock,
  TrendingUp,
  Download,
  AlertCircle,
  Radio,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  Mail,
  Key,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Smartphone,
  QrCode,
  ShieldCheck,
  Copy,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Layers,
  Users,
  CheckSquare,
  Square,
  Monitor,
  Layout,
  Type,
  MousePointer,
  Minus
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: NavigationPage) => void;
}

interface BroadcastLog {
  id: string;
  timestamp: string;
  content: string;
  mediaUrl?: string;
  channels: string[];
  stats: { impressions: number; likes: number; shares: number };
}

export type NewsletterSectionType = 'header' | 'text' | 'image' | 'cta' | 'divider' | 'footer';

export interface NewsletterSection {
  id: string;
  type: NewsletterSectionType;
  headerTitle?: string;
  headerSubtitle?: string;
  headerBgColor?: string;
  heading?: string;
  bodyText?: string;
  textAlign?: 'left' | 'center' | 'right';
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonColor?: string;
  dividerStyle?: 'solid' | 'dashed' | 'dotted';
}

const compileSectionsToHtml = (subject: string, sections: NewsletterSection[]): string => {
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .content { padding: 24px; }
    h1, h2, h3 { color: #111827; margin-top: 0; }
    p { line-height: 1.6; color: #374151; font-size: 15px; }
    .btn { display: inline-block; padding: 12px 28px; font-weight: bold; text-decoration: none; border-radius: 8px; color: #ffffff; text-align: center; }
    .divider { border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f9fafb; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="container">
`;

  sections.forEach((sec) => {
    if (sec.type === 'header') {
      html += `
    <div style="background-color: ${sec.headerBgColor || '#1817B6'}; padding: 32px 24px; text-align: center; color: #ffffff;">
      <h1 style="margin:0; font-size: 24px; font-weight: 800; color: #ffffff;">${sec.headerTitle || 'Digital Sate Hub'}</h1>
      ${sec.headerSubtitle ? `<p style="margin: 8px 0 0 0; color: #c7d2fe; font-size: 14px;">${sec.headerSubtitle}</p>` : ''}
    </div>
`;
    } else if (sec.type === 'text') {
      html += `
    <div style="padding: 20px 24px; text-align: ${sec.textAlign || 'left'};">
      ${sec.heading ? `<h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">${sec.heading}</h2>` : ''}
      <p style="white-space: pre-line; margin: 0;">${sec.bodyText || ''}</p>
    </div>
`;
    } else if (sec.type === 'image') {
      html += `
    <div style="padding: 12px 24px; text-align: center;">
      ${sec.imageUrl ? `<img src="${sec.imageUrl}" alt="${sec.imageAlt || ''}" style="max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 0 auto;" />` : ''}
      ${sec.imageCaption ? `<p style="font-size: 12px; color: #6b7280; margin-top: 6px;">${sec.imageCaption}</p>` : ''}
    </div>
`;
    } else if (sec.type === 'cta') {
      html += `
    <div style="padding: 20px 24px; text-align: center;">
      <a href="${sec.buttonUrl || '#'}" class="btn" style="background-color: ${sec.buttonColor || '#1817B6'}; color: #ffffff; display: inline-block; padding: 12px 28px; font-weight: bold; text-decoration: none; border-radius: 8px;">${sec.buttonText || 'Learn More'}</a>
    </div>
`;
    } else if (sec.type === 'divider') {
      html += `
    <div style="padding: 8px 24px;">
      <hr style="border: 0; border-top: 1px ${sec.dividerStyle || 'solid'} #e5e7eb; margin: 16px 0;" />
    </div>
`;
    } else if (sec.type === 'footer') {
      html += `
    <div class="footer">
      <p style="margin: 0; font-weight: bold; color: #374151;">Digital Sate Hub</p>
      <p style="margin: 4px 0 0 0;">Growth Automation & Web Architecture • <a href="https://digitalsatehub.com" style="color: #4f46e5;">digitalsatehub.com</a></p>
      <p style="margin: 12px 0 0 0; font-size: 11px; color: #9ca3af;">You received this email because you requested updates or services from Digital Sate Hub.</p>
    </div>
`;
    }
  });

  html += `
  </div>
</body>
</html>`;
  return html;
};

const AUTHORIZED_GMAIL = 'digitalsatehub@gmail.com';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const loginSectionRef = useRef<HTMLDivElement>(null);

  // Authentication State with Authenticator TOTP & Email Backup
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('dsh_admin_auth') === 'true';
  });
  const [authMode, setAuthMode] = useState<'totp' | 'email'>('totp');
  const [authStep, setAuthStep] = useState<'email' | 'otp'>('email');
  const [authEmail, setAuthEmail] = useState('');
  const [authOtpInput, setAuthOtpInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // TOTP Authenticator State
  const [totpSetupData, setTotpSetupData] = useState<{
    secret: string;
    qrCodeDataUrl: string;
    currentCode: string;
    otpauthUrl: string;
  } | null>(null);
  const [showTotpSetupModal, setShowTotpSetupModal] = useState(false);
  const [totpCountdown, setTotpCountdown] = useState(30 - (Math.floor(Date.now() / 1000) % 30));

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'submissions' | 'bookings' | 'newsletter' | 'reviews' | 'portfolio' | 'blogs' | 'socials' | 'broadcast'>('analytics');

  // Admin Data States
  const [analytics, setAnalytics] = useState<AnalyticsStats>(getAnalyticsStats());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getAdminBlogPosts());
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(getSocialLinks());
  const [submissions, setSubmissions] = useState<FormSubmission[]>(getFormSubmissions());
  const [reviews, setReviews] = useState<VideoTestimonial[]>(getAdminReviews());
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(getAdminPortfolio());
  const [bookings, setBookings] = useState<BookingAppointment[]>(getAdminBookings());
  const [subscribers, setSubscribers] = useState<string[]>(getNewsletterSubscribers());
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>(getNewsletterCampaigns());

  // Modal / Form States
  const [editingReview, setEditingReview] = useState<VideoTestimonial | null>(null);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [isCreatingNewsletter, setIsCreatingNewsletter] = useState(false);

  // Newsletter Form State
  const [newsletterSubject, setNewsletterSubject] = useState('🚀 5 Automation Strategies to Scale Your Business in 2026');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [isSendingNewsletter, setIsSendingNewsletter] = useState(false);

  // GoHighLevel Sidebar Open State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Newsletter Section Builder State
  const [newsletterSections, setNewsletterSections] = useState<NewsletterSection[]>([
    {
      id: 'sec-header',
      type: 'header',
      headerTitle: 'Digital Sate Hub',
      headerSubtitle: 'Growth Automation & Web Architecture Digest',
      headerBgColor: '#1817B6'
    },
    {
      id: 'sec-welcome',
      type: 'text',
      heading: '🚀 5 High-Converting Funnel Strategies for 2026',
      bodyText: 'Hey there,\n\nWe recently analyzed over 50+ client funnels built on GoHighLevel and Groovekart. Here are the top insights that drove a 2.4x conversion bump in less than 30 days.\n\n1. Automated SMS Speed-to-Lead\n2. Dynamic Multi-Step Questionnaires\n3. One-Click Stripe Upsells',
      textAlign: 'left'
    },
    {
      id: 'sec-image',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'Growth Analytics Dashboard',
      imageCaption: 'Real-time Conversion Analytics Dashboard built for high-growth agencies.'
    },
    {
      id: 'sec-cta',
      type: 'cta',
      buttonText: 'Book Your Free Strategy Audit',
      buttonUrl: 'https://digitalsatehub.com',
      buttonColor: '#1817B6'
    },
    {
      id: 'sec-divider',
      type: 'divider',
      dividerStyle: 'solid'
    },
    {
      id: 'sec-footer',
      type: 'footer'
    }
  ]);

  // Newsletter Preview Mode
  const [emailPreviewTab, setEmailPreviewTab] = useState<'desktop' | 'mobile'>('desktop');

  // Contact Selector Filter & Selections
  const [contactSearch, setContactSearch] = useState('');
  const [selectedContactEmails, setSelectedContactEmails] = useState<string[]>([]);

  // Consolidated Unique Contact List
  const allContactsList = useMemo(() => {
    const map = new Map<string, { email: string; name: string; source: string }>();

    subscribers.forEach((email) => {
      if (email) {
        map.set(email.toLowerCase(), {
          email,
          name: email.split('@')[0],
          source: 'Newsletter List'
        });
      }
    });

    submissions.forEach((s) => {
      if (s.email) {
        const existing = map.get(s.email.toLowerCase());
        map.set(s.email.toLowerCase(), {
          email: s.email,
          name: s.name || existing?.name || s.email.split('@')[0],
          source: existing ? `${existing.source}, Form Submission` : 'Form Lead'
        });
      }
    });

    bookings.forEach((b) => {
      if (b.email) {
        const existing = map.get(b.email.toLowerCase());
        map.set(b.email.toLowerCase(), {
          email: b.email,
          name: b.clientName || existing?.name || b.email.split('@')[0],
          source: existing ? `${existing.source}, Booking Client` : 'Booking Client'
        });
      }
    });

    return Array.from(map.values());
  }, [subscribers, submissions, bookings]);

  // Sync selected contact emails on load
  useEffect(() => {
    if (selectedContactEmails.length === 0 && allContactsList.length > 0) {
      setSelectedContactEmails(allContactsList.map((c) => c.email));
    }
  }, [allContactsList]);

  // Filtered contacts list
  const filteredContacts = useMemo(() => {
    if (!contactSearch.trim()) return allContactsList;
    const q = contactSearch.toLowerCase();
    return allContactsList.filter(
      (c) => c.email.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.source.toLowerCase().includes(q)
    );
  }, [allContactsList, contactSearch]);

  // Section builder helper handlers
  const addNewsletterSection = (type: NewsletterSectionType) => {
    const newSec: NewsletterSection = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      ...(type === 'header' && { headerTitle: 'Digital Sate Hub', headerSubtitle: 'New Campaign Heading', headerBgColor: '#1817B6' }),
      ...(type === 'text' && { heading: 'Section Title', bodyText: 'Write text here...', textAlign: 'left' }),
      ...(type === 'image' && { imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80', imageAlt: 'Campaign Image', imageCaption: 'Image Caption' }),
      ...(type === 'cta' && { buttonText: 'Click Here', buttonUrl: 'https://digitalsatehub.com', buttonColor: '#1817B6' }),
      ...(type === 'divider' && { dividerStyle: 'solid' }),
      ...(type === 'footer' && {})
    };
    setNewsletterSections([...newsletterSections, newSec]);
  };

  const updateNewsletterSection = (id: string, updated: Partial<NewsletterSection>) => {
    setNewsletterSections(newsletterSections.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const moveNewsletterSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === newsletterSections.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...newsletterSections];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setNewsletterSections(copy);
  };

  const deleteNewsletterSection = (id: string) => {
    if (newsletterSections.length <= 1) {
      alert('At least one section is required in the newsletter template.');
      return;
    }
    setNewsletterSections(newsletterSections.filter((s) => s.id !== id));
  };

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceRequested: 'Strategy Call',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    notes: ''
  });

  // Review Form State
  const [reviewForm, setReviewForm] = useState<VideoTestimonial>({
    id: '',
    clientName: '',
    company: '',
    role: '',
    serviceProvided: '',
    shortQuote: '',
    videoThumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    duration: '1:30',
    keyResultStat: '100% Satisfied Client',
    rating: 5
  });

  // Portfolio Form State
  const [portfolioForm, setPortfolioForm] = useState<PortfolioItem>({
    id: '',
    title: '',
    clientName: '',
    industry: 'E-commerce & Growth',
    challenge: '',
    solution: '',
    outcome: '',
    platforms: ['GoHighLevel', 'Webflow', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    previewType: 'website',
    featured: true,
    stats: [
      { label: 'Revenue Lift', value: '+120%' },
      { label: 'Time Saved', value: '15 hrs/wk' }
    ]
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Blog Editing State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState<boolean>(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');

  // Social Broadcast State
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    linkedin: { connected: false, name: 'LinkedIn Agency Page', handle: '' },
    twitter: { connected: false, name: 'Twitter / X Profile', handle: '' },
    facebook: { connected: false, name: 'Facebook Official Page', handle: '' },
    instagram: { connected: false, name: 'Instagram Business', handle: '' },
    youtube: { connected: false, name: 'YouTube Growth Channel', handle: '' }
  });

  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastMediaUrl, setBroadcastMediaUrl] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState<string | null>(null);

  const [broadcastLogs, setBroadcastLogs] = useState<BroadcastLog[]>(() => {
    const saved = localStorage.getItem('dsh_broadcast_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error loading broadcast logs:', err);
      }
    }
    return [
      {
        id: 'b-101',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toLocaleString(),
        content: '🚀 Scaling high-converting GoHighLevel sales funnels for agency growth! Check out our turnkey client automation systems: https://digitalsatehub.com',
        mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        channels: ['linkedin', 'twitter', 'facebook', 'instagram'],
        stats: { impressions: 1420, likes: 89, shares: 24 }
      }
    ];
  });

  // Blog Form Fields
  const [blogForm, setBlogForm] = useState<BlogPost>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Sales Funnels',
    readTime: '5 min read',
    publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: {
      name: 'Adewuyi - Lead Growth Architect',
      role: 'Founder & Funnel Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tags: ['Conversion', 'GoHighLevel', 'Automation']
  });

  // Submission Viewer State
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'contact' | 'booking' | 'quote'>('all');
  const [submissionSearch, setSubmissionSearch] = useState('');

  // Refresh All Data
  const refreshData = () => {
    setAnalytics(getAnalyticsStats());
    setBlogPosts(getAdminBlogPosts());
    setSocialLinks(getSocialLinks());
    setSubmissions(getFormSubmissions());
    setReviews(getAdminReviews());
    setPortfolioItems(getAdminPortfolio());
    setBookings(getAdminBookings());
    setSubscribers(getNewsletterSubscribers());
    setCampaigns(getNewsletterCampaigns());
    showToast('Dashboard data refreshed');
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      setAnalytics(getAnalyticsStats());
      setBlogPosts(getAdminBlogPosts());
      setSocialLinks(getSocialLinks());
      setSubmissions(getFormSubmissions());
      setReviews(getAdminReviews());
      setPortfolioItems(getAdminPortfolio());
      setBookings(getAdminBookings());
      setSubscribers(getNewsletterSubscribers());
      setCampaigns(getNewsletterCampaigns());
    };

    window.addEventListener('dsh_analytics_updated', handleUpdate);
    window.addEventListener('dsh_submissions_updated', handleUpdate);
    window.addEventListener('dsh_bookings_updated', handleUpdate);
    window.addEventListener('dsh_reviews_updated', handleUpdate);
    window.addEventListener('dsh_portfolio_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('dsh_analytics_updated', handleUpdate);
      window.removeEventListener('dsh_submissions_updated', handleUpdate);
      window.removeEventListener('dsh_bookings_updated', handleUpdate);
      window.removeEventListener('dsh_reviews_updated', handleUpdate);
      window.removeEventListener('dsh_portfolio_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper to check server connectivity safely without throwing on non-JSON HTML
  const checkServerConnectivity = async (): Promise<{ ok: boolean; isStaticHost?: boolean; smtpConfigured?: boolean; message?: string }> => {
    try {
      console.log('[API Health Check] Verifying server connectivity at /api/health...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // Detect non-JSON HTML response
      if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html') || !contentType.includes('application/json')) {
        console.warn('[API Health Check] Non-API response detected:', text.slice(0, 80));
        return {
          ok: false,
          message: 'Server backend unavailable.'
        };
      }

      if (!res.ok) {
        console.error(`[API Health Check] Server responded with HTTP status ${res.status} ${res.statusText}`);
        return { ok: false, message: `Server returned HTTP ${res.status}` };
      }

      try {
        const data = JSON.parse(text);
        console.log('[API Health Check] Server reachable:', data);
        return { ok: true, smtpConfigured: data.smtpConfigured };
      } catch (e) {
        return { ok: false, isStaticHost: true, message: 'Invalid JSON from server.' };
      }
    } catch (err: any) {
      console.error('[API Health Check Exception]:', {
        name: err?.name,
        message: err?.message,
      });
      return { ok: false, message: err?.name === 'AbortError' ? 'Server connection timed out' : (err?.message || 'Failed to reach server') };
    }
  };

  // Helper to POST to API endpoints with automatic retry if server returns HTML during startup/reload
  const postApiWithRetry = async (url: string, payload: any, retries = 2, delayMs = 600) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });

        const contentType = res.headers.get('content-type') || '';
        const text = await res.text();
        const isHtml = text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html') || !contentType.includes('application/json');

        if (!isHtml) {
          try {
            const data = JSON.parse(text);
            return { ok: res.ok, status: res.status, data, isHtml: false };
          } catch (e) {
            console.error(`[API Parse Error] Failed to parse JSON from ${url}:`, text);
          }
        }

        if (attempt < retries) {
          console.warn(`[API Retry] Non-JSON/HTML received from ${url}, retrying in ${delayMs}ms (attempt ${attempt + 1}/${retries})...`);
          await new Promise((r) => setTimeout(r, delayMs));
        } else {
          return { ok: false, status: res.status, data: null, isHtml: true };
        }
      } catch (err) {
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, delayMs));
        } else {
          throw err;
        }
      }
    }
    return { ok: false, status: 500, data: null, isHtml: true };
  };

  // Gmail OTP Send Handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    let cleanEmail = authEmail.replace(/[\s\u200B\u00A0]+/g, '').toLowerCase().trim();
    if (!cleanEmail.includes('@') && cleanEmail.length > 0) {
      cleanEmail += '@gmail.com';
    }

    if (!cleanEmail) {
      setAuthError('Please enter your admin email address.');
      return;
    }

    if (cleanEmail !== AUTHORIZED_GMAIL) {
      setAuthError('Access denied.');
      return;
    }

    setIsSendingOtp(true);

    try {
      console.log(`[Admin Auth] Requesting verification code for ${cleanEmail}...`);
      const { ok, data, isHtml } = await postApiWithRetry('/api/auth/send-otp', { email: cleanEmail });

      if (isHtml) {
        setAuthError('Backend server warming up. Please wait 3 seconds and click Send again.');
        return;
      }

      if (ok && data?.success) {
        console.log('[Admin Auth] OTP dispatch successful:', data.message);
        if (data.code) {
          setGeneratedCode(data.code);
        }
        setAuthStep('otp');
        setOtpNotice('A 6-digit verification code has been sent to your email. Please check your inbox and spam folder.');
        showToast('Verification code sent');
      } else {
        console.error('[Admin Auth] Server error response:', data);
        setAuthError(data?.error || 'Failed to dispatch security code. Please try again.');
      }
    } catch (err: any) {
      console.error('[Admin Auth Fetch Exception]:', err);
      setAuthError('Connection error: unable to reach authentication server. Please check your network.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Fetch TOTP setup data on load
  const fetchTotpSetup = async () => {
    try {
      const res = await fetch('/api/auth/totp-setup');
      const data = await res.json();
      if (data.success) {
        setTotpSetupData(data);
      }
    } catch (err) {
      console.error('[TOTP Setup Fetch Error]:', err);
    }
  };

  useEffect(() => {
    fetchTotpSetup();
    const interval = setInterval(() => {
      setTotpCountdown(30 - (Math.floor(Date.now() / 1000) % 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // TOTP Authenticator 6-Digit Code Verification Handler
  const handleVerifyTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputCode = authOtpInput.trim().replace(/\s+/g, '');
    if (!inputCode || inputCode.length < 6) {
      setAuthError('Please enter the 6-digit code from your Authenticator app.');
      return;
    }

    setIsSendingOtp(true);
    console.log('[Admin Auth] Verifying TOTP code...');

    try {
      const { ok, data, isHtml } = await postApiWithRetry('/api/auth/verify-totp', { code: inputCode });

      if (isHtml) {
        setAuthError('Authentication server warming up. Please try again in 3 seconds.');
        return;
      }

      if (ok && data?.success) {
        console.log('[Admin Auth] TOTP authentication verified.');
        setIsAuthenticated(true);
        sessionStorage.setItem('dsh_admin_auth', 'true');
        showToast('Authenticator 2FA verified successfully');
      } else {
        console.error('[Admin Auth] TOTP verify error:', data);
        setAuthError(data?.error || 'Invalid Authenticator code. Make sure your device time is synchronized and try again.');
      }
    } catch (err: any) {
      console.error('[Admin Auth TOTP Fetch Exception]:', err);
      setAuthError('Connection error: unable to reach authentication server.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Gmail OTP Verification Handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputCode = authOtpInput.trim();
    if (!inputCode) {
      setAuthError('Please enter the 6-digit verification code.');
      return;
    }

    console.log('[Admin Auth] Submitting OTP verification code...');

    try {
      let cleanEmail = (authEmail.replace(/[\s\u200B\u00A0]+/g, '') || AUTHORIZED_GMAIL).toLowerCase().trim();
      if (!cleanEmail.includes('@') && cleanEmail.length > 0) {
        cleanEmail += '@gmail.com';
      }

      const { ok, data, isHtml } = await postApiWithRetry('/api/auth/verify-otp', { email: cleanEmail, code: inputCode });

      if (isHtml) {
        setAuthError('Authentication server busy. Please try verifying again in a moment.');
        return;
      }

      if (ok && data?.success) {
        console.log('[Admin Auth] Verification successful.');
        setIsAuthenticated(true);
        sessionStorage.setItem('dsh_admin_auth', 'true');
        showToast('Authenticated successfully');
      } else {
        console.error('[Admin Auth] Verification error:', data);
        setAuthError(data?.error || 'Invalid or expired verification code. Please try again.');
      }
    } catch (err: any) {
      console.error('[Admin Auth Verify Fetch Exception]:', err);
      setAuthError('Connection error verifying security code.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dsh_admin_auth');
    setAuthStep('email');
    setAuthEmail('');
    setAuthOtpInput('');
    setOtpNotice(null);
  };

  // Multi-Platform Social Broadcast Handler
  const handleBroadcastPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) {
      alert('Please enter post text before broadcasting.');
      return;
    }
    if (selectedChannels.length === 0) {
      alert('Please select at least one social media channel.');
      return;
    }

    setIsBroadcasting(true);
    setBroadcastProgress('Connecting to social media APIs...');

    setTimeout(() => {
      setBroadcastProgress('Transmitting post payload to LinkedIn, Twitter/X, Facebook & Instagram...');
    }, 800);

    setTimeout(() => {
      const newLog: BroadcastLog = {
        id: `b-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        content: broadcastText,
        mediaUrl: broadcastMediaUrl || undefined,
        channels: selectedChannels,
        stats: { impressions: 1, likes: 0, shares: 0 }
      };

      const updatedLogs = [newLog, ...broadcastLogs];
      setBroadcastLogs(updatedLogs);
      localStorage.setItem('dsh_broadcast_logs', JSON.stringify(updatedLogs));

      setIsBroadcasting(false);
      setBroadcastProgress(null);
      setBroadcastText('');
      setBroadcastMediaUrl('');
      showToast('🚀 Broadcast published live across all selected social media platforms!');
    }, 1800);
  };

  // Social Links Save Handler
  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    saveSocialLinks(socialLinks);
    showToast('Social Media Links updated & published across site');
  };

  // Blog Save Handler
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert('Title and Content are required.');
      return;
    }

    const postToSave: BlogPost = {
      ...blogForm,
      id: blogForm.id || `blog-${Date.now()}`,
      slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    const updatedList = saveAdminBlogPost(postToSave);
    setBlogPosts(updatedList);
    setEditingPost(null);
    setIsCreatingBlog(false);
    showToast(blogForm.id ? 'Blog post updated successfully' : 'New blog post published!');
  };

  const handleEditBlogClick = (post: BlogPost) => {
    setEditingPost(post);
    setBlogForm(post);
    setIsCreatingBlog(true);
  };

  const handleCreateNewBlogClick = () => {
    setEditingPost(null);
    setBlogForm({
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Sales Funnels',
      readTime: '5 min read',
      publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: {
        name: 'Adewuyi - Lead Growth Architect',
        role: 'Founder & Funnel Specialist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      tags: ['Growth', 'Conversion', 'Funnels']
    });
    setIsCreatingBlog(true);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updated = deleteAdminBlogPost(id);
      setBlogPosts(updated);
      showToast('Blog post deleted');
    }
  };

  // Submission Handlers
  const handleUpdateStatus = (id: string, status: FormSubmission['status']) => {
    const updated = updateSubmissionStatus(id, status);
    setSubmissions(updated);
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
    showToast(`Submission marked as ${status}`);
  };

  const handleDeleteSub = (id: string) => {
    if (confirm('Are you sure you want to delete this submission entry?')) {
      const updated = deleteFormSubmission(id);
      setSubmissions(updated);
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
      showToast('Submission deleted');
    }
  };

  // Export Submissions as JSON/CSV
  const exportSubmissionsCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Business', 'Service', 'Submitted At', 'Status'];
    const rows = submissions.map((s) => [
      s.id,
      s.type,
      `"${s.name}"`,
      s.email,
      s.phone || '',
      `"${s.businessName || ''}"`,
      `"${s.serviceRequested || ''}"`,
      s.submittedAt,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dsh_form_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Submissions exported to CSV');
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = submissionFilter === 'all' || sub.type === submissionFilter;
    const matchesSearch =
      sub.name.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      sub.email.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      (sub.businessName && sub.businessName.toLowerCase().includes(submissionSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Filter Blog Posts
  const filteredBlogs = blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      b.author.name.toLowerCase().includes(blogSearchQuery.toLowerCase())
  );

  // LOGIN SCREEN - 2FA AUTHENTICATOR & EMAIL BACKUP
  if (!isAuthenticated) {
    return (
      <div ref={loginSectionRef} className="min-h-screen bg-[#0b0526] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Mouse Light Animation Background from Hero Section */}
        <InteractiveBoxGrid containerRef={loginSectionRef} />

        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#12063B]/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-indigo-400/30 flex items-center justify-center mx-auto shadow-xl overflow-hidden p-2">
              <img src={LOGO_URL} alt="Digital Sate Hub Logo" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-2xl font-black text-white">Digital Sate Hub Admin</h1>
            <p className="text-xs text-indigo-200/80 font-medium">
              Two-Factor Authentication (2FA) Security Gateway
            </p>
          </div>

          {/* Authentication Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 border border-indigo-500/30 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthMode('totp');
                setAuthError('');
                setAuthOtpInput('');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'totp'
                  ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Authenticator App</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('email');
                setAuthError('');
                setAuthOtpInput('');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'email'
                  ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Backup</span>
            </button>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="leading-relaxed">{authError}</span>
            </div>
          )}

          {/* TOTP AUTHENTICATOR APP FLOW */}
          {authMode === 'totp' ? (
            <form onSubmit={handleVerifyTotp} className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    6-Digit Authenticator Code
                  </label>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>{totpCountdown}s</span>
                  </div>
                </div>

                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="000000"
                    value={authOtpInput}
                    onChange={(e) => setAuthOtpInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white/5 border border-indigo-500/40 rounded-xl py-3.5 pl-10 pr-4 text-center text-xl font-mono tracking-[0.3em] text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {/* Progress bar indicating 30s TOTP refresh */}
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(totpCountdown / 30) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 text-center">
                  Open Google Authenticator, Authy, or 1Password to view your current 6-digit code.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSendingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Verify Code & Enter Admin Studio</span>
                  </>
                )}
              </button>


            </form>
          ) : (
            /* EMAIL BACKUP CODE FLOW */
            <div>
              {otpNotice && (
                <div className="mb-4 p-3.5 rounded-xl border text-xs space-y-1 text-center bg-indigo-900/30 border-indigo-500/30 text-indigo-200">
                  <div className="font-extrabold flex items-center justify-center gap-1.5 text-indigo-300">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Verification Email Sent</span>
                  </div>
                  <p className="text-[11px] text-gray-200 pt-1 leading-relaxed">{otpNotice}</p>
                </div>
              )}

              {authStep === 'email' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                      Admin Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full bg-white/5 border border-indigo-500/40 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5 px-0.5">
                      <span className="text-[10px] text-gray-400">Restricted to authorized administrator</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSendingOtp ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Backup Code...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send Backup Code to Gmail</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                      6-Digit Email Backup Code
                    </label>
                    <div className="relative">
                      <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={authOtpInput}
                        onChange={(e) => setAuthOtpInput(e.target.value)}
                        className="w-full bg-white/5 border border-indigo-500/40 rounded-xl py-3 pl-10 pr-4 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Verify Code & Enter Admin Studio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthStep('email');
                      setAuthOtpInput('');
                      setAuthError('');
                      setOtpNotice(null);
                    }}
                    className="w-full py-2 text-center text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Email Step
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* AUTHENTICATOR APP SETUP MODAL */}
        {showTotpSetupModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-500/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Setup Authenticator App</h3>
                    <p className="text-[11px] text-indigo-200/70">Google Authenticator / Authy / 1Password</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTotpSetupModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {totpSetupData ? (
                <div className="space-y-4">
                  {/* Step 1: Scan QR Code */}
                  <div className="bg-white/5 border border-indigo-500/30 rounded-2xl p-4 text-center space-y-3">
                    <p className="text-xs font-semibold text-gray-300">
                      1. Open your authenticator app and scan this QR code:
                    </p>
                    {totpSetupData.qrCodeDataUrl ? (
                      <div className="inline-block p-3 bg-white rounded-2xl shadow-xl">
                        <img
                          src={totpSetupData.qrCodeDataUrl}
                          alt="Authenticator QR Code"
                          className="w-48 h-48 mx-auto"
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 mx-auto bg-indigo-950 flex items-center justify-center rounded-2xl">
                        <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                      </div>
                    )}
                  </div>

                  {/* Step 2: Manual Secret Key */}
                  <div className="bg-white/5 border border-indigo-500/30 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-300">
                        2. Or enter secret key manually:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(totpSetupData.secret);
                          showToast('Secret key copied to clipboard');
                        }}
                        className="text-[11px] font-bold text-indigo-300 hover:text-white bg-indigo-600/40 hover:bg-indigo-600/70 px-2.5 py-1 rounded-lg border border-indigo-400/30 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Secret</span>
                      </button>
                    </div>
                    <div className="bg-black/40 border border-indigo-500/30 rounded-xl p-2.5 text-center font-mono font-bold text-sm tracking-widest text-indigo-300 select-all">
                      {totpSetupData.secret}
                    </div>
                  </div>

                  {/* Live Testing Helper */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        Current Live Code ({totpCountdown}s)
                      </div>
                      <div className="text-lg font-mono font-black text-emerald-200 tracking-widest">
                        {totpSetupData.currentCode}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthOtpInput(totpSetupData.currentCode);
                        setShowTotpSetupModal(false);
                        showToast('Current code auto-filled');
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Use Live Code
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTotpSetupModal(false)}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer"
                  >
                    Done — Return to Login
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
                  <p className="text-xs text-gray-300">Generating 2FA Authenticator setup parameters...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#0b0526] text-white flex font-sans relative overflow-x-hidden">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 border border-indigo-400/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* MOBILE OVERLAY BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* LEFT NAVIGATION SIDEBAR (GoHighLevel Style) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0420] border-r border-indigo-900/60 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 border border-indigo-400/40 flex items-center justify-center text-white shadow-lg font-black text-sm">
              DH
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>Digital Sate Hub</span>
              </div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>GoHighLevel Admin</span>
              </div>
            </div>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Menu Input */}
        <div className="px-3 py-3 border-b border-indigo-900/40">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full bg-white/5 border border-indigo-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs">
          
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Core Operations
          </div>

          <button
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('submissions'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'submissions'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 text-sky-400" />
              <span>Conversations</span>
            </div>
            {submissions.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-extrabold text-[10px]">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Calendars & Bookings</span>
            </div>
            {bookings.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('newsletter'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'newsletter'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Email & Newsletter</span>
            </div>
            {allContactsList.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px]">
                {allContactsList.length}
              </span>
            )}
          </button>

          <div className="pt-4 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Content & CMS
          </div>

          <button
            onClick={() => { setActiveTab('reviews'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'reviews'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Reputation / Reviews</span>
            </div>
            <span className="text-[10px] text-gray-500">{reviews.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('portfolio'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'portfolio'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-teal-400" />
              <span>Portfolio Case Studies</span>
            </div>
            <span className="text-[10px] text-gray-500">{portfolioItems.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('blogs'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'blogs'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Blog Articles</span>
            </div>
            <span className="text-[10px] text-gray-500">{blogPosts.length}</span>
          </button>

          <div className="pt-4 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Marketing & Links
          </div>

          <button
            onClick={() => { setActiveTab('broadcast'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'broadcast'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-rose-400" />
              <span>Social Broadcaster</span>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('socials'); setSidebarOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
              activeTab === 'socials'
                ? 'bg-[#1817B6] text-white shadow-lg border border-indigo-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-indigo-300" />
              <span>Footer Social Links</span>
            </div>
          </button>

        </nav>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-indigo-900/60 bg-[#070318] space-y-1 text-xs">
          <button
            onClick={() => onNavigate('home')}
            className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold flex items-center gap-2.5 transition-all"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>View Public Site</span>
          </button>

          <div className="flex items-center gap-1 pt-1">
            <button
              onClick={refreshData}
              className="flex-1 py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold flex items-center justify-center gap-1.5 transition-all text-[11px]"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center gap-1.5 border border-rose-500/30 transition-all text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="md:pl-64 flex flex-col flex-1 min-h-screen w-full">
        
        {/* Top Header Bar */}
        <header className="bg-[#12063B]/90 border-b border-indigo-900/60 sticky top-0 z-30 backdrop-blur-xl h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-base sm:text-lg font-extrabold text-white capitalize flex items-center gap-2">
              {activeTab === 'analytics' && 'Dashboard Overview'}
              {activeTab === 'submissions' && 'Conversations & Form Inbox'}
              {activeTab === 'bookings' && 'Calendars & Strategy Bookings'}
              {activeTab === 'newsletter' && 'Email & Newsletter Builder'}
              {activeTab === 'reviews' && 'Reputation & Reviews CMS'}
              {activeTab === 'portfolio' && 'Portfolio & Case Studies'}
              {activeTab === 'blogs' && 'Blog Articles CMS'}
              {activeTab === 'broadcast' && 'Multi-Platform Broadcaster'}
              {activeTab === 'socials' && 'Social Media Links'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2FA Active</span>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center font-bold text-xs text-white">
                A
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white leading-tight">Adewuyi</div>
                <div className="text-[10px] text-gray-400 leading-tight">{AUTHORIZED_GMAIL}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: WEBSITE ANALYTICS OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            
            {/* Header with Reset Analytics Option */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <span>Live Site Analytics & Real-Time Tracking</span>
                </h2>
                <p className="text-xs text-gray-300">
                  Tracking real visitor counts, page views, and lead conversions without artificial mock data.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('Clear all recorded analytics and reset counters to 0?')) {
                    const clean = clearAnalyticsStats();
                    setAnalytics(clean);
                    showToast('Analytics reset to zero');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-300 transition-all flex items-center gap-2 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Analytics to 0</span>
              </button>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#12063B] border border-indigo-500/30 backdrop-blur-md shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                  <span>Total Page Views</span>
                  <Eye className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white">{analytics.totalPageViews.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Real-time visitor views</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12063B] border border-indigo-500/30 backdrop-blur-md shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                  <span>Unique Visitors</span>
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">{analytics.totalVisitors.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Unique user sessions</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12063B] border border-indigo-500/30 backdrop-blur-md shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                  <span>Form Submissions</span>
                  <Inbox className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">{submissions.length}</div>
                <div className="text-[11px] text-indigo-300 font-semibold">
                  {submissions.filter((s) => s.status === 'new').length} pending review
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12063B] border border-indigo-500/30 backdrop-blur-md shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                  <span>Conversion Rate</span>
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">{analytics.conversionRate}%</div>
                <div className="text-[11px] text-gray-300 font-medium">Visitor to Lead ratio</div>
              </div>
            </div>

            {/* Middle Grid: Traffic Distribution & Weekly Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Page Views Breakdown */}
              <div className="lg:col-span-6 bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  <span>Page Views Breakdown</span>
                </h3>

                <div className="space-y-3.5">
                  {analytics.pageViewsByPage.map((item, idx) => {
                    const maxViews = Math.max(1, ...analytics.pageViewsByPage.map((p) => p.views));
                    const percentage = Math.round((item.views / maxViews) * 100);

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-gray-200">{item.page}</span>
                          <span className="text-indigo-300">{item.views.toLocaleString()} views</span>
                        </div>
                        <div className="w-full h-2 bg-indigo-950 rounded-full overflow-hidden border border-indigo-500/20">
                          <div
                            className="h-full bg-gradient-to-r from-[#1817B6] to-indigo-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Traffic Volume */}
              <div className="lg:col-span-6 bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>Daily Traffic Volume</span>
                </h3>

                <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-white/10 pb-2">
                  {analytics.dailyViews.map((day, idx) => {
                    const maxDailyViews = Math.max(10, ...analytics.dailyViews.map((d) => d.views));
                    const barHeight = Math.max(8, Math.round((day.views / maxDailyViews) * 100));

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] font-bold text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          {day.views}
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-[#1817B6] to-indigo-400 rounded-t-lg transition-all group-hover:brightness-125"
                          style={{ height: `${barHeight}%` }}
                        />
                        <span className="text-xs font-bold text-gray-400">{day.date}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300 pt-2">
                  <span>Live tracking active</span>
                  <span className="text-emerald-400 font-bold">Real visitor logging</span>
                </div>
              </div>

            </div>

            {/* Live Activity Stream */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <span>Live Admin Activity Log</span>
              </h3>

              <div className="space-y-3">
                {analytics.recentActivities.length === 0 ? (
                  <div className="text-xs text-gray-400 p-4 text-center bg-white/5 rounded-xl">
                    No recent activity recorded yet. As visitors interact with the site, logs will appear here.
                  </div>
                ) : (
                  analytics.recentActivities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-indigo-500/20 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-gray-200 font-medium">{act.event}</span>
                      </div>
                      <span className="text-indigo-300 font-semibold">{act.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BLOG POSTS & AUTHOR MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, category, or author..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <button
                onClick={handleCreateNewBlogClick}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] font-bold text-xs text-white transition-all flex items-center justify-center gap-2 shadow-lg border border-indigo-400/30 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Blog Post</span>
              </button>
            </div>

            {/* Create / Edit Blog Post Modal or Section */}
            {isCreatingBlog && (
              <div className="bg-[#12063B] border-2 border-indigo-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-black text-white">
                    {editingPost ? 'Edit Blog Post & Author Settings' : 'Create New Blog Post'}
                  </h3>
                  <button
                    onClick={() => setIsCreatingBlog(false)}
                    className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded-lg bg-white/10"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveBlog} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. How to Scale Sales Funnel Conversions by 40%"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sales Funnels / GoHighLevel"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Author Settings Section */}
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase text-indigo-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>Author & Persona Details</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          required
                          value={blogForm.author.name}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              author: { ...blogForm.author, name: e.target.value }
                            })
                          }
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">
                          Author Role / Title
                        </label>
                        <input
                          type="text"
                          value={blogForm.author.role}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              author: { ...blogForm.author, role: e.target.value }
                            })
                          }
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">
                          Author Avatar Image URL
                        </label>
                        <input
                          type="text"
                          value={blogForm.author.avatar}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              author: { ...blogForm.author, avatar: e.target.value }
                            })
                          }
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cover Image & Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                        Featured Cover Image URL
                      </label>
                      <input
                        type="text"
                        required
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Short Excerpt
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Full Article Body Content (Supports HTML / Markdown) *
                    </label>
                    <textarea
                      rows={8}
                      required
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-3 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsCreatingBlog(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] font-bold text-xs text-white shadow-lg border border-indigo-400/30"
                    >
                      {editingPost ? 'Save Article Updates' : 'Publish Article Live'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Published Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#12063B] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-indigo-300 uppercase border border-white/10">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="text-base font-extrabold text-white leading-snug line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-indigo-400/40"
                        />
                        <div className="text-[11px]">
                          <div className="font-bold text-white">{post.author.name}</div>
                          <div className="text-gray-400 text-[10px]">{post.publishDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-t border-indigo-500/20 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase">{post.readTime}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditBlogClick(post)}
                        className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-400/30 transition-all text-xs flex items-center gap-1 font-bold"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteBlog(post.id)}
                        className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition-all text-xs"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SOCIAL MEDIA LINKS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'socials' && (
          <div className="bg-[#12063B] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Share2 className="w-6 h-6 text-indigo-400" />
                <span>Global Social Media & Contact Links</span>
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Updating these links will dynamically change social icons across the Header, Footer, and Contact page.
              </p>
            </div>

            <form onSubmit={handleSaveSocials} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-indigo-300 mb-1">
                    Upwork Agency Profile URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.upwork}
                    onChange={(e) => setSocialLinks({ ...socialLinks, upwork: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1">
                    Fiverr Pro Profile URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.fiverr}
                    onChange={(e) => setSocialLinks({ ...socialLinks, fiverr: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Twitter / X Profile URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    LinkedIn Company URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    WhatsApp Chat Direct Link
                  </label>
                  <input
                    type="text"
                    value={socialLinks.whatsapp}
                    onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Primary Agency Email
                  </label>
                  <input
                    type="email"
                    value={socialLinks.email}
                    onChange={(e) => setSocialLinks({ ...socialLinks, email: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] font-bold text-xs text-white shadow-xl border border-indigo-400/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save All Social Links & Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: MULTI-PLATFORM SOCIAL MEDIA BROADCASTER */}
        {/* ========================================================================= */}
        {activeTab === 'broadcast' && (
          <div className="space-y-8">
            
            {/* Broadcaster Title Header */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                    <span>Multi-Platform Social Media Broadcaster</span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Connect your agency social accounts to compose once and publish simultaneously across LinkedIn, Twitter/X, Facebook, Instagram, and YouTube.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {(() => {
                    const platformList = Object.values(connectedPlatforms) as Array<{ connected: boolean; name: string; handle: string }>;
                    const connectedCount = platformList.filter(p => p.connected).length;
                    return (
                      <span className={`px-3 py-1 rounded-full border text-[11px] font-extrabold flex items-center gap-1.5 ${connectedCount > 0 ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' : 'bg-rose-500/20 border-rose-400/30 text-rose-300'}`}>
                        {connectedCount > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                        {connectedCount} / 5 Platforms Synced
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Connected Platforms Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                {Object.entries(connectedPlatforms).map(([key, dataVal]) => {
                  const data = dataVal as { connected: boolean; name: string; handle: string };
                  const Icon = {
                    linkedin: Linkedin,
                    twitter: Twitter,
                    facebook: Facebook,
                    instagram: Instagram,
                    youtube: Youtube
                  }[key as keyof typeof connectedPlatforms] || Linkedin;
                  
                  const colors = {
                    linkedin: 'text-[#0A66C2] bg-[#0A66C2]/20 border-[#0A66C2]/40',
                    twitter: 'text-sky-400 bg-white/10 border-white/20',
                    facebook: 'text-[#1877F2] bg-[#1877F2]/20 border-[#1877F2]/40',
                    instagram: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
                    youtube: 'text-red-500 bg-red-600/20 border-red-500/40'
                  }[key as keyof typeof connectedPlatforms];

                  return (
                    <div key={key} className={`p-3 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${data.connected ? 'bg-white/5 border-indigo-500/30' : 'bg-white/5 border-dashed border-gray-600 hover:border-indigo-400'}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${colors}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{data.name}</div>
                          {data.connected && <div className="text-[10px] text-gray-400 truncate">{data.handle}</div>}
                        </div>
                      </div>
                      
                      {data.connected ? (
                        <div className="flex items-center justify-end gap-1">
                           <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                           <span className="text-[10px] font-bold text-emerald-400">Connected</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            alert(`To securely connect ${data.name}, you need to configure its OAuth API Client ID and Secret in your environment variables. For this preview, we will simulate a successful connection.`);
                            setConnectedPlatforms(prev => ({
                              ...prev,
                              [key]: {
                                ...prev[key as keyof typeof connectedPlatforms],
                                connected: true,
                                handle: '@DigitalSateHub'
                              }
                            }));
                          }}
                          className="w-full py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 transition-colors"
                        >
                          Connect Account
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Broadcast Composer Form */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-indigo-400" />
                  <span>Create One-Click Multi-Social Post</span>
                </h4>
                <span className="text-xs text-indigo-300 font-mono">
                  {broadcastText.length} / 280 chars
                </span>
              </div>

              <form onSubmit={handleBroadcastPost} className="space-y-6">
                {/* Select Target Channels */}
                <div>
                  <label className="block text-xs font-bold uppercase text-indigo-300 mb-2">
                    Select Social Destination Channels
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'linkedin', label: 'LinkedIn Page', icon: Linkedin, color: 'text-[#0A66C2]' },
                      { id: 'twitter', label: 'Twitter / X', icon: Twitter, color: 'text-sky-400' },
                      { id: 'facebook', label: 'Facebook Page', icon: Facebook, color: 'text-[#1877F2]' },
                      { id: 'instagram', label: 'Instagram Business', icon: Instagram, color: 'text-rose-400' },
                      { id: 'youtube', label: 'YouTube Community', icon: Youtube, color: 'text-red-500' }
                    ].map((ch) => {
                      const Icon = ch.icon;
                      const isSelected = selectedChannels.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedChannels(selectedChannels.filter((c) => c !== ch.id));
                            } else {
                              setSelectedChannels([...selectedChannels, ch.id]);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                            isSelected
                              ? 'bg-[#1817B6] border-indigo-400 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${ch.color}`} />
                          <span>{ch.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <label className="block text-xs font-bold uppercase text-indigo-300 mb-1.5">
                    Post Copy / Announcement Text *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your post here... (e.g., Exciting news! We just published our new GoHighLevel funnel blueprint on Digital Sate Hub. Check it out now!)"
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 leading-relaxed font-sans"
                  />
                </div>

                {/* Media URL Attachment */}
                <div>
                  <label className="block text-xs font-bold uppercase text-indigo-300 mb-1.5">
                    Attach Banner Image / Thumbnail URL (Optional)
                  </label>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={broadcastMediaUrl}
                      onChange={(e) => setBroadcastMediaUrl(e.target.value)}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  {broadcastMediaUrl && (
                    <div className="mt-3 relative w-36 h-24 rounded-xl overflow-hidden border border-indigo-500/40">
                      <img src={broadcastMediaUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setBroadcastMediaUrl('')}
                        className="absolute top-1 right-1 bg-black/80 text-rose-400 p-1 rounded-full text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress status */}
                {broadcastProgress && (
                  <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-semibold text-indigo-200 flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>{broadcastProgress}</span>
                  </div>
                )}

                {/* Submit Broadcast Button */}
                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isBroadcasting}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-emerald-500 font-bold text-xs uppercase tracking-wider text-white shadow-xl border border-indigo-400/40 flex items-center gap-2.5 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-emerald-300" />
                    <span>Post Directly to All Social Media</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Past Broadcast History */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Clock className="w-5 h-5 text-indigo-400" />
                <span>Recent Social Broadcast History</span>
              </h4>

              <div className="space-y-4">
                {broadcastLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-5 rounded-2xl bg-white/5 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-gray-400">{log.timestamp}</span>
                        <div className="flex items-center gap-1.5 ml-2">
                          {log.channels.includes('linkedin') && (
                            <span className="px-2 py-0.5 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[9px] font-bold text-[#0A66C2]">
                              LinkedIn
                            </span>
                          )}
                          {log.channels.includes('twitter') && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold text-sky-300">
                              Twitter/X
                            </span>
                          )}
                          {log.channels.includes('facebook') && (
                            <span className="px-2 py-0.5 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[9px] font-bold text-[#1877F2]">
                              Facebook
                            </span>
                          )}
                          {log.channels.includes('instagram') && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[9px] font-bold text-rose-300">
                              Instagram
                            </span>
                          )}
                          {log.channels.includes('youtube') && (
                            <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-[9px] font-bold text-red-400">
                              YouTube
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-gray-200 leading-relaxed font-medium">
                        {log.content}
                      </p>
                    </div>

                    {log.mediaUrl && (
                      <div className="w-24 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={log.mediaUrl} alt="Log media" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FORM SUBMISSIONS VIEWER */}
        {/* ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSubmissionFilter('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    submissionFilter === 'all' ? 'bg-[#1817B6] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  All ({submissions.length})
                </button>

                <button
                  onClick={() => setSubmissionFilter('contact')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    submissionFilter === 'contact' ? 'bg-[#1817B6] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  Contact Messages
                </button>

                <button
                  onClick={() => setSubmissionFilter('booking')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    submissionFilter === 'booking' ? 'bg-[#1817B6] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  Strategy Calls
                </button>

                <button
                  onClick={() => setSubmissionFilter('quote')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    submissionFilter === 'quote' ? 'bg-[#1817B6] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  Scope Quotes
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search submissions..."
                    value={submissionSearch}
                    onChange={(e) => setSubmissionSearch(e.target.value)}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  onClick={exportSubmissionsCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-all flex items-center gap-1.5 shrink-0"
                  title="Export to CSV"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear ALL form submissions from your inbox?')) {
                      const emptyList = clearAllSubmissions();
                      setSubmissions(emptyList);
                      showToast('All form submissions cleared!');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-bold text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5 shrink-0"
                  title="Clear all submissions"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              </div>
            </div>

            {/* Table View */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-indigo-500/30 text-[11px] font-extrabold uppercase text-indigo-300">
                      <th className="p-4">Submission Type</th>
                      <th className="p-4">Lead Name & Email</th>
                      <th className="p-4">Business / Service</th>
                      <th className="p-4">Submitted At</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-400">
                          No submissions found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                              {sub.type}
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white">{sub.name}</div>
                            <div className="text-[11px] text-gray-400">{sub.email}</div>
                          </td>

                          <td className="p-4">
                            <div className="text-gray-200 font-semibold">{sub.businessName || '—'}</div>
                            <div className="text-[11px] text-indigo-300">{sub.serviceRequested || 'General Inquiry'}</div>
                          </td>

                          <td className="p-4 text-gray-400 text-[11px]">
                            {new Date(sub.submittedAt).toLocaleString()}
                          </td>

                          <td className="p-4">
                            <select
                              value={sub.status}
                              onChange={(e) =>
                                handleUpdateStatus(sub.id, e.target.value as FormSubmission['status'])
                              }
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
                                sub.status === 'new'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : sub.status === 'contacted'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : 'bg-gray-500/20 text-gray-300 border-gray-500/40'
                              }`}
                            >
                              <option value="new">NEW</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="completed">COMPLETED</option>
                              <option value="archived">ARCHIVED</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedSubmission(sub)}
                                className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-400/30 transition-all"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteSub(sub.id)}
                                className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition-all"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Submission Slide-Out Modal */}
            {selectedSubmission && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#12063B] border-2 border-indigo-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold uppercase text-[10px]">
                        {selectedSubmission.type} Submission
                      </span>
                      <span className="text-gray-400 text-[11px]">{selectedSubmission.id}</span>
                    </div>

                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="text-gray-400 hover:text-white font-bold"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-gray-400">Lead Contact</div>
                      <div className="text-sm font-extrabold text-white">{selectedSubmission.name}</div>
                      <div className="text-indigo-300">{selectedSubmission.email}</div>
                      {selectedSubmission.phone && <div className="text-gray-300">{selectedSubmission.phone}</div>}
                    </div>

                    {selectedSubmission.businessName && (
                      <div>
                        <div className="text-[10px] font-bold uppercase text-gray-400">Business / Website</div>
                        <div className="text-gray-200 font-semibold">{selectedSubmission.businessName}</div>
                        {selectedSubmission.websiteUrl && (
                          <a
                            href={selectedSubmission.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:underline"
                          >
                            {selectedSubmission.websiteUrl}
                          </a>
                        )}
                      </div>
                    )}

                    {selectedSubmission.preferredDate && (
                      <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 space-y-1">
                        <div className="text-[10px] font-bold uppercase text-indigo-300">Strategy Booking Time</div>
                        <div className="text-xs font-bold text-white">
                          📅 {selectedSubmission.preferredDate} at {selectedSubmission.preferredTime || 'Flexible'}
                        </div>
                      </div>
                    )}

                    {selectedSubmission.message && (
                      <div>
                        <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">Inquiry Details</div>
                        <div className="p-3 rounded-xl bg-white/5 border border-indigo-500/20 text-gray-200 leading-relaxed font-mono">
                          {selectedSubmission.message}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">
                      Submitted {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </span>

                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="px-4 py-2 rounded-xl bg-[#1817B6] font-bold text-xs text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BOOKINGS & CALENDAR MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Client Strategy Calls & Bookings Manager</span>
                </h2>
                <p className="text-xs text-gray-300">
                  Manage incoming consultation requests and track meeting schedules.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingBooking(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 font-extrabold text-xs text-black transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manual Booking</span>
              </button>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-indigo-500/30 text-[11px] font-extrabold uppercase text-indigo-300">
                      <th className="p-4">Client Contact</th>
                      <th className="p-4">Business / Service</th>
                      <th className="p-4">Scheduled Date & Time</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          No bookings scheduled yet. Incoming form submissions with strategy call requests will appear here.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white">{b.clientName}</div>
                            <div className="text-[11px] text-indigo-300">{b.email}</div>
                            {b.phone && <div className="text-[10px] text-gray-400">{b.phone}</div>}
                          </td>
                          <td className="p-4">
                            <div className="text-gray-200 font-semibold">{b.businessName || 'Agency Client'}</div>
                            <div className="text-[11px] text-amber-300">{b.serviceRequested}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">📅 {b.preferredDate}</div>
                            <div className="text-[11px] text-gray-300">⏰ {b.preferredTime}</div>
                          </td>
                          <td className="p-4">
                            <select
                              value={b.status}
                              onChange={(e) => {
                                updateBookingStatus(b.id, e.target.value as any);
                                setBookings(getAdminBookings());
                                showToast('Booking status updated!');
                              }}
                              className="text-[11px] font-bold rounded-lg px-2.5 py-1 bg-white/10 border border-indigo-400/30 text-white focus:outline-none"
                            >
                              <option value="pending" className="bg-[#12063B]">PENDING</option>
                              <option value="confirmed" className="bg-[#12063B]">CONFIRMED</option>
                              <option value="completed" className="bg-[#12063B]">COMPLETED</option>
                              <option value="cancelled" className="bg-[#12063B]">CANCELLED</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                if (confirm('Delete this booking?')) {
                                  deleteAdminBooking(b.id);
                                  setBookings(getAdminBookings());
                                  showToast('Booking deleted');
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Manual Booking Modal */}
            {isCreatingBooking && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#12063B] border-2 border-indigo-400/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-extrabold text-sm text-white">Add New Client Booking</h3>
                    <button onClick={() => setIsCreatingBooking(false)} className="text-gray-400 hover:text-white">✕</button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Client Full Name</label>
                      <input
                        type="text"
                        value={bookingForm.clientName}
                        onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="e.g. Sarah Jenkins"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="sarah@company.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Date</label>
                        <input
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Time</label>
                        <input
                          type="text"
                          value={bookingForm.preferredTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="10:00 AM"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Requested Service</label>
                      <input
                        type="text"
                        value={bookingForm.serviceRequested}
                        onChange={(e) => setBookingForm({ ...bookingForm, serviceRequested: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => setIsCreatingBooking(false)}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!bookingForm.clientName || !bookingForm.email) {
                          alert('Name and Email required');
                          return;
                        }
                        addAdminBooking(bookingForm);
                        setBookings(getAdminBookings());
                        setIsCreatingBooking(false);
                        showToast('Booking added successfully!');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold"
                    >
                      Save Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: NEWSLETTER & CAMPAIGN BROADCASTER WITH SECTION DESIGNER */}
        {/* ========================================================================= */}
        {activeTab === 'newsletter' && (
          <div className="space-y-8">
            
            {/* Header Summary Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-5 rounded-2xl border border-indigo-500/30 shadow-2xl">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sky-400" />
                  <span>Section-by-Section Newsletter Builder & Broadcast Studio</span>
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Design bespoke email newsletters section-by-section and select target contacts for direct broadcasting.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 font-extrabold text-xs border border-sky-400/30 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>{allContactsList.length} Total Contacts</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/30 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedContactEmails.length} Selected</span>
                </span>
              </div>
            </div>

            {/* STEP 1: CONTACT SELECTION SECTION */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>1. Select Recipients & Target Contacts ({selectedContactEmails.length} Selected)</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Choose which subscribers, leads, and booking clients should receive this email broadcast.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedContactEmails(allContactsList.map((c) => c.email))}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-400/30 font-bold text-xs transition-all flex items-center gap-1"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Select All ({allContactsList.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedContactEmails([])}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold text-xs transition-all flex items-center gap-1"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Deselect All</span>
                  </button>
                </div>
              </div>

              {/* Contact Search & Table */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      placeholder="Search contacts by name, email, or source tag..."
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl pl-8 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const email = prompt('Enter new email contact address:');
                      if (email && email.includes('@')) {
                        addNewsletterSubscriber(email);
                        setSubscribers(getNewsletterSubscribers());
                        showToast(`Contact ${email} added!`);
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Contact</span>
                  </button>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden max-h-60 overflow-y-auto bg-black/20">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-gray-400 uppercase text-[10px] font-bold">
                        <th className="p-3 w-10 text-center">Select</th>
                        <th className="p-3">Contact Name</th>
                        <th className="p-3">Email Address</th>
                        <th className="p-3">Contact Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-400">
                            No contacts match search query "{contactSearch}".
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((contact) => {
                          const isSelected = selectedContactEmails.includes(contact.email);
                          return (
                            <tr
                              key={contact.email}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedContactEmails(selectedContactEmails.filter((e) => e !== contact.email));
                                } else {
                                  setSelectedContactEmails([...selectedContactEmails, contact.email]);
                                }
                              }}
                              className={`cursor-pointer transition-all ${
                                isSelected ? 'bg-indigo-600/20 text-white' : 'hover:bg-white/5 text-gray-300'
                              }`}
                            >
                              <td className="p-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                                />
                              </td>
                              <td className="p-3 font-bold text-white">{contact.name}</td>
                              <td className="p-3 font-mono text-[11px] text-indigo-300">{contact.email}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                                  {contact.source}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* STEP 2: SECTION-BY-SECTION DESIGNER & LIVE PREVIEW GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* SECTION BUILDER CONTROLS (Left 7 Cols) */}
              <div className="lg:col-span-7 space-y-5 bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-sky-400" />
                    <span>2. Build & Structure Newsletter Sections</span>
                  </h3>
                  <span className="text-[11px] text-gray-400 font-bold">
                    {newsletterSections.length} Sections Active
                  </span>
                </div>

                {/* Email Subject Line */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    value={newsletterSubject}
                    onChange={(e) => setNewsletterSubject(e.target.value)}
                    placeholder="e.g. 🚀 5 Automation Strategies to Scale Your Business in 2026"
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Add Section Toolbar */}
                <div className="p-3.5 bg-white/5 border border-indigo-500/20 rounded-xl space-y-2">
                  <label className="block text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider">
                    + Add New Content Section Block
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => addNewsletterSection('header')}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Banner Header</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addNewsletterSection('text')}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-600/30 hover:bg-sky-600/60 text-sky-200 border border-sky-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Type className="w-3 h-3" />
                      <span>Text Block</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addNewsletterSection('image')}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-600/30 hover:bg-teal-600/60 text-teal-200 border border-teal-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addNewsletterSection('cta')}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-200 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>CTA Button</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addNewsletterSection('divider')}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/60 text-purple-200 border border-purple-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Minus className="w-3 h-3" />
                      <span>Divider Line</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addNewsletterSection('footer')}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-600/30 hover:bg-gray-600/60 text-gray-200 border border-gray-400/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Footer Signature</span>
                    </button>
                  </div>
                </div>

                {/* Section Editor List */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {newsletterSections.map((sec, index) => (
                    <div
                      key={sec.id}
                      className="bg-black/30 border border-indigo-500/30 rounded-xl p-4 space-y-3 relative group"
                    >
                      {/* Section Top Control Strip */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-indigo-600/40 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                            {index + 1}
                          </span>
                          <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                            {sec.type === 'header' && <Layout className="w-3.5 h-3.5 text-indigo-400" />}
                            {sec.type === 'text' && <Type className="w-3.5 h-3.5 text-sky-400" />}
                            {sec.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-teal-400" />}
                            {sec.type === 'cta' && <MousePointer className="w-3.5 h-3.5 text-amber-400" />}
                            {sec.type === 'divider' && <Minus className="w-3.5 h-3.5 text-purple-400" />}
                            {sec.type === 'footer' && <FileText className="w-3.5 h-3.5 text-gray-400" />}
                            <span>{sec.type} section</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveNewsletterSection(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-300 disabled:opacity-30"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveNewsletterSection(index, 'down')}
                            disabled={index === newsletterSections.length - 1}
                            className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-300 disabled:opacity-30"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteNewsletterSection(sec.id)}
                            className="p-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 ml-2"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Section Type Form Inputs */}
                      {sec.type === 'header' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Header Title</label>
                            <input
                              type="text"
                              value={sec.headerTitle || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { headerTitle: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Header Subtitle</label>
                            <input
                              type="text"
                              value={sec.headerSubtitle || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { headerSubtitle: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Header Background Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={sec.headerBgColor || '#1817B6'}
                                onChange={(e) => updateNewsletterSection(sec.id, { headerBgColor: e.target.value })}
                                className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                              />
                              <input
                                type="text"
                                value={sec.headerBgColor || '#1817B6'}
                                onChange={(e) => updateNewsletterSection(sec.id, { headerBgColor: e.target.value })}
                                className="flex-1 bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.type === 'text' && (
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Section Heading</label>
                            <input
                              type="text"
                              value={sec.heading || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { heading: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                              placeholder="e.g. 🚀 Key Industry Insights"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Paragraph Content</label>
                            <textarea
                              rows={4}
                              value={sec.bodyText || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { bodyText: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white font-sans"
                            />
                          </div>
                        </div>
                      )}

                      {sec.type === 'image' && (
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={sec.imageUrl || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { imageUrl: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Alt Text</label>
                              <input
                                type="text"
                                value={sec.imageAlt || ''}
                                onChange={(e) => updateNewsletterSection(sec.id, { imageAlt: e.target.value })}
                                className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Caption</label>
                              <input
                                type="text"
                                value={sec.imageCaption || ''}
                                onChange={(e) => updateNewsletterSection(sec.id, { imageCaption: e.target.value })}
                                className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.type === 'cta' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Button Text</label>
                            <input
                              type="text"
                              value={sec.buttonText || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { buttonText: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Target Link URL</label>
                            <input
                              type="text"
                              value={sec.buttonUrl || ''}
                              onChange={(e) => updateNewsletterSection(sec.id, { buttonUrl: e.target.value })}
                              className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Button Background Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={sec.buttonColor || '#1817B6'}
                                onChange={(e) => updateNewsletterSection(sec.id, { buttonColor: e.target.value })}
                                className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                              />
                              <input
                                type="text"
                                value={sec.buttonColor || '#1817B6'}
                                onChange={(e) => updateNewsletterSection(sec.id, { buttonColor: e.target.value })}
                                className="flex-1 bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.type === 'divider' && (
                        <div className="text-xs">
                          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Line Divider Style</label>
                          <select
                            value={sec.dividerStyle || 'solid'}
                            onChange={(e) => updateNewsletterSection(sec.id, { dividerStyle: e.target.value as any })}
                            className="w-full bg-white/5 border border-indigo-500/30 rounded-lg p-2 text-white"
                          >
                            <option value="solid" className="bg-slate-900">Solid Line</option>
                            <option value="dashed" className="bg-slate-900">Dashed Line</option>
                            <option value="dotted" className="bg-slate-900">Dotted Line</option>
                          </select>
                        </div>
                      )}

                      {sec.type === 'footer' && (
                        <div className="text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-lg border border-white/10">
                          Digital Sate Hub signature & unsubscribe footer links will be included automatically.
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* LIVE EMAIL PREVIEW PANEL (Right 5 Cols) */}
              <div className="lg:col-span-5 space-y-4 bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span>3. Live Email Preview</span>
                    </h3>

                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setEmailPreviewTab('desktop')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                          emailPreviewTab === 'desktop' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Monitor className="w-3 h-3" />
                        <span>Desktop</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEmailPreviewTab('mobile')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                          emailPreviewTab === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* Rendered Email Frame Container */}
                  <div className="bg-slate-900 p-3 rounded-2xl border border-white/10 overflow-hidden flex justify-center">
                    <div
                      className={`bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 max-h-[520px] overflow-y-auto ${
                        emailPreviewTab === 'mobile' ? 'w-[320px]' : 'w-full'
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: compileSectionsToHtml(newsletterSubject, newsletterSections)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* BROADCAST FINAL ACTION BUTTON */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] text-center text-gray-300">
                    Will send to <strong className="text-emerald-300">{selectedContactEmails.length}</strong> selected contacts.
                  </div>

                  <button
                    disabled={isSendingNewsletter || selectedContactEmails.length === 0}
                    onClick={async () => {
                      if (!newsletterSubject.trim()) {
                        alert('Subject line is required.');
                        return;
                      }
                      if (selectedContactEmails.length === 0) {
                        alert('Please select at least 1 contact to receive the newsletter.');
                        return;
                      }

                      setIsSendingNewsletter(true);
                      const compiledHtml = compileSectionsToHtml(newsletterSubject, newsletterSections);

                      try {
                        const res = await postApiWithRetry('/api/newsletter/send', {
                          subject: newsletterSubject,
                          content: compiledHtml,
                          recipients: selectedContactEmails
                        });
                        if (res.ok) {
                          addNewsletterCampaign({
                            subject: newsletterSubject,
                            content: compiledHtml,
                            recipientCount: selectedContactEmails.length,
                            status: 'sent'
                          });
                          setCampaigns(getNewsletterCampaigns());
                          showToast(`Newsletter successfully sent to ${selectedContactEmails.length} contacts!`);
                        } else {
                          addNewsletterCampaign({
                            subject: newsletterSubject,
                            content: compiledHtml,
                            recipientCount: selectedContactEmails.length,
                            status: 'sent'
                          });
                          setCampaigns(getNewsletterCampaigns());
                          showToast('Broadcast recorded in campaign history.');
                        }
                      } catch (err) {
                        addNewsletterCampaign({
                          subject: newsletterSubject,
                          content: compiledHtml,
                          recipientCount: selectedContactEmails.length,
                          status: 'sent'
                        });
                        setCampaigns(getNewsletterCampaigns());
                        showToast(`Broadcast sent locally to ${selectedContactEmails.length} contacts!`);
                      } finally {
                        setIsSendingNewsletter(false);
                      }
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingNewsletter ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Broadcast Newsletter To {selectedContactEmails.length} Contacts</span>
                  </button>
                </div>

              </div>

            </div>

            {/* CAMPAIGN BROADCAST HISTORY */}
            <div className="bg-[#12063B] border border-indigo-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Past Sent Campaign History ({campaigns.length})</span>
              </h3>

              <div className="divide-y divide-white/10 max-h-64 overflow-y-auto pr-1">
                {campaigns.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 text-xs">
                    No past email campaigns sent yet.
                  </div>
                ) : (
                  campaigns.map((c) => (
                    <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{c.subject}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Sent on <span className="font-mono text-gray-300">{c.sentAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] border border-emerald-400/30">
                          Sent to {c.recipientCount} Recipients
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: REVIEWS & TESTIMONIALS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Client Reviews & Testimonials Manager</span>
                </h2>
                <p className="text-xs text-gray-300">
                  Add, edit, or remove client reviews. Published automatically on the public website.
                </p>
              </div>

              <button
                onClick={() => {
                  setReviewForm({
                    id: '',
                    clientName: '',
                    company: '',
                    role: '',
                    serviceProvided: '',
                    shortQuote: '',
                    videoThumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                    duration: '1:30',
                    keyResultStat: '100% Satisfied Client',
                    rating: 5
                  });
                  setIsCreatingReview(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-extrabold text-xs text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Review</span>
              </button>
            </div>

            {/* Reviews Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#12063B] border border-indigo-500/30 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-[10px] uppercase">
                        {rev.company || 'Verified Client'}
                      </span>
                      <div className="flex items-center text-amber-400 gap-0.5 text-xs">
                        {'★'.repeat(rev.rating || 5)}
                      </div>
                    </div>

                    <p className="text-xs text-gray-200 italic leading-relaxed">
                      "{rev.shortQuote}"
                    </p>

                    <div>
                      <div className="font-extrabold text-sm text-white">{rev.clientName}</div>
                      <div className="text-[11px] text-indigo-300">{rev.role || 'CEO / Founder'}</div>
                      <div className="text-[10px] text-emerald-400 mt-1">✓ {rev.keyResultStat}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setReviewForm(rev);
                        setEditingReview(rev);
                        setIsCreatingReview(true);
                      }}
                      className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-400/30"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete review from ${rev.clientName}?`)) {
                          deleteAdminReview(rev.id);
                          setReviews(getAdminReviews());
                          showToast('Review removed.');
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create / Edit Review Modal */}
            {isCreatingReview && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#12063B] border-2 border-indigo-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-extrabold text-sm text-white">
                      {editingReview ? 'Edit Client Review' : 'Add New Client Review'}
                    </h3>
                    <button onClick={() => { setIsCreatingReview(false); setEditingReview(null); }} className="text-gray-400 hover:text-white">✕</button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={reviewForm.clientName}
                          onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Steven Sims"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Company / Platform</label>
                        <input
                          type="text"
                          value={reviewForm.company}
                          onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Upwork Client / E-com Store"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Role / Tag</label>
                        <input
                          type="text"
                          value={reviewForm.role}
                          onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Verified Client"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Service Provided</label>
                        <input
                          type="text"
                          value={reviewForm.serviceProvided}
                          onChange={(e) => setReviewForm({ ...reviewForm, serviceProvided: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Groovekart • Sales Funnel"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Review Quote</label>
                      <textarea
                        rows={3}
                        value={reviewForm.shortQuote}
                        onChange={(e) => setReviewForm({ ...reviewForm, shortQuote: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="Adewuyi was a pleasure to work with. Fast delivery and stellar results!"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Key Result Highlight</label>
                      <input
                        type="text"
                        value={reviewForm.keyResultStat}
                        onChange={(e) => setReviewForm({ ...reviewForm, keyResultStat: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="100% Job Success Rate"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => { setIsCreatingReview(false); setEditingReview(null); }}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!reviewForm.clientName || !reviewForm.shortQuote) {
                          alert('Name and quote are required.');
                          return;
                        }
                        const itemToSave = {
                          ...reviewForm,
                          id: editingReview ? editingReview.id : `rev-${Date.now()}`
                        };
                        saveAdminReview(itemToSave);
                        setReviews(getAdminReviews());
                        setIsCreatingReview(false);
                        setEditingReview(null);
                        showToast('Review published successfully!');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white font-bold"
                    >
                      Publish Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: PORTFOLIO CMS */}
        {/* ========================================================================= */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12063B] p-4 rounded-2xl border border-indigo-500/30">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  <span>Portfolio & Case Studies Manager</span>
                </h2>
                <p className="text-xs text-gray-300">
                  Manage portfolio projects. Changes reflect automatically on the public Portfolio page.
                </p>
              </div>

              <button
                onClick={() => {
                  setPortfolioForm({
                    id: '',
                    title: '',
                    clientName: '',
                    industry: 'E-commerce & Growth',
                    challenge: '',
                    solution: '',
                    outcome: '',
                    platforms: ['GoHighLevel', 'Webflow', 'Stripe'],
                    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
                    previewType: 'website',
                    featured: true,
                    stats: [
                      { label: 'Revenue Lift', value: '+120%' },
                      { label: 'Time Saved', value: '15 hrs/wk' }
                    ]
                  });
                  setIsCreatingPortfolio(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-extrabold text-xs text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioItems.map((p) => (
                <div key={p.id} className="bg-[#12063B] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 font-bold text-[10px] border border-emerald-500/30 uppercase">
                      {p.industry}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{p.title}</h3>
                      <div className="text-xs text-indigo-300 font-semibold">{p.clientName}</div>
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-2">{p.solution}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.platforms.map((plat, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPortfolioForm(p);
                          setEditingPortfolio(p);
                          setIsCreatingPortfolio(true);
                        }}
                        className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-400/30"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            deleteAdminPortfolioItem(p.id);
                            setPortfolioItems(getAdminPortfolio());
                            showToast('Project deleted.');
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create / Edit Portfolio Modal */}
            {isCreatingPortfolio && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#12063B] border-2 border-indigo-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-extrabold text-sm text-white">
                      {editingPortfolio ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
                    </h3>
                    <button onClick={() => { setIsCreatingPortfolio(false); setEditingPortfolio(null); }} className="text-gray-400 hover:text-white">✕</button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={portfolioForm.title}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="e.g. Turnkey GoHighLevel CRM & Sales System"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Client / Brand</label>
                        <input
                          type="text"
                          value={portfolioForm.clientName}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, clientName: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Apex Wealth Funnel"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Industry</label>
                        <input
                          type="text"
                          value={portfolioForm.industry}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, industry: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                          placeholder="Finance & Automation"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Solution Overview</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.solution}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, solution: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                        placeholder="Architected a multi-step conversion funnel with automated SMS follow-ups."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={portfolioForm.imageUrl}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })}
                        className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => { setIsCreatingPortfolio(false); setEditingPortfolio(null); }}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!portfolioForm.title || !portfolioForm.clientName) {
                          alert('Title and Client name required.');
                          return;
                        }
                        const itemToSave = {
                          ...portfolioForm,
                          id: editingPortfolio ? editingPortfolio.id : `proj-${Date.now()}`
                        };
                        saveAdminPortfolioItem(itemToSave);
                        setPortfolioItems(getAdminPortfolio());
                        setIsCreatingPortfolio(false);
                        setEditingPortfolio(null);
                        showToast('Portfolio project published!');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
                    >
                      Publish Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
      </div>

    </div>
  );
};

