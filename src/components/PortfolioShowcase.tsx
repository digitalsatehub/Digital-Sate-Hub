import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { PortfolioItem, NavigationPage } from '../types';
import {
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  TrendingUp,
  Globe,
  Filter,
  Smartphone,
  LayoutDashboard
} from 'lucide-react';

interface PortfolioShowcaseProps {
  onNavigate?: (page: NavigationPage) => void;
  onOpenBooking: () => void;
  isFullPage?: boolean;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onNavigate,
  onOpenBooking,
  isFullPage = false
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.previewType === activeFilter;
  });

  const filterTabs = [
    { label: 'All Projects', value: 'all' },
    { label: 'Funnels', value: 'funnel' },
    { label: 'Websites', value: 'website' },
    { label: 'Dashboards', value: 'dashboard' },
    { label: 'Mobile UX', value: 'mobile' }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Real Business Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Featured Work &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
                Conversion Case Studies
              </span>
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Explore how we've helped companies transform static websites into high-converting sales funnels and automated GoHighLevel systems.
            </p>
          </div>

          {!isFullPage && onNavigate && (
            <button
              onClick={() => onNavigate('portfolio')}
              className="shrink-0 px-6 py-3 rounded-xl bg-white/5 border border-indigo-500/30 hover:border-indigo-400 text-xs font-bold text-indigo-200 hover:text-white transition-all flex items-center gap-2"
              id="view-full-portfolio-btn"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-800">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                id={`filter-btn-${tab.value}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1817B6] text-white shadow-md'
                    : 'bg-slate-800/80 text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  {project.industry}
                </div>

                <div className="absolute bottom-3 right-3 bg-[#1817B6]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-indigo-400/30">
                  {project.previewType.toUpperCase()}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>

                  <div className="space-y-2 text-xs text-gray-300 mb-6">
                    <div>
                      <span className="font-bold text-rose-400 block mb-0.5">The Challenge:</span>
                      <p className="line-clamp-2 text-gray-400">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="font-bold text-indigo-300 block mb-0.5">The Solution:</span>
                      <p className="line-clamp-2 text-gray-300">{project.solution}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Key Stats Pill */}
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 mb-4 text-center">
                    {project.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-xs font-black text-emerald-400">{s.value}</div>
                        <div className="text-[9px] font-medium text-gray-400 truncate">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    id={`view-case-study-${project.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#1817B6] border border-white/10 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
              id="close-portfolio-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">
              <span>{selectedProject.industry}</span>
              <span>•</span>
              <span className="text-emerald-400">{selectedProject.clientName}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              {selectedProject.title}
            </h3>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-indigo-500/20">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {selectedProject.stats.map((s) => (
                <div key={s.label} className="bg-white/5 p-4 rounded-2xl border border-indigo-500/20 text-center">
                  <div className="text-2xl font-black text-emerald-400">{s.value}</div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-gray-300 mb-8">
              <div>
                <h4 className="font-extrabold text-rose-400 text-xs uppercase tracking-wider mb-1">
                  1. The Business Challenge
                </h4>
                <p className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  {selectedProject.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-indigo-300 text-xs uppercase tracking-wider mb-1">
                  2. The Digital System Solution
                </h4>
                <p className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-emerald-400 text-xs uppercase tracking-wider mb-1">
                  3. Measurable Outcome
                </h4>
                <p className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 text-emerald-200 font-semibold">
                  {selectedProject.outcome}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                Ecosystem & Tech Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-900/60 border border-indigo-500/30 text-indigo-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedProject(null);
                onOpenBooking();
              }}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Build a System Like This For Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
