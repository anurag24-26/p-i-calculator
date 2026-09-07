export type WeightUnit = "kg" | "lbs";

export type FitnessGoal =
  | "muscle-building"
  | "fat-loss"
  | "endurance"
  | "maintenance";

export type ActivityLevel =
  | "sedentary"
  | "lightly-active"
  | "moderately-active"
  | "very-active"
  | "extremely-active";

export type DietaryPreference = "omnivore" | "vegetarian" | "vegan";

export interface CalculatorInputs {
  weight: number | null;
  unit: WeightUnit;
  goal: FitnessGoal;
  activity: ActivityLevel;
  bodyFatEnabled: boolean;
  bodyFat: number | null;
  meals: number;
  diet: DietaryPreference;
}

export interface ProteinResult {
  target: number;
  low: number;
  high: number;
  multiplier: number;
  baseline: number;
  weightKg: number;
  leanMassKg: number | null;
  usedLeanMass: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  proteinPer100g: number;
  unitLabel: string; // e.g. "egg", "100g"
  gramsPerUnit: number; // grams represented by one "unit" (100 for per-100g foods)
  diets: DietaryPreference[];
}

export interface MealPortion {
  label: string;
  grams: number;
}
