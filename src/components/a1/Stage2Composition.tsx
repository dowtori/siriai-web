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
// thread funnel — 3→1→4 구조. 4 layers lozenge는 lines2와 약간 overlap.
const T_FUNNEL_LINES1_DURATION = 0.6;
const T_FUNNEL_CORE_DELTA = 0.7;
const T_FUNNEL_CORE_DURATION = 0.3;
const T_FUNNEL_LINES2_DELTA = 1.0;
const T_FUNNEL_LINES2_DURATION = 0.6;
const T_FUNNEL_STAGGER = 0.04;
const T_LAYERS_START = T_THREAD_START + T_FUNNEL_LINES2_DELTA; // 2.25s

// Funnel SVG 좌표계 — 280×140 추상 다이어그램. lozenge row와 별도 정렬.
const FUNNEL = {
  width: 280,
  height: 140,
  axesXs: [50, 140, 230],
  coreX: 140,
  coreY: 60,
  layersXs: [35, 105, 175, 245],
  layersY: 140,
};

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
  const lozengeStep = reducedMotion ? 0 : params.revealStagger * 0.6;
  const fLines1 = reducedMotion ? 0 : T_FUNNEL_LINES1_DURATION;
  const fCore = reducedMotion ? 0 : T_FUNNEL_CORE_DURATION;
  const fLines2 = reducedMotion ? 0 : T_FUNNEL_LINES2_DURATION;

  return (
    <section
      data-a1-stage="2"
      style={{
        position: "relative",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        padding: "clamp(96px, 12vw, 128px) 24px clamp(96px, 12vw, 128px)",
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
          transition={{ duration: reveal, ease: EASE, delay: T_KR_HEAD }}
          style={{
            marginTop: 28,
            fontSize: 14,
            lineHeight: 1.85,
            color: "var(--a1-mute)",
            wordBreak: "keep-all",
          }}
        >
          {KR_HEAD}
        </motion.p>

        <div style={{ height: 56 }} />

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
          width={FUNNEL.width}
          height={FUNNEL.height}
          viewBox={`0 0 ${FUNNEL.width} ${FUNNEL.height}`}
          style={{
            display: "block",
            marginTop: 12,
            marginBottom: 12,
            overflow: "visible",
          }}
          aria-hidden
        >
          {FUNNEL.axesXs.map((x, i) => (
            <motion.path
              key={`axis-${i}`}
              d={`M ${x} 0 L ${FUNNEL.coreX} ${FUNNEL.coreY}`}
              stroke="var(--a1-hairline-strong)"
              strokeWidth={1}
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: fLines1,
                ease: EASE,
                delay: T_THREAD_START + i * T_FUNNEL_STAGGER,
              }}
            />
          ))}

          <motion.circle
            cx={FUNNEL.coreX}
            cy={FUNNEL.coreY}
            fill="var(--a1-ink)"
            initial={{ r: 0, opacity: 0 }}
            whileInView={{ r: 3, opacity: 0.92 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: fCore,
              ease: EASE,
              delay: T_THREAD_START + T_FUNNEL_CORE_DELTA,
            }}
          />

          {FUNNEL.layersXs.map((x, i) => (
            <motion.path
              key={`layer-${i}`}
              d={`M ${FUNNEL.coreX} ${FUNNEL.coreY} L ${x} ${FUNNEL.layersY}`}
              stroke="var(--a1-hairline-strong)"
              strokeWidth={1}
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: fLines2,
                ease: EASE,
                delay:
                  T_THREAD_START + T_FUNNEL_LINES2_DELTA + i * T_FUNNEL_STAGGER,
              }}
            />
          ))}
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
