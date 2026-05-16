# Siriai Website — Design System (v3)

> 본 문서는 v3 신규 디자인의 단일 출처(single source of truth)입니다.
> 카피·정보구조는 자매 문서 [`PRD.next.md`](./PRD.next.md)를 참조합니다.
> 작성: 2026-05-16 · 상태: **DRAFT — 옵션 선택 대기**

---

## 0. Document Map

| 챕터 | 결정 상태 |
|------|----------|
| 1. Design Principles | ✅ 결정 기반 |
| 2. Mood Board References | ✅ 결정 기반 |
| 3. Color System | 🟡 **3안 중 1안 선택 필요** |
| 4. Typography | 🟡 **영문 폰트 3안 중 1안 선택 필요** |
| 5. Layout & Grid | ✅ 결정 기반 |
| 6. Motion | 🟡 **Lenis 유지 여부 결정 필요** |
| 7. Generative Hero Spec | 🟡 **구현 옵션 3안 중 1안 선택 필요** |
| 8. Diagram System | ✅ 결정 기반 (디테일은 시안 단계) |
| 9. Components | ✅ 결정 기반 |
| 10. Accessibility | ✅ 결정 기반 |
| 11. Performance Budget | ✅ 결정 기반 |
| 12. Open Questions | 🟡 사용자 답변 필요 |

---

## 1. Design Principles

5개 원칙. 모든 디자인 결정은 이 원칙으로 회귀할 수 있어야 한다.

### P1 — Structure over decoration
> 구조가 곧 미감이다.

**Do:** 그리드·여백·정렬·계층을 시각의 1차 언어로 쓴다. 정보의 위계가 디자인의 위계와 일치한다.
**Don't:** 장식적 그래픽·아이콘·일러스트로 빈 자리를 채우지 않는다.

### P2 — Calm in the chrome, alive in the moment
> 골격은 고요하고, 모먼트는 살아 있다.

**Do:** 네비·푸터·본문 영역은 정적. 와우 모먼트(히어로, 다이어그램 활성화)는 강하게.
**Don't:** 페이지 전반에 애니메이션을 분산시키지 않는다 — 시선이 흩어진다.

### P3 — Bilingual as a single voice
> 한·영은 두 언어가 아니라 한 목소리의 두 결.

**Do:** 영문은 정체성, 한글은 의미. 둘이 같은 사상을 표현하되 서로 번역이 아니다.
**Don't:** 영문 위에 한글 자막처럼 붙이지 않는다. 한·영 페어링은 의도된 디자인 요소.

### P4 — Show the work
> 결과 아닌 과정도 보여준다.

**Do:** 방법론 다이어그램·아키텍처 다이어그램·진단 폼 같은 "작업의 산물"을 사이트의 핵심 자산으로 노출.
**Don't:** "신뢰해 주세요"라는 카피로 신뢰를 요구하지 않는다 — 작업물로 보여준다.

### P5 — Restraint as luxury
> 절제가 곧 고급감이다.

**Do:** 색은 적게, 폰트는 둘, 모션은 의도적. 비어 있는 공간은 의도된 침묵이다.
**Don't:** 그라디언트·glow·블러를 동시에 쓰지 않는다. 효과는 한 화면에 한 종류만.

---

## 2. Mood Board References

### 2.1 Reference: Twelve Labs — *적극 차용*

| 차용 요소 | 이유 |
|----------|------|
| 정직한 그리드, 큰 좌측 정렬 헤드라인 | 컨설팅 신뢰감의 시각 언어 |
| 채도 낮은 단일 액센트 컬러 | Restraint as luxury (§P5) |
| 영문 헤드 + 한글 본문 페어링 (Twelve Labs는 일본어 시장에서 같은 패턴 사용) | 한·영 페어링 원칙 (§P3) |
| 다이어그램을 콘텐츠로 사용 | Show the work (§P4) |
| 마이크로 인터랙션 (호버 라인, 작은 화살표 트랜지션) | 디테일의 일관성 |

### 2.2 Reference: Schemas of Uncertainty — *모먼트 한정 차용*

