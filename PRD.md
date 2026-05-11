# Siriai Website — Product Requirements Document

> 최종 업데이트: 2026-05-11  
> 현재 버전: v2.0 (15-섹션 풀 볼륨 + 스크롤 UX 설계)

---

## 프로젝트 개요

**Siriai**는 AI 아키텍처 설계 및 AI 리터러시 구축 전문 컨설팅 기업의 공식 웹사이트.  
인플루언서 비즈니스는 수익 모델 중 하나일 뿐 — 브랜딩 전면에는 AI 운영 구조 설계 역량을 내세운다.

**핵심 메시지:** "AI를 쓰는 것이 아니라, AI로 생각하는 것."

---

## 기술 스택

| 항목 | 버전 / 세부 |
|------|-------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | framer-motion (`useScroll`, `useTransform`, `useInView`) |
| Smooth Scroll | Lenis (duration: 1.55, spring easing) |
| 3D/WebGL | @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| DB | @supabase/supabase-js (contact form 제출 저장) |
| Package manager | npm |
| Deployment | Vercel (GitHub push → 자동 배포) |

---

## 페이지 구조 (현재 — v2.0)

```
/ (홈페이지)  src/app/page.tsx
│
│  [Global]
├── ScrollProgressBar  — 상단 1.5px 보라 그라디언트 진행 바
├── SectionIndicator   — 우측 고정 도트 레일 + 섹션 번호/레이블
├── Navigation
│
│  [Main]
├── HeroSection          #00 — cream, WebGL 오브, 단어 stagger 진입
├── ConnectionSection    #01 — cream, 좌텍 + 우카드 패럴랙스, exit 애니메이션
├── RelationshipIntro    #02 — cream, 우텍 + 좌카드 패럴랙스(mirror), exit 애니메이션
├── ArchitectureSection  #03 — dark olive #3D3B2A, 2-col 구조 카드 + CTA 버튼
├── PhilosophySection    #04 — dark #111110, sticky 280vh (헤드→캐러셀→피처 strip)
├── AIStudioSection      #05 — cream, 텍스트 + CSS 무한 마키 (AI 툴 로고), exit 애니메이션
├── CreatorSection       #06 — dark, 풀스크린 패럴랙스 배경 + 스크롤 reveal 텍스트
├── ArchivingSection     #07 — cream, 좌텍 + 우 2×3 그리드, exit 애니메이션
│
│  [Dark Act — 공유 bg #111110, 시각적 연속성]
├── ManifestoQuoteSection #08 — 스크롤 스크럽 라인별 reveal + 우하단 보라 글로우
├── GrowthSection         #09 — SVG 성장 곡선 pathLength 드로우 + inView 트리거
│
├── ServicesSection      #10 — cream, 2×2 서비스 카드 그리드
├── WorksSection              — dark, 텍스트 + 4×4 포토서클 그리드
├── CTASection                — cream, 문의하기 / 포트폴리오 버튼
└── FooterSection

/contact    src/app/contact/page.tsx
/portfolio  src/app/portfolio/page.tsx
/api/contact  src/app/api/contact/route.ts  (POST → Supabase insert)
```

---

## 스크롤 UX 설계 원칙 (v2.0)

### 핵심 철학
- **스냅 스크롤 금지** — 유저 스크롤 제어를 빼앗지 않는다
- Lenis `duration: 1.55` 무거운 모멘텀 → 스크롤 자체가 경험
- 섹션은 스냅하지 않고 "흘러간다"

### 섹션별 UX 패턴

