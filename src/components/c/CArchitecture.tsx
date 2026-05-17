// 외주 원안 섹션 04 — 관계, 신뢰, 감각 그리고 AI.
// 카피: Track A ArchitectureSection 차용. dark olive 배경 + 2 col + CTA.

const COLS = [
  {
    en: "Relationship Architecture",
    ko: "관계 설계",
    desc: "브랜드와 오디언스 사이의 신호를 구조화합니다. 콘텐츠가 아닌 연결을 설계하고, 접점마다 의도를 심습니다.",
  },
  {
    en: "Insight Structure",
    ko: "인사이트 구조",
    desc: "데이터를 수집하는 것이 아니라 읽는 방법을 설계합니다. 숫자 너머의 맥락을 판단 가능한 언어로 번역합니다.",
  },
];

export default function CArchitecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="c-architecture-heading"
      className="py-[var(--c-section-y)]"
      style={{ backgroundColor: "#3D3B2A", color: "#FFFFFF" }}
    >
      <div className="c-shell mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p
            className="c-label"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            — Structure
          </p>
          <h2
            id="c-architecture-heading"
            className="c-headline"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(1.9rem, 3.6vw, 3.4rem)",
              lineHeight: 1.2,
            }}
          >
            관계, 신뢰, 감각
            <br />
            그리고 AI.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-2"
          style={{ borderColor: "rgba(255,255,255,0.07)", gap: "1px" }}
        >
          {COLS.map((col) => (
            <div
              key={col.en}
              className="flex flex-col gap-4 border p-8 md:p-10"
              style={{
                backgroundColor: "#3D3B2A",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="text-[11px] font-medium uppercase"
                style={{
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {col.ko}
              </span>
              <h3
                className="text-[20px] font-bold leading-snug md:text-[24px]"
                style={{ color: "#FFFFFF", wordBreak: "keep-all" }}
              >
                {col.en}
              </h3>
              <p
                className="text-[13px] leading-[1.85]"
                style={{ color: "rgba(255,255,255,0.55)", wordBreak: "keep-all" }}
              >
                {col.desc}
              </p>
            </div>
          ))}
        </div>

        <div>
          <a
            href="#contact"
            className="inline-block rounded-full bg-white px-8 py-4 text-[13px] font-semibold transition-colors duration-200 hover:bg-white/90"
            style={{
              color: "#3D3B2A",
              letterSpacing: "0.06em",
            }}
          >
            문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
