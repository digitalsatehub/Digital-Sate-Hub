import React from 'react';
import { Calendar, Calculator, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenBooking,
  onOpenQuote
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#12063B] via-[#1817B6] to-[#12063B] text-white relative overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Transform Your Digital Presence</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          Ready to Turn More Visitors Into Customers?
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-indigo-100 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
          Whether you need a high-converting website, a complete sales funnel, or an automated marketing system, we'll help you build a digital experience that supports your business goals and drives measurable results.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-12">
          <button
            onClick={onOpenBooking}
            id="final-cta-booking-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm text-[#12063B] bg-white hover:bg-indigo-50 shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 text-[#1817B6]" />
            <span>Book a Free Strategy Call</span>
            <ArrowRight className="w-4 h-4 text-[#1817B6] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenQuote}
            id="final-cta-quote-btn"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-indigo-200" />
            <span>Get a Custom Quote</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200 font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Long-Term Contracts</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>30-Day Post Launch Support</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Turnkey Systems Delivered On Time</span>
          </div>
        </div>

      </div>
    </section>
  );
};
