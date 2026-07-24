import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

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
  const currentVideoUrl = videoUrl || DEFAULT_INTRO_VIDEO;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#12063B] via-[#140845] to-[#12063B] text-white pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
      {/* Background Decorative Lighting Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f135415_1px,transparent_1px),linear-gradient(to_bottom,#1f135415_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#1817B6]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs sm:text-sm font-semibold backdrop-blur-sm mb-6">
          <span>Conversion-First Digital Architecture</span>
        </div>

        {/* Capitalized Headline with Helvetica Font */}
        <h1
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white max-w-5xl mb-6 capitalize"
        >
          Ready To Upgrade Your Entire Workflow?{' '}
          <span className="inline-block whitespace-nowrap">
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
        </h1>

        {/* Subheadline with Helvetica Font */}
        <p
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl mb-8"
        >
          We engineer high-converting websites, automated sales funnels, and CRM engines designed explicitly for measurable revenue growth.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={onOpenBooking}
            id="hero-primary-cta"
            className="px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 border border-indigo-300/30 transition-all duration-300 flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span>Book a Call</span>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Small Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mb-12">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Conversion-Focused</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mobile-Optimized</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Built for Growth</span>
          </div>
        </div>

        {/* Video Player with Centered Play Button Overlay */}
        <div className="w-full max-w-4xl relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/80 border border-indigo-500/20 bg-black group/video">
          <video
            ref={videoRef}
            src={currentVideoUrl}
            autoPlay
            muted
            loop
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-auto rounded-2xl object-cover aspect-video"
          />

          {/* Centered Play / Pause Button Overlay */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer ${
              isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 bg-black/40'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1817B6]/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/60 border border-indigo-300/40 transition-all duration-300 transform hover:scale-110 ${
                isPlaying ? 'scale-90' : 'scale-100 animate-pulse'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white ml-1.5" />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


