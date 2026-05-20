# Siriai Web — Plan 트랙 로그

> 카피웍·디자인 반복 트랙 관리 문서. spec 문서(PRD.md / Design.md / CLAUDE.md)와 분리해서 **시간 순 작업 일지**와 **트랙 정의**를 한 자리에 모은다.

---

## 0. Plan vs Phase — 용어 정리

혼동 주의:

| 개념 | 의미 | 예시 |
|------|------|------|
| **Plan A/B/C** | 사용자 주도 카피웍·디자인 반복 트랙. 본 문서가 추적. | Plan A = v3 1차 카피웍 reframe (본 트랙) |
| **Phase A/B/C/D** | 빌드업 단계 (PRD/Design.md에 명시된 빌드 시간선). Phase C에서 v3 의사결정 완료, Phase D에서 후속 정리. | Phase C 결정 → Phase D 의존성 정리 |

Plan은 **카피·voice·UX 트랙**, Phase는 **빌드 단계**. 둘은 직교한다.

---

## 1. Plan A — v3 1차 카피웍 reframe (2026-05) — **1차 마무리 ✅**

### 1.1 범위

PRD v3.0 (2026-05-16 기준) 위에서 다음 영역을 사용자 피드백으로 디벨롭:

- §00 Hero 우측 KR 카피
- §01 Stance 한국어 3줄
- §02 Methodology 헤드 + 코어 라벨(OPERATING MODEL 부활 + 한국어 부제)
- §05 Voice 한국어 매니페스토 (3 stanza reseed)
- §06 Contact 톤 (보조 카피·CTA·placeholder)
- §07 Footer 매니페스토 한국어 + 재설계 (Twelve Labs식 풀폭 wordmark)
- "Founded in Seoul · Est. 2024" 류 사이트 전반 일괄 제거
- 푸터 brand wordmark 폰트 토큰 (`--font-mark`) 도입

### 1.2 변경 카피 인벤토리 (before → after)

| 위치 | Before | After | 커밋 |
|---|---|---|---|
| Hero 우측 KR | "AI로 사고하는 구조를 설계합니다." | "AI 기반 인사이트, 가장 쉽고 감각적으로." | `10de3f4` |
| §01 KR 1 | "AI 도구는 매주 등장합니다." | "AI 도구는 매일 새롭게 등장합니다." | `10de3f4` |
| §01 KR 2 | "바뀌어도 남는 자리가 있습니다." | "필요한 건 창의성과 결합." | `10de3f4` |
| §01 KR 3 | "시리아이는 그 자리를 설계합니다." | "시리아이는 그 구조를 설계합니다." | `10de3f4` |
| §02 헤드 | "Three ways in." (1줄) | "Three ways in. / One place to begin." (2줄) | `f339a5b` |
| §02 KR 부제 | "세 가지 방식으로 들어갑니다." | "세 갈래로 들어가, 한 자리에서 시작합니다." | `f339a5b` |
| §02 코어 라벨 | 제거 (Negative Space) | "OPERATING MODEL" 부활 (in-circle 영문 2줄) | `f339a5b` |
| §02 코어 KR 부제 | (없음) → "함께 운영하는 자리." → "효율적 실행." | "효율적 실행." | `f339a5b` → `9c9dd9d` |
| §06 보조 카피 | "커피 한 잔으로 시작합니다. 메모 한 줄이면 충분하고, 어떤 대화든 먼저 듣는 자리부터." | "가벼운 커피챗으로, 해묵은 고민을 시원하게." | `9c9dd9d` |
| §06 캘린더 CTA | "직접 시간을 정하시려면 →" | "바로 스케줄 예약하기 →" | `9c9dd9d` |
| §06 폼 placeholder | "어떤 대화를 시작하고 싶으신가요?" | "페인 포인트를 간략히 적어주세요." | `9c9dd9d` |
| Footer 매니페스토 KR | "도구를 고르지 않고, 사고가 흐르는 자리를 만듭니다." → "도구는 권하지 않습니다. 변하지 않는 것을 설계합니다." → "도구가 아닌 비전을 제시합니다." | "도구가 아닌 비전을 제시합니다." | `9c9dd9d` → `79c588d` |
| Footer mini-about "세 모드." | "세 모드." | "세 갈래." | `9c9dd9d` |
| Hero `[Meta]` 줄 | "Founded in Seoul · Est. 2024" | 제거 | `3643032` |
| Footer "서울에서, 2024년부터." | (있음) | 제거 | `79c588d` |
| Footer "From Seoul, since 2024." | (있음) | 제거 | `79c588d` |
| Footer "contact@siriai.io · Seoul, KR" | (있음) | "contact@siriai.io" | `79c588d` |
| OG image 좌측 캡션 | "Founded in Seoul · Est. 2024" | 제거 + "siriai.io" 우측 정렬 단독 | `3643032` |
| §05 한국어 매니페스토 | v2 6줄 ("우리가 만드는 것은 도구가 아닙니다 / ..." / "...신호·판단·실행·기록...") | 3 stanza (Method · Attitude · Outcome) — 사용자 지정 | `c4db217` |
| §05 영문 헤드 + Caption + 레이아웃 | 그대로 | **유지** (한국어 카피만 교체) | `c4db217` |

