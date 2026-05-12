"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ARCHIVE_CARDS = [
  { label: "콘텐츠 도달",   value: "2.4M", sub: "impressions", bar: 78, tag: "Instagram", bg: "bg-[#ece6f5]", bar_color: "#c4b5fd" },
  { label: "인게이지먼트",  value: "9.2%", sub: "avg. rate",   bar: 92, tag: "TikTok",    bg: "bg-[#e8f4ec]", bar_color: "#4ade80" },
  { label: "크리에이터 ROI", value: "4.7×", sub: "return",     bar: 85, tag: "YouTube",   bg: "bg-[#fef9e7]", bar_color: "#fbbf24" },
  { label: "오디언스 구조", value: "68%",  sub: "F · 24–34",  bar: 68, tag: "분석됨",    bg: "bg-[#e8edf8]", bar_color: "#818cf8" },
  { label: "채널 성과",    value: "A+",   sub: "성과 등급",   bar: 95, tag: "아카이빙",  bg: "bg-[#fdf2f0]", bar_color: "#f87171" },
  { label: "신뢰 지수",    value: "91",   sub: "brand trust", bar: 91, tag: "누적됨",    bg: "bg-[#f0f4f8]", bar_color: "#94a3b8" },
];

export default function ArchivingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Exit — fades into the dark Manifesto section
  const exitOpacity = useTransform(scrollYProgress, [0.60, 0.90], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0.60, 0.90], [0, -28]);

  return (
    <section
      ref={ref}
      className="bg-[#F4F1EB] min-h-screen flex flex-col justify-center py-16 px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      <motion.div
        style={{ opacity: exitOpacity, y: exitY }}
        className="max-w-6xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">

          {/* left: text */}
          <div className="md:w-[40%] flex-shrink-0 flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.22em] uppercase text-black/30"
            >
              AI for Social Archiving
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-bold text-black leading-[1.25]"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 3rem)", wordBreak: "keep-all" }}
            >
              우리는 콘텐츠를<br />저장하지 않습니다.<br />가격을 구조화하고,<br />증거를 남깁니다.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="text-[13px] text-black/50 leading-[1.85]"
              style={{ wordBreak: "keep-all" }}
            >
              캠페인이 끝난 후에도 데이터는 남습니다.
              무엇이 작동했는지, 왜 작동했는지 —
              다음 전략의 기반이 됩니다.
            </motion.p>
          </div>

          {/* right: 2×3 archive data cards */}
          <div className="flex-1 grid grid-cols-3 gap-3">
            {ARCHIVE_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25 + i * 0.07,
                }}
                className={`rounded-xl ${card.bg} p-4 flex flex-col justify-between aspect-square`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.1em] uppercase text-black/30 font-medium">
                    {card.label}
                  </span>
                  <span className="text-[22px] font-bold text-black/75 leading-none">
                    {card.value}
                  </span>
                  <span className="text-[9px] text-black/30">{card.sub}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-1 w-full bg-black/[0.07] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${card.bar}%`, backgroundColor: card.bar_color }}
                    />
                  </div>
                  <span className="text-[9px] text-black/35 bg-white/50 px-1.5 py-0.5 rounded-full self-start">
                    {card.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
