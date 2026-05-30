"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type A1MotionParams = {
  revealDuration: number;
  revealStagger: number;
  cursorLerp: number;
  cursorRadius: number;
  rotationDuration: number;
  hoverDuration: number;
  stageTransition: number;
  ambientLoop: number;
};

export const A1_MOTION_DEFAULTS: A1MotionParams = {
  revealDuration: 1.0,
  revealStagger: 0.22,
  cursorLerp: 0.08,
  cursorRadius: 240,
  rotationDuration: 14,
  hoverDuration: 0.2,
  stageTransition: 0.8,
  ambientLoop: 12,
};

export const A1_MOTION_RANGES: Record<
  keyof A1MotionParams,
  { min: number; max: number; step: number; unit: string; label: string }
> = {
  revealDuration: { min: 0.3, max: 2.0, step: 0.05, unit: "s", label: "Text reveal" },
  revealStagger: { min: 0.04, max: 0.4, step: 0.01, unit: "s", label: "Line stagger" },
  cursorLerp: { min: 0.015, max: 0.2, step: 0.005, unit: "", label: "Cursor lerp" },
  cursorRadius: { min: 80, max: 320, step: 5, unit: "px", label: "Cursor radius" },
  rotationDuration: { min: 8, max: 40, step: 0.5, unit: "s", label: "Rotation" },
  hoverDuration: { min: 0.1, max: 0.4, step: 0.02, unit: "s", label: "Hover" },
  stageTransition: { min: 0.3, max: 1.5, step: 0.05, unit: "s", label: "Stage transition" },
  ambientLoop: { min: 3, max: 20, step: 0.5, unit: "s", label: "Ambient loop" },
};

const STORAGE_KEY = "siriai_a1_motion_v1";

type Ctx = {
  params: A1MotionParams;
  update: <K extends keyof A1MotionParams>(key: K, value: A1MotionParams[K]) => void;
  reset: () => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
};

const A1MotionContext = createContext<Ctx | null>(null);

export function A1MotionProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState<A1MotionParams>(A1_MOTION_DEFAULTS);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // localStorage hydration — server에서는 default, client mount 후 저장값으로 swap.
    // React 19 lint(react-hooks/set-state-in-effect)의 합리적 예외 케이스.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParams((p) => ({ ...p, ...parsed }));
      }
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const update = useCallback<Ctx["update"]>((key, value) => {
    setParams((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setParams(A1_MOTION_DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({ params, update, reset, reducedMotion, setReducedMotion }),
    [params, update, reset, reducedMotion],
  );

  return <A1MotionContext.Provider value={value}>{children}</A1MotionContext.Provider>;
}

export function useA1Motion(): Ctx {
  const ctx = useContext(A1MotionContext);
  if (!ctx) {
    throw new Error("useA1Motion must be used inside <A1MotionProvider>");
  }
  return ctx;
}