| 차용 요소 | 사용 위치 |
|----------|----------|
| 생성형 타이포그래피, 글자 단위 morph | **히어로 단 1곳** (§7) |
| 어두운 캔버스 위의 미세한 빛 입자 | **System 다이어그램 활성화 모먼트** (§8.2) |

| 차용하지 않는 요소 | 이유 |
|------------------|------|
| 추상 아트워크가 콘텐츠를 대체하는 구조 | 컨설팅 정체성 약화 |
| 스토리텔링 인터랙티브 long-form | 의사결정자가 5초 안에 평가하는 사이트가 아님 |
| 풀스크린 generative 배경 | 시선 분산, P2 위배 |

### 2.3 Reference: Cosmos.so — *명시적 회피*

| 회피 요소 | 이유 |
|----------|------|
| 큐레이션 그리드 (이미지가 콘텐츠) | Siriai는 갤러리가 아닌 컨설팅사. 시각 카탈로그가 신뢰의 원천이 아님. |
| 마우스 hover 줌·시프트 효과의 빈도 | 장식적이고 카피 우선 정체성과 충돌 |
| 에디토리얼 타이포의 세리프 dominance | 테크 정체성과 거리 |

### 2.4 추가 검토 권장 레퍼런스 (Phase C 전 사용자 검토 요청)

다음 사이트들도 함께 보고 차용/회피를 결정하면 좋음 (사용자에게 공유 권장):
- **Linear** (linear.app) — 어두운 톤, 미세 그라디언트, 절제된 그리드. Twelve Labs와 결이 가까움.
- **Vercel** (vercel.com) — 한 액센트 컬러(검정+한 색)로 시스템을 끌고 가는 방식.
- **Anthropic** (anthropic.com) — 베이지 톤 + 세리프 디스플레이 + 산세리프 본문 페어링. Siriai 크림 톤과 비교 가치.
- **Stripe** (stripe.com/sessions/2024) — 다이어그램을 콘텐츠 자산으로 끌고 가는 가장 강한 사례.

---

## 3. Color System

### 3.1 결정 필요 — 3안 비교

| 안 | 배경(라이트) | 배경(다크) | 액센트 | 인상 | 추천도 |
|---|------------|----------|-------|------|-------|
| **A. v2 계승** | `#F4F1EB` 크림 | `#0A0A0A` 잉크 블랙 | `#c4b5fd` 라벤더 | 따뜻한 베이지 + 미감적 보라. v2 일관성. | ⭐⭐ |
| **B. Twelve Labs형** | `#FAFAF7` 본 화이트 | `#0E0E0E` 잉크 | `#E8E8E3` 본 그레이 + `#3C3C3C` 차콜 (액센트 사실상 무채색) | 절제 극대화. 무채색 + 단 1색의 미세 색조. 매우 하이엔드. | ⭐⭐⭐ |
| **C. 베이지 + 딥블루** | `#EFE9DD` 페이퍼 | `#0F1419` 미드나이트 블루 | `#2B3A4A` 슬레이트 + `#9CA3AF` 콜드 그레이 | Anthropic·Linear의 차분함. 베이지의 인간미 + 블루의 전문성. | ⭐⭐⭐ |

> 추천: **B 또는 C**. A는 v2와의 시각 차별이 약함. 둘 중에서는 **C**가 "베이지의 따뜻함"이라는 Siriai 자산을 유지하면서 차별화가 명확.

### 3.2 Semantic Tokens (안 확정 후 채움)

```css
:root {
  /* Surface */
  --surface-base:        /* light bg */
  --surface-raised:      /* 카드, 0.5~2% 어둡게 */
  --surface-inverse:     /* dark sections */

  /* Foreground */
  --fg-default:          /* 본문 검정 */
  --fg-muted:            /* 보조 텍스트, 60% opacity 또는 별도 색 */
  --fg-on-inverse:       /* 다크 섹션의 본문 */
  --fg-on-inverse-muted: /* 다크 섹션의 보조 */

  /* Lines */
  --line-default:        /* rgba(0,0,0,0.08) 또는 별도 */
  --line-strong:         /* hover/focus 시 */
  --line-on-inverse:     /* 다크 섹션의 라인 */

  /* Accent */
  --accent:              /* 안 선택 시 결정 */
  --accent-fg:           /* accent 위 텍스트 */

  /* Interaction */
  --focus-ring:          /* 키보드 포커스 */
  --selection-bg:        /* ::selection */
}
```

