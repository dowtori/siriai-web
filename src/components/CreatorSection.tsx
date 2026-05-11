"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CreatorSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background parallax — image moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Text scale + opacity reveal
  const textScale  = useTransform(scrollYProgress, [0.15, 0.45], [0.95, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.15, 0.45], [48, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* parallax background */}
      <motion.div
        className="absolute inset-[-15%]"
        style={{
          y: bgY,
          backgroundImage: "url('/images/forest.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(8,14,8,0.84) 0%, rgba(4,10,4,0.90) 100%)",
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* content */}
      <motion.div
        style={{ scale: textScale, opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-4xl mx-auto px-8 md:px-12 text-center flex flex-col gap-7 items-center"
      >
        <p className="text-[11px] tracking-[0.22em] uppercase text-white/30">
          Global Creators
        </p>
        <h2
          className="font-bold text-white leading-[1.18]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", wordBreak: "keep-all" }}
        >
          전 세계의 크리에이터와<br />함께 브랜드의 관계를<br />구축합니다.
        </h2>
        <p
          className="text-[15px] text-white/40 leading-[1.85] max-w-lg"
          style={{ wordBreak: "keep-all" }}
        >
          단순 바이럴이 아닙니다. 브랜드의 언어를 이해하는 크리에이터와
          장기적인 관계 구조를 만들어갑니다.
        </p>
      </motion.div>
    </section>
  );
}
