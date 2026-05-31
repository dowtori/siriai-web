"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";

/**
 * V4 ACT 1 — Hero (WebGL 깊이 · 느린 · 신비).
 * pinned(sticky) act: 스크롤이 카메라 push-in/scale을 구동. 3D 씬은 ssr:false 동적 로드.
 * 카피 v3 그대로. reduced-motion이면 정적.
 */
const V4HeroScene = dynamic(() => import("./V4HeroScene"), { ssr: false });

const PHRASES: [string, string][] = [
  ["Architecture for", "Insight with AI."],
  ["Not tools.", "Structure."],
  ["Not output.", "Decisions."],
  ["Not deployment.", "Design."],
];
const DWELL_MS = 6000;

export default function V4HeroV2() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [i, setI] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progress.current = v; });

  useEffect(() => {
    if (reduce) return;
    const tm = setInterval(() => setI((p) => (p + 1) % PHRASES.length), DWELL_MS);
    return () => clearInterval(tm);
  }, [reduce]);

  const phrase = PHRASES[i];

  return (
    <section ref={sectionRef} style={{ position: "relative", height: reduce ? "100vh" : "190vh", background: "var(--v4-midnight)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", color: "var(--v4-on-midnight)" }}>
        {/* WebGL 깊이 씬 */}
        <div style={{ position: "absolute", inset: 0 }}>
          <V4HeroScene progress={progress} reduce={reduce} />
        </div>

        {/* 중앙 가독 스크림 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(11,15,20,0.55) 0%, rgba(11,15,20,0.15) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 상단 바 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px clamp(24px, 5vw, 56px)", zIndex: 3 }}>
          <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1.05rem" }}>Siriai</span>
          <a href="#contact" style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)", textDecoration: "none" }}>Contact</a>
        </div>

        {/* 메시지 */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", zIndex: 2, pointerEvents: "none" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(10px)" }}
                transition={{ duration: reduce ? 0 : 1.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)", lineHeight: 1.05, letterSpacing: "-0.022em" }}
              >
                <span style={{ display: "block" }}>{phrase[0]}</span>
                <span style={{ display: "block" }}>{phrase[1]}</span>
              </motion.h1>
            </AnimatePresence>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4, delay: 1.1 }} style={{ marginTop: "clamp(28px, 4vw, 48px)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", color: "var(--v4-on-midnight-muted)" }}>
              AI 기반 인사이트, 가장 쉽고 감각적으로.
            </motion.p>
          </motion.div>
        </div>

        {/* 스크롤 큐 */}
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 2 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)" }}>Scroll</span>
          <span style={{ width: 1, height: 40, background: "var(--v4-line-dark)" }} />
        </div>
      </div>
    </section>
  );
}
