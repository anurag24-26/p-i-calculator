"use client";

import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

interface NavbarProps {
  userName: string | null;
  onEditName?: () => void;
  onClearData?: () => void;
}

const LINKS = [
  { href: "#calculator", label: "Calculator" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#guidelines", label: "Protein Guide" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar({ userName, onEditName, onClearData }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-logo">
          <Leaf size={20} aria-hidden="true" />
          ProteinCalc
        </a>
        <nav aria-label="Primary">
          <ul className="navbar-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar-cta">
          {userName && (
            <span className="navbar-greeting">
              Hi, {userName} 👋{" "}
              <button type="button" className="btn btn-ghost btn-sm" onClick={onEditName}>
                Edit
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={onClearData}>
                Clear data
              </button>
            </span>
          )}
          <button
            type="button"
            className="navbar-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