### 3.3 Dark sections vs Dark mode

- **다크 섹션**(§03 System, §05 Voice 등)은 디자인의 일부. 의도된 배치.
- **다크 모드(시스템 prefers-color-scheme)**: 이번 v3에서는 **지원하지 않음**. 라이트가 정본.

### 3.4 Color Usage Rules

1. 한 화면에 액센트는 최대 1점. 액센트가 두 군데 보이면 위계가 무너진 것.
2. 그라디언트는 히어로 generative 캔버스 내부에만. 페이지 다른 곳에서 그라디언트 배경 금지.
3. 다크 ↔ 라이트 섹션 전환은 즉각적(스크롤 진행과 함께 자연 노출). 모핑·페이드 X.

---

## 4. Typography

### 4.1 결정 필요 — 영문 폰트 3안

| 안 | 폰트 | 라이선스 | 인상 | 추천 |
|---|------|---------|------|------|
| **A. Geist Sans** (Vercel) | Geist Sans + Geist Mono | OFL, 무료 | 모던 산세리프, 모노 페어 완비. 테크 정체성. | ⭐⭐ |
| **B. Inter** | Inter | OFL, 무료 | 가장 안전한 산세리프. 매우 광범위. 차별화 약함. | ⭐ |
| **C. Pretendard만 사용** (한·영 모두) | Pretendard Variable | OFL, 무료 | 한 폰트로 한·영 통합. 시각 일관성 극대화. 단, 영문 캐릭터가 한국어 산세리프 결. | ⭐⭐ |
| **D. PP Neue Montreal** (Pangram Pangram) | 유료 ($150~) | 하이엔드 BX 표준. Schemas류 결과 매우 잘 어울림. | ⭐⭐⭐ |

> 추천: **D (PP Neue Montreal)** — 예산 허용 시. 라이선스 부담 시 **A (Geist)**.
> 한글은 **Pretendard Variable** 유지 (v2에서 검증됨, 가중치 조절 정밀).

### 4.2 Type Scale (clamp 기반, 6단계)

| 토큰 | clamp | 용도 |
|------|-------|------|
| `--text-display` | `clamp(3rem, 6vw, 6rem)` | 히어로 전용 |
| `--text-h1` | `clamp(2.25rem, 4vw, 3.75rem)` | 섹션 헤드라인 |
| `--text-h2` | `clamp(1.5rem, 2.5vw, 2.25rem)` | 서브 헤드 |
| `--text-body-lg` | `clamp(1.0625rem, 1.2vw, 1.25rem)` | 본문 강조 |
| `--text-body` | `1rem` | 본문 |
| `--text-caption` | `0.8125rem` | 캡션, 라벨 본문 |
| `--text-eyebrow` | `0.6875rem` (11px) | Eyebrow 라벨, `letter-spacing: 0.22em`, uppercase |

### 4.3 Usage Rules

| 위치 | 폰트 | 굵기 | 행간 |
|------|------|------|------|
| Display (영문) | 영문폰트 | 500 또는 600 (선택안에 따라) | 1.05 |
| H1 (영문) | 영문폰트 | 600 | 1.1 |
| H1 (한글) | Pretendard | 700 | 1.25 |
| Body (한글) | Pretendard | 400 또는 500 | 1.75 |
| Body (영문, 본문 안의 영문 단어) | 영문폰트 | 400 | 1.75 |
| Eyebrow | 영문폰트 | 500 | 1.0, tracking 0.22em |
| Mono (필요 시) | Geist Mono 또는 IBM Plex Mono | 400 | 1.5 |

> `wordBreak: keep-all` 전역. 한국어 줄바꿈 손상 방지.

---

## 5. Layout & Grid

### 5.1 Container & Grid

| 토큰 | 값 |
|------|---|
| `--container-max` | `1320px` |
| `--container-padding-x` | `clamp(20px, 5vw, 64px)` |
| `--grid-cols` | 12 |
| `--grid-gutter` | `clamp(16px, 1.5vw, 24px)` |

