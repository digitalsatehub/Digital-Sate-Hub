import React, { useState, useRef } from 'react';
import { Play, Pause, Star, CheckCircle2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PortraitVideoTestimonialProps {
  onOpenBooking?: () => void;
}

export const PortraitVideoTestimonial: React.FC<PortraitVideoTestimonialProps> = ({ onOpenBooking }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(true);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

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

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Real results, real feedback. Watch how Digital Sate Hub engineered a complete conversion system that doubled lead pipeline volume.
          </p>
        </div>

        {/* Portrait Video Card Container */}
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border-2 border-indigo-400/40 bg-[#0b0526] shadow-2xl shadow-indigo-950/80 group"
          >
            {/* Portrait Video Frame (Aspect 9:16) */}
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-950">
              
              {/* HTML5 Video Element with Fallback Poster */}
              <video
                ref={videoRef}
                playsInline
                loop
                muted={isMuted}
                poster="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onEnded={() => setIsPlaying(false)}
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                Your browser does not support video playback.
              </video>

              {/* Gradient Dark Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0526] via-transparent to-black/40 pointer-events-none" />

              {/* Top Bar Overlay */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Review</span>
                </div>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-gray-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  onClick={togglePlay}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1817B6]/90 hover:bg-indigo-600 text-white flex items-center justify-center border-2 border-indigo-300 shadow-2xl transition-all duration-300 transform group-hover:scale-110 ${
                    isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current text-white" />
                  ) : (
                    <Play className="w-8 h-8 fill-current text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Client Detail Overlay */}
              <div className="absolute bottom-4 inset-x-4 z-20 space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                  <span className="text-xs font-black text-amber-300 ml-1">5.0 Star Feedback</span>
                </div>

                <blockquote className="text-xs sm:text-sm font-semibold text-white leading-snug drop-shadow-md">
                  "Digital Sate Hub completely rebuilt our sales funnels & GoHighLevel automations. Responsive, fast, and generated 2x qualified leads within 30 days!"
                </blockquote>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-extrabold text-white">Steven Sims</div>
                    <div className="text-[10px] text-gray-300">Upwork Enterprise Partner</div>
                  </div>

                  {onOpenBooking && (
                    <button
                      onClick={onOpenBooking}
                      className="px-3 py-1.5 rounded-lg bg-[#1817B6] hover:bg-indigo-600 text-[10px] font-bold text-white transition-all shadow-md"
                    >
                      Book Free Call
                    </button>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
