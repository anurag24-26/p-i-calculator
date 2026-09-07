import type {
  ActivityLevel,
  CalculatorInputs,
  FitnessGoal,
  MealPortion,
  ProteinResult,
} from "@/types";

export const BASELINE_G_PER_KG = 0.8;

const KG_PER_LB = 0.45359237;

export function lbsToKg(lbs: number): number {
  return lbs * KG_PER_LB;
}

export function kgToLbs(kg: number): number {
  return kg / KG_PER_LB;
}

export interface GoalRange {
  low: number;
  high: number;
  label: string;
  description: string;
}

export const GOAL_RANGES: Record<FitnessGoal, GoalRange> = {
  "muscle-building": {
    low: 1.6,
    high: 2.2,
    label: "Muscle Building",
    description:
      "Prioritizes muscle growth and recovery from resistance training.",
  },
  "fat-loss": {
    low: 1.6,
    high: 2.2,
    label: "Fat Loss / Cutting",
    description:
      "Higher protein helps preserve lean mass while eating in a calorie deficit.",
  },
  endurance: {
    low: 1.4,
    high: 1.6,
    label: "Endurance / Athletic Performance",
    description:
      "Supports recovery from sustained cardio and endurance training.",
  },
  maintenance: {
    low: 1.0,
    high: 1.4,
    label: "General Health / Maintenance",
    description: "A general target for staying healthy and active.",
  },
};

export interface ActivityInfo {
  label: string;
  description: string;
  /** 0 = low end of goal range, 1 = high end of goal range */
  position: number;
}

export const ACTIVITY_LEVELS: Record<ActivityLevel, ActivityInfo> = {
  sedentary: {
    label: "Sedentary",
    description: "Little to no regular exercise.",
    position: 0,
  },
  "lightly-active": {
    label: "Lightly Active",
    description: "Light exercise 1–3 days a week.",
    position: 0.25,
  },
  "moderately-active": {
    label: "Moderately Active",
    description: "Moderate exercise 3–5 days a week.",
    position: 0.5,
  },
  "very-active": {
    label: "Very Active",
    description: "Hard exercise 6–7 days a week.",
    position: 0.75,
  },
  "extremely-active": {
    label: "Extremely Active",
    description: "Physical job or twice-daily training.",
    position: 1,
  },
};

/** Round to the nearest whole gram, never below the baseline. */
function roundGrams(value: number): number {
  return Math.max(0, Math.round(value));
}

export function calculateProtein(inputs: CalculatorInputs): ProteinResult | null {
  if (inputs.weight === null || inputs.weight <= 0) return null;

  const weightKg =
    inputs.unit === "kg" ? inputs.weight : lbsToKg(inputs.weight);

  const range = GOAL_RANGES[inputs.goal];
  const activity = ACTIVITY_LEVELS[inputs.activity];

  // Activity level nudges the target within the goal's range.
  const multiplier = range.low + (range.high - range.low) * activity.position;

  const usedLeanMass =
    inputs.bodyFatEnabled &&
    inputs.bodyFat !== null &&
    inputs.bodyFat > 0 &&
    inputs.bodyFat < 70;

  const leanMassKg = usedLeanMass
    ? weightKg * (1 - (inputs.bodyFat as number) / 100)
    : null;

  // Use lean mass as the reference basis only when body fat is notably
  // high or low, since it meaningfully changes the estimate then.
  const referenceMassKg =
    usedLeanMass && leanMassKg !== null && (inputs.bodyFat! > 28 || inputs.bodyFat! < 10)
      ? leanMassKg
      : weightKg;

  const target = roundGrams(referenceMassKg * multiplier);
  const low = roundGrams(referenceMassKg * range.low);
  const high = roundGrams(referenceMassKg * range.high);
  const baseline = roundGrams(weightKg * BASELINE_G_PER_KG);

  return {
    target,
    low,
    high,
    multiplier: Math.round(multiplier * 100) / 100,
    baseline,
    weightKg: Math.round(weightKg * 10) / 10,
    leanMassKg: leanMassKg !== null ? Math.round(leanMassKg * 10) / 10 : null,
    usedLeanMass: referenceMassKg === leanMassKg,
  };
}

/** Split a daily protein target across meals with practical, rounded portions. */
export function splitIntoMeals(targetGrams: number, meals: number): MealPortion[] {
  if (meals <= 0) return [];

  const labels5 = ["Breakfast", "Lunch", "Snack", "Dinner", "Evening Snack"];
  const labels4 = ["Breakfast", "Lunch", "Snack", "Dinner"];
  const labels3 = ["Breakfast", "Lunch", "Dinner"];
  const labels2 = ["Lunch", "Dinner"];
  const labels6 = [
    "Breakfast",
    "Mid-Morning",
    "Lunch",
    "Snack",
    "Dinner",
    "Evening Snack",
  ];

  const labelSets: Record<number, string[]> = {
    2: labels2,
    3: labels3,
    4: labels4,
    5: labels5,
    6: labels6,
  };

  const labels =
    labelSets[meals] ??
    Array.from({ length: meals }, (_, i) => `Meal ${i + 1}`);

  const base = Math.floor(targetGrams / meals);
  const remainder = targetGrams - base * meals;

  return labels.map((label, i) => ({
    label,
    // Distribute the rounding remainder across the first few meals so the
    // displayed amounts sum to (approximately) the daily target.
    grams: base + (i < remainder ? 1 : 0),
  }));
}

export function formatMultiplier(multiplier: number): string {
  return `${multiplier.toFixed(2)} g/kg`;
}

export function validateWeight(
  value: string,
  unit: "kg" | "lbs"
): { valid: boolean; message?: string; parsed: number | null } {
  if (value.trim() === "") {
    return { valid: false, message: "Please enter your body weight.", parsed: null };
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return { valid: false, message: "Weight must be a number.", parsed: null };
  }
  if (parsed <= 0) {
    return { valid: false, message: "Weight must be greater than zero.", parsed: null };
  }
  const min = unit === "kg" ? 20 : 44;
  const max = unit === "kg" ? 300 : 660;
  if (parsed < min || parsed > max) {
    return {
      valid: false,
      message: `Enter a weight between ${min}–${max} ${unit}.`,
      parsed,
    };
  }
  return { valid: true, parsed };
}

export function validateBodyFat(
  value: string
): { valid: boolean; message?: string; parsed: number | null } {
  if (value.trim() === "") {
    return { valid: true, parsed: null };
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return { valid: false, message: "Body fat must be a number.", parsed: null };
  }
  if (parsed < 3 || parsed > 60) {
    return {
      valid: false,
      message: "Enter a body fat percentage between 3–60%.",
      parsed,
    };
  }
  return { valid: true, parsed };
}

export function convertWeightValue(
  value: number | null,
  from: "kg" | "lbs",
  to: "kg" | "lbs"
): number | null {
  if (value === null || from === to) return value;
  const kg = from === "kg" ? value : lbsToKg(value);
  const converted = to === "kg" ? kg : kgToLbs(kg);
  return Math.round(converted * 10) / 10;
}
