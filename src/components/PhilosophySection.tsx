"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative bg-[#111110] min-h-screen flex flex-col py-24 px-8 overflow-hidden"
    >
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* top: label + headline */}
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
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-6 font-bold text-white leading-[1.18]"
          style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
        >
          AI를 쓰는 것이 아니라,<br />AI로 생각하는 것.
        </motion.h2>
      </div>

      {/* center: 3D orbiting carousel — expanded width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative flex-1 flex items-center justify-center min-h-[440px]"
      >
        <div className="w-full max-w-4xl">
          <TurntableCarousel height={580} />
        </div>
      </motion.div>

      {/* bottom: feature strip */}
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col gap-3"
            >
              <span className="text-[11px] font-mono text-white/20 tracking-wider">
                {f.number}
              </span>
              <h3
                className="text-[15px] font-semibold text-white/85 leading-snug"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
