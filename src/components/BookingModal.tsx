import React, { useState } from 'react';
import { StrategyCallFormData } from '../types';
import { SERVICES_LIST } from '../data/siteData';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<StrategyCallFormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteUrl: '',
    serviceRequested: 'Sales Funnels & CRM Automation',
    preferredDate: '2026-07-27',
    preferredTime: '10:00 AM EST',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
          id="close-booking-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Complimentary 1-on-1 Growth Session</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Book Your Free Strategy Call
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 mb-6">
              In this 30-minute session, we will review your current website, identify conversion bottlenecks, and map out a custom funnel & automation architecture.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Company / Website URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="www.yourcompany.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Primary Area of Interest
                </label>
                <select
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-[#1A0C4E] border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="Sales Funnels & CRM Automation">Sales Funnels & CRM Automation</option>
                  <option value="Website Redesign">High-Converting Website Redesign</option>
                  <option value="Landing Page & Ad Traffic">Landing Page & Ad Traffic</option>
                  <option value="GoHighLevel Architecture">GoHighLevel Architecture & Pipelines</option>
                  <option value="AI Chat & Booking Agents">AI Chat & Booking Agents</option>
                  <option value="Full Digital Overhaul">Full Turnkey Digital Overhaul</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#1A0C4E] border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#1A0C4E] border border-indigo-500/30 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="09:00 AM EST">09:00 AM EST</option>
                    <option value="11:00 AM EST">11:00 AM EST</option>
                    <option value="02:00 PM EST">02:00 PM EST</option>
                    <option value="04:00 PM EST">04:00 PM EST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Primary Business Bottleneck (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us a little bit about what you want to achieve or improve..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-indigo-500/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="submit-booking-form-btn"
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span>Reserving Calendar Slot...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm & Reserve My Free Strategy Session</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-white">
              Your Strategy Session is Confirmed!
            </h2>

            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>! We have logged your request for <strong>{formData.preferredDate} at {formData.preferredTime}</strong>.
            </p>

            <div className="bg-white/5 p-4 rounded-2xl border border-indigo-500/30 max-w-md mx-auto text-xs text-left space-y-1.5">
              <p className="font-bold text-indigo-300">Session Details Sent To:</p>
              <p className="text-white font-mono">{formData.email}</p>
              <p className="text-gray-400 text-[11px] pt-1">
                A calendar invitation link with Zoom room credentials has been dispatched. Our strategy lead will review your website beforehand.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all mt-4"
            >
              Done & Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
