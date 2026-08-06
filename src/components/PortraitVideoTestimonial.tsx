import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PortraitVideoTestimonialProps {
  onOpenBooking?: () => void;
}

export const PortraitVideoTestimonial: React.FC<PortraitVideoTestimonialProps> = () => {
  return (
    <section className="py-20 bg-[#12063B] text-white relative border-t border-indigo-900/40 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-indigo-600/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Featured Client Video Story</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            See What Our Clients Say About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Working With Us
            </span>
          </h2>
        </div>

        {/* Clean Portrait Video Player Frame (No text overlays or names on video) */}
        <div className="max-w-sm sm:max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border-2 border-indigo-400/40 bg-[#0b0526] shadow-2xl shadow-indigo-950/90"
          >
            {/* Portrait Aspect Ratio Frame (9:16) */}
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/P0F8vfHR4dI?rel=0&modestbranding=1"
                title="Client Testimonial Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
