// 외주 원안 섹션 — Archiving: 콘텐츠 → 기억의 구조화.
// 외주 Figma spec(Frame 2147239154) 픽셀 정밀 재구현.
// Row 1 (Frame 2085674393): 좌 H1(824×94, 36/700 130%) + 우 라벨/카피(440×107, 18/600 + 16/400).
// Row 2 (Frame 2147239153): 5개 카드 가로(각 236.8×236.8, 라운드 48,
//        상단 작은 라벨 + 큰 카피 텍스트 합성, 카드별 배경 톤·이미지 다름).
// 자산: 오픈소스 카드 이미지(사용자 허용) 수령 시 교체. 현재 컬러 톤·라벨만 정밀.

type Slot = {
  bg: string;           // 단색/그라디언트 background
  small?: string;       // 상단 작은 라벨 (옵션)
  smallPosition?: "top" | "bottom";
  big: string;          // 큰 카피
  bigPosition: "top" | "bottom";
  textColor: string;
};

const SLOTS: Slot[] = [
  {
    bg: "linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), linear-gradient(180deg, #C9C2BC, #4B4845)",
    small: "Vis ideas",
    smallPosition: "top",
    big: "Traces of\ncollective response",
    bigPosition: "bottom",
    textColor: "#FFFFFF",
  },
  {
    bg: "linear-gradient(180deg, #F0EBDC 0%, #E2D4B0 100%)",
    big: "Creator Career\nGraph",
    bigPosition: "top",
    small: "A structured display of creator growth.",
    smallPosition: "bottom",
    textColor: "#1A1A1A",
  },
  {
    bg: "linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), linear-gradient(180deg, #D8D6CE, #6F6962)",
    small: "Brand Memory Layer",
    smallPosition: "top",
    big: "Layered memories\nof brand expressions",
    bigPosition: "bottom",
    textColor: "#FFFFFF",
  },
  {
    bg: "linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), linear-gradient(180deg, #B8BBBE, #3A3D40)",
    big: "Multi-Modal\nInsight Engine",
    bigPosition: "top",
    small: "Saving knowledge as legacy.",
    smallPosition: "bottom",
    textColor: "#FFFFFF",
  },
  {
    bg: "linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), linear-gradient(180deg, #E8704D, #7C2E1F)",
    small: "Real-Time Sync:",
    smallPosition: "top",
    big: "Always\nin sync with reality",
    bigPosition: "bottom",
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
        background: slot.bg,
        overflow: "hidden",
      }}
    >
      {/* 상단 슬롯 */}
      <div className="absolute" style={{ top: 24, left: 24, right: 24 }}>
        {slot.smallPosition === "top" && slot.small && <p style={smallStyle}>{slot.small}</p>}
        {slot.bigPosition === "top" && <p style={bigStyle}>{slot.big}</p>}
      </div>
      {/* 하단 슬롯 */}
      <div className="absolute" style={{ bottom: 24, left: 24, right: 24 }}>
        {slot.bigPosition === "bottom" && <p style={bigStyle}>{slot.big}</p>}
        {slot.smallPosition === "bottom" && slot.small && (
          <p style={{ ...smallStyle, marginTop: 8 }}>{slot.small}</p>
        )}
      </div>
    </div>
  );
}
