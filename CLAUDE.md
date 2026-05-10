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
- **DB:** `@supabase/supabase-js` (contact form 제출 저장)
- **Package manager:** npm
- **Deployment:** Vercel (`npx vercel --prod`, GitHub push 시 자동 배포)

---

## 페이지 구조

```
/ (홈페이지)  src/app/page.tsx
├── Navigation
├── HeroSection          — cream #F4F1EB, WebGL orb (OrbCanvas)
├── PhilosophySection    — dark #111110, 헤드라인 + TurntableCarousel + 3-col features
├── WorksSection         — dark #111110, 텍스트 + 4×4 포토서클 그리드 (커스텀 이미지)
├── CTASection           — cream #F4F1EB, 문의하기 CTA
└── FooterSection

/contact  src/app/contact/page.tsx
/portfolio  src/app/portfolio/page.tsx
/api/contact  src/app/api/contact/route.ts  (POST → Supabase insert)
```

---

## 컴포넌트 아키텍처

### 핵심 설계 원칙
- **RAF 직접 DOM 조작**: 애니메이션이 많은 컴포넌트는 `requestAnimationFrame` + `ref.style.transform` 직접 변경. framer-motion 오버헤드 회피.
- **단방향 진입 트리거**: `useInView({ once: true, margin: "-10~-20%" })`로 스크롤 진입 시 1회만 실행.
- **hover는 ref 기반 inline style 변경**: CSS transition이 있으므로 RAF 불필요 (단, 회전 인터랙션은 RAF 사용).

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더, HeroSection에서 `dynamic import (ssr: false)` 사용
- 마우스 추적 → uniform `uMouse`로 광원 이동
- Fresnel rim + 이리데슨트 무지개 효과
- `Sparkles` (count=45, color=#c4b5fd) + `EffectComposer > Bloom` (intensity=0.7, luminanceThreshold=0.08) 적용 완료

### `TurntableCarousel.tsx`
- CSS 3D transform (`preserve-3d`, `rotateY`, `translateZ`)으로 8개 카드 원형 오비팅
- 상수: `RADIUS=252`, `CARD_SIZE=164`, `AUTO_VEL=0.22`
- `rotateX(-13deg)`, `perspective: 780px`
- 중앙 코어 글로우(보라/청색 방사형) 추가 — 궤도의 시각적 앵커
- RAF 루프 자동 회전, `PointerEvent` + `setPointerCapture` 드래그 인터랙션
- `PhilosophySection`에서 `height={580}`으로 사용

### `PhilosophySection.tsx`
- ManifestoSection + FeaturesSection 통합 컴포넌트 (두 파일은 page.tsx에서 미사용, 삭제 안 함)
- 구조: `Philosophy` 라벨 → 헤드라인 → TurntableCarousel (max-w-4xl) → 3-col feature grid
- `min-h-screen`, 단일 `useInView` ref로 전체 stagger 제어

### `WorksSection.tsx`
- 좌: 텍스트 블록 + 통계 (30+, 12+, 100%)
- 우: `PhotoCircle` 4×4 그리드 (16개 커스텀 이미지, `public/works/*.png`)
- 이미지 라벨: Context, Signal, Question, Edge, Clarity, Modeling, Oversight, Trace, Flow, Rhythm, Connection, Momentum, Evidence, Benchmark, Learning, Compounding
- `PhotoCircle`: 이미지에 라벨·한글 설명이 내장되어 있어 오버레이 라벨 없음
- hover: RAF 기반 회전 가속(→0.38°/frame) + blur 오버레이. 해제 시 0.93× 감속 후 RAF 자동 정지

### `CTASection.tsx`
- cream `#F4F1EB` bg, 문의하기(`/contact`) + 포트폴리오(`/portfolio`) 버튼

### `/api/contact/route.ts`
- POST: name, company, email, message → Supabase `contact_submissions` 테이블 insert
- 환경변수: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- 미설정 시 콘솔 로그 fallback (개발 환경)

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
| SEO / OG 메타태그 (`layout.tsx`) | Medium |
| HeroSection 모바일 — OrbCanvas 숨김으로 hero 허전함 보완 | Low |
| Supabase `contact_submissions` 테이블 생성 + 환경변수 설정 | 운영 필수 |

---

## 중요 결정 사항 (히스토리)

- **PhilosophySection 통합**: ManifestoSection + FeaturesSection이 동일 bg·동일 AI 철학 텍스트로 시각적 피로 유발 → 단일 섹션으로 병합.
- **WorksSection 포토서클**: 비닐레코드 CSS 메타포 폐기 → 커스텀 제작 이미지(Context~Compounding 16종) + 글래스모피즘. 이미지에 라벨·한글 설명 내장.
- **contact form**: 이메일 전송(Resend) → Supabase DB 저장 방식으로 전환. 현대적 UX(제출 후 대기) 선호.
- **ManifestoSection.tsx, FeaturesSection.tsx** 파일 유지 (참고용, page.tsx 미사용).
