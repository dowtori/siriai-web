"use client";

/**
 * Stage I — Hero
 * Artifact: Siriai 워드마크 (분해·재조립).
 * Copy: wordmark 외 카피 최소화. 하단 functional caption 한 줄만.
 *       cinematic immersion 우선, declarative line 0.
 */

import { useEffect, useMemo, useRef } from "react";
import {
  applyStageTransform,
  clamp01,
  easeOutExpo,
  localProgress,
  MARK,
  MONO,
  mix,
} from "../shared/stageMath";
import type { ZJourneyHandle } from "../useZJourney";

export type StageProps = {
  handle: ZJourneyHandle;
  from: number;
  to: number;
};

const WORDMARK = "Siriai";

export default function StageI_Hero({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);

  // 글자별 deterministic scatter (sin seed 기반, mount당 고정)
  const scatter = useMemo(
    () =>
      WORDMARK.split("").map((_, i) => {
        const seed = (i + 1) * 47.13;
        const rand = (k: number) => {
          const x = Math.sin(seed + k) * 10000;
          return x - Math.floor(x);
        };
        return {
          sx: (rand(1) - 0.5) * 220,
          sy: (rand(2) - 0.5) * 130,
          sz: -120 - rand(3) * 220,
          sRot: (rand(4) - 0.5) * 40,
        };
      }),
    [],
  );

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);
      const ease = easeOutExpo(lp);

      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = scatter[i];
        const x = mix(s.sx, 0, ease);
        const y = mix(s.sy, 0, ease);
        const z = mix(s.sz, 0, ease);
        const rot = mix(s.sRot, 0, ease);
        const op = clamp01(ease * 1.4 - 0.1);
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate(${rot}deg)`;
        el.style.opacity = String(op);
      });

      if (captionRef.current) {
        const opIn = clamp01((lp - 0.55) / 0.25);
        const opOut = clamp01((lp - 0.85) / 0.15);
        captionRef.current.style.opacity = String(opIn * (1 - opOut));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle, from, to, scatter]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 grid place-items-center will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="flex flex-col items-center gap-8 text-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1
          aria-label={WORDMARK}
          style={{
            transformStyle: "preserve-3d",
            fontFamily: MARK,
            fontWeight: 700,
            fontSize: "clamp(5rem, 18vw, 22rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.06em",
            color: "var(--bn-ink)",
            textShadow:
              "0 0 80px rgba(159,179,200,0.18), 0 0 140px rgba(159,179,200,0.08)",
            display: "inline-flex",
            margin: 0,
          }}
        >
          {WORDMARK.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="inline-block will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                opacity: 0,
              }}
              aria-hidden
            >
              {ch}
            </span>
          ))}
        </h1>
        <div
          ref={captionRef}
          className="flex items-center gap-4 will-change-[opacity]"
          style={{ opacity: 0 }}
        >
          <span
            className="block h-px w-8"
            style={{ background: "var(--bn-accent)" }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--bn-ink-muted)",
            }}
          >
            AI Architecture · Seoul
          </span>
          <span
            className="block h-px w-8"
            style={{ background: "var(--bn-accent)" }}
          />
        </div>
      </div>
    </div>
  );
}
