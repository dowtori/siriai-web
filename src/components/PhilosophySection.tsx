"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

const HEADLINE_WORDS = ["AI를", "쓰는", "것이", "아니라,", "AI로", "생각하는", "것."];

// ── Desktop: sticky pinned 280vh scroll ─────────────────────────────
function PhilosophyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // headline fades slightly as carousel takes over
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.7, 0.88], [0, 1, 1, 0.4]);
  const headlineY = useTransform(scrollYProgress, [0, 0.12], [28, 0]);

  // carousel fades in
  const carouselOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  const carouselScale = useTransform(scrollYProgress, [0.08, 0.3], [0.96, 1]);

  // feature strip fades in last
  const featuresOpacity = useTransform(scrollYProgress, [0.62, 0.85], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.62, 0.85], [32, 0]);

  // grid overlay opacity
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#111110] flex flex-col py-20 px-8 lg:px-20">

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

        {/* label + headline */}
        <motion.div
          className="relative max-w-6xl mx-auto w-full"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/25">
            Philosophy
          </p>
          <h2
            className="mt-5 font-bold text-white leading-[1.18]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
          >
            AI를 쓰는 것이 아니라,<br />AI로 생각하는 것.
          </h2>
        </motion.div>

        {/* carousel */}
        <motion.div
          className="relative flex-1 flex items-center justify-center"
          style={{ opacity: carouselOpacity, scale: carouselScale }}
        >
          <div className="w-full max-w-4xl">
            <TurntableCarousel height={540} />
          </div>
        </motion.div>

        {/* feature strip */}
        <motion.div
          className="relative max-w-6xl mx-auto w-full"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
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
              <p className="text-[12px] text-white/35 leading-[1.85]" style={{ wordBreak: "keep-all" }}>{f.desc}</p>
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
