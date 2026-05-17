// 외주 원안 섹션 03 — 단순히 만드는 것이 아니라, 관계를 정착하고 의미로 남깁니다.
// 카피: Track A RelationshipIntroSection 차용.
// 좌측 Relationship Index 카드는 Track A의 SVG 구조 차용 (외주 캡처와 형태 유사).

const METRICS = [
  { label: "도달 관계", value: "1.2M", sub: "+18%" },
  { label: "관계 깊이", value: "94.3", sub: "score" },
  { label: "신뢰 자산", value: "3.8년", sub: "avg" },
];

const CAMPAIGNS = [
  { name: "캠페인 #24-09", date: "2024.09", status: "아카이빙", dot: "#C9A86A" },
  { name: "캠페인 #24-12", date: "2024.12", status: "완료", dot: "#6B7B5A" },
  { name: "캠페인 #25-02", date: "2025.02", status: "진행중", dot: "#D4A23A" },
];

export default function CRelationship() {
  return (
    <section
      id="relationship"
      aria-labelledby="c-relationship-heading"
      className="c-shell flex min-h-[80vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Left — Relationship Index card */}
        <div
          className="overflow-hidden rounded-2xl bg-[color:var(--c-paper-pure)]"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}
          aria-hidden="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[color:var(--c-line)] px-6 py-4">
            <div className="flex items-center gap-2">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#C9A86A" }}
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--c-ink-mute)]">
                Relationship Index
              </span>
            </div>
            <span className="font-mono text-[10px] text-[color:var(--c-ink-faint)]">
              2025 Q1
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 divide-x divide-[color:var(--c-line)]">
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col gap-1 px-4 py-4">
                <span className="text-[10px] text-[color:var(--c-ink-mute)]">
                  {m.label}
                </span>
                <span className="text-[17px] font-bold leading-none text-[color:var(--c-ink-soft)]">
                  {m.value}
                </span>
                <span className="text-[10px] text-[color:var(--c-ink-faint)]">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Trend chart */}
          <div className="px-6 py-3">
            <svg viewBox="0 0 280 52" className="w-full" fill="none">
              <path
                d="M0 46 C50 42, 80 34, 120 26 S185 12, 220 7 S260 3, 280 1"
                stroke="url(#cRelLine)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M0 46 C50 42, 80 34, 120 26 S185 12, 220 7 S260 3, 280 1 L280 52 L0 52 Z"
                fill="url(#cRelArea)"
              />
              <defs>
                <linearGradient id="cRelLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8A6F3D" />
                  <stop offset="100%" stopColor="#C9A86A" />
                </linearGradient>
                <linearGradient id="cRelArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(201,168,106,0.13)" />
                  <stop offset="100%" stopColor="rgba(201,168,106,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Campaign list */}
          <div className="border-t border-[color:var(--c-line)]">
            {CAMPAIGNS.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 border-b border-[color:var(--c-line)] px-6 py-3 last:border-0"
              >
                <span
                  className="block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: item.dot }}
                />
                <span className="flex-1 text-[12px] text-[color:var(--c-ink-mute)]">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] text-[color:var(--c-ink-faint)]">
                  {item.date}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] text-[color:var(--c-ink-mute)]"
                  style={{ backgroundColor: "rgba(10,10,10,0.04)" }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
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
