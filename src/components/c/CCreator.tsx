// 외주 원안 섹션 — Global Creators: 전 세계의 크리에이터와 함께 브랜드의 관계를 구축합니다.
// 카피: Track A CreatorSection 차용. 풀스크린 풍경 배경.
// TODO: 자연 풍경 사진 자산 수령 시 backgroundImage 교체. 현재는 dark olive.

export default function CCreator() {
  return (
    <section
      id="creator"
      aria-labelledby="c-creator-heading"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#2A2F26" }}
    >
      {/* TODO: 풍경 사진 자산 수령 시 next/image fill로 교체 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(8,14,8,0.84) 0%, rgba(4,10,4,0.90) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="c-shell relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
        <p
          className="c-label"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Global Creators
        </p>
        <h2
          id="c-creator-heading"
          className="font-bold"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(2.2rem, 4.6vw, 4.8rem)",
            lineHeight: 1.2,
            wordBreak: "keep-all",
          }}
        >
          전 세계의 크리에이터와
          <br />
          함께 브랜드의 관계를
          <br />
          구축합니다.
        </h2>
        <p
          className="max-w-lg text-[15px] leading-[1.85]"
          style={{
            color: "rgba(255,255,255,0.5)",
            wordBreak: "keep-all",
          }}
        >
          단순 바이럴이 아닙니다. 브랜드의 언어를 이해하는 크리에이터와
          장기적인 관계 구조를 만들어갑니다.
        </p>
      </div>
    </section>
  );
}
