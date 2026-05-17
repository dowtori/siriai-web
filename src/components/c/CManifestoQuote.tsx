// 외주 원안 섹션 — Manifesto: 듀얼 다크 인용 (두 카피 강조 블록).
// 외주 Figma spec(Frame 2147239288) 픽셀 정밀 재구현.
// 1280×1600 전체. 두 블록 각 1280×800, padding 128 0, gap 48.
// 카피(48/600 120% #000 text-align center, filter blur(3px)) + Ellipse 9×9 검은 점(blur 4) +
// 사람 실루엣 185×202 (mix-blend darken, filter blur(20)) — placeholder div로 대체.
// 자산 수령 시 실루엣 png 교체.

const BLOCKS: Array<{ quote: string; gap: number }> = [
  {
    quote:
      "속도와 정확함만으로는 충분하지 않습니다. 의미와 타이밍이 성과를 결정합니다. 데이터가 방향을 제시하고, AI가 실행을 가속하며, 사람의 감각이 그 모든 것을 하나의 결로 완성합니다.",
    gap: 40,
  },
  {
    quote:
      "브랜드의 성장 곡선을 더 짧게, 더 높게, 더 정확하게 설계합니다. 우리는 자동화하지 않습니다. 판단을 지능화합니다.",
    gap: 24,
  },
];

export default function CManifestoQuote() {
  return (
    <section
      id="manifesto"
      aria-label="Manifesto"
      className="w-full"
      style={{ background: "var(--c-paper)" }}
    >
      {BLOCKS.map((b, i) => (
        <QuoteBlock key={i} quote={b.quote} gap={b.gap} />
      ))}
    </section>
  );
}

function QuoteBlock({ quote, gap }: { quote: string; gap: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: "100%",
        maxWidth: 1280,
        minHeight: "min(800px, 90vw)",
        padding: "128px 0",
        gap,
        marginInline: "auto",
      }}
    >
      {/* Quote — 또렷한 검정 카피(캡처 정합: blur 제거). */}
      <p
        className="m-0 text-center"
        style={{
          fontFamily: "Pretendard",
          fontWeight: 600,
          fontSize: "clamp(20px, 3.4vw, 40px)",
          lineHeight: 1.35,
          color: "#000",
          maxWidth: 720,
          paddingInline: "clamp(20px, 5vw, 80px)",
          wordBreak: "keep-all",
        }}
      >
        {quote}
      </p>

      {/* Ellipse 277 — 9×9 #000 blur(4) */}
      <span
        aria-hidden="true"
        style={{
          display: "block",
          width: 9,
          height: 9,
          background: "#000",
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />

      {/* 사람 실루엣 — 캡처 정합: 작고 길쭉한 호리병.
          머리(작은 점) + 몸통(아래 작은 둥근 부분). blur(20). */}
      <svg
        aria-hidden="true"
        width="120"
        height="180"
        viewBox="0 0 120 180"
        style={{
          mixBlendMode: "darken",
          filter: "blur(20px)",
        }}
      >
        {/* 머리 — 매우 작은 동그란 점 */}
        <ellipse cx="60" cy="48" rx="13" ry="16" fill="#000" />
        {/* 몸통 — 작은 둥근 형태(호리병의 아래 배). */}
        <ellipse cx="60" cy="118" rx="28" ry="40" fill="#000" />
      </svg>
    </div>
  );
}
