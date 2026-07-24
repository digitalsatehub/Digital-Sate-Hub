import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/siteData';
import { ServiceItem, NavigationPage } from '../types';
import {
  Globe,
  Filter,
  Layout,
  Database,
  Zap,
  Mail,
  Bot,
  LineChart,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Calculator
} from 'lucide-react';

interface FeaturedServicesProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenQuote: () => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'Filter': return <Filter className="w-6 h-6 text-blue-400" />;
      case 'Layout': return <Layout className="w-6 h-6 text-sky-400" />;
      case 'Database': return <Database className="w-6 h-6 text-cyan-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Mail': return <Mail className="w-6 h-6 text-indigo-300" />;
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      default: return <LineChart className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Result-Oriented Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Featured Services Designed for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
                Measurable Business ROI
              </span>
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              We focus strictly on the business outcome—more booked calls, higher order values, and automated client retention.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="shrink-0 px-6 py-3 rounded-xl bg-white/5 border border-indigo-500/30 hover:border-indigo-400 text-xs font-bold text-indigo-200 hover:text-white transition-all flex items-center gap-2"
            id="view-all-services-btn"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Featured Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#12063B] border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    {service.keyResult.split(' ')[0]} ROI
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
              </div>

              <div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
                    Primary Business Result
                  </span>
                  <p className="text-xs font-bold text-emerald-300">
                    {service.keyResult}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  id={`service-card-${service.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#1817B6] border border-white/10 text-xs font-semibold text-gray-200 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
              id="close-service-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#1817B6] text-white">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-indigo-300">
                  Detailed Capabilities
                </span>
                <h3 className="text-2xl font-black text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                Guaranteed Business Focus
              </span>
              <p className="text-sm font-extrabold text-white">
                {selectedService.keyResult}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
                Key System Deliverables:
              </h4>
              <div className="space-y-2">
                {selectedService.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                Supported Ecosystems:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenQuote();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calculator className="w-4 h-4" />
                <span>Get Proposal For {selectedService.title}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
