// 외주 원안 섹션 — Services: 브랜드의 성장을 구조로 설계합니다.
// 카피: Track A ServicesSection 차용. 2×2 카드.

const SERVICES = [
  {
    icon: "◈",
    en: "Generative Media Ops",
    ko: "생성형 미디어 운영",
    desc: "AI 기반 콘텐츠 생산 파이프라인을 설계하고 운영합니다. 속도와 일관성을 동시에 확보합니다.",
  },
  {
    icon: "◎",
    en: "Adaptive Targeting",
    ko: "적응형 타겟팅",
    desc: "실시간 오디언스 신호를 분석하고 세그먼트를 자동 최적화합니다. 캠페인이 스스로 정교해집니다.",
  },
  {
    icon: "◇",
    en: "Predictive Funnel",
    ko: "예측 퍼널",
    desc: "전환 경로를 예측하고 이탈 지점에 사전 개입합니다. 데이터가 다음 행동을 먼저 말합니다.",
  },
  {
    icon: "⬡",
    en: "Multi-Agent Campaign Orchestration",
    ko: "멀티 에이전트 캠페인",
    desc: "복수의 AI 에이전트가 채널과 시점을 조율하며 캠페인을 동시 운영합니다.",
  },
];

export default function CServices() {
  return (
    <section
      id="services"
      aria-labelledby="c-services-heading"
      className="c-shell flex min-h-[80vh] flex-col justify-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="c-label">— Services</p>
          <h2
            id="c-services-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.6rem)" }}
          >
            브랜드의 성장을
            <br />
            구조로 설계합니다.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.en}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--c-paper-pure)",
                borderColor: "var(--c-line)",
              }}
            >
              <span
                className="text-[20px] font-light"
                style={{ color: "var(--c-ink-faint)" }}
              >
                {s.icon}
              </span>
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[10px] uppercase"
                  style={{
                    letterSpacing: "0.16em",
                    color: "var(--c-ink-mute)",
                  }}
                >
                  {s.ko}
                </span>
                <h3
                  className="text-[16px] font-bold leading-snug"
                  style={{ color: "var(--c-ink)", wordBreak: "keep-all" }}
                >
                  {s.en}
                </h3>
              </div>
              <p
                className="text-[12px] leading-[1.85]"
                style={{ color: "var(--c-ink-mute)", wordBreak: "keep-all" }}
              >
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
