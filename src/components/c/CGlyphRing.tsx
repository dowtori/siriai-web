"use client";

// 글자 토성 고리 — 중앙 시야 초점 둘레를 도는 글자 ring 3겹.
// 컨셉(외주 BX): 글자 파편이 형태를 이룬다 + 외각으로 갈수록 흐릿한 시야.
// 구현: 3겹 × 60글자 = 180개. X축 -22° 동일 기울임, 안→밖 weight·색 점진 옅게.
// 마우스 좌우 → 모든 ring 회전 가속 lerp (사라짐 없음).
// RAF가 ring 컨테이너의 style.transform 직접 갱신 (60fps).

import { useEffect, useRef } from "react";

// 글자 풀 — 라틴 대소 + 숫자 + 기호 → 4겹에 같은 풀을 다른 offset으로 분포.
const POOL: string[] = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),   // A-Z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),   // a-z
  ...Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i)),   // 0-9
  "·", "◯", "+", "×", "◇", "○", "−", "/", "*", "÷",
];

const GLYPHS_PER_RING = 80;

// 4겹 — 안→밖 radius 28/38/48/58cqi, 글자 색·weight·size 미세 차등.
//        외곽 옅음은 ink-soft 까지만(끊긴 점선 인상 회피).
type RingLayer = {
  radiusPct: number;
  tiltDeg: number;
  baseDeg: number;
  speed: number;       // deg/frame
  fontSizePx: number;
  fontWeight: number;
  color: string;
  glyphOffset: number; // POOL 시작 인덱스 offset
};

const RING_LAYERS: RingLayer[] = [
  { radiusPct: 28, tiltDeg: -22, baseDeg: 0,  speed: 0.22, fontSizePx: 13, fontWeight: 600, color: "var(--c-ink)",      glyphOffset: 0  },
  { radiusPct: 38, tiltDeg: -22, baseDeg: 9,  speed: 0.18, fontSizePx: 13, fontWeight: 600, color: "var(--c-ink-soft)", glyphOffset: 19 },
  { radiusPct: 48, tiltDeg: -22, baseDeg: 19, speed: 0.14, fontSizePx: 12, fontWeight: 500, color: "var(--c-ink-soft)", glyphOffset: 38 },
  { radiusPct: 58, tiltDeg: -22, baseDeg: 27, speed: 0.10, fontSizePx: 12, fontWeight: 500, color: "var(--c-ink-soft)", glyphOffset: 57 },
];

const MAX_SPEED_BOOST = 0.55; // 마우스 가장자리에서 추가 가속 (deg/frame)
const SPEED_LERP = 0.06;

type Props = {
  mouseNorm: React.RefObject<{ x: number; y: number } | null>;
};

export default function CGlyphRing({ mouseNorm }: Props) {
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotations = useRef<number[]>(RING_LAYERS.map((l) => l.baseDeg));
  const speeds = useRef<number[]>(RING_LAYERS.map((l) => l.speed));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function loop() {
      const m = mouseNorm.current;
      // x(0..1) → -1..1, 가운데 0, 가장자리 ±1
      const boost = m ? (m.x - 0.5) * 2 * MAX_SPEED_BOOST : 0;

      for (let i = 0; i < RING_LAYERS.length; i++) {
        const layer = RING_LAYERS[i];
        const target = layer.speed + boost;
        speeds.current[i] += (target - speeds.current[i]) * SPEED_LERP;
        rotations.current[i] += speeds.current[i];

        const ref = ringRefs.current[i];
        if (ref) {
          ref.style.transform = `translate(-50%, -50%) rotateX(${layer.tiltDeg}deg) rotateY(${rotations.current[i]}deg)`;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseNorm]);

  return (
    <>
      {RING_LAYERS.map((layer, layerIdx) => {
        const glyphs = Array.from({ length: GLYPHS_PER_RING }, (_, i) =>
          POOL[(i + layer.glyphOffset) % POOL.length],
        );
        return (
          <div
            key={layerIdx}
            ref={(el) => {
              ringRefs.current[layerIdx] = el;
            }}
            className="c-hero-ring"
            style={{
              transform: `translate(-50%, -50%) rotateX(${layer.tiltDeg}deg) rotateY(${layer.baseDeg}deg)`,
            }}
            aria-hidden="true"
          >
            {glyphs.map((g, i) => {
              const angle = (i / GLYPHS_PER_RING) * 360;
              return (
                <span
                  key={`${layerIdx}-${i}`}
                  className="c-hero-glyph"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${layer.radiusPct}cqi) rotateY(${-angle}deg) translate(-50%, -50%)`,
                    fontSize: `${layer.fontSizePx}px`,
                    fontWeight: layer.fontWeight,
                    color: layer.color,
                  }}
                >
                  {g}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
