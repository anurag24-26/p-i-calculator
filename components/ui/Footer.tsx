import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="navbar-logo">
              <Leaf size={20} aria-hidden="true" />
              ProteinCalc
            </span>
            <p>Simple nutrition planning, made easier.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#calculator">Calculator</a>
                </li>
                <li>
                  <a href="#guidelines">Protein Guide</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-note">
          <span>Your calculator data stays locally on your device.</span>
          <span>© {new Date().getFullYear()} ProteinCalc</span>
        </div>
      </div>
    </footer>
  );
}
