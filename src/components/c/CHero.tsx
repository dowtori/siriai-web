"use client";

// Hero — 외주 원안 정확 카피:
// H1: "관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다."
// Sub: "Creators remembered. Connection, accelerated."
// Pager: ← N/5 → (16 orb를 5장 carousel)
//
// slide 1 — BX 컨셉 재현:
//   "다양한 글자의 파편이 형태를 이루어 이미지를 표현 / 다양한 철자들이 자유롭게 움직이며"
//   "중앙 집중·외각으로 흐릿(시야)" / 마우스 = 시야 왜곡(주변 글자들이 밀려남)
//   → COrbCanvas: Three.js Instanced 글자 atlas 입자 시스템
//   → 입자 흩어지면 아래 16 라벨이 자연스럽게 드러남 (별도 mask 없이)
// slide 2~5 — orbs/01~16.png 큰 사이즈로 4개씩 묶음 노출

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const COrbCanvas = dynamic(() => import("./COrbCanvas"), { ssr: false });

const TOTAL_SLIDES = 5;

const ORB_LABELS = [
  "Context",
  "Signal",
  "Question",
  "Edge",
  "Clarity",
  "Modeling",
  "Oversight",
  "Trace",
  "Flow",
  "Rhythm",
  "Connection",
  "Momentum",
  "Evidence",
  "Benchmark",
  "Learning",
  "Compounding",
];

const ORB_GROUPS: { idx: number; label: string }[][] = [
  [
    { idx: 1, label: "Context" },
    { idx: 2, label: "Signal" },
    { idx: 3, label: "Question" },
    { idx: 4, label: "Edge" },
  ],
  [
    { idx: 5, label: "Clarity" },
    { idx: 6, label: "Modeling" },
    { idx: 7, label: "Oversight" },
    { idx: 8, label: "Trace" },
  ],
  [
    { idx: 9, label: "Flow" },
    { idx: 10, label: "Rhythm" },
    { idx: 11, label: "Connection" },
    { idx: 12, label: "Momentum" },
  ],
  [
    { idx: 13, label: "Evidence" },
    { idx: 14, label: "Benchmark" },
    { idx: 15, label: "Learning" },
    { idx: 16, label: "Compounding" },
  ],
];

export default function CHero() {
  const [slide, setSlide] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 0..1 정규화 좌표 (wrapper 기준). null = 호버 안 됨.
  const mouseNorm = useRef<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseNorm.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }
  function handleLeave() {
    mouseNorm.current = null;
  }

  return (
    <section
      id="hero"
      aria-labelledby="c-hero-heading"
      className="c-shell flex flex-col items-center gap-8 pt-10 pb-16 text-center"
      style={{ minHeight: "var(--c-hero-min-h)" }}
    >
      <h1 id="c-hero-heading" className="c-display max-w-[24ch]">
        관계에서 시작해 데이터로 확장하고,
        <br />
        기록으로 증명합니다.
      </h1>

      <p className="c-meta">Creators remembered. Connection, accelerated.</p>

      <div
        role="group"
        aria-label="Hero 페이지네이션"
        className="mt-2 flex items-center gap-4"
      >
        <button
          type="button"
          className="c-pager-arrow"
          aria-label="이전"
          onClick={() => setSlide((s) => Math.max(1, s - 1))}
          disabled={slide === 1}
        >
          ←
        </button>
        <span className="c-pager-count" aria-live="polite">
          {slide} / {TOTAL_SLIDES}
        </span>
        <button
          type="button"
          className="c-pager-arrow"
          aria-label="다음"
          onClick={() => setSlide((s) => Math.min(TOTAL_SLIDES, s + 1))}
          disabled={slide === TOTAL_SLIDES}
        >
          →
        </button>
      </div>

      <div className="mt-6 flex w-full items-center justify-center">
        {slide === 1 ? (
          <div
            ref={wrapperRef}
            className="c-hero-orb-stage relative"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            aria-hidden="true"
          >
            {/* Layer 1 — 16 라벨 (글자 입자 뒤, 입자 흩어지면 노출) */}
            <div className="c-hero-orb-labels">
              {ORB_LABELS.map((label) => (
                <span key={label} className="c-hero-orb-label">
                  {label}
                </span>
              ))}
            </div>

            {/* Layer 2 — 글자 파편 입자 구체 (Three.js) */}
            <div className="absolute inset-0">
              <COrbCanvas mouseNorm={mouseNorm} />
            </div>
          </div>
        ) : (
          <ul
            className="flex flex-wrap items-center justify-center gap-4"
            aria-label={`Slide ${slide}: ${ORB_GROUPS[slide - 2]
              .map((o) => o.label)
              .join(", ")}`}
          >
            {ORB_GROUPS[slide - 2].map((orb) => {
              const padded = `${orb.idx}`.padStart(2, "0");
              return (
                <li key={orb.idx} className="flex flex-col items-center gap-2">
                  <Image
                    src={`/c/assets/orbs/${padded}.png`}
                    alt={orb.label}
                    width={220}
                    height={220}
                    className="h-[clamp(140px,22vw,220px)] w-auto select-none"
                    priority={slide === 2}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
