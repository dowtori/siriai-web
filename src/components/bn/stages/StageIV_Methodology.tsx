"use client";

/**
 * Stage IV — Methodology
 * Artifact: 3축 (Architecture · Literacy · Mapping) 큰 라벨 자체가 헤드.
 * Copy: 헤드 생략. 라벨 = main.
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

const AXES = ["Architecture", "Literacy", "Mapping"];

export default function StageIV_Methodology({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const axisRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);

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
      setFade(eyebrowRef.current, 0.0);
      setFade(subRef.current, 0.62);

      axisRefs.current.forEach((el, i) => {
        if (!el) return;
        const stagger = 0.18 + i * 0.1;
        const opIn = clamp01((lp - stagger) / 0.14);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
      });
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
      <div className="flex flex-col items-center gap-14 px-6 text-center max-w-[1200px]">
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
            03 — Method
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          {AXES.map((a, i) => (
            <div
              key={a}
              ref={(el) => {
                axisRefs.current[i] = el;
              }}
              className="will-change-[opacity]"
              style={{
                opacity: 0,
                fontFamily: MARK,
                fontWeight: 500,
                fontSize: "clamp(2.2rem, 6.6vw, 6.4rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: "var(--bn-ink)",
                textShadow: "0 0 60px rgba(8,9,11,0.6)",
              }}
            >
              {a}
            </div>
          ))}
        </div>

        <p
          ref={subRef}
          className="will-change-[opacity]"
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontSize: "14px",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          세 갈래의 진입.
        </p>
      </div>
    </div>
  );
}
