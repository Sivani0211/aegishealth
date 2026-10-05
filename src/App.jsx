import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HealthForm from './components/HealthForm';
import RiskScorecard from './components/RiskScorecard';
import WhatIfSimulator from './components/WhatIfSimulator';
import Recommendations from './components/Recommendations';
import ActionPlan from './components/ActionPlan';
import ScreeningTimeline from './components/ScreeningTimeline';
import AiChatAssistant from './components/AiChatAssistant';
import PrintableReport from './components/PrintableReport';

import { evaluateHealthProfile } from './utils/healthCalculator';
import { PRESET_PROFILES } from './data/presets';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('profiler');

  // Main Patient Health Profile State (defaults to Stressed Tech Worker preset)
  const [profile, setProfile] = useState(PRESET_PROFILES[0]);

  // Added Custom Tasks for 7-Day Plan
  const [addedPlanIds, setAddedPlanIds] = useState([]);
  const [customTasks, setCustomTasks] = useState([]);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Print Report Modal
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleProfileChange = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
  };

  const handleLoadPreset = (preset) => {
    setProfile(preset);
    showNotification(`Loaded demo profile: "${preset.title}"`);
  };

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Evaluate Current Health Profile
  const evaluation = evaluateHealthProfile(profile);

  const handleFormSubmit = () => {
    setActiveTab('dashboard');
    showNotification('Health evaluation completed! Risk scorecard ready.');
  };

  const handleAddToPlan = (rec) => {
    if (!addedPlanIds.includes(rec.id)) {
      setAddedPlanIds(prev => [...prev, rec.id]);
      
      // Add as custom action item to Day 1
      setCustomTasks(prev => [
        ...prev,
        { id: rec.id, day: 1, text: `[${rec.category}] ${rec.title}` }
      ]);
      
      showNotification(`Added "${rec.title}" to your 7-Day Plan!`);
    }
  };

  const handleAddCustomTask = (day, text) => {
    const newTask = { id: `custom_${Date.now()}`, day, text };
    setCustomTasks(prev => [...prev, newTask]);
    showNotification(`New goal added to Day ${day}!`);
  };

  const handleApplySimulatedProfile = (modifiedProfile) => {
    setProfile(modifiedProfile);
    setActiveTab('dashboard');
    showNotification('Simulated habit changes adopted into your active profile!');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-3 rounded-xl shadow-xl shadow-cyan-500/20 text-xs font-bold border border-cyan-400/40 animate-bounce">
          ⚡ {toast}
        </div>
      )}

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        onLoadPreset={handleLoadPreset}
        onOpenPrintModal={() => setShowPrintModal(true)}
        currentProfileTitle={profile.title || "Custom Profile"}
      />

      {/* Main Content Render */}
      <main className="flex-1 pb-12">
        {activeTab === 'profiler' && (
          <HealthForm
            profile={profile}
            onChange={handleProfileChange}
            onSubmit={handleFormSubmit}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activeTab === 'dashboard' && (
          <RiskScorecard
            evaluation={evaluation}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'simulator' && (
          <WhatIfSimulator
            profile={profile}
            onApplySimulatedProfile={handleApplySimulatedProfile}
          />
        )}

        {activeTab === 'recommendations' && (
          <Recommendations
            recommendations={evaluation.recommendations}
            onAddToPlan={handleAddToPlan}
            addedPlanIds={addedPlanIds}
          />
        )}

        {activeTab === 'actionplan' && (
          <ActionPlan
            actionPlan={evaluation.actionPlan}
            customTasks={customTasks}
            onAddCustomTask={handleAddCustomTask}
          />
        )}

        {activeTab === 'screenings' && (
          <ScreeningTimeline
            timeline={evaluation.screeningTimeline}
            profile={profile}
          />
        )}

        {activeTab === 'advisor' && (
          <AiChatAssistant
            profile={profile}
            evaluation={evaluation}
          />
        )}
      </main>

      {/* Printable Report Modal */}
      {showPrintModal && (
        <PrintableReport
          profile={profile}
          evaluation={evaluation}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="no-print border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 py-4 px-6 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AegisHealth AI — Preventive Healthcare Recommender</p>
          <p className="text-[11px]">Continuous preventive lifestyle advice based on age, habits, fitness & hereditary risk factors.</p>
        </div>
      </footer>

    </div>
  );
}
