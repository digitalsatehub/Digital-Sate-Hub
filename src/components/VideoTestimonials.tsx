import React from 'react';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface ReviewItem {
  id: string;
  platform: 'upwork' | 'fiverr';
  platformLabel: string;
  categoryTags: string; // e.g. "Groovekart • E-commerce • Website Design"
  quote: string;
  clientName: string;
  verifiedLabel: string;
  ratingValue: string; // e.g. "5.0"
  speedLabel: string; // e.g. "Fast"
  jobSuccessLabel: string; // e.g. "100%"
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    platform: 'upwork',
    platformLabel: 'Upwork Client',
    categoryTags: 'Groovekart • E-commerce • Website Design',
    quote: '"Adewuyi was a pleasure to work with. He built out our Groovekart site quickly and to spec. We will be back to use him again!"',
    clientName: 'Steven Sims',
    verifiedLabel: 'Verified Upwork Client',
    ratingValue: '5.0',
    speedLabel: 'Fast',
    jobSuccessLabel: '100%'
  },
  {
    id: 'rev-2',
    platform: 'fiverr',
    platformLabel: 'Fiverr Buyer',
    categoryTags: 'GoHighLevel • Sales Funnel • Automation',
    quote: '"Exceptional work! They transformed our lead response flow completely. The automated SMS triggers and funnel pages exceeded our expectations in speed and conversion."',
    clientName: 'Marcus Vance',
    verifiedLabel: 'Verified Fiverr Pro Client',
    ratingValue: '5.0',
    speedLabel: 'Very Fast',
    jobSuccessLabel: '100%'
  },
  {
    id: 'rev-3',
    platform: 'upwork',
    platformLabel: 'Upwork Client',
    categoryTags: 'Webflow • Custom UI/UX • HubSpot CRM',
    quote: '"Digital Sate Hub delivered a world-class Webflow rebuild for our wealth firm. Clear communication, fast turnarounds, and our qualified lead pipeline doubled in 60 days."',
    clientName: 'Sarah Jenkins',
    verifiedLabel: 'Verified Upwork Enterprise Client',
    ratingValue: '5.0',
    speedLabel: 'Fast',
    jobSuccessLabel: '100%'
  },
  {
    id: 'rev-4',
    platform: 'fiverr',
    platformLabel: 'Fiverr Buyer',
    categoryTags: 'Shopify • E-Commerce Funnel • Klaviyo',
    quote: '"Top tier seller! Built a high-converting Shopify landing page with custom upsells and email sequences. Revenue jumped noticeably within the first 2 weeks."',
    clientName: 'David Chen',
    verifiedLabel: 'Verified Fiverr Client',
    ratingValue: '5.0',
    speedLabel: 'Fast',
    jobSuccessLabel: '100%'
  },
  {
    id: 'rev-5',
    platform: 'upwork',
    platformLabel: 'Upwork Client',
    categoryTags: 'Real Estate • Lead Generation • Automation',
    quote: '"Outstanding experience! Highly skilled in conversion architecture and automation. Solved complex workflow issues and delivered ahead of schedule."',
    clientName: 'Robert Sterling',
    verifiedLabel: 'Verified Upwork Client',
    ratingValue: '5.0',
    speedLabel: 'Fast',
    jobSuccessLabel: '100%'
  }
];

// Upwork White Logo component matching uploaded image
const UpworkLogo: React.FC<{ className?: string }> = ({ className = 'h-5 sm:h-6' }) => (
  <div className={`inline-flex items-center text-white font-extrabold tracking-tighter text-xl sm:text-2xl font-sans ${className}`}>
    <span>upwork</span>
  </div>
);

