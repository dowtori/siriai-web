"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import TurntableCarousel from "./TurntableCarousel";

const FEATURES = [
  {
    number: "01",
    title: "AI 아키텍처 설계",
    desc: "조직의 데이터 흐름과 의사결정 구조를 분석합니다. AI가 실제로 작동할 수 있는 논리적 토대를 설계합니다.",
  },
  {
    number: "02",
    title: "AI 리터러시 구축",
    desc: "팀이 AI와 함께 생각하는 방법을 배웁니다. 조직 전체가 AI를 언어처럼 쓸 수 있도록 역량을 키웁니다.",
  },
  {
    number: "03",
    title: "인사이트 기반 운영",
    desc: "실행 결과를 측정 가능한 인사이트로 전환합니다. 데이터에서 판단으로, 판단에서 다음 설계로 이어집니다.",
  },
];

// ── Desktop: pure typographic scroll experience ─────────────────────
// Inspired by: Apple Silicon pages, Linear philosophy, Anthropic brand
// Rule: typography IS the visual. No cards, no carousel, no boxes.
function PhilosophyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Grid
  const gridO = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const labelO = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  // Line 1: "AI를 쓰는 것이 아니라,"  — white, the premise
  const l1O = useTransform(scrollYProgress, [0.04, 0.18, 0.80, 0.90], [0, 1, 1, 0]);
  const l1Y = useTransform(scrollYProgress, [0.04, 0.18], [56, 0]);

  // Line 2: "AI로 생각하는 것."  — purple, the answer (delayed)
  const l2O = useTransform(scrollYProgress, [0.18, 0.32, 0.80, 0.90], [0, 1, 1, 0]);
  const l2Y = useTransform(scrollYProgress, [0.18, 0.32], [56, 0]);

  // Bridge divider + subtitle  — after both lines are fully visible
  const bridgeO = useTransform(scrollYProgress, [0.36, 0.48], [0, 1]);
  const bridgeY = useTransform(scrollYProgress, [0.36, 0.48], [16, 0]);

  // Feature columns — staggered reveal
  const c1O = useTransform(scrollYProgress, [0.50, 0.62], [0, 1]);
  const c1Y = useTransform(scrollYProgress, [0.50, 0.62], [20, 0]);
  const c2O = useTransform(scrollYProgress, [0.57, 0.69], [0, 1]);
  const c2Y = useTransform(scrollYProgress, [0.57, 0.69], [20, 0]);
  const c3O = useTransform(scrollYProgress, [0.64, 0.76], [0, 1]);
  const c3Y = useTransform(scrollYProgress, [0.64, 0.76], [20, 0]);

  const colMotion = [
    { opacity: c1O, y: c1Y },
    { opacity: c2O, y: c2Y },
    { opacity: c3O, y: c3Y },
  ];

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#111110]">

        {/* grid overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: gridO,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* section label */}
        <motion.p
          className="absolute top-12 left-8 lg:left-20 text-[11px] tracking-[0.22em] uppercase text-white/25"
          style={{ opacity: labelO }}
        >
          Philosophy
        </motion.p>

        {/* ── HEADLINE BLOCK ──
            Positioned at upper-center of viewport.
            Line 1 (white) = the problem / old way
            Line 2 (purple) = the answer / SIRIAI's way
            The delayed entrance of line 2 makes the contrast land harder.
        */}
        <div
          className="absolute left-0 right-0 px-8 lg:px-20"
          style={{ top: "20%" }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-bold text-white/85 leading-[1.08] block"
              style={{
                opacity: l1O,
                y: l1Y,
                fontSize: "clamp(3.4rem, 7vw, 8rem)",
                wordBreak: "keep-all",
              }}
            >
              AI를 쓰는 것이 아니라,
            </motion.h2>
            <motion.h2
              className="font-bold leading-[1.08] block"
              style={{
                opacity: l2O,
                y: l2Y,
                fontSize: "clamp(3.4rem, 7vw, 8rem)",
                wordBreak: "keep-all",
                color: "rgba(196,181,253,0.92)",
              }}
            >
              AI로 생각하는 것.
            </motion.h2>
          </div>
        </div>

        {/* ── BRIDGE ──
            A horizontal rule with a three-term subtitle.
            Connects the headline to the feature details below.
            Thin, editorial — like a chapter subheading in a book.
        */}
        <div
          className="absolute left-0 right-0 px-8 lg:px-20"
          style={{ top: "62%" }}
        >
          <motion.div
            className="max-w-6xl mx-auto"
            style={{ opacity: bridgeO, y: bridgeY }}
          >
            <div className="flex items-center gap-5">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <p
                className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-mono whitespace-nowrap"
              >
                아키텍처 설계 &nbsp;·&nbsp; AI 리터러시 &nbsp;·&nbsp; 인사이트 기반 운영
              </p>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>
          </motion.div>
        </div>

        {/* ── FEATURE COLUMNS ──
            Appear at the bottom of the viewport, revealing one by one.
            Not a card grid — just text in columns. Clean, architectural.
        */}
        <div className="absolute bottom-10 left-8 lg:left-20 right-8 lg:right-20">
          <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-white/[0.07]">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.number}
                className="px-8 first:pl-0 last:pr-0 flex flex-col gap-3"
                style={{
                  opacity: colMotion[i].opacity,
                  y: colMotion[i].y,
                }}
              >
                <span className="text-[11px] font-mono text-white/18 tracking-wider">
                  {f.number}
                </span>
                <h3
                  className="text-[14px] font-semibold text-white/80 leading-snug"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[12px] text-white/32 leading-[1.85]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Mobile: regular triggered layout ────────────────────────────────
function PhilosophyMobile() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="md:hidden relative bg-[#111110] min-h-screen flex flex-col py-20 px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.22em] uppercase text-white/25"
        >
          Philosophy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-5 font-bold text-white leading-[1.12]"
          style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", wordBreak: "keep-all" }}
        >
          AI를 쓰는 것이 아니라,{" "}
          <span style={{ color: "rgba(196,181,253,0.92)" }}>
            AI로 생각하는 것.
          </span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative flex-1 flex items-center justify-center min-h-[360px]"
      >
        <TurntableCarousel height={420} />
      </motion.div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.55 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-6 flex flex-col gap-2"
            >
              <span className="text-[11px] font-mono text-white/20">{f.number}</span>
              <h3 className="text-[14px] font-semibold text-white/85">{f.title}</h3>
              <p
                className="text-[12px] text-white/35 leading-[1.85]"
                style={{ wordBreak: "keep-all" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PhilosophySection() {
  return (
    <>
      <PhilosophyDesktop />
      <PhilosophyMobile />
    </>
  );
}
