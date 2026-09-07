"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  durationMs?: number;
}

export default function CountUp({ value, durationMs = 500 }: CountUpProps) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      prevValue.current = value;
      return;
    }

    const start = prevValue.current;
    const end = value;
    const startTime = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        prevValue.current = end;
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span aria-hidden="true">{display}</span>;
}
