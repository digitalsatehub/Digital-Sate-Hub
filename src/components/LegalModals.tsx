import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
          id="close-legal-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Legal Document</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Privacy Policy</h2>
            <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
              <p>
                <strong>Last Updated: July 2026</strong>
              </p>
              <p>
                At Digital Sate Hub ("we", "our", "us"), we are committed to respecting your privacy and safeguarding any personal information you provide when using our website and services.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">1. Information We Collect</h3>
              <p>
                We collect personal information that you voluntarily submit to us when requesting a strategy call, custom proposal, or newsletter subscription, including your name, email address, phone number, website URL, and business goals.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">2. How We Use Your Information</h3>
              <p>
                Your information is used strictly to communicate regarding your project inquiry, deliver custom strategy proposals, manage appointment scheduling, and provide technical ongoing support. We never sell, rent, or lease your personal data to third parties.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">3. Automation & CRM Third-Party Tools</h3>
              <p>
                We use secure enterprise platforms such as GoHighLevel, Stripe, and Google AI services to manage bookings and process payments in compliance with standard security protocols.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">4. Contact Us</h3>
              <p>
                If you have questions regarding this Privacy Policy, please email us directly at <strong>digitalsatehub@gmail.com</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <FileText className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Legal Document</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Terms & Conditions</h2>
            <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
              <p>
                <strong>Last Updated: July 2026</strong>
              </p>
              <p>
                By accessing or using the Digital Sate Hub website and services, you agree to be bound by the following Terms & Conditions.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">1. Services & Deliverables</h3>
              <p>
                Digital Sate Hub provides custom website design, sales funnel development, CRM setup, and marketing automation services. Specific project scopes, timelines, and deliverables are defined in individual proposal agreements.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">2. Intellectual Property</h3>
              <p>
                Upon final payment for a custom build, all intellectual property rights to the custom web design and funnel assets created specifically for your business are transferred to the client.
              </p>
              <h3 className="text-sm font-bold text-white pt-2">3. Limitation of Liability</h3>
              <p>
                Digital Sate Hub provides strategic recommendations and high-performing digital systems; however, client revenue results depend on market conditions, ad spend, and sales execution.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-indigo-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
