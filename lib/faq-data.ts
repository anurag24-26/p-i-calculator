export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much protein should I eat per day?",
    answer:
      "Most adults benefit from 1.2–2.2 grams of protein per kilogram of body weight per day, depending on activity level and goals. The minimum baseline for general health is around 0.8 g/kg. Use the calculator above for a number tailored to your weight, goal, and activity level.",
  },
  {
    question: "How is protein intake calculated?",
    answer:
      "We convert your body weight to kilograms, apply a g/kg multiplier based on your fitness goal and activity level, and optionally adjust using lean body mass if you provide a body fat percentage. The result is a daily target and a practical range.",
  },
  {
    question: "How much protein do I need to build muscle?",
    answer:
      "For muscle building, a common target range is 1.6–2.2 g/kg of body weight per day, combined with resistance training and adequate calories. Where you land in that range depends on training volume and experience level.",
  },
  {
    question: "How much protein should I eat when losing weight?",
    answer:
      "During fat loss, protein needs are similar to or slightly higher than muscle building — typically 1.6–2.2 g/kg — since higher protein intake helps preserve lean muscle mass while in a calorie deficit.",
  },
  {
    question: "Does body weight affect protein requirements?",
    answer:
      "Yes. Protein needs are usually expressed per kilogram of body weight, so a heavier person generally requires more total grams of protein than a lighter person at the same activity level and goal.",
  },
  {
    question: "Should I divide protein across meals?",
    answer:
      "Spreading protein evenly across 3–5 meals a day is a practical approach that supports steady muscle protein synthesis throughout the day, though total daily intake matters most.",
  },
  {
    question: "Can vegetarians and vegans get enough protein?",
    answer:
      "Yes. Foods like tofu, lentils, chickpeas, and other legumes provide meaningful amounts of protein. Vegetarians and vegans may need to eat larger portions or a wider variety of plant proteins to reach the same daily target as an omnivore diet.",
  },
];
