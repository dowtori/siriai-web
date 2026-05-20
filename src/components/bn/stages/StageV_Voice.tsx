"use client";

/**
 * Stage V — Voice (§05)
 * Artifact: Book-page manifesto.
 * Mechanic: z 정지. 다른 stage가 motion이면 V는 quiet beat.
 *           큰 typography 영문 헤드 + 한국어 매니페스토 줄별 reveal (A안 VoiceSection 결).
 *           wrapper translateZ 부드럽지만 stage 내부 motion은 최소.
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
import type { ZJourneyHandle } from "../useZJourney";
import type { StageProps } from "./StageI_Hero";

export default function StageV_Voice({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const krLineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const attribRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);

      const lp = localProgress(p, from, to);

      // 정적 quiet beat — fade만, motion 없음.
      const setFade = (
        el: HTMLElement | null,
        delay: number,
        sustain = 0.78,
      ) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.18);
        const opOut = clamp01((lp - sustain) / (1 - sustain));
        el.style.opacity = String(opIn * (1 - opOut));
      };

      setFade(eyebrowRef.current, 0.04);
      setFade(headRef.current, 0.18);
      // KR manifesto 줄별 reveal
      krLineRefs.current.forEach((el, i) => setFade(el, 0.45 + i * 0.07));
      setFade(attribRef.current, 0.72);

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
        className="flex flex-col items-center gap-9 px-6 text-center max-w-[860px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
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
              04 — Voice
            </span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
        </div>

        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 600,
            fontSize: "clamp(2.0rem, 6vw, 5.4rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.022em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(10,9,8,0.6)",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            maxWidth: "22ch",
          }}
        >
          We don&apos;t recommend tools.
          <br />
          We architect what stays.
        </h2>

        <div
          className="flex flex-col gap-3 max-w-[560px]"
          style={{
            fontFamily: PRETENDARD,
            fontSize: "16px",
            lineHeight: 2.0,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          {[
            "도구로서의 AI 접근을 넘어",
            <>
              니즈를 정확히 이해하고{" "}
              <span style={{ color: "var(--bn-ink)", fontWeight: 600 }}>
                &lsquo;사람&rsquo;
              </span>
              을 돕습니다.
            </>,
            "남는 것은 사고하는 구조.",
          ].map((line, i) => (
            <p
              key={i}
              ref={(el) => {
                krLineRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              {line}
            </p>
          ))}
        </div>

        <div ref={attribRef} style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "13px",
              color: "var(--bn-accent)",
              letterSpacing: "0.04em",
            }}
          >
            — Siriai Manifesto, MMXXVI
          </span>
        </div>
      </div>
    </div>
  );
}
