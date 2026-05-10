"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const IMAGE_DATA = [
  { src: "/works/context.png", alt: "Context" },
  { src: "/works/signal.png", alt: "Signal" },
  { src: "/works/question.png", alt: "Question" },
  { src: "/works/edge.png", alt: "Edge" },
  { src: "/works/clarity.png", alt: "Clarity" },
  { src: "/works/modeling.png", alt: "Modeling" },
  { src: "/works/oversight.png", alt: "Oversight" },
  { src: "/works/trace.png", alt: "Trace" },
  { src: "/works/flow.png", alt: "Flow" },
  { src: "/works/rhythm.png", alt: "Rhythm" },
  { src: "/works/connection.png", alt: "Connection" },
  { src: "/works/momentum.png", alt: "Momentum" },
  { src: "/works/evidence.png", alt: "Evidence" },
  { src: "/works/benchmark.png", alt: "Benchmark" },
  { src: "/works/learning.png", alt: "Learning" },
  { src: "/works/compounding.png", alt: "Compounding" },
];

const TARGET_VEL = 0.38;

function PhotoCircle({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const isHovering = useRef(false);
  const isAnimating = useRef(false);
  const rafRef = useRef(0);

  const startAnimation = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tick = () => {
      if (isHovering.current) {
        velRef.current += (TARGET_VEL - velRef.current) * 0.05;
      } else {
        velRef.current *= 0.93;
      }

      if (Math.abs(velRef.current) < 0.005 && !isHovering.current) {
        velRef.current = 0;
        isAnimating.current = false;
        return;
      }

      angleRef.current += velRef.current;
      if (containerRef.current) {
        containerRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square overflow-hidden rounded-full cursor-pointer"
      onMouseEnter={() => {
        isHovering.current = true;
        if (overlayRef.current) overlayRef.current.style.backdropFilter = "blur(6px)";
        startAnimation();
      }}
      onMouseLeave={() => {
        isHovering.current = false;
        if (overlayRef.current) overlayRef.current.style.backdropFilter = "blur(0px)";
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />

      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.32) 100%)",
          backdropFilter: "blur(0px)",
          transition: "backdrop-filter 450ms ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function WorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="bg-[#111110] py-36 px-8 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-20 flex-wrap gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-white/25"
          >
            Works
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <h2
              className="font-bold text-white leading-[1.2]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)", wordBreak: "keep-all" }}
            >
              구조가 있어야<br />
              AI가 작동합니다.
            </h2>
            <p
              className="mt-8 text-white/35 text-[14px] leading-[1.9] max-w-sm"
              style={{ wordBreak: "keep-all" }}
            >
              Siriai는 AI 도구를 나열하지 않습니다. 조직이 AI를 실제로 운영할 수 있는
              아키텍처를 설계합니다. 데이터, 판단, 실행이 연결되는 구조입니다.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-8"
            >
              {[["30+", "프로젝트"], ["12+", "파트너사"], ["100%", "구조 기반"]].map(
                ([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[28px] font-bold text-white leading-none">
                      {num}
                    </span>
                    <span className="text-[11px] text-white/30 tracking-wide">
                      {label}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.18 }}
            className="relative"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {IMAGE_DATA.map((item, i) => (
                <PhotoCircle key={i} src={item.src} alt={item.alt} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
