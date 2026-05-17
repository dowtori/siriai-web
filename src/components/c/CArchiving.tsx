// 외주 원안 섹션 — AI for Social Archiving: 콘텐츠 → 데이터.
// 재구현(Track A 차용 폐기): Track A의 2×3 컬러 메트릭 카드(메트릭+bar+태그) 제거.
//                          외주 PC.png 톤대로 사진 그리드 4~6장 placeholder.
// 자산: 외주 Figma의 실제 사진 4~6장 수령 시 next/image로 교체.

const PHOTO_SLOTS = 6;

export default function CArchiving() {
  return (
    <section
      id="archiving"
      aria-labelledby="c-archiving-heading"
      className="c-shell flex min-h-[78vh] items-center py-[var(--c-section-y)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-start md:gap-20">
        {/* Left — text */}
        <div className="flex w-full flex-col gap-5 md:w-[38%] md:flex-shrink-0">
          <p className="c-label">— AI for Social Archiving</p>
          <h2
            id="c-archiving-heading"
            className="c-headline"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)" }}
          >
            우리는 콘텐츠를
            <br />
            저장하지 않습니다.
            <br />
            가치를 구조화하고,
            <br />
            증거를 남깁니다.
          </h2>
          <p className="c-body max-w-[34ch]">
            캠페인이 끝난 후에도 데이터는 남습니다.
            무엇이 작동했는지, 왜 작동했는지 — 다음 전략의 기반이 됩니다.
          </p>
        </div>

        {/* Right — 사진 그리드 placeholder (자산 수령 시 next/image로 교체) */}
        <div className="grid w-full flex-1 grid-cols-3 gap-3" aria-hidden="true">
          {Array.from({ length: PHOTO_SLOTS }, (_, i) => (
            <div
              key={i}
              className="rounded-lg"
              style={{
                aspectRatio: "1",
                backgroundColor: "rgba(10, 10, 10, 0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
