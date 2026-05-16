"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BODY_LINES = [
  "AI 도구는 매주 등장합니다.",
  "도입의 본질은 도구가 아니라, 그것이 작동하는 의사결정 구조에 있습니다.",
  "우리는 도구를 골라드리지 않습니다.",
  "조직이 AI와 함께 통찰하는 방식을 설계합니다.",
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
          <div className="md:col-span-5">
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
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                fontWeight: 500,
                lineHeight: 1.08,
              }}
            >
              We don&apos;t deploy tools.
              <br />
              We design how
              <br />
              decisions are made.
            </motion.h2>
          </div>

          {/* Right — Korean body, line-by-line stagger */}
          <div className="self-end md:col-span-6 md:col-start-7">
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
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Thin dividing rule below body — subtle proof of structure */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 1, ease: EASE, delay: 0.3 + BODY_LINES.length * 0.1 }}
              className="mt-12 h-px origin-left"
              style={{ backgroundColor: "var(--line-strong)", maxWidth: "44ch" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
