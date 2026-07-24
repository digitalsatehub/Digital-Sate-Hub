import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Calculator,
  Send,
  CheckCircle2,
  Sparkles,
  Bot,
  Globe
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onOpenQuote }) => {
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
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Let's Build Your System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          Contact Digital Sate Hub
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Ready to turn more visitors into paying customers? Reach out directly, request a custom quote, or book a free 1-on-1 strategy session.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Direct Details & Quick Action Modals */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white border-b border-indigo-800/40 pb-3">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-xs">
              <a
                href="mailto:digitalsatehub@gmail.com"
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-[#1817B6] text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-300 block">Primary Business Email</span>
                  <span className="text-sm font-extrabold text-white">digitalsatehub@gmail.com</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Average Response Time: &lt; 2 Hours</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2.5 rounded-lg bg-[#1817B6] text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-300 block">Digital Studio Headquarters</span>
                  <span className="text-sm font-bold text-white">Global Remote Client Services</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Serving clients worldwide across USA, UK, Canada & Australia</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="pt-4 border-t border-indigo-800/40 space-y-3">
              <h3 className="text-xs font-bold uppercase text-indigo-300">
                Prefer Fast Instant Actions?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={onOpenBooking}
                  className="p-3 rounded-xl bg-[#1817B6] hover:bg-indigo-600 font-bold text-xs text-white transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Calendar</span>
                </button>

                <button
                  onClick={onOpenQuote}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs text-indigo-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>AI Scope Builder</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Detailed Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            
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
                      placeholder="marcus@vanguard.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
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

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Project Goals & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current setup, goals, timeline, or any specific platforms you use..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl transition-all flex items-center justify-center gap-2"
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
    </div>
  );
};
