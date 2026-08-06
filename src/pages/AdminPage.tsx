import React, { useState, useEffect } from 'react';
import {
  getSocialLinks,
  saveSocialLinks,
  getAdminBlogPosts,
  saveAdminBlogPost,
  deleteAdminBlogPost,
  getFormSubmissions,
  updateSubmissionStatus,
  deleteFormSubmission,
  getAnalyticsStats,
  clearAnalyticsStats,
  SocialLinks,
  FormSubmission,
  AnalyticsStats
} from '../lib/adminStore';
import { BlogPost, NavigationPage } from '../types';
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
  AlertCircle
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('dsh_admin_auth') === 'true';
  });
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'blogs' | 'socials' | 'submissions'>('analytics');

  // Admin Data States
  const [analytics, setAnalytics] = useState<AnalyticsStats>(getAnalyticsStats());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getAdminBlogPosts());
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(getSocialLinks());
  const [submissions, setSubmissions] = useState<FormSubmission[]>(getFormSubmissions());

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Blog Editing State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState<boolean>(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');

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
    showToast('Dashboard data refreshed');
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === '1234' || pinCode === 'admin' || pinCode === 'joju') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dsh_admin_auth', 'true');
      setPinError('');
      showToast('Welcome to Admin Studio');
    } else {
      setPinError('Invalid passcode. Default pin is 1234');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dsh_admin_auth');
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

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0526] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#12063B] border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1817B6] border border-indigo-400/40 flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-600/40">
              <Lock className="w-7 h-7 text-indigo-300" />
            </div>

            <h1 className="text-2xl font-black text-white">Digital Sate Hub Studio</h1>
            <p className="text-xs text-gray-300">Enter Admin passcode to access /joju control panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                Admin Passcode / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter 1234"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full bg-white/5 border border-indigo-500/40 rounded-xl py-3 px-4 text-center text-lg font-mono tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Authenticate & Enter Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <button
              onClick={() => {
                setPinCode('1234');
                setIsAuthenticated(true);
                sessionStorage.setItem('dsh_admin_auth', 'true');
              }}
              className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 underline"
            >
              Quick Demo Access (Click to bypass)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#0b0526] text-white flex flex-col font-sans">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 border border-indigo-400/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-[#12063B] border-b border-indigo-900/60 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Studio Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1817B6] border border-indigo-400/40 flex items-center justify-center text-white shadow-lg">
              <Lock className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white">Digital Sate Hub</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-[10px] font-extrabold text-indigo-300 uppercase">
                  Admin /joju
                </span>
              </div>
              <div className="text-[11px] text-gray-400">Website Management & Analytics Command Center</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-all flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={refreshData}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
              title="Refresh Analytics & Submissions"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-300 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Studio</span>
            </button>
          </div>

        </div>

        {/* Tab Selection Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-3">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-[#1817B6] border-indigo-400/50 text-white shadow-lg'
                : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Website Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'blogs'
                ? 'bg-[#1817B6] border-indigo-400/50 text-white shadow-lg'
                : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog & Author Posts ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'socials'
                ? 'bg-[#1817B6] border-indigo-400/50 text-white shadow-lg'
                : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media Links</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-[#1817B6] border-indigo-400/50 text-white shadow-lg'
                : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Form Submissions ({submissions.length})</span>
            {submissions.some((s) => s.status === 'new') && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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

      </main>

    </div>
  );
};
