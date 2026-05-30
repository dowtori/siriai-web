"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import MysticCursor from "./MysticCursor";
import RotatingForm from "./RotatingForm";
import { useA1Motion } from "./motion-context";

type ForcedCursor = { x: number; y: number };
type Props = {
  /** 강제 cursor 위치 — harness에서 ?cursor=x,y로 전달 */
  forcedCursor?: ForcedCursor;
  /** 좌상단 isolation 표시 */
  badge?: string;
};

const EN_LINES = ["Tools change.", "Structure remains.", "We design it."];

const EASE = [0.16, 1, 0.3, 1] as const;
// 페이지 진입 후 첫 줄까지의 silence — 신비주의 결의 호흡.
const ENTRY_SILENCE = 0.5;

function CursorQueryMystic({ override }: { override?: ForcedCursor }) {
  const sp = useSearchParams();
  const cursorParam = sp.get("cursor");
  const forced = useMemo<ForcedCursor | undefined>(() => {
    if (override) return override;
    if (!cursorParam) return undefined;
    const [x, y] = cursorParam.split(",").map(Number);
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : undefined;
  }, [override, cursorParam]);
  return <MysticCursor forcedCursor={forced} />;
}

export default function Stage1Hero({ badge, forcedCursor: forcedFromProps }: Props) {
  const { params, reducedMotion } = useA1Motion();
  const reveal = reducedMotion ? 0 : params.revealDuration;
  const stagger = reducedMotion ? 0 : params.revealStagger;

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
      {/* Layer 0 — Canvas ink wash. midnight 위에 잔향 페인팅.
          useSearchParams는 Suspense에 wrap (Next 16 static prerender 요구). */}
      <Suspense fallback={<MysticCursor forcedCursor={forcedFromProps} />}>
        <CursorQueryMystic override={forcedFromProps} />
      </Suspense>

      {/* Layer 0.5 — grain noise overlay (SVG feTurbulence). 잉크 결, soft-light blend. */}
      {!reducedMotion && (
        <svg
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            mixBlendMode: "soft-light",
            opacity: 0.55,
            zIndex: 0,
          }}
        >
          <filter id="a1-grain-stage1">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix
              values="0 0 0 0 0.92  0 0 0 0 0.92  0 0 0 0 0.88  0 0 0 0.35 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#a1-grain-stage1)" />
        </svg>
      )}

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

      {/* Layer 2 — text composition. 영문 3줄만, 한국어 echo 폐기. */}
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
              delay: ENTRY_SILENCE + i * stagger,
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
