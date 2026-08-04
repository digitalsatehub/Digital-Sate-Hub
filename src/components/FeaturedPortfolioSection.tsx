import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { ExternalLink, Calendar, ArrowRight, Layers } from 'lucide-react';
import { NavigationPage } from '../types';

interface FeaturedPortfolioSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
}

export const FeaturedPortfolioSection: React.FC<FeaturedPortfolioSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  // Select top 3 featured portfolio projects
  const topProjects = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#12063B] text-white relative border-t border-indigo-900/50 overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Proven Systems That Deliver{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Measurable ROI
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Explore a selection of high-converting websites, sales funnels, and automated CRM workflows engineered for our clients.
          </p>
        </div>

        {/* 3 Portfolio Displays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {topProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0b0526] border border-indigo-500/30 hover:border-indigo-400/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col group"
            >
              {/* Project Image Display */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0526] via-transparent to-black/30" />
                
                {/* Industry Pill Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-200">
                  {project.industry}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {project.solution}
                  </p>
                </div>

                {/* Key Result Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-indigo-900/50 bg-indigo-950/30 rounded-xl px-3 text-center">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-sm sm:text-base font-extrabold text-emerald-400">{stat.value}</div>
                      <div className="text-[10px] text-gray-400 font-medium truncate">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Platform Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.platforms.map((p) => (
                    <span key={p} className="text-[11px] font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-md">
                      {p}
                    </span>
                  ))}
                </div>

                {/* 2 Buttons Row */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="py-3 px-3 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>View More</span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-300 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="py-3 px-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>Contact Now</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA Banner */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 hover:text-white transition-all"
          >
            <span>Explore All Case Studies & Client Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
