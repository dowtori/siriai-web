"use client";

import { useEffect, useRef } from "react";
import { stageProgress, type ZJourneyHandle } from "./useZJourney";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const MARK = "var(--bn-mark), serif";

export default function StageOverlays({ handle }: { handle: ZJourneyHandle }) {
  const stage0 = useRef<HTMLDivElement>(null);
  const stage0Cap = useRef<HTMLDivElement>(null);
  const stage1 = useRef<HTMLDivElement>(null);
  const stage1Eyebrow = useRef<HTMLDivElement>(null);
  const stage1Sub = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;

      // ── Stage 0 — SIRIAI wordmark ───────────────────────────────
      if (stage0.current) {
        const lp = stageProgress(p, 0, 0.32);
        const scale = mix(1.0, 5.4, Math.pow(lp, 1.55));
        const opacity = lp < 0.55 ? 1 : 1 - clamp01((lp - 0.55) / 0.45);
        const letter = mix(-0.06, 0.14, lp);
        stage0.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
        stage0.current.style.opacity = String(opacity);
        stage0.current.style.letterSpacing = `${letter}em`;
      }
      if (stage0Cap.current) {
        const lp = stageProgress(p, 0, 0.16);
        const opacity = lp < 0.55 ? 1 : 1 - clamp01((lp - 0.55) / 0.45);
        stage0Cap.current.style.opacity = String(opacity);
        stage0Cap.current.style.transform = `translate3d(0,${(1 - lp) * 14}px,0)`;
      }

      // ── Stage 1 — 한국어 headline ────────────────────────────────
      if (stage1.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const inT = clamp01((lp - 0.08) / 0.2);
        const outT = clamp01((lp - 0.75) / 0.25);
        const opacity = inT * (1 - outT);
        const scale = mix(0.82, 1.16, lp);
        stage1.current.style.opacity = String(opacity);
        stage1.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (stage1Eyebrow.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const op = clamp01((lp - 0.02) / 0.18) * (1 - clamp01((lp - 0.7) / 0.3));
        stage1Eyebrow.current.style.opacity = String(op);
        stage1Eyebrow.current.style.transform = `translate3d(0,${(1 - clamp01(lp / 0.3)) * 16}px,0)`;
      }
      if (stage1Sub.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const op = clamp01((lp - 0.4) / 0.2) * (1 - clamp01((lp - 0.85) / 0.15));
        stage1Sub.current.style.opacity = String(op);
        stage1Sub.current.style.transform = `translate3d(0,${(1 - clamp01((lp - 0.35) / 0.4)) * 16}px,0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
      {/* ── Stage 0 — SIRIAI wordmark (Playfair Display Black) ── */}
      <div
        ref={stage0}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <span
          className="font-black"
          style={{
            fontFamily: MARK,
            fontWeight: 900,
            fontSize: "clamp(5rem, 19vw, 24rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.06em",
            color: "var(--bn-ink)",
            textShadow:
              "0 0 60px rgba(184,145,106,0.18), 0 0 120px rgba(184,145,106,0.08)",
            fontFeatureSettings: '"liga" 1, "kern" 1',
          }}
        >
          Siriai
        </span>
      </div>

      {/* ── Stage 0 — editorial caption (top + bottom corners) ── */}
      <div
        ref={stage0Cap}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        {/* top-left issue line */}
        <div className="absolute left-7 top-[7.5rem] flex flex-col gap-1">
          <span
            className="block"
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "13px",
              color: "var(--bn-accent)",
              letterSpacing: "0.04em",
            }}
          >
            Vol. I
          </span>
          <span
            className="block"
            style={{
              fontFamily: MARK,
              fontWeight: 400,
              fontSize: "11px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            The Six Layers
          </span>
        </div>

        {/* bottom centerpiece — chapter title */}
        <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center gap-3">
          <span
            className="block h-px w-12"
            style={{ background: "var(--bn-accent)" }}
          />
          <span
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "var(--bn-ink)",
              letterSpacing: "0.02em",
            }}
          >
            Architecture of Thought
          </span>
          <span
            style={{
              fontFamily: PRETENDARD,
              fontWeight: 400,
              fontSize: "11px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
            }}
          >
            사고하는 구조
          </span>
        </div>
      </div>

      {/* ── Stage 1 — eyebrow (Playfair italic + copper) ── */}
      <div
        ref={stage1Eyebrow}
        className="absolute top-[26%] left-1/2 -translate-x-1/2 will-change-transform flex items-center gap-4"
      >
        <span
          className="h-px w-8"
          style={{ background: "var(--bn-accent)" }}
        />
        <span
          style={{
            fontFamily: MARK,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "15px",
            letterSpacing: "0.04em",
            color: "var(--bn-accent)",
          }}
        >
          II.
        </span>
        <span
          style={{
            fontFamily: MARK,
            fontWeight: 400,
            fontSize: "11px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "var(--bn-ink-muted)",
          }}
        >
          Beyond&nbsp;Tools
        </span>
        <span
          className="h-px w-8"
          style={{ background: "var(--bn-accent)" }}
        />
      </div>

      {/* ── Stage 1 — Korean headline (Pretendard 800) ── */}
      <div
        ref={stage1}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <h2
          className="text-center"
          style={{
            fontFamily: PRETENDARD,
            fontWeight: 800,
            fontSize: "clamp(2.6rem, 9vw, 9.5rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            wordBreak: "keep-all",
            color: "var(--bn-ink)",
            textShadow:
              "0 0 80px rgba(10,9,8,0.7), 0 0 24px rgba(10,9,8,0.55)",
          }}
        >
          AI는 도구가 아니다.
        </h2>
      </div>

      {/* ── Stage 1 — Subline (Pretendard + Playfair italic mix) ── */}
      <div
        ref={stage1Sub}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 will-change-transform max-w-[560px] px-6 text-center flex flex-col items-center gap-4"
      >
        <p
          style={{
            fontFamily: PRETENDARD,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: 1.95,
            letterSpacing: "0.005em",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          매주 새로운 모델이 등장합니다. 도구는 바뀝니다.
          <br />
          남는 것은 —{" "}
          <span style={{ color: "var(--bn-ink)", fontWeight: 600 }}>
            사고하는 구조
          </span>
          .
        </p>
        <span
          className="block h-px w-10"
          style={{ background: "var(--bn-accent)" }}
        />
        <span
          style={{
            fontFamily: MARK,
            fontStyle: "italic",
            fontSize: "13px",
            color: "var(--bn-accent)",
            letterSpacing: "0.04em",
          }}
        >
          — the architecture that remains
        </span>
      </div>
    </div>
  );
}
