import React, { useState, useEffect, useRef } from 'react';
import { InteractiveBoxGrid } from './InteractiveBoxGrid';
import {
  Calendar,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQuote?: () => void;
  onNavigatePortfolio?: () => void;
  videoUrl?: string;
}

const DEFAULT_INTRO_VIDEO = "https://res.cloudinary.com/ug0d8nwi/video/upload/v1784894939/Introduction_Video_dvc4i5.mp4";

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  videoUrl
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const currentVideoUrl = videoUrl || DEFAULT_INTRO_VIDEO;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dynamic alternating phrase rotation in Capital Title Case
  const PHRASES = ["Talk Systems", "Scale Your Revenue"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setFade(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#12063B] via-[#140845] to-[#12063B] text-white pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
      {/* Interactive Box Shapes Background that lights up blue on mouse move */}
      <InteractiveBoxGrid containerRef={sectionRef} />

      {/* Background Decorative Lighting Grids */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#1817B6]/30 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs sm:text-sm font-semibold backdrop-blur-sm mb-6"
        >
          <span>Conversion-Focused • Mobile-Optimized • Built for Growth</span>
        </motion.div>

        {/* Capitalized Headline with Helvetica Font */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.12] text-white max-w-6xl mb-6 capitalize text-center"
        >
          <span className="block">Ready To Upgrade Your Entire Workflow?</span>
          <span className="block mt-1 sm:mt-2 whitespace-nowrap">
            Let’s{' '}
            <span
              className={`inline-block bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200 bg-clip-text text-transparent underline decoration-indigo-500/50 decoration-wavy transition-all duration-300 ${
                fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
              }`}
            >
              {PHRASES[phraseIndex]}
            </span>
            .
          </span>
        </motion.h1>

        {/* Subheadline with Helvetica Font */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl mb-8"
        >
          We engineer high-converting websites, automated sales funnels, and CRM engines designed explicitly for measurable revenue growth.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={onOpenBooking}
            id="hero-primary-cta"
            className="px-8 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 border border-indigo-300/30 transition-all duration-300 flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span>Book a Call</span>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Medium Sized Video Player with Tactile 3D Play Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-2xl relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/90 border border-indigo-500/30 bg-black group/video"
        >
          <video
            ref={videoRef}
            src={currentVideoUrl}
            loop
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-auto rounded-2xl object-cover aspect-video"
          />

          {/* Centered 3D Play / Pause Button Overlay */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer ${
              isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 bg-black/50'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-indigo-400 via-[#1817B6] to-[#0b0840] text-white flex items-center justify-center transition-all duration-300 transform active:translate-y-1 ${
                isPlaying ? 'scale-90' : 'scale-100 hover:scale-105'
              } border-t border-indigo-200/60 border-b-4 border-b-indigo-950 shadow-[0_12px_30px_rgba(24,23,182,0.8),0_8px_0_rgba(10,6,50,0.95),inset_0_3px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.6)] group-hover/video:shadow-[0_18px_40px_rgba(99,102,241,0.9),0_8px_0_rgba(10,6,50,0.95),inset_0_3px_6px_rgba(255,255,255,0.5)]`}
            >
              {/* Inner 3D ring accent */}
              <div className="absolute inset-1.5 rounded-full border border-indigo-300/30 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

              {isPlaying ? (
                <Pause className="w-9 h-9 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10" />
              ) : (
                <Play className="w-9 h-9 text-white fill-white ml-1.5 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] relative z-10" />
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


