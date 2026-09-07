import { GOAL_RANGES } from "@/lib/calculations";
import type { FitnessGoal } from "@/types";

const ORDER: FitnessGoal[] = [
  "maintenance",
  "endurance",
  "muscle-building",
  "fat-loss",
];

export default function ProteinGuidelines() {
  return (
    <section className="section" id="guidelines">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Reference</span>
          <h2>Protein guidelines by goal</h2>
          <p>
            General g/kg body weight ranges used in nutrition planning. Your
            personal calculation may land anywhere within these bands.
          </p>
        </div>
        <div className="guideline-grid">
          {ORDER.map((goal) => {
            const info = GOAL_RANGES[goal];
            return (
              <div className="guideline-card" key={goal}>
                <h3>{info.label}</h3>
                <p className="range">
                  {info.low}–{info.high} g/kg
                </p>
                <p>{info.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
