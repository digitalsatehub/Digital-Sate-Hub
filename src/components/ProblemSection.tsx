import React from 'react';
import { PAIN_POINTS } from '../data/siteData';
import {
  AlertTriangle,
  TrendingDown,
  UserX,
  Clock,
  Unplug,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown':
        return <TrendingDown className="w-6 h-6 text-rose-400" />;
      case 'UserX':
        return <UserX className="w-6 h-6 text-amber-400" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-orange-400" />;
      case 'Unplug':
        return <Unplug className="w-6 h-6 text-purple-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>The Reality Most Businesses Face</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Your Website Should Generate Business—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              Not Just Exist
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Most company websites act like expensive online business cards. They look decent, but fail to capture lead intent, route inquiries, or generate predictable pipeline revenue.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((pain) => (
            <div
              key={pain.id}
              className="bg-slate-800/80 border border-slate-700/80 hover:border-rose-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {getIcon(pain.icon)}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                {pain.title}
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {pain.desc}
              </p>

              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{pain.stat}</span>
              </div>
            </div>
          ))}

          {/* Callout Card summarizing the solution preview */}
          <div className="bg-gradient-to-br from-[#1817B6]/40 via-indigo-900/60 to-[#12063B] border border-indigo-400/40 rounded-2xl p-6 flex flex-col justify-between text-left">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-3 inline-block">
                The Diagnosis
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2">
                A Static Site Costs You Thousands Every Single Month
              </h3>
              <p className="text-xs text-indigo-200 leading-relaxed">
                When traffic bounces and follow-ups are delayed, hot buyers move straight to your competitors.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1817B6] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <span>Audit Your Current Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transition Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1817B6] via-indigo-800 to-[#12063B] border border-indigo-400/30 rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-widest justify-center sm:justify-start">
              <Sparkles className="w-4 h-4" />
              <span>The Shift to Automated Systems</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              "Your business deserves a digital system designed to convert visitors into customers."
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100">
              Transition from manual guesswork to an automated revenue engine built specifically for your sales goals.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#12063B] bg-white hover:bg-indigo-50 shadow-lg transition-all flex items-center gap-2 group"
          >
            <span>See How We Fix This</span>
            <ArrowRight className="w-4 h-4 text-[#12063B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
