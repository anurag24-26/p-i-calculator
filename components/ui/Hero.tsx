"use client";

import { ShieldCheck, Timer, Sprout } from "lucide-react";
import Button from "@/components/ui/Button";
import type { ProteinResult } from "@/types";

interface HeroProps {
  result: ProteinResult | null;
}

export default function Hero({}: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <h1>How much protein do you need?</h1>
        <p className="hero-subtitle">
          Get a practical daily protein estimate based on your weight, goal,
          activity and eating habits.
        </p>
        <div className="hero-actions">
          <Button
            onClick={() =>
              document
                .getElementById("calculator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Calculate my protein
          </Button>
        </div>
        <div className="hero-badges">
          <span className="hero-badge">
            <ShieldCheck size={18} aria-hidden="true" />
            No sign-up required
          </span>
          <span className="hero-badge">
            <Timer size={18} aria-hidden="true" />
            Results in seconds
          </span>
          <span className="hero-badge">
            <Sprout size={18} aria-hidden="true" />
            Works for every diet
          </span>
        </div>
      </div>
    </section>
  );
}
