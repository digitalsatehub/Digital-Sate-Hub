import React, { useState, useEffect } from 'react';
import { STATS_COUNTERS } from '../data/siteData';
import { TrendingUp, Award, Layers, Users, Zap } from 'lucide-react';

export const PARTNER_LOGOS = [
  {
    name: 'Platform Logo 1',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840462/idZCBxuvGS_logos_isadia.png'
  },
  {
    name: 'Symbol',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840462/Symbol_eg2wio.png'
  },
  {
    name: 'Platform Logo 2',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/idjUiyP0m6_logos_fi3uwa.png'
  },
  {
    name: 'Kajabi Logo',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/Kajabi_Logo_1_glnwkf.png'
  },
  {
    name: 'Platform Logo 3',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/idnUrjuiFj_logos_voy01x.png'
  }
];

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

  // Repeat logos set 4 times for a seamless, continuous infinite loop
  const marqueeLogos = [
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS
  ];

  return (
    <section className="bg-white text-slate-900 border-y border-slate-200/80 py-12 sm:py-16 relative overflow-hidden shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1817B6]">
            Trusted Integrations & Digital Ecosystems
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Engineered For Industry-Leading Platforms & High-Growth Brands
          </h2>
        </div>

        {/* Continuous Flow Logo Marquee - Right to Left */}
        <div className="relative w-full overflow-hidden py-6 mb-12 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-inner">
          {/* Gradient Edge Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

          {/* Marquee Motion Track */}
          <div className="animate-marquee flex items-center gap-10 sm:gap-16">
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="h-16 sm:h-20 w-36 sm:w-48 px-4 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[170px] w-auto h-auto object-contain transition-all duration-300 filter hover:brightness-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Animated Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {STATS_COUNTERS.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={stat.label}
                className="bg-white border border-slate-200 hover:border-indigo-500/50 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#1817B6] group-hover:bg-[#1817B6] group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-1">
                  <span>{counts[idx]}</span>
                  <span className="text-[#1817B6]">{stat.suffix}</span>
                </div>

                <div className="text-xs font-bold text-slate-700 mb-0.5">
                  {stat.label}
                </div>

                <div className="text-[11px] font-medium text-slate-500">
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

