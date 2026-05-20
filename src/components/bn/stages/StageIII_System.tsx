"use client";

/**
 * Stage III — System (§03) · placeholder
 * Round 6에서 4-node decision graph (Signal·Judgment·Action·Record) 풀빌드 예정.
 * 본 라운드는 카피 + inline 4 노드 캡션만.
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
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

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
      setFade(nodesRef.current, 0.55);

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
        <div className="flex items-center gap-3" style={{ opacity: 1 }}>
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
            02 — System
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
          Decision flow.
          <br />
          Made visible.
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
          판단의 흐름을, 보이게.
        </p>
        <div ref={nodesRef} className="flex items-center gap-4" style={{ opacity: 0 }}>
          {NODES.map((n, i) => (
            <div key={n} className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: i === 0 ? "var(--bn-accent)" : "var(--bn-ink-muted)",
                }}
              >
                {n}
              </span>
              {i < 3 && (
                <span style={{ color: "var(--bn-ink-faint)", fontFamily: MONO }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
