import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  Layout,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

interface PortfolioPageProps {
  onOpenBooking: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenBooking }) => {
  // Before and After interactive comparison slider state
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-16">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Proven System Proof</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          Our Portfolio &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
            Case Studies
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Visual mockups, sales funnel layouts, mobile responsive interfaces, and GoHighLevel CRM dashboards built for businesses that demand revenue growth.
        </p>
      </div>

      {/* Interactive Before & After Transformation Slider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <span className="text-xs font-bold uppercase text-amber-300 tracking-wider">
              Interactive System Overhaul
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Before & After Conversion Overhaul
            </h2>
            <p className="text-xs text-gray-400">
              Drag the slider below to see how we transform clunky static sites into high-converting sales engines.
            </p>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-indigo-500/30 select-none">
            {/* Before Image (Old Static Site) */}
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
              alt="Before - Static Site"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75"
            />
            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full text-xs font-bold text-rose-400 border border-rose-500/30">
              BEFORE: 1.2% Conv Rate
            </div>

            {/* After Image (Overlaid with clip-path) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
                alt="After - High Converting System"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#1817B6] px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-400/40">
                AFTER: 4.8% Conv Rate (+300% Lift)
              </div>
            </div>

            {/* Slider Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-2xl cursor-ew-resize z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                ↔
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>
      </div>

      {/* Main Full Portfolio Showcase Gallery */}
      <PortfolioShowcase onOpenBooking={onOpenBooking} isFullPage={true} />

    </div>
  );
};
