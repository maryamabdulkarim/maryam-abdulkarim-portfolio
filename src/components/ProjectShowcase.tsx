import React, { useState } from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { ArrowUpRight, Grid3X3, List, Layers, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'bento' | 'list'>('bento');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const categories = ['All', 'HealthTech', 'Fintech', 'EdTech', 'Developer Tools'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="works" className="py-24 md:py-32 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Section Header with Robin Noguier / Layor Salami style clean typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SELECTED ARCHIVES</span>
              <span aria-hidden="true">/</span>
              <span>2024 — 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Featured Case Studies
            </h2>
            <p className="text-base text-neutral-400 max-w-xl font-light">
              Explore production applications built with high engineering discipline, responsive design systems, and measured user impact.
            </p>
          </div>

          {/* Controls: Filter tabs & View Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Functional Category Filter Segmented Control */}
            <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
              <button
                onClick={() => setViewMode('bento')}
                aria-label="Grid layout"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'bento' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List layout"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* View Mode 1: Bento Grid Layout */}
        {viewMode === 'bento' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 overflow-hidden shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category & Year Stamp */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-mono text-neutral-200 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-800">
                    <span className="text-amber-400 font-semibold">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Corner Trigger Action */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 group-hover:text-amber-400 group-hover:bg-neutral-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Unboxed Metadata & Tech Tags (No generic pill wrappers) */}
                  <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {tIdx < 3 && <span aria-hidden="true" className="text-neutral-700">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Impact Metric Snapshot */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-neutral-400 font-mono">
                        Key Metric: <strong className="text-white font-semibold">{project.impactMetrics[0]?.label}</strong>
                      </span>
                      <span className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                        {project.impactMetrics[0]?.value}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View Mode 2: Editorial Work Index (Robin Noguier style with interactive hover preview) */}
        {viewMode === 'list' && (
          <div
            onMouseMove={handleMouseMove}
            className="relative border-t border-neutral-800 divide-y divide-neutral-800/80"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onSelectProject(project)}
                className="group py-6 px-4 -mx-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-900/60 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-mono text-neutral-500 w-16 tabular-nums">
                    {project.year.split(' ')[0]}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-light mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-xs font-mono text-neutral-400">
                  <span className="text-neutral-300">{project.category}</span>
                  <span className="hidden lg:inline-block text-neutral-500">{project.role}</span>
                  <div className="flex items-center gap-1.5 text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}

            {/* Robin Noguier style Floating Cursor Image Preview */}
            {hoveredProject && (
              <div
                className="pointer-events-none fixed z-40 hidden md:block w-72 h-44 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 bg-neutral-950 transition-opacity duration-200"
                style={{
                  top: cursorPos.y + 16,
                  left: cursorPos.x + 24,
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs font-semibold text-white truncate">
                    {hoveredProject.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