### 5.2 Vertical Rhythm

| 토큰 | 값 | 사용처 |
|------|---|--------|
| `--section-py` | `clamp(96px, 12vw, 192px)` | 일반 섹션 상하 패딩 |
| `--section-py-tight` | `clamp(64px, 8vw, 128px)` | Stance, Voice 같은 짧은 섹션 |
| `--section-py-hero` | `100svh` 또는 `100vh` | 히어로 전용 |

### 5.3 Section Anatomy (표준)

```
┌─────────────────────────────────────┐
│  [eyebrow]  01 — SECTION NAME       │  ← 12px eyebrow + line
├─────────────────────────────────────┤
│                                     │
│  [headline EN]                      │  ← H1 (영문)
│  [headline KR]                      │  ← H1 (한글, 50~70% opacity 또는 별도 색)
│                                     │
│  [body / diagram / cards]           │  ← 콘텐츠 영역
│                                     │
│                              [CTA]  │  ← 우측 정렬 (선택)
└─────────────────────────────────────┘
```

이 anatomy를 7개 섹션 모두에 일관 적용. 단 Hero(§00)와 Voice(§05)는 중앙 정렬 변형 허용.

---

## 6. Motion

### 6.1 Tokens

| 토큰 | 값 |
|------|---|
| `--ease-out-quart` | `cubic-bezier(0.16, 1, 0.3, 1)` (v2 계승) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--duration-fast` | `200ms` (hover, focus) |
| `--duration-base` | `400ms` (진입) |
| `--duration-slow` | `800ms` (히어로 type morph) |
| `--stagger` | `60ms` (줄·아이템 간격) |

### 6.2 결정 필요 — Lenis 유지 여부

| 옵션 | 장 | 단 | 추천 |
|------|---|---|-----|
| **Lenis 유지 (v2 계승)** | 부드러운 모멘텀 = 프리미엄 감 | JS 비용, 접근성/스크롤 도구와 충돌, 모바일 fps 부담 | ⭐ |
| **Lenis 제거, 네이티브 스크롤** | 가볍고 정직. 키보드/스크린 리더 자연 동작. Twelve Labs·Linear가 사용하는 방식. | "모멘텀의 부드러움" 일부 손실 | ⭐⭐⭐ |
| **CSS `scroll-behavior: smooth` 만 사용** | 비용 거의 0, 앵커 점프만 부드럽게 | 일반 스크롤은 그대로 | ⭐⭐ |

> 추천: **Lenis 제거**. 하이엔드 사이트의 트렌드는 "네이티브 스크롤 + 미세 진입 모션"으로 회귀 중. v2의 Lenis 1.55는 무거운 편이라 모바일에서 손실이 큼.

### 6.3 Scroll-linked motion 사용처 (전체 사이트에서 단 2곳)

1. **§00 Hero** — 텍스트 generative morph (자체 RAF 또는 useScroll)
2. **§03 System** — Diagram B의 레이어 순차 활성화

그 외 섹션은 **단방향 진입 모션만**: `useInView({ once: true, margin: "-10%" })` + opacity + 미세 y 이동 (-16~-24px).

### 6.4 Don't list

- ❌ 패럴랙스 배경 이미지 (Creator형) — v3에서 제거
- ❌ Sticky pin 280vh 구간 (Philosophy형) — v3에서 제거
- ❌ Section exit fade-out — v3에서 제거 (자연 스크롤이 본질)
- ❌ Section indicator dot rail의 색 변형 — 단순화 또는 제거(§12 Open Q)

---

## 7. Generative Hero Spec

### 7.1 Concept

> "Architecture for thinking with AI" 문장이 **조립과 해체를 반복**하며 살아 있다. 글자는 좌측에서 흘러들어와 정렬되고, 잠시 머문 뒤 다시 분해되어 흩어졌다가 다른 정렬로 재조립된다.

핵심 정서: **사고의 구조가 형성되는 순간**. 추상이지만 문장의 의미와 직결.

### 7.2 결정 필요 — 구현 옵션 3안

| 안 | 기술 | 장 | 단 | 추천 |
|---|------|---|---|------|
| **A. Canvas 2D 텍스트 파티클** | `<canvas>` + `requestAnimationFrame`, 폰트 캐릭터를 픽셀 샘플링 후 점으로 분해 | 가장 가벼움 (50~80KB), 모바일 fps 안정, 접근성 친화(텍스트 fallback 쉬움) | 글자 정밀도는 점 밀도에 좌우 | ⭐⭐⭐ |
| **B. Three.js + MSDF 텍스트** | three.js + `troika-three-text` 또는 MSDF, GPU 인스턴싱 | 글자 가장 선명, 3D 회전·깊이 가능 | 번들 큼 (300KB+), 모바일 부하 | ⭐⭐ |
| **C. SVG morph + GSAP** | SVG path morph, `gsap.MorphSVGPlugin` | 정밀하고 vector | 모핑 path 수 많아지면 비용 큼, GSAP MorphSVG 유료 | ⭐ |

> 추천: **A (Canvas 2D 텍스트 파티클)**. 가볍고, 모바일 안전하며, 접근성 fallback이 자연스럽다.
> 단, v2가 이미 `@react-three/fiber`를 도입했으므로 **B**도 코드베이스 일관성 면에서 고려 가능.

### 7.3 Behavior Detail

```
t=0       모든 글자가 화면 좌측 바깥에서 점 군집으로 대기
t=0.4s    글자들이 우측으로 흘러들어와 "Architecture for thinking with AI" 정렬
t=2.5s    완성된 상태로 머묾, 마우스 위치에 따라 글자가 미세하게 따라옴 (±4px)
t=6s      글자가 다시 점으로 분해되어 짧게 흩어짐
t=7s      재정렬: 같은 문장이 약간 다른 줄바꿈/자간으로 재조립
무한 반복, 변주 5종 (줄바꿈 위치, 자간, 정렬)
```

### 7.4 Fallback

| 조건 | Fallback |
|------|---------|
| `prefers-reduced-motion: reduce` | 정적 텍스트 1프레임만 노출 |
| 모바일 (`< 768px`) | 정적 + 매우 미세한 진입 stagger만 (모션 없음) |
| WebGL 미지원 (옵션 B 선택 시) | Canvas 2D 또는 정적으로 graceful degradation |
| JS 비활성 | `<noscript>` 안에 평문 텍스트 (SEO·접근성) |

### 7.5 Accessibility

- 캔버스 뒤에 동일한 텍스트를 `aria-hidden=false`인 평문 `<h1>`으로 둔다 (시각적으로는 visually-hidden 또는 캔버스 위에 오버레이로 noselect 처리).
- 스크린 리더는 평문 `<h1>`를 읽는다.
- 키보드 포커스 진입 시 모션 즉시 정지(`prefers-reduced-motion` 미적용 사용자라도 의도된 안전장치).

---

## 8. Diagram System

다이어그램은 Siriai의 **핵심 콘텐츠 자산**. 장식이 아니다 (§P4).

### 8.1 Diagram A — Methodology Triad (PRD §02용)

**Goal:** Architecture × Literacy × Operation 3축이 하나의 운영 모델로 맞물림.

**Visual grammar:**
- 삼각형 또는 삼중 동심원 — 시안 단계에서 결정
- 각 축은 **굵은 라인(2px)** 으로 표현, 노드는 작은 점(8px) 또는 라벨만
- 가운데에 작은 텍스트 "Operating Model" 또는 빈 중심 (의도된 공간)
- 색: 무채색 라인 + 활성 축 1개만 액센트 컬러

**Motion:**
- 진입 시 라인이 stroke-dasharray로 순차 드로우 (Architecture → Literacy → Operation 순)
- 호버 또는 인뷰 진행에 따라 한 축씩 액센트 점등
- 1.2초 완료, 한 번만 (loop 없음)

### 8.2 Diagram B — System Architecture (PRD §03용)

**Goal:** "이런 운영 구조를 만든다"의 실체 노출.

**Visual grammar:**
- 4개 가로 레이어: **Signal → Judgment → Action → Record** (Open Q §12-4에서 명칭 확정)
- 각 레이어 안에 노드 3~5개 (둥근 사각형, 1px 라인, 라벨 영문 + 한글 옵션)
- 레이어 간 엣지: 곡선 또는 직각 라인, 화살표 미세
- 좌측에 레이어 이름(영문) 큰 라벨, 우측에 한국어 한 줄 설명
- 색: 다크 배경 + 무채색 노드 + 액티브 레이어만 액센트

**Motion (scroll-linked, 사이트에서 단 2개 scroll-linked 중 하나):**
- 스크롤 진행률에 따라 레이어가 위→아래로 순차 점등
- 각 레이어 점등 시 노드 내부 dot이 미세히 깜빡임(생체감)
- 진행률 100% 도달 후 전체가 정적으로 머묾

**Source:**
- SVG 단일 파일로 작성 (`public/diagrams/system.svg` 또는 React 컴포넌트로 인라인)
- 실제 클라이언트 사례의 **추상화 버전** — NDA 우회 + 컨셉 전달 동시 충족

### 8.3 Diagram Don'ts

- ❌ 입체감(섀도우, 3D 변환)
- ❌ 아이콘으로 노드를 치환 (텍스트만)
- ❌ 컬러 카테고리 인덱싱 (각 노드마다 다른 색) — 한 액센트 원칙 위배
- ❌ Mermaid·Excalidraw 결과물을 그대로 사용 (직접 디자인)

---

## 9. Components

### 9.1 Navigation

| 상태 | 사양 |
|------|------|
| Default | 상단 고정, 높이 `72px`, 배경 `transparent` |
| Scrolled (>40px) | 높이 `56px`, `backdrop-filter: blur(12px)`, 배경 `rgba(surface-base, 0.7)` |
| 내용 | 좌: 로고 워드마크 / 우: `Services` `Voice` `Contact` (3개 링크) |
| 한·영 | 영문 라벨 단독. 한글 미병기 (네비는 예외) |
| 모바일 | 햄버거 → 풀스크린 오버레이. 오버레이는 한·영 병기. |

### 9.2 Button

| 종류 | 사양 |
|------|------|
| Primary | 검정 배경, 흰 텍스트, `padding: 14px 24px`, border-radius `0px` (각진 형태). 호버 시 미세 좌측→우측 라인 fill. |
| Ghost / Link | 무배경, 텍스트 + 우측 `→` 화살표. 호버 시 화살표 4px 이동. |
| Disabled | opacity 0.4, pointer-events none |

> 모든 버튼 텍스트는 영문(짧은 동사구) + 옆에 한글 보조 (선택). CTA에서는 영문·한글 두 줄 병기.

### 9.3 Input (Contact)

| 상태 | 사양 |
|------|------|
| Default | bottom-line만 (border `1px` `--line-default`), 배경 없음, padding `12px 0` |
| Focus | bottom-line 두께 `2px` + 액센트 컬러 |
| Filled | 라벨이 작아져 input 위로 이동 (Material 스타일 변형) |
| Error | bottom-line 빨간색(접근성 색), 인라인 메시지 한글 |

### 9.4 Tag / Eyebrow

`text-eyebrow` 사이즈 (11px), tracking 0.22em, uppercase, 좌측에 12px 길이 라인 prefix.
예: `─ 01 — METHODOLOGY`

### 9.5 Card (Services §04)

| 상태 | 사양 |
|------|------|
| Default | 배경 `--surface-raised`, padding `40px`, border `1px` `--line-default` |
| Hover | border `--line-strong`, 카드 안 `→` 화살표 4px 이동 |
| 내부 | 상단 영문 모드명 (H2) / 한글 부제 / 1줄 정의 / 포함 사항 3개 (• 아닌 짧은 라인) / 하단 우측 `→ Inquire` |

### 9.6 ScrollProgressBar (v2 계승, 단순화)

- 상단 1px (v2 1.5px → 1px), `--accent` 컬러
- 스프링 물리 유지 (`stiffness: 180, damping: 28`)
- z-index 위계는 모달 < ProgressBar < Toast

### 9.7 SectionIndicator (재검토 — Open Q §12-2)

v2는 우측 도트 레일 11개. v3에서는:
- **옵션 A** — 제거 (Twelve Labs·Linear 방식)
- **옵션 B** — 단순화: 점 표시 없이 우측 하단에 작은 텍스트 `02 / 07` 페이지네이션 스타일
- **옵션 C** — 유지하되 시각 단순화 (도트만, 라벨 hover 시에만)

> 디자인 일관성과 P5(절제)를 고려할 때 **A 또는 B 추천**.

---

## 10. Accessibility

| 항목 | 정책 |
|------|------|
| 명도 대비 | 본문 4.5:1 이상, 대형 텍스트 3:1 이상 (WCAG AA) |
| 포커스 가시화 | 모든 인터랙티브 요소에 `:focus-visible` outline `2px` `--focus-ring` + `outline-offset: 2px` |
| 키보드 내비 | 모든 링크·버튼·폼 tab 순서 자연. 스킵 링크(`Skip to content`) 페이지 첫 요소 |
| Reduced motion | `prefers-reduced-motion: reduce` 시 generative·scroll-linked·진입 모션 모두 비활성, 정적 노출 |
| 스크린 리더 | 모든 다이어그램은 `<figure>` + `<figcaption>` 한국어 설명. 캔버스 히어로는 동일 텍스트 평문 병행 |
| alt 텍스트 | 장식 이미지는 `alt=""`, 콘텐츠 이미지는 한국어 한 문장 |
| 폼 | 라벨은 `<label htmlFor>`. placeholder는 라벨 대체 아님 |
| 언어 속성 | `<html lang="ko">`, 영문 헤드라인은 `<span lang="en">` 마크업 |

---

## 11. Performance Budget

| 메트릭 | 목표 | 현재 (v2 기준) | 비고 |
|--------|------|--------------|------|
| LCP (모바일 4G) | < 2.0s | 측정 필요 | 히어로 폰트·캔버스 비동기 |
| CLS | < 0.05 | 측정 필요 | 폰트 swap 시 fallback 메트릭 매칭 |
| INP | < 200ms | 측정 필요 | |
| TBT | < 200ms | 측정 필요 | |
| 초기 JS (gzip, 모바일) | < 200KB | 측정 필요 | 히어로 generative 모듈 코드 스플릿 |
| 초기 CSS (gzip) | < 30KB | - | Tailwind v4 purge 활용 |
| 폰트 | 한글 서브셋 + 영문 latin만 | Pretendard 5 weight import | 가변 폰트(Variable)로 전환해 weight 통합 검토 |
| 이미지 | next/image, AVIF, lazy | - | Hero·다이어그램은 SVG 우선 |
| WebGL 비용 | 옵션 B 선택 시에만 발생 | OrbCanvas 활성 | 안 A 선택 시 거의 0 |

### Budget Guard

- Lighthouse CI를 PR마다 실행해 위 임계 미달 시 빌드 경고 (Phase D에서 설정)

---

## 12. Open Questions

Phase C 리뷰에서 답을 받아 본 문서에 채워 넣을 항목:

1. **컬러 안** A/B/C 중 어느 것? (§3.1)
2. **영문 폰트** A/B/C/D 중 어느 것? (§4.1) — D 선택 시 라이선스 예산 확보 필요
3. **Lenis** 유지/제거? (§6.2)
4. **히어로 generative** A/B/C 중 어느 것? (§7.2)
5. **SectionIndicator** A/B/C 중 어느 것? (§9.7)
6. **추가 레퍼런스** (Linear, Vercel, Anthropic, Stripe) 중 차용/회피로 포함할 것 있는지 (§2.4)

> PRD의 Open Questions(섹션 06 폼 노출, 다이어그램 레이어 이름 등)는 [`PRD.next.md` §8](./PRD.next.md#8-open-questions) 참조.

---

## Cross-references

- 정보구조·카피·섹션 스펙 → [`PRD.next.md`](./PRD.next.md)
- v2 디자인 시스템 (참고용 보존) → [`PRD.md` §디자인 시스템](./PRD.md)
- 프로젝트 운영 컨텍스트 → [`CLAUDE.md`](./CLAUDE.md), [`AGENTS.md`](./AGENTS.md)
