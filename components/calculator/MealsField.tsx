"use client";

const OPTIONS = [2, 3, 4, 5, 6];

interface MealsFieldProps {
  value: number;
  onChange: (meals: number) => void;
}

export default function MealsField({ value, onChange }: MealsFieldProps) {
  return (
    <div className="field-group">
      <label className="field-label" id="meals-label">
        How many meals do you usually eat?
      </label>
      <div className="meals-row" role="radiogroup" aria-labelledby="meals-label">
        {OPTIONS.map((n) => (
          <button
            type="button"
            key={n}
            className={`meal-pill${value === n ? " active" : ""}`}
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
