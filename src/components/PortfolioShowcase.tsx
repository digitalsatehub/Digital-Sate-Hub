import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { PortfolioItem } from '../types';
import { motion } from 'motion/react';

interface PortfolioShowcaseProps {
  onOpenBooking: () => void;
  isFullPage?: boolean;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onOpenBooking,
  isFullPage = false
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
    <section className="py-20 bg-[#12063B] text-white relative border-t border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                id={`filter-btn-${tab.value}`}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? 'bg-[#1817B6] text-white border-indigo-400/50 shadow-lg shadow-indigo-600/30'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid - Pure Mockup Images, NO text on columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#0b0526] border border-indigo-500/30 hover:border-indigo-400/80 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-2xl group relative"
            >
              {/* Pure Mockup Image Container - Absolutely NO text on columns */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/30 border border-indigo-400/30 transition-all"
          >
            Request Custom Mockup For Your Business
          </button>
        </div>

      </div>
    </section>
  );
};
