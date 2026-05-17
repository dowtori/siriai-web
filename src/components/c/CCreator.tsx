// 외주 원안 섹션 — Global Creators.
// 외주 Figma spec(Frame 2147239207 + Rectangle 240652986) 픽셀 정밀 재구현.
// 1280×560 박스, 라운드 80px, 배경 = 실제 풍경 이미지(Rectangle 240652986) +
// 위에 검은 30% overlay + filter blur 16px. 가운데 866×215 카피 그룹.
// 헤드라인(48px 700 120%) + 본문(18px 400 140%) 모두 #FFF text-align center.

import Image from "next/image";

export default function CCreator() {
  return (
    <section
      id="creator"
      aria-labelledby="c-creator-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="relative mx-auto w-full overflow-hidden"
        style={{
          maxWidth: 1280,
          aspectRatio: "1280 / 560",
          minHeight: "min(560px, 70vw)",
          borderRadius: 80,
          isolation: "isolate",
        }}
      >
        {/* 배경 — Rectangle 240652986 + blur(16) + 검은 30% overlay */}
        <div
          className="absolute inset-0"
          style={{ filter: "blur(16px)", transform: "scale(1.05)" }}
          aria-hidden="true"
        >
          <Image
            src="/c/assets/creator/landscape.png"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
          aria-hidden="true"
        />

        {/* 가운데 카피 그룹 — Frame 2085674450 (866×215) */}
        <div
          className="absolute left-1/2 top-1/2 flex w-full flex-col items-center"
          style={{
            transform: "translate(-50%, -50%)",
            maxWidth: 866,
            paddingInline: "clamp(20px, 4vw, 40px)",
            gap: 24,
          }}
        >
          <h2
            id="c-creator-heading"
            className="m-0 w-full text-center"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.25,
              color: "#FFFFFF",
              wordBreak: "keep-all",
            }}
          >
            전 세계의 크리에이터와
            <br />
            함께 브랜드의 관계를 구축합니다.
          </h2>
          <p
            className="m-0 w-full text-center"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.2vw, 16px)",
              lineHeight: 1.6,
              color: "#FFFFFF",
              wordBreak: "keep-all",
              opacity: 0.92,
            }}
          >
            데이터와 맥락, 감각을 결합해
            <br />
            브랜드와 크리에이터 사이에
            <br />
            오래 작동하는 파트너십을 설계합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
