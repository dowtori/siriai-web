"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BODY_LINES = [
  "AI 도구는 매일 새롭게 등장합니다.",
  "필요한 건 창의성과 결합.",
  "시리아이는 그 구조를 설계합니다.",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StanceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="stance"
      ref={ref}
      className="relative"
      style={{
        backgroundColor: "var(--surface-base)",
        color: "var(--fg-default)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
          {/* Left — eyebrow + headline */}
          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--fg-muted)" }}
            >
              01 — Stance
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="mt-8 tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 4.2vw, 4rem)",
                fontWeight: 500,
                lineHeight: 1.08,
              }}
            >
              Tools change.
              <br />
              Structure remains.
              <br />
              We design it.
            </motion.h2>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : undefined}
              transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
              className="mt-12 h-16 w-px origin-bottom"
              style={{ backgroundColor: "var(--accent)" }}
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
              className="mt-6 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--fg-muted)" }}
            >
              Statement · 01 of 06
            </motion.p>
          </div>

          {/* Right — Korean body, line-by-line stagger */}
          <div className="md:col-span-6 md:col-start-7">
            <div
              className="space-y-5"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.85,
                color: "var(--fg-default)",
                maxWidth: "44ch",
                wordBreak: "keep-all",
              }}
            >
              {BODY_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.3 + i * 0.1,
                  }}
                  className="flex items-baseline gap-5"
                >
                  <span
                    aria-hidden
                    className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
                    style={{ color: "var(--fg-muted)", flex: "0 0 auto" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </motion.p>
              ))}
            </div>

          </div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 1.0 }}
          className="mt-20 h-px origin-left"
          style={{ backgroundColor: "var(--line-strong)" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
