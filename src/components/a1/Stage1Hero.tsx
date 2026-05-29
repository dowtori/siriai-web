"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import MysticCursor from "./MysticCursor";
import RotatingForm from "./RotatingForm";
import { useA1Motion } from "./motion-context";

type Props = {
  /** 강제 cursor 위치 — harness에서 ?cursor=x,y로 전달 */
  forcedCursor?: { x: number; y: number };
  /** 좌상단 isolation 표시 */
  badge?: string;
};

const EN_LINES = ["Tools change.", "Structure remains.", "We design it."];
const KR_TEXT = [
  "AI 도구는 매일 새롭게 등장합니다.",
  "필요한 건 창의성과 결합.",
  "시리아이는 그 구조를 설계합니다.",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Stage1Hero({ badge, forcedCursor: forcedFromProps }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const stagger = reducedMotion ? 0 : params.revealStagger;

  // URL ?cursor=x,y 파싱 — harness에서만 의미. props로 직접 받으면 우선.
  const sp = useSearchParams();
  const cursorParam = sp.get("cursor");
  const forcedCursor = useMemo<Props["forcedCursor"]>(() => {
    if (forcedFromProps) return forcedFromProps;
    if (!cursorParam) return undefined;
    const [x, y] = cursorParam.split(",").map(Number);
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : undefined;
  }, [forcedFromProps, cursorParam]);

  // 영문이 끝난 뒤 한국어가 등장하기까지 호흡 (영문 3줄 × stagger + 여유)
  const krDelay = stagger * EN_LINES.length + reveal * 0.6;

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
        isolation: "isolate",
      }}
    >
      {/* Layer 0 — Canvas ink wash. midnight 위에 잔향 페인팅. */}
      <MysticCursor forcedCursor={forcedCursor} />

      {/* Layer 1 — central rotating form (hairline only). */}
      <RotatingForm />

      {badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 2,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--a1-on-mute)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        >
          {badge}
        </span>
      )}

      {/* Layer 2 — text composition */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 880,
          pointerEvents: "none",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reveal, ease: EASE }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-on-mute)",
            marginBottom: 56,
          }}
        >
          Stage 1 · Mystic Hero
        </motion.p>

        {EN_LINES.map((line, i) => (
          <motion.h1
            key={line}
            initial={{
              opacity: 0,
              filter: reducedMotion ? "blur(0px)" : "blur(14px)",
              y: 16,
            }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: reveal * 1.4,
              ease: EASE,
              delay: i * stagger,
            }}
            style={{
              fontSize: "clamp(2.5rem, 5.8vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            {line}
          </motion.h1>
        ))}

        <div
          style={{
            marginTop: 48,
            fontSize: 14,
            lineHeight: 1.9,
            color: "var(--a1-on-mute)",
            wordBreak: "keep-all",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {KR_TEXT.map((line, i) => (
            <motion.p
              key={line}
              initial={{
                opacity: 0,
                filter: reducedMotion ? "blur(0px)" : "blur(6px)",
              }}
              animate={{ opacity: 0.7, filter: "blur(0px)" }}
              transition={{
                duration: reveal,
                ease: EASE,
                delay: krDelay + i * (stagger * 0.6),
              }}
              style={{ margin: 0 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Scroll hint — 천천히 깜빡. reducedMotion 시 정적. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          marginLeft: -1,
          zIndex: 2,
          width: 1,
          height: 56,
          background:
            "linear-gradient(to bottom, transparent, var(--a1-on-mute), transparent)",
          opacity: reducedMotion ? 0.4 : undefined,
        }}
      >
        {!reducedMotion && (
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, var(--a1-on-midnight), transparent)",
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: params.ambientLoop * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </section>
  );
}
