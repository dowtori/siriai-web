"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const OrbCanvas = dynamic(() => import("./OrbCanvas"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col md:flex-row">
      {/* 텍스트 영역 */}
      <div className="relative z-10 w-full md:w-[48%] flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-32 pb-16 md:pt-0 md:pb-0 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 px-3 py-1 rounded-full border border-black/15 text-[11px] font-medium tracking-widest uppercase text-black/50"
        >
          사람을 이해하고, 세상을 연결하는 AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold leading-[1.25] text-black"
          style={{ fontSize: "clamp(2rem, 2.5vw, 2.8rem)", wordBreak: "keep-all" }}
        >
          관계에서 시작해 데이터로 확장하고,<br />
          기록으로 증명합니다.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 text-[13px] tracking-wide text-black/40 font-medium"
        >
          Architecture for Insight, AI
        </motion.p>
      </div>

      {/* 파티클 캔버스 — 왼쪽 경계를 그라데이션으로 소멸 */}
      <div
        className="hidden md:block md:w-[52%] relative min-h-screen"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
          maskImage:        "linear-gradient(to bottom, transparent 0%, black 18%)",
        }}
      >
        <OrbCanvas />
      </div>

      {/* 스크롤 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-black/30">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
