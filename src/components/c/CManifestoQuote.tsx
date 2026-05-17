// 외주 원안 섹션 — Manifesto: 속도와 정확함만으로는 충분하지 않습니다.
// 카피: Track A ManifestoQuoteSection 차용. 다크 배경 + 큰 헤드라인.
// 인터랙션(scroll-linked stagger reveal) 후속, 현재 정적.
// TODO: 외주 원본의 작은 사람 실루엣 자산 수령 시 헤드라인 옆 배치.

export default function CManifestoQuote() {
  return (
    <section
      id="manifesto"
      aria-labelledby="c-manifesto-heading"
      className="relative flex min-h-[80vh] items-center overflow-hidden py-[var(--c-section-y)]"
      style={{ backgroundColor: "#1A1916" }}
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* soft glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[700px] w-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 90%, rgba(201,168,106,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="c-shell relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <h2
          id="c-manifesto-heading"
          className="font-bold leading-[1.15]"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(2.2rem, 5vw, 5.4rem)",
            wordBreak: "keep-all",
          }}
        >
          속도와 정확함만으로는
          <br />
          충분하지 않습니다.
        </h2>
        <p
          className="max-w-2xl text-[15px] leading-[1.9]"
          style={{ color: "rgba(255,255,255,0.5)", wordBreak: "keep-all" }}
        >
          의미와 타이밍이 성과를 결정합니다. 데이터가 방향을 제시하고,
          AI가 실행되어 사람의 감각이 그 모든 것을 하나의 결로 완성합니다.
        </p>
      </div>
    </section>
  );
}
