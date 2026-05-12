"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import TurntableCarousel from "./TurntableCarousel";

// ── 3 philosophy statements revealed sequentially ───────────────────
const STATEMENTS = [
  {
    tag: "사고의 전환",
    headline: ["AI를 쓰는 것이 아니라,", "AI로 생각하는 것."],
    body: "도구와 전략의 차이는 사용자가 아닌 설계자의 관점에서 시작됩니다. 우리는 AI를 어디에 놓을지가 아니라, 어떻게 생각하게 할지를 설계합니다.",
  },
  {
    tag: "구조의 역할",
    headline: ["구조가 있어야", "AI가 작동합니다."],
    body: "아키텍처 없이 투입된 AI는 혼란을 자동화할 뿐입니다. 데이터 흐름, 판단 노드, 피드백 루프 — 이것들이 먼저 설계되어야 합니다.",
  },
  {
    tag: "판단의 본질",
    headline: ["판단은 데이터에서", "오지 않습니다."],
    body: "데이터를 읽는 방법에서 옵니다. 우리는 도구를 가르치지 않습니다. 조직이 AI와 함께 생각하는 방법을 설계합니다.",
  },
];

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

// ── Desktop: 280vh sticky — pure scroll-linked crossfade ────────────
function PhilosophyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Grid
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Section label
  const labelOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // TurntableCarousel — ambient background
  const carouselOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.80, 0.92],
    [0, 0.20, 0.20, 0]
  );

  // Statement 1  [0.08 → 0.44]
  const s1Opacity = useTransform(
    scrollYProgress,
    [0.08, 0.17, 0.36, 0.44],
    [0, 1, 1, 0]
  );
  const s1Y = useTransform(
    scrollYProgress,
    [0.08, 0.17, 0.36, 0.44],
    [28, 0, 0, -14]
  );

  // Statement 2  [0.36 → 0.70]
  const s2Opacity = useTransform(
    scrollYProgress,
    [0.36, 0.46, 0.60, 0.70],
    [0, 1, 1, 0]
  );
  const s2Y = useTransform(
    scrollYProgress,
    [0.36, 0.46, 0.60, 0.70],
    [28, 0, 0, -14]
  );

  // Statement 3  [0.62 → 0.88]
  const s3Opacity = useTransform(
    scrollYProgress,
    [0.62, 0.72, 0.82, 0.88],
    [0, 1, 1, 0]
  );
  const s3Y = useTransform(
    scrollYProgress,
    [0.62, 0.72, 0.82, 0.88],
    [28, 0, 0, -14]
  );

  const stmtMotion = [
    { opacity: s1Opacity, y: s1Y },
    { opacity: s2Opacity, y: s2Y },
    { opacity: s3Opacity, y: s3Y },
  ];

  // Progress timeline fill
  const timelineFill = useTransform(scrollYProgress, [0.08, 0.88], ["0%", "100%"]);

  // Features strip
  const featuresOpacity = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.84, 0.96], [32, 0]);

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
            opacity: gridOpacity,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* TurntableCarousel — background atmosphere */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: carouselOpacity }}
        >
          <div className="w-full" style={{ maxWidth: "680px" }}>
            <TurntableCarousel height={560} />
          </div>
        </motion.div>

        {/* Section label */}
        <motion.p
          className="absolute top-12 left-8 lg:left-20 text-[11px] tracking-[0.22em] uppercase text-white/25"
          style={{ opacity: labelOpacity }}
        >
          Philosophy
        </motion.p>

        {/* Left progress timeline */}
        <div className="absolute left-8 lg:left-20 top-[28%] bottom-[28%] flex flex-col items-center">
          <div className="relative w-px flex-1 bg-white/[0.06]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white/30 origin-top"
              style={{ height: timelineFill }}
            />
          </div>
        </div>

        {/* Statements — all absolute, pure opacity crossfade */}
        {STATEMENTS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            style={{
              opacity: stmtMotion[i].opacity,
              y: stmtMotion[i].y,
              paddingLeft: "clamp(3.5rem, 8vw, 6rem)",
              paddingRight: "clamp(3.5rem, 8vw, 6rem)",
            }}
          >
            <div className="max-w-6xl mx-auto w-full">
              <p className="text-[10px] tracking-[0.24em] uppercase text-white/20 mb-6 font-mono">
                — {s.tag}
              </p>
              <h2
                className="font-bold text-white leading-[1.15]"
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
                  wordBreak: "keep-all",
                }}
              >
                {s.headline[0]}
                <br />
                {s.headline[1]}
              </h2>
              <p
                className="mt-7 text-[14px] text-white/38 leading-[2] max-w-lg"
                style={{ wordBreak: "keep-all" }}
              >
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Feature strip */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 lg:px-20 pb-10 pointer-events-none"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-white/[0.07]">
            {FEATURES.map((f) => (
              <div
                key={f.number}
                className="px-8 first:pl-0 last:pr-0 flex flex-col gap-3"
              >
                <span className="text-[11px] font-mono text-white/20 tracking-wider">
                  {f.number}
                </span>
                <h3
                  className="text-[14px] font-semibold text-white/85 leading-snug"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[12px] text-white/35 leading-[1.85]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

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
          className="mt-5 font-bold text-white leading-[1.18]"
          style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", wordBreak: "keep-all" }}
        >
          AI를 쓰는 것이 아니라,<br />AI로 생각하는 것.
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
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
