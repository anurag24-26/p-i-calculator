"use client";

import { motion } from "framer-motion";
import { BASELINE_G_PER_KG } from "@/lib/calculations";

interface ProteinGaugeProps {
  low: number;
  high: number;
  multiplier: number;
}

export default function ProteinGauge({ low, high, multiplier }: ProteinGaugeProps) {
  const min = BASELINE_G_PER_KG;
  const max = 2.4;
  const clamped = Math.min(max, Math.max(min, multiplier));
  const percent = ((clamped - min) / (max - min)) * 100;

  return (
    <div className="card gauge-wrap">
      <p className="gauge-title">Where your target sits</p>
      <div className="gauge-track">
        <motion.div
          className="gauge-marker"
          style={{ left: `${percent}%` }}
          initial={{ left: "0%" }}
          animate={{ left: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="gauge-labels">
        <span>{min.toFixed(1)} g/kg minimum</span>
        <span>{max.toFixed(1)} g/kg upper range</span>
      </div>
    </div>
  );
}
