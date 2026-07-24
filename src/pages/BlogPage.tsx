import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/siteData';
import { BlogPost } from '../types';
import {
  Search,
  Clock,
  User,
  Tag,
  ArrowRight,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const BlogPage: React.FC = () => {
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

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Conversion & Automation Insights</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          Digital Sate Hub{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
            Growth Blog
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Actionable guides on sales funnel copywriting, GoHighLevel pipeline setups, AI lead agents, and conversion rate optimization.
        </p>
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
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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

            <div className="pt-4 border-t border-indigo-900/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-white">{selectedPost.author.name}</div>
                  <div className="text-[10px] text-indigo-300">{selectedPost.author.role}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
