"use client";

// 글자 토성 고리 — 중앙 orb 둘레를 도는 글자 ring.
// 컨셉: 행성 표면의 띠처럼 글자들이 회전. X축 기울임으로 평면 ring 입체감.
// 마우스 좌우 위치 → ring 회전 속도 가속 (lerp).
// RAF 직접 style.transform 갱신 (60fps, 가벼움).

import { useEffect, useRef } from "react";

const GLYPHS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "0","1","2","3","4","5","6","7","8","9",
  "·","◯","+","×","◇",
];

// 두 겹 ring으로 밀도 (토성 고리, 좁게 — 훈민정음 X)
const RING_LAYERS = [
  { radiusPct: 46, tiltDeg: -22, baseDeg: 0,  speed: 0.18, fontSizePx: 17, fontWeight: 600, color: "var(--c-ink-soft)" },
  { radiusPct: 52, tiltDeg: -22, baseDeg: 17, speed: 0.13, fontSizePx: 13, fontWeight: 500, color: "var(--c-ink-mute)" },
];

const MAX_SPEED_BOOST = 0.55;    // 마우스 끝 위치에서 추가 최대 가속(deg/frame)
const SPEED_LERP = 0.06;          // 마우스 따라가는 부드러움

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
      // 마우스 x(0..1) → -1..1, 가운데 0, 가장자리 ±1
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
        const count = GLYPHS.length;
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
            {GLYPHS.map((g, i) => {
              const angle = (i / count) * 360;
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
