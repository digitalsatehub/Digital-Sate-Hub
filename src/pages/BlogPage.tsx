import React, { useState, useRef } from 'react';
import { BLOG_POSTS } from '../data/siteData';
import { BlogPost } from '../types';
import { InteractiveBoxGrid } from '../components/InteractiveBoxGrid';
import {
  Search,
  Clock,
  User,
  Tag,
  ArrowRight,
  X,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface BlogPageProps {
  onOpenBooking?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'Conversion', 'Sales Funnels', 'GoHighLevel', 'CRM', 'AI Agents', 'Automation'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === 'All' || post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  // Calculate current post index for Previous/Next post navigation
  const currentPostIndex = selectedPost
    ? BLOG_POSTS.findIndex((p) => p.id === selectedPost.id)
    : -1;

  const handlePrevPost = () => {
    if (currentPostIndex === -1) return;
    const prevIdx = (currentPostIndex - 1 + BLOG_POSTS.length) % BLOG_POSTS.length;
    setSelectedPost(BLOG_POSTS[prevIdx]);
  };

  const handleNextPost = () => {
    if (currentPostIndex === -1) return;
    const nextIdx = (currentPostIndex + 1) % BLOG_POSTS.length;
    setSelectedPost(BLOG_POSTS[nextIdx]);
  };

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-12">
      
      {/* Page Hero Header with Interactive Box Grid Animation & Ambient Glows */}
      <div ref={heroRef} className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 text-center">
        {/* Interactive Box Grid Canvas */}
        <InteractiveBoxGrid containerRef={heroRef} />

        {/* Animated Background Moving Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none animate-pulse z-0" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/25 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Digital Sate Hub{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Growth Blog
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Actionable guides on sales funnel copywriting, GoHighLevel pipeline setups, AI lead agents, and conversion rate optimization.
          </p>
        </div>
      </div>

      {/* Search & Tag Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles & tactics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-indigo-500/30 rounded-2xl py-3 pl-12 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'bg-[#1817B6] text-white shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1817B6] px-2.5 py-1 rounded-full text-[10px] font-bold text-white">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-indigo-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#1817B6] border border-white/10 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Want to Know More Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-950/60 via-[#140845] to-indigo-950/60 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center mx-auto text-indigo-300">
              <HelpCircle className="w-6 h-6 text-indigo-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Want to Know More About Scaling Your Revenue?
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Book a 1-on-1 strategic growth session with our funnel & automation specialists. We’ll analyze your lead generation architecture and map out a custom growth system.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/40 border border-indigo-400/40 transition-all inline-flex items-center gap-2 group"
              >
                <span>Want to Know More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Navigation Top Header */}
            <div className="flex items-center justify-between border-b border-indigo-900/50 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPost}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-1.5 group"
                  title="Previous Article"
                >
                  <ChevronLeft className="w-4 h-4 text-indigo-300 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Previous Article</span>
                </button>

                <button
                  onClick={handleNextPost}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-1.5 group"
                  title="Next Article"
                >
                  <span className="hidden sm:inline">Next Article</span>
                  <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="text-[11px] font-semibold text-indigo-300">
                Post {currentPostIndex + 1} of {BLOG_POSTS.length}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">
              <span>{selectedPost.category}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              {selectedPost.title}
            </h2>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-indigo-500/20">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 space-y-4 whitespace-pre-line leading-relaxed mb-8">
              {selectedPost.content}
            </div>

            {/* Modal Bottom Bar with Previous/Next Controls */}
            <div className="pt-6 border-t border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-400/30"
                />
                <div>
                  <div className="font-bold text-white">{selectedPost.author.name}</div>
                  <div className="text-[10px] text-indigo-300">{selectedPost.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={handlePrevPost}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-xs text-white transition-all flex items-center gap-1 group"
                >
                  <ChevronLeft className="w-4 h-4 text-indigo-300 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={handleNextPost}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-xs text-white transition-all flex items-center gap-1 group"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all ml-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
