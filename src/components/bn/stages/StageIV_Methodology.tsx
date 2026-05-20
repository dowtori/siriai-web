"use client";

/**
 * Stage IV — Methodology (§02) · placeholder
 * Round 6에서 3-axis 회전 prism 풀빌드 예정.
 * 본 라운드는 카피 + 3축 grid 캡션.
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
import type { StageProps } from "./StageI_Hero";

const AXES = [
  { num: "01", title: "Architecture", kr: "의사결정의 구조." },
  { num: "02", title: "Literacy", kr: "AI로 사고하는 법." },
  { num: "03", title: "Mapping", kr: "진짜 문제의 결." },
];

export default function StageIV_Methodology({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const axesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);
      const setFade = (el: HTMLElement | null, delay: number) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.18);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
      };
      setFade(headRef.current, 0.1);
      setFade(subRef.current, 0.4);
      setFade(axesRef.current, 0.55);
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
      <div className="flex flex-col items-center gap-10 px-6 text-center max-w-[1100px]">
        <div className="flex items-center gap-3">
          <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
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
            03 — Methodology
          </span>
          <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
        </div>
        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 7.2vw, 7rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(10,9,8,0.6)",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
          }}
        >
          Three ways in.
          <br />
          One place to begin.
        </h2>
        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontSize: "14px",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          세 갈래로 들어가, 한 자리에서 시작합니다.
        </p>
        <div
          ref={axesRef}
          className="grid grid-cols-3 gap-x-12 max-w-[720px]"
          style={{ opacity: 0 }}
        >
          {AXES.map((a) => (
            <div key={a.title} className="flex flex-col items-center gap-1.5">
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 400,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  color: "var(--bn-accent)",
                }}
              >
                {a.num}
              </span>
              <span
                style={{
                  fontFamily: MARK,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "18px",
                  color: "var(--bn-ink)",
                }}
              >
                {a.title}
              </span>
              <span
                style={{
                  fontFamily: PRETENDARD,
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "var(--bn-ink-muted)",
                  wordBreak: "keep-all",
                }}
              >
                {a.kr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
