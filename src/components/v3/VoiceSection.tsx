"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const KR_LINES: Array<ReactNode | "break"> = [
  "AI 리터러시적 사고를 기반으로 한 최적의 설계.",
  "break",
  "도구로서의 AI 접근을 넘어",
  (
    <>
      니즈를 정확히 이해하고{" "}
      <strong style={{ fontWeight: 600 }}>&lsquo;사람&rsquo;</strong>을
      돕습니다.
    </>
  ),
  "break",
  (
    <>
      평균{" "}
      <strong style={{ fontWeight: 600 }}>+32% 이상</strong>의 의사결정 비용
      감소를 체험해보세요.
    </>
  ),
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
