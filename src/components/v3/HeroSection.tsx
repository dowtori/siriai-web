"use client";

import { motion } from "framer-motion";
import HeroParticles from "./HeroParticles";

const EASE = [0.16, 1, 0.3, 1] as const;

// Particle cycle phases. Each phase is rendered as two lines, dissolves after
// ~8s, then reforms into the next phase. Index loops back to 0 to land on the
// canonical headline.
const CYCLES: string[][] = [
  ["Architecture for", "insight."],
  ["Not tools.", "Structure."],
  ["Not output.", "Decisions."],
  ["Not deployment.", "Design."],
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center pt-24"
      style={{
        backgroundColor: "var(--surface-base)",
        color: "var(--fg-default)",
      }}
    >
      {/* Screen-reader heading for accessibility (canvas is decorative) */}
      <h1 className="sr-only">Architecture for insight.</h1>

      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-y-16 px-6 md:grid-cols-12 md:gap-x-12 md:gap-y-0 md:px-10">
        {/* Generative typo */}
        <div className="h-[58vh] md:col-span-7 md:h-[68vh]">
          <HeroParticles cycles={CYCLES} />
        </div>

        {/* Static side panel */}
        <div className="self-center md:col-span-4 md:col-start-9">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-muted)" }}
          >
            Siriai · A practice in AI architecture
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.34 }}
            className="mt-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              wordBreak: "keep-all",
              maxWidth: "22ch",
            }}
          >
            AI와 함께 통찰을 짓다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="mt-14 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-muted)" }}
          >
            Founded in Seoul · Est. 2024
          </motion.p>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.2 }}
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        style={{ color: "var(--fg-muted)" }}
      >
        <div
          className="mx-auto mb-3 h-8 w-px"
          style={{ background: "var(--line-strong)" }}
        />
        <p className="text-[10px] uppercase tracking-[0.32em]">Scroll</p>
      </motion.div>
    </section>
  );
}
