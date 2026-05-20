"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import StageOrchestrator from "./stages/StageOrchestrator";
import ProgressRail from "./overlays/ProgressRail";
import ExitCue from "./overlays/ExitCue";
import { useZJourney } from "./useZJourney";

const MARK = "var(--bn-mark), system-ui, sans-serif";
const MONO = "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
const PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

export default function ZJourney() {
  const handle = useZJourney();

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        touchAction: "none",
        background: "var(--bn-bg)",
        fontFamily: PRETENDARD,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65, near: 0.1, far: 400 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#08090B"]} />
        <fog attach="fog" args={["#08090B", 12, 90]} />
        <Suspense fallback={null}>
          <Scene handle={handle} />
        </Suspense>
      </Canvas>

      <StageOrchestrator handle={handle} />

      {/* ── Header — wordmark + functional caption ────────── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-7 py-6">
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: MARK,
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-0.02em",
              color: "var(--bn-ink)",
              lineHeight: 1,
            }}
          >
            Siriai
          </span>
          <span
            className="block h-[10px] w-px"
            style={{ background: "var(--bn-rule)" }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            AI Architecture Practice
          </span>
        </div>

        <span
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: "10.5px",
            color: "var(--bn-ink-faint)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          Seoul · 2026
        </span>
      </header>

      <ProgressRail handle={handle} />
      <ExitCue handle={handle} />

      {/* ── Vignette (cool) ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(4,5,10,0.55) 92%, rgba(4,5,10,0.85) 100%)",
        }}
      />

      {/* ── Film grain overlay (cool tint) ────────────────── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] h-full w-full opacity-[0.05] mix-blend-overlay"
      >
        <filter id="bn-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.91   0 0 0 0 0.93   0 0 0 0 0.97   0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bn-grain)" />
      </svg>

      {/* ── Bottom colophon — © + contact (mono) ──────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-7">
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: "10px",
            color: "var(--bn-ink-faint)",
            letterSpacing: "0.18em",
          }}
        >
          © 2024 — 2026 주식회사 시리아이 (SIRIAI)
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: "10px",
            color: "var(--bn-ink-faint)",
            letterSpacing: "0.18em",
          }}
        >
          contact@siriai.io
        </span>
      </div>
    </div>
  );
}
