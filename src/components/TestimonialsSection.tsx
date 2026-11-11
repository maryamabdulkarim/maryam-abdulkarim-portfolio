import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COLLEAGUE & MENTOR ENDORSEMENTS</span>
            <span aria-hidden="true">/</span>
            <span>SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            What Collaborators Say
          </h2>
          <p className="text-base text-neutral-400 max-w-xl font-light">
            Reflections from mentors, engineering leads, and directors who have witnessed my technical rigor, work ethic, and design execution firsthand.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-amber-400/40" />
                <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <p className="font-semibold text-white text-sm">
                  {item.author}
                </p>
                <p className="text-xs text-neutral-400">
                  {item.role} · <span className="text-amber-400/90">{item.organization}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
