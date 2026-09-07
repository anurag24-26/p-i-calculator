"use client";

import type { ProteinResult } from "@/types";

interface StickyBarProps {
  result: ProteinResult | null;
}

export default function StickyBar({ result }: StickyBarProps) {
  if (!result) return null;

  return (
    <div className="sticky-bar" aria-hidden="true">
      <div>
        <span className="sticky-bar-label">Daily target</span>
        <span className="sticky-bar-value">{result.target}g</span>
      </div>
      <a
        href="#results"
        className="btn btn-primary btn-sm"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        View results
      </a>
    </div>
  );
}
