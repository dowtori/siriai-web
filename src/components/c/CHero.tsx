"use client";

// 외주 원안 Hero — Frame 2147239201 spec 정밀 재구현.
// 920×1229 컨테이너 안에 헤더(726×245, gap 48) + 검은 920×920 구체.
// 슬라이드 1 = 검은 구체 + 흰 ellipse 16 + 4×4 keyword grid.
// 슬라이드 2~5 = orb 4개 묶음 2×2 grid (Property 1=1~16 자산 활용).
// 인터랙션: 마우스 트래킹 번짐(blob parallax) + 클릭시 슬라이드 전환.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TOTAL = 5;

// Ellipse 138~153 — 외주 spec의 흰 얼룩 16개. 920 좌표계.
type Blob = { w: number; h: number; left: number; top: number; blur: number };
const BLOBS: Blob[] = [
  { w: 533, h: 533, left: -77, top: -77, blur: 6 },   // 147
  { w: 415, h: 415, left: 522, top: -22, blur: 10 },  // 140
  { w: 406, h: 406, left: 167, top: -13, blur: 10 },  // 138
  { w: 364, h: 364, left: 8, top: 366, blur: 10 },    // 148
  { w: 330, h: 330, left: 25, top: 565, blur: 10 },   // 150
  { w: 297, h: 297, left: 221, top: 221, blur: 10 },  // 143
  { w: 282, h: 282, left: 229, top: 409, blur: 0 },   // 149 (no blur)
  { w: 275, h: 275, left: 412, top: 412, blur: 10 },  // 144
  { w: 265, h: 265, left: 237, top: 597, blur: 10 },  // 151
  { w: 249, h: 249, left: 65, top: 245, blur: 0 },    // 146 (no blur)
  { w: 215, h: 215, left: 442, top: 82, blur: 10 },   // 139
  { w: 213, h: 213, left: 623, top: 263, blur: 10 },  // 142
  { w: 165, h: 165, left: 647, top: 646, blur: 10 },  // 153
  { w: 129, h: 129, left: 665, top: 485, blur: 10 },  // 145
  { w: 70, h: 70, left: 515, top: 694, blur: 10 },    // 152
  { w: 43, h: 43, left: 528, top: 348, blur: 10 },    // 141
];

const KEYWORDS_4x4 = [
  "Context", "Signal", "Question", "Edge",
  "Clarity", "Modeling", "Oversight", "Trace",
  "Flow", "Rhythm", "Connection", "Momentum",
  "Evidence", "Benchmark", "Learning", "Compounding",
];

