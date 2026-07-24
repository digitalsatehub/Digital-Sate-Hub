import React from 'react';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { Sparkles, Star, Quote, CheckCircle2, Award } from 'lucide-react';

interface TestimonialsPageProps {
  onOpenBooking: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenBooking }) => {
  const textReviews = [
    {
      name: 'Michael Thompson',
      role: 'Founder',
      company: 'Apex Revenue Systems',
      text: 'Digital Sate Hub redesigned our entire GoHighLevel client acquisition funnel. Our cost per acquired client plummeted by 40% in month one!',
      rating: 5,
      date: 'July 2026'
    },
    {
      name: 'Rebecca Sterling',
      role: 'CMO',
      company: 'Lumina Aesthetics',
      text: 'The automated SMS booking sequence they implemented transformed our front desk operations. Patients love the instant confirmation texts.',
      rating: 5,
      date: 'June 2026'
    },
    {
      name: 'Carlos Mendez',
      role: 'Broker Owner',
      company: 'Vanguard Realty Group',
      text: 'Their speed-to-lead video automation system is unbelievable. When a prospect fills a form, they get a custom video message within 45 seconds.',
      rating: 5,
      date: 'May 2026'
    }
  ];

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Verified Client Outcomes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          Client Success Stories &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
            Video Reviews
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Hear directly from founders, directors, and business owners who scaled their operations with Digital Sate Hub.
        </p>
      </div>

      {/* Main Video Suite */}
      <VideoTestimonials />

      {/* Text Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl font-black text-white">More Verified Client Feedback</h2>
          <p className="text-xs text-gray-400">Consistently rated 5.0 stars across conversion rate optimization and CRM automation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {textReviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white/5 border border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-gray-200 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-indigo-800/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{rev.name}</div>
                  <div className="text-indigo-300 text-[11px]">{rev.role}, {rev.company}</div>
                </div>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
