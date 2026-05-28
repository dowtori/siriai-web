"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

type Props = {
  badge?: string;
};

const PLACEHOLDER_BLOCKS = [
  {
    eyebrow: "01 — Methodology",
    head: "Three doors.\nOne room.",
    body: "세 갈래로 들어가, 한 자리에서 시작합니다.",
  },
  {
    eyebrow: "02 — System",
    head: "Decision flow.\nMade visible.",
    body: "Signal · Judgment · Action · Record.",
  },
];

export default function Stage2Composition({ badge }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const stagger = reducedMotion ? 0 : params.revealStagger;

  return (
    <section
      data-a1-stage="2"
      style={{
        position: "relative",
        minHeight: "150vh",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        padding: "160px 24px 200px",
        fontFamily: "var(--font-sans)",
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
            color: "var(--a1-mute)",
          }}
        >
          {badge}
        </span>
      )}

      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reveal, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-mute)",
            marginBottom: 80,
          }}
        >
          Stage 2 · White Composition
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 120 }}>
          {PLACEHOLDER_BLOCKS.map((b, bi) => (
            <div
              key={b.eyebrow}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
                gap: 80,
                alignItems: "start",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: reveal,
                  ease: [0.16, 1, 0.3, 1],
                  delay: bi * stagger,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--a1-mute)",
                    marginBottom: 24,
                  }}
                >
                  {b.eyebrow}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.875rem, 3.6vw, 3.25rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {b.head}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: reveal,
                  ease: [0.16, 1, 0.3, 1],
                  delay: bi * stagger + 0.1,
                }}
                style={{
                  paddingTop: 8,
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "var(--a1-ink)",
                  wordBreak: "keep-all",
                  maxWidth: "44ch",
                }}
              >
                <p style={{ color: "var(--a1-mute)", margin: 0 }}>{b.body}</p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "32px 0 0",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {["Architecture", "Literacy", "Mapping"].map((item, i) => (
                    <li
                      key={item}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "5px 12px",
                        border: "1px solid var(--a1-hairline)",
                        borderRadius: 999,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        color: "var(--a1-ink)",
                      }}
                    >
                      <span style={{ color: "var(--a1-mute)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Clients ribbon placeholder (Stage 2 → 3 사이 단독) */}
        <div
          style={{
            marginTop: 200,
            borderTop: "1px solid var(--a1-hairline)",
            borderBottom: "1px solid var(--a1-hairline)",
            padding: "60px 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              margin: 0,
            }}
          >
            Clients ribbon · marquee 90s
            <span style={{ marginLeft: 12, opacity: 0.6 }}>
              [Phase A1.4 — placeholder]
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
