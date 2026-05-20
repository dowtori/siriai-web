"use client";

/**
 * Stage III — System
 * Artifact: 4 노드 (Signal · Judgment · Action · Record) 큰 라벨 자체가 헤드.
 * Copy: 헤드 생략. 라벨 = main typography.
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

const NODES = ["Signal", "Judgment", "Action", "Record"];

export default function StageIII_System({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const stagger = 0.15 + i * 0.08;
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
            02 — System
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {NODES.map((n, i) => (
            <div key={n} className="flex items-center gap-8">
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="will-change-[opacity]"
                style={{
                  opacity: 0,
                  fontFamily: MARK,
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 5.6vw, 5.4rem)",
                  letterSpacing: "-0.035em",
                  color: "var(--bn-ink)",
                  textShadow: "0 0 60px rgba(8,9,11,0.6)",
                }}
              >
                {n}
              </div>
              {i < 3 && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "var(--bn-accent)",
                  }}
                >
                  ·
                </span>
              )}
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
          판단의 흐름.
        </p>
      </div>
    </div>
  );
}
