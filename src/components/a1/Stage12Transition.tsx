"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

// PRD §3 Stage transition easing
const EASE_TRANSITION = [0.7, 0, 0.3, 1] as const;

/**
 * Stage 1 (midnight) → Stage 2 (paper) wash dissolve.
 * 잉크가 종이로 번지듯 위→아래 gradient morph, 600–900ms.
 * MysticCursor는 Stage1Hero의 overflow:hidden에 클리핑되어 자동 fade out.
 */
export default function Stage12Transition() {
  const { params, reducedMotion } = useA1Motion();
  const duration = reducedMotion ? 0 : params.stageTransition;

  return (
    <section
      aria-hidden
      data-a1-stage="transition-12"
      data-a1-tone="dark"
      style={{
        position: "relative",
        height: "28vh",
        background: "var(--a1-midnight)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration, ease: EASE_TRANSITION }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, var(--a1-midnight) 0%, var(--a1-paper) 65%)",
        }}
      />
    </section>
  );
}