### 1.3 디자인·기술 변경 (코드 구조)

| 변경 | 내용 | 커밋 |
|------|------|------|
| 푸터 재설계 | mini-about 페어링 + 구분선 제거 → 매니페스토 한·영 페어링 + **풀폭 serif wordmark** "Siriai" + © 한 줄 + contact 한 줄. Twelve Labs 푸터 패턴 직접 차용 (Design.md §2.1 *적극 차용*) | `499ac44` |
| `--font-mark` 토큰 신설 | globals.css에 Playfair Display 900 @import + CSS variable. brand wordmark 전용 (typography system 외). 정식 brand serif 자산 확보 시 `--font-mark-override`로 swap | `499ac44` |
| §02 다이어그램 코어 라벨 부활 | `MethodologySection.tsx` SVG: in-circle "OPERATING / MODEL" (fontSize 9, letterSpacing 0.16em) + 코어 원 아래 한국어 caption | `f339a5b` |
| §05 KR_LINES 타입 확장 | `string` → `ReactNode | "break"`. 인라인 `<strong>` 강조 (`'사람'`, `+32% 이상` fontWeight 600) | `c4db217` |
| OG image 마감 | `justifyContent: space-between` → `flex-end` (단순 align 변경) | `3643032` |
| §05 레이아웃 변경 시도 → 롤백 | hr 4개 + 카드 구조로 변경 시도(`2aea16d`) → 영문 헤드 복원(`b1e1b2e`) → 원본 레이아웃 완전 복원, 한국어 카피만 교체(`c4db217`) | `2aea16d` `b1e1b2e` `c4db217` |

### 1.4 spec 문서 동기화

본 트랙에서 갱신된 spec 문서 위치:

- **PRD.md**:
  - §00 Hero `[Meta]` 줄 spec 삭제
  - §02 Copy seed (헤드 2줄 + Sub KR 자연화 + Core 라벨 + KR 부제)
  - §02 Diagram A spec ("OPERATING MODEL 부활 / 한국어 부제 '효율적 실행.'")
  - §05 Copy seed (한국어 3 stanza reseed, 영문 헤드/Caption/Layout 원본 유지 명시)
  - §06 Copy seed (헤드 + Sub KR + CTA + placeholder)
  - §06 톤 메모 (L4 CTA)
  - §3.3 Footer spec (Twelve Labs 차용 + 풀폭 wordmark anchor + 소셜 X 정책 유지)
- **Design.md**:
  - §4.1 폰트 스택에 `--font-mark` 토큰 + brand mark 별외 처리 주석
- **CLAUDE.md**:
  - §02 IA (헤드 2줄 + 코어 라벨 OPERATING MODEL + 부제 "효율적 실행." + §03 시간성 분리)
  - §05 IA (한국어 3 stanza, 강조 단어, 영문 매니페스토 푸터 echo carry)
  - §06 IA (가벼운 커피챗 톤 + 직접 CTA)
  - 디자인 토큰 추상화 섹션에 `--font-mark` 추가
  - 디렉토리 트리 VoiceSection 주석

### 1.5 카피웍 메타 학습 (회귀 인시던트)

본 트랙 중 §02 코어 단어 결정에서 회귀 사건 발생 (4라운드 옵션 list-up, page 기능·UX writing 무시). 자기 진단 결과는 본 트랙의 대화 기록 + commit history에 남아 있음. **재발 방지 원칙**:

1. 카피웍을 분류 작업(옵션 list-up)으로 다루지 않는다. 직접 1안을 쓰고 사용자가 redirect 가능하게 제시.
2. AskUserQuestion 연속 호출(2회 이상)은 책임 회피 신호.
3. Page 기능(KPI·UX 약속)에서 출발한다. PRD 명사 사전에서 의미가 가까운 단어를 뽑는 것은 출발점이 아닌 검증 단계.
4. 사용자 직접 제안(예: "Operating Model")의 echo는 새 관점 0.
5. 사용자가 "한글 카피만 변경"이라 명시하면 레이아웃·구조를 손대지 않는다. (§05 인시던트)

### 1.6 1차 마무리 상태

- ✅ 모든 변경 사항 커밋 + 푸시 완료 (브랜치 `claude/redesign-homepage-premium-DiV5b`)
- ✅ Vercel 자동 배포 트리거됨
- ✅ PRD / Design / CLAUDE 동기화 완료
- ⏸ 사용자 피드백 라운드 대기 (배포 화면 검증 후 Plan B/C 진입 또는 Plan A 추가 디벨롭 결정)

---

## 2. Plan B — 비주얼 중심 / z축 진입 (시작 단계, 2026-05)

### 2.1 컨셉 (사용자 정의)

- 첫 장면 **비주얼 와우 듬뿍**한 초입부 — 몰입도·임팩트 최우선
- UX: 좌우/상하 스크롤이 아닌 **z축 진입** — 드래그/스크롤 시 화면 중앙부로 들어가는 경험
- 사용자 기존 `/b` 작업물보다 **한 단계 더 압도적**인 비주얼 (레퍼런스 출발점: 사용자 제공 `https://siriai-7bc0x7gre-dowtoris-projects.vercel.app/b`)
- 후보 레퍼런스 결: Active Theory · Resn · Lusion · Bruno Simon · Atlassian Loom hero · Stripe Sessions · GitHub Universe hero 류
- A안과 voice·카피 정합 **강제 X** — 비주얼이 일차 매개. PRD §2.3·§2.4 voice 원칙은 baseline일 뿐

### 2.2 베이스·라우트·브랜치

| 항목 | 값 |
|------|----|
| 브랜치 | `claude/visual-impact-bn` (master에서 분기) |
| 베이스 | `master` (v2 — Three.js · GSAP · Lenis · OrbCanvas 자산 포함, 3D·드래그 인터랙션 즉시 활용 가능) |
| 작업·프리뷰 라우트 | `/bn` |
| A안 격리 | 다른 브랜치, 다른 라우트, 다른 디자인 토큰 가능 |

### 2.3 시작 시 미해결 항목 (새 세션 첫 라운드에 결정)

1. 레퍼런스 서치 + 보드 정리 (3-5개 strongest, 각 5줄 분석)
2. 컨셉 sketch (텍스트 IA + 인터랙션 흐름)
3. 기술 스택 (Three.js / @react-three/fiber / Spline / Rive / Canvas 2D / WebGL shader 직접) — z축 인터랙션 구현 난이도·번들 크기·성능 trade-off
4. 인터랙션 모델 상세 (z축 진입 — drag·scroll·hover trigger / 단계별 reveal / 종료 조건)
5. 라우트·컴포넌트 디렉토리 결정 (예: `src/app/bn/`, `src/components/bn/`)
6. 첫 prototype (Hero 단독)

### 2.4 진행 원칙

- A안 코드·디자인 토큰(`--surface-base`, `--font-display` 등)은 import 가능하나 **강제 정합 아님**. 색·폰트·motion 모두 재정의 가능
- PRD §2.3 voice 원칙은 카피웍 baseline. 다만 B안은 비주얼이 일차 매개라 voice 톤·동사 사전 재정의 가능
- 매 라운드 본 §2에 일지 누적 (§1 Plan A 일지와 동일 형식)
- 새 세션 시작 — context 격리 위해 별도 세션. 본 §2와 CLAUDE.md를 시작 전 필독

### 2.5 진행 일지

#### Round 1 — 2026-05-20 — 부트스트랩·prototype Hero
**브랜치**: `claude/visual-impact-bn` (master 분기) · **라우트**: `/bn`

