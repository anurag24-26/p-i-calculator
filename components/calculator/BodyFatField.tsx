"use client";

import Switch from "@/components/ui/Switch";

interface BodyFatFieldProps {
  enabled: boolean;
  value: string;
  error?: string;
  onToggle: (enabled: boolean) => void;
  onChange: (value: string) => void;
}

export default function BodyFatField({
  enabled,
  value,
  error,
  onToggle,
  onChange,
}: BodyFatFieldProps) {
  return (
    <div className="field-group">
      <div className="toggle-row">
        <div>
          <span className="field-label" style={{ marginBottom: 2 }}>
            I know my body fat %
          </span>
          <p className="field-hint" style={{ marginBottom: 0 }}>
            Optional - helps estimate lean body mass for a more tailored target.
          </p>
        </div>
        <Switch
          id="body-fat-toggle"
          checked={enabled}
          onChange={onToggle}
          label="Enable body fat percentage input"
        />
      </div>
      {enabled && (
        <div style={{ marginTop: 16 }}>
          <label className="field-label" htmlFor="body-fat-input">
            Body fat percentage
          </label>
          <input
            id="body-fat-input"
            type="text"
            inputMode="decimal"
            className={`text-input${error ? " has-error" : ""}`}
            placeholder="e.g. 18"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "body-fat-error" : undefined}
            style={{ maxWidth: 160 }}
          />
          {error && (
            <p className="field-error" id="body-fat-error" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
