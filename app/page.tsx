import CalculatorApp from "@/components/calculator/CalculatorApp";
import HowItWorks from "@/components/ui/HowItWorks";
import ProteinGuidelines from "@/components/ui/ProteinGuidelines";
import Faq from "@/components/ui/Faq";
import Disclaimer from "@/components/ui/Disclaimer";
import Footer from "@/components/ui/Footer";
import { FAQ_ITEMS } from "@/lib/faq-data";

const siteUrl = "https://protein-calculator.example.com";

export default function HomePage() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProteinCalc",
    url: siteUrl,
    description:
      "Calculate your daily protein intake based on your weight, fitness goal, activity level, and meal frequency.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main id="main-content">
        <CalculatorApp />
        <HowItWorks />
        <ProteinGuidelines />
        <Faq />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
