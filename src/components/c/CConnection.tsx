// 외주 원안 섹션 02 — 사람을 이해하고, 세상을 연결하는 AI
// 카피: Track A ConnectionSection 차용.
// 우측 UI mock 자산 미수령 → 카드 placeholder.

export default function CConnection() {
  return (
    <section
      id="connection"
      aria-labelledby="c-connection-heading"
      className="c-shell flex min-h-[80vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Left — text */}
        <div className="flex flex-col gap-5">
          <p className="c-label">— AI Connection</p>
          <h2
            id="c-connection-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
          >
            사람을 이해하고,
            <br />
            세상을 연결하는 AI
          </h2>
          <p className="c-body max-w-[36ch]">
            단순한 자동화가 아닙니다. 관계의 구조를 설계하고,
            브랜드의 언어로 번역합니다.
          </p>
        </div>

        {/* Right — placeholder card stack */}
        <div className="flex flex-col gap-3" aria-hidden="true">
          <div
            className="aspect-[4/3] w-full rounded-2xl bg-[color:var(--c-paper-pure)]"
            style={{ boxShadow: "0 4px 28px rgba(0,0,0,0.07)" }}
          />
          <div
            className="flex items-center gap-4 rounded-2xl bg-[color:var(--c-paper-pure)] p-5"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <div
              className="h-10 w-10 flex-shrink-0 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #C9A86A 0%, #8A6F3D 100%)",
              }}
            />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-2.5 w-28 rounded-full bg-[color:var(--c-ink-faint)]" />
              <div className="h-2 w-20 rounded-full bg-[color:var(--c-line)]" />
            </div>
            <span className="text-[14px] font-semibold text-[color:var(--c-ink-mute)]">
              98.2%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
