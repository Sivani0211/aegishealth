import React, { useState } from 'react';
import { User, Heart, Moon, ShieldAlert, Sparkles, ArrowRight, ArrowLeft, CheckCircle, Scale, Zap, Info } from 'lucide-react';
import { calculateBMI } from '../utils/healthCalculator';
import { PRESET_PROFILES } from '../data/presets';

export default function HealthForm({ profile, onChange, onSubmit, onLoadPreset }) {
  const [step, setStep] = useState(1);
  const bmiInfo = calculateBMI(profile.heightCm, profile.weightKg);

  const handleFamilyHistoryToggle = (condition) => {
    const current = profile.familyHistory || [];
    const updated = current.includes(condition)
      ? current.filter(item => item !== condition)
      : [...current, condition];
    onChange({ familyHistory: updated });
  };

  const stepsCount = 5;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      
      {/* Preset Banner */}
      <div className="glass-card p-4 mb-6 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-indigo-900/20 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Want to test instantly?</h4>
            <p className="text-xs text-[var(--text-secondary)]">Click any pre-filled profile to populate data and see preventive recommendations immediately.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_PROFILES.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLoadPreset(preset)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-[var(--bg-card)] hover:border-cyan-400 border border-[var(--border-color)] font-medium text-[var(--text-primary)] transition-all"
            >
              ⚡ {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Glass Form Card */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] mb-2">
            <span>Step {step} of {stepsCount}</span>
            <span className="text-cyan-400">{Math.round((step / stepsCount) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / stepsCount) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-3 text-[11px] font-medium text-[var(--text-muted)] hidden sm:flex">
            <span className={step === 1 ? 'text-cyan-400 font-bold' : ''}>1. Demographics</span>
            <span className={step === 2 ? 'text-cyan-400 font-bold' : ''}>2. Habits & Lifestyle</span>
            <span className={step === 3 ? 'text-cyan-400 font-bold' : ''}>3. Fitness & Vitals</span>
            <span className={step === 4 ? 'text-cyan-400 font-bold' : ''}>4. Stress & Sleep</span>
            <span className={step === 5 ? 'text-cyan-400 font-bold' : ''}>5. Family History</span>
          </div>
        </div>

        {/* STEP 1: DEMOGRAPHICS */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <User className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold">1. Personal Demographics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Age (years)</label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={profile.age}
                  onChange={(e) => onChange({ age: parseInt(e.target.value) || 18 })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Biological Sex</label>
                <select
                  value={profile.gender}
                  onChange={(e) => onChange({ gender: e.target.value })}
                  className="form-input"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={profile.heightCm}
                  onChange={(e) => onChange({ heightCm: parseInt(e.target.value) || 170 })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={profile.weightKg}
                  onChange={(e) => onChange({ weightKg: parseInt(e.target.value) || 70 })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Live BMI Card */}
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-cyan-400" />
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">Calculated BMI Preview</p>
                  <p className="text-lg font-bold">
                    {bmiInfo.bmi} <span className="text-sm font-medium" style={{ color: bmiInfo.color }}>({bmiInfo.category})</span>
                  </p>
                </div>
              </div>
              <div className="text-xs text-right text-[var(--text-muted)] max-w-[200px]">
                Target Normal Range: 18.5 – 24.9 BMI
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: HABITS & LIFESTYLE */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold">2. Daily Lifestyle & Habits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Diet Pattern</label>
                <select
                  value={profile.dietType}
                  onChange={(e) => onChange({ dietType: e.target.value })}
                  className="form-input"
                >
                  <option value="balanced">Balanced / Whole Foods</option>
                  <option value="mediterranean">Mediterranean / High Fiber</option>
                  <option value="vegetarian">Vegetarian / Vegan</option>
                  <option value="processed">High Processed / Refined Carbs</option>
                  <option value="fast_food">Frequent Fast Food / Eating Out</option>
                </select>
              </div>

              <div>
                <label className="form-label">Daily Water Hydration (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="6"
                  value={profile.hydrationLiters}
                  onChange={(e) => onChange({ hydrationLiters: parseFloat(e.target.value) || 1 })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Smoking Habits</label>
                <select
                  value={profile.smoking}
                  onChange={(e) => onChange({ smoking: e.target.value })}
                  className="form-input"
                >
                  <option value="never">Never Smoked</option>
                  <option value="former">Former Smoker (Quit)</option>
                  <option value="occasional">Occasional / Vape</option>
                  <option value="regular">Regular Smoker</option>
                </select>
              </div>

              <div>
                <label className="form-label">Alcohol Consumption</label>
                <select
                  value={profile.alcohol}
                  onChange={(e) => onChange({ alcohol: e.target.value })}
                  className="form-input"
                >
                  <option value="never">Never / Rare</option>
                  <option value="occasional">Occasional (1-2 drinks/wk)</option>
                  <option value="moderate">Moderate (3-7 drinks/wk)</option>
                  <option value="frequent">Frequent (8+ drinks/wk)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Daily Screen Time (Hours/Day)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={profile.screenHours}
                    onChange={(e) => onChange({ screenHours: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm font-bold text-cyan-400 min-w-[60px]">{profile.screenHours} hrs/day</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FITNESS & VITALS */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Heart className="h-5 w-5 text-rose-400" />
              <h2 className="text-lg font-bold">3. Physical Fitness & Baseline Vitals</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">General Activity Level</label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) => onChange({ activityLevel: e.target.value })}
                  className="form-input"
                >
                  <option value="sedentary">Sedentary (Desk job, minimal movement)</option>
                  <option value="light">Lightly Active (Occasional walks)</option>
                  <option value="moderate">Moderately Active (Regular exercise 3-4x/wk)</option>
                  <option value="very_active">Very Active (Intense training / active labor)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Weekly Exercise Minutes (Moderate/Vigorous)</label>
                <input
                  type="number"
                  min="0"
                  max="600"
                  step="15"
                  value={profile.exerciseMinutesWeek}
                  onChange={(e) => onChange({ exerciseMinutesWeek: parseInt(e.target.value) || 0 })}
                  className="form-input"
                />
                <p className="text-[11px] text-[var(--text-muted)] mt-1">WHO standard recommendation: 150+ minutes/week.</p>
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Resting Heart Rate (BPM)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="110"
                    value={profile.restingHeartRate}
                    onChange={(e) => onChange({ restingHeartRate: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm font-bold text-rose-400 min-w-[70px]">{profile.restingHeartRate} BPM</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Normal baseline resting heart rate: 60 - 75 BPM.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: STRESS & SLEEP */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Moon className="h-5 w-5 text-indigo-400" />
              <h2 className="text-lg font-bold">4. Stress & Mental Wellness</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="form-label flex justify-between">
                  <span>Daily Stress Level (1 = Calm, 10 = Severe Burnout)</span>
                  <span className="text-indigo-400 font-bold">{profile.stressLevel} / 10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={profile.stressLevel}
                  onChange={(e) => onChange({ stressLevel: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Average Nightly Sleep (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="3"
                    max="12"
                    value={profile.sleepHours}
                    onChange={(e) => onChange({ sleepHours: parseFloat(e.target.value) || 7 })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Perceived Sleep Quality</label>
                  <select
                    value={profile.sleepQuality}
                    onChange={(e) => onChange({ sleepQuality: e.target.value })}
                    className="form-input"
                  >
                    <option value="good">Restful & Deep</option>
                    <option value="moderate">Moderate / Occasional Awakenings</option>
                    <option value="poor">Poor / Frequent Awakenings</option>
                    <option value="irregular">Irregular Shift Work Schedule</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: FAMILY MEDICAL HISTORY */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold">5. Family Medical History</h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Select conditions present in immediate family (parents, siblings, grandparents) to enable targeted preventive screenings.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: "heart_disease", label: "Cardiovascular / Heart Disease", icon: "🫀" },
                { id: "hypertension", label: "Hypertension / High BP", icon: "🩸" },
                { id: "diabetes", label: "Type 2 Diabetes", icon: "📉" },
                { id: "stroke", label: "Stroke / Cerebrovascular", icon: "🧠" },
                { id: "breast_cancer", label: "Oncology (Cancer History)", icon: "🎗️" },
                { id: "osteoporosis", label: "Osteoporosis / Joint Degeneration", icon: "🦴" }
              ].map(item => {
                const isSelected = (profile.familyHistory || []).includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFamilyHistoryToggle(item.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-highlight)]'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{isSelected ? '✓ Selected' : '+ Click to add'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="btn-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : <div />}

          {step < stepsCount ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="btn-primary"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="btn-primary bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/30"
            >
              <CheckCircle className="h-4 w-4" /> Generate Preventive Risk Scorecard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
