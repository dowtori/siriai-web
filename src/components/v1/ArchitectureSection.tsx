"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const COLS = [
  {
    en: "Relationship Architecture",
    ko: "관계 설계",
    desc: "브랜드와 오디언스 사이의 신호를 구조화합니다. 콘텐츠가 아닌 연결을 설계하고, 접점마다 의도를 심습니다.",
  },
  {
    en: "Insight Structure",
    ko: "인사이트 구조",
    desc: "데이터를 수집하는 것이 아니라 읽는 방법을 설계합니다. 숫자 너머의 맥락을 판단 가능한 언어로 번역합니다.",
  },
];

export default function ArchitectureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="bg-[#3D3B2A] min-h-screen flex flex-col justify-center py-16 px-8 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">

        {/* header */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-white/30"
          >
            — Structure
          </motion.p>
          <motion.h2
            initial={{ clipPath: "inset(0 102% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-bold text-white leading-[1.18]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
          >
            관계, 신뢰, 감각<br />그리고 AI.
          </motion.h2>
        </div>

        {/* 2-col cards */}
        <div className="grid md:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/[0.07]">
          {COLS.map((col, i) => (
            <motion.div
              key={col.en}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.12 }}
              className="bg-[#3D3B2A] border border-white/[0.07] p-8 md:p-10 flex flex-col gap-4"
            >
              <span className="text-[11px] tracking-[0.18em] uppercase text-white/30">
                {col.ko}
              </span>
              <h3
                className="text-[20px] md:text-[24px] font-bold text-white leading-snug"
                style={{ wordBreak: "keep-all" }}
              >
                {col.en}
              </h3>
              <p
                className="text-[13px] text-white/50 leading-[1.85]"
                style={{ wordBreak: "keep-all" }}
              >
                {col.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
        >
          <Link
            href="/v1/contact"
            className="inline-block bg-white text-[#3D3B2A] text-[13px] font-semibold tracking-[0.06em] px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            문의하기
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
