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
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'Filter': return <Filter className="w-6 h-6 text-blue-400" />;
      case 'Layout': return <Layout className="w-6 h-6 text-purple-400" />;
      case 'Database': return <Database className="w-6 h-6 text-emerald-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Mail': return <Mail className="w-6 h-6 text-sky-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-rose-400" />;
      default: return <TrendingUp className="w-6 h-6 text-indigo-300" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#12063B] text-white relative overflow-hidden border-t border-indigo-900/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Layout: Left Header, Right Vertical Listed Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Section Title, Badge, Description & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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

              <p className="text-base text-gray-300 leading-relaxed">
                We bridge the gap between stunning visual design and backend conversion infrastructure. Here are the core services engineered to scale your revenue.
              </p>
            </motion.div>

            {/* Left Column Metric Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 rounded-2xl bg-white/5 border border-indigo-500/20 backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">90% ROI Benchmark</div>
                  <div className="text-xs text-indigo-200">Proven Conversion & Automation Track Record</div>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Every service pipeline is optimized for high user retention, instant lead capture, and maximum sales throughput.
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Partner With Digital Sate Hub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Clean Services List — Service Icon & Title on top, Progress bar directly below (no extra text/buttons) */}
          <div className="lg:col-span-7 space-y-5">
            {SERVICES_LIST.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 group relative backdrop-blur-md shadow-xl"
              >
                {/* Service Header: Icon + Title (Up top) */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1817B6]/40 border border-indigo-400/30 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-inner">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Animated 90% Progress Bar (Directly below) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-indigo-200">Optimization & Conversion Score</span>
                    <span className="text-emerald-400 font-bold">90%</span>
                  </div>
                  
                  {/* Outer Bar Track */}
                  <div className="w-full h-2.5 bg-indigo-950/80 rounded-full overflow-hidden border border-indigo-500/30 p-0.5">
                    {/* Inner Animated Progress Fill */}
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '90%' }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 rounded-full shadow-lg shadow-indigo-500/50"
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
