import React from 'react';
import { LOGO_URL } from '../data/siteData';
import { NavigationPage } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  ShieldCheck,
  FileText,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenBooking
}) => {
  return (
    <footer className="bg-[#0A0322] text-gray-300 border-t border-indigo-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-indigo-900/40">
          
          {/* Col 1: Company Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-1.5 rounded-xl border border-white/10">
                <img
                  src={LOGO_URL}
                  alt="Digital Sate Hub Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-none">
                  DIGITAL SATE HUB
                </span>
                <span className="text-[10px] font-semibold text-indigo-400 tracking-wider uppercase block mt-1">
                  High-Converting Digital Systems
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              We design digital experiences that drive real business growth. Combining conversion-focused web design, sales funnels, GoHighLevel CRM, and automated marketing workflows to help businesses capture and convert more leads.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              {['Website Design', 'Sales Funnels', 'Landing Pages', 'CRM Optimization', 'Marketing Automation', 'Email Sequences', 'AI Automation', 'Conversion (CRO)'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-indigo-300 transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries & Work */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Industries & Work
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-indigo-300 transition-colors">
                  Featured Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-indigo-300 transition-colors">
                  Video Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-300 transition-colors">
                  Coaches & Consultants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-300 transition-colors">
                  Healthcare & Spas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-300 transition-colors">
                  Home Services & Solar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-300 transition-colors">
                  Real Estate & Agencies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Support
            </h3>
            <div className="space-y-2.5 text-xs">
              <a
                href="mailto:digitalsatehub@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>digitalsatehub@gmail.com</span>
              </a>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Global Remote Digital Studio</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1817B6] hover:bg-indigo-600 font-bold text-xs text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Digital Sate Hub. All Rights Reserved. Built for Business Growth.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-gray-300 transition-colors flex items-center gap-1"
              id="privacy-policy-link"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={onOpenTerms}
              className="hover:text-gray-300 transition-colors flex items-center gap-1"
              id="terms-conditions-link"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Terms & Conditions</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
