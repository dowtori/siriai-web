"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 스크롤 진입 시 부드럽게 떠오르는 reveal (절제·smart).
 * reduced-motion이면 즉시 표시.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) return <MotionTag>{children}</MotionTag>;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
