"use client";

import { useEffect, useRef } from "react";
import { STAGES, type ZJourneyHandle } from "../useZJourney";

const MONO = "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

export default function ProgressRail({ handle }: { handle: ZJourneyHandle }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }
      let activeIdx = 0;
      for (let i = 0; i < STAGES.length; i++) {
        const s = STAGES[i];
        if (p >= s.from && p < s.to) {
          activeIdx = i;
          break;
        }
        if (p >= s.to) activeIdx = i;
      }
      dotsRef.current.forEach((d, i) => {
        if (!d) return;
        const isActive = i === activeIdx;
        const isPassed = i < activeIdx;
        d.style.transform = `scale(${isActive ? 1.7 : 1})`;
        d.style.background = isActive
          ? "var(--bn-accent)"
          : isPassed
            ? "rgba(159,179,200,0.55)"
            : "rgba(232,234,238,0.18)";
      });
      if (labelRef.current) {
        labelRef.current.textContent = STAGES[activeIdx].label;
      }
      if (numeralRef.current) {
        // Roman numeral 대신 0-padded mono 인덱스 (II → 02 식). functional 결.
        numeralRef.current.textContent = String(activeIdx).padStart(2, "0");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  return (
    <div className="pointer-events-none absolute right-7 top-1/2 z-10 flex -translate-y-1/2 items-center gap-5">
      <div className="flex flex-col items-end gap-2 text-right">
        <span
          ref={numeralRef}
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: "11px",
            color: "var(--bn-accent)",
            letterSpacing: "0.18em",
            lineHeight: 1,
          }}
        >
          00
        </span>
        <span
          ref={labelRef}
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: "10.5px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
            lineHeight: 1.3,
          }}
        >
          Hero
        </span>
      </div>
      <div className="relative h-[280px] w-px" style={{ background: "var(--bn-rule)" }}>
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top"
          style={{
            background: "var(--bn-accent)",
            transform: "scaleY(0)",
            transition: "none",
          }}
        />
        <div className="absolute -right-[3.5px] top-0 flex h-full flex-col justify-between">
          {STAGES.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="h-[7px] w-[7px] rounded-full transition-[transform,background] duration-200 ease-out"
              style={{ background: "rgba(232,234,238,0.18)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
