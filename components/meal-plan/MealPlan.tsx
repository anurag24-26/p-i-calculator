"use client";

import { motion } from "framer-motion";
import { splitIntoMeals } from "@/lib/calculations";

interface MealPlanProps {
  target: number;
  meals: number;
}

export default function MealPlan({ target, meals }: MealPlanProps) {
  const portions = splitIntoMeals(target, meals);

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="meal-grid">
        {portions.map((portion, i) => (
          <motion.div
            className="meal-card"
            key={portion.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
          >
            <p className="meal-card-label">{portion.label}</p>
            <p className="meal-card-value">{portion.grams}g</p>
          </motion.div>
        ))}
      </div>
      <p className="meal-note">
        Use this as a practical distribution guide rather than a strict
        requirement.
      </p>
    </div>
  );
}
