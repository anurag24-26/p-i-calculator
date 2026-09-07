"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { sanitizeName } from "@/lib/validation";

interface UserNameModalProps {
  open: boolean;
  onSubmit: (name: string | null) => void;
}

export default function UserNameModal({ open, onSubmit }: UserNameModalProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = sanitizeName(name);
    onSubmit(clean.length > 0 ? clean : null);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="modal-card"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="onboarding-title">Let&apos;s personalize your protein target</h2>
            <p className="modal-sub">
              We&apos;ll use your name to say hello. That&apos;s all it&apos;s for.
            </p>
            <form onSubmit={handleSubmit}>
              <label className="field-label" htmlFor="user-name">
                What should we call you?
              </label>
              <input
                id="user-name"
                type="text"
                className="text-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                maxLength={40}
              />
              <div className="modal-actions">
                <Button type="button" variant="secondary" onClick={() => onSubmit(null)}>
                  Skip
                </Button>
                <Button type="submit" variant="primary">
                  Continue
                </Button>
              </div>
            </form>
            <p className="modal-privacy-note">
              Your information stays on this device. No email, phone, or health
              records are collected.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
