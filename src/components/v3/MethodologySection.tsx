"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const AXES = [
  {
    key: "architecture",
    num: "01",
    title: "Architecture",
    kr: "의사결정의 구조를 설계합니다.",
    desc: "흐름, 책임, 데이터의 자리.",
  },
  {
    key: "literacy",
    num: "02",
    title: "Literacy",
    kr: "조직이 AI로 사고하는 법을 익힙니다.",
    desc: "관점 점검, 트랙별 학습, 사내 매뉴얼.",
  },
  {
    key: "mapping",
    num: "03",
    title: "Mapping",
    kr: "무엇이 진짜 문제인지 함께 그립니다.",
    desc: "현황 매핑, 결정의 결, 첫 한 페이지.",
  },
];

export default function MethodologySection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      id="methodology"
      ref={ref}
      style={{ backgroundColor: "var(--surface-base)", color: "var(--fg-default)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
          {/* Left: text */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--fg-muted)" }}
            >
              02 — Methodology
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
              Three ways in.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
              className="mt-6"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.85,
                color: "var(--fg-muted)",
                wordBreak: "keep-all",
              }}
            >
              세 가지 방식으로 들어갑니다.
            </motion.p>

            <div className="mt-14 space-y-10">
              {AXES.map((a, i) => (
                <motion.div
                  key={a.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.5 + i * 0.12 }}
                  className="border-t pt-5"
                  style={{ borderColor: "var(--line-default)" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-[11px] tracking-[0.22em]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {a.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {a.title}
                    </h3>
                  </div>
                  <p
                    className="mt-3"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      maxWidth: "36ch",
                      wordBreak: "keep-all",
                    }}
                  >
                    {a.kr}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.7,
                      color: "var(--fg-muted)",
                      maxWidth: "36ch",
                      wordBreak: "keep-all",
                    }}
                  >
                    {a.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: SVG Diagram A */}
          <div className="flex items-center justify-center md:col-span-6 md:col-start-7">
            <DiagramA inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DiagramA({ inView }: { inView: boolean }) {
  // Equilateral triangle with vertices around center (300, 290), radius 200
  // Architecture: top
  // Literacy: bottom-left
  // Operation: bottom-right
  const arch = { x: 300, y: 90 };
  const lit = { x: 127, y: 390 };
  const ops = { x: 473, y: 390 };
  const core = { x: 300, y: 290 };

  return (
    <svg
      viewBox="0 0 600 480"
      width="100%"
      style={{ overflow: "visible", maxWidth: 520 }}
      role="img"
      aria-label="Diagram: three ways in — Architecture, Literacy, Mapping — converging at a shared core"
    >
      {/* Outer triangle */}
      {[
        { from: arch, to: lit, delay: 0.5 },
        { from: lit, to: ops, delay: 0.65 },
        { from: ops, to: arch, delay: 0.8 },
      ].map((e, i) => (
        <motion.line
          key={`outer-${i}`}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: e.delay }}
        />
      ))}

      {/* Spokes to core (dashed, subtle) */}
      {[
        { from: arch, delay: 1.15 },
        { from: lit, delay: 1.3 },
        { from: ops, delay: 1.45 },
      ].map((e, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1={e.from.x}
          y1={e.from.y}
          x2={core.x}
          y2={core.y}
          stroke="var(--line-default)"
          strokeWidth={1}
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: e.delay }}
        />
      ))}

      {/* Spoke flow — small dashes drift from vertex toward core, infinite. */}
      {inView &&
        [arch, lit, ops].map((p, i) => (
          <motion.line
            key={`spoke-flow-${i}`}
            x1={p.x}
            y1={p.y}
            x2={core.x}
            y2={core.y}
            stroke="var(--fg-default)"
            strokeWidth={1}
            strokeDasharray="2 16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55, strokeDashoffset: [0, -36] }}
            transition={{
              opacity: { duration: 0.5, ease: EASE, delay: 1.9 + i * 0.05 },
              strokeDashoffset: {
                duration: 1.8,
                ease: "linear",
                delay: 1.9 + i * 0.05,
                repeat: Infinity,
              },
            }}
          />
        ))}

      {/* Vertex nodes + labels */}
      {[
        { p: arch, label: "Architecture", anchor: "middle" as const, lx: 0, ly: -22, delay: 0.25 },
        { p: lit, label: "Literacy", anchor: "end" as const, lx: -16, ly: 6, delay: 0.4 },
        { p: ops, label: "Mapping", anchor: "start" as const, lx: 16, ly: 6, delay: 0.55 },
      ].map((n, i) => (
        <g key={`vtx-${i}`}>
          <motion.circle
            cx={n.p.x}
            cy={n.p.y}
            r={9}
            fill="var(--surface-base)"
            stroke="var(--fg-default)"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: n.delay }}
            style={{ transformOrigin: `${n.p.x}px ${n.p.y}px` }}
          />
          <motion.text
            x={n.p.x + n.lx}
            y={n.p.y + n.ly}
            textAnchor={n.anchor}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: n.delay + 0.15 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 600,
              fill: "var(--fg-default)",
              letterSpacing: "0.01em",
            }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}

      {/* Core echo — expanding ring after reveal, infinite breath. */}
      {inView && (
        <motion.circle
          cx={core.x}
          cy={core.y}
          r={32}
          fill="none"
          stroke="var(--fg-default)"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.35, 0], scale: [1, 1.55] }}
          transition={{
            duration: 2.2,
            ease: EASE,
            delay: 1.9,
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
          style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
        />
      )}

      {/* Core node — label removed (Negative Space: 침묵의 코어) */}
      <motion.circle
        cx={core.x}
        cy={core.y}
        r={32}
        fill="var(--surface-base)"
        stroke="var(--fg-default)"
        strokeWidth={1.5}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
        style={{ transformOrigin: `${core.x}px ${core.y}px` }}
      />
    </svg>
  );
}
