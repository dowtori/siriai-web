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
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | framer-motion |
| 3D/WebGL | @react-three/fiber, @react-three/drei |
| Post-processing | @react-three/postprocessing |
| DB | @supabase/supabase-js (contact form 제출 저장) |
| Package manager | npm |
| Deployment | Vercel (`npx vercel --prod`) |

---

## 페이지 구조 (현재)

```
/ (홈페이지)  src/app/page.tsx
├── Navigation
├── HeroSection          — cream #F4F1EB, WebGL 오브 (OrbCanvas)
├── PhilosophySection    — dark #111110, 철학 선언 + 3D TurntableCarousel + 3 feature cards
├── WorksSection         — dark #111110, 텍스트 + 커스텀 이미지 포토서클 4×4 그리드
├── CTASection           — cream #F4F1EB, 문의하기 CTA
└── FooterSection

/contact   src/app/contact/page.tsx       — 문의 폼 (Supabase insert)
/portfolio src/app/portfolio/page.tsx     — 포트폴리오 (플레이스홀더)
/api/contact src/app/api/contact/route.ts — POST → Supabase contact_submissions
```

---

## 디자인 시스템

### 색상
- **Dark bg:** `#111110` (Philosophy, Works)
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
- hover는 ref 기반 inline style 변경 (CSS transition 활용)

---

## 컴포넌트 상세

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더로 구현된 WebGL 오브
- 마우스 위치 추적 → 광원 이동 (uniform `uMouse`)
- Fresnel rim, 이리데슨트 무지개 효과
- HeroSection에서 `dynamic import (ssr: false)`로 사용
- `Sparkles` (count=45, color=#c4b5fd) 적용 완료
- `EffectComposer > Bloom` (intensity=0.7, luminanceThreshold=0.08) 적용 완료

### `TurntableCarousel.tsx`
- CSS 3D transform (`preserve-3d`, `rotateY`, `translateZ`)으로 8개 원형 카드 오비팅
- 상수: `RADIUS=252`, `CARD_SIZE=164`, `AUTO_VEL=0.22`
- perspective: 780px, rotateX(-13deg) 틸트
- 중앙 코어 글로우(보라/청색 방사형) — wheelRef의 sibling div, 회전 미적용
- RAF 루프로 자동 회전, 드래그 인터랙션 (`PointerEvent`, `setPointerCapture`)
- 호버 시 속도 28%로 감속
- `PhilosophySection`에서 `height={580}`으로 사용

### `PhilosophySection.tsx`
- ManifestoSection + FeaturesSection 통합 컴포넌트 (두 파일은 참고용 유지, page.tsx 미사용)
- 구조: "Philosophy" 레이블 → 헤드라인 → TurntableCarousel (max-w-4xl) → 3-col feature grid
- 단일 `useInView` ref로 전체 stagger 제어 (헤드라인 delay 0 → 캐러셀 0.2s → 피처 0.55+)
- `min-h-screen`, 미묘한 100px 격자 배경 오버레이

### `WorksSection.tsx`
- 좌: 텍스트 블록 + 통계 (30+ 프로젝트, 12+ 파트너사, 100% 구조 기반)
- 우: `PhotoCircle` 4×4 그리드 (16개 커스텀 이미지, `public/works/*.png`)
- 이미지: Context, Signal, Question, Edge, Clarity, Modeling, Oversight, Trace, Flow, Rhythm, Connection, Momentum, Evidence, Benchmark, Learning, Compounding
- `PhotoCircle`: RAF 기반 hover 회전 (TARGET_VEL=0.38, 가속 0.05 lerp, 감속 0.93×, |vel|<0.005 자동 정지)
- hover: 회전 가속 + blur 오버레이 (backdropFilter blur(0px)→blur(6px), CSS transition 450ms)
- 이미지에 라벨·한글 설명 내장 → 오버레이 라벨 없음

### `CTASection.tsx`
- cream `#F4F1EB` bg, 중앙 정렬
- CTA 버튼: "문의하기" (`/contact`), "포트폴리오 보기" (`/portfolio`)

### `/api/contact/route.ts`
- POST: `name, company, email, message` → Supabase `contact_submissions` 테이블 insert
- 환경변수: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- 미설정 시 console.log fallback (개발 환경에서 오류 없이 동작)
- contact/page.tsx: async fetch, loading/error 상태 관리, 제출 후 완료 화면 전환

---

## 미구현 / 남은 작업 (백로그)

| 항목 | 우선순위 | 비고 |
|------|----------|------|
| SEO / OG 메타태그 | Medium | `layout.tsx`에 추가 필요 |
| HeroSection 모바일 | Low | OrbCanvas 숨김으로 hero 허전함 보완 필요 |
| Supabase 테이블 생성 + 환경변수 | 운영 필수 | `contact_submissions` 테이블, Vercel 환경변수 설정 |

---

## 브랜드 원칙 (카피 가이드)

- AI 도구 나열 X → AI 운영 **구조** 설계 O
- "인플루언서 비즈니스" 전면 노출 X — 수익 채널 중 하나로만 인식
- 핵심 키워드: 아키텍처, 리터러시, 구조, 판단, 실행, 데이터
- 어조: 간결하고 단호함. 설명적이지 않고 선언적.

---

## 주요 결정 사항 히스토리

- **섹션 통합**: ManifestoSection + FeaturesSection → PhilosophySection 단일 섹션으로 병합. 동일 bg·동일 주제 연속으로 시각적 피로 발생.
- **WorksSection 이미지**: Unsplash 스톡 폐기 → 커스텀 제작 이미지 16종 (Context~Compounding). 이미지에 라벨·한글 설명 내장.
- **WorksSection hover**: CSS animation-play-state 방식(즉각 정지) 폐기 → RAF 기반 가속/감속 구현 (레코드판 회전감).
- **contact form**: 이메일 전송(Resend) → Supabase DB 저장 방식으로 전환. 제출 후 대기 UX 채택.
- **OrbCanvas**: Bloom + Sparkles 포스트프로세싱 구현 완료.
- **TurntableCarousel**: 카드 크기·궤도 반경 확대 (CARD_SIZE 128→164, RADIUS 190→252), 중앙 코어 글로우 추가.
