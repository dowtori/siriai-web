// 외주 원안 섹션 — AI Creative Studio: AI로 사고하고, 감각으로 표현합니다.
// 재구현(Track A 차용 폐기): Track A의 3-stat strip(6+/72h/100%) 제거. 외주 PC.png에 없음.
//                          외주 톤대로 짧은 카피 + 6개 툴 가로 라인만.
// 자산: 6개 AI 툴 로고 수령 시 next/image로 교체. 현재는 텍스트 라벨.

const TOOLS = ["Sora", "Gemini", "DALL·E 2", "Midjourney", "ChatGPT", "Runway"];

export default function CAIStudio() {
  return (
    <section
      id="ai-studio"
      aria-labelledby="c-aistudio-heading"
      className="flex min-h-[68vh] flex-col justify-center overflow-hidden py-[var(--c-section-y)]"
    >
      <div className="c-shell mx-auto flex w-full max-w-6xl flex-col gap-5">
        <p className="c-label">— AI Creative Studio</p>
        <h2
          id="c-aistudio-heading"
          className="c-headline"
          style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
        >
          AI로 사고하고,
          <br />
          감각으로 표현합니다.
        </h2>
        <p className="c-body max-w-[36ch]">
          최신 AI 툴을 조합하고 운영합니다. 트렌드를 따르는 것이 아니라,
          브랜드의 감각으로 번역합니다.
        </p>
      </div>

      {/* 6개 AI 툴 가로 라인 — 자산 수령 시 next/image로 교체 */}
      <div
        className="mt-12 flex w-full border-y"
        style={{ borderColor: "var(--c-line)" }}
      >
        <ul className="flex w-full divide-x" style={{ borderColor: "var(--c-line)" }}>
          {TOOLS.map((t) => (
            <li
              key={t}
              className="flex flex-1 items-center justify-center py-6 text-[13px] font-medium"
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
    </section>
  );
}
