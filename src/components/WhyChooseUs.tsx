import React from 'react';
import { DIFFERENTIATORS } from '../data/siteData';
import {
  Target,
  Smartphone,
  Cpu,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-6 h-6 text-indigo-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section className="py-20 bg-[#12063B] text-white relative overflow-hidden border-t border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Why Digital Sate Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Built for Businesses That Want More Than Just a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Beautiful Website
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            We bridge the gap between stunning visual aesthetics and backend conversion infrastructure. Here is why high-growth companies trust Digital Sate Hub.
          </p>
        </div>

        {/* 6 Core Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group relative backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1817B6]/30 border border-indigo-400/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-indigo-800/40 flex items-center gap-2 text-xs font-bold text-indigo-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Standard In All Our Builds</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/30 border border-indigo-400/30 transition-all inline-flex items-center gap-3 group"
          >
            <span>Partner With Digital Sate Hub Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
