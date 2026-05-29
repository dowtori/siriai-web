"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

type Props = {
  badge?: string;
};

const EN_HEAD = ["Three doors.", "Four moves."];
const KR_HEAD = "세 갈래로 들어가, 네 결로 흐릅니다.";

const AXES = ["Architecture", "Literacy", "Mapping"];
const LAYERS = ["Signal", "Judgment", "Action", "Record"];

const EASE = [0.16, 1, 0.3, 1] as const;

// 시퀀스 타이밍 (s 단위) — viewport 진입 trigger 이후 delay.
const T_HEAD_STAGGER = 0.15;
const T_KR_HEAD = 0.45;
const T_AXES_START = 0.85;
const T_THREAD_START = 1.25;
const T_LAYERS_START = 1.85;

const THREAD_HEIGHT = 140;
const THREAD_BASELINE = 1.4; // PRD §3 motion.path pathLength 1.4s

function Lozenge({
  index,
  label,
  delay,
  duration,
}: {
  index: number;
  label: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration, ease: EASE, delay }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px",
        border: "1px solid var(--a1-hairline)",
        borderRadius: 999,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.06em",
        color: "var(--a1-ink)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--a1-mute)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      {label}
    </motion.li>
  );
}

export default function Stage2Composition({ badge }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const lozengeReveal = reducedMotion ? 0 : params.revealDuration * 0.7;
  // lozenge stagger — revealStagger 기반, 약간 빠르게.
  const lozengeStep = reducedMotion ? 0 : params.revealStagger * 0.6;
  const threadDuration = reducedMotion ? 0 : THREAD_BASELINE;

  return (
    <section
      data-a1-stage="2"
      style={{
        position: "relative",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        padding: "200px 24px 240px",
        fontFamily: "var(--font-sans)",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--a1-mute)",
          }}
        >
          {badge}
        </span>
      )}

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {EN_HEAD.map((line, i) => (
          <motion.h2
            key={line}
            initial={{
              opacity: 0,
              filter: reducedMotion ? "blur(0px)" : "blur(10px)",
              y: 12,
            }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: reveal,
              ease: EASE,
              delay: i * T_HEAD_STAGGER,
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.4vw, 3.75rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            {line}
          </motion.h2>
        ))}

        <motion.p
          initial={{
            opacity: 0,
            filter: reducedMotion ? "blur(0px)" : "blur(4px)",
          }}
          whileInView={{ opacity: 0.72, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: reveal,
            ease: EASE,
            delay: T_KR_HEAD,
          }}
          style={{
            marginTop: 36,
            fontSize: 14,
            lineHeight: 1.85,
            color: "var(--a1-mute)",
            wordBreak: "keep-all",
          }}
        >
          {KR_HEAD}
        </motion.p>

        <div style={{ height: 104 }} />

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {AXES.map((label, i) => (
            <Lozenge
              key={label}
              index={i}
              label={label}
              delay={T_AXES_START + i * lozengeStep}
              duration={lozengeReveal}
            />
          ))}
        </ul>

        <svg
          width={2}
          height={THREAD_HEIGHT}
          viewBox={`0 0 2 ${THREAD_HEIGHT}`}
          style={{
            display: "block",
            marginTop: 28,
            marginBottom: 28,
            overflow: "visible",
          }}
          aria-hidden
        >
          <motion.path
            d={`M 1 0 L 1 ${THREAD_HEIGHT}`}
            stroke="var(--a1-hairline-strong)"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: threadDuration,
              ease: EASE,
              delay: T_THREAD_START,
            }}
          />
        </svg>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {LAYERS.map((label, i) => (
            <Lozenge
              key={label}
              index={i}
              label={label}
              delay={T_LAYERS_START + i * lozengeStep}
              duration={lozengeReveal}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
