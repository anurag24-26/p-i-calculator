"use client";

interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export default function Switch({ id, checked, onChange, label }: SwitchProps) {
  return (
    <label className="switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span className="switch-track" />
      <span className="switch-thumb" />
    </label>
  );
}
