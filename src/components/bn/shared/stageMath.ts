// Shared math helpers for B안 z-tunnel Atlas stages.
// Pure functions — non-component, no DOM.

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Easing functions
export const easeOutExpo = (t: number) =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Local progress within a stage's [from, to] range. 0..1, clamped outside. */
export function localProgress(p: number, from: number, to: number) {
  if (p <= from) return 0;
  if (p >= to) return 1;
  return (p - from) / (to - from);
}

/**
 * stageOpacity:
 *   progress ∈ [from, to] 구간 외에서는 0.
 *   stage 진입/이탈 시 fadeRatio 비율로 부드러운 envelope.
 */
export function stageOpacity(
  p: number,
  from: number,
  to: number,
  fadeRatio = 0.18,
) {
  if (p <= from || p >= to) return 0;
  const lp = (p - from) / (to - from);
  return clamp01(lp / fadeRatio) * clamp01((1 - lp) / fadeRatio);
}

/**
 * stageZ:
 *   stage가 z축 진입에 따라 멀리서 다가와 → 활성에서 z=0 → 이탈 시 카메라 뒤로.
 *   stage 범위 + 양옆 ext만큼 z motion 전개. progress 외부에서는 ±zRange로 클램프.
 */
export function stageZ(
  p: number,
  from: number,
  to: number,
  zRange = 480,
  ext = 0.05,
) {
  const inFrom = from - ext;
  const outTo = to + ext;
  if (p < inFrom) return -zRange;
  if (p > outTo) return zRange;
  const lp = (p - inFrom) / (outTo - inFrom);
  return (lp - 0.5) * 2 * zRange;
}

/** Word/line stagger 계산 — stage 활성 진입에 따라 단어별 opacity·translateY 갱신. */
export function wordOpacityY(
  p: number,
  from: number,
  to: number,
  wordIdx: number,
  wordCount: number,
  fadeRatio = 0.42,
) {
  if (p <= from || p >= to) {
    if (p <= from) return { op: 0, y: 18 };
    return { op: 0, y: -12 };
  }
  const lp = (p - from) / (to - from);
  const perWord = (fadeRatio * 0.7) / Math.max(1, wordCount);
  const lpWord = clamp01(
    (lp - wordIdx * perWord) /
      (fadeRatio - wordIdx * perWord || fadeRatio),
  );
  const outT = clamp01((lp - (1 - fadeRatio)) / fadeRatio);
  const op = lpWord * (1 - outT);
  const y = (1 - lpWord) * 18 + outT * -10;
  return { op, y };
}

/** Apply stage wrapper transform (opacity + translateZ). */
export function applyStageTransform(
  el: HTMLElement | null,
  p: number,
  from: number,
  to: number,
  fadeRatio = 0.18,
) {
  if (!el) return;
  const op = stageOpacity(p, from, to, fadeRatio);
  const z = stageZ(p, from, to);
  el.style.opacity = String(op);
  el.style.transform = `translate3d(0,0,${z}px)`;
}

// Font shorthand tokens (used across stage components)
export const PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
export const MARK = "var(--bn-mark), serif";
export const MONO =
  "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
