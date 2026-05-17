"use client";

// 외주 원안 Hero — Frame 2147239201 spec 정밀 재구현.
// 기본(idle) = 검은 920 구체 + 흰 ellipse 16 + 4×4 키워드 grid + 마우스 트래킹 번짐.
// 키워드 클릭/페이저 → keyword 모드: 검은 구체 유지 + ellipse blob 컬러 변형 +
// 가운데 키워드(Times italic) + 한국어 카피. 페이저 "n / 16".
// 자동 슬라이드는 폐기 — 사용자 의도(트래킹 번짐 + 클릭 인터랙션 기획).

import { useEffect, useRef, useState } from "react";

type Blob = { w: number; h: number; left: number; top: number; blur: number };
const BLOBS: Blob[] = [
  { w: 533, h: 533, left: -77, top: -77, blur: 6 },
  { w: 415, h: 415, left: 522, top: -22, blur: 10 },
  { w: 406, h: 406, left: 167, top: -13, blur: 10 },
  { w: 364, h: 364, left: 8, top: 366, blur: 10 },
  { w: 330, h: 330, left: 25, top: 565, blur: 10 },
  { w: 297, h: 297, left: 221, top: 221, blur: 10 },
  { w: 282, h: 282, left: 229, top: 409, blur: 0 },
  { w: 275, h: 275, left: 412, top: 412, blur: 10 },
  { w: 265, h: 265, left: 237, top: 597, blur: 10 },
  { w: 249, h: 249, left: 65, top: 245, blur: 0 },
  { w: 215, h: 215, left: 442, top: 82, blur: 10 },
  { w: 213, h: 213, left: 623, top: 263, blur: 10 },
  { w: 165, h: 165, left: 647, top: 646, blur: 10 },
  { w: 129, h: 129, left: 665, top: 485, blur: 10 },
  { w: 70, h: 70, left: 515, top: 694, blur: 10 },
  { w: 43, h: 43, left: 528, top: 348, blur: 10 },
];

const KEYWORDS_4x4 = [
  "Context", "Signal", "Question", "Edge",
  "Clarity", "Modeling", "Oversight", "Trace",
  "Flow", "Rhythm", "Connection", "Momentum",
  "Evidence", "Benchmark", "Learning", "Compounding",
];

// 16 키워드 1:1 한국어 카피 — brand voice("선언적·간결·구조").
const SLIDE_CONTENTS: { keyword: string; copy: string }[] = [
  { keyword: "Context",     copy: "우리는 데이터를 보기 전에 상황을 묻습니다. 지표는 결과일 뿐, 원인은 항상 맥락에 있습니다." },
  { keyword: "Signal",      copy: "노이즈 속에서 의미 있는 변화를 분리합니다. 행동을 바꾸지 못하는 데이터는 결과가 아니라 잡음입니다." },
  { keyword: "Question",    copy: "더 나은 답은 더 나은 질문에서 시작됩니다. 답을 찾기 전에 질문의 구조를 다시 설계합니다." },
  { keyword: "Edge",        copy: "평균이 아닌 가장자리에서 기회가 만들어집니다. 차이는 데이터의 양이 아니라 해석의 각도에서 옵니다." },
  { keyword: "Clarity",     copy: "복잡함을 그대로 두지 않습니다. 같은 데이터를 누가 봐도 같은 판단으로 이어지게 정리합니다." },
  { keyword: "Modeling",    copy: "현상을 설명하는 데서 멈추지 않습니다. 다음에 일어날 일을 예측할 수 있는 구조로 옮겨 둡니다." },
  { keyword: "Oversight",   copy: "자동화의 끝에서도 사람이 결정합니다. AI의 판단을 검증하는 마지막 한 칸은 우리가 채웁니다." },
  { keyword: "Trace",       copy: "결과의 자취가 아니라 결정의 자취를 남깁니다. 왜 그렇게 판단했는지가 다음 판단을 더 정확하게 만듭니다." },
  { keyword: "Flow",        copy: "단발의 실행이 아니라 이어지는 흐름을 설계합니다. 하나의 행동이 다음 행동의 근거가 됩니다." },
  { keyword: "Rhythm",      copy: "성과는 빈도가 아니라 박자에서 옵니다. 하지 않을 일을 정해야 비로소 할 일이 또렷해집니다." },
  { keyword: "Connection",  copy: "관계는 우연이 아니라 구조의 결과입니다. 사람과 데이터 사이에 비어 있던 연결을 다시 잇습니다." },
  { keyword: "Momentum",    copy: "한 번의 성과가 다음 성과를 만들도록 설계합니다. 모멘텀은 우연의 누적이 아니라 의도의 누적입니다." },
  { keyword: "Evidence",    copy: "주장 대신 증거로 말합니다. 시간이 지나도 흔들리지 않는 판단은 흔적이 명확한 판단입니다." },
  { keyword: "Benchmark",   copy: "비교의 기준을 외부가 아닌 우리 안에 세웁니다. 어제의 우리가 가장 정확한 기준선입니다." },
  { keyword: "Learning",    copy: "실행은 학습의 재료입니다. 한 번의 캠페인이 다음 캠페인의 가설이 되도록 데이터를 다시 살립니다." },
  { keyword: "Compounding", copy: "AI 운영은 시간이 가산이 아니라 곱셈이 되는 구조입니다. 오늘 정리한 한 줄이 내일의 판단을 가속합니다." },
];

const TOTAL = 16;

