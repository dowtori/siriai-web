"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "@/components/v3/ContactForm";
import { useA1Motion } from "./motion-context";

type Props = {
  badge?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const EN_MANIFESTO = ["We don't recommend tools.", "We architect what stays."];

// PRD §05 한국어 매니페스토 3 stanza. '사람' '+32% 이상'은 fontWeight 600 강조.
type Stanza = { text: string; emphasis?: string[] };
const STANZAS: Stanza[] = [
  { text: "AI 리터러시적 사고를 기반으로 한 최적의 설계." },
  {
    text: "도구로서의 AI 접근을 넘어\n니즈를 정확히 이해하고 '사람'을 돕습니다.",
    emphasis: ["'사람'"],
  },
  {
    text: "평균 +32% 이상의 의사결정 비용 감소를 체험해보세요.",
    emphasis: ["+32% 이상"],
  },
];

// 시퀀스 타이밍 (s 단위)
const T_HEAD_STAGGER = 0.15;
const T_STANZA_START = 0.45;
const T_STANZA_STAGGER = 0.15;
const T_CAPTION = 0.95;
const T_CONTACT_HEAD = 1.25;
const T_CONTACT_KR = 1.45;
const T_FORM = 1.7;
const T_SCHEDULE_LINK = 1.95;

function StanzaLine({
  stanza,
  delay,
  duration,
  reducedMotion,
}: {
  stanza: Stanza;
  delay: number;
  duration: number;
  reducedMotion: boolean;
}) {
  const parts = renderEmphasis(stanza);
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 10,
        filter: reducedMotion ? "blur(0px)" : "blur(3px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, ease: EASE, delay }}
      style={{
        margin: 0,
        whiteSpace: "pre-line",
        wordBreak: "keep-all",
      }}
    >
      {parts}
    </motion.p>
  );
}

function renderEmphasis(stanza: Stanza) {
  if (!stanza.emphasis || stanza.emphasis.length === 0) {
    return stanza.text;
  }
  const pattern = stanza.emphasis
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const re = new RegExp(`(${pattern})`, "g");
  return stanza.text.split(re).map((piece, i) =>
    stanza.emphasis!.includes(piece) ? (
      <strong key={i} style={{ fontWeight: 600, color: "var(--a1-ink)" }}>
        {piece}
      </strong>
    ) : (
      <span key={i}>{piece}</span>
    ),
  );
}

export default function Stage3Outro({ badge }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  return (
    <section
      data-a1-stage="3"
      style={{
        position: "relative",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        padding: "200px 24px 200px",
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

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {EN_MANIFESTO.map((line, i) => (
          <motion.h2
            key={line}
            initial={{
              opacity: 0,
              filter: reducedMotion ? "blur(0px)" : "blur(10px)",
              y: 12,
            }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: reveal,
              ease: EASE,
              delay: i * T_HEAD_STAGGER,
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.875rem, 3.8vw, 3.25rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              margin: 0,
            }}
          >
            {line}
          </motion.h2>
        ))}

        <div
          style={{
            marginTop: 56,
            maxWidth: "46ch",
            fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
            lineHeight: 1.95,
            color: "var(--a1-ink)",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {STANZAS.map((stanza, i) => (
            <StanzaLine
              key={i}
              stanza={stanza}
              duration={reveal}
              delay={T_STANZA_START + i * T_STANZA_STAGGER}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reveal, ease: EASE, delay: T_CAPTION }}
          style={{
            marginTop: 56,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-mute)",
          }}
        >
          — Siriai Manifesto, 2026
        </motion.p>

        <div
          aria-hidden
          style={{
            width: 1,
            height: 96,
            background: "var(--a1-hairline)",
            margin: "120px auto 80px",
          }}
        />

        <motion.h3
          initial={{
            opacity: 0,
            filter: reducedMotion ? "blur(0px)" : "blur(8px)",
            y: 10,
          }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reveal, ease: EASE, delay: T_CONTACT_HEAD }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Let&apos;s start with coffee.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.78, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reveal, ease: EASE, delay: T_CONTACT_KR }}
          style={{
            marginTop: 18,
            fontSize: 15,
            lineHeight: 1.85,
            color: "var(--a1-mute)",
            wordBreak: "keep-all",
            maxWidth: "32ch",
          }}
        >
          가벼운 커피챗으로, 해묵은 고민을 시원하게.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reveal, ease: EASE, delay: T_FORM }}
          style={{
            marginTop: 56,
            width: "100%",
            maxWidth: 480,
            textAlign: "left",
          }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reveal, ease: EASE, delay: T_SCHEDULE_LINK }}
          style={{ marginTop: 40 }}
        >
          <Link
            href={calLink ? "/contact#schedule" : "/contact#schedule"}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              letterSpacing: "0.02em",
              color: "var(--a1-mute)",
              textDecoration: "none",
              borderBottom: "1px solid var(--a1-hairline-strong)",
              paddingBottom: 2,
            }}
          >
            또는 바로 스케줄 예약하기 →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
