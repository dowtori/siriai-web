"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import StageOverlays from "./StageOverlays";
import ProgressRail from "./overlays/ProgressRail";
import ExitCue from "./overlays/ExitCue";
import { useZJourney } from "./useZJourney";

const MARK = "var(--bn-mark), serif";

export default function ZJourney() {
  const handle = useZJourney();

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ touchAction: "none", background: "var(--bn-bg)" }}
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

      <StageOverlays handle={handle} />

      {/* ── Header — editorial colophon ────────────────────── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-7 py-6">
        <div className="flex items-center gap-2.5">
          <span
            style={{
              fontFamily: MARK,
              fontWeight: 900,
              fontSize: "17px",
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
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "11px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.04em",
            }}
          >
            an essay in six layers
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "11px",
              color: "var(--bn-accent)",
              letterSpacing: "0.04em",
            }}
          >
            Vol. I — 2026
          </span>
          <span
            style={{
              fontFamily: MARK,
              fontWeight: 400,
              fontSize: "9.5px",
              color: "var(--bn-ink-faint)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}
          >
            Architecture of Thought
          </span>
        </div>
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

      {/* ── Bottom rule + colophon ────────────────────────── */}
      <div className="pointer-events-none absolute bottom-7 left-7 z-10 flex items-center gap-3">
        <span
          className="block h-px w-6"
          style={{ background: "var(--bn-accent)" }}
        />
        <span
          style={{
            fontFamily: MARK,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "11px",
            color: "var(--bn-ink-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Seoul, MMXXVI
        </span>
      </div>
    </div>
  );
}
