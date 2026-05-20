"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

export type ZJourneyHandle = {
  targetRef: MutableRefObject<number>;
  progressRef: MutableRefObject<number>;
  velocityRef: MutableRefObject<number>;
};

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);

export function useZJourney(): ZJourneyHandle {
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let prev = 0;

    const tick = (t: number) => {
      const dt = prev ? Math.min((t - prev) / 1000, 0.05) : 0.016;
      prev = t;
      const diff = targetRef.current - progressRef.current;
      const k = Math.min(1, dt * 8.5);
      const next = progressRef.current + diff * k;
      velocityRef.current = (next - progressRef.current) / Math.max(dt, 1e-3);
      progressRef.current = next;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Input field guard — form input/textarea 위에서는 wheel/key를 가로채지 않음
    const isInputTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
    };

    const onWheel = (e: WheelEvent) => {
      if (isInputTarget(e.target)) return;
      e.preventDefault();
      const norm = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      targetRef.current = clamp(targetRef.current + norm * 0.00065);
    };

    const stageStep = 0.165;
    const onKey = (e: KeyboardEvent) => {
      if (isInputTarget(e.target)) return;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          targetRef.current = clamp(targetRef.current + stageStep);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          targetRef.current = clamp(targetRef.current - stageStep);
          break;
        case "Home":
          targetRef.current = 0;
          break;
        case "End":
          targetRef.current = 1;
          break;
      }
    };

    let dragging = false;
    let lastY = 0;
    let pointerType: "mouse" | "touch" | "pen" = "mouse";
    const onPointerDown = (e: PointerEvent) => {
      if (isInputTarget(e.target)) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      lastY = e.clientY;
      pointerType = (e.pointerType || "mouse") as typeof pointerType;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = lastY - e.clientY;
      lastY = e.clientY;
      // touch는 mouse drag보다 감도 더 크게 (작은 화면 = 큰 multiplier)
      const mult = pointerType === "touch" ? 0.0038 : 0.0023;
      targetRef.current = clamp(targetRef.current + dy * mult);
    };
    const onPointerUp = () => {
      dragging = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return { targetRef, progressRef, velocityRef };
}

// ── A안 v3 7-section IA를 B안 z-tunnel 6 stage로 매핑 ──
//   각 stage는 disjoint하게 분리. 인접 stage 사이 0.02 cross-fade로 짧은 dissolve.
//   active 폭 ≈ 0.18, cross-fade ≈ 0.02 (Round 4 — 겹침 가독성 회복)
export const STAGES = [
  { id: 0, numeral: "I", label: "Hero", from: 0.0, to: 0.18 },
  { id: 1, numeral: "II", label: "Stance", from: 0.18, to: 0.36 },
  { id: 2, numeral: "III", label: "System", from: 0.36, to: 0.54 },
  { id: 3, numeral: "IV", label: "Methodology", from: 0.54, to: 0.72 },
  { id: 4, numeral: "V", label: "Voice", from: 0.72, to: 0.9 },
  { id: 5, numeral: "VI", label: "Contact", from: 0.9, to: 1.0 },
] as const;

export function stageProgress(progress: number, from: number, to: number) {
  if (progress <= from) return 0;
  if (progress >= to) return 1;
  return (progress - from) / (to - from);
}