**Reference board (5)**:
1. **Lusion (lusion.co)** — camera depth navigation. 마우스 drag로 카메라 yaw, scroll로 z 진입. 각 stage가 3D scene 내 spatial layer. → B안 핵심 메타포 채택.
2. **Stripe Sessions 2024 hero** — 정제된 typography가 large scale로 호흡, 미세 motion이 압도감 형성. → typographic mass + 절제된 motion 결합 채택.
3. **Active Theory** — frame transitions, particle storm으로 stage 전환. → 깊이 fog + particle field로 stage 경계 처리.
4. **Resn** — drag/click이 의미 trigger. micro-interactions로 cinematic. → drag·scroll dual input + inertia 모델 채택.
5. **Bruno Simon (참고)** — 3D world navigation의 즐거움. 결은 다름(playful vs premium) → 패스.

**선택 결**: Lusion(공간 메타포) × Stripe Sessions(typographic premium) × Active Theory(layer 전환).

**컨셉 sketch — "Architecture of Thought · z-axis tunnel"**:
6-stage z축 tunnel. progress 0→1을 wheel·drag·keyboard로 추진.

| Stage | Progress | Visual | Copy seed |
|---|---|---|---|
| 0 | 0.00–0.16 | massive wordmark "SIRIAI" 정면 | Architecture of Thought |
| 1 | 0.16–0.32 | wordmark 가로질러 첫 layer 진입 | AI는 도구가 아니다 |
| 2 | 0.32–0.50 | orb / particle field 통과 | 사고하는 구조 |
| 3 | 0.50–0.68 | 3D 격자 architecture 노출 | 운영 모델 |
| 4 | 0.68–0.86 | 6 capability nodes (지식·판단·실행·기록·연결·성장) | 자리 6 |
| 5 | 0.86–1.00 | convergence point + CTA | 함께 운영합니다 |

각 stage = camera.z 구간 + DOM overlay reveal. 진입/이탈은 opacity·scale + 3D depth fog.

**기술 스택 결정**:
- **R3F + drei + postprocessing**: master에 이미 설치, 추가 번들 0. PerspectiveCamera z 보간으로 z축 진입 자연스러움.
- **GSAP/ScrollTrigger 대신 custom RAF + damping**: scroll이 normal scroll이 아닌 progress driver라 GSAP scroll-linked 안 맞음.
- **Lenis 비활성**: body overflow lock. 일반 scroll 사용 안 함.
- **framer-motion**: DOM overlay UI reveal (text·label).
- **Spline / Rive 패스**: third-party hosted = control·번들 부담. Rive는 2D vector라 z-depth 약함.

**인터랙션 모델**:
- 입력: `wheel.deltaY`, pointer drag dy, `ArrowDown/Up/Space/PageDown` → progressVelocity 누적
- smoothing: progress += (target - progress) * 0.08
- 카메라: `camera.position.z = -progress * 40`
- stage visibility: progress 구간 기반 fade·scale (각 stage 자체에서 useFrame)
- 종료 조건: progress ≥ 1 → "Enter site" CTA 노출 → 클릭 시 `/` 또는 `/c`로 라우팅
- ESC 또는 back-drag로 stage 역방향 가능

**라우트·디렉토리**:
```
src/app/bn/
├── layout.tsx     — 본 라우트 전용 (no SmoothScroll, no Navigation, body overflow lock)
└── page.tsx       — ZJourney 컨테이너
src/components/bn/
├── ZJourney.tsx
├── useZJourney.ts
├── stages/
│   ├── Stage0Wordmark.tsx
│   └── Stage1Statement.tsx
└── overlays/
    ├── ProgressRail.tsx
    └── ExitCue.tsx
```

**Round 1 prototype 범위** (이 라운드): Stage 0/1만, 입력·카메라·overlay 동기화 검증. Stage 2–5는 Round 2+.

**Round 1 commits** (예정):
- `feat(bn): /bn 라우트 + ZJourney 부트스트랩 — z축 진입 prototype` (Stage 0/1, useZJourney, overlay)

#### Round 2 — 2026-05-20 — editorial cinematic 결로 표면 전체 교체
**커밋**: `0ddf9aa`

사용자 피드백 *"사용감은 좋은데 브랜딩 수준이 너무 낮아."* 응대. 선택지: **Editorial cinematic** (A24 / Acne Studios / Mubi). 5개 표면 동시 교체.

