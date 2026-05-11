"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function GrowthSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center py-16 px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-14 md:gap-24 items-center">

        {/* left: text */}
        <div className="flex-1 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-white/25"
          >
            — Growth Intelligence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold text-white leading-[1.22]"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.6rem)", wordBreak: "keep-all" }}
          >
            브랜드의 성장 곡선을<br />더 빠르게, 더 정확하게<br />설계합니다.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="text-[16px] font-semibold text-white/60 leading-[1.7]"
            style={{ wordBreak: "keep-all" }}
          >
            우리는 자동화하지 않습니다.<br />판단을 지능화합니다.
          </motion.p>
        </div>

        {/* right: SVG growth curve */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="w-full max-w-sm">
            <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none">
              {[60, 120, 180].map((y) => (
                <line
                  key={y}
                  x1="36" y1={y} x2="296" y2={y}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                />
              ))}
              <line x1="36" y1="14" x2="36" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <line x1="36" y1="210" x2="296" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <path
                d="M36 202 C84 192,124 172,164 142 S232 82,292 28 L292 210 Z"
                fill="url(#growthArea)"
              />
              <motion.path
                d="M36 202 C84 192,124 172,164 142 S232 82,292 28"
                stroke="rgba(196,181,253,0.75)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              />
              <motion.circle
                cx="292" cy="28" r="4"
                fill="#c4b5fd"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.9 }}
                style={{ transformOrigin: "292px 28px" }}
              />
              <defs>
                <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(196,181,253,0.12)" />
                  <stop offset="100%" stopColor="rgba(196,181,253,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
