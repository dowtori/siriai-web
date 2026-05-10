# Siriai Website — Product Requirements Document

## 프로젝트 개요

**Siriai**는 AI 아키텍처 설계 및 AI 리터러시 구축 전문 컨설팅 기업의 공식 웹사이트.  
인플루언서 비즈니스는 수익 모델 중 하나일 뿐 — 브랜딩 전면에는 AI 운영 구조 설계 역량을 내세운다.

**핵심 메시지:** "AI를 쓰는 것이 아니라, AI로 생각하는 것."

---

## 기술 스택

| 항목 | 버전 / 세부 |
|------|-------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | framer-motion |
| 3D/WebGL | @react-three/fiber, @react-three/drei |
| Post-processing | @react-three/postprocessing |
| Package manager | npm |
| Deployment | Vercel (`npx vercel --prod`) |

---

## 페이지 구조 (현재)

```
/ (홈페이지)
├── Navigation
├── HeroSection          — cream #F4F1EB, WebGL 오브 (Three.js GLSL 셰이더)
├── PhilosophySection    — dark #111110, 철학 선언 + 3D TurntableCarousel + 3 feature cards
├── WorksSection         — dark #111110, 텍스트 + Unsplash 포토서클 4×4 그리드
├── CTASection           — cream #F4F1EB, 문의하기 CTA
└── FooterSection
```

---

## 디자인 시스템

### 색상
- **Dark bg:** `#111110` (Manifesto, Features, Works)
- **Cream bg:** `#F4F1EB` (Hero, CTA, Footer)
- **텍스트 계층:** `white` → `white/85` → `white/35` → `white/25` (dark 섹션)
- **텍스트 계층:** `black` → `black/40` → `black/30` (cream 섹션)

### 타이포그래피
- 헤드라인: `clamp(2rem, 3.5vw, 4.8rem)`, `font-bold`, `leading-[1.18~1.25]`
- 섹션 레이블: `text-[11px] tracking-[0.22em] uppercase`
- 본문: `text-[14px] leading-[1.9]`
- wordBreak: `keep-all` (한국어 줄바꿈 제어)

### 애니메이션 원칙
- 진입 트리거: `useInView({ once: true, margin: "-10~-20%" })`
- easing: `[0.16, 1, 0.3, 1]` (spring-like)
- stagger: 섹션 내 요소별 `delay + 0.08~0.1s` 간격
- RAF 기반 직접 DOM 조작: 캐러셀, 호버 인터랙션 (framer-motion 오버헤드 회피)

---

## 컴포넌트 목록

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더로 구현된 WebGL 오브
- 마우스 위치 추적 → 광원 이동 (uniform `uMouse`)
- Fresnel rim, 이리데슨트 무지개 효과
- HeroSection에서 `dynamic import (ssr: false)`로 사용
- **TODO:** `@react-three/postprocessing` Bloom + Sparkles 추가 (계획됨, 미구현)

### `TurntableCarousel.tsx`
- CSS 3D transform (`preserve-3d`, `rotateY`, `translateZ`)으로 8개 원형 카드 오비팅
- RAF 루프로 자동 회전 (AUTO_VEL=0.22 deg/frame)
- 드래그 인터랙션 (`PointerEvent`, `setPointerCapture`)
- 호버 시 속도 28%로 감속
- `height` prop으로 사이즈 조절 가능

### `PhilosophySection.tsx`
- ManifestoSection + FeaturesSection 통합 컴포넌트
- 구조: 헤드라인 → TurntableCarousel (max-w-4xl) → 3-col feature grid
- 01 AI 아키텍처 설계 / 02 AI 리터러시 구축 / 03 인사이트 기반 운영

### `WorksSection.tsx`
- 좌: 텍스트 + 통계 (30+ 프로젝트, 12+ 파트너사, 100% 구조 기반)
- 우: Unsplash 포토서클 4×4 그리드
- `PhotoCircle` 컴포넌트: 실사 이미지 + 글래스모피즘 오버레이
- hover: `scale(1.08)` + `backdrop-blur(5px)` — Spotify/Apple Music 감도

### `CTASection.tsx`
- cream bg, 중앙 정렬
- CTA 버튼: "문의하기" (`/contact`), "포트폴리오 보기" (`/portfolio`)

---

## 미구현 / 남은 작업 (백로그)

| 항목 | 우선순위 | 비고 |
|------|----------|------|
| OrbCanvas Bloom 포스트프로세싱 | High | `@react-three/postprocessing` 설치 완료, 구현 대기 |
| OrbCanvas Sparkles 파티클 | Medium | Bloom과 함께 적용 예정 |
| `/contact` 페이지 | High | 문의 폼, Supabase 또는 이메일 연동 |
| `/portfolio` 페이지 | Medium | 프로젝트 케이스 스터디 |
| SEO / OG 메타태그 | Medium | `layout.tsx`에 추가 필요 |
| 모바일 반응형 점검 | Medium | 전체 섹션 모바일 QA 필요 |
| WorksSection 이미지 교체 | Low | 현재 Unsplash 스톡 → 실제 프로젝트 이미지로 교체 가능 |

---

## 브랜드 원칙 (카피 가이드)

- AI 도구 나열 X → AI 운영 **구조** 설계 O
- "인플루언서 비즈니스" 전면 노출 X — 수익 채널 중 하나로만 인식
- 핵심 키워드: 아키텍처, 리터러시, 구조, 판단, 실행, 데이터
- 어조: 간결하고 단호함. 설명적이지 않고 선언적.
