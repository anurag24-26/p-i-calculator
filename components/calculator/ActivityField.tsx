"use client";

import { ACTIVITY_LEVELS } from "@/lib/calculations";
import type { ActivityLevel } from "@/types";

const ORDER: ActivityLevel[] = [
  "sedentary",
  "lightly-active",
  "moderately-active",
  "very-active",
  "extremely-active",
];

interface ActivityFieldProps {
  value: ActivityLevel;
  onChange: (activity: ActivityLevel) => void;
}

export default function ActivityField({ value, onChange }: ActivityFieldProps) {
  return (
    <div className="field-group">
      <span className="field-label" id="activity-label">
        Activity level
      </span>
      <div
        className="option-grid"
        role="radiogroup"
        aria-labelledby="activity-label"
      >
        {ORDER.map((level) => {
          const info = ACTIVITY_LEVELS[level];
          const active = value === level;
          return (
            <button
              type="button"
              key={level}
              className={`option-card${active ? " active" : ""}`}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(level)}
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
