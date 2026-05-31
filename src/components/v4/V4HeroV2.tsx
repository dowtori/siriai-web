"use client";

import dynamic from "next/dynamic";
import V4GlassButton from "./V4GlassButton";

/**
 * V4 ACT 1 — Hero (재설계).
 * 2개 층: [배경] GLSL 안개/오로라 luminous form · [표면] 정적 텍스트 + 3D 글라스 CTA(히어로 포인트).
 * 텍스트 모션 없음. 스크롤 확대 없음. 카피 v3 그대로.
 */
const V4HeroScene = dynamic(() => import("./V4HeroScene"), { ssr: false });

export default function V4HeroV2() {
  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", background: "var(--v4-midnight)", color: "var(--v4-on-midnight)" }}>
      {/* 배경 층 — GLSL 오로라 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <V4HeroScene />
      </div>

      {/* 상단 바 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px clamp(24px, 5vw, 56px)", zIndex: 3 }}>
        <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1.05rem" }}>Siriai</span>
        <a href="#contact" style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)", textDecoration: "none" }}>Contact</a>
      </div>

      {/* 표면 층 — 정적 텍스트 + 3D 글라스 CTA */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", zIndex: 2 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)", lineHeight: 1.06, letterSpacing: "-0.024em", textShadow: "0 2px 50px rgba(0,0,0,0.45)" }}>
          <span style={{ display: "block" }}>Architecture for</span>
          <span style={{ display: "block" }}>Insight with AI.</span>
        </h1>
        <p style={{ margin: "clamp(24px, 3.5vw, 40px) 0 clamp(36px, 4.5vw, 56px)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", color: "var(--v4-on-midnight-muted)" }}>
          AI 기반 인사이트, 가장 쉽고 감각적으로.
        </p>
        <V4GlassButton label="Talk to us" href="#contact" />
      </div>

      {/* 스크롤 큐 */}
      <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 2 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--v4-on-midnight-muted)" }}>Scroll</span>
        <span style={{ width: 1, height: 40, background: "var(--v4-line-dark)" }} />
      </div>
    </section>
  );
}
