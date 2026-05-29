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

### 2.5 마무리 상태

- ⏳ 신규 트랙 — 새 세션에서 진행 예정
- 사전 작업: 본 트랙 정의 + 빈 브랜치 push 완료

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

## 3. Plan A1 — Mystic Compressed (시작 단계, 2026-05-28)

### 3.1 컨셉 (사용자 정의 + 회의 후 정리)

- 3대 키워드: **신비주의 · 느린 · 스마트한**
- Hero(다크 신비) + 본문(흰 미니멀) 두 모드 + 전환점이 디자인 임팩트
- 스크롤 ~2.5–3 viewport로 압축 (A안 7섹션 대비 60% 축소)
- Voice·UX 라이팅·정보 응축은 A안 carry, mood만 mystic swap

### 3.2 베이스·라우트·브랜치

| 항목 | 값 |
|---|---|
| 브랜치 | `claude/mystic-compressed-a1` (A안 HEAD `7bb9263`에서 분기) |
| 베이스 | A안 v3 (베이지 + Pretendard + framer-motion) |
| 프리뷰 라우트 | `/a1` (`/`는 A안 유지) |

### 3.3 산출물 (Phase A1.0 — research + PRD + 하네스 design)

- ✅ `RESEARCH-A1.md` — 레퍼런스 9개 분석 + 모션·컬러 baseline 권고 + 구현 참고
- ✅ `PRD-A1.md` — 컨셉·구조·토큰·하네스·구현 단계 spec
- ✅ 사용자 승인 완료 (2026-05-28) — §10 결정 8개 확정, §12 체크리스트 완료

### 3.4 확정 사항 (2026-05-28)

- 하네스: Motion Debug Panel(`/a1?debug=1`) + Stage Isolation(`/a1/_h/stage-N`) 통합형
- Clients(With): Stage 2 → 3 사이 단독 가로 ribbon, marquee 90s
- State-aware ambient: 도입 (Stage 3 진입 시 10–15% 가속 + opacity +8%)
- §2 카피: Methodology head만 mystic reset, System head는 carry
- 기타 추천안: Lozenge + Numbered 병용, Geist Mono 도입, Lenis `lerp: 0.08`

### 3.5 Phase A1.1 — 기반 구축 (2026-05-28 완료)

산출물:
- ✅ `src/app/globals.css` — `--a1-*` 토큰 11개 추가 (paper · midnight · ink · on-midnight · mute · on-mute · hairline · hairline-strong · hairline-on-midnight · accent-warm · accent-deep)
- ✅ `src/components/a1/motion-context.tsx` — `A1MotionProvider` + `useA1Motion()` hook, 8 파라미터, localStorage hydration, prefers-reduced-motion 감지
- ✅ `src/components/a1/DebugPanel.tsx` — 우측 floating, 8 slider, Copy as code / Reset, ⌘D 토글, `?debug=1` 자동 노출
- ✅ `src/app/a1/layout.tsx` — noindex, `A1MotionProvider` + `DebugPanel` mount
- ✅ `src/app/a1/page.tsx` — Stage 1·2·3 stack
- ✅ `src/components/a1/Stage[1|2|3]*.tsx` — placeholder. Stage 1은 다크 + blur reveal + 천천히 도는 외곽 ring, Stage 2는 흰 + lozenge bullet · numbered + clients ribbon placeholder, Stage 3은 다크 inset manifesto card + 1px border button
- ✅ `src/app/a1/h/page.tsx` — 하네스 인덱스 (stages 링크 + URL flags 표 + routes)
- ✅ `src/app/a1/h/stage-[1|2|3]/page.tsx` — stage isolation. `badge` prop으로 화면 좌상단에 harness 표시

빌드 이슈 해결:
- pre-existing globals.css의 Playfair @import url() 라인이 Tailwind v4 PostCSS inline 후 spec 위반(@import rules must precede all rules). 본 트랙에서 fix — link 태그를 `layout.tsx` head로 옮김
- 초기 폴더명 `_h`가 Next.js 16 App Router의 private folder convention으로 404 — `h`로 rename
- React 19 lint rule `react-hooks/set-state-in-effect` — localStorage hydration 케이스에 eslint-disable + 명시 주석

검증:
- `npm run lint` — A1 파일 0 error
- `npx tsc --noEmit` — A1 파일 0 error
- 라우트: `/a1` `/a1?debug=1` `/a1/h` `/a1/h/stage-1` `/a1/h/stage-2` `/a1/h/stage-3` 전부 200, `/` 도 200 (CSS fix 후 회복)

### 3.6 Phase A1.2 — Stage 1 Hero 정제 (2026-05-28 완료)