| 표면 | Before | After |
|---|---|---|
| 색 | `#05050A` + 라일락 `#c4b5fd` + 흰 | `#0A0908` warm + copper `#B8916A` + ivory `#F2EAD3` |
| 워드마크 | "SIRIAI" 시스템 sans bold | "Siriai" Playfair Display Black `-0.06em` |
| 한국어 | 시스템 fallback | Pretendard 800 명시 |
| 배경 | 2400 라일락 별 generic | 1100 ivory dust + sparse copper sparks + Fresnel volumetric glow |
| UI copy | "Drag·Scroll·Space"·"/bn" dev-y | "Enter the architecture" italic · "an essay in six layers" · "Vol. I — 2026" · "Seoul, MMXXVI" |

폰트: next/font/google Playfair Display 400/700/900 italic, `--bn-mark` 변수로 /bn 라우트 격리.
3D: Fresnel back-side volumetric glow material (Lusion 결) 추가, SVG `feTurbulence` film grain `mix-blend-overlay` 0.07.

#### Round 3 — 2026-05-20 — A안 카피·voice 정합 (UX 라이팅 격상)
**커밋**: (이번 라운드)

사용자 피드백 *"UX라이팅이나 철학은 [A안 URL] 정도 수준은 되면 좋겠다."* 응대.

**진단 메모** (이 일지 직전 종합 보고에 상세):
- B안 Round 2는 editorial **패스티시**(pastiche). 결은 잡았으나 시리아이 사상 0 노출 — A24-style short film에 머물렀음.
- 6 stage 라벨 ("Architecture of Thought · Beyond Tools · Structures That Think · Operating Model · Six Seats · Run It Together") **자체 발명** — A안 spec에 없음. PRD §2.1 baseline 무시.
- Stage 1 한국어 1줄 "AI는 도구가 아니다." — manifesto layer 약함 (R6 위반).
- Bottom colophon "Seoul, MMXXVI" — 영문 sprezzatura, 실제 회사정보 부재.

**A안 voice 시스템 흡수** (BRAND_VOICE.md 정독):
- Reference DNA — 3-tone 합금: Anthropic(base) × Studio Dumbar(manifesto) × Resend(functional)
- 3-layer voice: A·Manifesto / B·Editorial / C·Functional
- 7 rules — R5c (직선 강제 묶음 금지), R7 (AI 도구명·`Multi-Agent` 헤드 노출 금지), One Word One Place (Insight = Hero에만)

**B안 6 stage z-tunnel ↔ A안 v3 7-section 매핑** (PRD §3.1):
| Stage | A안 §  | EN | KR |
|---|---|---|---|
| I | §00 Hero | Architecture for / Insight with AI. | AI로 사고하는 구조를 설계합니다. |
| II | §01 Stance | Tools change. / Structure remains. / We design it. | AI 도구는 매일 새롭게 등장합니다. / 필요한 건 창의성과 결합. / 시리아이는 그 구조를 설계합니다. |
| III | §03 System | Decision flow. / Made visible. | 판단의 흐름을, 보이게. + Signal·Judgment·Action·Record 4 노드 |
| IV | §02 Methodology | Three ways in. / One place to begin. | 세 갈래로 들어가, 한 자리에서 시작합니다. + Architecture·Literacy·Mapping 3축 |
| V | §05 Voice | We don't recommend tools. / We architect what stays. | 도구로서의 AI 접근을 넘어 / 니즈를 정확히 이해하고 '사람'을 돕습니다. + "— Siriai Manifesto, MMXXVI" |
| VI | §06 Contact | Let's start / with coffee. | 가벼운 커피챗으로, 해묵은 고민을 시원하게. + "Send a note →" CTA |

**디자인 토큰 통합**:
- B안 cinematic 토큰 (`--bn-bg` `#0A0908` / `--bn-ink` `#F2EAD3` / `--bn-accent` copper) **유지**
- A안 폰트 토큰 흡수: `--bn-mark` (Playfair) + 신규 `--bn-mono` (IBM Plex Mono via `next/font/google`) + Pretendard inherit
- 보조 액센트 `--bn-accent-blue` `#7A8A9A` (A안 `#2B3A4A`의 dark 베이스용 lift)
- metadata title·description A안 baseline 복원

**Voice Architecture 적용**:
- Layer A · Manifesto (Stage I·II·V) — Playfair 워드마크/헤드 4–8단어 마침표 종결
- Layer B · Editorial (Stage III·IV) — Anthropic 결 다이어그램 라벨
- Layer C · Functional (Stage VI + ProgressRail/ExitCue/colophon) — IBM Plex Mono 라벨, 동사 종결

