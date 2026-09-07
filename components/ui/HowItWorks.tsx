const STEPS = [
  {
    title: "Convert your body weight to kilograms",
    body: "We standardize on kilograms internally, whether you enter kg or lbs, so the math stays consistent.",
  },
  {
    title: "Determine your protein range from goal and activity",
    body: "Each fitness goal has a research-informed g/kg range. Your activity level positions you within that range.",
  },
  {
    title: "Optionally factor in lean body mass",
    body: "If you share your body fat percentage, we can use lean body mass as a more precise reference when body fat is notably high or low.",
  },
  {
    title: "Calculate your practical daily target",
    body: "We multiply your reference body mass by the selected g/kg value to get a single daily target, along with a realistic range.",
  },
  {
    title: "Divide the target across your meals",
    body: "Your daily target is split evenly across the number of meals you eat, so you have a practical per-meal guide.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">How it works</span>
          <h2>How is protein calculated?</h2>
          <p>
            No black box — here&apos;s exactly how we turn your weight and goals
            into a daily protein number.
          </p>
        </div>
        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div className="step-item" key={step.title}>
              <span className="step-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="example-box">
          <strong>Example:</strong> A 70kg person building muscle at a
          moderately active level uses roughly 1.9 g/kg — about 133g of
          protein per day, split into 35g portions across 4 meals.
        </div>
      </div>
    </section>
  );
}
