"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const GRID_ITEMS = [
  { gradient: "from-[#e8d5c0] to-[#d4b896]" },
  { gradient: "from-[#c5d8e8] to-[#a8c4d8]" },
  { gradient: "from-[#d4c8e8] to-[#b8a8d4]" },
  { gradient: "from-[#c8e0d0] to-[#a8c8b8]" },
  { gradient: "from-[#e8e0c8] to-[#d4c8a8]" },
  { gradient: "from-[#e0c8c8] to-[#c8a8a8]" },
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

          {/* right: 2×3 grid */}
          <div className="flex-1 grid grid-cols-3 gap-3">
            {GRID_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25 + i * 0.07,
                }}
                className={`aspect-square rounded-xl bg-gradient-to-br ${item.gradient}`}
              />
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
