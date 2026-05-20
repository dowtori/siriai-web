"use client";

/**
 * Stage III — System
 * Artifact: 4 노드 (Signal · Judgment · Action · Record) + connecting line graph.
 * Mechanic: 노드 label + dot marker. node 사이 connecting line이 scaleX 0→1 stagger로 그려짐.
 *           decision flow의 spatial 시각화.
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
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      setFade(subRef.current, 0.72);

      // 노드 reveal stagger
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const stagger = 0.15 + i * 0.07;
        const opIn = clamp01((lp - stagger) / 0.14);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
      });

      // dot marker stagger (노드보다 약간 먼저)
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const stagger = 0.12 + i * 0.07;
        const opIn = clamp01((lp - stagger) / 0.1);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.opacity = String(opIn * (1 - opOut));
        el.style.transform = `scale(${opIn * (1 - opOut)})`;
      });

      // connecting line scaleX 0→1 stagger (노드 사이 직후)
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const stagger = 0.32 + i * 0.08;
        const lpLine = clamp01((lp - stagger) / 0.12);
        const opOut = clamp01((lp - 0.82) / 0.18);
        el.style.transform = `scaleX(${lpLine * (1 - opOut)})`;
        el.style.opacity = String(lpLine * (1 - opOut));
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

        {/* 4 노드 horizontal graph */}
        <div className="flex flex-wrap items-center justify-center gap-y-10">
          {NODES.map((n, i) => (
            <div key={n} className="flex items-center">
              {/* 노드 (dot + label) */}
              <div className="flex flex-col items-center gap-3">
                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="will-change-[transform,opacity]"
                  style={{
                    opacity: 0,
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--bn-accent)",
                    boxShadow: "0 0 12px rgba(159,179,200,0.6)",
                  }}
                />
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="will-change-[opacity]"
                  style={{
                    opacity: 0,
                    fontFamily: MARK,
                    fontWeight: 500,
                    fontSize: "clamp(1.8rem, 4.6vw, 4.4rem)",
                    letterSpacing: "-0.035em",
                    color: "var(--bn-ink)",
                    textShadow: "0 0 40px rgba(8,9,11,0.6)",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
              </div>

              {/* connecting line — 노드 사이 (마지막 제외) */}
              {i < 3 && (
                <div
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="will-change-[transform,opacity]"
                  style={{
                    width: "clamp(40px, 6vw, 96px)",
                    height: "1px",
                    background: "var(--bn-accent)",
                    margin: "0 clamp(12px, 2.4vw, 28px)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    opacity: 0,
                    alignSelf: "center",
                    marginTop: "8px", // dot 라인에 정렬
                  }}
                />
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
