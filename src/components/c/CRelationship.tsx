// 외주 원안 섹션 — Relationship: 단순히 만드는 것이 아니라, 관계를 정착하고 의미로 남깁니다.
// 재구현(Track A 차용 폐기): 복합 카드(헤더·메트릭·SVG 트렌드·캠페인 리스트) 제거,
//                          외주 PC.png 톤대로 좌측 단순 흰 카드 placeholder 1~2개만.
// 자산: 좌측 흰 카드 내용물(외주 Figma 확대 캡처) 수령 시 정밀 일치.

export default function CRelationship() {
  return (
    <section
      id="relationship"
      aria-labelledby="c-relationship-heading"
      className="c-shell flex min-h-[78vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        {/* Left — 외주 흰 카드 placeholder (자산 수령 시 교체) */}
        <div className="flex flex-col gap-4" aria-hidden="true">
          <div
            className="rounded-2xl bg-[color:var(--c-paper-pure)]"
            style={{
              boxShadow: "0 10px 36px rgba(0,0,0,0.06)",
              aspectRatio: "5 / 3",
            }}
          />
          <div
            className="self-end rounded-2xl bg-[color:var(--c-paper-pure)]"
            style={{
              boxShadow: "0 10px 36px rgba(0,0,0,0.06)",
              width: "62%",
              aspectRatio: "5 / 3",
            }}
          />
        </div>

        {/* Right — text */}
        <div className="flex flex-col gap-5">
          <p className="c-label">— Relationship</p>
          <h2
            id="c-relationship-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
          >
            단순히 만드는 것이 아니라,
            <br />
            관계를 정착하고
            <br />
            의미로 남깁니다.
          </h2>
          <p className="c-body max-w-[36ch]">
            콘텐츠는 사라지지만 구조는 남습니다.
            데이터가 축적되고, 신뢰가 자산이 됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
