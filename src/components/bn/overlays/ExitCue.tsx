"use client";

import { useEffect, useRef } from "react";
import type { ZJourneyHandle } from "../useZJourney";

export default function ExitCue({ handle }: { handle: ZJourneyHandle }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      if (wrapRef.current) {
        const fade = p < 0.08 ? 1 : Math.max(0, 1 - (p - 0.08) / 0.06);
        wrapRef.current.style.opacity = String(fade);
      }
      if (arrowRef.current) {
        const t = performance.now() / 1000;
        const bob = Math.sin(t * 1.8) * 3;
        arrowRef.current.style.transform = `translateY(${bob}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70"
    >
      <span className="text-[10px] tracking-[0.45em] uppercase">Drag · Scroll · Space</span>
      <svg
        ref={arrowRef}
        width="14"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        className="opacity-80"
      >
        <path
          d="M7 0 V18 M1 12 L7 18 L13 12"
          stroke="#c4b5fd"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
