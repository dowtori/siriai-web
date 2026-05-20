"use client";

/**
 * Stage VI — Contact
 * Artifact: CTA gate (정면 frame).
 * Copy: "Let's start with coffee." (cafe 톤) 폐기. cinematic professional로 재작성.
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

export default function StageVI_Contact({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);

      const setFade = (el: HTMLElement | null, delay: number) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.2);
        el.style.opacity = String(opIn);
      };
      setFade(eyebrowRef.current, 0.0);
      setFade(headRef.current, 0.15);
      setFade(subRef.current, 0.4);
      setFade(ctaRef.current, 0.6);
      if (ctaRef.current) {
        ctaRef.current.style.pointerEvents = lp > 0.65 ? "auto" : "none";
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
      <div className="flex flex-col items-center gap-9 px-6 text-center">
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
            05 — Contact
          </span>
        </div>

        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 500,
            fontSize: "clamp(2.6rem, 8vw, 7.8rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.045em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(8,9,11,0.6)",
          }}
        >
          Begin a diagnosis.
        </h2>

        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontWeight: 400,
            fontSize: "15px",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          사고의 매핑부터.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center gap-3"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 border px-7 py-3 transition-colors"
            style={{
              borderColor: "var(--bn-accent)",
              color: "var(--bn-ink)",
              fontFamily: MONO,
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "rgba(159,179,200,0.05)",
              pointerEvents: "auto",
            }}
          >
            Open a Dialogue
            <span aria-hidden>→</span>
          </a>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              letterSpacing: "0.18em",
              color: "var(--bn-ink-muted)",
            }}
          >
            contact@siriai.io
          </span>
        </div>
      </div>
    </div>
  );
}
