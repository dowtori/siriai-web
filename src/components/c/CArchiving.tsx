// 외주 원안 섹션 — Archiving.
// Frame 2147239154 spec 정밀 재구현 + 실 자산 적용.
// 자산: a1(Card1 흑백 몸) / a2(Card3 카메라) / a3(Card4 노트북) / a4(Card5 빨간 모션).
// Card 2(Creator Career Graph)는 사용자가 직접 제작한 차트 — Vector 11145(gradient
// #A7583E→#A79B3E 116×89 radius 16) + Frame 2147239244 3색 라벨 + 본문 텍스트.

import Image from "next/image";

type Slot = {
  variant: "photo" | "graph";
  src?: string;        // photo variant 자산
  bg?: string;         // graph variant 배경
  smallTop?: string;
  bigTop?: string;
  bigBottom?: string;
  smallBottom?: string;
  textColor: string;
};

const SLOTS: Slot[] = [
  {
    variant: "photo",
    src: "/c/assets/archiving/a1.png",
    smallTop: "Vis ideas",
    bigBottom: "Traces of\ncollective response",
    textColor: "#FFFFFF",
  },
  {
    variant: "graph",
    bg: "linear-gradient(180deg, #F0EBDC 0%, #E2D4B0 100%)",
    bigTop: "Creator Career\nGraph",
    smallBottom: "A structured display of creator growth.",
    textColor: "#1A1A1A",
  },
  {
    variant: "photo",
    src: "/c/assets/archiving/a2.png",
    smallTop: "Brand Memory Layer",
    bigBottom: "Layered memories\nof brand expressions",
    textColor: "#FFFFFF",
  },
  {
    variant: "photo",
    src: "/c/assets/archiving/a3.png",
    bigTop: "Multi-Modal\nInsight Engine",
    smallBottom: "Saving knowledge as legacy.",
    textColor: "#FFFFFF",
  },
  {
    variant: "photo",
    src: "/c/assets/archiving/a4.png",
    smallTop: "Real-Time Sync:",
    bigBottom: "Always\nin sync with reality",
    textColor: "#FFFFFF",
  },
];

export default function CArchiving() {
  return (
    <section
      id="archiving"
      aria-labelledby="c-archiving-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col items-start"
        style={{ maxWidth: 1280, gap: 64 }}
      >
        {/* Row 1 — Frame 2085674393 */}
        <div
          className="flex w-full flex-col items-start gap-10 md:flex-row md:justify-center md:gap-4"
          style={{ minHeight: 107 }}
        >
          <h2
            id="c-archiving-heading"
            className="m-0"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.3,
              color: "#000",
              flex: "1 1 824px",
              maxWidth: 824,
              wordBreak: "keep-all",
            }}
          >
            우리는 콘텐츠를 저장하지 않습니다.
            <br />
            기억을 구조화하고, 증거를 남깁니다.
          </h2>
          <div
            className="flex flex-col items-start"
            style={{ gap: 16, maxWidth: 440, flex: "0 0 auto" }}
          >
            <p
              className="m-0 w-full"
              style={{
                fontFamily: "Pretendard",
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.4,
                color: "#161616",
              }}
            >
              AI for Social Archiving
            </p>
            <p
              className="m-0 w-full"
              style={{
                fontFamily: "Pretendard",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.4,
                color: "#161616",
                wordBreak: "keep-all",
              }}
            >
              앞이 흐릿했어서 살았어도 모든 순간을 데이터와 시각의 맥락 속에서
              기억과 증거로 구조합니다.
            </p>
          </div>
        </div>

        {/* Row 2 — Frame 2147239153 : 5 카드 */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {SLOTS.map((s, i) => (
            <ArchiveCard key={i} slot={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({ slot }: { slot: Slot }) {
  const smallStyle: React.CSSProperties = {
    fontFamily: "Helvetica Neue, system-ui, sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: slot.textColor,
    margin: 0,
    opacity: 0.92,
  };
  const bigStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontWeight: 400,
    fontSize: "clamp(16px, 1.6vw, 20px)",
    lineHeight: 1.2,
    color: slot.textColor,
    margin: 0,
    whiteSpace: "pre-line",
  };

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "1",
        borderRadius: 48,
        overflow: "hidden",
        background: slot.variant === "graph" ? slot.bg : undefined,
      }}
    >
      {/* Photo variant: 자산 + dark overlay */}
      {slot.variant === "photo" && slot.src && (
        <>
          <Image
            src={slot.src}
            alt=""
            fill
            sizes="(max-width: 1280px) 20vw, 240px"
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Graph variant: 직접 제작 차트 (Card 2 Creator Career Graph) */}
      {slot.variant === "graph" && <GraphVisual />}

      {/* 상단 슬롯 */}
      <div className="absolute" style={{ top: 24, left: 24, right: 24, zIndex: 2 }}>
        {slot.smallTop && <p style={smallStyle}>{slot.smallTop}</p>}
        {slot.bigTop && <p style={bigStyle}>{slot.bigTop}</p>}
      </div>
      {/* 하단 슬롯 */}
      <div className="absolute" style={{ bottom: 24, left: 24, right: 24, zIndex: 2 }}>
        {slot.bigBottom && <p style={bigStyle}>{slot.bigBottom}</p>}
        {slot.smallBottom && (
          <p style={{ ...smallStyle, marginTop: 8 }}>{slot.smallBottom}</p>
        )}
      </div>
    </div>
  );
}

/* Card 2 Creator Career Graph — 직접 제작.
   spec: Vector 11145(gradient #A7583E→#A79B3E 116×89 radius 16) +
         Frame 2147239244 3색 라벨 + Rectangle 1532578676(145×142 #C3C3C3 placeholder bg) */
function GraphVisual() {
  return (
    <div
      className="absolute"
      aria-hidden="true"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100% - 48px)",
        maxWidth: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Vector 11145 — gradient 차트 박스 */}
      <div
        style={{
          width: "100%",
          aspectRatio: "116 / 89",
          maxWidth: 160,
          background: "linear-gradient(90deg, #A7583E 0%, #A79B3E 100%)",
          borderRadius: 16,
          position: "relative",
        }}
      >
        {/* 차트 곡선 (성장 표현) */}
        <svg
          viewBox="0 0 116 89"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          fill="none"
        >
          <path
            d="M8 70 C24 64, 36 50, 50 40 S82 18, 108 10"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="50" cy="40" r="2.5" fill="#FFFFFF" />
          <circle cx="108" cy="10" r="3" fill="#FFFFFF" />
        </svg>
      </div>
      {/* Frame 2147239244 — 3색 카테고리 라벨 */}
      <div
        className="flex flex-row items-center"
        style={{ gap: 14, marginTop: 4 }}
      >
        <span style={{ fontFamily: "Helvetica Neue, system-ui, sans-serif", fontSize: 8, fontWeight: 400, color: "#A7583E" }}>
          Reach
        </span>
        <span style={{ fontFamily: "Helvetica Neue, system-ui, sans-serif", fontSize: 8, fontWeight: 400, color: "#68892C" }}>
          Depth
        </span>
        <span style={{ fontFamily: "Helvetica Neue, system-ui, sans-serif", fontSize: 8, fontWeight: 400, color: "#4796A4" }}>
          Trust
        </span>
      </div>
    </div>
  );
}
