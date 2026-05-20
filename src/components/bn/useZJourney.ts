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

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const norm = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      targetRef.current = clamp(targetRef.current + norm * 0.00065);
    };

    const stageStep = 0.165;
    const onKey = (e: KeyboardEvent) => {
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
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = lastY - e.clientY;
      lastY = e.clientY;
      targetRef.current = clamp(targetRef.current + dy * 0.0023);
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

export const STAGES = [
  { id: 0, label: "Architecture of Thought", from: 0.0, to: 0.16 },
  { id: 1, label: "AI는 도구가 아니다", from: 0.16, to: 0.32 },
  { id: 2, label: "사고하는 구조", from: 0.32, to: 0.5 },
  { id: 3, label: "운영 모델", from: 0.5, to: 0.68 },
  { id: 4, label: "여섯 자리", from: 0.68, to: 0.86 },
  { id: 5, label: "함께 운영합니다", from: 0.86, to: 1.0 },
] as const;

export function stageProgress(progress: number, from: number, to: number) {
  if (progress <= from) return 0;
  if (progress >= to) return 1;
  return (progress - from) / (to - from);
}
