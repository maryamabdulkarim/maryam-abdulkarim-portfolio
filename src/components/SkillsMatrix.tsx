import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, Code2, Palette, Database, ShieldCheck } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Code2 className="w-4 h-4 text-amber-400" />;
      case 1:
        return <Palette className="w-4 h-4 text-purple-400" />;
      case 2:
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 3:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-amber-400" />;
    }
  };

  const activeCategory = SKILL_CATEGORIES[selectedCategoryIndex];

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
            <span aria-hidden="true">/</span>
            <span>STACK & DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Skills & Craftsmanship
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl font-light">
            A comprehensive matrix of technologies, methodologies, and domain proficiencies honed through years of software engineering, UI design, and academic research.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategoryIndex(idx)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                selectedCategoryIndex === idx
                  ? 'bg-neutral-900 border-amber-400/80 shadow-lg shadow-amber-400/5'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                {getCategoryIcon(idx)}
                <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-400 truncate mt-0.5">
                  {cat.skills.length} core proficiencies
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Skills List Panel */}
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                {getCategoryIcon(selectedCategoryIndex)}
                <span>{activeCategory.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {activeCategory.subtitle}
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Verified Production Proficiency
            </span>
          </div>

          {/* Grid of detailed skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 space-y-2 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-semibold text-white">
                    {skill.name}
                  </h4>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                    {skill.level}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {skill.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-neutral-850">
                  <span>Experience</span>
                  <span className="text-neutral-400">{skill.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
