"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OrbCanvas = dynamic(() => import("./OrbCanvas"), { ssr: false });

// Headline split into words for stagger
const LINE1 = ["관계에서", "시작해", "데이터로", "확장하고,"];
const LINE2 = ["기록으로", "증명합니다."];
const ALL_WORDS = [...LINE1, ...LINE2];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Orb parallax — moves up slower than scroll
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  // Text fades slightly as hero scrolls away
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex flex-col md:flex-row"
    >
      {/* 텍스트 영역 */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 w-full md:w-[48%] flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-32 pb-16 md:pt-0 md:pb-0 items-start"
      >
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 px-3 py-1 rounded-full border border-black/15 text-[11px] font-medium tracking-widest uppercase text-black/50"
        >
          사람을 이해하고, 세상을 연결하는 AI
        </motion.div>

        {/* word-stagger headline */}
        <h1
          className="font-bold leading-[1.18] text-black"
          style={{ fontSize: "clamp(2.6rem, 4vw, 5rem)" }}
        >
          <div className="flex flex-wrap gap-x-[0.35em] mb-[0.1em]">
            {LINE1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.65,
                  delay: 0.25 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-[0.35em]">
            {LINE2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.65,
                  delay: 0.25 + (LINE1.length + i) * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 + ALL_WORDS.length * 0.09 + 0.1 }}
          className="mt-5 text-[13px] tracking-wide text-black/40 font-medium"
        >
          Architecture for Insight, AI
        </motion.p>
      </motion.div>

      {/* Orb — parallax */}
      <motion.div
        className="hidden md:block md:w-[52%] relative min-h-screen"
        style={{
          y: orbY,
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
        }}
      >
        <OrbCanvas />
      </motion.div>

      {/* 스크롤 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-black/30">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
