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

          {/* left: parallax mockup card */}
          <motion.div
            style={{ y: cardY }}
            className="flex-1 w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] p-7 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8e6cf] to-[#3d8b6a] flex-shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-2.5 w-24 bg-black/[0.08] rounded-full" />
                  <div className="h-2 w-16 bg-black/[0.05] rounded-full" />
                </div>
                <div className="h-7 w-20 rounded-full bg-black/[0.04]" />
              </div>
              <div className="h-px bg-black/[0.05]" />
              <div className="flex flex-col gap-2.5">
                {[72, 58, 80, 44].map((w, i) => (
                  <div
                    key={i}
                    className="h-2.5 bg-black/[0.05] rounded-full"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 h-20 rounded-xl bg-gradient-to-br from-[#f0e6d3] to-[#e0c8a8]" />
                <div className="flex-1 h-20 rounded-xl bg-gradient-to-br from-[#dce8f5] to-[#b8cfe8]" />
                <div className="flex-1 h-20 rounded-xl bg-gradient-to-br from-[#ece6f5] to-[#d4c4e8]" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
