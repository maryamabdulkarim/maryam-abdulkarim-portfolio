import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-neutral-950/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl text-neutral-100 flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.client && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-300">{project.client}</span>
              </>
            )}
          </div>
          
          <button
            onClick={onClose}
            aria-label="Close case study modal"
            className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800/80 hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Title & Tagline */}
          <div className="space-y-3">
            <h2 id="modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light">
              {project.tagline}
            </p>
            <div className="text-xs font-mono text-amber-300/90">
              Role: <span className="text-white font-medium">{project.role}</span>
            </div>
          </div>

          {/* Hero Visual Container */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            {project.impactMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 space-y-2">
              <h3 className="text-sm font-semibold tracking-wider text-rose-300 uppercase font-mono">
                The Challenge
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 space-y-2">
              <h3 className="text-sm font-semibold tracking-wider text-emerald-300 uppercase font-mono">
                The Solution
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">System Architecture & Overview</h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Core Capabilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-300">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Technologies & Tools Employed</span>
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              Close Window (Esc)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
