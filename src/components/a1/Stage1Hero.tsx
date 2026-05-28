"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

type Props = {
  forcedCursor?: { x: number; y: number };
  badge?: string;
};

export default function Stage1Hero({ badge }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const stagger = reducedMotion ? 0 : params.revealStagger;
  const rotation = reducedMotion ? 0 : params.rotationDuration;

  return (
    <section
      data-a1-stage="1"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--a1-midnight)",
        color: "var(--a1-on-midnight)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--a1-on-mute)",
            opacity: 0.7,
          }}
        >
          {badge}
        </span>
      )}

      {/* Rotating form placeholder — slow ink ring */}
      {!reducedMotion && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 480,
            height: 480,
            marginLeft: -240,
            marginTop: -240,
            borderRadius: "50%",
            border: "1px solid var(--a1-hairline-on-midnight)",
            opacity: 0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: rotation, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 880,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reveal, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-on-mute)",
            marginBottom: 48,
          }}
        >
          Stage 1 · Mystic Hero
        </motion.p>

        {["Tools change.", "Structure remains.", "We design it."].map((line, i) => (
          <motion.h1
            key={line}
            initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: reveal,
              ease: [0.16, 1, 0.3, 1],
              delay: i * stagger,
            }}
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            {line}
          </motion.h1>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: reveal, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          style={{
            marginTop: 40,
            fontSize: 14,
            lineHeight: 1.85,
            color: "var(--a1-on-mute)",
            wordBreak: "keep-all",
          }}
        >
          AI 도구는 매일 새롭게 등장합니다.
          <br />
          필요한 건 창의성과 결합.
          <br />
          시리아이는 그 구조를 설계합니다.
        </motion.p>
      </div>

      {/* Scroll hint */}
      {!reducedMotion && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            marginLeft: -1,
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, transparent, var(--a1-on-mute), transparent)",
          }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <span
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--a1-on-mute)",
          opacity: 0.35,
        }}
      >
        Phase A1.1 · placeholder
      </span>
    </section>
  );
}
