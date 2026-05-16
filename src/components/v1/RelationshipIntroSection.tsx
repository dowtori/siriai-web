"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function RelationshipIntroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Card parallax — mirror of ConnectionSection
  const cardY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  // Exit — content fades and rises as section scrolls out
  const exitOpacity = useTransform(scrollYProgress, [0.62, 0.92], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0.62, 0.92], [0, -28]);

  return (
    <section
      ref={ref}
      className="bg-[#F4F1EB] min-h-screen flex flex-col justify-center py-16 px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      <motion.div
        style={{ opacity: exitOpacity, y: exitY }}
        className="max-w-6xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center">

          {/* text */}
          <div className="flex-1 flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.22em] uppercase text-black/30"
            >
              — Relationship
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-bold text-black leading-[1.22]"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.6rem)", wordBreak: "keep-all" }}
            >
              단순히 만드는 것이 아니라,<br />관계를 정착하고<br />의미로 남깁니다.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="text-[14px] text-black/50 leading-[1.85] max-w-md"
              style={{ wordBreak: "keep-all" }}
            >
              콘텐츠는 사라지지만 구조는 남습니다.
              데이터가 축적되고, 신뢰가 자산이 됩니다.
            </motion.p>
          </div>

          {/* left: relationship structure card */}
          <motion.div
            style={{ y: cardY }}
            className="flex-1 w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden"
            >
              {/* header */}
              <div className="px-6 py-4 border-b border-black/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
                  <span className="text-[10px] tracking-[0.16em] uppercase text-black/30 font-medium">
                    Relationship Index
                  </span>
                </div>
                <span className="text-[10px] font-mono text-black/20">2025 Q1</span>
              </div>

              {/* 3 metrics */}
              <div className="grid grid-cols-3 divide-x divide-black/[0.05]">
                {[
                  { label: "도달 관계", value: "1.2M", sub: "+18%" },
                  { label: "관계 깊이", value: "94.3", sub: "score" },
                  { label: "신뢰 자산", value: "3.8년", sub: "avg" },
                ].map((m) => (
                  <div key={m.label} className="px-4 py-4 flex flex-col gap-1">
                    <span className="text-[10px] text-black/30">{m.label}</span>
                    <span className="text-[17px] font-bold text-black/75 leading-none">{m.value}</span>
                    <span className="text-[10px] text-black/25">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* mini trend chart */}
              <div className="px-6 py-3">
                <svg viewBox="0 0 280 52" className="w-full" fill="none">
                  <path
                    d="M0 46 C50 42, 80 34, 120 26 S185 12, 220 7 S260 3, 280 1"
                    stroke="url(#relLineGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 46 C50 42, 80 34, 120 26 S185 12, 220 7 S260 3, 280 1 L280 52 L0 52 Z"
                    fill="url(#relAreaGrad)"
                  />
                  <defs>
                    <linearGradient id="relLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                    <linearGradient id="relAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(196,181,253,0.13)" />
                      <stop offset="100%" stopColor="rgba(196,181,253,0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* campaign archive list */}
              <div className="border-t border-black/[0.05]">
                {[
                  { name: "캠페인 #24-09", date: "2024.09", status: "아카이빙", dot: "bg-[#c4b5fd]" },
                  { name: "캠페인 #24-12", date: "2024.12", status: "완료", dot: "bg-emerald-400" },
                  { name: "캠페인 #25-02", date: "2025.02", status: "진행중", dot: "bg-amber-400" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="px-6 py-3 flex items-center gap-3 border-b border-black/[0.04] last:border-0"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    <span className="flex-1 text-[12px] text-black/55">{item.name}</span>
                    <span className="text-[10px] font-mono text-black/25">{item.date}</span>
                    <span className="text-[10px] text-black/35 bg-black/[0.04] px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
