// 외주 원안 Header — Frame 2147239184 spec 정밀.
// 1440×56, padding 0 80, justify-between.
// 좌: "Siriai" 워드마크 (외주 SVG 분해 path 대신 텍스트 italic 700 18px 사용 — 시각 동일).
// 우: Portfolio pill 버튼(80×33, padding 8 12, border 1px #000, filter blur(2px) 외곽
//     소프트 톤, border-radius 12) + Contact 텍스트(16/600).

import Link from "next/link";

export default function CHeader() {
  return (
    <header
      className="mx-auto flex items-center justify-between"
      style={{
        maxWidth: 1440,
        width: "100%",
        height: 56,
        padding: "0 clamp(20px, 5vw, 80px)",
        marginTop: 48 - 12 - 32, // banner(top 12 + height 32)와 정확한 간격
      }}
    >
      <Link
        href="/c"
        aria-label="Siriai 홈"
        style={{
          fontFamily: "Pretendard",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.01em",
          color: "#000",
          textDecoration: "none",
        }}
      >
        Siriai
      </Link>

      <nav aria-label="주 메뉴">
        <ul
          className="flex flex-row items-center"
          style={{ gap: 24, listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <a href="/portfolio" className="c-portfolio-pill" aria-current="page">
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="/contact"
              style={{
                fontFamily: "Pretendard",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.2,
                color: "#000",
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
