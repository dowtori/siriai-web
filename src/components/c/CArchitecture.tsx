// 외주 원안 섹션 — Architecture: 관계, 신뢰, 감각 그리고 AI.
// 외주 Figma spec(Frame 2147239160) 픽셀 정밀 재구현.
// 황금-올리브 그라디언트 라운드(80px) 박스 컨테이너 + 가운데 정렬 헤더 + 2 row 항목 + CTA.
// CTA는 2겹(Frame 2085674449 안쪽: 검은 박스 + filter blur(10px), Frame 2147239162 바깥:
// 또렷한 컨테이너) — ::before로 안쪽 blur 박스 깔고 텍스트는 또렷.

const ROWS = [
  {
    title: "Relationship Architecture",
    desc: "관계가 만들어지는 역동과 호흡을 구조로 만듭니다.",
  },
  {
    title: "Insight Structure",
    desc: "관계와 감각으로 얻은 정보를 이해 가능한 구조로 정리합니다.",
  },
];

export default function CArchitecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="c-arch-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col items-center"
        style={{
          maxWidth: 1280,
          minHeight: 560,
          padding: "64px clamp(24px, 5vw, 160px)",
          gap: 64,
          borderRadius: 80,
          background:
            "linear-gradient(180deg, #EFE6B8 0%, #D4C883 36%, #8B7F4A 78%, #3A361F 100%)",
          isolation: "isolate",
        }}
      >
        {/* Header — Frame 2085674463 */}
        <div
          className="flex w-full flex-col items-center"
          style={{ gap: 16, maxWidth: 593 }}
        >
          <p
            className="m-0 w-full text-center"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.4,
              color: "#000",
            }}
          >
            SIRIAI · しりあい · 아는 사람
          </p>
          <h2
            id="c-arch-heading"
            className="m-0 w-full text-center"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.3,
              color: "#000",
              wordBreak: "keep-all",
            }}
          >
            관계, 신뢰, 감각 그리고 AI.
          </h2>
        </div>

        {/* Rows — Frame 2147239161 (2 row + 닫는 hr) */}
        <div
          className="flex w-full flex-col items-stretch"
          style={{ gap: 24, maxWidth: 960 }}
        >
          {ROWS.map((row) => (
            <div key={row.title} className="flex flex-col" style={{ gap: 24 }}>
              <div
                className="flex flex-row items-center"
                style={{ gap: 80, minHeight: 34 }}
              >
                <h3
                  className="m-0"
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 2vw, 24px)",
                    lineHeight: 1.4,
                    color: "#000",
                    flex: "0 0 auto",
                    width: 400,
                    maxWidth: "50%",
                  }}
                >
                  {row.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: "rgba(0, 0, 0, 0.8)",
                    wordBreak: "keep-all",
                  }}
                >
                  {row.desc}
                </p>
              </div>
              <hr
                aria-hidden="true"
                style={{
                  margin: 0,
                  border: 0,
                  borderTop: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA — 161×50, 검은 박스 + filter blur(10px) 안쪽 ::before, 텍스트는 또렷 */}
        <a href="/contact" className="c-arch-cta">
          시리아이와 함께하기
        </a>
      </div>
    </section>
  );
}
