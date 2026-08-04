import React from 'react';
import { Star, Quote, CheckCircle2, Award, ArrowRight, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export interface TextReview {
  id: string;
  clientName: string;
  role: string;
  company: string;
  industry: string;
  metric: string;
  avatar: string;
  rating: number;
  serviceTag: string;
  reviewText: string;
}

export const TEXT_REVIEWS: TextReview[] = [
  {
    id: 'review-1',
    clientName: 'Marcus Vance',
    role: 'Managing Director',
    company: 'Apex Home Services',
    industry: 'Home Services (HVAC & Roofing)',
    metric: '+320% Qualified Monthly Inquiries',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceTag: 'GoHighLevel CRM & Speed-to-Lead SMS',
    reviewText: 'Before working with Digital Sate Hub, over 60% of our web leads were cooling off before our office team could call them back. They completely redesigned our funnel and built an automated instant SMS response system. Now every lead gets contacted in under 45 seconds. Our booked calls tripled in the first 30 days!'
  },
  {
    id: 'review-2',
    clientName: 'Sarah Jenkins, CFP',
    role: 'Founder & CEO',
    company: 'Legacy Financial Group',
    industry: 'Financial & Wealth Management',
    metric: '$1.4M Pipeline Generated in 90 Days',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceTag: 'Custom Webflow Site & HubSpot Pipeline',
    reviewText: 'Our old website looked nice but failed to generate real consultations. Digital Sate Hub rebuilt our site with clear conversion architecture and custom booking forms. They aligned our branding with our CRM deal pipeline perfectly. We closed 14 high-value retainer clients in under three months.'
  },
  {
    id: 'review-3',
    clientName: 'David Chen',
    role: 'E-Commerce Director',
    company: 'Lumina Health Supplements',
    industry: 'E-Commerce & DTC',
    metric: '4.2x Return on Ad Spend (ROAS)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceTag: 'Shopify Conversion Funnel & Klaviyo Automation',
    reviewText: 'The high-converting funnel pages Digital Sate Hub built for our product launches blew our expectations away. Order bump conversions jumped by 28% and our abandoned cart recovery sequences now generate passive revenue daily. Easily the best ROI agency partner we have ever hired.'
  },
  {
    id: 'review-4',
    clientName: 'Elena Rostova',
    role: 'Operations Manager',
    company: 'MedSpa Aesthetics & Wellness',
    industry: 'Beauty & Wellness',
    metric: '180+ Auto-Booked Deposit Appointments/mo',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceTag: 'GoHighLevel Calendar & SMS Reminders',
    reviewText: 'No-shows used to ruin our daily schedule. Digital Sate Hub set up an automated deposit booking calendar with custom SMS reminders. Our no-show rate dropped from 35% down to under 3%. Our staff saves over 15 hours every single week that used to be spent chasing clients.'
  },
  {
    id: 'review-5',
    clientName: 'Robert Sterling',
    role: 'Principal Broker',
    company: 'Sterling Commercial Realty',
    industry: 'Real Estate & Property',
    metric: '+240% Lead-to-Client Conversion Rate',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceTag: 'Webflow + ActiveCampaign Automation',
    reviewText: 'Digital Sate Hub does not just deliver pretty templates; they understand true conversion psychology. Their team mapped out our entire prospect lifecycle from ad click to signed contract. The automated email nurture sequences they created deliver warm, educated leads straight into our calendars.'
  }
];

interface VideoTestimonialsProps {
  onOpenBooking?: () => void;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#12063B] text-white relative border-y border-indigo-900/50 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Authentic Client Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Hear It From Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              We've Helped Grow
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Real business owners share how Digital Sate Hub automated their lead generation, overhauled their funnels, and multiplied their bottom-line revenue.
          </p>
        </div>

        {/* 2-Column Layout with Sticky Header Left & Stacking Review Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Summary Card & CTA (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              
              {/* Star Rating Badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                  ))}
                </div>
                <span className="text-xl font-extrabold text-white">5.0 / 5.0</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  50+ Verified Client Successes
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We measure success purely by business outcomes: increased lead conversion rates, hours saved through automation, and higher sales revenue.
                </p>
              </div>

              {/* Key Impact Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-3.5">
                  <div className="text-2xl font-black text-indigo-300">98%</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">Client Satisfaction</div>
                </div>
                <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-3.5">
                  <div className="text-2xl font-black text-emerald-400">3.2x</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">Average ROI Lift</div>
                </div>
              </div>

              {/* Verified Guarantee Note */}
              <div className="flex items-center gap-2 text-xs text-gray-300 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All reviews are from real, verified client engagements.</span>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  id="testimonials-cta-button"
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/30 border border-indigo-300/30 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
                >
                  <span>Start Your Success Story</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Sticky Stacking Review Cards Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 relative">
            {TEXT_REVIEWS.map((review, idx) => {
              // progressive sticky top offset so cards stack gracefully on top of each other
              const topOffset = 110 + idx * 22;

              return (
                <div
                  key={review.id}
                  style={{ top: `${topOffset}px` }}
                  className="sticky bg-[#190c4d] border border-indigo-500/30 hover:border-indigo-400/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl shadow-black/60 group backdrop-blur-xl"
                >
                  {/* Card Header: Avatar, Name, Company & Result Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-indigo-800/40">
                    
                    <div className="flex items-center gap-3.5">
                      <img
                        src={review.avatar}
                        alt={review.clientName}
                        referrerPolicy="no-referrer"
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-md shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {review.clientName}
                          </h4>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                            Verified Client
                          </span>
                        </div>
                        <p className="text-xs text-indigo-300 font-medium">
                          {review.role} • <span className="text-white font-semibold">{review.company}</span>
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span>{review.industry}</span>
                        </p>
                      </div>
                    </div>

                    {/* Result Metric Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs sm:text-sm font-extrabold shadow-sm shrink-0 self-start sm:self-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>{review.metric}</span>
                    </div>

                  </div>

                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-indigo-500/30 group-hover:text-indigo-400/50 transition-colors" />
                  </div>

                  {/* Review Text Body */}
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal mb-5 italic">
                    "{review.reviewText}"
                  </p>

                  {/* Bottom Tech/Service Tag */}
                  <div className="flex items-center justify-between pt-4 border-t border-indigo-800/30 text-xs">
                    <span className="text-indigo-300/80 font-mono text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span>System Built: {review.serviceTag}</span>
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
