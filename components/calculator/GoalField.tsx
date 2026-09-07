"use client";

import { GOAL_RANGES } from "@/lib/calculations";
import type { FitnessGoal } from "@/types";

const ORDER: FitnessGoal[] = [
  "muscle-building",
  "fat-loss",
  "endurance",
  "maintenance",
];

interface GoalFieldProps {
  value: FitnessGoal;
  onChange: (goal: FitnessGoal) => void;
}

export default function GoalField({ value, onChange }: GoalFieldProps) {
  return (
    <div className="field-group">
      <span className="field-label" id="goal-label">
        Fitness goal
      </span>
      <div className="option-grid" role="radiogroup" aria-labelledby="goal-label">
        {ORDER.map((goal) => {
          const info = GOAL_RANGES[goal];
          const active = value === goal;
          return (
            <button
              type="button"
              key={goal}
              className={`option-card${active ? " active" : ""}`}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(goal)}
            >
              <span className="option-card-title">{info.label}</span>
              <span className="option-card-desc">{info.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
