"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative bg-[#111110] py-40 px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.22em] uppercase text-white/25 mb-16"
        >
          Approach
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="font-bold text-white leading-[1.18]"
          style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
        >
          AI를 쓰는 것이 아니라,<br />
          AI로 생각하는 것.
        </motion.h2>

        <div className="mt-16 flex flex-col md:flex-row gap-16 md:gap-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-white/40 text-[15px] leading-[1.9] max-w-sm"
            style={{ wordBreak: "keep-all" }}
          >
            대부분의 조직은 AI 도구를 도입하지만, 그것을 설계하는 언어는
            갖지 못합니다. Siriai는 그 간극을 메웁니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="text-white/40 text-[15px] leading-[1.9] max-w-sm"
            style={{ wordBreak: "keep-all" }}
          >
            데이터 흐름을 구조화하고, 의사결정 로직을 설계하고, 조직이
            AI와 함께 생각할 수 있는 역량을 구축합니다.
          </motion.p>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
    </section>
  );
}
