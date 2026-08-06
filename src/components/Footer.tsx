import React, { useState, useEffect } from 'react';
import { LOGO_URL } from '../data/siteData';
import { NavigationPage } from '../types';
import { getSocialLinks, SocialLinks } from '../lib/adminStore';
import {
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Twitter,
  Linkedin,
  Youtube,
  Facebook
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
  onOpenTerms
}) => {
  const [socials, setSocials] = useState<SocialLinks>(getSocialLinks());

  useEffect(() => {
    const handleUpdate = () => {
      setSocials(getSocialLinks());
    };
    handleUpdate();
    window.addEventListener('dsh_socials_updated', handleUpdate);
    return () => {
      window.removeEventListener('dsh_socials_updated', handleUpdate);
    };
  }, []);
  return (
    <footer className="bg-[#0A0322] text-gray-300 border-t border-indigo-900/60 pt-16 pb-12 relative overflow-hidden">
      {/* Soft Bottom Edge Ambient Blur */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-indigo-500/15 rounded-full blur-[70px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-indigo-900/40">
          
          {/* Col 1: Company Overview */}
          <div className="space-y-4">
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
          </div>

          {/* Col 2: Pages */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Pages
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Services', page: 'services' },
                { label: 'Portfolio', page: 'portfolio' },
                { label: 'Blog', page: 'blog' },
                { label: 'Contact', page: 'contact' }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      if (item.page === 'services') {
                        onNavigate('home');
                        setTimeout(() => {
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      } else {
                        onNavigate(item.page as NavigationPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-indigo-300 transition-colors text-left font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Support (With Social Media Icons, No Button) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Support
            </h3>
            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${socials.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{socials.email}</span>
              </a>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{socials.address}</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2 border-t border-indigo-900/40">
              <span className="text-[11px] font-semibold text-gray-400 block mb-3">
                Connect With Us:
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* LinkedIn */}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md group"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                {/* X (Twitter) */}
                {socials.twitter && (
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md group"
                    title="X (Twitter)"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}

                {/* YouTube */}
                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md group"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}

                {/* Facebook */}
                {socials.facebook && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md group"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}

                {/* WhatsApp */}
                {socials.whatsapp && (
                  <a
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-[#1817B6] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md group"
                    title="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Digital Sate Hub. All Rights Reserved. <span onClick={() => onNavigate('admin')} className="cursor-pointer hover:text-gray-300 transition-colors">Built</span> for Business Growth.
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
