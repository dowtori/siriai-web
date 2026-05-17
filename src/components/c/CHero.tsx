"use client";

// Hero — 외주 원안 정확 카피:
// H1: "관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다."
// Sub: "Creators remembered. Connection, accelerated."
// Pager: ← N/16 → (16 orb를 1장씩 carousel — 사용자 결정)
//
// 컨셉 (사용자 재기획):
//   중앙: orb 이미지 (Property 1=N, fade transition + 5초 자동 advance)
//   주변: 글자 토성 고리 (X축 -22° 기울임, 자동 회전, 마우스 좌우 → 회전 가속)
//   외주 BX "글자 파편이 형태를 이루어 시야를 묘사" 컨셉을 ring 형태로 재해석.

import { useRef, useState } from "react";
import CGlyphRing from "./CGlyphRing";
import CHeroCenter from "./CHeroCenter";

const TOTAL = 16;

export default function CHero() {
  const [index, setIndex] = useState(1);
  const [hovering, setHovering] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef<{ x: number; y: number } | null>(null);

  function prev() {
    setIndex((i) => (i === 1 ? TOTAL : i - 1));
  }
  function next() {
    setIndex((i) => (i === TOTAL ? 1 : i + 1));
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseNorm.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }
  function handleEnter() {
    setHovering(true);
  }
  function handleLeave() {
    setHovering(false);
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

      <div role="group" aria-label="Hero 페이지네이션" className="mt-2 flex items-center gap-4">
        <button type="button" className="c-pager-arrow" aria-label="이전" onClick={prev}>
          ←
        </button>
        <span className="c-pager-count" aria-live="polite">
          {index} / {TOTAL}
        </span>
        <button type="button" className="c-pager-arrow" aria-label="다음" onClick={next}>
          →
        </button>
      </div>

      <div
        ref={stageRef}
        className="c-hero-stage"
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="c-hero-stage-inner">
          <CGlyphRing mouseNorm={mouseNorm} />
          <CHeroCenter index={index} onAdvance={next} paused={hovering} />
        </div>
      </div>
    </section>
  );
}
