"use client";

import { useEffect, useRef } from "react";
import type { ZJourneyHandle } from "../useZJourney";

const MARK = "var(--bn-mark), serif";

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
      className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
    >
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
      <span
        style={{
          fontFamily: MARK,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "13px",
          color: "var(--bn-ink)",
          letterSpacing: "0.04em",
        }}
      >
        Enter the architecture
      </span>
      <span
        style={{
          fontFamily: MARK,
          fontWeight: 400,
          fontSize: "9.5px",
          color: "var(--bn-ink-faint)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
        }}
      >
        Drag · Scroll · Space
      </span>
    </div>
  );
}
