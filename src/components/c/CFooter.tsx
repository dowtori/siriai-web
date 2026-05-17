import Image from "next/image";

// Footer — 외주 원안 마지막 reveal:
// 1) 거대한 Siriai 시리프 워드마크 (이미지 자산 display.png — 폰트 결정 회피, 픽셀 퍼펙트)
// 2) 풍경 사진 위 카피 "기술은 속도를 만들고, 사람은 의미를 만듭니다."
// 3) 정보·nav 행
//
// 풍경 사진은 외주 원본의 자연(나무·풀) 톤. 현재 자산 미매칭 → 단색 dark olive.

export default function CFooter() {
  return (
    <footer id="contact" className="relative">
      {/* Big logotype reveal (시리프 자산, 폰트 토론 회피) */}
      <div className="c-shell flex justify-center pt-12 pb-8">
        <Image
          src="/c/assets/logo/display.png"
          alt="Siriai"
          width={2400}
          height={760}
          priority={false}
          className="h-auto w-full max-w-[1200px] select-none"
        />
      </div>

      {/* Landscape + closing quote */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "340px", backgroundColor: "#2A2A26" }}
        aria-label="기술은 속도를 만들고, 사람은 의미를 만듭니다."
      >
        {/* TODO: 외주 원본의 자연 풍경 사진 export 받으면 next/image로 교체 */}
        <div className="c-shell relative z-10 py-16 text-center">
          <p
            className="c-display"
            style={{ color: "#FFFFFF", fontWeight: 700 }}
          >
            기술은 속도를 만들고,
            <br />
            사람은 의미를 만듭니다.
          </p>
        </div>
      </div>

      {/* Info row */}
      <div className="c-shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="c-wordmark mb-3">Siriai</p>
          <p className="c-meta max-w-[42ch]">
            관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다.
          </p>
        </div>
        <nav aria-label="푸터 메뉴">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#about" className="c-meta hover:text-[color:var(--c-ink)]">
                About
              </a>
            </li>
            <li>
              <a href="#portfolio" className="c-meta hover:text-[color:var(--c-ink)]">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="c-meta hover:text-[color:var(--c-ink)]">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <hr className="c-divider" />
      <p className="c-shell c-label py-6">© Siriai. All rights reserved.</p>
    </footer>
  );
}
