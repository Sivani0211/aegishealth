import React from 'react';
import { Activity, ShieldCheck, Sliders, CheckSquare, Calendar, Bot, Sun, Moon, Printer, Sparkles, UserCheck } from 'lucide-react';
import { PRESET_PROFILES } from '../data/presets';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  onLoadPreset, 
  onOpenPrintModal,
  currentProfileTitle
}) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              AegisHealth <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">Preventive AI</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">Personalized Preventive Healthcare Recommender</p>
          </div>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2 bg-[var(--bg-card)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs">
          <UserCheck className="h-4 w-4 text-cyan-400" />
          <span className="text-[var(--text-secondary)] font-medium">Quick Preset:</span>
          <select
            onChange={(e) => {
              const selected = PRESET_PROFILES.find(p => p.id === e.target.value);
              if (selected) onLoadPreset(selected);
            }}
            className="bg-transparent text-[var(--text-primary)] font-semibold outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Load Demo Profile...</option>
            {PRESET_PROFILES.map(preset => (
              <option key={preset.id} value={preset.id} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                {preset.title} ({preset.age}y)
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPrintModal}
            className="btn-secondary text-xs py-1.5 px-3"
            title="Export Preventive Health Report for Doctor Visit"
          >
            <Printer className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline">Export Doctor Report</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-cyan-400 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-[var(--border-color)] flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        <TabButton 
          id="profiler" 
          label="Health Profiler" 
          icon={<Activity className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <TabButton 
          id="dashboard" 
          label="Risk Scorecard" 
          icon={<ShieldCheck className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <TabButton 
          id="simulator" 
          label="What-If Simulator" 
          icon={<Sliders className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          badge="Live"
        />
        <TabButton 
          id="recommendations" 
          label="Action Matrix" 
          icon={<Sparkles className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <TabButton 
          id="actionplan" 
          label="7-Day Micro Plan" 
          icon={<CheckSquare className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <TabButton 
          id="screenings" 
          label="Screening Timeline" 
          icon={<Calendar className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <TabButton 
          id="advisor" 
          label="AI Assistant" 
          icon={<Bot className="h-4 w-4" />} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
    </header>
  );
}

function TabButton({ id, label, icon, activeTab, setActiveTab, badge }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm' 
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] border border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 font-bold rounded border border-emerald-500/30">
          {badge}
        </span>
      )}
    </button>
  );
}
