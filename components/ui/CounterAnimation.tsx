"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
  animate,
} from "framer-motion";

interface CounterAnimationProps {
  value: string;
  className?: string;
}

/**
 * Parses a formatted value like "47", "10K+", or "0%" into its parts.
 * Returns the numeric target, prefix, and suffix so the counter can
 * animate just the number while preserving surrounding text.
 */
function parseValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) {
    return { target: 0, prefix: "", suffix: value };
  }
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr.replace(/,/g, ""));
  return { target, prefix: prefix ?? "", suffix: suffix ?? "" };
}

export function CounterAnimation({ value, className }: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-32px" });
  const prefersReducedMotion = useReducedMotion();

  const { target, prefix, suffix } = parseValue(value);

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    // If the target is an integer, show integers. Otherwise show one decimal.
    if (Number.isInteger(target)) {
      return Math.round(latest);
    }
    return Math.round(latest * 10) / 10;
  });

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      motionValue.set(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    return () => controls.stop();
  }, [isInView, target, motionValue, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
