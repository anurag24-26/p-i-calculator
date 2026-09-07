import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How ProteinCalc handles your data: no accounts, no servers, no tracking. Everything stays on your device.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            <Leaf size={20} aria-hidden="true" />
            ProteinCalc
          </Link>
        </div>
      </header>
      <main id="main-content" className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 24 }}>Privacy</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p>
              ProteinCalc is built to work entirely in your browser. Here is
              exactly what that means for your data.
            </p>
            <p>
              <strong>No account is required.</strong> You can use the full
              calculator without signing up or logging in.
            </p>
            <p>
              <strong>Your name is stored only in localStorage.</strong> If
              you choose to enter a name during onboarding, it&apos;s saved
              locally in your browser&apos;s storage and never leaves your
              device. You can edit or clear it at any time from the
              navigation bar.
            </p>
            <p>
              <strong>Calculator inputs are processed locally.</strong> Your
              body weight, goals, activity level, and any other values you
              enter are used only to run the calculation in your browser.
            </p>
            <p>
              <strong>No personal data is sent to a backend.</strong>{" "}
              ProteinCalc has no server-side database or API that receives
              your information - there is no backend for it to reach.
            </p>
            <p>
              <strong>We don&apos;t collect unnecessary personal information.</strong>{" "}
              We never ask for your email, phone number, address, or health
              records.
            </p>
            <p>
              You can clear all locally saved data at any time using the
              &quot;Clear data&quot; option in the navigation bar.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
