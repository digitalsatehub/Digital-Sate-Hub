import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { ArrowRight, Layers } from 'lucide-react';
import { NavigationPage } from '../types';
import { motion } from 'motion/react';

interface FeaturedPortfolioSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking?: () => void;
}

export const FeaturedPortfolioSection: React.FC<FeaturedPortfolioSectionProps> = ({
  onNavigate
}) => {
  // Select top 3 featured portfolio projects
  const topProjects = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#12063B] text-white relative border-t border-indigo-900/50 overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            A Selection of Our Best Projects{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Built to Impress
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            High-converting web platforms, sales funnels, and automated CRM architectures engineered for measurable growth.
          </p>
        </motion.div>

        {/* 3 Portfolio Images Showcase Grid (Pure Images - No Buttons inside the columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-[#0b0526] border border-indigo-500/30 hover:border-indigo-400/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col group relative"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0526] via-transparent to-black/30" />
                
                {/* Title and Industry Badges over image */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1 z-10">
                  <span className="inline-block bg-[#1817B6]/80 backdrop-blur-md border border-indigo-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                    {project.industry}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single "View More" Button After the Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all inline-flex items-center gap-3 group"
          >
            <span>View More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
