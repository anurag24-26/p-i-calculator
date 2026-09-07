import type { DietaryPreference, FoodItem } from "@/types";

export const FOODS: FoodItem[] = [
  {
    id: "chicken-breast",
    name: "Chicken breast",
    proteinPer100g: 31,
    unitLabel: "g",
    gramsPerUnit: 1,
    diets: ["omnivore"],
  },
  {
    id: "egg",
    name: "Eggs",
    proteinPer100g: 13,
    unitLabel: "large egg",
    gramsPerUnit: 50, // ~6g protein per 50g egg
    diets: ["omnivore", "vegetarian"],
  },
  {
    id: "salmon",
    name: "Salmon",
    proteinPer100g: 25,
    unitLabel: "g",
    gramsPerUnit: 1,
    diets: ["omnivore"],
  },
  {
    id: "greek-yogurt",
    name: "Greek yogurt",
    proteinPer100g: 10,
    unitLabel: "g",
    gramsPerUnit: 1,
    diets: ["omnivore", "vegetarian"],
  },
  {
    id: "tofu",
    name: "Tofu",
    proteinPer100g: 17,
    unitLabel: "g",
    gramsPerUnit: 1,
    diets: ["omnivore", "vegetarian", "vegan"],
  },
  {
    id: "lentils",
    name: "Lentils (cooked)",
    proteinPer100g: 9,
    unitLabel: "g cooked",
    gramsPerUnit: 1,
    diets: ["omnivore", "vegetarian", "vegan"],
  },
  {
    id: "chickpeas",
    name: "Chickpeas (cooked)",
    proteinPer100g: 9,
    unitLabel: "g cooked",
    gramsPerUnit: 1,
    diets: ["omnivore", "vegetarian", "vegan"],
  },
];

export function foodsForDiet(diet: DietaryPreference): FoodItem[] {
  return FOODS.filter((f) => f.diets.includes(diet));
}

/**
 * Approximate quantity of a food needed to reach a protein target.
 * Returns the amount in the food's natural unit (grams, or count for eggs).
 */
export function quantityForTarget(food: FoodItem, targetGrams: number): number {
  const proteinPerUnit = (food.proteinPer100g / 100) * food.gramsPerUnit;
  if (proteinPerUnit <= 0) return 0;
  return targetGrams / proteinPerUnit;
}

export function formatFoodQuantity(food: FoodItem, targetGrams: number): string {
  const qty = quantityForTarget(food, targetGrams);
  if (food.unitLabel === "large egg") {
    return `~${Math.round(qty)} eggs`;
  }
  if (food.unitLabel === "g" || food.unitLabel === "g cooked") {
    const grams = qty * food.gramsPerUnit;
    return `~${Math.round(grams)}g`;
  }
  return `~${Math.round(qty)} ${food.unitLabel}`;
}
