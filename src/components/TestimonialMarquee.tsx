import React from 'react';
import { VIDEO_TESTIMONIALS } from '../data/siteData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialMarquee: React.FC = () => {
  // Combine all client testimonials into a rich set
  const marqueeItems = [
    ...VIDEO_TESTIMONIALS,
    {
      id: 'ext-1',
      clientName: 'Sarah Jenkins',
      company: 'Aura Spa & Wellness',
      role: 'Founder',
      serviceProvided: 'Webflow + GoHighLevel Booking',
      shortQuote: '"Digital Sate Hub overhauled our booking portal. Our online appointments skyrocketed by 210% in 30 days."',
      videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      duration: '1:45',
      keyResultStat: '+210% Appointment Lift',
      rating: 5
    },
    {
      id: 'ext-2',
      clientName: 'David Ross',
      company: 'Apex Growth Academy',
      role: 'CEO',
      serviceProvided: 'High-Ticket VSL Funnel',
      shortQuote: '"The automated SMS reminders and application funnel generated $140,000+ in high-ticket coaching revenue within 60 days."',
      videoThumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      duration: '2:10',
      keyResultStat: '$140k Revenue in 60 Days',
      rating: 5
    }
  ];

  // Duplicate the array for a seamless infinite loop track
  const duplicatedList = [...marqueeItems, ...marqueeItems];

  return (
    <div className="py-12 bg-[#0b0526] border-y border-indigo-900/40 relative overflow-hidden">
      {/* Side Fade Gradient Overlays for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b0526] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b0526] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
          Verified Client Praise • Hover to Pause
        </span>
      </div>

      {/* Infinite Horizontal Marquee Container (Scrolling Left to Right) */}
      <div className="overflow-hidden w-full">
        <div className="animate-marquee-ltr flex gap-6 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing py-2">
          {duplicatedList.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[340px] sm:w-[380px] shrink-0 bg-white/5 border border-indigo-500/20 hover:border-indigo-400/60 rounded-3xl p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header Rating & Result Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <span className="bg-[#1817B6]/80 border border-indigo-400/30 text-[10px] font-bold text-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {item.keyResultStat}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic mb-6">
                  {item.shortQuote}
                </p>
              </div>

              {/* Client Info Bar */}
              <div className="pt-4 border-t border-indigo-900/50 flex items-center gap-3">
                <img
                  src={item.videoThumbnail}
                  alt={item.clientName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-indigo-400/30"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{item.clientName}</h4>
                  <p className="text-[10px] text-indigo-300 truncate">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
