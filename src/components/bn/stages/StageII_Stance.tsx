"use client";

/**
 * Stage II — Stance (§01)
 * Artifact: 3-line parallax statement.
 * Mechanic: 3 line이 다른 z 깊이 (-140 / 0 / +140). perspective로 자연 size 차이.
 *           시간 sway + line별 stagger fade-in. 한국어 sub는 정적 (z=0).
 */

import { useEffect, useRef } from "react";
import {
  applyStageTransform,
  clamp01,
  localProgress,
  MARK,
  MONO,
  PRETENDARD,
} from "../shared/stageMath";
import type { ZJourneyHandle } from "../useZJourney";
import type { StageProps } from "./StageI_Hero";

const EN_LINES = ["Tools change.", "Structure remains.", "We design it."];
const KR_LINES = [
  "AI 도구는 매일 새롭게 등장합니다.",
  "필요한 건 창의성과 결합.",
  "시리아이는 그 구조를 설계합니다.",
];
const LINE_DEPTHS = [-140, 0, 140]; // z parallax per EN line

export default function StageII_Stance({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const krRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);

      const lp = localProgress(p, from, to);
      const t = performance.now() / 1000;

      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const baseZ = LINE_DEPTHS[i];
        const sway = Math.sin(t * 0.45 + i * 1.3) * 4;
        el.style.transform = `translate3d(${sway}px, 0, ${baseZ}px)`;
        const stagger = i * 0.07;
        const opIn = clamp01((lp - stagger) / 0.18);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
      });

      if (eyebrowRef.current) {
        const opIn = clamp01(lp / 0.1);
        const opOut = clamp01((lp - 0.85) / 0.15);
        eyebrowRef.current.style.opacity = String(opIn * (1 - opOut));
      }
      if (krRef.current) {
        const opIn = clamp01((lp - 0.45) / 0.2);
        const opOut = clamp01((lp - 0.85) / 0.15);
        krRef.current.style.opacity = String(opIn * (1 - opOut));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle, from, to]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 grid place-items-center will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="flex flex-col items-center gap-10 px-6 text-center max-w-[1200px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={eyebrowRef} className="will-change-[opacity]" style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--bn-ink-faint)",
            }}
          >
            01 — Stance
          </span>
        </div>

        {/* parallax EN lines */}
        <div
          className="flex flex-col items-center gap-1"
          style={{ transformStyle: "preserve-3d" }}
        >
          {EN_LINES.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className="will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                opacity: 0,
                fontFamily: MARK,
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 7.4vw, 7.6rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "var(--bn-ink)",
                textShadow: "0 0 60px rgba(10,9,8,0.6)",
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* KR sub (정적, z=0) */}
        <div
          ref={krRef}
          className="will-change-[opacity] space-y-1.5"
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontSize: "15px",
            lineHeight: 1.95,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          <p>{KR_LINES[0]}</p>
          <p>{KR_LINES[1]}</p>
          <p style={{ color: "var(--bn-ink)" }}>{KR_LINES[2]}</p>
        </div>
      </div>
    </div>
  );
}