// 키워드별 blob 컬러 팔레트 — 4 사이클 round-robin.
// idle은 단색(#DDDBD5). 액션 시 키워드 컬러로 부드럽게 전환.
const COLOR_CYCLE: string[][] = [
  ["#DDDBD5", "#DDDBD5", "#C5BD60", "#DDDBD5", "#E2D4B0"],
  ["#DDDBD5", "#A7583E", "#DDDBD5", "#C5BD60", "#DDDBD5"],
  ["#DDDBD5", "#DDDBD5", "#5E8867", "#A79B3E", "#DDDBD5"],
  ["#DDDBD5", "#4796A4", "#DDDBD5", "#A7583E", "#DDDBD5"],
];
const IDLE_PALETTE = ["#DDDBD5"];

function paletteFor(keywordIdx: number): string[] {
  return COLOR_CYCLE[keywordIdx % COLOR_CYCLE.length];
}

export default function CHero() {
  const [isIdle, setIsIdle] = useState(true);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const blobsGroupRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const current = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  function gotoKeyword(i: number) {
    setIsIdle(false);
    setKeywordIndex(((i % TOTAL) + TOTAL) % TOTAL);
  }
  function prev() {
    if (isIdle) gotoKeyword(TOTAL - 1);
    else gotoKeyword(keywordIndex - 1);
  }
  function next() {
    if (isIdle) gotoKeyword(0);
    else gotoKeyword(keywordIndex + 1);
  }

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
    setHoveredKeyword(null);
  }

  // 호버 키워드 인덱스(0~15) or -1
  const hoveredIdx = hoveredKeyword ? KEYWORDS_4x4.indexOf(hoveredKeyword) : -1;

  // 현재 blob 팔레트:
  //   - idle + 호버 없음 → 단색 흰베이지
  //   - idle + 호버 → 호버 키워드 팔레트로 미리보기
  //   - keyword 모드 → 현재 키워드 팔레트
  const activePalette = isIdle
    ? hoveredIdx >= 0
      ? paletteFor(hoveredIdx)
      : IDLE_PALETTE
    : paletteFor(keywordIndex);

  // 현재 표시 키워드/카피
  const displayed = isIdle ? null : SLIDE_CONTENTS[keywordIndex];

  // 페이저 표기 — idle 시작은 "1 / 16"
  const pagerNum = isIdle ? 1 : keywordIndex + 1;

  useEffect(() => {
    let raf = 0;
    function loop() {
      const m = mouseNorm.current;
      current.current.x += (m.x - current.current.x) * 0.08;
      current.current.y += (m.y - current.current.y) * 0.08;
      const g = blobsGroupRef.current;
      if (g) {
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
      {/* Header — Frame 2147239177 (726×245) */}
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

        {/* Pager — Group 2147221158, 87×24. 표기 "n / 16". */}
        <div className="flex flex-row items-center" style={{ gap: 8 }}>
          <button
            type="button"
            aria-label="이전 키워드"
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
              minWidth: 36,
              textAlign: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {pagerNum} / {TOTAL}
          </span>
          <button
            type="button"
            aria-label="다음 키워드"
            className="c-aistudio-pager-btn"
            onClick={next}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Stage — 검은 920 구체 + 외부 부드러운 그림자/광택. */}
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
        {/* 가로 그림자 — radial-gradient 타원 */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-4%",
            transform: "translateX(-50%)",
            width: "118%",
            height: "32%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(31,31,31,0.55) 0%, rgba(31,31,31,0.20) 45%, rgba(31,31,31,0) 75%)",
            filter: "blur(40px)",
            zIndex: -2,
            pointerEvents: "none",
          }}
        />
        {/* 외각 후광 */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "104%",
            height: "104%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(80,80,80,0.32) 0%, rgba(80,80,80,0.10) 50%, rgba(80,80,80,0) 75%)",
            filter: "blur(36px)",
            borderRadius: "50%",
            zIndex: -1,
            pointerEvents: "none",
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
          {/* 흰/컬러 ellipse blob 16 — 마우스 parallax */}
          <div
            ref={blobsGroupRef}
            className="absolute"
            style={{ inset: 0, willChange: "transform" }}
            aria-hidden="true"
          >
            {BLOBS.map((b, i) => {
              const color = activePalette[i % activePalette.length];
              return (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    width: `${(b.w / 920) * 100}%`,
                    height: `${(b.h / 920) * 100}%`,
                    left: `${(b.left / 920) * 100}%`,
                    top: `${(b.top / 920) * 100}%`,
                    background: color,
                    borderRadius: "50%",
                    filter: b.blur > 0 ? `blur(${b.blur}px)` : undefined,
                    transition: "background 720ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              );
            })}
          </div>

          {/* 내부 글로우 */}
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

          {/* idle → 4×4 키워드 grid. keyword → 단일 키워드 + 카피. */}
          {isIdle ? (
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
              {KEYWORDS_4x4.map((k, i) => {
                const isActive = hoveredKeyword === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onMouseEnter={() => setHoveredKeyword(k)}
                    onMouseLeave={() =>
                      setHoveredKeyword((curr) => (curr === k ? null : curr))
                    }
                    onClick={() => gotoKeyword(i)}
                    aria-label={`${k} — 카피 보기`}
                    style={{
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      fontFamily: "Pretendard",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "clamp(11px, 1.2vw, 15px)",
                      lineHeight: 1.2,
                      color: isActive ? "#A7583E" : "#000",
                      letterSpacing: isActive ? "0.02em" : 0,
                      cursor: "pointer",
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                      transition: "all 260ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsIdle(true)}
              aria-label="키워드 grid로 돌아가기"
              className="absolute flex flex-col items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(600px, 76%)",
                gap: 28,
                zIndex: 2,
                textAlign: "center",
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.1,
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
              >
                {displayed?.keyword}
              </span>
              <p
                className="m-0"
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 1.4vw, 17px)",
                  lineHeight: 1.55,
                  color: "#000",
                  wordBreak: "keep-all",
                  maxWidth: 480,
                }}
              >
                {displayed?.copy}
              </p>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
