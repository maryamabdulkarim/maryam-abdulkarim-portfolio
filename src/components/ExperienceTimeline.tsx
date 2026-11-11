import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER PATH & FELLOWSHIPS</span>
              <span aria-hidden="true">/</span>
              <span>2022 — PRESENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Professional Journey
            </h2>
            <p className="text-base text-neutral-400 max-w-xl font-light">
              Demonstrated leadership and software engineering roles spanning high-velocity fellowships, public health initiatives, and independent client consulting.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3.5 py-2 rounded-lg border border-neutral-800">
            Proven Delivery · 4+ Years Active Practice
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-32 before:w-0.5 before:bg-neutral-800/80">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 group"
            >
              {/* Date Column (Desktop) */}
              <div className="md:w-32 md:text-right shrink-0 pt-1">
                <span className="text-xs font-mono text-amber-400 font-semibold tabular-nums">
                  {exp.period}
                </span>
                <p className="text-[11px] font-mono text-neutral-500 mt-0.5">{exp.type}</p>
              </div>

              {/* Node Marker */}
              <div className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-neutral-950 border-2 border-amber-400 text-amber-400 shadow-sm shrink-0 z-10 -ml-[13px] mt-1 group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-6 md:p-8 space-y-4 transition-all duration-300">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium mt-0.5">
                      <span className="text-amber-400/90">{exp.organization}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Key Outcomes & Contributions:
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 shrink-0 mt-0.5">↳</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="text-neutral-500">Tech:</span>
                  {exp.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800/80 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