| 섹션 | 패턴 | 기술 |
|------|------|------|
| Hero | 단어 stagger (blur→clear) + 텍스트 fade-out on scroll | word split + `useScroll` |
| Connection / RelationshipIntro | 텍스트 inView + 카드 패럴랙스 + exit fade | `useScroll` + `useTransform` |
| Philosophy | Sticky 280vh 핀 — 헤드라인 → 캐러셀 → 피처 순차 reveal | sticky + scroll-scrub |
| Creator | 풀스크린 패럴랙스 배경 (±12%) + 텍스트 scale+opacity reveal | `useScroll` 패럴랙스 |
| ManifestoQuote | 줄 단위 스크롤 스크럽 reveal + 보라 글로우 성장 | scroll-linked opacity/y |
| Dark Act | ManifestoQuote + Growth 공유 bg — 시각적 단절 없는 어두운 구간 | 래퍼 div 공유 |
| Exit animations | Connection, RelationshipIntro, AIStudio, Archiving — 스크롤 아웃 시 fade+rise | `useTransform [0.60→0.90]` |

### 글로벌 UX 컴포넌트
- **ScrollProgressBar**: 상단 1.5px, 스프링 물리(`stiffness: 180, damping: 28`)
- **SectionIndicator**: 우측 고정, 11개 도트 레일, active 도트 18px 확장 + 보라 점등, 다크/크림 자동 색상 전환

---

## 디자인 시스템

### 색상 팔레트
| 역할 | 값 |
|------|-----|
| Cream bg | `#F4F1EB` |
| Dark bg | `#111110` |
| Dark olive | `#3D3B2A` (ArchitectureSection) |
| 보라 액센트 | `#c4b5fd` (ScrollProgressBar, active dot, Growth curve, glow) |
| 인디고 | `#818cf8` (그라디언트 페어링) |

### 타이포그래피
- 헤드라인: `clamp(2rem, 3.5vw, 4.8rem)`, `font-bold`, `leading-[1.18~1.25]`
- 섹션 레이블: `text-[11px] tracking-[0.22em] uppercase`
- 본문: `text-[14px] leading-[1.9]`
- `wordBreak: "keep-all"` 전역 적용 (한국어 줄바꿈 제어)

### 애니메이션 공통 easing
- `[0.16, 1, 0.3, 1]` (spring-like, overshoot 없는 빠른 안착)
- stagger 간격: `delay + 0.08~0.12s`
- useInView margin: `"-10%"` (섹션 10% 진입 시 트리거)

---

## 애셋 구조

```
public/
├── images/
│   ├── forest.png              — CreatorSection 풀스크린 배경 (자작나무 숲)
│   ├── tools/
│   │   ├── sora.png
│   │   ├── gemini.png
│   │   ├── dalle2.png
│   │   ├── midjourney.png
│   │   ├── chatgpt.png
│   │   └── runway.png
│   └── ui/
│       └── mockup-archive.png  — ConnectionSection UI 목업
└── works/
    └── *.png                   — WorksSection 포토서클 16종
```

---

