import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, ShieldCheck, Heart, Zap } from 'lucide-react';

export default function AiChatAssistant({ profile, evaluation }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I am your AegisHealth AI Preventive Advisor. I have analyzed your profile (Age ${profile.age}, BMI ${evaluation.bmiInfo.bmi}, Cardiovascular Risk ${evaluation.scores.cardioRisk}%). How can I assist you today with preventive diet, exercise, or lifestyle habits?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "How can I reduce my work stress and lower burnout risk?",
    "What specific foods will help improve my metabolic risk score?",
    "What is Zone 2 cardio and how many minutes should I do?",
    "Why are my screening blood panels important for preventive health?",
    "How does 7.5 hours of sleep directly lower cortisol?"
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Append user message
    const userMsg = { sender: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI Contextual Response
    setTimeout(() => {
      const responseText = generateContextualAiResponse(text, profile, evaluation);
      setMessages(prev => [...prev, { sender: "ai", text: responseText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <Bot className="h-3.5 w-3.5" /> Contextual AI Preventive Advisor
          </div>
          <h2 className="text-2xl font-bold">Interactive Health Assistant</h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Ask questions about your risk scores, nutrition tweaks, exercise routines, or stress management strategies.
          </p>
        </div>
      </div>

      {/* Main Chat Interface Glass Card */}
      <div className="glass-card p-6 space-y-4 flex flex-col h-[520px]">
        
        {/* Messages Scroll Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`p-4 rounded-2xl max-w-[82%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none space-y-2'
              }`}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] p-2">
              <Bot className="h-4 w-4 text-cyan-400 animate-spin" />
              <span>Analyzing preventive health data...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="pt-2 border-t border-[var(--border-color)] flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[11px] text-[var(--text-muted)] font-semibold shrink-0">Suggestions:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 whitespace-nowrap transition-colors"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask your preventive health assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-input text-xs flex-1"
          />
          <button type="submit" className="btn-primary text-xs px-4">
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>

    </div>
  );
}

function generateContextualAiResponse(question, profile, evaluation) {
  const q = question.toLowerCase();

  if (q.includes("stress") || q.includes("burnout")) {
    return `Based on your reported daily stress score (${profile.stressLevel}/10) and ${profile.sleepHours}h of nightly sleep, your Burnout Risk is estimated at ${evaluation.scores.burnoutRisk}%. I recommend: 1) Practicing physiological sighing (2 quick inhales, 1 long exhale) for 5 minutes during afternoon peaks, and 2) Setting a strict digital curfew 45 minutes before sleep.`;
  }

  if (q.includes("food") || q.includes("diet") || q.includes("metabolic")) {
    return `With your current BMI of ${evaluation.bmiInfo.bmi} (${evaluation.bmiInfo.category}), transitioning away from refined carbohydrates towards an anti-inflammatory diet (leafy greens, extra virgin olive oil, wild salmon, avocados) will lower postprandial glucose spikes and target your ${evaluation.scores.metabolicRisk}% metabolic risk.`;
  }

  if (q.includes("zone 2") || q.includes("exercise") || q.includes("cardio")) {
    return `Zone 2 aerobic exercise is low-intensity steady effort (where you can hold a conversation without gasping). Aim for 150 minutes per week (e.g., 30 mins, 5 days/wk). This builds mitochondrial density, lowers resting heart rate (currently ${profile.restingHeartRate} BPM), and directly reduces your ${evaluation.scores.cardioRisk}% cardiovascular risk.`;
  }

  if (q.includes("blood") || q.includes("screening") || q.includes("panel")) {
    return `Because family history includes ${profile.familyHistory?.join(', ') || 'standard baseline indicators'}, getting an advanced lipid panel (ApoB, hs-CRP) and HbA1c glycemic test allows early detection up to 5-10 years before clinical symptoms manifest.`;
  }

  if (q.includes("sleep") || q.includes("cortisol")) {
    return `Getting 7.5 to 8 hours of sleep allows your glymphatic system to clear brain metabolic waste and allows your sympathetic nervous system to down-regulate, reducing morning cortisol and blood pressure.`;
  }

  return `Great question regarding your health profile! Given your age of ${profile.age} and current preventive score of ${evaluation.scores.overallPreventiveScore}/100, focusing on consistent 150+ minutes of weekly physical activity, 2.5L hydration, and routine clinical screenings will give you the highest preventive longevity returns.`;
}
