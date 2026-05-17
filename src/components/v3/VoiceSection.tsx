"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const KR_LINES: Array<string | "break"> = [
  "우리가 만드는 것은 도구가 아닙니다.",
  "사고가 흐르는 자리입니다.",
  "break",
  "가까운 거리에서 함께 사고합니다.",
  "충분히 듣고, 천천히 답합니다.",
  "break",
  "어떤 신호를 보고, 어떻게 판단하며, 무엇을 실행하고, 무엇을 기록할지 —",
  "그 정렬을 함께 설계합니다.",
];

export default function VoiceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="voice"
      ref={ref}
      data-tone="dark"
      style={{
        backgroundColor: "var(--surface-inverse)",
        color: "var(--fg-on-inverse)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-40 md:px-10 md:py-56">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--fg-on-inverse-muted)" }}
        >
          05 — Voice
        </motion.p>

        {/* English declaration — display */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.95, ease: EASE, delay: 0.18 }}
          className="mt-14 tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 4.2vw, 4rem)",
            fontWeight: 500,
            lineHeight: 1.08,
            maxWidth: "24ch",
          }}
        >
          We don&apos;t recommend tools.
          <br />
          We architect what stays.
        </motion.h2>

        {/* Korean manifesto — line by line */}
        <div
          className="mt-20 space-y-5"
          style={{
            fontSize: "clamp(1.0625rem, 1.3vw, 1.375rem)",
            lineHeight: 1.85,
            color: "var(--fg-on-inverse)",
            maxWidth: "44ch",
            wordBreak: "keep-all",
          }}
        >
          {KR_LINES.map((line, i) =>
            line === "break" ? (
              <div key={i} aria-hidden className="h-3" />
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.75, ease: EASE, delay: 0.45 + i * 0.12 }}
              >
                {line}
              </motion.p>
            )
          )}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{
            duration: 0.9,
            ease: EASE,
            delay: 0.45 + KR_LINES.length * 0.12 + 0.2,
          }}
          className="mt-16 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--fg-on-inverse-muted)" }}
        >
          — Siriai Manifesto, 2026
        </motion.p>
      </div>
    </section>
  );
}
