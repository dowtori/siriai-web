"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    icon: "◈",
    en: "Generative Media Ops",
    ko: "생성형 미디어 운영",
    desc: "AI 기반 콘텐츠 생산 파이프라인을 설계하고 운영합니다. 속도와 일관성을 동시에 확보합니다.",
  },
  {
    icon: "◎",
    en: "Adaptive Targeting",
    ko: "적응형 타겟팅",
    desc: "실시간 오디언스 신호를 분석하고 세그먼트를 자동 최적화합니다. 캠페인이 스스로 정교해집니다.",
  },
  {
    icon: "◇",
    en: "Predictive Funnel",
    ko: "예측 퍼널",
    desc: "전환 경로를 예측하고 이탈 지점에 사전 개입합니다. 데이터가 다음 행동을 먼저 말합니다.",
  },
  {
    icon: "⬡",
    en: "Multi-Agent Campaign Orchestration",
    ko: "멀티 에이전트 캠페인",
    desc: "복수의 AI 에이전트가 채널과 시점을 조율하며 캠페인을 동시 운영합니다.",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="bg-[#F4F1EB] min-h-screen flex flex-col justify-center py-16 px-8 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">

        {/* header */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-black/30"
          >
            — Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-bold text-black leading-[1.18]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", wordBreak: "keep-all" }}
          >
            브랜드의 성장을<br />구조로 설계합니다.
          </motion.h2>
        </div>

        {/* 2×2 cards — diagonal stagger */}
        <div className="grid md:grid-cols-2 gap-3">
          {SERVICES.map((s, i) => {
            // 0=TL, 1=TR, 2=BL, 3=BR — alternate x direction per column
            const xDir = i % 2 === 0 ? -18 : 18;
            const yOffset = i < 2 ? 20 : 8;
            return (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, x: xDir, y: yOffset }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.12 + i * 0.1,
              }}
              className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-black/[0.05]"
            >
              <span className="text-[20px] text-black/15 font-light">{s.icon}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] tracking-[0.16em] uppercase text-black/30">
                  {s.ko}
                </span>
                <h3
                  className="text-[16px] font-bold text-black leading-snug"
                  style={{ wordBreak: "keep-all" }}
                >
                  {s.en}
                </h3>
              </div>
              <p
                className="text-[12px] text-black/50 leading-[1.85]"
                style={{ wordBreak: "keep-all" }}
              >
                {s.desc}
              </p>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
