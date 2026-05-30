@AGENTS.md

# Siriai Web — Agent Context

> 버전: v2.0 (2026-05-11 기준)  
> 자세한 요구사항 → [`PRD.md`](./PRD.md)

---

## 새 로컬 환경 빠른 시작

```bash
# 1. 클론
git clone https://github.com/dowtori/siriai-web.git
cd siriai-web

# 2. 의존성 설치
npm install

# 3. 환경변수 설정 (.env.local 생성)
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
# → 미설정 시 contact form은 console.log fallback으로 동작 (개발 무관)

# 4. 개발 서버
npm run dev          # http://localhost:3000

# 5. 배포
npx vercel --prod    # Vercel 프로덕션 배포 (또는 git push → 자동 배포)
```

---

## 프로젝트 개요

**Siriai** — AI 아키텍처 설계·AI 리터러시 구축 전문 컨설팅 기업 공식 웹사이트.  
핵심 메시지: **"AI를 쓰는 것이 아니라, AI로 생각하는 것."**

인플루언서 비즈니스는 수익 채널 중 하나 — 브랜딩 전면에는 AI 역량을 내세운다.

---

## 기술 스택

| 항목 | 세부 |
|------|------|
| Framework | Next.js 16 App Router (NOT Pages Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Animation | framer-motion (`useScroll`, `useTransform`, `useInView`, `motion`) |
| Smooth Scroll | Lenis (duration: 1.55, spring easing) |
| 3D/WebGL | `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| DB | `@supabase/supabase-js` |
| Deployment | Vercel (GitHub push → 자동 배포) |

---

## 현재 페이지 구조 (v2.0 — 15 섹션)

```
/ (홈페이지)  src/app/page.tsx
│
│  [Global Fixed]
├── ScrollProgressBar  — 상단 1.5px 보라 그라디언트 진행 바 (spring 물리)
├── SectionIndicator   — 우측 고정 도트 레일 11개 + 섹션 번호/레이블 (md 이상만 노출)
├── Navigation
│
│  [Main]
├── id="s-hero"         HeroSection          — cream, WebGL 오브, 단어 stagger
├── id="s-connection"   ConnectionSection    — cream, 좌텍 + 우카드 패럴랙스 + exit
├── id="s-relationship" RelationshipIntro    — cream, 우텍 + 좌카드(mirror) + exit
├── id="s-architecture" ArchitectureSection  — dark olive #3D3B2A, 2-col 카드 + CTA
├── id="s-philosophy"   PhilosophySection    — dark, sticky 280vh scroll-scrub
├── id="s-aistudio"     AIStudioSection      — cream, 텍스트 + AI 툴 마키 + exit
├── id="s-creator"      CreatorSection       — dark, 풀스크린 패럴랙스 배경
├── id="s-archiving"    ArchivingSection     — cream, 좌텍 + 2×3 그리드 + exit
│
│  [Dark Act — div.bg-[#111110] 공유 래퍼]
├── id="s-manifesto"    ManifestoQuoteSection — 스크롤 스크럽 줄별 reveal
├── id="s-growth"       GrowthSection         — SVG 성장 곡선 pathLength 드로우
│
├── id="s-services"     ServicesSection      — cream, 2×2 서비스 카드
├──                     WorksSection         — dark, 4×4 포토서클 그리드
├──                     CTASection           — cream, 문의하기 버튼
└──                     FooterSection

/contact    src/app/contact/page.tsx
/portfolio  src/app/portfolio/page.tsx
/api/contact  src/app/api/contact/route.ts  (POST → Supabase insert)
```

**중요**: 각 섹션은 `<div id="s-xxx">` 래퍼 안에 있음. SectionIndicator가 이 ID로 IntersectionObserver를 붙임. ID 변경 시 `SectionIndicator.tsx`의 `SECTIONS` 배열도 함께 수정.

---

## 스크롤 UX 핵심 원칙

- **스냅 스크롤 금지** — 유저 스크롤 제어 탈취 안 함
- **섹션 exit 애니메이션** — Connection, RelationshipIntro, AIStudio, Archiving 4개 크림 섹션에 적용
  - `useScroll offset: ["start end", "end start"]` + `useTransform [0.60→0.90] opacity [1→0], y [0→-28px]`
- **Philosophy sticky**: `height: "280vh"` container + `sticky top-0 h-screen` inner — 데스크톱 전용
- **Dark Act**: ManifestoQuote + Growth는 `<div className="bg-[#111110]">` 공유 래퍼로 묶임. 두 컴포넌트에서 개별 `bg-[#111110]` 제거됨.
- **진입 easing**: `[0.16, 1, 0.3, 1]`, stagger `delay + 0.08~0.12s`

---

## 컴포넌트 아키텍처

### 핵심 설계 원칙
- **RAF 직접 DOM 조작**: 고빈도 애니메이션 (`TurntableCarousel`, `PhotoCircle`) — framer-motion 오버헤드 회피
- **단방향 진입 트리거**: `useInView({ once: true, margin: "-10%" })`
- **scroll-linked**: `useScroll` + `useTransform` — 값만 선언, Framer Motion이 RAF 최적화

### `ScrollProgressBar.tsx`
- `useScroll()` (페이지 전체) + `useSpring(scrollYProgress, { stiffness: 180, damping: 28 })`
- 상단 고정, z-index 200, `origin-left` + `scaleX`

### `SectionIndicator.tsx`
- IntersectionObserver로 `id="s-xxx"` 요소 감지 (`rootMargin: "-42% 0px -42% 0px"`)
- `SECTIONS` 배열로 섹션 메타 관리 (id, num, label, dark 여부)
- 다크/크림 전환 시 dot/text 색상 자동 전환 (CSS `transition: 500ms`)
- `hidden md:flex` — 모바일 숨김

### `OrbCanvas.tsx`
- Three.js + GLSL 커스텀 셰이더, `dynamic import (ssr: false)`
- 마우스 → `uMouse` uniform → 광원 이동, Fresnel rim + 이리데슨트
- `Sparkles` (count=45, color=#c4b5fd) + `Bloom` (intensity=0.7)

### `TurntableCarousel.tsx`
- CSS 3D preserve-3d, 8개 카드, `RADIUS=252`, `CARD_SIZE=164`, `AUTO_VEL=0.22`
- `perspective: 780px`, `rotateX(-13deg)`, 중앙 코어 글로우
- RAF 자동 회전 + PointerEvent 드래그

### `PhilosophySection.tsx`
- Desktop: `PhilosophyDesktop` (`hidden md:block`, height 280vh, sticky)
- Mobile: `PhilosophyMobile` (`md:hidden`, useInView)
- scroll-scrub 구간: headline [0→0.12] → carousel [0.08→0.3] → features [0.62→0.85]

### `WorksSection.tsx`
- `PhotoCircle`: RAF 기반 hover 회전 (TARGET_VEL=0.38, 감속 0.93×)
- 이미지 16종: Context, Signal, Question, Edge, Clarity, Modeling, Oversight, Trace, Flow, Rhythm, Connection, Momentum, Evidence, Benchmark, Learning, Compounding

---

## 디자인 시스템 요약

| 속성 | 값 |
|------|----|
| Cream bg | `#F4F1EB` |
| Dark bg | `#111110` |
| Dark olive | `#3D3B2A` |
| 보라 액센트 | `#c4b5fd` / `#818cf8` |
| 헤드라인 | `clamp(2rem, 3.5vw, 4.8rem)`, font-bold, leading-[1.18~1.25] |
| 레이블 | `text-[11px] tracking-[0.22em] uppercase` |
| 본문 | `text-[14px] leading-[1.9]` |
| wordBreak | `keep-all` (한국어 필수) |
| 진입 easing | `[0.16, 1, 0.3, 1]` |

---

## 브랜드 원칙 (카피 가이드)

- AI 도구 나열 X → AI 운영 **구조** 설계 O
- "인플루언서 비즈니스" 전면 노출 금지
- 핵심 키워드: 아키텍처, 리터러시, 구조, 판단, 실행, 데이터
- 어조: 간결·단호. 설명적이지 않고 선언적.

---

## 다음 작업 우선순위

### 즉시
1. **Supabase 테이블 생성** — `contact_submissions` + Vercel 환경변수
2. **SEO/OG 메타태그** — `layout.tsx`에 title, description, og:image 추가

### 비주얼 완성
1. ArchivingSection 그리드 → 실제 콘텐츠 썸네일 교체 (CSS placeholder 현재)
2. RelationshipIntroSection 카드 → 실제 UI 목업 이미지 (Figma export)
3. ConnectionSection 메트릭 수치 → 실제 성과 데이터

### UX 개선
1. Navigation scroll compact (고정 높이 축소 + bg blur 강화)
2. ArchitectureSection → PhilosophySection 색상 전환 처리 (olive→dark)
3. SectionIndicator 모바일 버전

---

## SIRIAI 비주얼 규칙 (반드시 준수 — `design/visual-system` 트랙)

> 출처: `docs/visual-workflow.md` §C · `docs/style-guide.html`(리빙 스펙) · `docs/reference-report.md`
> 적용 범위: **메인 `/`(v3) — 비주얼 시스템만** (산출물의 K뷰티·인플루언서 카피/케이스는 채택 안 함, AI 컨설팅 정체성 유지)

**무드**: 미니멀·여백 + 감성·에디토리얼 + 절제된 모션. "조용한 고급감". 경쟁사가 시끄럽게 갈 때 우리는 조용히 가서 차별화.

### 색
- 모든 색은 `src/styles/tokens.css` 의 CSS 변수만 사용. HEX 하드코딩 금지.
- 배경은 `--c-canvas`(웜 페이퍼). 액센트 `--c-accent`(보라 #c4b5fd)는 화면당 1~2회만.
- 큰 면적 채색 금지. 대비 섹션은 `--c-dark` 사용.
- **⚠️ 브랜드 액센트 = 보라** (`#c4b5fd`/`#818cf8`). 산출물 원본 테라코타는 제안값이라 폐기. OrbCanvas·Growth·card strip 자산 그대로 보존.

### 타입
- 헤드라인은 `--f-serif`(Fraunces), 본문·UI는 `--f-sans`(Inter/Pretendard).
- 히어로 헤드라인은 `--t-display`, weight 300, line-height 1.05, letter-spacing -0.015em.
- 본문 폭은 `--maxw-text`(720px) 이하로 제한. line-height 1.6.

### 간격·레이아웃
- 8px 그리드. 모든 margin/padding은 `--s-*` 토큰.
- 섹션 상하 패딩 `--section-y`. 컨테이너 `--maxw`(1200px), gutter `--gutter`.
- 라운드는 작게(`--r-sm`~`--r-lg`). pill은 버튼만. 과한 둥근 모서리 금지.
- 비대칭/에디토리얼 그리드 허용. 여백을 사치스럽게 — 한 화면에 적게 담기.

### 모션
- 모든 transition은 `--ease`, 200~480ms. 느린 모션 금지.
- 스크롤 등장: translateY(24px)+opacity, stagger 60~80ms.
- 시그니처 모션은 히어로 1곳에만. 자동재생 캐러셀·과한 패럴랙스 금지.
- `prefers-reduced-motion` 반드시 존중.

### 작업 규칙
- 새 컴포넌트는 `docs/style-guide.html`의 패턴(버튼/카드/타입)을 먼저 참고.
- UI를 바꾸면 설명 말고 스크린샷을 찍어 `style-guide.html`과 대조해 차이를 보고.
- 접근성: 대비 AA 이상, 포커스 링 유지, 시맨틱 태그.

---

## 주의사항

- `ManifestoSection.tsx`, `FeaturesSection.tsx` — 레거시 파일, `page.tsx` 미사용. 삭제 가능.
- Dark Act 래퍼 (`bg-[#111110]`): `ManifestoQuoteSection` + `GrowthSection` 두 컴포넌트 자체에는 bg 없음. 래퍼가 담당.
- SectionIndicator ID 목록 `s-hero` ~ `s-services` — 섹션 추가/제거 시 반드시 SECTIONS 배열 동기화.
