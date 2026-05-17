// 외주 원안 섹션 — Connection.
// Frame 2147239180 spec 정밀 재구현.
// 1280×440 row, gap 207. 좌 Frame 2147239163(593×184, H2 270×94 36/700 + 카피 593×66 16/400)
// + 우 Frame 2147239228(440×440 라운드 64 #E8E6E0 박스, 두 흰 카드 + 가운데 Siriai pill 연결).
// 자산: c3(첫 카드 아바타 작은), c2(둘째 카드 아바타 사람), c1(둘째 카드 사진 큰).

import Image from "next/image";

export default function CConnection() {
  return (
    <section
      id="connection"
      aria-labelledby="c-connection-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col items-start gap-12 md:flex-row md:items-center md:justify-between"
        style={{ maxWidth: 1280, gap: "clamp(40px, 16vw, 207px)", minHeight: 440 }}
      >
        {/* Left — Frame 2147239163 */}
        <div
          className="flex flex-col items-start"
          style={{ gap: 24, maxWidth: 593, flex: "1 1 593px" }}
        >
          <h2
            id="c-connection-heading"
            className="m-0"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.3,
              color: "#000",
              maxWidth: 270,
              wordBreak: "keep-all",
            }}
          >
            사람을 이해하고, 세상을 연결하는 AI
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
            SIRIAI는 사람의 통찰과 AI의 속도를 결합해 브랜드와 크리에이터 사이의 관계를
            이해하고, 의미 있는 연결로 설계합니다.
          </p>
        </div>

        {/* Right — Frame 2147239228 (440×440, #E8E6E0, radius 64) */}
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
          {/* Frame 2147239239 — 카드 스택 320×307, 중앙 배치 */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(312px, 78%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            {/* Card 1 — 312×68, padding 16, radius 24, #FFF */}
            <div
              style={{
                width: "100%",
                padding: 16,
                background: "#FFFFFF",
                borderRadius: 24,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  flex: "0 0 auto",
                  background: "#F4F4F4",
                  border: "0.5px solid #DFDFDF",
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image src="/c/assets/connection/c3.png" alt="" fill sizes="28px" style={{ objectFit: "cover" }} />
              </div>
              <p
                className="m-0"
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 600,
                  fontSize: 8.5,
                  lineHeight: 1.4,
                  color: "#000",
                  flex: 1,
                }}
              >
                브랜드는 사람을 이해하고 싶어합니다.
                <br />
                누구와 연결해야 하고,
                <br />
                어떤 감각이 신뢰로 이어지는지 알고 싶어합니다.
              </p>
            </div>

            {/* 점선 (위) — 길이 16, 회전 90deg = 세로 16 */}
            <div
              style={{
                width: 0,
                height: 16,
                borderLeft: "0.5px dashed #000",
              }}
            />

            {/* Siriai pill — 80×28 #000 radius 12 */}
            <div
              style={{
                width: 80,
                height: 28,
                background: "#000",
                borderRadius: 12,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Pretendard",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 11,
                color: "#FFF",
              }}
            >
              Siriai
            </div>

            {/* 점선 (아래) */}
            <div
              style={{
                width: 0,
                height: 16,
                borderLeft: "0.5px dashed #000",
              }}
            />

            {/* Card 2 — 312×155, padding 16, radius 24, #FFF + shadow */}
            <div
              style={{
                width: "100%",
                padding: 16,
                background: "#FFFFFF",
                borderRadius: 24,
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    flex: "0 0 auto",
                    background: "#E6E6E6",
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image src="/c/assets/connection/c2.png" alt="" fill sizes="28px" style={{ objectFit: "cover" }} />
                </div>
                <p
                  className="m-0"
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 600,
                    fontSize: 8.5,
                    lineHeight: 1.4,
                    color: "#000",
                    flex: 1,
                  }}
                >
                  인플루언서는 감각으로 반응합니다.
                  <br />
                  사람이 느끼는 방식으로 콘텐츠를 만들고,
                  <br />
                  그 반응은 자연스럽게 관계가 됩니다.
                </p>
              </div>

              {/* Group 2147221174 — 280×71 사진 + share 박스 */}
              <div
                style={{
                  width: "100%",
                  height: 71,
                  display: "flex",
                  flexDirection: "row",
                  gap: 0,
                }}
              >
                {/* Vector 11133 — 237.5×71 사진 */}
                <div
                  style={{
                    width: "75%",
                    height: "100%",
                    position: "relative",
                    background: "#D9D9D9",
                    borderRadius: "8px 0 0 8px",
                    overflow: "hidden",
                  }}
                >
                  <Image src="/c/assets/connection/c1.png" alt="" fill sizes="200px" style={{ objectFit: "cover" }} />
                </div>
                {/* Vector 11132 — 81×70.5 share 박스 */}
                <div
                  style={{
                    width: "25%",
                    height: "100%",
                    background: "#F4F4F4",
                    border: "0.5px solid #DFDFDF",
                    borderRadius: "0 8px 8px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="18" cy="5" r="3" stroke="#000" strokeWidth="1.5" />
                    <circle cx="6" cy="12" r="3" stroke="#000" strokeWidth="1.5" />
                    <circle cx="18" cy="19" r="3" stroke="#000" strokeWidth="1.5" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
