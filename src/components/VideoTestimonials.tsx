import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAdminReviews } from '../lib/adminStore';

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

// Upwork White Logo
const UpworkLogo: React.FC<{ className?: string }> = ({ className = 'h-5 sm:h-6' }) => (
  <div className={`inline-flex items-center text-white font-extrabold tracking-tighter text-xl sm:text-2xl font-sans ${className}`}>
    <span>upwork</span>
  </div>
);

// Fiverr White Logo + Green Dot
const FiverrLogo: React.FC<{ className?: string }> = ({ className = 'h-5 sm:h-6' }) => (
  <div className={`inline-flex items-center text-white font-bold tracking-tight text-xl sm:text-2xl font-sans ${className}`}>
    <span className="font-extrabold tracking-tighter">fiverr</span>
    <span className="w-2.5 h-2.5 rounded-full bg-[#1dbf73] inline-block ml-1 self-baseline mb-1" />
  </div>
);

interface VideoTestimonialsProps {
  onOpenBooking?: () => void;
  variant?: 'stack' | 'marquee';
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({
  onOpenBooking,
  variant = 'stack'
}) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(() => {
    const adminReviews = getAdminReviews();
    if (adminReviews && adminReviews.length > 0) {
      return adminReviews.map((r) => ({
        id: r.id,
        platform: 'upwork' as const,
        platformLabel: r.company || 'Verified Client',
        categoryTags: r.serviceProvided || 'Growth & Automation',
        quote: r.shortQuote || '',
        clientName: r.clientName,
        verifiedLabel: `Verified ${r.role || 'Client'}`,
        ratingValue: '5.0',
        speedLabel: 'Top Tier',
        jobSuccessLabel: '100%'
      }));
    }
    return REVIEWS_DATA;
  });

  useEffect(() => {
    const update = () => {
      const adminReviews = getAdminReviews();
      if (adminReviews && adminReviews.length > 0) {
        setReviewsList(
          adminReviews.map((r) => ({
            id: r.id,
            platform: 'upwork' as const,
            platformLabel: r.company || 'Verified Client',
            categoryTags: r.serviceProvided || 'Growth & Automation',
            quote: r.shortQuote || '',
            clientName: r.clientName,
            verifiedLabel: `Verified ${r.role || 'Client'}`,
            ratingValue: '5.0',
            speedLabel: 'Top Tier',
            jobSuccessLabel: '100%'
          }))
        );
      }
    };
    window.addEventListener('dsh_reviews_updated', update);
    return () => window.removeEventListener('dsh_reviews_updated', update);
  }, []);

  // If variant is marquee, render continuous left-to-right scrolling reviews track
  if (variant === 'marquee') {
    const duplicatedReviews = [...reviewsList, ...reviewsList, ...reviewsList];

    return (
      <section className="py-20 lg:py-24 bg-[#12063B] text-white relative border-y border-indigo-900/50 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Client Reviews • Hover to Pause</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Client Success &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Verified Feedback
            </span>
          </h2>
        </div>

        {/* Side Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#12063B] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#12063B] to-transparent z-20 pointer-events-none" />

        {/* Continuous Left-To-Right Scrolling Marquee Track (Pauses on Hover) */}
        <div className="overflow-hidden w-full relative z-10 py-4">
          <div className="animate-marquee-ltr flex gap-6 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {duplicatedReviews.map((rev, idx) => {
              const isDarkBlue = idx % 2 === 0;
              const cardBgClass = isDarkBlue
                ? 'bg-[#0B052B] border-indigo-900/80 shadow-black/80'
                : 'bg-[#1817B6] border-indigo-400/50 shadow-indigo-950/80';

              return (
                <div
                  key={`${rev.id}-${idx}`}
                  className={`w-[360px] sm:w-[420px] shrink-0 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${cardBgClass}`}
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        {rev.platform === 'upwork' ? <UpworkLogo className="h-4 sm:h-5" /> : <FiverrLogo className="h-4 sm:h-5" />}
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="text-[11px] font-semibold text-indigo-200 mb-3">
                      {rev.categoryTags}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed italic mb-5">
                      {rev.quote}
                    </p>
                  </div>

                  {/* Client Info & Rating */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white">{rev.clientName}</div>
                      <div className="text-[10px] text-gray-300">{rev.verifiedLabel}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-amber-300 italic">{rev.ratingValue} Rating</div>
                      <div className="text-[10px] text-emerald-300 font-medium">{rev.jobSuccessLabel} Job Success</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        {onOpenBooking && (
          <div className="mt-12 text-center relative z-10">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-300/30 transition-all inline-flex items-center gap-2 group"
            >
              <span>Ready to Build Your Project?</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </section>
    );
  }

  // Default 'stack' variant (for Home Page)
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

        {/* Single Column Stacking Reviews */}
        <div className="flex flex-col gap-20 sm:gap-28 relative pb-20">
          {reviewsList.map((rev, idx) => {
            const isDarkBlue = idx % 2 === 0;

            const cardBgClass = isDarkBlue
              ? 'bg-[#0B052B] border-indigo-900/80 shadow-black/90'
              : 'bg-[#1817B6] border-indigo-400/50 shadow-indigo-950/90';

            const innerBoxBgClass = isDarkBlue
              ? 'bg-[#150b3d] border-indigo-900/50'
              : 'bg-[#14139c] border-indigo-400/30';

            const topOffset = 96 + idx * 24;

            return (
              <div
                key={rev.id}
                style={{ top: `${topOffset}px`, zIndex: 10 + idx }}
                className={`sticky rounded-[28px] border p-6 sm:p-9 shadow-2xl transition-all duration-300 group backdrop-blur-2xl ${cardBgClass}`}
              >
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-gray-300">
                    {rev.platform === 'upwork' ? <UpworkLogo /> : <FiverrLogo />}
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-gray-200 font-semibold tracking-wide">{rev.categoryTags}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current text-white" />
                    ))}
                  </div>
                </div>

                {/* Inner Quote Box */}
                <div className={`rounded-2xl border p-5 sm:p-7 mb-5 ${innerBoxBgClass}`}>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug mb-4">
                    {rev.quote}
                  </p>

                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <span className="font-bold text-white">{rev.clientName}</span>
                    <span className="text-gray-300 text-xs font-normal">• {rev.verifiedLabel}</span>
                  </div>
                </div>

                {/* Bottom Row Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 items-center">
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

                  <div>
                    <div className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
                      {rev.speedLabel}
                    </div>
                    <div className="text-xs text-gray-300 font-medium mt-1">
                      Delivery speed
                    </div>
                  </div>

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

        {/* Call To Action */}
        {onOpenBooking && (
          <div className="mt-20 text-center">
            <button
              onClick={onOpenBooking}
              id="reviews-cta-button"
              className="px-8 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-300/30 transition-all inline-flex items-center justify-center gap-3 group"
            >
              <span>Ready to Build Your Project?</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