**ProgressRail · ExitCue · header · bottom colophon editorial 교체**:
- ProgressRail 라벨 폰트 Playfair → IBM Plex Mono (functional 결)
- ExitCue: "Drag · Scroll · Space" → "Scroll / ↓ / to enter the architecture" (A안 Hero scroll hint 결)
- Header: "Siriai · /bn" → "Siriai" + "A practice in AI architecture" mono + "Vol. I — MMXXVI" (A안 Hero eyebrow baseline)
- Bottom colophon: "Seoul, MMXXVI" italic → "© 2024 — 2026 주식회사 시리아이 (SIRIAI)" + "contact@siriai.io" 실제 정보 (A안 Footer 결)

**현재 라운드 범위**: 카피 전면 교체 only. Stage III·IV 다이어그램 (4 node / 3 axis cinematic reveal), Stage V manifesto stagger, Stage VI CTA 비주얼 풀빌드는 **Round 4**.

### 2.6 마무리 상태

- ✅ 트랙 정의 + 빈 브랜치 + Round 1 prototype (Stage 0/1)
- ✅ Round 2 — editorial cinematic 결 표면 전체 교체 (5개 표면)
- ✅ Round 3 — A안 voice·copy 정합 (6 stage 카피·colophon·폰트 토큰)
- ⏸ 사용자 피드백 대기 — Round 4 후보:
  1. Stage III 4-node cinematic reveal (Signal·Judgment·Action·Record 3D 또는 SVG)
  2. Stage IV 3-axis prism (Architecture·Literacy·Mapping)
  3. Stage V 매니페스토 stagger (한국어 줄별 진입)
  4. Stage VI CTA 도착 화면 (Cal.com inline 또는 Contact form 미니)
  5. CoreOrb 동적 morph (Stage 3 → 4 노드 → 3 축 prism 변형)

---



운영 정리:
- `siriai.io` 운영 도메인 확정 후 `metadataBase` 갱신
- Supabase `contact_submissions` 테이블 마이그레이션 SQL 실행
- /contact 페이지별 opengraph-image 추가 (선택)

비주얼·brand:
- 정식 brand wordmark 자산 push → `--font-mark-override` 또는 SVG/img swap (현재는 Playfair Display Black substitute)
- Navigation wordmark 통일 (Step 2 — 가독성 실측 후)
- favicon · OG image 자산 통일 (Step 3)
- Clients wall — 비가용 11개 wordmark의 brand-specific 타이포 정교화
- HeroParticles 모바일 fps 최적화

§05 후속 옵션:
- §05 한국어 강조 시각 처리 (현재는 fontWeight 600 인라인) — 색감/사이즈 변형 검토 가능

§06 후속 옵션 (CLAUDE.md 백로그):
- Contact 톤 추가 디벨롭 (warm minimal 레퍼런스 더 깊이)
- 커피챗 신청 UX (자체 slot picker / Cal.com inline / Calendly 비교)

의존성 정리 (Phase D 잔여):
- v1 완전 폐기 결정 시 `@studio-freight/lenis`, `lenis`, `gsap`, `@gsap/react`, `three`, `@react-three/*` 제거

---

## 3. 다른 로컬에서 작업 재개 가이드

```bash
git clone https://github.com/dowtori/siriai-web.git
cd siriai-web
git checkout claude/redesign-homepage-premium-DiV5b   # Plan A 작업 브랜치
npm install
# .env.local (선택) — Supabase 미설정 시 contact form은 console.log fallback
npm run dev
```

**작업 시작 전 필독 순서:**
1. `PLAN.md` (본 문서) — 현재 트랙 상태·다음 후보
2. `CLAUDE.md` — 코드베이스 구조·라우트·디자인 토큰
3. `PRD.md` — 카피·IA·voice 원칙
4. `Design.md` — 디자인 시스템 토큰·다이어그램 spec

**브랜치 정책 (claude-on-web 환경):**
- Plan A 디벨롭은 `claude/redesign-homepage-premium-DiV5b` 위에 계속 쌓기
- Plan B/C 시작 시 사용자가 새 브랜치 지정 (예: `claude/redesign-brand-copy-C8WLj` 등)

---

> 최종 갱신: Plan A 1차 마무리 시점.
