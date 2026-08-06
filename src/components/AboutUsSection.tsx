import React, { useState, useEffect, useRef } from 'react';
import { Layers, Users, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const STATS = [
  { value: 50, suffix: '+', label: 'Projects Completed', highlight: 'Turnkey Digital Assets', icon: Layers },
  { value: 20, suffix: '+', label: 'Satisfied Clients', highlight: 'Long-Term Retention', icon: Users },
  { value: 4, suffix: '+', label: 'Years of Experience', highlight: 'Proven Industry Expertise', icon: Award }
];

interface AboutUsSectionProps {
  onOpenBooking?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenBooking }) => {
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCountUp();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startCountUp = () => {
    const duration = 1800; // 1.8s count up
    const steps = 40;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Smooth ease-out deceleration curve
      const easeProgress = 1 - Math.pow(1 - progress, 2);

      setCounts(
        STATS.map((item) =>
          Math.min(Math.round(item.value * easeProgress), item.value)
        )
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);
  };

  return (
    <section ref={sectionRef} id="about-us-section" className="py-10 lg:py-14 bg-[#12063B] text-white relative overflow-hidden border-t border-indigo-900/40">
      {/* Background Subtle Glowing Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image (Optimized & Anchored to Top) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1817B6] to-indigo-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500 pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-950/90 bg-slate-900/60 w-full">
              <img
                src="https://res.cloudinary.com/ug0d8nwi/image/upload/f_auto,q_auto,w_1200/v1785842181/IMG_4086_yis0ue.jpg"
                alt="About Us - Digital Sate Hub"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top min-h-[380px] max-h-[540px] transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12063B]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: About Us Text Content + Stat Counters */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            
            {/* Tag / Badge */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span>About Us</span>
              </div>
            </div>

            {/* Subheadline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Smart Digital Experiences That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
                Drive Growth
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              We create high-performing websites, funnels, and digital solutions designed to solve real business challenges, increase conversions, and help your brand stand out.
            </p>

            {/* Stat Counters Under Text */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                    className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 mb-3 rounded-xl bg-[#1817B6]/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
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
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button under project counts */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                id="about-us-cta"
                className="px-8 py-3.5 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 border border-indigo-300/30 transition-all duration-300 inline-flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
              >
                <span>Let's Work</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
