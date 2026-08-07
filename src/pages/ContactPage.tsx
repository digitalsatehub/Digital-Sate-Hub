import React, { useState, useRef } from 'react';
import { InteractiveBoxGrid } from '../components/InteractiveBoxGrid';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { addFormSubmission } from '../lib/adminStore';
import {
  Mail,
  Calendar,
  Calculator,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Globe2
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onOpenQuote }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteUrl: '',
    serviceRequested: 'Full Digital Growth System',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      addFormSubmission({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        websiteUrl: formData.websiteUrl,
        serviceRequested: formData.serviceRequested,
        message: formData.message
      });

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-16">
      
      {/* Page Hero Header with Interactive Box Grid Animation & Ambient Glows */}
      <div ref={heroRef} className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 text-center">
        {/* Interactive Box Grid Canvas */}
        <InteractiveBoxGrid containerRef={heroRef} />

        {/* Animated Background Moving Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none animate-pulse z-0" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/25 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Get In Touch & Start Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Growth Journey
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Ready to turn more visitors into paying customers? Send us a message, request a custom quote, or book a free 1-on-1 strategy session.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Side Clean Descriptive Text & Fast Action Buttons, Right Side Inquiry Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Pure Descriptive Text & Collaboration Details (Replaces old Direct Contact Channels block) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Let's Build Together</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              We’re Here to Build Your High-Converting System
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              Whether you need a full turnkey digital growth architecture, a bespoke sales funnel, a GoHighLevel CRM setup, or automated lead workflows, Digital Sate Hub is ready to partner with you.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              We work directly with founders, agency owners, and business leaders worldwide across the USA, UK, Canada, and Australia to turn complex automation into high-performing revenue channels.
            </p>
          </div>

          {/* Quick Highlight Cards in Prose Style */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-indigo-500/20 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-[#1817B6] text-white shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Rapid Response Time</h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  Our senior strategy leads analyze incoming inquiries and reply with detailed project insights within 2 hours guarantee.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-indigo-500/20 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-[#1817B6] text-white shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Direct Email Access</h3>
                <p className="text-xs text-indigo-300 font-extrabold mt-0.5">
                  digitalsatehub@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-indigo-500/20 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-[#1817B6] text-white shrink-0 mt-0.5">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Global Remote Studio</h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  Full asynchronous & live video consultations available across all major global timezones.
                </p>
              </div>
            </div>
          </div>

          {/* Instant Action CTA Buttons */}
          <div className="pt-2 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
              Prefer Fast Instant Booking?
            </h3>

            <div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto p-3.5 px-6 rounded-xl bg-[#1817B6] hover:bg-indigo-600 font-bold text-xs text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 Call</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Detailed Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-1">
                Send Us a Direct Message
              </h2>
              <p className="text-xs text-gray-300">
                Fill out the form below and our strategy team will analyze your request and reply with next steps within 2 hours.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Company / Website URL
                    </label>
                    <input
                      type="text"
                      placeholder="www.yourcompany.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    System / Service Required
                  </label>
                  <select
                    value={formData.serviceRequested}
                    onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                    className="w-full bg-[#1A0C4E] border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="Full Digital Growth System">Full Turnkey Digital Growth System</option>
                    <option value="Website Redesign">Website Design & Redesign</option>
                    <option value="Sales Funnels">Sales Funnels & Checkout Sequences</option>
                    <option value="GoHighLevel CRM">GoHighLevel CRM Architecture</option>
                    <option value="Marketing Automation">Multi-Channel Marketing Automation</option>
                    <option value="AI Agents">AI Conversational Agents</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl border border-indigo-400/30 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message to Strategy Team</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Message Dispatched Successfully!
                </h3>

                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our senior team has received your message and will review your website details.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all mt-4"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Reviews Section - Continuous left-to-right scrolling marquee at the very end before footer */}
      <VideoTestimonials variant="marquee" onOpenBooking={onOpenBooking} />

    </div>
  );
};
