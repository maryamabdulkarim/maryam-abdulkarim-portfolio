import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // West Africa Time (UTC+1, Lagos/Abuja)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Local Time */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-bold text-white text-sm">
            {PERSONAL_INFO.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline-block text-neutral-700">·</span>
          <div className="font-mono text-neutral-400">
            Lagos, NG (WAT) <span className="text-amber-400 tabular-nums ml-1 font-semibold">{currentTime || '12:00:00'}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-6 font-mono">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.links.formerPortfolio}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Former Portfolio
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 font-mono text-[11px]"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
