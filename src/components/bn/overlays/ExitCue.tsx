"use client";

import { useEffect, useRef } from "react";
import type { ZJourneyHandle } from "../useZJourney";

const MONO = "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

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
        const bob = Math.sin(t * 1.6) * 3;
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
      className="pointer-events-none absolute bottom-[5.5rem] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: "10.5px",
          color: "var(--bn-ink-faint)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        Scroll
      </span>
      <svg
        ref={arrowRef}
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        className="opacity-90"
      >
        <path
          d="M7 0 V20 M1 14 L7 20 L13 14"
          stroke="var(--bn-accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
