import React, { useState } from 'react';
import { VIDEO_TESTIMONIALS } from '../data/siteData';
import { VideoTestimonial } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Quote,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';

export const VideoTestimonials: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-20 bg-[#12063B] text-white relative border-y border-indigo-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
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
            Video builds trust faster than written reviews. Watch real business owners share how Digital Sate Hub automated their lead generation and multiplied their revenue.
          </p>
        </div>

        {/* Video Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEO_TESTIMONIALS.map((vt) => {
            const isPlaying = activeVideoId === vt.id;
            return (
              <div
                key={vt.id}
                className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group backdrop-blur-md shadow-xl"
              >
                {/* Video Player Box */}
                <div className="relative aspect-[9/16] bg-black/60 overflow-hidden group/player">
                  <img
                    src={vt.videoThumbnail}
                    alt={vt.clientName}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isPlaying ? 'scale-105 filter brightness-110' : 'group-hover/player:scale-105'
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                  {/* Top Result Stat Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#1817B6]/90 backdrop-blur-md border border-indigo-400/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>{vt.keyResultStat}</span>
                    </span>

                    {isPlaying && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  {/* Play/Pause Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setActiveVideoId(isPlaying ? null : vt.id)}
                      id={`play-video-${vt.id}`}
                      className={`w-14 h-14 rounded-full bg-[#1817B6]/90 hover:bg-indigo-600 text-white flex items-center justify-center transition-all shadow-2xl border border-white/20 transform ${
                        isPlaying ? 'scale-90 opacity-90' : 'scale-100 opacity-100 group-hover/player:scale-110'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Video Duration / Live Playing Subtitle */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
                    {isPlaying ? (
                      <div className="bg-emerald-950/80 backdrop-blur-md p-2 rounded-xl border border-emerald-500/40 text-[11px] font-semibold text-emerald-200 flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Playing Video Testimonial...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
                        <span>Duration: {vt.duration}</span>
                        <span className="flex items-center gap-1 text-amber-300">
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          5.0 Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Below Video */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(vt.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-indigo-100 font-medium italic leading-relaxed mb-4">
                      {vt.shortQuote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-indigo-800/40">
                    <h3 className="text-sm font-bold text-white">
                      {vt.clientName}
                    </h3>
                    <p className="text-[11px] font-semibold text-indigo-300">
                      {vt.role}, {vt.company}
                    </p>
                    <p className="text-[10px] text-gray-300 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{vt.serviceProvided}</span>
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
