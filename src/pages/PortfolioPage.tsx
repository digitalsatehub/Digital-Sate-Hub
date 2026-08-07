import React, { useRef, useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { getAdminPortfolio } from '../lib/adminStore';
import { InteractiveBoxGrid } from '../components/InteractiveBoxGrid';
import { PortraitVideoTestimonial } from '../components/PortraitVideoTestimonial';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { NavigationPage, PortfolioItem } from '../types';
import { motion } from 'motion/react';

interface PortfolioPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenBooking }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<PortfolioItem[]>(() => {
    return getAdminPortfolio();
  });

  useEffect(() => {
    const update = () => {
      setProjectsList(getAdminPortfolio());
    };
    window.addEventListener('dsh_portfolio_updated', update);
    return () => window.removeEventListener('dsh_portfolio_updated', update);
  }, []);

  const displayProjects = projectsList.slice(0, 12);

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-16">
      
      {/* Page Hero Header with Interactive Box Grid Animation & Ambient Glows */}
      <div ref={heroRef} className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 text-center">
        {/* Interactive Box Grid Canvas (Same mouse-reactive light effect as Home Hero) */}
        <InteractiveBoxGrid containerRef={heroRef} />

        {/* Animated Background Moving Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none animate-pulse z-0" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/25 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight"
          >
            Our Portfolio &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Case Studies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Visual mockups, sales funnel layouts, mobile responsive interfaces, and GoHighLevel CRM dashboards built for businesses that demand revenue growth.
          </motion.p>
        </div>
      </div>

      {/* 8 Portfolio Mockup Grid - Exactly 2 Columns on Medium/Large Screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              className="bg-[#0b0526] border border-indigo-500/30 hover:border-indigo-400/80 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-2xl group relative"
            >
              {/* Pure Mockup Image - Absolutely NO text overlay on columns */}
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
      </div>

      {/* Single Portrait Video Testimonial */}
      <PortraitVideoTestimonial onOpenBooking={onOpenBooking} />

      {/* Reviews Section - Continuous left-to-right scrolling marquee at the very end before footer */}
      <VideoTestimonials variant="marquee" onOpenBooking={onOpenBooking} />

    </div>
  );
};
