"use client";

/**
 * Stage II — Stance
 * Artifact: 단일 큰 영문 negation 헤드.
 * Copy: A안의 3-line declarative 폐기. 한 줄 negation으로 cinematic.
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

export default function StageII_Stance({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);
      const t = performance.now() / 1000;

      const setFade = (el: HTMLElement | null, delay: number) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.18);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
      };
      setFade(eyebrowRef.current, 0.0);
      setFade(subRef.current, 0.42);

      if (headRef.current) {
        const opIn = clamp01((lp - 0.12) / 0.2);
        const opOut = clamp01((lp - 0.82) / 0.18);
        const sway = Math.sin(t * 0.4) * 6;
        headRef.current.style.opacity = String(opIn * (1 - opOut));
        headRef.current.style.transform = `translate3d(${sway}px, 0, 0)`;
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
        className="flex flex-col items-center gap-10 px-6 text-center max-w-[1100px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={eyebrowRef} className="will-change-[opacity]" style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--bn-ink-faint)",
            }}
          >
            01 — Stance
          </span>
        </div>

        <h2
          ref={headRef}
          className="will-change-transform"
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 500,
            fontSize: "clamp(3rem, 10vw, 10rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            color: "var(--bn-ink)",
            textShadow: "0 0 80px rgba(8,9,11,0.7)",
          }}
        >
          Not the tool.
        </h2>

        <div
          ref={subRef}
          className="will-change-[opacity] flex flex-col gap-1.5 max-w-[420px]"
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontSize: "14px",
            lineHeight: 1.85,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          <p>도구는 바뀐다.</p>
          <p style={{ color: "var(--bn-ink)" }}>남는 것을 설계한다.</p>
        </div>
      </div>
    </div>
  );
}
