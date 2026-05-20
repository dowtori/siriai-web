"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import StageOverlays from "./StageOverlays";
import ProgressRail from "./overlays/ProgressRail";
import ExitCue from "./overlays/ExitCue";
import { useZJourney } from "./useZJourney";

export default function ZJourney() {
  const handle = useZJourney();

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#05050A] select-none"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65, near: 0.1, far: 400 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05050A"]} />
        <fog attach="fog" args={["#05050A", 12, 90]} />
        <Suspense fallback={null}>
          <Scene handle={handle} />
        </Suspense>
      </Canvas>

      <StageOverlays handle={handle} />

      {/* Top bar — wordmark + stage caption */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-7 py-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/70">
          Siriai · /bn
        </span>
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">
          Visual Impact Track
        </span>
      </header>

      <ProgressRail handle={handle} />
      <ExitCue handle={handle} />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
