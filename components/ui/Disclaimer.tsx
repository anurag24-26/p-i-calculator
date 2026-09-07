import { Info } from "lucide-react";

export default function Disclaimer() {
  return (
    <section className="section" style={{ paddingTop: 0 }} id="disclaimer">
      <div className="container">
        <div className="disclaimer-box">
          <Info size={22} aria-hidden="true" />
          <div>
            <p>
              This calculator provides general nutrition estimates for
              educational and planning purposes. Individual protein needs can
              vary based on age, health status, training, diet, and other
              factors. It is not a substitute for professional medical or
              nutritional advice.
            </p>
            <p>
              If you have kidney disease or another medical condition that
              affects protein intake, consult a qualified healthcare
              professional before making significant dietary changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
