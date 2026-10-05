import React from 'react';
import { ShieldCheck, Heart, Flame, Activity, ArrowUpRight, AlertTriangle, CheckCircle, Sliders, Sparkles } from 'lucide-react';

export default function RiskScorecard({ evaluation, onNavigateTab }) {
  const { scores, bmiInfo } = evaluation;
  const { cardioRisk, cardioLevel, metabolicRisk, metabolicLevel, burnoutRisk, burnoutLevel, overallPreventiveScore } = scores;

  // Determine overall status text
  let statusText = "Optimal Preventive Health";
  let statusColor = "text-emerald-400";
  let statusBorder = "border-emerald-500/30 bg-emerald-500/10";
  if (overallPreventiveScore < 60) {
    statusText = "Action Recommended";
    statusColor = "text-rose-400";
    statusBorder = "border-rose-500/30 bg-rose-500/10";
  } else if (overallPreventiveScore < 80) {
    statusText = "Moderate Preventive Margin";
    statusColor = "text-amber-400";
    statusBorder = "border-amber-500/30 bg-amber-500/10";
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Top Main Score Banner */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Animated Score Circle */}
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="currentColor"
              strokeWidth="10"
              className="circle-chart-background"
            />
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`${(overallPreventiveScore / 100) * 377} 377`}
              strokeLinecap="round"
              className="circle-chart-circle text-cyan-400"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold tracking-tight gradient-text-cyan">{overallPreventiveScore}</span>
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Preventive Index</span>
          </div>
        </div>

        {/* Overview & Key Indicators */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBorder} ${statusColor}`}>
              ● {statusText}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              BMI: {bmiInfo.bmi} ({bmiInfo.category})
            </span>
          </div>
          <h2 className="text-2xl font-bold">Personalized Preventive Health Scorecard</h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            This scorecard synthesizes your physical viles, daily sleep/hydration habits, stress factors, and family history to estimate sub-clinical risk patterns.
          </p>
        </div>

        {/* Quick Simulator CTA */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button
            onClick={() => onNavigateTab("simulator")}
            className="btn-primary w-full justify-center text-xs py-2.5"
          >
            <Sliders className="h-4 w-4" /> Simulate What-If Scenarios
          </button>
          <button
            onClick={() => onNavigateTab("recommendations")}
            className="btn-secondary w-full justify-center text-xs py-2.5"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" /> View Preventive Action Items
          </button>
        </div>
      </div>

      {/* 3 Core Health Risk Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: CARDIOVASCULAR HEALTH */}
        <div className="glass-card glass-card-hover p-6 border-rose-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Heart className="h-6 w-6" />
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${cardioLevel.class}`}>
              {cardioLevel.label}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold">Cardiovascular Health</h3>
            <p className="text-xs text-[var(--text-secondary)]">Vascular tone, resting strain & family risk factors.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Risk Score</span>
              <span className="text-rose-400 font-bold">{cardioRisk}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                style={{ width: `${cardioRisk}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] text-xs space-y-1.5 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Resting Heart Rate:</span>
              <span className="font-semibold text-[var(--text-primary)]">{scores.restingHeartRate || 72} BPM</span>
            </div>
            <div className="flex justify-between">
              <span>Cardio Minutes:</span>
              <span className="font-semibold text-[var(--text-primary)]">{scores.exerciseMinutesWeek || 0} mins/wk</span>
            </div>
          </div>
        </div>

        {/* CARD 2: METABOLIC HEALTH */}
        <div className="glass-card glass-card-hover p-6 border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity className="h-6 w-6" />
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${metabolicLevel.class}`}>
              {metabolicLevel.label}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold">Metabolic & Glycemic Index</h3>
            <p className="text-xs text-[var(--text-secondary)]">Insulin sensitivity, weight ratio & nutritional quality.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Risk Score</span>
              <span className="text-amber-400 font-bold">{metabolicRisk}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                style={{ width: `${metabolicRisk}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] text-xs space-y-1.5 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>BMI Status:</span>
              <span className="font-semibold text-[var(--text-primary)]">{bmiInfo.bmi} ({bmiInfo.category})</span>
            </div>
            <div className="flex justify-between">
              <span>Hydration:</span>
              <span className="font-semibold text-[var(--text-primary)]">{scores.hydrationLiters || 2} L/day</span>
            </div>
          </div>
        </div>

        {/* CARD 3: BURNOUT & MENTAL STRESS */}
        <div className="glass-card glass-card-hover p-6 border-indigo-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Flame className="h-6 w-6" />
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${burnoutLevel.class}`}>
              {burnoutLevel.label}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold">Burnout & Sleep Stress</h3>
            <p className="text-xs text-[var(--text-secondary)]">Cortisol load, sleep restoration & mental fatigue.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Risk Score</span>
              <span className="text-indigo-400 font-bold">{burnoutRisk}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                style={{ width: `${burnoutRisk}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] text-xs space-y-1.5 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Nightly Sleep:</span>
              <span className="font-semibold text-[var(--text-primary)]">{scores.sleepHours || 7} hrs</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Stress Rating:</span>
              <span className="font-semibold text-[var(--text-primary)]">{scores.stressLevel || 5}/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Health Takeaway Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Primary Health Risk Drivers */}
        <div className="glass-card p-5 border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
            <AlertTriangle className="h-4 w-4" /> Primary Preventive Focus Drivers
          </div>
          <ul className="text-xs text-[var(--text-secondary)] space-y-2">
            {cardioRisk > 40 && (
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Sub-optimal aerobic exercise volume (&lt;150 mins/week) increases vascular strain.</span>
              </li>
            )}
            {metabolicRisk > 40 && (
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Higher metabolic risk due to diet or BMI elevated beyond normal range (18.5 - 24.9).</span>
              </li>
            )}
            {burnoutRisk > 40 && (
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Sleep deficit / elevated daily stress rating drives autonomic nervous strain.</span>
              </li>
            )}
            {cardioRisk <= 40 && metabolicRisk <= 40 && burnoutRisk <= 40 && (
              <li className="flex items-start gap-2 text-emerald-400 font-semibold">
                <span>✓</span>
                <span>No critical acute risk drivers detected. Focus on maintaining routine preventive habits.</span>
              </li>
            )}
          </ul>
        </div>

        {/* Positive Preventive Factors */}
        <div className="glass-card p-5 border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
            <CheckCircle className="h-4 w-4" /> Positive Lifestyle Strengths
          </div>
          <ul className="text-xs text-[var(--text-secondary)] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Proactive engagement in preventive profile assessment and health monitoring.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Screening timeline active to catch asymptomatic metabolic or cardiac biomarkers early.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
