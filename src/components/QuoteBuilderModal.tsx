import React, { useState } from 'react';
import { AIStrategyResult } from '../types';
import {
  X,
  Calculator,
  Sparkles,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  Send,
  Zap,
  DollarSign,
  Clock,
  Layers,
  Building
} from 'lucide-react';

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'High-Converting Website Design',
    'Sales Funnels & Checkout Sequences'
  ]);
  const [budget, setBudget] = useState('$3,000 - $7,500');
  const [timeline, setTimeline] = useState('2 - 3 Weeks');

  // Business & AI proposal fields
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [industry, setIndustry] = useState('Coaches & Consultants');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // AI strategy state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiResult, setAiResult] = useState<AIStrategyResult | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState(false);

  if (!isOpen) return null;

  const availableServices = [
    'High-Converting Website Design',
    'Sales Funnels & Checkout Sequences',
    'Dedicated Landing Pages',
    'GoHighLevel CRM & Pipeline Setup',
    'Multi-Channel Marketing Automation',
    'Behavioral Email Sequences',
    'Custom AI Chat & Booking Agents',
    'Conversion Rate Optimization (CRO)'
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleGenerateAiProposal = async () => {
    if (!businessName || !industry) return;
    setIsGeneratingAi(true);

    try {
      const res = await fetch('/api/ai-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          websiteUrl,
          industry,
          primaryGoal: `Selected services: ${selectedServices.join(', ')}`
        })
      });

      const data = await res.json();
      if (data.strategy) {
        setAiResult(data.strategy);
      }
    } catch (err) {
      console.error('Error getting AI strategy:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSubmitQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          email,
          phone,
          selectedServices,
          estimatedBudget: budget,
          timeline,
          notes: websiteUrl
        })
      });
      setSubmittedQuote(true);
    } catch (err) {
      console.error(err);
      setSubmittedQuote(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12063B] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
          id="close-quote-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedQuote ? (
          <div>
            {/* Header & Steps Indicator */}
            <div className="flex items-center justify-between border-b border-indigo-800/40 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Instant Interactive Proposal Estimator</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Get Your Custom Scope & Proposal
                </h2>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-indigo-300">
                <span className={`px-2.5 py-1 rounded-lg ${step === 1 ? 'bg-[#1817B6] text-white' : 'bg-white/5'}`}>1. Scope</span>
                <span className={`px-2.5 py-1 rounded-lg ${step === 2 ? 'bg-[#1817B6] text-white' : 'bg-white/5'}`}>2. Budget</span>
                <span className={`px-2.5 py-1 rounded-lg ${step === 3 ? 'bg-[#1817B6] text-white' : 'bg-white/5'}`}>3. AI Strategy</span>
              </div>
            </div>

            {/* STEP 1: Select Scope */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    Select the Digital Capabilities You Need Built:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#1817B6] border-indigo-300 text-white shadow-md'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Budget & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                    Target Investment Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['$1,500 - $3,000', '$3,000 - $7,500', '$7,500 - $15,000+'].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          budget === b
                            ? 'bg-[#1817B6] border-indigo-300 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                    Desired Project Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Urgent (< 10 Days)', '2 - 3 Weeks', 'Flexible Scope'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          timeline === t
                            ? 'bg-[#1817B6] border-indigo-300 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 px-4 rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Generate AI Strategy Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AI Proposal Generation & Final Submission */}
            {step === 3 && (
              <form onSubmit={handleSubmitQuoteRequest} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Growth Inc"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                      Industry / Sector *
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-[#1A0C4E] border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                    >
                      <option value="Coaches & Consultants">Coaches & Consultants</option>
                      <option value="Healthcare & Aesthetics">Healthcare & Aesthetics</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Home Services">Home Services</option>
                      <option value="Agencies & B2B">Agencies & B2B</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Fitness & Gyms">Fitness & Gyms</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Website URL</label>
                    <input
                      type="text"
                      placeholder="www.yourcompany.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-indigo-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                {/* AI Audit Generator Button */}
                {!aiResult && (
                  <button
                    type="button"
                    onClick={handleGenerateAiProposal}
                    disabled={isGeneratingAi || !businessName}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>{isGeneratingAi ? 'Analyzing Industry Conversion Gaps...' : 'Generate Instant AI Funnel Strategy Audit'}</span>
                  </button>
                )}

                {/* AI Generated Audit Output Window */}
                {aiResult && (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-400/40 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Funnel Audit generated for {businessName}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {aiResult.estimatedLift}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white">
                      {aiResult.headline}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-300">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="font-bold text-rose-400 block mb-1">Conversion Friction Points:</span>
                        <ul className="list-disc pl-3 space-y-1 text-gray-400">
                          {aiResult.conversionGaps.map((gap, i) => (
                            <li key={i}>{gap}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="font-bold text-indigo-300 block mb-1">Actionable Growth Plan:</span>
                        <ul className="list-disc pl-3 space-y-1 text-gray-300">
                          {aiResult.actionPlan.map((plan, i) => (
                            <li key={i}>{plan}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3 px-4 rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    id="submit-custom-quote-btn"
                    className="w-2/3 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Custom Formal Proposal</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-white">
              Custom Proposal Request Dispatched!
            </h2>

            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <strong>{businessName}</strong>! Our senior strategy team will prepare a formal Scope & Proposal document sent to <strong>{email}</strong> within 2 hours.
            </p>

            <button
              onClick={() => {
                setSubmittedQuote(false);
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#1817B6] to-indigo-600 hover:from-indigo-600 hover:to-[#1817B6] shadow-lg transition-all"
            >
              Book Strategy Review Call Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
