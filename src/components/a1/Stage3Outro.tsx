"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

type Props = {
  badge?: string;
};

export default function Stage3Outro({ badge }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const stagger = reducedMotion ? 0 : params.revealStagger;

  return (
    <section
      data-a1-stage="3"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        padding: "160px 24px 120px",
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

      <div style={{ maxWidth: 920, margin: "0 auto" }}>
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
            marginBottom: 48,
          }}
        >
          Stage 3 · Voice + Contact
        </motion.p>

        {/* Voice manifesto — dark inset card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reveal, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--a1-midnight)",
            color: "var(--a1-on-midnight)",
            padding: "64px 56px",
            borderRadius: 8,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.875rem, 3.6vw, 3.25rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            We don&apos;t recommend tools.
            <br />
            We architect what stays.
          </h2>

          <div
            style={{
              marginTop: 56,
              fontSize: 17,
              lineHeight: 1.85,
              wordBreak: "keep-all",
              maxWidth: "44ch",
            }}
          >
            {[
              "AI 리터러시적 사고를 기반으로 한 최적의 설계.",
              "도구로서의 AI 접근을 넘어 니즈를 정확히 이해하고 사람을 돕습니다.",
              "평균 +32% 이상의 의사결정 비용 감소를 체험해보세요.",
            ].map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: reveal,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * stagger,
                }}
                style={{ margin: i === 0 ? 0 : "20px 0 0" }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <p
            style={{
              marginTop: 56,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-on-mute)",
            }}
          >
            — Siriai Manifesto, 2026
          </p>
        </motion.div>

        {/* Contact placeholder */}
        <div style={{ marginTop: 120 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Let&apos;s start with coffee.
          </h3>
          <p
            style={{
              marginTop: 16,
              fontSize: 15,
              lineHeight: 1.85,
              color: "var(--a1-mute)",
              wordBreak: "keep-all",
            }}
          >
            가벼운 커피챗으로, 해묵은 고민을 시원하게.
          </p>

          <button
            type="button"
            style={{
              marginTop: 32,
              padding: "14px 28px",
              border: "1px solid var(--a1-hairline-strong)",
              background: "transparent",
              color: "var(--a1-ink)",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              borderRadius: 6,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--a1-ink)";
              e.currentTarget.style.color = "var(--a1-paper)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--a1-ink)";
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "currentColor",
                opacity: 0.6,
              }}
            />
            바로 스케줄 예약하기 →
          </button>

          <p
            style={{
              marginTop: 80,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              opacity: 0.6,
            }}
          >
            Contact form · Phase A1.5 — placeholder
          </p>
        </div>
      </div>
    </section>
  );
}
