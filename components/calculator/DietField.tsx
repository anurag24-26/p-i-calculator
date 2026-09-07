"use client";

import type { DietaryPreference } from "@/types";

const OPTIONS: { id: DietaryPreference; label: string }[] = [
  { id: "omnivore", label: "Omnivore" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
];

interface DietFieldProps {
  value: DietaryPreference;
  onChange: (diet: DietaryPreference) => void;
}

export default function DietField({ value, onChange }: DietFieldProps) {
  return (
    <div className="field-group">
      <label className="field-label" id="diet-label">
        Dietary preference
      </label>
      <div className="diet-row" role="radiogroup" aria-labelledby="diet-label">
        {OPTIONS.map((opt) => (
          <button
            type="button"
            key={opt.id}
            className={`diet-pill${value === opt.id ? " active" : ""}`}
            role="radio"
            aria-checked={value === opt.id}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
