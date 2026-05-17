import Link from "next/link";

// 외주 원안: 좌 워드마크 (시리프 풍 italic "Siriai") + 우 nav (Portfolio 활성, Contact).
// Portfolio가 캡슐 활성 상태 — 현재 위치 표시.

export default function CHeader() {
  return (
    <header className="c-shell flex items-center justify-between py-6">
      <Link href="/c" aria-label="Siriai 홈" className="c-wordmark">
        Siriai
      </Link>

      <nav aria-label="주 메뉴">
        <ul className="flex items-center gap-2">
          <li>
            <a href="#portfolio" className="c-nav-link" aria-current="page">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#contact" className="c-nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
