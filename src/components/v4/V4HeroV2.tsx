"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import V4GlassButton from "./V4GlassButton";

/**
 * V4 ACT 1 — Hero (안정본).
 * 배경: GLSL 아우로라(작동 확인). 표면: 정적 텍스트 + 글라스 CTA(DOM, 안정 렌더).
 * 비고: 진짜 3D 오브제 토큰은 헤드리스 검증이 불가해 별도 루프로 분리(아래 보고 참조).
 */
const V4HeroScene = dynamic(() => import("./V4HeroScene"), { ssr: false });

export default function V4HeroV2() {
  const reduce = useReducedMotion() ?? false;
  const [reveal, setReveal] = useState(false);
  const showKr = reduce || reveal;
  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", background: "var(--v4-midnight)", color: "var(--v4-on-midnight)" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <V4HeroScene />
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px clamp(24px, 5vw, 56px)", zIndex: 3 }}>
        <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1.05rem" }}>Siriai</span>
        <a href="#contact" style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)", textDecoration: "none" }}>Contact</a>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", zIndex: 2 }}>
        {/* 헤드라인(영문) — 호버 시 한글 태그라인이 천천히 드러남 (monopo 결). reduced-motion이면 항상 표시 */}
        <div
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)", lineHeight: 1.06, letterSpacing: "-0.024em", textShadow: "0 2px 50px rgba(0,0,0,0.5)" }}>
            <span style={{ display: "block" }}>Architecture for</span>
            <span style={{ display: "block" }}>Insight with AI.</span>
          </h1>
          {/* 공간 항상 예약(레이아웃 시프트 방지), opacity로만 reveal */}
          <motion.p
            initial={false}
            animate={{ opacity: showKr ? 1 : 0, y: showKr ? 0 : -4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ margin: "clamp(20px, 3vw, 34px) 0 0", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", color: "var(--v4-on-midnight-muted)", pointerEvents: "none" }}
          >
            AI 기반 인사이트, 가장 쉽고 감각적으로.
          </motion.p>
        </div>
        <div style={{ height: "clamp(36px, 4.5vw, 56px)" }} />
        <V4GlassButton label="Talk to us" href="#contact" />
      </div>

      <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 2 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)" }}>Scroll</span>
        <span style={{ width: 1, height: 40, background: "var(--v4-line-dark)" }} />
      </div>
    </section>
  );
}
