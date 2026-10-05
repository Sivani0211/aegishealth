import React from 'react';
import { Calendar, Stethoscope, AlertCircle, Clock, ShieldCheck, FileText } from 'lucide-react';

export default function ScreeningTimeline({ timeline, profile }) {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <Calendar className="h-3.5 w-3.5" /> Age & Genetic Risk Tailored Roadmap
          </div>
          <h2 className="text-2xl font-bold">Preventive Medical Screening Schedule</h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Routine clinical checkups and lab biomarker panels recommended based on your current age ({profile.age} yrs), biological sex, and family history.
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 pl-6 md:pl-8 space-y-8 py-2">
        {timeline.map((item, index) => {
          const isDue = item.status.includes("Now") || item.status.includes("Recommended");
          
          return (
            <div key={index} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className={`absolute -left-[35px] md:-left-[43px] top-1.5 h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                isDue
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border-color)]'
              }`}>
                {index + 1}
              </div>

              {/* Timeline Card */}
              <div className="glass-card p-6 border-[var(--border-color)] hover:border-cyan-500/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    isDue ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}>
                    ● {item.status}
                  </span>
                  
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" /> {item.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Stethoscope className="h-3.5 w-3.5 text-cyan-400" /> Target: {item.recommendedAge}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
