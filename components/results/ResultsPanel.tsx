"use client";

import { useState } from "react";
import { Calculator, Copy, Share2, Printer, RotateCcw, Check } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";
import { formatMultiplier } from "@/lib/calculations";
import type { ProteinResult } from "@/types";

interface ResultsPanelProps {
  result: ProteinResult | null;
  onReset: () => void;
}

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="card empty-state" id="results">
        <Calculator size={36} aria-hidden="true" />
        <p>Enter your body weight to see your daily protein target.</p>
      </div>
    );
  }

  const shareText = `My estimated protein target is ${result.target}g/day.`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore, the text is still visible.
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, title: "My protein target" });
      } catch {
        // User cancelled or share failed — no action needed.
      }
    } else {
      handleCopy();
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="card results-main" id="results" aria-live="polite">
      <p className="results-main-label">Your Daily Protein Target</p>
      <div>
        <span className="results-main-number">
          <CountUp value={result.target} />
        </span>
        <span className="results-main-unit">g</span>
      </div>
      <p className="results-main-per-day">per day</p>

      <div className="results-stats">
        <div className="results-stat">
          <p className="results-stat-label">Protein range</p>
          <p className="results-stat-value">
            {result.low}–{result.high} g/day
          </p>
        </div>
        <div className="results-stat">
          <p className="results-stat-label">Your calculation</p>
          <p className="results-stat-value">{formatMultiplier(result.multiplier)}</p>
        </div>
        <div className="results-stat">
          <p className="results-stat-label">Minimum baseline</p>
          <p className="results-stat-value">{result.baseline} g/day</p>
        </div>
      </div>

      <div className="results-actions">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy results"}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleShare}>
          <Share2 size={16} />
          Share
        </Button>
        <Button variant="secondary" size="sm" onClick={handlePrint}>
          <Printer size={16} />
          Print
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw size={16} />
          Start over
        </Button>
      </div>
    </div>
  );
}
