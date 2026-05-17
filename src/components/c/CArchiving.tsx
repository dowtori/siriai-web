// 외주 원안 섹션 — AI for Social Archiving: 우리는 콘텐츠를 저장하지 않습니다.
// 카피: Track A ArchivingSection 차용. 2×3 데이터 카드.
// 외주 톤으로 컬러 재매핑 (보라/형광 → 황금/올리브/뉴트럴).

const CARDS = [
  { label: "콘텐츠 도달", value: "2.4M", sub: "impressions", bar: 78, tag: "Instagram", bg: "#F4EFE2", bar_color: "#C9A86A" },
  { label: "인게이지먼트", value: "9.2%", sub: "avg. rate", bar: 92, tag: "TikTok", bg: "#EBEEE4", bar_color: "#6B7B5A" },
  { label: "크리에이터 ROI", value: "4.7×", sub: "return", bar: 85, tag: "YouTube", bg: "#F5EFDF", bar_color: "#D4A23A" },
  { label: "오디언스 구조", value: "68%", sub: "F · 24–34", bar: 68, tag: "분석됨", bg: "#ECECE5", bar_color: "#8A8478" },
  { label: "채널 성과", value: "A+", sub: "성과 등급", bar: 95, tag: "아카이빙", bg: "#F0E8DC", bar_color: "#A87D52" },
  { label: "신뢰 지수", value: "91", sub: "brand trust", bar: 91, tag: "누적됨", bg: "#EEEFE9", bar_color: "#5F6B57" },
];

export default function CArchiving() {
  return (
    <section
      id="archiving"
      aria-labelledby="c-archiving-heading"
      className="c-shell flex min-h-[80vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
        {/* Left — text */}
        <div className="flex w-full flex-col gap-5 md:w-[40%] md:flex-shrink-0">
          <p className="c-label">AI for Social Archiving</p>
          <h2
            id="c-archiving-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)" }}
          >
            우리는 콘텐츠를
            <br />
            저장하지 않습니다.
            <br />
            가격을 구조화하고,
            <br />
            증거를 남깁니다.
          </h2>
          <p className="c-body">
            캠페인이 끝난 후에도 데이터는 남습니다.
            무엇이 작동했는지, 왜 작동했는지 —
            다음 전략의 기반이 됩니다.
          </p>
        </div>

        {/* Right — 2×3 archive cards */}
        <div className="grid w-full flex-1 grid-cols-3 gap-3">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="flex aspect-square flex-col justify-between rounded-xl p-4"
              style={{ backgroundColor: card.bg }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-[color:var(--c-ink-mute)]">
                  {card.label}
                </span>
                <span className="text-[22px] font-bold leading-none text-[color:var(--c-ink-soft)]">
                  {card.value}
                </span>
                <span className="text-[9px] text-[color:var(--c-ink-mute)]">
                  {card.sub}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-full overflow-hidden rounded-full bg-[color:var(--c-ink-faint)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${card.bar}%`, backgroundColor: card.bar_color }}
                  />
                </div>
                <span
                  className="self-start rounded-full px-1.5 py-0.5 text-[9px] text-[color:var(--c-ink-mute)]"
                  style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
                >
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
