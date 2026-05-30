"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * V4 Closing — 하단 스크롤 경험 (monopo 결: 느린·드라마틱·다크).
 * 스크롤 진행에 따라 Contact가 드러나고 거대한 'Siriai' 워드마크가 천천히 떠오른다.
 * 카피 v3 그대로. reduced-motion이면 정적.
 */
export default function V4Closing() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const glow = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);
  const contactY = useTransform(scrollYProgress, [0.05, 0.4], [40, 0]);
  const contactOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const markY = useTransform(scrollYProgress, [0.2, 0.95], ["38%", "-4%"]);
  const markScale = useTransform(scrollYProgress, [0.2, 0.95], [0.84, 1.08]);
  const markOpacity = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);

  const year = 2026;

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        height: reduce ? "auto" : "210vh",
        background: "var(--v4-midnight)",
        color: "var(--v4-on-midnight)",
      }}
    >
      <div
        style={{
          position: reduce ? "relative" : "sticky",
          top: 0,
          height: reduce ? "auto" : "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(48px, 8vh, 96px) clamp(24px, 5vw, 56px) 0",
        }}
      >
        {/* 떠오르는 글로우 */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-30%",
            transform: "translateX(-50%)",
            width: "min(150vw, 1500px)",
            height: "min(150vw, 1500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--v4-glow) 40%, transparent) 0%, transparent 62%)",
            opacity: reduce ? 0.35 : glow,
            pointerEvents: "none",
          }}
        />

        {/* Contact */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1180,
            margin: "0 auto",
            width: "100%",
            opacity: reduce ? 1 : contactOpacity,
            y: reduce ? 0 : contactY,
          }}
        >
          <div
            className="v4-proof-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "clamp(28px, 4vw, 64px)",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.06,
                }}
              >
                Let&apos;s start<br />with coffee.
              </h2>
              <p style={{ margin: "16px 0 0", color: "var(--v4-on-midnight-muted)", fontSize: "1.05rem" }}>
                가벼운 커피챗으로, 해묵은 고민을 시원하게.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
              <a className="v4-btn v4-btn--onDark" href="mailto:contact@siriai.io">
                바로 스케줄 예약하기 <span className="v4-btn-dot" />
              </a>
              <a
                href="mailto:contact@siriai.io"
                style={{ color: "var(--v4-on-midnight-muted)", textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.02em" }}
              >
                contact@siriai.io
              </a>
            </div>
          </div>
        </motion.div>

        {/* 거대 워드마크 — 천천히 떠오름 */}
        <motion.div
          aria-hidden
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            lineHeight: 0.8,
            opacity: reduce ? 1 : markOpacity,
            y: reduce ? 0 : markY,
            scale: reduce ? 1 : markScale,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mark)",
              fontWeight: 900,
              fontSize: "clamp(5rem, 22vw, 20rem)",
              letterSpacing: "-0.02em",
              color: "var(--v4-on-midnight)",
              display: "block",
            }}
          >
            Siriai
          </span>
        </motion.div>

        {/* footer 라인 */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1180,
            margin: "0 auto",
            width: "100%",
            paddingBottom: 28,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: "0.8rem",
            color: "var(--v4-on-midnight-muted)",
          }}
        >
          <span>© 2024 — {year} 주식회사 시리아이(SIRIAI). All Rights Reserved.</span>
          <span>도구가 아닌 비전을 제시합니다.</span>
        </div>
      </div>
    </section>
  );
}
