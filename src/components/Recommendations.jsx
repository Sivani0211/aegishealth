import React, { useState } from 'react';
import { Sparkles, Check, Plus, ShieldCheck, BookOpen, AlertCircle, Filter } from 'lucide-react';

export default function Recommendations({ recommendations, onAddToPlan, addedPlanIds = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Nutrition", "Physical Activity", "Mental Wellness", "Medical Screenings", "Habits"];

  const filteredRecs = activeCategory === "All" 
    ? recommendations 
    : recommendations.filter(r => r.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Clinical & Lifestyle Action Matrix
          </div>
          <h2 className="text-2xl font-bold">Personalized Preventive Recommendations</h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-2xl">
            Evidence-based interventions generated specifically for your age, BMI, vitals, habit profile, and hereditary risks.
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5" /> Filter:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      {filteredRecs.length === 0 ? (
        <div className="glass-card p-12 text-center text-[var(--text-muted)] space-y-2">
          <p className="text-sm font-semibold">No interventions currently flagged for this category.</p>
          <p className="text-xs">Your current profile data meets recommended baseline standards for this domain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecs.map(rec => {
            const isAdded = addedPlanIds.includes(rec.id);
            const isHighPriority = rec.priority === "High";

            return (
              <div 
                key={rec.id}
                className={`glass-card glass-card-hover p-6 flex flex-col justify-between space-y-4 border ${
                  isHighPriority ? 'border-amber-500/30' : 'border-[var(--border-color)]'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                      {rec.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isHighPriority ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {rec.priority} Priority
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ⚡ {rec.impact}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{rec.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rec.description}</p>
                  </div>
                </div>

                {/* Evidence Rationale Box & Add Button */}
                <div className="space-y-3 pt-3 border-t border-[var(--border-color)]">
                  <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-secondary)]">Clinical Rationale: </strong>
                      {rec.evidence}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToPlan(rec)}
                    disabled={isAdded}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:brightness-110 shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" /> Added to 7-Day Plan
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Add Action Item to 7-Day Micro Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
