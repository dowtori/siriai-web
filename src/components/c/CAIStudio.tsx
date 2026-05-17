// 외주 원안 섹션 — AI Creative Studio: AI로 사고하고, 감각으로 표현합니다.
// 카피: Track A AIStudioSection 차용.
// 6개 AI 툴 로고 자산 미수령 → 텍스트 라벨 placeholder.

const TOOLS = ["Sora", "Gemini", "DALL·E 2", "Midjourney", "ChatGPT", "Runway"];
const STATS = [
  { num: "6+", label: "통합 AI 툴", desc: "목적별 최적 조합" },
  { num: "72h", label: "배포 사이클", desc: "캠페인 → 라이브" },
  { num: "100%", label: "브랜드 맞춤", desc: "도구가 아닌 감각" },
];

export default function CAIStudio() {
  return (
    <section
      id="ai-studio"
      aria-labelledby="c-aistudio-heading"
      className="flex min-h-[80vh] flex-col justify-center overflow-hidden py-[var(--c-section-y)]"
    >
      <div className="c-shell mx-auto flex w-full max-w-6xl flex-col gap-5">
        <p className="c-label">AI Creative Studio</p>
        <h2
          id="c-aistudio-heading"
          className="c-headline"
          style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
        >
          AI로 사고하고,
          <br />
          감각으로 표현합니다.
        </h2>
        <p className="c-body max-w-xl">
          최신 AI 툴을 조합하고 운영합니다. 트렌드를 따르는 것이 아니라,
          브랜드의 감각으로 번역합니다.
        </p>
      </div>

      {/* TODO: 6개 AI 툴 로고 자산 수령 시 next/image로 교체. 현재는 텍스트 라벨. */}
      <div
        className="mt-12 flex w-full border-y"
        style={{ borderColor: "var(--c-line)" }}
      >
        <ul className="flex w-full divide-x" style={{ borderColor: "var(--c-line)" }}>
          {TOOLS.map((t) => (
            <li
              key={t}
              className="flex flex-1 items-center justify-center py-5 text-[13px] font-medium"
              style={{
                color: "var(--c-ink-mute)",
                borderColor: "var(--c-line)",
                letterSpacing: "0.02em",
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="c-shell mx-auto mt-14 w-full max-w-6xl">
        <div
          className="grid grid-cols-3 divide-x"
          style={{ borderColor: "var(--c-line)" }}
        >
          {STATS.map((s) => (
            <div
              key={s.num}
              className="flex flex-col gap-1 px-6 first:pl-0 last:pr-0"
              style={{ borderColor: "var(--c-line)" }}
            >
              <span className="text-[26px] font-bold leading-none text-[color:var(--c-ink-soft)]">
                {s.num}
              </span>
              <span className="text-[12px] font-medium text-[color:var(--c-ink-mute)]">
                {s.label}
              </span>
              <span className="text-[11px] text-[color:var(--c-ink-faint)]">
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
