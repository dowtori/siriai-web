import CWordmark from "./CWordmark";

// 외주 원안 Footer — Frame 2147239292 픽셀 정밀 재구현.
// 1440×1730, 3개 블록:
//   1) Wordmark motion (1440×800, 베이지 그라디언트, 동영상 컴포지션 1_1.mp4
//      mix-blend darken + filter blur(20))
//   2) Banner (1440×600, 풍경 banner.jpg + 검은 40% overlay,
//      "기술은 속도를 만들고..." 52/700 + 부제 18/400)
//   3) Info row (1440×330, #E8E6E0, 회사 정보 + 카피라이트 + nav)

const COMPANY_INFO = [
  "상호: 시리아이 (SIRIAI)",
  "사업자등록번호 : 4052302027",
  "대표자 : 김동현",
  "서울특별시 용산구 한강대로 293,4층 A호 (갈월동,성원빌딩)",
  "대표전화 : 070-7576-1944",
  "통신판매업신고번호 : 제 2024-서울용산 - 1589호",
  "개인정보보호책임자 : 박슬범 (sbsiriai@gmail.com)",
];

export default function CFooter() {
  return (
    <footer id="contact" className="w-full" aria-label="사이트 푸터">
      {/* Block 1 — Wordmark motion. 1440×800. 베이지 그라디언트 + 동영상 blur(20) darken */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "min(800px, 56vw)",
          background:
            "linear-gradient(180deg, rgba(197, 189, 96, 0) 50%, rgba(197, 189, 96, 0.5) 100%), #F5F3F0",
        }}
      >
        <video
          src="/c/assets/footer/wordmark.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            top: "calc(50% + 6vw)",
            width: "112%",
            height: "auto",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            mixBlendMode: "darken",
            filter: "blur(20px)",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Block 2 — Banner with photo + quote. 1440×600 */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "min(600px, 42vw)", minHeight: 360 }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/c/assets/footer/banner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="relative flex h-full w-full flex-col items-center justify-center"
          style={{
            padding: "clamp(60px, 14vw, 191px) clamp(20px, 8vw, 287px)",
            gap: 32,
          }}
        >
          <h2
            className="m-0 w-full"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(28px, 4.6vw, 52px)",
              lineHeight: 1.2,
              color: "#FFFFFF",
              textAlign: "center",
              wordBreak: "keep-all",
              maxWidth: 866,
            }}
          >
            기술은 속도를 만들고,
            <br />
            사람은 의미를 만듭니다.
          </h2>
          <p
            className="m-0 w-full"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.5vw, 18px)",
              lineHeight: 1.2,
              color: "#FFFFFF",
              textAlign: "center",
              wordBreak: "keep-all",
              maxWidth: 866,
              opacity: 0.92,
            }}
          >
            SIRIAI는 그 둘을 연결하고, 그 연결을 시간 속에 기록합니다.
          </p>
        </div>
      </div>

      {/* Block 3 — Info row. 1440×338, padding 64 80 40, #E8E6E0 (spec 갱신) */}
      <div
        className="w-full"
        style={{
          background: "#E8E6E0",
          padding:
            "clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px) clamp(28px, 3vw, 40px)",
        }}
      >
        <div
          className="mx-auto flex flex-col items-start"
          style={{ maxWidth: 1280, gap: 64 }}
        >
          {/* Frame 2147239194 — wordmark + 회사 정보 */}
          <div
            className="flex flex-col items-start"
            style={{ gap: 24, maxWidth: 496 }}
          >
            <CWordmark width={60} />
            <span className="sr-only">Siriai</span>
            <p
              className="m-0"
              style={{
                fontFamily: "Pretendard",
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 1.8,
                color: "rgba(0, 0, 0, 0.7)",
                wordBreak: "keep-all",
              }}
            >
              {COMPANY_INFO.join(" | ")}
            </p>
          </div>

          {/* Frame 2147239192 — copyright + nav */}
          <div
            className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between"
            style={{ minHeight: 38 }}
          >
            <p
              className="m-0"
              style={{
                fontFamily: "Pretendard",
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 1.4,
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              Copyright ⓒ 2025 시리아이(SIRIAI) 공식 홈페이지 All rights reserved.
            </p>
            <nav aria-label="푸터 메뉴">
              <ul className="flex flex-row items-center" style={{ gap: 40 }}>
                <li>
                  <a
                    href="/portfolio"
                    style={{
                      fontFamily: "Pretendard",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: 1.2,
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    포트폴리오
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    style={{
                      fontFamily: "Pretendard",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: 1.2,
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    이용약관
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    style={{
                      fontFamily: "Pretendard",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: 1.2,
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