## 컴포넌트 상세

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더로 구현된 WebGL 오브
- 마우스 위치 추적 → 광원 이동 (uniform `uMouse`)
- Fresnel rim, 이리데슨트 무지개 효과
- `Sparkles` (count=45, color=#c4b5fd) + `EffectComposer > Bloom` (intensity=0.7, luminanceThreshold=0.08)
- HeroSection에서 `dynamic import (ssr: false)`로 사용

### `TurntableCarousel.tsx`
- CSS 3D transform (`preserve-3d`, `rotateY`, `translateZ`)으로 8개 원형 카드 오비팅
- 상수: `RADIUS=252`, `CARD_SIZE=164`, `AUTO_VEL=0.22`
- `perspective: 780px`, `rotateX(-13deg)` 틸트
- 중앙 코어 글로우(보라/청색 방사형)
- RAF 루프 자동 회전, `PointerEvent` 드래그 인터랙션
- PhilosophySection에서 `height={580}`으로 사용

### `PhilosophySection.tsx`
- **Desktop**: sticky 280vh 핀 구조 — `height: "280vh"` 컨테이너 + `sticky top-0 h-screen` 내부
- **Mobile**: `PhilosophyMobile` — `md:hidden`, `useInView` 기반 일반 트리거
- scroll-scrub: headlineOpacity [0, 0.12] → carouselOpacity [0.08, 0.3] → featuresOpacity [0.62, 0.85]

### `WorksSection.tsx`
- 좌: 텍스트 + 통계 (30+, 12+, 100%)
- 우: `PhotoCircle` 4×4 그리드 — RAF 기반 hover 회전 + blur 오버레이
- 이미지: Context, Signal, Question, Edge, Clarity, Modeling, Oversight, Trace, Flow, Rhythm, Connection, Momentum, Evidence, Benchmark, Learning, Compounding

---

## 미구현 백로그 (이후 방향성)

### 운영 필수
| 항목 | 비고 |
|------|------|
| Supabase `contact_submissions` 테이블 생성 | Vercel 환경변수 SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 설정 필요 |
| SEO / OG 메타태그 | `layout.tsx` — title, description, og:image, twitter:card |

### 비주얼 디벨롭
| 항목 | 우선순위 | 비고 |
|------|----------|------|
| ArchivingSection 그리드 — CSS placeholder → 실제 콘텐츠 썸네일 교체 | High | 실제 캠페인/콘텐츠 이미지 필요 |
| RelationshipIntroSection 카드 — CSS mock → 실제 UI 목업 이미지 | High | Figma export |
| ConnectionSection 메트릭 카드 수치·라벨 — 실제 브랜드 성과 데이터 반영 | Medium | |
| ServicesSection 카드 아이콘 — SVG placeholder → 커스텀 아이콘 | Medium | |
| CreatorSection 배경 — `/images/forest.png` 고화질 교체 또는 영상화 | Low | |
| HeroSection 모바일 — OrbCanvas 없는 대안 비주얼 | Low | |

### UX 개선
| 항목 | 우선순위 | 비고 |
|------|----------|------|
| Navigation — 스크롤 다운 시 compact 처리 (높이 축소, bg blur 강화) | Medium | |
| 다크/크림 전환 구간 추가 처리 — clip-path 오버랩 또는 컬러 모핑 | Medium | Architecture→Philosophy 전환 등 |
| SectionIndicator 모바일 대응 — 현재 `hidden md:flex` | Low | |
| 페이지 내 앵커 링크 (`#contact`, `#works` 등) | Low | |

### 기술 부채
| 항목 | 비고 |
|------|------|
| ManifestoSection.tsx, FeaturesSection.tsx 삭제 | page.tsx 미사용 레거시 파일 |
| FeaturesSection.tsx 삭제 | 동일 |
| PhilosophySection 모바일 TurntableCarousel 성능 최적화 | 모바일에서 Three.js 부하 확인 필요 |

---

## 주요 결정 히스토리

| 날짜 | 결정 |
|------|------|
| 2026-05-11 | **v1 → v2**: 4 섹션 → 15 섹션 확장. Figma 기획 이미지 기준으로 볼륨 구축. |
| 2026-05-11 | **스크롤 UX 전면 재설계**: 스냅 스크롤 폐기 → Lenis 1.55 + 섹션별 차별화 패턴 |
| 2026-05-11 | **ScrollProgressBar + SectionIndicator 도입**: 내러티브 위치 인지 + 프리미엄 신호 |
| 2026-05-11 | **Dark Act 통합**: ManifestoQuote + Growth를 공유 `bg-[#111110]` 래퍼로 묶어 시각적 단절 제거 |
| 2026-05-11 | **Exit 애니메이션 도입**: 4개 크림 섹션에 스크롤 아웃 fade+rise 추가 — 섹션이 흘러가는 느낌 |
| - | **PhilosophySection 통합**: ManifestoSection + FeaturesSection 병합. 동일 bg·주제 연속 시각 피로. |
| - | **WorksSection 이미지**: Unsplash 폐기 → 커스텀 제작 이미지 16종. 라벨·설명 이미지에 내장. |
| - | **contact form**: Resend → Supabase DB 저장 방식 전환. 제출 후 대기 UX. |
| - | **OrbCanvas**: Bloom + Sparkles 포스트프로세싱. TurntableCarousel: CARD_SIZE 128→164, RADIUS 190→252, 코어 글로우. |
