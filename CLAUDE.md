@AGENTS.md

# Siriai Web — Agent Context

> 버전: **v3.0** (2026-05-16 기준)
> 요구사항·IA·카피 → [`PRD.md`](./PRD.md)
> 디자인 시스템(컬러·폰트·모션·다이어그램) → [`Design.md`](./Design.md)
> v2 PRD는 [`archive/PRD.v2.md`](./archive/PRD.v2.md)로 보존

---

## 새 로컬 환경 빠른 시작

```bash
git clone https://github.com/dowtori/siriai-web.git
cd siriai-web
npm install
# .env.local 작성 (선택)
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
# 미설정 시 contact form은 console.log fallback
npm run dev          # http://localhost:3000
npx vercel --prod    # 또는 git push → Vercel 자동 배포
```

---

## 프로젝트 개요

**Siriai** — AI 아키텍처 설계 · AI 리터러시 구축 전문 컨설팅.
핵심 메시지: **"AI를 쓰는 것이 아니라, AI로 사고하는 구조를 설계합니다."**

타겟: AI 아키텍처링 수요자 (아키텍트 직군 + 전략 컨설턴트).
어조: 선언적·간결. 설명적이지 않다.

---

## 기술 스택

| 항목 | 세부 |
|------|------|
| Framework | Next.js 16 App Router (NOT Pages Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 + CSS variables |
| Animation | framer-motion (`useInView`, `motion.*`, `motion.path` pathLength) |
| Smooth Scroll | 네이티브 (`scroll-behavior: smooth`) — Lenis 미사용. v1 라우트만 Lenis. |
| Hero generative | Canvas 2D **vanilla TypeScript** (외부 라이브러리 0) |
| Diagrams | SVG + framer-motion (Three.js 미사용) |
| DB | `@supabase/supabase-js` |
| Deployment | Vercel (GitHub push → 자동) |
| Font | Pretendard Variable (dynamic subset, weight 45–920) |

---

## 라우트 구조

| 경로 | 콘텐츠 | metadata |
|------|--------|----------|
| `/` | v3 홈 (7섹션) | indexed, v3 metadata + OG |
| `/contact` | v3 ContactPage (헤더 + 폼·FAQ + `#schedule` Cal embed 섹션) | indexed |
| `/api/contact` | POST → Supabase `contact_submissions` insert | — |
| `/opengraph-image` | 동적 PNG (1200×630, 베이지 + 슬레이트 헤드라인) | — |
| `/v1` | v1 legacy 홈 (15섹션) | **noindex**, follow |
| `/v1/contact` | v1 legacy 폼 | noindex |
| `/v1/portfolio` | v1 legacy 포트폴리오 | noindex |

> v1은 "초기 테스트 히스토리" 보존용. 운영 트래픽 없고 검색엔진 격리.

---

## 디렉토리 구조

```
src/
├─ app/
│  ├─ page.tsx                   v3 홈 (Hero · Stance · Methodology · System · Clients · Voice · Contact)
│  ├─ contact/page.tsx           v3 ContactPage
│  ├─ layout.tsx                 메인 layout (v3 metadata · OG · twitter)
│  ├─ globals.css                토큰(v1 + v3) · 폰트 import · 마키 keyframes
│  ├─ opengraph-image.tsx        동적 OG image (next/og ImageResponse)
│  ├─ api/contact/route.ts       Supabase insert
│  └─ v1/                        ── v1 legacy 라우트
│     ├─ layout.tsx              v1 default metadata + robots noindex
│     ├─ page.tsx                v1 legacy 홈
│     ├─ contact/page.tsx        v1 legacy 폼
│     └─ portfolio/page.tsx      v1 legacy 포트폴리오
├─ components/
│  ├─ v3/                        ── v3 (메인 / · /contact 사용)
│  │  ├─ Navigation.tsx          고정 상단, scroll 시 bg-blur + 높이 축소
│  │  ├─ HeroSection.tsx         §00 (Canvas + 정적 텍스트)
│  │  ├─ HeroParticles.tsx       Canvas 2D 텍스트 파티클 엔진
│  │  ├─ StanceSection.tsx       §01 좌우 비대칭, 줄별 stagger
│  │  ├─ MethodologySection.tsx  §02 좌 텍스트 + 우 SVG Diagram A (삼각 + 코어)
│  │  ├─ SystemSection.tsx       §03 풀폭 SVG Diagram B (4레이어 · dark)
│  │  ├─ ClientsSection.tsx      §04 With — 단일 가로 wall · slow marquee · 16 로고 (5 SVG + 11 wordmark)
│  │  ├─ VoiceSection.tsx        §05 매니페스토 (dark · 줄별 reveal)
│  │  ├─ ContactSection.tsx      §06 홈 인라인 wrapper
│  │  └─ ContactForm.tsx         폼 본체 (인라인·페이지 양쪽 재사용)
│  └─ v1/                        ── v1 legacy 컴포넌트 (22개, /v1/* 사용)
```

---

## 디자인 토큰 (Phase C 확정 — 베이지 + 딥블루)

| 토큰 | Hex | 용도 |
|------|-----|------|
| `--surface-base` | `#EFE9DD` | 라이트 배경 (페이퍼) |
| `--surface-raised` | `#E8E1D2` | 카드·강조면 |
| `--surface-inverse` | `#0F1419` | 다크 배경 (미드나이트 블루) |
| `--fg-default` | `#0F1419` | 본문 (light 위) |
| `--fg-muted` | `#5E6470` | 보조 (light 위) |
| `--fg-on-inverse` | `#EFE9DD` | 본문 (dark 위) |
| `--fg-on-inverse-muted` | `#9CA3AF` | 보조 (dark 위) |
| `--accent` | `#2B3A4A` | 슬레이트 액센트 (1점만 사용) |
| `--line-default` / `--line-strong` | rgba 8%/18% | 라이트 라인 |
| `--line-on-inverse` / `--line-on-inverse-strong` | rgba 12%/24% | 다크 라인 |

> 전체 정의 → [`Design.md` §3](./Design.md) · 정신: **검정 미사용**, 모든 어두움은 미드나이트 블루.

### 폰트 토큰 추상화

```css
--font-display: var(--font-display-override, "Pretendard Variable", -apple-system, sans-serif);
--font-sans:    var(--font-sans-override,    "Pretendard Variable", -apple-system, sans-serif);
```

추후 PP Neue Montreal 도입 시 `:root`에 `--font-display-override` 한 줄만 추가하면 무중단 swap.

---

## 컴포넌트 패턴

- **진입 애니메이션**: `useInView(ref, { once: true, margin: "-N%" })` + `motion.X`
- **Easing 표준**: `[0.16, 1, 0.3, 1]` 모든 진입 모션
- **wordBreak: `keep-all`** 전역 — 한국어 줄바꿈 손상 방지
- **다크/라이트 교차**: 섹션별 inline style (`var(--surface-inverse)` 등)
- **SVG drawPath**: `motion.line` / `motion.path` + `initial={{ pathLength: 0 }}` → `animate={{ pathLength: 1 }}`
- **Canvas 2D 파티클**: 오프스크린 캔버스 텍스트 렌더 → `getImageData` 픽셀 샘플링 → spring 보간 (stiffness 0.08, damping 0.86) → 마우스 끌림 160px radius

---

## v3 IA — 7섹션

1. **§00 Hero** — Canvas 2D 파티클 cycle 4종 (Architecture → Not tools/output/deployment → 회귀) · 8s settled + 0.9s dissolve 무한 루프
2. **§01 Stance** — "Tools change. / Structure remains. / We design it." (한국어: AI 도구는 매주 등장합니다 / 바뀌어도 남는 자리가 있습니다 / 시리아이는 그 자리를 설계합니다) · 3줄 압축 · EN/KR 不 mirror
3. **§02 Methodology** · Diagram A — 진입의 3축 (Architecture · Literacy · Mapping). 헤드 "Three ways in. / One place to begin." + 한국어 "세 갈래로 들어가, 한 자리에서 시작합니다." — 셋→하나 수렴 명시. 코어 라벨 **OPERATING MODEL** (한국어 부제: "효율적 실행."). §03(흐름)과의 시간성 분리 유지 (§02 실행할 모델 · §03 운영 흐름).
4. **§03 System** · Diagram B (dark) — 4레이어 Signal · Judgment · Action · Record
5. **§04 Clients (With)** — 헤드 "Brands we've sat with." / 보조 "각자 다른 결, 같은 자세." · 단일 가로 로고 wall · slow marquee (60s) · 16 로고 (5 SVG + 11 wordmark) · 협업 분야 비공개 (트웰브랩스식 담백 톤 + 절제된 voice 1쌍)
6. **§05 Voice** (dark) — 매니페스토 "We don't recommend tools. / We architect what stays." (Signal/Judgment/Action/Record 마지막 줄로 §03와 연결)
7. **§06 Contact** — 인라인 폼 (이름·회사·이메일·메시지 선택·동의) · "Let's start with coffee. / 가벼운 커피챗으로, 해묵은 고민을 시원하게." + CTA "바로 스케줄 예약하기 →" (따뜻한 톤 + 직접적 CTA)

> **카피웍 메타 원칙**: PRD §2.4 (One Word, One Place · Spirit over Surface · Negative Space · Indirection · Verb-led · EN/KR 不 mirror · Each Section Owns Its Voice). 'Insight' 키워드는 §00 Hero 한 자리에서만 강하게 쓴다 — 다른 섹션은 그 단어를 회피하고 동사·자세로 정합성을 만든다.

---

## 환경변수 & DB

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_CAL_LINK=siriai/diagnosis-30min   # username/event-slug — 미설정 시 §06 좌측 placeholder 노출
```

`.env.local` / Vercel env 미설정 시:
- Supabase → console.log fallback (개발 무관)
- Cal → §06 Contact 좌측 column에 placeholder 블록 노출 (`비어있는 시간을 직접 선택해…`)

`contact_submissions` 테이블:
```sql
create table contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  company     text,
  email       text not null,
  interest    text,         -- DEPRECATED: v3 reframe(2026-05)에서 폼·API에서 제거. 컬럼은 마이그레이션 전까지 nullable 유지.
  message     text          -- v3에서 optional (v1은 required)
);
```

---

## 차기 작업

### 운영 정리
- `siriai.io` 운영 도메인 확정 후 `src/app/layout.tsx`의 `metadataBase` 갱신
- Supabase `contact_submissions.interest` 컬럼 추가 — 마이그레이션 SQL 작성 완료 (`supabase/migrations/20260516120000_*.sql`), Dashboard SQL Editor 실행 대기
- /contact 페이지별 opengraph-image 추가 (선택)

### 비주얼 정교화
- Clients wall — 비가용 11개 wordmark의 brand-specific 타이포 정교화 (실제 SVG 입수 시 swap)
- HeroParticles 모바일 fps 최적화 (파티클 수 동적 조정)

### 의존성 정리
- 자동 코드 스플릿으로 메인 / 번들에는 이미 무거운 v1 패키지 미포함 — 추가 작업 불요
- v1 완전 폐기 결정 시 `@studio-freight/lenis`, `lenis`, `gsap`, `@gsap/react`, `three`, `@react-three/*` 제거

### UX 확장 (백로그 · 우선순위 낮음)
- **Contact 톤 리디자인**: "따뜻하면서 센스 있는" 컨택 사례 서칭 후 디벨롭 (현 선언적 톤만으로는 차가움). reference 후보 — Linear/Vercel/Resend/Stripe contact 페이지·warm minimal SaaS landing.
- **커피챗 신청 UX**: 빈 시간대 선택 → 슬롯 예약 통합. 후보 — 자체 slot picker(Supabase availability 테이블) · Cal.com inline · Calendly.
- 폼 단일 흐름 vs 폼·캘린더 이원화 의사결정, 한국어 친밀한 톤 카피 라인 동반 정교화

---

## v1 Legacy Notes (압축)

- 15섹션 구조 (Hero · Connection · Relationship · Architecture · Philosophy · AIStudio · Creator · Archiving · Manifesto · Growth · Services · Works · CTA · Footer + Navigation/Indicator)
- 22개 컴포넌트 `src/components/v1/`
- Lenis SmoothScroll (duration 1.55)
- OrbCanvas (Three.js + GLSL shader)
- TurntableCarousel (CSS 3D preserve-3d)
- Philosophy sticky (280vh scroll-scrub)
- 더 상세한 내용은 [`archive/PRD.v2.md`](./archive/PRD.v2.md) 참조
