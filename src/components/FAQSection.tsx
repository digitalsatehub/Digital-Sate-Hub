import React, { useState } from 'react';
import { FAQS_LIST } from '../data/siteData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Globe
} from 'lucide-react';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('redesign-existing');
  const [searchQuery, setSearchQuery] = useState('');

  // Form submission state for Cal.com template
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design & Redesign',
    preferredDate: '',
    preferredTime: '10:00 AM EST',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = FAQS_LIST.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#12063B] text-white relative border-t border-indigo-900/50">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Questions
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Clear answers to common questions, or book a strategy session directly via our Cal.com booking form below.
          </p>
        </div>

        {/* Divided 2-Column Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Part 1: FAQ Questions Column (Left) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>Common Inquiries</span>
              </h3>
              <p className="text-xs text-indigo-200 mb-6">
                Search or click on any question below to view details.
              </p>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search questions (e.g. GoHighLevel, redesign)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/30 rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors shadow-inner"
                />
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl transition-all overflow-hidden ${
                        isOpen
                          ? 'bg-white/10 border-indigo-400/60 shadow-lg'
                          : 'bg-white/5 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-white/10'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        id={`faq-toggle-${faq.id}`}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-white focus:outline-none"
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{faq.question}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-indigo-300 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-indigo-800/40 animate-in fade-in duration-200">
                          <p className="pl-6">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Part 2: Cal.com Booking Form Template Column (Right) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-[#0b0526] border border-indigo-500/30 hover:border-indigo-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Cal.com Brand Header Indicator */}
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1817B6] border border-indigo-400/30 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                    <Calendar className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>Schedule Strategy Session</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                        Cal.com
                      </span>
                    </h3>
                    <p className="text-xs text-gray-300">
                      30-Min Discovery & System Architecture Call
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Slots Open Today</span>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Call Request Received!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>! We have reserved your requested slot ({formData.preferredTime}). A calendar invite has been dispatched to <span className="text-indigo-300 font-semibold">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all"
                  >
                    Schedule Another Session
                  </button>
                </div>
              ) : (
                /* Interactive Cal.com Form Template */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Phone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Primary Interest */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Service Required</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#12063B] border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400 transition-colors"
                      >
                        <option value="Website Design & Redesign">Website Design & Redesign</option>
                        <option value="GoHighLevel CRM & Funnels">GoHighLevel CRM & Funnels</option>
                        <option value="Marketing Automation & SMS">Marketing Automation & SMS</option>
                        <option value="Conversion Optimization">Conversion Optimization</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-indigo-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preferred Time Window</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full bg-[#12063B] border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-indigo-400 transition-colors"
                        >
                          <option value="09:00 AM EST">09:00 AM EST</option>
                          <option value="11:30 AM EST">11:30 AM EST</option>
                          <option value="02:00 PM EST">02:00 PM EST</option>
                          <option value="04:30 PM EST">04:30 PM EST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Project Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Project Details or Goal</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your business and main goal..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="cal-form-submit-btn"
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/30 border border-indigo-300/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Confirm Call via Cal.com</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-gray-400">
                      Powered by Cal.com • Instant Confirmation & Google Calendar Sync
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
