"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * V4 Hero — 신비주의 · 느린.
 * 어둠 속에서 메시지가 천천히 떠올랐다 사라지는 사이클 + 절제된 글로우 1개.
 * 카피는 v3 그대로(변경 금지). monopo의 '어둠에서 떠오름' + gemini의 '글로우 오브젝트 1개'.
 */
const PHRASES: [string, string][] = [
  ["Architecture for", "Insight with AI."],
  ["Not tools.", "Structure."],
  ["Not output.", "Decisions."],
  ["Not deployment.", "Design."],
];

const DWELL_MS = 6000; // 느린 사이클 (각 6초)

export default function V4Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return; // reduced-motion: 사이클 정지 (첫 문구 고정)
    const t = setInterval(() => setI((p) => (p + 1) % PHRASES.length), DWELL_MS);
    return () => clearInterval(t);
  }, [reduce]);

  const phrase = PHRASES[i];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "var(--v4-midnight)",
        color: "var(--v4-on-midnight)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 절제된 글로우 — 천천히 호흡 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0.55 }
            : { opacity: [0.42, 0.72, 0.42], scale: [1, 1.12, 1] }
        }
        transition={
          reduce
            ? { duration: 1.2 }
            : { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          position: "absolute",
          width: "min(120vh, 1100px)",
          height: "min(120vh, 1100px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--v4-glow) 55%, transparent) 0%, color-mix(in srgb, var(--v4-glow) 16%, transparent) 36%, transparent 68%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      {/* vignette — 가장자리 어둠 강조 (신비) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 46%, transparent 30%, rgba(11,15,20,0.55) 74%, rgba(11,15,20,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 미니멀 상단 바 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px clamp(24px, 5vw, 56px)",
          zIndex: 3,
        }}
      >
        <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1.05rem" }}>
          Siriai
        </span>
        <a
          href="#contact"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--v4-on-midnight-muted)",
            textDecoration: "none",
          }}
        >
          Contact
        </a>
      </div>

      {/* 메시지 — 어둠에서 느리게 떠오름 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={i}
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(10px)" }}
            transition={{
              duration: reduce ? 0 : 1.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
            }}
          >
            <span style={{ display: "block" }}>{phrase[0]}</span>
            <span style={{ display: "block" }}>{phrase[1]}</span>
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 1.1, ease: "easeOut" }}
          style={{
            marginTop: "clamp(28px, 4vw, 48px)",
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            letterSpacing: "0.01em",
            color: "var(--v4-on-midnight-muted)",
          }}
        >
          AI 기반 인사이트, 가장 쉽고 감각적으로.
        </motion.p>
      </motion.div>

      {/* 스크롤 큐 — 느리게 호흡 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.5 } : { opacity: [0.25, 0.7, 0.25] }}
        transition={reduce ? { duration: 1 } : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--v4-on-midnight-muted)",
          }}
        >
          Scroll
        </span>
        <span style={{ width: 1, height: 40, background: "var(--v4-line-dark)" }} />
      </motion.div>
    </section>
  );
}
