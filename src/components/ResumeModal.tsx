import React, { useEffect } from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Github, Linkedin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl text-neutral-100 flex flex-col my-auto">
        
        {/* Sticky Actions Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">CURRICULUM VITAE</span>
            <span aria-hidden="true">/</span>
            <span>Maryam Abdulkarim</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close CV modal"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-neutral-800/80 hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="p-8 md:p-12 space-y-10 bg-neutral-950 text-neutral-100 print:bg-white print:text-black">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-800 pb-8 space-y-3">
            <h1 id="resume-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white print:text-black">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-base text-amber-400 print:text-neutral-800 font-medium">
              Frontend Software Engineer · UI/UX Product Designer · Health Technologist
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 print:text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {PERSONAL_INFO.email}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {PERSONAL_INFO.location}
              </span>
              <span aria-hidden="true">·</span>
              <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Github className="w-3.5 h-3.5" /> github.com/maryam-akarim005
              </a>
              <span aria-hidden="true">·</span>
              <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/maryam-abdulkarim-
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Professional Summary
            </h2>
            <p className="text-sm text-neutral-300 print:text-neutral-800 leading-relaxed font-light">
              Results-oriented frontend software engineer with 4+ years of experience engineering responsive, accessible web applications and design systems. Fellow of TIIDELab (Cohort 5) with a proven record of shipping scalable products in fintech, public health surveillance, and STEM edtech. Adept in TypeScript, React 19, Next.js, and modern UI engineering.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Work Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-base font-bold text-white print:text-black">
                      {exp.role} <span className="font-normal text-amber-300 print:text-neutral-700">· {exp.organization}</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-400 print:text-neutral-600">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 print:text-neutral-700">{exp.description}</p>
                  <ul className="list-disc list-inside text-xs text-neutral-300 print:text-neutral-800 space-y-1 pl-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Education & Certifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300 space-y-1">
                <h3 className="text-sm font-bold text-white print:text-black">Federal University of Technology, Minna</h3>
                <p className="text-xs text-neutral-400 print:text-neutral-700">Bachelor of Technology (B.Tech) · Microbiology & Applied Science</p>
                <p className="text-[11px] font-mono text-amber-300 print:text-neutral-600">First Degree & Research Thesis</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300 space-y-1">
                <h3 className="text-sm font-bold text-white print:text-black">TIIDELab Software Fellowship</h3>
                <p className="text-xs text-neutral-400 print:text-neutral-700">Software Engineering & Leadership Certification · Cohort 5</p>
                <p className="text-[11px] font-mono text-amber-300 print:text-neutral-600">NECA & ITF Certified</p>
              </div>
            </div>
          </div>

          {/* Core Technical Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-semibold text-white print:text-black">Languages & Frameworks: </span>
                <span className="text-neutral-400 print:text-neutral-700">React 19, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS v4</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-black">UI/UX & Design Tools: </span>
                <span className="text-neutral-400 print:text-neutral-700">Figma, Design Systems, WCAG 2.1 AA Accessibility, Wireframing</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-black">Backend & DevOps: </span>
                <span className="text-neutral-400 print:text-neutral-700">Node.js, Express, REST APIs, PostgreSQL, Git & GitHub CI/CD</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-black">Specializations: </span>
                <span className="text-neutral-400 print:text-neutral-700">Health Informatics, AMR Data Visualization, Technical Writing</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
