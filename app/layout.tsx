import type { Metadata } from "next";
import "./globals.css";
import "./components.css";

const siteUrl = "https://protein-calculator.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Protein Intake Calculator – Calculate Your Daily Protein Needs",
    template: "%s | ProteinCalc",
  },
  description:
    "Calculate your daily protein intake based on your weight, fitness goal, activity level, and meal frequency with our free protein calculator.",
  keywords: [
    "protein intake calculator",
    "how much protein do I need",
    "daily protein calculator",
    "protein calculator for muscle gain",
    "protein calculator for weight loss",
    "protein per meal",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Protein Intake Calculator – Calculate Your Daily Protein Needs",
    description:
      "Get a personalized daily protein target based on your body weight, goal, activity level, and eating habits.",
    url: siteUrl,
    siteName: "ProteinCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protein Intake Calculator – Calculate Your Daily Protein Needs",
    description:
      "Get a personalized daily protein target based on your body weight, goal, activity level, and eating habits.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
