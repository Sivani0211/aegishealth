import React, { useState } from 'react';
import { CheckSquare, Calendar, Award, Check, Plus, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ActionPlan({ actionPlan, customTasks = [], onAddCustomTask }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState({});
  const [newTaskInput, setNewTaskInput] = useState('');

  const currentDayData = actionPlan.find(d => d.day === selectedDay) || actionPlan[0];

  // Combine generated tasks with custom user tasks for selected day
  const dayCustomTasks = customTasks.filter(t => t.day === selectedDay);
  const allDayTasks = [
    ...currentDayData.tasks.map((t, idx) => ({ id: `gen_${selectedDay}_${idx}`, text: t })),
    ...dayCustomTasks.map(t => ({ id: t.id, text: t.text }))
  ];

  const handleTaskToggle = (taskId) => {
    const isNowChecked = !completedTasks[taskId];
    const newCompleted = { ...completedTasks, [taskId]: isNowChecked };
    setCompletedTasks(newCompleted);

    // Check if all tasks for selected day are completed
    const allChecked = allDayTasks.every(t => newCompleted[t.id]);
    if (allChecked && isNowChecked) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    onAddCustomTask(selectedDay, newTaskInput.trim());
    setNewTaskInput('');
  };

  // Calculate total completed tasks count across all days
  const totalCompletedCount = Object.values(completedTasks).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <CheckSquare className="h-3.5 w-3.5" /> Interactive Lifestyle Habit Tracker
          </div>
          <h2 className="text-2xl font-bold">7-Day Preventive Micro-Action Plan</h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Execute small daily micro-habits to build momentum towards long-term preventive health resilience.
          </p>
        </div>

        {/* Streak / Completion Counter */}
        <div className="flex items-center gap-3 bg-[var(--bg-card)] px-4 py-3 rounded-xl border border-[var(--border-color)]">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Completed Micro-Habits</p>
            <p className="text-lg font-bold text-amber-400">{totalCompletedCount} Tasks Done</p>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs (Day 1 - Day 7) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {actionPlan.map(d => {
          const isSelected = selectedDay === d.day;
          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`flex-1 min-w-[120px] p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-highlight)]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>Day {d.day}</span>
                {isSelected && <span className="text-cyan-400">● Active</span>}
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] truncate mt-1">{d.title}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Day Checklist Card */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Day {selectedDay} Target Protocol</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{currentDayData.title}</h3>
          </div>
          <div className="text-xs font-semibold text-[var(--text-secondary)]">
            {allDayTasks.filter(t => completedTasks[t.id]).length} / {allDayTasks.length} Completed
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {allDayTasks.map(task => {
            const isChecked = !!completedTasks[task.id];
            return (
              <div
                key={task.id}
                onClick={() => handleTaskToggle(task.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 line-through opacity-80'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-[var(--text-muted)]'
                  }`}>
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-medium">{task.text}</span>
                </div>

                {isChecked && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Accomplished!
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Custom Micro-Task Form */}
        <form onSubmit={handleCreateTask} className="flex gap-2 pt-4 border-t border-[var(--border-color)]">
          <input
            type="text"
            placeholder="Add custom micro-task for Day..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            className="form-input text-xs"
          />
          <button type="submit" className="btn-secondary text-xs whitespace-nowrap">
            <Plus className="h-4 w-4" /> Add Goal
          </button>
        </form>

      </div>

    </div>
  );
}
