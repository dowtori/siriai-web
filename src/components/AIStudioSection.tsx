"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const TOOLS = [
  { name: "Sora",        src: "/images/tools/sora.png" },
  { name: "Gemini",      src: "/images/tools/gemini.png" },
  { name: "DALL·E 2",   src: "/images/tools/dalle2.png" },
  { name: "Midjourney",  src: "/images/tools/midjourney.png" },
  { name: "ChatGPT",    src: "/images/tools/chatgpt.png" },
  { name: "Runway",      src: "/images/tools/runway.png" },
];

export default function AIStudioSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Exit — fade + rise as dark Creator section takes over
  const exitOpacity = useTransform(scrollYProgress, [0.60, 0.90], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0.60, 0.90], [0, -32]);

  // triple for seamless loop
  const marqueeItems = [...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <section
      ref={ref}
      className="bg-[#F4F1EB] min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <motion.div style={{ opacity: exitOpacity, y: exitY }}>
        {/* header — padded */}
        <div className="max-w-6xl mx-auto w-full px-8 md:px-12 lg:px-20 flex flex-col gap-5">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-black/30"
          >
            AI Creative Studio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold text-black leading-[1.18]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", wordBreak: "keep-all" }}
          >
            AI로 사고하고,<br />감각으로 표현합니다.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="text-[14px] text-black/50 leading-[1.85] max-w-xl"
            style={{ wordBreak: "keep-all" }}
          >
            최신 AI 툴을 조합하고 운영합니다. 트렌드를 따르는 것이 아니라,
            브랜드의 감각으로 번역합니다.
          </motion.p>
        </div>

        {/* logo marquee — full bleed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 border-y border-black/[0.06]"
        >
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 animate-siriai-marquee">
              {marqueeItems.map((tool, i) => (
                <div
                  key={i}
                  className="inline-flex items-center justify-center px-10 py-5 border-r border-black/[0.05] last:border-r-0"
                  style={{ minWidth: "180px" }}
                >
                  <img
                    src={tool.src}
                    alt={tool.name}
                    className="h-7 w-auto object-contain"
                    style={{ filter: "grayscale(1) opacity(0.35)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
