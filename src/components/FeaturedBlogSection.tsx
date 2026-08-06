import React, { useState, useEffect } from 'react';
import { getAdminBlogPosts } from '../lib/adminStore';
import { BlogPost, NavigationPage } from '../types';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturedBlogSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogs(getAdminBlogPosts());
  }, []);

  // Take exactly 3 blog articles
  const topBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#0b0526] text-white relative border-t border-indigo-900/50 overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Latest Industry Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Strategies & Tactics for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              High-Yield Growth
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Actionable blueprints on conversion architecture, GoHighLevel CRM workflows, and automated customer acquisition.
          </p>
        </motion.div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {topBlogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              onClick={() => onNavigate('blog')}
              className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
            >
              {/* Image & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1817B6] backdrop-blur-md border border-indigo-400/30 px-3 py-1 rounded-full text-[10px] font-bold text-white">
                  {post.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-indigo-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Info & Read Indicator */}
                <div className="pt-4 border-t border-indigo-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-[11px] text-gray-300 font-medium truncate max-w-[130px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTA Button to Blog Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all group"
          >
            <span>Visit Full Growth Blog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
