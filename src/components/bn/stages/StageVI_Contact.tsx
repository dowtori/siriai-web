"use client";

/**
 * Stage VI — Contact (§06) · placeholder
 * Round 7에서 inline mini form 또는 Cal.com inline embed 풀빌드 예정.
 * 본 라운드는 CTA 카피 + Send a note → 외부 라우팅 link.
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
        const opIn = clamp01((lp - delay) / 0.22);
        el.style.opacity = String(opIn);
      };
      setFade(headRef.current, 0.1);
      setFade(subRef.current, 0.35);
      setFade(ctaRef.current, 0.55);
      if (ctaRef.current) {
        ctaRef.current.style.pointerEvents = lp > 0.6 ? "auto" : "none";
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
            05 — Contact
          </span>
          <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
        </div>
        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2.4rem, 7.4vw, 7rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(10,9,8,0.6)",
            fontVariationSettings: '"opsz" 144, "SOFT" 60',
          }}
        >
          Let&apos;s start
          <br />
          with coffee.
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
          가벼운 커피챗으로, 해묵은 고민을 시원하게.
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
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "15px",
              letterSpacing: "0.02em",
              background: "rgba(184,145,106,0.05)",
              pointerEvents: "auto",
            }}
          >
            Send a note
            <span aria-hidden style={{ fontFamily: MONO }}>
              →
            </span>
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
