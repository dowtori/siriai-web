"use client";

// Hero — 외주 BX 컨셉(글자 파편이 형태를 이룬다) + 사용자 결정(토성 띠 메타포):
//   주인공 = 글자 ring 3겹 (X축 -22° 기울임, 자동 회전, 마우스 좌우 → 회전 가속)
//   본체   = 중앙 작은 시야 초점 점 (자산 미사용, i→O 로고 모티프 인용)
// H1: "관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다."
// Sub: "Creators remembered. Connection, accelerated."
// Property 1=N orb·pager는 본문 별도 섹션으로 이전 — Hero에서 제거.

import { useRef } from "react";
import CGlyphRing from "./CGlyphRing";

export default function CHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
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
      className="c-shell flex flex-col items-center gap-10 pt-10 pb-16 text-center"
      style={{ minHeight: "var(--c-hero-min-h)" }}
    >
      <h1 id="c-hero-heading" className="c-display max-w-[24ch]">
        관계에서 시작해 데이터로 확장하고,
        <br />
        기록으로 증명합니다.
      </h1>

      <p className="c-meta">Creators remembered. Connection, accelerated.</p>

      <div
        ref={stageRef}
        className="c-hero-stage"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="c-hero-stage-inner">
          <CGlyphRing mouseNorm={mouseNorm} />
          <div className="c-hero-focus" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