산출물:
- ✅ `src/components/a1/MysticCursor.tsx` — Canvas 2D ink wash blob.
  midnight 베이스 위에 paper white 색의 radial gradient를 마우스 위치
  lerp 따라옴. `cursorLerp` `cursorRadius` 파라미터 DebugPanel 연동
  (slider 움직이면 즉시 반영). `forcedCursor` prop 또는 URL
  `?cursor=x,y`로 위치 강제. DPR 처리, resize handling,
  prefers-reduced-motion 시 비활성.
- ✅ `src/components/a1/RotatingForm.tsx` — SVG 동심원 3 + 내부 dashed
  cross + counter-rotating inner ring + core dot + echo ring. hairline
  only (rgba 14%). `rotationDuration` `ambientLoop` DebugPanel 연동.
- ✅ `src/components/a1/Stage1Hero.tsx` 정제 — placeholder ring 제거,
  MysticCursor + RotatingForm 마운트, blur reveal 정밀화 (영문 14px→0,
  한국어 6px→0 + 영문 종료 후 호흡), scroll hint motion ambient
  파라미터 연동, `useSearchParams`로 cursor URL 파싱 (useMemo).

검증:
- `npm run lint` — A1 파일 0 error (MysticCursor의 React 19
  `no-ref-in-render` lint는 ref update를 useEffect로 분리하여 해결.
  Stage1Hero는 useState/useEffect 제거하고 useSearchParams로 단순화)
- `npx tsc --noEmit` — A1 파일 0 error
- 라우트: `/a1` `/a1?debug=1` `/a1?cursor=400,300` `/a1/h/stage-1`
  `/a1/h/stage-1?cursor=120,160` 전부 200

DebugPanel 라이브 연동 매핑:
- `revealDuration` · `revealStagger` — 영문/한국어 등장 속도
- `cursorLerp` — 잉크 따라옴 부드러움 (0.04 굼뜸 → 0.20 즉각)
- `cursorRadius` — 잉크 번짐 반경 (80–280px)
- `rotationDuration` — 외곽 dashed ring 회전 (counter-ring은 1.6배 느림)
- `ambientLoop` — core dot 호흡 + echo ring + scroll hint 깜빡

### 3.7 Phase A1.2.1 — 마이크로 압축 (2026-05-29)

피드백: "히어로섹션에 말이 너무 많다". 영문 3 + 한국어 echo 3 + eyebrow 1 = 7줄 → 3줄로 정리.

변경:
- `src/components/a1/Stage1Hero.tsx`
  - 한국어 echo 3줄(`KR_TEXT`) 완전 제거
  - eyebrow "Stage 1 · Mystic Hero" 제거 (placeholder 신호 폐기)
  - 영문 3줄만 carry: "Tools change. / Structure remains. / We design it."
  - `ENTRY_SILENCE = 0.5s` — 페이지 진입 후 첫 줄까지의 silence. 신비주의 결의 호흡.

검증: `npm run lint` · `npx tsc --noEmit` A1 파일 0 error.

### 3.8 Phase A1.3 — Stage 1 → 2 transition wash (2026-05-29)

산출물:
- `src/components/a1/Stage12Transition.tsx` — 40vh midnight 베이스 + inner gradient layer (linear-gradient midnight 0% → paper 65%). `viewport={{ once: true, margin: "-20%" }}` 진입 시 opacity 0→1, duration `params.stageTransition` (default 0.8s), ease `cubic-bezier(0.7, 0, 0.3, 1)` (PRD §3 stage transition). `aria-hidden` (장식). reducedMotion 시 duration 0 (즉시 paper).
- `src/app/a1/page.tsx`에 Stage1Hero ↔ Stage2Composition 사이 마운트.

설계 논거:
- MysticCursor는 Stage1Hero의 `overflow:hidden` + `position:relative` 컨테이너에 클리핑됨 → 별도 cursor blob fade out 처리 불필요. Stage 1 영역을 스크롤하여 벗어나면 자동 클리핑.
- 40vh — 호흡과 빈 공간 사이 균형. 너무 길면 사용자 피로, 너무 짧으면 morph가 갑작스러움.
- gradient stop을 0% → 65%로 둬 위쪽 midnight 호흡이 더 길게 — 잉크가 종이로 번지는 결.
- DebugPanel `Stage transition` slider (0.3–1.5s) 라이브 연동 자동 (motion-context 통해).

검증:
- `npm run lint` · `npx tsc --noEmit` A1 파일 0 error
- 라우트 `/a1` — Stage 1 mystic → 스크롤 → wash dissolve → Stage 2 paper. Stage 2 상단 `padding: 160px 24px 200px`의 paper와 매끄럽게 이어짐.

선택적 백로그:
- transition isolation harness `/a1/h/transition-12` (필요시 추가)
- scroll-linked variant (monopo.vn 원형) — 현 시간 기반과 비교 평가 후 결정

### 3.9 Phase A1.4 — Stage 2 정제 (2026-05-29)

