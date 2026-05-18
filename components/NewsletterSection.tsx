"use client";

import { useState } from 'react';

// Newsletter Component
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <div className="bg-brand-bronze rounded-[2rem] overflow-hidden shadow-2xl relative">

        {/* Soft warm glows behind the dark anchor color. */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-brand-caramel rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-10 lg:p-12 gap-8">

          {/* Left Content */}
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream/10 border border-brand-cream/30 text-brand-cream text-xs font-bold tracking-widest uppercase mb-4 animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              The Insider Club
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-brand-cream mb-4 leading-tight">
              Unlock <span className="italic text-brand-gold">10% Off</span> <br /> Your First Order
            </h3>

            <p className="text-brand-cream/80 text-base leading-relaxed">
              Be the first to know about new arrivals, restocks, and exclusive deals. We keep you updated on the latest jewelry drops.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-md bg-brand-cream/10 backdrop-blur-md p-1.5 rounded-2xl border border-brand-cream/20 pwa-submit-form">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-none text-brand-cream placeholder-brand-cream/40 px-5 py-3 focus:ring-0 text-base"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-cream hover:bg-brand-gold text-brand-bronze font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg whitespace-nowrap text-sm"
              >
                {isSubmitting ? (
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                ) : (
                  <span className="flex items-center gap-2">
                    Join <i className="ri-arrow-right-line"></i>
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>

        {submitStatus === 'success' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-bronze px-6 py-2 rounded-full font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <i className="ri-checkbox-circle-line mr-2"></i> Welcome to the club!
          </div>
        )}
      </div>
    </div>
  );
}
