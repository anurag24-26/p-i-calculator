"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq-data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Questions</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div className="faq-item" key={item.question}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-question"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    {item.question}
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-answer"
                  style={{ display: open ? "block" : "none" }}
                >
                  <div className="faq-answer-inner">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
