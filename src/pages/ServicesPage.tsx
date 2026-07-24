import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/siteData';
import { ServiceItem } from '../types';
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
  Sparkles,
  Calculator,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onOpenQuote }) => {
  // Interactive ROI Calculator State
  const [monthlyTraffic, setMonthlyTraffic] = useState(3000);
  const [currentConversion, setCurrentConversion] = useState(1.5); // 1.5%
  const [averageDealValue, setAverageDealValue] = useState(1200); // $1200

  // Calculate projected conversions with Digital Sate Hub system
  const currentLeads = Math.round(monthlyTraffic * (currentConversion / 100));
  const currentRevenue = currentLeads * averageDealValue;

  // Digital Sate Hub conversion boost (projected 3.8%)
  const projectedConversion = Math.max(currentConversion * 2.2, 3.8);
  const projectedLeads = Math.round(monthlyTraffic * (projectedConversion / 100));
  const projectedRevenue = projectedLeads * averageDealValue;
  const additionalMonthlyRevenue = projectedRevenue - currentRevenue;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-7 h-7 text-indigo-400" />;
      case 'Filter': return <Filter className="w-7 h-7 text-blue-400" />;
      case 'Layout': return <Layout className="w-7 h-7 text-sky-400" />;
      case 'Database': return <Database className="w-7 h-7 text-cyan-400" />;
      case 'Zap': return <Zap className="w-7 h-7 text-amber-400" />;
      case 'Mail': return <Mail className="w-7 h-7 text-indigo-300" />;
      case 'Bot': return <Bot className="w-7 h-7 text-purple-400" />;
      default: return <LineChart className="w-7 h-7 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-[#12063B] text-white min-h-screen pt-12 pb-24 space-y-20">
      
      {/* Services Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Turnkey Growth Systems</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          Our Services Are Built for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
            Measurable Revenue ROI
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          From high-converting website redesigns to GoHighLevel CRM pipelines and multi-channel SMS automation, we eliminate lead friction and accelerate sales cycles.
        </p>
      </div>

      {/* Services Detailed List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {SERVICES_LIST.map((service, index) => (
          <div
            key={service.id}
            className={`bg-white/5 border border-indigo-500/20 hover:border-indigo-400/50 rounded-3xl p-6 sm:p-10 transition-all duration-300 backdrop-blur-md shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#1817B6] text-white">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  Capability 0{index + 1}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {service.title}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                    Expected Business Outcome:
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {service.keyResult}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                  System Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {service.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-white/5 border border-white/10 text-gray-300"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#1817B6] hover:bg-indigo-600 transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Request Proposal For {service.title}</span>
                </button>
              </div>
            </div>

            {/* Right: Image Preview */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive ROI Calculator Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1A0C4E] via-[#12063B] to-[#1817B6]/40 border border-indigo-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Interactive ROI Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Calculate Your Potential Revenue Lift
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Adjust your monthly traffic, current conversion rate, and average deal size to see how an optimized conversion system impacts your bottom line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input 1: Traffic */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <label className="block text-xs font-bold uppercase text-indigo-300">
                Monthly Website Visitors: {monthlyTraffic.toLocaleString()}
              </label>
              <input
                type="range"
                min="500"
                max="25000"
                step="250"
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400 block">Traffic volume across site & landing pages</span>
            </div>

            {/* Input 2: Current Conv Rate */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <label className="block text-xs font-bold uppercase text-indigo-300">
                Current Opt-In Rate: {currentConversion}%
              </label>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400 block">Percentage of visitors filling forms</span>
            </div>

            {/* Input 3: Deal Value */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <label className="block text-xs font-bold uppercase text-indigo-300">
                Average Client Value: ${averageDealValue.toLocaleString()}
              </label>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={averageDealValue}
                onChange={(e) => setAverageDealValue(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400 block">Lifetime or retainer value per closed deal</span>
            </div>

          </div>

          {/* Results Comparison Box */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Current Monthly Revenue
              </span>
              <div className="text-xl font-bold text-gray-300">
                ${currentRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-gray-500">{currentLeads} Leads/mo</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                Projected Digital Sate Hub System
              </span>
              <div className="text-2xl font-black text-emerald-300">
                ${projectedRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400/80 font-bold">{projectedLeads} Leads/mo ({projectedConversion.toFixed(1)}% Conv)</span>
            </div>

            <div className="bg-[#1817B6]/30 p-3 rounded-xl border border-indigo-400/40">
              <span className="text-[10px] font-bold uppercase text-amber-300 block mb-1">
                Estimated Additional Revenue / Mo
              </span>
              <div className="text-2xl font-black text-amber-300">
                +${additionalMonthlyRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-indigo-200">Per Month in Captured Growth</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl transition-all"
            >
              Build This System For Your Business
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
