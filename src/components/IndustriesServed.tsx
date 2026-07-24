import React, { useState } from 'react';
import { INDUSTRIES_SERVED } from '../data/siteData';
import {
  GraduationCap,
  Briefcase,
  HeartPulse,
  Home,
  Building,
  ShoppingBag,
  Shield,
  BookOpen,
  Sparkles,
  Users,
  Dumbbell,
  Utensils,
  ArrowRight
} from 'lucide-react';

interface IndustriesServedProps {
  onOpenBooking: () => void;
}

export const IndustriesServed: React.FC<IndustriesServedProps> = ({ onOpenBooking }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Home': return <Home className="w-5 h-5 text-amber-400" />;
      case 'Building': return <Building className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-purple-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-300" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-400" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-red-400" />;
      default: return <Utensils className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Proven Across Sectors</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Industries We Have{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Extensive Experience Serving
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            While buyer psychology remains constant, every industry requires nuanced messaging and custom funnel architecture. Here is where we excel.
          </p>
        </div>

        {/* 12 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {INDUSTRIES_SERVED.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <div
                key={ind.id}
                onClick={() => setSelectedIndustry(isSelected ? null : ind.id)}
                id={`industry-card-${ind.id}`}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1817B6] border-indigo-300 shadow-xl'
                    : 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-3">
                  {getIndustryIcon(ind.icon)}
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {ind.name}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  {ind.description}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-indigo-300">
                  <span>Focus: {ind.keyFocus}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Don't See Your Specific Niche Listed Above?
            </h3>
            <p className="text-xs text-gray-400">
              We specialize in custom conversion systems. If you have a business that needs leads, calls, or online sales, we can build it.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            <span>Discuss Your Specific Industry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
