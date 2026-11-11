import React, { useState, useEffect } from 'react';
import { Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractivePlayground } from './components/InteractivePlayground';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portfolio-theme') !== 'light';
    } catch {
      return true;
    }
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('portfolio-theme', 'light');
      }
    } catch {
      // localStorage fallback
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-950 text-neutral-100'}`}>
      
      {/* Navigation */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main>
        {/* Split-screen Hero with Maryam's photo and metrics */}
        <Hero
          onOpenContact={handleOpenContact}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Selected Works Showcase (Bento & Editorial List view) */}
        <ProjectShowcase
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Craft Sandbox (Fintech FX & AMR Health Matrix) */}
        <InteractivePlayground />

        {/* Categorized Skills & Capabilities */}
        <SkillsMatrix />

        {/* Professional Career Journey & TIIDELab Fellowship */}
        <ExperienceTimeline />

        {/* Biography & Scientific Perspective */}
        <AboutSection
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Colleague & Mentor Endorsements */}
        <TestimonialsSection />

        {/* Contact, Message Composer & Professional Links */}
        <ContactSection
          onOpenResume={() => setResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

    </div>
  );
}
