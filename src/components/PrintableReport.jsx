import React from 'react';
import { X, Printer, Activity, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export default function PrintableReport({ profile, evaluation, onClose }) {
  const { bmiInfo, scores, recommendations, screeningTimeline } = evaluation;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card max-w-4xl w-full bg-[var(--bg-primary)] p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto border-cyan-500/40 relative">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold">Preventive Health Report Summary</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="btn-primary text-xs py-2 px-4"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY */}
        <div className="space-y-6 text-sm">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-cyan-500">AegisHealth Preventive Report</h1>
              <p className="text-xs text-gray-500">Personalized Preventive Healthcare Recommender</p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>Generated: {new Date().toLocaleDateString()}</p>
              <p>Patient Age: {profile.age} | Sex: {profile.gender}</p>
            </div>
          </div>

          {/* Demographics & Vitals Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-800/20 border border-[var(--border-color)]">
            <div>
              <span className="text-xs text-gray-400 font-medium">Height / Weight</span>
              <p className="font-bold">{profile.heightCm} cm / {profile.weightKg} kg</p>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">BMI</span>
              <p className="font-bold">{bmiInfo.bmi} ({bmiInfo.category})</p>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Resting HR</span>
              <p className="font-bold">{profile.restingHeartRate} BPM</p>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Exercise Volume</span>
              <p className="font-bold">{profile.exerciseMinutesWeek} mins/wk</p>
            </div>
          </div>

          {/* Risk Scores Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-base border-b border-gray-700 pb-1">1. Preventive Risk Index</h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10">
                <span className="text-xs text-gray-400">Preventive Index</span>
                <p className="text-2xl font-bold text-cyan-400">{scores.overallPreventiveScore}/100</p>
              </div>
              <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10">
                <span className="text-xs text-gray-400">Cardiovascular Risk</span>
                <p className="text-2xl font-bold text-rose-400">{scores.cardioRisk}%</p>
              </div>
              <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
                <span className="text-xs text-gray-400">Metabolic Risk</span>
                <p className="text-2xl font-bold text-amber-400">{scores.metabolicRisk}%</p>
              </div>
              <div className="p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10">
                <span className="text-xs text-gray-400">Burnout & Stress</span>
                <p className="text-2xl font-bold text-indigo-400">{scores.burnoutRisk}%</p>
              </div>
            </div>
          </div>

          {/* Priority Recommendations */}
          <div className="space-y-3">
            <h3 className="font-bold text-base border-b border-gray-700 pb-1">2. Target Clinical & Lifestyle Interventions</h3>
            <div className="space-y-2">
              {recommendations.map(rec => (
                <div key={rec.id} className="p-3 rounded-lg border border-gray-700 bg-slate-800/10">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-cyan-400">[{rec.category}] {rec.title}</span>
                    <span className="text-emerald-400">{rec.impact}</span>
                  </div>
                  <p className="text-xs text-gray-300">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Screening Roadmap */}
          <div className="space-y-3">
            <h3 className="font-bold text-base border-b border-gray-700 pb-1">3. Recommended Clinical Screening Schedule</h3>
            <ul className="text-xs space-y-1.5 list-disc pl-4 text-gray-300">
              {screeningTimeline.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.title}</strong> ({item.frequency}) — Status: <span className="text-cyan-400">{item.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-lg bg-gray-800/30 text-[10px] text-gray-400 text-center border border-gray-700">
            * Disclaimer: This report is generated by an AI Preventive Healthcare Recommender for educational and lifestyle optimization purposes. It does not constitute formal medical diagnosis or emergency clinical advice. Please review these insights with your licensed physician.
          </div>

        </div>

      </div>
    </div>
  );
}
