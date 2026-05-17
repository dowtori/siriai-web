// 외주 원안 섹션 — Growth Intelligence: 브랜드의 성장 곡선
// 카피: Track A GrowthSection 차용. 다크 배경 + SVG 성장 곡선.
// 보라(#c4b5fd) → 황금(#C9A86A) 재매핑. SVG path는 Track A 그대로.
// TODO: 외주 원본의 작은 사람 실루엣 자산 수령 시 헤드라인 옆 배치.

export default function CGrowth() {
  return (
    <section
      id="growth"
      aria-labelledby="c-growth-heading"
      className="flex min-h-[80vh] flex-col justify-center overflow-hidden py-[var(--c-section-y)]"
      style={{ backgroundColor: "#1A1916", color: "#FFFFFF" }}
    >
      <div className="c-shell mx-auto flex w-full max-w-6xl flex-col items-center gap-14 md:flex-row md:gap-24">
        {/* Left — text */}
        <div className="flex flex-1 flex-col gap-6">
          <p
            className="c-label"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            — Growth Intelligence
          </p>
          <h2
            id="c-growth-heading"
            className="font-bold"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(1.7rem, 3vw, 3.2rem)",
              lineHeight: 1.25,
              wordBreak: "keep-all",
            }}
          >
            브랜드의 성장 곡선을
            <br />
            더 빠르게, 더 정확하게
            <br />
            설계합니다.
          </h2>
          <p
            className="text-[16px] font-semibold leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.6)", wordBreak: "keep-all" }}
          >
            우리는 자동화하지 않습니다.
            <br />
            판단을 지능화합니다.
          </p>
        </div>

        {/* Right — SVG growth chart */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="w-full max-w-sm">
            <svg viewBox="0 0 320 250" className="h-auto w-full" fill="none">
              {[55, 110, 165].map((y) => (
                <line
                  key={y}
                  x1="36"
                  y1={y}
                  x2="296"
                  y2={y}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              <line x1="36" y1="12" x2="36" y2="210" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
              <line x1="36" y1="210" x2="296" y2="210" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
              {(["Q1", "Q2", "Q3", "Q4"] as const).map((label, i) => (
                <text
                  key={label}
                  x={100 + i * 64}
                  y="226"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.18)"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {label}
                </text>
              ))}
              {/* baseline (market avg) — dashed */}
              <path
                d="M36 202 C80 200, 140 196, 192 188 S252 175, 292 162"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              {/* area fill */}
              <path
                d="M36 202 C84 192,124 172,164 142 S232 82,292 28 L292 210 Z"
                fill="url(#cGrowthArea)"
              />
              {/* main curve */}
              <path
                d="M36 202 C84 192,124 172,164 142 S232 82,292 28"
                stroke="url(#cGrowthLine)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {[[100, 172], [164, 142], [228, 82]].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="rgba(201,168,106,0.6)" />
              ))}
              <circle cx="292" cy="28" r="4" fill="#C9A86A" />
              <defs>
                <linearGradient id="cGrowthLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(201,168,106,0.5)" />
                  <stop offset="100%" stopColor="rgba(201,168,106,0.95)" />
                </linearGradient>
                <linearGradient id="cGrowthArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(201,168,106,0.16)" />
                  <stop offset="100%" stopColor="rgba(201,168,106,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="block h-px w-5" style={{ backgroundColor: "#C9A86A" }} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Siriai 설계
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="block h-0 w-5 border-t border-dashed"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                시장 평균
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
