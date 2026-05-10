@AGENTS.md

# Siriai Web — Agent Context

## 프로젝트 개요

**Siriai** — AI 아키텍처 설계·AI 리터러시 구축 전문 컨설팅 기업 공식 웹사이트.  
핵심 메시지: "AI를 쓰는 것이 아니라, AI로 생각하는 것."

자세한 요구사항은 [`PRD.md`](./PRD.md)를 참고한다.

---

## 기술 스택

- **Framework:** Next.js App Router (NOT Pages Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animation:** framer-motion (`useInView`, `motion`, stagger)
- **3D/WebGL:** `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Package manager:** npm
- **Deployment:** Vercel (`npx vercel --prod`)

---

## 페이지 구조

```
/ (홈페이지)  src/app/page.tsx
├── Navigation
├── HeroSection          — cream #F4F1EB, WebGL orb (OrbCanvas)
├── PhilosophySection    — dark #111110, 헤드라인 + TurntableCarousel + 3-col features
├── WorksSection         — dark #111110, 텍스트 + 4×4 포토서클 그리드
├── CTASection           — cream #F4F1EB, 문의하기 CTA
└── FooterSection
```

---

## 컴포넌트 아키텍처

### 핵심 설계 원칙
- **RAF 직접 DOM 조작**: 애니메이션이 많은 컴포넌트(TurntableCarousel 등)는 `requestAnimationFrame` + `ref.style.transform` 직접 변경. framer-motion 오버헤드 회피.
- **단방향 진입 트리거**: `useInView({ once: true, margin: "-10~-20%" })`로 스크롤 진입 시 1회만 실행.
- **hover는 ref 기반 inline style 변경**: CSS transition이 있으므로 RAF 불필요.

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더, HeroSection에서 `dynamic import (ssr: false)` 사용
- 마우스 추적 → uniform `uMouse`로 광원 이동
- Fresnel rim + 이리데슨트 무지개 효과
- **TODO:** `@react-three/postprocessing` Bloom + Sparkles 미구현

### `TurntableCarousel.tsx`
- CSS 3D transform (`preserve-3d`, `rotateY`, `translateZ`)으로 8개 카드 원형 오비팅
- RAF 루프 자동 회전 (AUTO_VEL=0.22 deg/frame)
- `PointerEvent` + `setPointerCapture` 드래그 인터랙션
- `height` prop으로 크기 조절 (PhilosophySection에서 `height={500}` 사용)

### `PhilosophySection.tsx`
- **ManifestoSection + FeaturesSection 통합 컴포넌트** (두 파일은 삭제하지 않았으나 page.tsx에서 미사용)
- 구조: `Philosophy` 라벨 → 헤드라인 → TurntableCarousel (max-w-4xl) → 3-col feature grid
- `min-h-screen`, 섹션 단일 `useInView` ref로 전체 stagger 제어

### `WorksSection.tsx`
- 좌: 텍스트 블록 + 통계 (30+, 12+, 100%)
- 우: 4×4 `PhotoCircle` 그리드 (16개 Unsplash 이미지)
- `PhotoCircle`: `<img>` + `rounded-full overflow-hidden` + 글래스 오버레이 + 라벨
- hover: `scale(1.08)` (CSS group) + `backdropFilter blur(5px)` (ref 직접 변경)

### `CTASection.tsx`
- cream `#F4F1EB` bg, 문의하기(`/contact`) + 포트폴리오(`/portfolio`) 버튼

---

## 디자인 시스템 요약

| 속성 | 값 |
|------|----|
| Dark bg | `#111110` |
| Cream bg | `#F4F1EB` |
| Dark 텍스트 | `white` / `white/85` / `white/35` / `white/25` |
| Cream 텍스트 | `black` / `black/40` / `black/30` |
| 헤드라인 | `clamp(2rem, 3.5vw, 4.8rem)`, `font-bold`, `leading-[1.18~1.25]` |
| 섹션 레이블 | `text-[11px] tracking-[0.22em] uppercase` |
| 본문 | `text-[14px] leading-[1.9]` |
| wordBreak | `keep-all` (한국어) |
| 진입 easing | `[0.16, 1, 0.3, 1]` (spring-like) |
| stagger | `delay + 0.08~0.1s` |

---

## 브랜드 원칙 (코드 작성 시 카피 가이드)

- AI 도구 나열 X → AI 운영 **구조** 설계 O
- "인플루언서 비즈니스" 전면 노출 금지 — 수익 채널 중 하나로만
- 핵심 키워드: 아키텍처, 리터러시, 구조, 판단, 실행, 데이터
- 어조: 간결·단호. 설명적이지 않고 선언적.

---

## 미구현 백로그

| 항목 | 우선순위 |
|------|----------|
| OrbCanvas Bloom 포스트프로세싱 | High |
| OrbCanvas Sparkles 파티클 | Medium |
| `/contact` 페이지 (문의 폼) | High |
| `/portfolio` 페이지 | Medium |
| SEO / OG 메타태그 (`layout.tsx`) | Medium |
| 모바일 반응형 전체 QA | Medium |
| WorksSection 이미지 → 실제 프로젝트 이미지 교체 | Low |

---

## 중요 결정 사항 (히스토리)

- **PhilosophySection 통합**: ManifestoSection + FeaturesSection이 동일 bg·동일 AI 철학 텍스트로 시각적 피로 유발 → 단일 섹션으로 병합. ManifestoSection 본문 2컬럼 텍스트는 제거(feature 설명과 중복).
- **WorksSection 포토서클**: 비닐레코드 CSS 메타포가 "구현한 티가 난다"는 피드백으로 폐기. Unsplash 실사 이미지 + 글래스모피즘으로 교체(Spotify/Apple Music 감도 기준).
- **ManifestoSection.tsx, FeaturesSection.tsx** 파일은 삭제하지 않고 유지 (참고용). page.tsx에서 import되지 않음.
