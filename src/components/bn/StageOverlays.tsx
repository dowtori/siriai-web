"use client";

import { useEffect, useRef } from "react";
import { stageProgress, type ZJourneyHandle } from "./useZJourney";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export default function StageOverlays({ handle }: { handle: ZJourneyHandle }) {
  const stage0 = useRef<HTMLDivElement>(null);
  const stage0Sub = useRef<HTMLDivElement>(null);
  const stage1 = useRef<HTMLDivElement>(null);
  const stage1Eyebrow = useRef<HTMLDivElement>(null);
  const stage1Sub = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;

      // Stage 0 — SIRIAI wordmark: 0.00–0.22 visible, 0.22–0.32 fade·explode
      if (stage0.current) {
        const lp = stageProgress(p, 0, 0.32);
        const scale = mix(1.0, 5.2, Math.pow(lp, 1.6));
        const opacity = lp < 0.55 ? 1 : 1 - clamp01((lp - 0.55) / 0.45);
        const letter = mix(-0.04, 0.12, lp);
        stage0.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
        stage0.current.style.opacity = String(opacity);
        stage0.current.style.letterSpacing = `${letter}em`;
      }
      if (stage0Sub.current) {
        const lp = stageProgress(p, 0, 0.16);
        const opacity = lp < 0.5 ? 1 : 1 - clamp01((lp - 0.5) / 0.5);
        stage0Sub.current.style.opacity = String(opacity);
        stage0Sub.current.style.transform = `translate3d(0,${(1 - lp) * 12}px,0)`;
      }

      // Stage 1 — Korean statement: 0.16–0.50
      if (stage1.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const inT = clamp01((lp - 0.05) / 0.22);
        const outT = clamp01((lp - 0.75) / 0.25);
        const opacity = inT * (1 - outT);
        const scale = mix(0.78, 1.18, lp);
        stage1.current.style.opacity = String(opacity);
        stage1.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (stage1Eyebrow.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const op = clamp01((lp - 0.0) / 0.18) * (1 - clamp01((lp - 0.7) / 0.3));
        stage1Eyebrow.current.style.opacity = String(op);
        stage1Eyebrow.current.style.transform = `translate3d(0,${(1 - clamp01(lp / 0.3)) * 18}px,0)`;
      }
      if (stage1Sub.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const op = clamp01((lp - 0.35) / 0.2) * (1 - clamp01((lp - 0.85) / 0.15));
        stage1Sub.current.style.opacity = String(op);
        stage1Sub.current.style.transform = `translate3d(0,${(1 - clamp01((lp - 0.3) / 0.4)) * 18}px,0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
      {/* Stage 0 — SIRIAI wordmark */}
      <div
        ref={stage0}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <span
          className="font-bold text-white"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 22rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textShadow: "0 0 80px rgba(196,181,253,0.35)",
          }}
        >
          SIRIAI
        </span>
      </div>

      {/* Stage 0 — sub label */}
      <div
        ref={stage0Sub}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 will-change-transform"
      >
        <div className="flex flex-col items-center gap-3 text-white/70">
          <span className="text-[10px] tracking-[0.5em] uppercase">Architecture of Thought</span>
          <span className="text-[11px] tracking-[0.3em] text-white/40">— a journey in six layers</span>
        </div>
      </div>

      {/* Stage 1 — Eyebrow */}
      <div
        ref={stage1Eyebrow}
        className="absolute top-[30%] left-1/2 -translate-x-1/2 will-change-transform"
      >
        <span
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: "#c4b5fd" }}
        >
          Beyond Tools
        </span>
      </div>

      {/* Stage 1 — Headline (Korean) */}
      <div
        ref={stage1}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <h2
          className="text-center font-bold text-white"
          style={{
            fontSize: "clamp(2.4rem, 8.5vw, 9rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            wordBreak: "keep-all",
            textShadow: "0 0 60px rgba(0,0,0,0.8)",
          }}
        >
          AI는 도구가 아니다.
        </h2>
      </div>

      {/* Stage 1 — Subline */}
      <div
        ref={stage1Sub}
        className="absolute bottom-[28%] left-1/2 -translate-x-1/2 will-change-transform max-w-[640px] px-6 text-center"
      >
        <p className="text-[14px] leading-[1.85] text-white/55" style={{ wordBreak: "keep-all" }}>
          매주 새로운 모델이 등장합니다. 도구는 바뀝니다.
          <br />
          남는 것은 — <span className="text-white/90">사고하는 구조</span>.
        </p>
      </div>
    </div>
  );
}
