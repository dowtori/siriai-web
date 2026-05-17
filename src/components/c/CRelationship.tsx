// 외주 원안 섹션 — Relationship.
// Frame 2147239181 spec 정밀 재구현.
// 1280×440 row gap 207. 좌 Frame 2085674461(593×206, H2 573×94 36/700 + 본문 593×88 16/400)
// + 우 Frame 2147239229(440×440 radius 64 #E8E6E0):
//   상단: 검색바 220×32 + Archive 검은 버튼 80×32
//   점선 30px 세로
//   좌상 Performance 카드(157×107 #FFF border) + graph 아이콘 + 라벨
//   좌하 Archive 카드(110.62×86 dark radius 24) + archive 아이콘 + 라벨
//   우 Creative 사진 카드(214×209, federico-beccari unsplash) + 라벨

import Image from "next/image";

export default function CRelationship() {
  return (
    <section
      id="relationship"
      aria-labelledby="c-relationship-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col items-start gap-12 md:flex-row md:items-center md:justify-between"
        style={{ maxWidth: 1280, gap: "clamp(40px, 16vw, 207px)", minHeight: 440 }}
      >
        {/* Left — Frame 2085674461 */}
        <div
          className="flex flex-col items-start"
          style={{ gap: 24, maxWidth: 593, flex: "1 1 593px" }}
        >
          <h2
            id="c-relationship-heading"
            className="m-0"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.3,
              color: "#000",
              maxWidth: 573,
              wordBreak: "keep-all",
            }}
          >
            단순히 만드는 것이 아니라,
            <br />
            관계를 정확히 연결하고 의미로 남깁니다.
          </h2>
          <p
            className="m-0 w-full"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.4,
              color: "#000",
              wordBreak: "keep-all",
            }}
          >
            SIRIAI는 크리에이티브, 퍼포먼스, 아카이빙을 하나의 관계 구조로 통합합니다.
            우리가 남기는 것은 콘텐츠가 아니라, 시간이 지나도 작동하는 영향력입니다.
          </p>
        </div>

        {/* Right — Frame 2147239229 (440×440 radius 64 #E8E6E0) */}
        <div
          className="relative flex-shrink-0"
          style={{
            width: "min(440px, 100%)",
            aspectRatio: "1",
            background: "#E8E6E0",
            borderRadius: 64,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          {/* Group 2147221176 — 312×291.5, 중앙 정렬 */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(312px, 78%)",
              aspectRatio: "312 / 291.5",
            }}
          >
            {/* 검색바 + Archive 버튼 — Frame 2147239241 */}
            <div
              className="absolute flex flex-row items-center"
              style={{ left: 0, top: 0, width: "100%", height: 32, gap: 6 }}
            >
              <div
                className="flex flex-row items-center"
                style={{
                  flex: 1,
                  height: "100%",
                  background: "#F4F4F4",
                  border: "0.5px solid #DFDFDF",
                  borderRadius: 12,
                  padding: "0 10px",
                  gap: 8,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 16l-3 5 5-3M16 8l3-5-5 3M19 16l-5-5M8 8l5 5"
                    stroke="#919191"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    fontSize: 8.5,
                    lineHeight: 1.4,
                    color: "#919191",
                  }}
                >
                  관계의 흐름을 어떻게 구조로 남길까?
                </span>
              </div>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 80,
                  height: 32,
                  background: "#000",
                  borderRadius: 12,
                  flex: "0 0 auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: 1.4,
                    color: "#FFF",
                  }}
                >
                  Archive
                </span>
              </div>
            </div>

            {/* 점선 — 검색바 아래 세로 30px, 가로 가운데 살짝 좌 */}
            <div
              className="absolute"
              style={{
                left: "calc(50% - 15px)",
                top: 43,
                width: 0,
                height: 30,
                borderLeft: "0.5px dashed #000",
              }}
            />

            {/* Performance 카드 — Vector 11136 (157×107 #FFF border) */}
            <div
              className="absolute c-rel-card"
              style={{
                left: 0,
                top: 82,
                width: "50%",
                height: "37%",
                background: "#FFF",
                border: "0.5px solid #DFDFDF",
                borderRadius: 16,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* graph icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19l5-6 4 3 7-9"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="13" r="1.4" fill="#000" />
                <circle cx="13" cy="16" r="1.4" fill="#000" />
                <circle cx="20" cy="7" r="1.4" fill="#000" />
              </svg>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "#000",
                }}
              >
                Performance
              </span>
            </div>

            {/* Archive 카드 — Vector 11138 (110×86 dark radius 24) */}
            <div
              className="absolute c-rel-card"
              style={{
                left: 0,
                top: "75%",
                width: "35%",
                height: "25%",
                background: "linear-gradient(0deg, #1a1c10, #3F4211)",
                borderRadius: 24,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="4" rx="1" stroke="#FFF" strokeWidth="1.5" />
                <path d="M5 8v11h14V8M10 12h4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "#FFF",
                }}
              >
                Archive
              </span>
            </div>

            {/* Creative 사진 카드 — Frame 2147239243 (214×209) */}
            <div
              className="absolute overflow-hidden c-rel-card"
              style={{
                left: "52%",
                top: 82,
                width: "48%",
                height: "72%",
                borderRadius: 16,
              }}
            >
              <Image
                src="/c/assets/relationship/creative.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                style={{ objectFit: "cover" }}
              />
              <div
                className="absolute"
                style={{
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              <span
                className="absolute"
                style={{
                  left: 12,
                  top: 12,
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "#FFF",
                }}
              >
                Creative
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
