import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDown, Copy, Check, ExternalLink, Github, Linkedin, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern border-b border-neutral-900">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 bg-neutral-700/15 rounded-full blur-3xl opacity-50"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Focus */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata Availability */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-neutral-400">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-neutral-300 font-medium">Available for select engineering & design roles</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Nigeria & Global Remote</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Building deliberate, <br />
              <span className="font-serif italic font-normal text-amber-300">human-centered</span> web systems with scientific precision.
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-light">
              Hi, I'm <strong className="font-semibold text-white">Maryam Abdulkarim</strong> (Maryam Bint Karim). 
              A software engineer, UI/UX designer, and TIIDELab Fellow bridging modern frontend architecture, intuitive design systems, and public health technology.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md hover:shadow-amber-400/20 transition-all duration-200"
              >
                <span>View Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-600 rounded-lg transition-all duration-200"
              >
                <span>Get in Touch</span>
              </button>

              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-mono text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all duration-200"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Professional Links with unboxed text */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs md:text-sm text-neutral-400">
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <a
                href={PERSONAL_INFO.links.devpost}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <span>Devpost</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 hover:text-amber-400 text-neutral-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="underline underline-offset-4">Interactive CV / Resume</span>
              </button>
            </div>

          </div>

          {/* Right Column: Editorial Headshot Visual Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer decorative layered frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-800 shadow-2xl">
                
                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900">
                  <img
                    src={PERSONAL_INFO.headshotUrl}
                    alt="Maryam Abdulkarim"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Editorial Floating Tag inside the frame */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-lg bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-white">{PERSONAL_INFO.name}</p>
                        <p className="text-neutral-400 text-[11px]">Software Engineer · TIIDELab #5</p>
                      </div>
                      <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                        Lagos / Abuja, NG
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Minimal floating accent pill */}
              <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 shadow-xl text-xs text-neutral-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Focused on Web & Health Systems</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width KPI / Metrics Strip (placed below the 2-column hero split as specified by guidelines) */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-neutral-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
