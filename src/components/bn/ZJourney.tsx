"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import StageOrchestrator from "./stages/StageOrchestrator";
import ProgressRail from "./overlays/ProgressRail";
import ExitCue from "./overlays/ExitCue";
import { useZJourney } from "./useZJourney";

const MARK = "var(--bn-mark), serif";
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
        <color attach="background" args={["#0A0908"]} />
        <fog attach="fog" args={["#0A0908", 12, 90]} />
        <Suspense fallback={null}>
          <Scene handle={handle} />
        </Suspense>
      </Canvas>

      <StageOrchestrator handle={handle} />

      {/* ╔══════════════════════════════════════════════════╗
          ║  Header — A안 Hero eyebrow baseline               ║
          ╚══════════════════════════════════════════════════╝ */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-7 py-6">
        {/* Left — wordmark + eyebrow */}
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: MARK,
              fontWeight: 900,
              fontSize: "18px",
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
            A practice in AI architecture
          </span>
        </div>

        {/* Right — chapter label (mono) */}
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
          Vol. I — MMXXVI
        </span>
      </header>

      <ProgressRail handle={handle} />
      <ExitCue handle={handle} />

      {/* ── Vignette (warm) ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(5,4,3,0.55) 92%, rgba(5,4,3,0.8) 100%)",
        }}
      />

      {/* ── Film grain overlay (SVG fractal noise) ────────── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] h-full w-full opacity-[0.07] mix-blend-overlay"
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
            values="0 0 0 0 1   0 0 0 0 0.96   0 0 0 0 0.86   0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bn-grain)" />
      </svg>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Bottom colophon — real © / contact (A안 footer)  ║
          ╚══════════════════════════════════════════════════╝ */}
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