구조 결정 (사용자 문답):
- **Stage 2**: Methodology + System을 **한 통합 블록 + thread connector**로 합침. ~50% whitespace.
- **Clients (With)**: Stage 2 → Stage 3 사이 **단독 가로 ribbon**. 90s slow marquee.

산출물:
- `src/components/v3/ClientsSection.tsx` — `LOGOS` `LogoItem` `Logo` 타입을 named export로 노출 (A1 재사용. 격리 원칙 준수: 강제 X, 재사용 가능).
- `src/components/a1/Stage2Composition.tsx` 전면 재작성:
  - 통합 헤드 "Three doors. / Four moves." + 한국어 echo "세 갈래로 들어가, 네 결로 흐릅니다."
  - 3 axes lozenge row (Architecture · Literacy · Mapping)
  - thread connector — 단일 vertical `motion.path` (height 140, `var(--a1-hairline-strong)`, `pathLength` 0→1, 1.4s)
  - 4 layers lozenge row (Signal · Judgment · Action · Record)
  - 모두 가운데 정렬, max-width 880, padding `200px 24px 240px` — `~50% empty ratio`
  - `Lozenge` 내부 컴포넌트 — PRD spec: padding `4px 12px`, mono 11px, 01/02 prefix mute
  - 시퀀스 타이밍: T_HEAD_STAGGER 0.15s · T_KR_HEAD 0.45s · T_AXES_START 0.85s · T_THREAD_START 1.25s · T_LAYERS_START 1.85s. lozenge stagger `revealStagger × 0.6`.
- `src/components/a1/Stage23ClientsRibbon.tsx` 신규:
  - paper 베이스, 위아래 hairline border
  - 90s marquee (`animationDuration: "90s"` inline override — Tailwind `animate-siriai-marquee-slow` keyframe duration 갱신)
  - mask gradient 좌우 fade
  - eyebrow "With"만 — Stage 2 통합 헤드와 톤 균형
- `src/app/a1/page.tsx` — Stage2Composition ↔ Stage23ClientsRibbon ↔ Stage3Outro 순으로 마운트
- harness `/a1/h/stage-2`는 Stage2Composition 단독 마운트 — 신규 콘텐츠 자동 반영. transition harness는 별도 생성 안 함 (Phase A1.3 백로그).

카피웍 메모:
- A안 §02 "Three ways in. / One place to begin." → A1 Stage 2 "Three doors. / Four moves." (mystic reset: 3축 + 4결 통합 흐름 함축, "갈래·결" 한국어 결과 매핑)
- A안 §03 OPERATING MODEL 코어 라벨은 Stage 2에서 폐기 — thread connector가 흐름 자체로 의미 carry. 별도 라벨 없이 미니멀.

검증:
- `npm run lint` — A1 + 수정 v3 파일 0 error (v1 OrbCanvas legacy error는 pre-existing, 빌드 무관)
- `npx tsc --noEmit` — 0 error
- 라우트: `/a1` 전체 흐름 (Hero → wash → 통합 블록 → ribbon → outro) · `/a1/h/stage-2` Stage 2 isolation

선택적 백로그 (Phase A1.4.x):
- thread connector를 단순 단일 line → **3→1→4 funnel** 구조로 진화 (3 axes에서 line 3개 가운데 수렴 → 코어 점 → 4 layers로 4개 분기). OPERATING MODEL 의미 시각화. motion.path stagger.
- Methodology head 카피 재정제 — "Three doors. / Four moves." vs "Three ways in. / Four moves on." vs 그 외. 사용자 피드백 round.
- Clients ribbon 헤드 — "With" eyebrow vs 카피 추가 vs 텍스트 0. 미니멀 방향 선택.
- transition harness `/a1/h/transition-12` 추가 (Phase A1.3 백로그 carry).

### 3.10 다음

Phase A1.5 — Stage 3 (Voice + Contact) 정제. dark inset card manifesto +
ContactForm reuse + CTA "바로 스케줄 예약하기 →" + state-aware ambient
(옵션: Stage 1 cursor blob ambient speed up 10–15%).

### 3.5 진행 원칙

- A안과 격리. A안 컴포넌트 import 가능하나 강제 X.
- 매 Phase 종료 시 본 §3에 일지 누적.
- 디버깅 하네스(`/a1/_h/*`)로 모션 파라미터 라이브 튜닝 — 빌드·새로고침 cycle 없이 결을 잡는다.

---

## 4. 다른 로컬에서 작업 재개 가이드

```bash
git clone https://github.com/dowtori/siriai-web.git
cd siriai-web
git checkout claude/redesign-homepage-premium-DiV5b   # Plan A 작업 브랜치
# git checkout claude/visual-impact-bn               # Plan B (별도 세션)
# git checkout claude/mystic-compressed-a1           # Plan A1 (본 세션 진행 중)
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
