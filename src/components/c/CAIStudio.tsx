// 외주 원안 섹션 — AI Creative Studio.
// 외주 Figma spec(Frame 2147239200) 픽셀 정밀 재구현.
// Row 1: 좌 큰 H1(36px/700/130%) + 우 [라벨(18px/600)+카피(16px/400)+pager(1/5) 원형 24px 버튼 2개]
// Row 2: 7개 툴 카드 가로 라인(각기 다른 가로 폭, 약 100~112 height), gap 32.
// 자산 수령 대기: 7개 카드 실제 로고/이미지(현재 placeholder 라벨).

type Tool = { name: string; w: number; h: number };

const TOOLS: Tool[] = [
  { name: "Sora",       w: 196.78, h: 107.33 },
  { name: "Gemini",     w: 232.4,  h: 112    },
  { name: "DALL·E 2",   w: 205.33, h: 102.67 },
  { name: "Midjourney", w: 217.47, h: 112    },
  { name: "ChatGPT",    w: 207.2,  h: 107.33 },
  { name: "Runway",     w: 227.73, h: 98.93  },
  { name: "—",          w: 223.53, h: 111.77 }, // 7번째 unknown placeholder
];

export default function CAIStudio() {
  return (
    <section
      id="ai-studio"
      aria-labelledby="c-aistudio-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col"
        style={{ maxWidth: 1280, paddingTop: 40, gap: 40 }}
      >
        {/* Row 1 — Frame 2147239198 : 좌 H1 + 우 [라벨/카피/pager] */}
        <div
          className="flex flex-col items-start md:flex-row md:justify-between"
          style={{ gap: 40, minHeight: 141 }}
        >
          {/* 좌 — H1 */}
          <h2
            id="c-aistudio-heading"
            className="m-0"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.3,
              color: "#000",
              maxWidth: 299,
              wordBreak: "keep-all",
            }}
          >
            AI로 사고하고,
            <br />
            감각으로 표현합니다.
          </h2>

          {/* 우 — Frame 2147239197 (라벨+카피+pager) */}
          <div
            className="flex flex-col items-start"
            style={{ gap: 32, maxWidth: 440 }}
          >
            <div className="flex w-full flex-col items-start" style={{ gap: 16 }}>
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
                AI Creative Studio
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
                기술과 감각을 결합해, 표현의 다음 방식을 설계합니다.
              </p>
            </div>

            {/* Pager — Group 2147221157, 87×24, 두 원형 버튼 + "1 / 5" */}
            <div className="flex flex-row items-center" style={{ gap: 8 }}>
              <button
                type="button"
                aria-label="이전 슬라이드"
                className="c-aistudio-pager-btn"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: 11,
                  lineHeight: 1.4,
                  color: "#161616",
                  minWidth: 21,
                  textAlign: "center",
                }}
              >
                1 / 5
              </span>
              <button
                type="button"
                aria-label="다음 슬라이드"
                className="c-aistudio-pager-btn"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 — Frame 2147239150 : 7 툴 카드 가로 라인 */}
        <div
          className="flex w-full flex-row items-center overflow-x-auto"
          style={{ gap: 32 }}
        >
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-center"
              style={{
                width: t.w,
                height: t.h,
                flex: "0 0 auto",
                backgroundColor: "rgba(10, 10, 10, 0.05)",
                fontFamily: "Pretendard",
                fontWeight: 500,
                fontSize: 18,
                color: "var(--c-ink-mute)",
                letterSpacing: "0.01em",
              }}
            >
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
