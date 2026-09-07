"use client";

import { foodsForDiet, formatFoodQuantity } from "@/lib/food-data";
import type { DietaryPreference } from "@/types";

interface FoodEquivalentsProps {
  target: number;
  diet: DietaryPreference;
}

export default function FoodEquivalents({ target, diet }: FoodEquivalentsProps) {
  const foods = foodsForDiet(diet).slice(0, 5);

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <p className="food-card-name">{food.name}</p>
            <p className="food-card-qty">{formatFoodQuantity(food, target)}</p>
            <p className="food-card-per">~{food.proteinPer100g}g protein / 100g</p>
          </div>
        ))}
      </div>
      <p className="food-disclaimer">
        Approximate equivalent — not a recommended single-food diet.
      </p>
    </div>
  );
}
