import React from 'react';
import { PLATFORMS_LIST } from '../data/siteData';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Layers,
  Bot,
  Calendar,
  Globe,
  Database,
  Mail,
  Workflow
} from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const philosophyPillars = [
    {
      title: 'Conversion-First Design',
      desc: 'Visual layouts built around strategic typographic hierarchy, psychological contrast, and clear primary CTA focal points.',
      icon: Target
    },
    {
      title: 'Customer Journey Optimization',
      desc: 'Mapping friction-free paths from initial ad discovery to opt-in, application, and confirmed booking.',
      icon: Layers
    },
    {
      title: 'Sales Funnels & Checkout Flows',
      desc: 'Dedicated multi-step paths with order bumps, upsells, and instant credit card processing via Stripe.',
      icon: Zap
    },
    {
      title: 'CRM Systems & Lead Routing',
      desc: 'Unified deal pipelines in GoHighLevel or HubSpot with live stage tracking and team distribution.',
      icon: Database
    },
    {
      title: 'Multi-Channel Marketing Automation',
      desc: 'Automated 5-minute SMS & email workflows that follow up with leads 24/7 without manual labor.',
      icon: Workflow
    },
    {
      title: 'AI-Enhanced Workflows',
      desc: 'Smart AI web agents and automated proposals that qualify prospects and answer inquiries instantly.',
      icon: Bot
    },
    {
      title: 'High-Speed Websites & Landing Pages',
      desc: 'Sub-second loading speeds on Webflow, WordPress, or GoHighLevel for maximum SEO performance.',
      icon: Globe
    },
    {
      title: 'Instant Appointment Systems',
      desc: 'Self-service calendars integrated with automated SMS/email reminders to eliminate call no-shows.',
      icon: Calendar
    }
  ];

  return (
    <section className="py-20 bg-[#12063B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Growth Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            We Design Digital Experiences That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Drive Real Business Growth
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            We don't sell generic website templates. We engineer cohesive digital ecosystems where design, copywriting, CRM pipelines, and automated follow-ups work together to turn traffic into revenue.
          </p>
        </div>

        {/* Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {philosophyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1817B6]/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-indigo-300" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Platforms We Work With (Marquee + Badges) */}
        <div className="bg-white/5 border border-indigo-500/30 rounded-3xl p-8 text-center backdrop-blur-md">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Platforms We Work With
            </h3>
            <p className="text-xs text-indigo-200">
              We seamlessly integrate into your preferred tech ecosystem or build you the ultimate custom stack.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PLATFORMS_LIST.map((platform) => (
              <span
                key={platform}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-950/80 border border-indigo-500/30 hover:border-indigo-400 hover:bg-[#1817B6]/40 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{platform}</span>
              </span>
            ))}
          </div>

          <p className="text-[11px] text-gray-300 mt-6 font-medium">
            Outcome-Focused • Tech Stack Agnostic • Built For Seamless Scalability
          </p>
        </div>

      </div>
    </section>
  );
};
