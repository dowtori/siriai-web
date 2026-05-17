// 외주 원안 섹션 — Manifesto: 듀얼 다크 인용 (두 카피 강조 블록).
// 외주 Figma spec(Frame 2147239288) 픽셀 정밀 재구현.
// 1280×1600 전체. 두 블록 각 1280×800, padding 128 0, gap 48.
// 카피(48/600 120% #000 text-align center, filter blur(3px)) + Ellipse 9×9 검은 점(blur 4) +
// 사람 실루엣 185×202 (mix-blend darken, filter blur(20)) — placeholder div로 대체.
// 자산 수령 시 실루엣 png 교체.

const BLOCKS = [
  "속도와 정확함만으로는 충분하지 않습니다. 의미와 타이밍이 성과를 결정합니다. 데이터가 방향을 제시하고, AI가 실행을 가속하며, 사람의 감각이 그 모든 것을 하나의 결로 완성합니다.",
  "브랜드의 성장 곡선을 더 짧게, 더 높게, 더 정확하게 설계합니다. 우리는 자동화하지 않습니다. 판단을 지능화합니다.",
];

export default function CManifestoQuote() {
  return (
    <section
      id="manifesto"
      aria-label="Manifesto"
      className="w-full"
      style={{ background: "var(--c-paper)" }}
    >
      {BLOCKS.map((quote, i) => (
        <QuoteBlock key={i} quote={quote} />
      ))}
    </section>
  );
}

function QuoteBlock({ quote }: { quote: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: "100%",
        maxWidth: 1280,
        minHeight: "min(800px, 90vw)",
        padding: "128px 0",
        gap: 48,
        marginInline: "auto",
      }}
    >
      {/* Quote — 48/600 120% blur(3) */}
      <p
        className="m-0 text-center"
        style={{
          fontFamily: "Pretendard",
          fontWeight: 600,
          fontSize: "clamp(24px, 4vw, 48px)",
          lineHeight: 1.2,
          color: "#000",
          maxWidth: 1280,
          paddingInline: "clamp(20px, 5vw, 80px)",
          filter: "blur(3px)",
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

      {/* 사람 실루엣 — 185×202, mix-blend darken + blur(20). blur로 흐려지므로
          단순 SVG 도형(머리 + 어깨 + 몸통)으로 시각 동등 (자체해결). */}
      <svg
        aria-hidden="true"
        width="185"
        height="202"
        viewBox="0 0 185 202"
        style={{
          mixBlendMode: "darken",
          filter: "blur(20px)",
        }}
      >
        {/* 머리 */}
        <ellipse cx="92.5" cy="58" rx="28" ry="34" fill="#000" />
        {/* 목·어깨·몸통 (사다리꼴) */}
        <path
          d="M68 96 L117 96 L138 168 Q92.5 178 47 168 Z"
          fill="#000"
        />
        {/* 발치 그림자 */}
        <ellipse cx="92.5" cy="188" rx="42" ry="9" fill="#000" opacity="0.7" />
      </svg>
    </div>
  );
}
