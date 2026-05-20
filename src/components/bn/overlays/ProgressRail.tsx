"use client";

import { useEffect, useRef } from "react";
import { STAGES, type ZJourneyHandle } from "../useZJourney";

export default function ProgressRail({ handle }: { handle: ZJourneyHandle }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);

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
        d.style.transform = `scale(${isActive ? 1.6 : 1})`;
        d.style.background = isActive
          ? "#c4b5fd"
          : isPassed
            ? "rgba(196,181,253,0.55)"
            : "rgba(255,255,255,0.18)";
      });
      if (labelRef.current) {
        labelRef.current.textContent = STAGES[activeIdx].label;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  return (
    <div className="pointer-events-none absolute right-6 top-1/2 z-10 flex -translate-y-1/2 items-center gap-4">
      <div className="flex flex-col items-end gap-1 text-right">
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/35">Layer</span>
        <span
          ref={labelRef}
          className="text-[11px] tracking-[0.25em] text-white/85 transition-colors"
          style={{ wordBreak: "keep-all" }}
        >
          Architecture of Thought
        </span>
      </div>
      <div className="relative h-[260px] w-px bg-white/10">
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top bg-[#c4b5fd]"
          style={{ transform: "scaleY(0)", transition: "none" }}
        />
        <div className="absolute -right-[3.5px] top-0 flex h-full flex-col justify-between">
          {STAGES.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="h-[7px] w-[7px] rounded-full transition-[transform,background] duration-200 ease-out"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