// Fiverr White Logo + Green Dot component matching uploaded image
const FiverrLogo: React.FC<{ className?: string }> = ({ className = 'h-5 sm:h-6' }) => (
  <div className={`inline-flex items-center text-white font-bold tracking-tight text-xl sm:text-2xl font-sans ${className}`}>
    <span className="font-extrabold tracking-tighter">fiverr</span>
    <span className="w-2.5 h-2.5 rounded-full bg-[#1dbf73] inline-block ml-1 self-baseline mb-1" />
  </div>
);

interface VideoTestimonialsProps {
  onOpenBooking?: () => void;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#12063B] text-white relative border-y border-indigo-900/50 overflow-x-clip">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Client Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Hear It From Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              We've Helped Grow
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Authentic feedback and ratings from our valued clients on Upwork and Fiverr.
          </p>
        </div>

        {/* Single Column Stacking Reviews - Lapping directly on top as you scroll */}
        <div className="flex flex-col gap-20 sm:gap-28 relative pb-20">
          {REVIEWS_DATA.map((rev, idx) => {
            // Alternating color design based on image specification:
            // Odd index (0, 2, 4): Dark Blue background (#0B052B)
            // Even index (1, 3): Light Blue background (#1817B6)
            const isDarkBlue = idx % 2 === 0;

            const cardBgClass = isDarkBlue
              ? 'bg-[#0B052B] border-indigo-900/80 shadow-black/90'
              : 'bg-[#1817B6] border-indigo-400/50 shadow-indigo-950/90';

            const innerBoxBgClass = isDarkBlue
              ? 'bg-[#150b3d] border-indigo-900/50'
              : 'bg-[#14139c] border-indigo-400/30';

            // Progressive sticky top offset (e.g., 90px + idx * 24px)
            // This creates the clean deck-stacking effect where each card slides up over the previous one,
            // leaving a neat 24px top header band visible from the card underneath!
            const topOffset = 96 + idx * 24;

            return (
              <div
                key={rev.id}
                style={{ top: `${topOffset}px`, zIndex: 10 + idx }}
                className={`sticky rounded-[28px] border p-6 sm:p-9 shadow-2xl transition-all duration-300 group backdrop-blur-2xl ${cardBgClass}`}
              >
                {/* Top Bar: Platform Logo + Category Tags (Left) and 5 White Stars (Right) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-gray-300">
                    {rev.platform === 'upwork' ? (
                      <UpworkLogo />
                    ) : (
                      <FiverrLogo />
                    )}
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-gray-200 font-semibold tracking-wide">{rev.categoryTags}</span>
                  </div>

                  {/* 5 White Stars top right */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current text-white" />
                    ))}
                  </div>
                </div>

                {/* Inner Quote Box Container */}
                <div className={`rounded-2xl border p-5 sm:p-7 mb-5 ${innerBoxBgClass}`}>
                  {/* Large Quote */}
                  <p className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug mb-4">
                    {rev.quote}
                  </p>

                  {/* Client Name & Verified Tag */}
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <span className="font-bold text-white">{rev.clientName}</span>
                    <span className="text-gray-300 text-xs font-normal">• {rev.verifiedLabel}</span>
                  </div>
                </div>

                {/* Bottom Row Metrics: 5.0 Rating | Fast Speed | 100% Success */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 items-center">
                  
                  {/* Metric 1: Rating with GOLDEN STARS */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
                      {rev.ratingValue}
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Metric 2: Speed */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
                      {rev.speedLabel}
                    </div>
                    <div className="text-xs text-gray-300 font-medium mt-1">
                      Delivery speed
                    </div>
                  </div>

                  {/* Metric 3: Success */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
                      {rev.jobSuccessLabel}
                    </div>
                    <div className="text-xs text-gray-300 font-medium mt-1">
                      Job success
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Optional Call To Action at Bottom of Reviews */}
        <div className="mt-20 text-center">
          <button
            onClick={onOpenBooking}
            id="reviews-cta-button"
            className="px-8 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 border border-indigo-300/30 transition-all duration-300 inline-flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
          >
            <span>Ready to Build Your Project?</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
