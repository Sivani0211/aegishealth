import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp, ShieldCheck, Heart, Moon, Activity, ArrowRight, RefreshCw, Check } from 'lucide-react';
import { simulateWhatIf } from '../utils/healthCalculator';

export default function WhatIfSimulator({ profile, onApplySimulatedProfile }) {
  const [adjustments, setAdjustments] = useState({
    sleepDelta: 1.5,
    exerciseDelta: 90,
    stressDelta: -3,
    hydrationDelta: 1.0,
    dietUpgraded: true
  });

  const simulation = simulateWhatIf(profile, adjustments);
  const { currentEval, simulatedEval, modifiedProfile, deltas } = simulation;

  const resetSliders = () => {
    setAdjustments({
      sleepDelta: 0,
      exerciseDelta: 0,
      stressDelta: 0,
      hydrationDelta: 0,
      dietUpgraded: false
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <Sliders className="h-3.5 w-3.5" /> Live Interactive Simulator
          </div>
          <h2 className="text-2xl font-bold">"What-If" Health Impact Calculator</h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Adjust hypothetical lifestyle habit modifications below to visualize real-time improvements in your risk scores and preventive health index before committing.
          </p>
        </div>
        <button
          onClick={resetSliders}
          className="btn-secondary text-xs py-2 px-3 self-start md:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset Sliders
        </button>
      </div>

      {/* Main Grid: Controls Left, Realtime Comparison Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: SLIDER CONTROLS (7 Cols) */}
        <div className="lg:col-span-7 glass-card p-6 space-y-6">
          <h3 className="text-base font-bold border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" /> Hypothetical Habit Adjustments
          </h3>

          {/* Slider 1: Sleep */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Moon className="h-4 w-4" /> Sleep Increase
              </span>
              <span className="font-bold text-[var(--text-primary)]">
                +{adjustments.sleepDelta} hours/night (New Total: {(profile.sleepHours + adjustments.sleepDelta).toFixed(1)}h)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.5"
              value={adjustments.sleepDelta}
              onChange={(e) => setAdjustments({ ...adjustments, sleepDelta: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Slider 2: Exercise */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-rose-400">
                <Heart className="h-4 w-4" /> Aerobic Exercise Boost
              </span>
              <span className="font-bold text-[var(--text-primary)]">
                +{adjustments.exerciseDelta} mins/week (New Total: {profile.exerciseMinutesWeek + adjustments.exerciseDelta} mins)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="210"
              step="15"
              value={adjustments.exerciseDelta}
              onChange={(e) => setAdjustments({ ...adjustments, exerciseDelta: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Slider 3: Stress Reduction */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-400">
                <TrendingUp className="h-4 w-4 transform rotate-180" /> Daily Stress Reduction
              </span>
              <span className="font-bold text-[var(--text-primary)]">
                {adjustments.stressDelta} Points (New Level: {Math.max(1, profile.stressLevel + adjustments.stressDelta)}/10)
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="0"
              step="1"
              value={adjustments.stressDelta}
              onChange={(e) => setAdjustments({ ...adjustments, stressDelta: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Slider 4: Hydration */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Activity className="h-4 w-4" /> Extra Daily Hydration
              </span>
              <span className="font-bold text-[var(--text-primary)]">
                +{adjustments.hydrationDelta} L/day (New Total: {(profile.hydrationLiters + adjustments.hydrationDelta).toFixed(1)}L)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.25"
              value={adjustments.hydrationDelta}
              onChange={(e) => setAdjustments({ ...adjustments, hydrationDelta: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Checkbox: Upgrade Diet */}
          <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Upgrade to Whole-Food Mediterranean Diet</p>
              <p className="text-[11px] text-[var(--text-secondary)]">Replaces processed food with lean protein, high fiber & healthy fats.</p>
            </div>
            <input
              type="checkbox"
              checked={adjustments.dietUpgraded}
              onChange={(e) => setAdjustments({ ...adjustments, dietUpgraded: e.target.checked })}
              className="h-5 w-5 accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT: REALTIME COMPARISON (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Preventive Index Score Shift Card */}
          <div className="glass-card p-6 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border-cyan-500/40 text-center space-y-4">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Simulated Preventive Index</p>

            <div className="flex items-center justify-center gap-6">
              <div>
                <p className="text-xs text-[var(--text-muted)]">Current</p>
                <p className="text-3xl font-extrabold text-[var(--text-secondary)]">{currentEval.scores.overallPreventiveScore}</p>
              </div>

              <ArrowRight className="h-6 w-6 text-cyan-400 animate-pulse" />

              <div>
                <p className="text-xs text-emerald-400 font-bold">Simulated</p>
                <p className="text-4xl font-extrabold text-emerald-400">{simulatedEval.scores.overallPreventiveScore}</p>
              </div>
            </div>

            {/* Delta Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+{deltas.scoreDiff} Index Points Gain!</span>
            </div>
          </div>

          {/* Breakdown of Domain Risk Drops */}
          <div className="glass-card p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Predicted Domain Risk Reductions</h4>

            <div className="space-y-3">
              {/* Cardio */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-semibold">Cardiovascular Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[var(--text-muted)] line-through mr-2">{currentEval.scores.cardioRisk}%</span>
                  <span className="text-xs font-bold text-emerald-400">{simulatedEval.scores.cardioRisk}%</span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">-{deltas.cardioDiff}%</span>
                </div>
              </div>

              {/* Metabolic */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold">Metabolic Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[var(--text-muted)] line-through mr-2">{currentEval.scores.metabolicRisk}%</span>
                  <span className="text-xs font-bold text-emerald-400">{simulatedEval.scores.metabolicRisk}%</span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">-{deltas.metabolicDiff}%</span>
                </div>
              </div>

              {/* Burnout */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold">Burnout & Stress Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[var(--text-muted)] line-through mr-2">{currentEval.scores.burnoutRisk}%</span>
                  <span className="text-xs font-bold text-emerald-400">{simulatedEval.scores.burnoutRisk}%</span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">-{deltas.burnoutDiff}%</span>
                </div>
              </div>
            </div>

            {/* Apply Profile Button */}
            <button
              onClick={() => onApplySimulatedProfile(modifiedProfile)}
              className="btn-primary w-full justify-center text-xs py-2.5 mt-2"
            >
              <Check className="h-4 w-4" /> Adopt These Changes into My Profile
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
