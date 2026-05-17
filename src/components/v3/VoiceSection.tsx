"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const BLOCKS: Array<{ text: ReactNode }> = [
  {
    text: <>AI 리터러시적 사고를 기반으로 한 최적의 설계.</>,
  },
  {
    text: (
      <>
        도구로서의 AI 접근을 넘어,
        <br />
        니즈를 정확히 이해하고{" "}
        <strong style={{ fontWeight: 600 }}>&lsquo;사람&rsquo;</strong>을
        돕습니다.
      </>
    ),
  },
  {
    text: (
      <>
        평균{" "}
        <strong style={{ fontWeight: 600 }}>+32% 이상</strong>의
        의사결정 비용 감소를 체험해보세요.
      </>
    ),
  },
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
      <div className="mx-auto max-w-3xl px-6 py-40 md:px-10 md:py-56">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--fg-on-inverse-muted)" }}
        >
          05 — Voice
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="mt-14 h-px origin-left"
          style={{ backgroundColor: "var(--line-on-inverse-strong)" }}
          aria-hidden
        />

        {BLOCKS.map((block, i) => (
          <div key={i}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, ease: EASE, delay: 0.4 + i * 0.18 }}
              className="py-12 md:py-14"
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.125rem, 1.45vw, 1.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  letterSpacing: "-0.005em",
                  wordBreak: "keep-all",
                  color: "var(--fg-on-inverse)",
                }}
              >
                {block.text}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : undefined}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: 0.55 + i * 0.18,
              }}
              className="h-px origin-left"
              style={{ backgroundColor: "var(--line-on-inverse-strong)" }}
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
