"use client";

import type { WeightUnit } from "@/types";

interface WeightFieldProps {
  value: string;
  unit: WeightUnit;
  error?: string;
  onChange: (value: string) => void;
  onUnitChange: (unit: WeightUnit) => void;
}

export default function WeightField({
  value,
  unit,
  error,
  onChange,
  onUnitChange,
}: WeightFieldProps) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor="weight-input">
        Body weight
      </label>
      <div className="weight-row">
        <div className="weight-input-wrap">
          <input
            id="weight-input"
            type="text"
            inputMode="decimal"
            className={`text-input${error ? " has-error" : ""}`}
            placeholder={unit === "kg" ? "e.g. 70" : "e.g. 154"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "weight-error" : undefined}
          />
        </div>
        <div
          className="segmented"
          role="group"
          aria-label="Weight unit"
        >
          <button
            type="button"
            className={unit === "kg" ? "active" : ""}
            onClick={() => onUnitChange("kg")}
            aria-pressed={unit === "kg"}
          >
            kg
          </button>
          <button
            type="button"
            className={unit === "lbs" ? "active" : ""}
            onClick={() => onUnitChange("lbs")}
            aria-pressed={unit === "lbs"}
          >
            lbs
          </button>
        </div>
      </div>
      {error && (
        <p className="field-error" id="weight-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
