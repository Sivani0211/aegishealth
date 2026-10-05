/**
 * AI Personal Healthcare Recommender Engine
 * Analyzes age, habits, fitness metrics, stress level, and family medical history
 * to generate preventive scores, risk assessments, lifestyle modifications, and screening schedules.
 */

export function calculateBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return { bmi: 0, category: "Unknown", color: "#9ca3af" };
  }
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category = "Normal weight";
  let color = "#10b981"; // green

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#3b82f6"; // blue
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal weight";
    color = "#10b981"; // green
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    color = "#f59e0b"; // amber
  } else {
    category = "Obesity";
    color = "#ef4444"; // red
  }

  return { bmi, category, color };
}

export function evaluateHealthProfile(profile) {
  const {
    age = 30,
    gender = "male",
    heightCm = 175,
    weightKg = 70,
    sleepHours = 7,
    hydrationLiters = 2,
    dietType = "balanced",
    smoking = "never",
    alcohol = "never",
    screenHours = 6,
    activityLevel = "moderate",
    exerciseMinutesWeek = 150,
    restingHeartRate = 70,
    stressLevel = 5,
    sleepQuality = "moderate",
    familyHistory = []
  } = profile;

  const bmiInfo = calculateBMI(heightCm, weightKg);

  // 1. Cardiovascular Risk Score (0-100)
  let cardioRisk = 10;
  if (age > 45) cardioRisk += 10;
  if (age > 60) cardioRisk += 10;
  if (bmiInfo.bmi >= 25) cardioRisk += 10;
  if (bmiInfo.bmi >= 30) cardioRisk += 15;
  if (exerciseMinutesWeek < 150) cardioRisk += 15;
  if (exerciseMinutesWeek < 60) cardioRisk += 10;
  if (restingHeartRate > 75) cardioRisk += 10;
  if (restingHeartRate > 85) cardioRisk += 10;
  if (smoking === "regular") cardioRisk += 30;
  if (smoking === "occasional") cardioRisk += 15;
  if (stressLevel >= 7) cardioRisk += 12;
  if (familyHistory.includes("heart_disease")) cardioRisk += 18;
  if (familyHistory.includes("hypertension")) cardioRisk += 12;
  cardioRisk = Math.min(100, Math.max(5, cardioRisk));

  // 2. Metabolic Risk Score (0-100)
  let metabolicRisk = 10;
  if (bmiInfo.bmi >= 25) metabolicRisk += 20;
  if (bmiInfo.bmi >= 30) metabolicRisk += 20;
  if (dietType === "fast_food" || dietType === "processed") metabolicRisk += 25;
  if (hydrationLiters < 1.5) metabolicRisk += 10;
  if (activityLevel === "sedentary") metabolicRisk += 18;
  if (familyHistory.includes("diabetes")) metabolicRisk += 22;
  if (familyHistory.includes("hypertension")) metabolicRisk += 10;
  if (screenHours > 8) metabolicRisk += 8;
  metabolicRisk = Math.min(100, Math.max(5, metabolicRisk));

  // 3. Burnout & Stress Risk Score (0-100)
  let burnoutRisk = Math.min(100, stressLevel * 7.5);
  if (sleepHours < 6) burnoutRisk += 20;
  if (sleepHours < 5) burnoutRisk += 10;
  if (sleepQuality === "poor" || sleepQuality === "irregular") burnoutRisk += 15;
  if (screenHours > 9) burnoutRisk += 12;
  if (exerciseMinutesWeek < 60) burnoutRisk += 10;
  burnoutRisk = Math.min(100, Math.max(5, burnoutRisk));

  // Overall Preventive Score (0-100) -> Higher is better
  const weightedRisk = (cardioRisk * 0.35) + (metabolicRisk * 0.35) + (burnoutRisk * 0.30);
  const overallPreventiveScore = Math.max(10, Math.round(100 - (weightedRisk * 0.85)));

  // Risk Categories
  const getLevel = (score) => {
    if (score < 30) return { label: "Low Risk", color: "emerald", class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
    if (score < 60) return { label: "Moderate Risk", color: "amber", class: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
    return { label: "Elevated Risk", color: "rose", class: "bg-rose-500/10 text-rose-400 border-rose-500/30" };
  };

  // Generate Recommendations
  const recommendations = generateRecommendations(profile, bmiInfo, { cardioRisk, metabolicRisk, burnoutRisk });

  // Generate 7-Day Action Plan
  const actionPlan = generateActionPlan(profile, bmiInfo);

  // Generate Screening Timeline
  const screeningTimeline = generateScreeningTimeline(profile);

  return {
    bmiInfo,
    scores: {
      cardioRisk,
      cardioLevel: getLevel(cardioRisk),
      metabolicRisk,
      metabolicLevel: getLevel(metabolicRisk),
      burnoutRisk,
      burnoutLevel: getLevel(burnoutRisk),
      overallPreventiveScore
    },
    recommendations,
    actionPlan,
    screeningTimeline
  };
}

function generateRecommendations(profile, bmiInfo, risks) {
  const list = [];

  // Nutrition
  if (profile.dietType === "processed" || profile.dietType === "fast_food") {
    list.push({
      id: "rec_diet_whole",
      category: "Nutrition",
      priority: "High",
      title: "Transition to Anti-Inflammatory Whole Foods",
      description: "Replace processed items with complex carbs, leafy greens, berries, and omega-3 fatty acids to reduce metabolic inflammation.",
      impact: "+12% Preventive Score",
      evidence: "Mediterranean and whole-food plant-rich diets reduce cardiovascular risk by up to 30%."
    });
  }

  if (profile.hydrationLiters < 2.0) {
    list.push({
      id: "rec_hydration",
      category: "Nutrition",
      priority: "Medium",
      title: "Increase Daily Hydration to 2.5 Liters",
      description: "Set a hydration schedule: drink 500ml upon waking and maintain steady water intake to improve vascular elasticity and kidney function.",
      impact: "+5% Preventive Score",
      evidence: "Proper hydration optimizes blood volume and reduces resting heart rate strain."
    });
  }

  // Fitness
  if (profile.exerciseMinutesWeek < 150) {
    list.push({
      id: "rec_cardio_zone2",
      category: "Physical Activity",
      priority: "High",
      title: "Build 150 Mins/Week Zone 2 Aerobic Base",
      description: "Incorporate 30 minutes of brisk walking, cycling, or swimming 5 days a week at a conversational pace.",
      impact: "+18% Preventive Score",
      evidence: "150 minutes of moderate aerobic exercise per week drastically reduces all-cause mortality."
    });
  }

  if (profile.activityLevel === "sedentary" || profile.screenHours > 8) {
    list.push({
      id: "rec_movement_breaks",
      category: "Habits",
      priority: "High",
      title: "Implement 3-Minute Hourly Ergonomic Movement Breaks",
      description: "Perform posture resets, light standing squats, or shoulder retractions every 60 minutes of desk work.",
      impact: "+8% Preventive Score",
      evidence: "Breaking up sedentary periods lowers postprandial glucose spikes and vascular stiffness."
    });
  }

  // Sleep & Mental Health
  if (profile.sleepHours < 7 || profile.sleepQuality === "poor") {
    list.push({
      id: "rec_sleep_hygiene",
      category: "Mental Wellness",
      priority: "High",
      title: "Optimize Sleep Window & Circadian Rhythm",
      description: "Establish a strict 7.5 to 8-hour sleep window. Cease blue light exposure 60 minutes before bed and keep bedroom temperature around 67°F (19°C).",
      impact: "+15% Preventive Score",
      evidence: "Chronic sleep under 6 hours correlates with elevated cortisol and insulin resistance."
    });
  }

  if (profile.stressLevel >= 7) {
    list.push({
      id: "rec_stress_downregulation",
      category: "Mental Wellness",
      priority: "High",
      title: "Daily 10-Minute Autonomic Down-Regulation",
      description: "Practice physiological sigh breathing or box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) during mid-day stress peaks.",
      impact: "+10% Preventive Score",
      evidence: "Targeted breathwork stimulates the vagus nerve and rapidly reduces heart rate variability stress indicators."
    });
  }

  // Clinical & Screenings
  if (profile.familyHistory.includes("diabetes") || bmiInfo.bmi >= 25) {
    list.push({
      id: "rec_screening_hba1c",
      category: "Medical Screenings",
      priority: "High",
      title: "Schedule Preventive HbA1c & Fasting Insulin Panel",
      description: "Request a comprehensive metabolic blood panel from your physician to baseline early glycemic biomarkers before prediabetes develops.",
      impact: "Early Detection Shield",
      evidence: "Fasting insulin highlights insulin resistance up to 10 years before elevated fasting glucose appears."
    });
  }

  if (profile.familyHistory.includes("heart_disease") || profile.restingHeartRate > 75) {
    list.push({
      id: "rec_screening_lipid",
      category: "Medical Screenings",
      priority: "High",
      title: "Advanced Lipid Panel (ApoB & Lp(a) & hs-CRP)",
      description: "Discuss an advanced cardiovascular marker test with your physician to evaluate true atherogenic particle count.",
      impact: "Early Detection Shield",
      evidence: "ApoB measures total atherogenic particles far more accurately than basic LDL-C alone."
    });
  }

  return list;
}

function generateActionPlan(profile, bmiInfo) {
  return [
    {
      day: 1,
      title: "Hydration & Sleep Protocol Launch",
      tasks: [
        "Drink 500ml water immediately upon waking",
        "Set phone blue light filter / Night Shift mode at 8:00 PM",
        "Log baseline mood and energy level"
      ]
    },
    {
      day: 2,
      title: "Cardiovascular Movement Spark",
      tasks: [
        "Take a brisk 20-minute post-lunch walk",
        "Perform 3 micro-movement breaks during computer hours",
        "Swap 1 sugary/processed snack for raw nuts or fruit"
      ]
    },
    {
      day: 3,
      title: "Stress Regulation & Breathwork",
      tasks: [
        "Complete 5 minutes of physiological sigh breathwork twice today",
        "Discontinue caffeine intake after 1:30 PM",
        "Maintain 2L minimum water goal"
      ]
    },
    {
      day: 4,
      title: "Metabolic Nutrition Alignment",
      tasks: [
        "Prepare a lunch centered on fiber, leafy greens, and lean protein",
        "Complete 25 minutes of continuous moderate exercise",
        "Avoid screen viewing 45 minutes prior to sleep"
      ]
    },
    {
      day: 5,
      title: "Ergonomics & Mental Reset",
      tasks: [
        "Audit posture and adjust desk height / screen angle",
        "Perform a 10-minute evening body scan meditation",
        "Review weekly hydration and sleep progress"
      ]
    },
    {
      day: 6,
      title: "Active Recovery & Nature Connection",
      tasks: [
        "Enjoy a 40-minute outdoor walk or recreational activity",
        "Prepare a nutrient-dense whole food dinner",
        "Log resting heart rate in the morning"
      ]
    },
    {
      day: 7,
      title: "Preventive Review & Milestone Check",
      tasks: [
        "Review 7-day habits and streak achievements",
        "Schedule any overdue routine blood panels or checkups",
        "Set new goals for the upcoming week"
      ]
    }
  ];
}

function generateScreeningTimeline(profile) {
  const age = profile.age || 30;
  const history = profile.familyHistory || [];

  const list = [
    {
      title: "Annual Comprehensive Metabolic & Blood Pressure Check",
      recommendedAge: "All adults (18+)",
      frequency: "Every 12 months",
      status: "Due Now",
      importance: "High",
      description: "Baselines resting blood pressure, fasting blood glucose, lipid panel, and kidney/liver functions."
    },
    {
      title: "Advanced Cardiovascular Marker Panel (ApoB, hs-CRP, Lp(a))",
      recommendedAge: age > 35 || history.includes("heart_disease") ? "Immediate" : "Age 35+",
      frequency: "Every 1 to 3 years",
      status: history.includes("heart_disease") ? "Recommended (Family Risk)" : "Upcoming",
      importance: history.includes("heart_disease") ? "Critical" : "Medium",
      description: "Detects subclinical vascular inflammation and precise particle risk."
    },
    {
      title: "HbA1c & Fasting Insulin Glycemic Screen",
      recommendedAge: age > 30 || history.includes("diabetes") ? "Immediate" : "Age 35+",
      frequency: "Every 12 months",
      status: history.includes("diabetes") ? "Recommended (Family Risk)" : "Standard",
      importance: "High",
      description: "Evaluates long-term blood sugar regulation and metabolic efficiency."
    },
    {
      title: "Colorectal Preventive Screening",
      recommendedAge: history.includes("colon_cancer") ? "Age 40 or 10 yrs prior to family onset" : "Age 45+",
      frequency: "Every 5-10 years based on modality",
      status: age >= 45 ? "Recommended Now" : "Future Milestone",
      importance: age >= 45 ? "High" : "Low",
      description: "Early detection of precancerous polyps and intestinal mucosal health."
    },
    {
      title: "Bone Density DEXA Scan & Vitamin D3/K2 Panel",
      recommendedAge: age > 50 || profile.gender === "female" ? "Age 50+" : "Age 60+",
      frequency: "Every 2 years",
      status: age >= 50 ? "Recommended Now" : "Future Milestone",
      importance: "Medium",
      description: "Assesses skeletal strength, fracture risk, and calcification factors."
    }
  ];

  return list;
}

export function simulateWhatIf(currentProfile, adjustments) {
  // Create modified profile
  const modifiedProfile = {
    ...currentProfile,
    sleepHours: Math.min(10, Math.max(4, currentProfile.sleepHours + (adjustments.sleepDelta || 0))),
    exerciseMinutesWeek: Math.min(420, Math.max(0, currentProfile.exerciseMinutesWeek + (adjustments.exerciseDelta || 0))),
    stressLevel: Math.min(10, Math.max(1, currentProfile.stressLevel + (adjustments.stressDelta || 0))),
    hydrationLiters: Math.min(4, Math.max(0.5, currentProfile.hydrationLiters + (adjustments.hydrationDelta || 0))),
    dietType: adjustments.dietUpgraded ? "mediterranean" : currentProfile.dietType
  };

  const currentEval = evaluateHealthProfile(currentProfile);
  const simulatedEval = evaluateHealthProfile(modifiedProfile);

  const scoreDiff = simulatedEval.scores.overallPreventiveScore - currentEval.scores.overallPreventiveScore;
  const cardioDiff = currentEval.scores.cardioRisk - simulatedEval.scores.cardioRisk;
  const metabolicDiff = currentEval.scores.metabolicRisk - simulatedEval.scores.metabolicRisk;
  const burnoutDiff = currentEval.scores.burnoutRisk - simulatedEval.scores.burnoutRisk;

  return {
    currentEval,
    simulatedEval,
    modifiedProfile,
    deltas: {
      scoreDiff,
      cardioDiff,
      metabolicDiff,
      burnoutDiff
    }
  };
}
