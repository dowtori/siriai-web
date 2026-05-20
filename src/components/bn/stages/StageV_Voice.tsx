"use client";

/**
 * Stage V — Voice
 * Artifact: Manifesto book-page (z 정지, quiet beat).
 * Copy: 자율 재작성. declarative 줄임, 사물 묘사 강화.
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

const KR_LINES = [
  "도구를 권하지 않는다.",
  "남는 자리를 설계한다.",
  "사고가 흐르는 형태로.",
];

export default function StageV_Voice({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const krLineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const attribRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);

      const setFade = (
        el: HTMLElement | null,
        delay: number,
        sustainTo = 0.82,
      ) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.16);
        const opOut = clamp01((lp - sustainTo) / (1 - sustainTo));
        el.style.opacity = String(opIn * (1 - opOut));
      };
      setFade(eyebrowRef.current, 0.0);
      setFade(headRef.current, 0.15);
      krLineRefs.current.forEach((el, i) => setFade(el, 0.42 + i * 0.08));
      setFade(attribRef.current, 0.7);
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
        className="flex flex-col items-center gap-10 px-6 text-center max-w-[820px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
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
            04 — Voice
          </span>
        </div>

        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 7.2vw, 7.2rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(8,9,11,0.6)",
            maxWidth: "16ch",
          }}
        >
          Architecture, not the agent.
        </h2>

        <div
          className="flex flex-col gap-2 max-w-[480px]"
          style={{
            fontFamily: PRETENDARD,
            fontSize: "16px",
            lineHeight: 1.95,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          {KR_LINES.map((line, i) => (
            <p
              key={i}
              ref={(el) => {
                krLineRefs.current[i] = el;
              }}
              style={{
                opacity: 0,
                color: i === 2 ? "var(--bn-ink)" : undefined,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div ref={attribRef} style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              color: "var(--bn-accent)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Siriai · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
