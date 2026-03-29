"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variant,
} from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-64px" });
  const prefersReducedMotion = useReducedMotion();

  const offset = directionOffset[direction];

  const hidden: Variant = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y };

  const visible: Variant = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
