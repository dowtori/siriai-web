// 외주 원안 섹션 — Growth: 브랜드의 성장 곡선
// 재구현(Track A 차용 폐기): Track A의 다크 + grid + Q1~Q4 라벨 + dashed baseline + dots
//                          모두 제거. 외주 PC.png 톤대로 흰/페이퍼 배경 + 단순 곡선 1줄.
// 자산: 외주의 정확한 곡선 path 확대 캡처 수령 시 d= 교체.

export default function CGrowth() {
  return (
    <section
      id="growth"
      aria-labelledby="c-growth-heading"
      className="c-shell flex min-h-[78vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 md:flex-row md:gap-24">
        {/* Left — text */}
        <div className="flex flex-1 flex-col gap-5">
          <p className="c-label">— Growth</p>
          <h2
            id="c-growth-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
          >
            브랜드의 성장 곡선을
            <br />
            더 빠르게, 더 정확하게
            <br />
            설계합니다.
          </h2>
          <p className="c-body max-w-[36ch]">
            우리는 자동화하지 않습니다. 판단을 지능화합니다.
          </p>
        </div>

        {/* Right — 단순 곡선 1줄 (외주 PC.png 추상 곡선 placeholder) */}
        <div className="flex flex-1 items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 320 180" className="w-full max-w-md" fill="none">
            <path
              d="M16 152 C90 140, 150 110, 200 78 S280 28, 304 14"
              stroke="#C9A86A"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
