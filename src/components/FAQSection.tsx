import React, { useState } from 'react';
import { FAQS_LIST } from '../data/siteData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('redesign-existing');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS_LIST.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="py-20 bg-[#12063B] text-white relative border-t border-indigo-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-indigo-200">
              Questions
            </span>
          </h2>

          <p className="text-base text-gray-300 leading-relaxed">
            Clear answers to common questions about our redesign process, platform choices, sales funnels, and ongoing support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. GoHighLevel, redesign, timeline)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-indigo-500/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors shadow-inner"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white/10 border-indigo-400/60 shadow-xl'
                    : 'bg-white/5 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  id={`faq-toggle-${faq.id}`}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base text-white focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-indigo-800/40 animate-in fade-in duration-200">
                    <p className="pl-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 bg-white/5 border border-indigo-500/30 rounded-3xl p-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1817B6] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Have a Specific Question Not Listed Here?</h3>
              <p className="text-xs text-indigo-200">Our senior strategy team is happy to answer any questions directly.</p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1817B6] hover:bg-indigo-600 transition-all shrink-0"
          >
            Ask Us Anything On a Call
          </button>
        </div>

      </div>
    </section>
  );
};
