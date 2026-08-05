import React from 'react';
import { SERVICES_LIST } from '../data/siteData';
import {
  Globe,
  Filter,
  Layout,
  Database,
  Zap,
  Mail,
  Bot,
  TrendingUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-indigo-400" />;
      case 'Filter': return <Filter className="w-5 h-5 text-blue-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Mail': return <Mail className="w-5 h-5 text-sky-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-rose-400" />;
      default: return <TrendingUp className="w-5 h-5 text-indigo-300" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#12063B] text-white relative overflow-hidden border-t border-indigo-900/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Layout: Left Header Description, Right Single Column Compact Listed Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Section Title, Badge, Description & Main CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Turnkey Growth Systems</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Our Services &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
                  Growth Systems
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                We bridge the gap between stunning visual design and backend conversion infrastructure. Here are the core services engineered to scale your revenue.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Partner With Digital Sate Hub</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Single Column Listed Services — Compact height, title up top, 99.9% progress bar directly below */}
          <div className="lg:col-span-7 space-y-3.5">
            {SERVICES_LIST.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/60 rounded-xl p-4 sm:p-4.5 transition-all duration-200 hover:-translate-y-0.5 group relative backdrop-blur-md shadow-md"
              >
                {/* Service Header: Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1817B6]/40 border border-indigo-400/30 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-inner">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Animated 99.9% Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-indigo-200">System Optimization Score</span>
                    <span className="text-emerald-400 font-extrabold">99.9%</span>
                  </div>
                  
                  {/* Outer Bar Track */}
                  <div className="w-full h-2 bg-indigo-950/90 rounded-full overflow-hidden border border-indigo-500/30 p-0.5">
                    {/* Inner Animated Progress Fill */}
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '99.9%' }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 rounded-full shadow-sm shadow-indigo-500/50"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
