"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LOGOS, LogoItem } from "@/components/v3/ClientsSection";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Stage 2 → Stage 3 사이 단독 가로 로고 ribbon.
 * paper 베이스, 위아래 hairline, 90s slow marquee (A안 60s 대비 더 느림).
 * A안 ClientsSection의 LOGOS·LogoItem 데이터 carry.
 */
export default function Stage23ClientsRibbon() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const track = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      ref={ref}
      aria-label="Clients"
      data-a1-stage="clients-ribbon"
      style={{
        position: "relative",
        background: "var(--a1-paper)",
        borderTop: "1px solid var(--a1-hairline)",
        borderBottom: "1px solid var(--a1-hairline)",
        overflow: "hidden",
        padding: "72px 0",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--a1-mute)",
          margin: "0 0 40px",
        }}
      >
        With
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max animate-siriai-marquee-slow"
          style={{ animationDuration: "90s", willChange: "transform" }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex shrink-0 items-center justify-center"
              style={{ paddingLeft: 36, paddingRight: 36, height: 56 }}
            >
              <LogoItem logo={logo} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
