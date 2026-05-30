"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A1 Footer — midnight 봉인. Hero(midnight)↔Footer(midnight) 양끝 아크.
 * (a) 영문 매니페스토 echo + 한국어 (b) 풀폭 serif wordmark anchor (c) © 마감.
 * data-a1-tone="dark" — A1Navigation 색 반전 트리거.
 */
export default function A1Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-a1-tone="dark"
      style={{
        background: "var(--a1-midnight)",
        color: "var(--a1-on-midnight)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(96px, 14vw, 160px) 24px 48px",
        }}
      >
        {/* (a) 매니페스토 echo — Stage 3 영문 매니페스토 carry */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              maxWidth: "32ch",
              margin: 0,
            }}
          >
            We don&apos;t recommend tools. We architect what stays.
          </p>
          <p
            style={{
              marginTop: 16,
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--a1-on-mute)",
              wordBreak: "keep-all",
              maxWidth: "32ch",
            }}
          >
            도구가 아닌 비전을 제시합니다.
          </p>
        </motion.div>

        {/* (b) Wordmark — 풀폭 serif brand anchor */}
        <motion.div
          aria-hidden
          initial={{
            opacity: 0,
            filter: "blur(12px)",
            y: 24,
          }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          style={{ marginTop: "clamp(96px, 12vw, 128px)" }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-mark)",
              fontWeight: 900,
              fontSize: "clamp(5.5rem, 19vw, 16rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "var(--a1-on-midnight)",
              margin: 0,
            }}
          >
            Siriai
          </p>
        </motion.div>

        {/* (c) © + contact — 작은 마감 */}
        <div
          style={{
            marginTop: "clamp(40px, 5vw, 56px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
          className="md:flex-row md:justify-between"
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--a1-on-mute)",
              wordBreak: "keep-all",
              margin: 0,
            }}
          >
            © 2024 — {year} 주식회사 시리아이(SIRIAI). All Rights Reserved.
          </p>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--a1-on-mute)",
              margin: 0,
            }}
          >
            contact@siriai.io
          </p>
        </div>
      </div>
    </footer>
  );
}