export default function CHero() {
  const [index, setIndex] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const blobsGroupRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const current = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  function prev() {
    setIndex((i) => (i === 1 ? TOTAL : i - 1));
  }
  function next() {
    setIndex((i) => (i === TOTAL ? 1 : i + 1));
  }

  // 마우스 트래킹 번짐 — 16 blob 그룹에 parallax translate(반대 방향, 미세 lerp).
  // 외주 인터랙션 메모: "마우스 트래킹 번짐, 클릭시 이미지로 전환".
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseNorm.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }
  function handleLeave() {
    mouseNorm.current = { x: 0, y: 0 };
  }

  useEffect(() => {
    let raf = 0;
    function loop() {
      const m = mouseNorm.current;
      // lerp 부드러움
      current.current.x += (m.x - current.current.x) * 0.08;
      current.current.y += (m.y - current.current.y) * 0.08;
      const g = blobsGroupRef.current;
      if (g) {
        // 마우스 반대 방향으로 미세 이동 (parallax) — 표면이 번지는 인상
        g.style.transform = `translate(${-current.current.x * 18}px, ${-current.current.y * 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="c-hero-heading"
      className="c-shell flex flex-col items-center"
      style={{ paddingBlock: "144px 64px", gap: 64 }}
    >
      {/* Header group — Frame 2147239177 (726×245) */}
      <div className="flex flex-col items-center" style={{ gap: 48, maxWidth: 726, width: "100%" }}>
        <div className="flex flex-col items-center" style={{ gap: 24, width: "100%" }}>
          <h1
            id="c-hero-heading"
            className="m-0 w-full"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.6vw, 52px)",
              lineHeight: 1.2,
              color: "#000",
              textAlign: "center",
              wordBreak: "keep-all",
            }}
          >
            관계에서 시작해 데이터로 확장하고,
            <br />
            기록으로 증명합니다.
          </h1>
          <p
            className="m-0 w-full"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: 1.4,
              color: "#000",
              textAlign: "center",
            }}
          >
            Creators remembered. Connection, accelerated.
          </p>
        </div>

        {/* Pager — Group 2147221158, 87×24 */}
        <div className="flex flex-row items-center" style={{ gap: 8 }}>
          <button
            type="button"
            aria-label="이전 슬라이드"
            className="c-aistudio-pager-btn"
            onClick={prev}
          >
            <span aria-hidden="true">←</span>
          </button>
          <span
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: 11,
              lineHeight: 1.4,
              color: "#161616",
              minWidth: 21,
              textAlign: "center",
            }}
          >
            {index} / {TOTAL}
          </span>
          <button
            type="button"
            aria-label="다음 슬라이드"
            className="c-aistudio-pager-btn"
            onClick={next}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Stage — 검은 920 구체 + 외부 광택·그림자.
          Frame 2147239247: 1236×518 #1F1F1F opacity 0.6 blur(20) radius 64 (가로 그림자 박스)
          Frame 2147239248: 893×893 #3D3D3D plus-lighter opacity 0.3 blur(50) radius 999 (외각 글로우)
          Frame 2147239258: 768×768 #3D3D3D plus-lighter opacity 0.8 blur(60) radius 999 (내부 글로우) */}
      <div
        ref={stageRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative"
        style={{
          width: "min(920px, 92vw)",
          aspectRatio: "1",
          isolation: "isolate",
        }}
      >
        {/* 외부 그림자 박스 — 1236×518 (가로 더 넓고 세로 짧음) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `${(1236 / 920) * 100}%`,
            height: `${(518 / 920) * 100}%`,
            background: "#1F1F1F",
            opacity: 0.6,
            filter: "blur(20px)",
            borderRadius: 64,
            zIndex: -2,
          }}
        />

        {/* 외각 글로우 — 893×893 plus-lighter blur(50) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `${(893 / 920) * 100}%`,
            height: `${(893 / 920) * 100}%`,
            background: "#3D3D3D",
            mixBlendMode: "plus-lighter",
            opacity: 0.3,
            filter: "blur(50px)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />

        {/* 검은 920 구체 */}
        <div
          className="relative"
          style={{
            width: "100%",
            aspectRatio: "1",
            background: "#000",
            borderRadius: "50%",
            overflow: "hidden",
            isolation: "isolate",
          }}
        >
          {/* 흰 얼룩 16개 — Ellipse 138~153. 마우스 trackk parallax 적용 그룹 */}
          <div
            ref={blobsGroupRef}
            className="absolute"
            style={{ inset: 0, willChange: "transform" }}
            aria-hidden="true"
          >
            {BLOBS.map((b, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  width: `${(b.w / 920) * 100}%`,
                  height: `${(b.h / 920) * 100}%`,
                  left: `${(b.left / 920) * 100}%`,
                  top: `${(b.top / 920) * 100}%`,
                  background: "#DDDBD5",
                  borderRadius: "50%",
                  filter: b.blur > 0 ? `blur(${b.blur}px)` : undefined,
                }}
              />
            ))}
          </div>

          {/* 내부 글로우 — 768×768 plus-lighter blur(60) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: `${(768 / 920) * 100}%`,
              height: `${(768 / 920) * 100}%`,
              background: "#3D3D3D",
              mixBlendMode: "plus-lighter",
              opacity: 0.8,
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          {/* 슬라이드 1 = 4×4 키워드 grid. 슬라이드 2~5 = orb 4개 묶음 2×2 */}
          {index === 1 ? (
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(654px, 71%)",
                height: "min(720px, 78%)",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, 1fr)",
                placeItems: "center",
                zIndex: 2,
              }}
            >
              {KEYWORDS_4x4.map((k) => (
                <span
                  key={k}
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 400,
                    fontSize: "clamp(11px, 1.2vw, 15px)",
                    lineHeight: 1.2,
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
          ) : (
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(720px, 82%)",
                height: "min(720px, 82%)",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "min(16px, 2cqi)",
                placeItems: "center",
                zIndex: 2,
              }}
              aria-label={`Property 슬라이드 ${index}`}
            >
              {Array.from({ length: 4 }, (_, i) => {
                const orbNo = (index - 2) * 4 + i + 1; // slide 2 → 1~4, slide 3 → 5~8, ...
                const padded = String(orbNo).padStart(2, "0");
                return (
                  <div
                    key={orbNo}
                    className="relative"
                    style={{ width: "100%", aspectRatio: "1" }}
                  >
                    <Image
                      src={`/c/assets/orbs/${padded}.png`}
                      alt={KEYWORDS_4x4[orbNo - 1] ?? ""}
                      fill
                      sizes="(max-width: 768px) 30vw, 320px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
