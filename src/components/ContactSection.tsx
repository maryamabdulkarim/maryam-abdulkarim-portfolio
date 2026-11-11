import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, Send, ExternalLink, Github, Linkedin, ArrowUpRight, MessageSquareCode } from 'lucide-react';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Frontend Engineering',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct mailto link
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Maryam,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nSender Email: ${formData.email}\nInquiry Type: ${formData.projectType}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Mail className="w-3.5 h-3.5" />
            <span>CONNECT & COLLABORATE</span>
            <span aria-hidden="true">/</span>
            <span>OPEN FOR HIGH-IMPACT OPPORTUNITIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Let's build something <span className="font-serif italic font-normal text-amber-300">deliberate</span> together.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Whether you are building a mission-critical web application, architecting a design system, or seeking a collaborative frontend engineer with real domain depth, I'd love to hear from you.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Inquiries & Links */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Email Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono text-neutral-400">DIRECT EMAIL</span>
                <p className="text-lg md:text-xl font-bold font-mono text-white select-all">
                  {PERSONAL_INFO.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Typically responds within 24 hours</span>
                </p>
                <p className="text-neutral-500 font-mono">Timezone: UTC+1 (West Africa Time)</p>
              </div>
            </div>

            {/* Social & Professional Directory */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Professional Profiles & Repositories
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-amber-400" />
                    <span>GitHub Profile</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>

                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn Network</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>

                <a
                  href={PERSONAL_INFO.links.devpost}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquareCode className="w-4 h-4 text-emerald-400" />
                    <span>Devpost Hackathons</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>

                <a
                  href={PERSONAL_INFO.links.formerPortfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                    <span>Former Site Archive</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>

            {/* Resume button */}
            <div className="pt-2">
              <button
                onClick={onOpenResume}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Curriculum Vitae & Credentials</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Message Composer Form */}
          <div className="lg:col-span-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 md:p-10 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Send a Message</h3>
              <p className="text-xs text-neutral-400">
                Draft an inquiry directly to Maryam's personal inbox.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-neutral-950 border border-amber-400/50 space-y-3 text-center animate-fadeIn">
                <Check className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Opening Email Client...</h4>
                <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                  Your message was packaged and prepared in your default mail app. You can also reach Maryam directly at <strong className="text-amber-300 font-mono">{PERSONAL_INFO.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Inquiry Topic</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Frontend Engineering">Frontend Engineering / Full-Time Role</option>
                    <option value="UI/UX Design Systems">UI/UX Design Systems & Prototyping</option>
                    <option value="HealthTech Consultation">HealthTech / Clinical Surveillance Systems</option>
                    <option value="Contract Web Project">Contract / Freelance Web Project</option>
                    <option value="Speaking & Mentorship">Speaking, Mentorship & Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or what you are looking to build..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Maryam</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
