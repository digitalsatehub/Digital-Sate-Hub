import React, { useState, useEffect } from 'react';
import { STATS_COUNTERS } from '../data/siteData';
import { TrendingUp, Award, Layers, Users, Zap } from 'lucide-react';

export const SocialProofCounters: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(STATS_COUNTERS.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts(
        STATS_COUNTERS.map((item) => Math.min(Math.floor(item.value * progress), item.value))
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const icons = [Award, Layers, Zap, Users, TrendingUp];

  return (
    <section className="bg-[#12063B] border-y border-indigo-900/50 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
            Measurable Proof
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Helping Businesses Grow Through Better Digital Experiences
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {STATS_COUNTERS.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={stat.label}
                className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#1817B6]/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5 text-indigo-300" />
                </div>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                  <span>{counts[idx]}</span>
                  <span className="text-indigo-400">{stat.suffix}</span>
                </div>

                <div className="text-xs font-bold text-gray-200 mb-0.5">
                  {stat.label}
                </div>

                <div className="text-[11px] font-medium text-indigo-300/80">
                  {stat.highlight}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
