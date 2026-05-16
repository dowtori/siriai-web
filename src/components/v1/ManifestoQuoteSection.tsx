"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = ["속도와 정확함만으로는", "충분하지 않습니다."];
const BODY =
  "의미와 타이밍이 성과를 결정합니다. 데이터가 방향을 제시하고, AI가 실행되어 사람의 감각이 그 모든 것을 하나의 결로 완성합니다.";

const headlineStyle = {
  fontSize: "clamp(2.6rem, 5.5vw, 6rem)",
  wordBreak: "keep-all" as const,
};

export default function ManifestoQuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const line0Opacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const line0Y      = useTransform(scrollYProgress, [0.2, 0.55], [40, 0]);
  const line1Opacity = useTransform(scrollYProgress, [0.35, 0.68], [0, 1]);
  const line1Y      = useTransform(scrollYProgress, [0.35, 0.68], [40, 0]);
  const bodyOpacity  = useTransform(scrollYProgress, [0.55, 0.88], [0, 1]);
  const bodyY        = useTransform(scrollYProgress, [0.55, 0.88], [24, 0]);
  const glowScale    = useTransform(scrollYProgress, [0.2, 1], [0.6, 1.25]);
  const glowOpacity  = useTransform(scrollYProgress, [0.2, 0.65], [0, 0.09]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-16 px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* scroll-linked glow */}
      <motion.div
        className="absolute right-0 bottom-0 w-[600px] h-[700px] pointer-events-none"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background: "radial-gradient(ellipse at 70% 90%, #c4b5fd 0%, transparent 65%)",
          transformOrigin: "bottom right",
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <motion.h2
            className="font-bold text-white leading-[1.15]"
            style={{ ...headlineStyle, opacity: line0Opacity, y: line0Y }}
          >
            {LINES[0]}
          </motion.h2>
          <motion.h2
            className="font-bold text-white leading-[1.15]"
            style={{ ...headlineStyle, opacity: line1Opacity, y: line1Y }}
          >
            {LINES[1]}
          </motion.h2>
        </div>

        <motion.p
          className="text-[15px] text-white/40 leading-[1.9] max-w-2xl"
          style={{ wordBreak: "keep-all", opacity: bodyOpacity, y: bodyY }}
        >
          {BODY}
        </motion.p>
      </div>
    </section>
  );
}
