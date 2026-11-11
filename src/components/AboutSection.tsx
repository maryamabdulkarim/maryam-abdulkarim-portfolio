import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Compass, Sparkles, BookOpen, HeartHandshake, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-24 md:py-32 border-b border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>BACKGROUND & PERSPECTIVE</span>
            <span aria-hidden="true">/</span>
            <span>THE INTERDISCIPLINARY STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Uniting Science with Digital Craft
          </h2>
        </div>

        {/* 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
            <p>
              I am a software engineer and UI/UX designer based in Nigeria, operating at the crossroads of computational engineering, intuitive visual design, and real-world health systems.
            </p>

            <p>
              My path into software development was fueled by a rigorous scientific education in <strong className="text-white font-medium">Technology & Microbiology</strong> at the Federal University of Technology, Minna, and postgraduate biomedical research. Working in laboratories with antimicrobial resistance (AMR) data made one reality crystal clear: <span className="text-white font-normal italic font-serif">even the most groundbreaking scientific and clinical insight fails if the software used to interact with it is confusing, brittle, or slow</span>.
            </p>

            <p>
              This led me to immerse myself in software craftsmanship through the prestigious <strong className="text-amber-300 font-medium">TIIDELab Fellowship (Cohort 5)</strong>, where I refined my abilities in full-stack JavaScript, React ecosystem architecture, agile delivery, and collaborative product engineering.
            </p>

            <p>
              Today, I build production-grade web systems for fintech platforms, health surveillance bodies, and educational initiatives. Whether designing an accessible design system in Figma or writing type-safe React applications in TypeScript, I apply a scientist's empirical discipline and a designer's empathy.
            </p>

            {/* Former Portfolio Reference Callout */}
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  ARCHIVE & EVOLUTION
                </span>
                <a
                  href={PERSONAL_INFO.links.formerPortfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-neutral-300 hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Visit maryambintkarim.netlify.app</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Curious to see where the journey started? My former portfolio reflects my early milestones, open-source projects, and fellowship beginnings that paved the way for my current architectural focus.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Core Engineering Principles */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Core Engineering Principles</span>
            </h3>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Performance is Human Respect</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every millisecond of latency is cognitive drain on users. I engineer for sub-200ms interactions, optimized bundle sizes, and seamless transitions.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Accessibility is Non-Negotiable</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Software must serve everyone regardless of network speeds, motor ability, or visual acuity. Strict WCAG 2.1 AA compliance is baked into my work from day one.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-mono">3</span>
                  <span>Type-Safety & Resilient Architecture</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Using strict TypeScript, clean modular hooks, and atomic component composition to ensure codebases remain maintainable for years to come.
                </p>
              </div>
            </div>

            {/* Quick Resume CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenResume}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Academic & Career Resume</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
