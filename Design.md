# Siriai Website — Design System (v3)

> 본 문서는 v3 신규 디자인의 단일 출처(single source of truth)입니다.
> 카피·정보구조는 자매 문서 [`PRD.next.md`](./PRD.next.md)를 참조합니다.
> 작성: 2026-05-16 · 상태: **DRAFT — 옵션 선택 대기**

---

## 0. Document Map

| 챕터 | 결정 상태 |
|------|----------|
| 1. Design Principles | ✅ 결정 기반 |
| 2. Mood Board References | ✅ Anthropic 추가 차용 확정 |
| 3. Color System | ✅ **C안 (베이지 + 딥블루) 확정** |
| 4. Typography | ✅ **Pretendard Variable 단독 + 토큰 추상화** |
| 5. Layout & Grid | ✅ 결정 기반 |
| 6. Motion | ✅ **Lenis 제거 확정** |
| 7. Generative Hero Spec | ✅ **Canvas 2D 텍스트 파티클 확정** |
| 8. Diagram System | ✅ 결정 기반 (디테일은 시안 단계) |
| 9. Components | ✅ **SectionIndicator 제거 확정** |
| 10. Accessibility | ✅ 결정 기반 |
| 11. Performance Budget | ✅ 결정 기반 |
| 12. Open Questions | ✅ 전건 해결 (Phase C) |

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

### 2.4 추가 차용 레퍼런스 — *적극 차용 (Phase C 추가 확정)*

#### Anthropic (anthropic.com)

**왜 차용하는가:** §3.1 컬러 C안(베이지 + 딥블루)과 정합성 매우 높음. Anthropic의 베이지 톤 + 차분한 색 + 신중한 카피 톤은 Siriai의 컨설팅 정체성과 결이 매우 가깝다.

| 차용 요소 | 적용 위치 |
|----------|----------|
| 베이지 톤 위 무거운 헤드라인 + 절제된 본문 페어링 | 전 섹션 표준 anatomy (§5.3) |
| "신중한·연구 기반" 톤의 카피 voice | PRD §2.3 Tone of Voice |
| 좌측 정렬 헤드 + 우측 정렬 보조 텍스트의 1:1 시각 균형 | Hero(§7), Methodology(§8.1) |
| 단색 라인 일러스트·다이어그램(아이콘 X) | Diagram A, B 시각 문법 (§8) |

**차용하지 않는 요소:**
- Anthropic의 세리프 디스플레이 폰트 — Siriai는 Pretendard 단독(§4)
- 길게 풀어쓴 에디토리얼 단락 — Siriai는 선언적 단문

#### 후속 차기 검토 (이번 v3 비차용)

Linear / Vercel / Stripe Sessions — 결정 단계에서 차용 제외. 차기 페이지(Portfolio, Case Studies) 디자인 시 재검토 후보로 남김.

---

## 3. Color System

### 3.1 Palette — *C안 확정: 베이지 + 딥블루*

| 역할 | 토큰 | Hex | 설명 |
|------|------|-----|------|
| 라이트 배경 | `--surface-base` | `#EFE9DD` | 페이퍼. 종이의 따뜻한 베이지. |
| 라이트 카드/구분 | `--surface-raised` | `#E8E1D2` | base보다 2~3% 어두움. 카드·구분면. |
| 다크 배경 | `--surface-inverse` | `#0F1419` | 미드나이트 블루. 검정 아닌 깊은 청 |
| 본문 (light 위) | `--fg-default` | `#0F1419` | 미드나이트와 동일 — 의도된 미러링 |
| 보조 (light 위) | `--fg-muted` | `#5E6470` | 슬레이트 그레이 |
| 본문 (dark 위) | `--fg-on-inverse` | `#EFE9DD` | 페이퍼 색 — 동일 미러링 |
| 보조 (dark 위) | `--fg-on-inverse-muted` | `#9CA3AF` | 콜드 그레이 |
| 액센트 | `--accent` | `#2B3A4A` | 슬레이트. 채도 낮고 무거운 청. |
| 액센트 (dark 위) | `--accent-on-inverse` | `#C7CFD8` | dark 배경에서 떠오르는 슬레이트 |

> 정신: **검정을 쓰지 않는다.** 모든 어두움은 미드나이트 블루 계열. 베이지 페이퍼 위의 미드나이트 텍스트가 종이·잉크의 메타포를 형성. Anthropic 결과 정합.

### 3.2 Semantic Tokens — *전 hex 채움*

```css
:root {
  /* Surface */
  --surface-base:          #EFE9DD;   /* paper */
  --surface-raised:        #E8E1D2;   /* card, divider, sunken */
  --surface-inverse:       #0F1419;   /* midnight blue (dark sections) */

  /* Foreground */
  --fg-default:            #0F1419;   /* body on paper */
  --fg-muted:              #5E6470;   /* secondary on paper */
  --fg-on-inverse:         #EFE9DD;   /* body on midnight */
  --fg-on-inverse-muted:   #9CA3AF;   /* cold grey on midnight */

  /* Lines */
  --line-default:          rgba(15, 20, 25, 0.08);
  --line-strong:           rgba(15, 20, 25, 0.18);
  --line-on-inverse:       rgba(239, 233, 221, 0.12);
  --line-on-inverse-strong:rgba(239, 233, 221, 0.24);

  /* Accent — luxury restraint, 1점만 노출 */
  --accent:                #2B3A4A;   /* slate */
  --accent-fg:             #EFE9DD;   /* paper on slate */
  --accent-on-inverse:     #C7CFD8;   /* lifted slate on midnight */

  /* Interaction */
  --focus-ring:            #2B3A4A;
  --selection-bg:          rgba(43, 58, 74, 0.15);
  --selection-fg:          #0F1419;
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

### 4.1 Font Stack — *Pretendard Variable 단독 + 토큰 추상화*

**결정 (Phase C, D2):**
- 초기 빌드는 **Pretendard Variable** 한 폰트로 한·영 통합
- **단, 추후 유료 영문 폰트(PP Neue Montreal 등)로 무중단 swap이 가능하도록 토큰을 추상화**

#### 4.1.1 폰트 토큰 구조

```css
/* globals.css */
:root {
  /* Override-friendly font tokens
     기본은 Pretendard Variable. 추후 유료 폰트 도입 시
     :root에 *-override 변수만 정의하면 전 사이트가 swap됨. */

  --font-display: var(--font-display-override, "Pretendard Variable",
                      -apple-system, BlinkMacSystemFont, sans-serif);
  --font-sans:    var(--font-sans-override,    "Pretendard Variable",
                      -apple-system, BlinkMacSystemFont, sans-serif);
  --font-mono:    var(--font-mono-override,    "IBM Plex Mono",
                      ui-monospace, "SF Mono", monospace);
}

/* ────────────────────────────────────────────────
   추후 유료 폰트 swap 예시 (도입 시 globals.css에 추가):

:root {
  --font-display-override: "PP Neue Montreal", "Pretendard Variable";
  --font-sans-override:    "PP Neue Montreal", "Pretendard Variable";
}

   별도 @font-face 정의로 PP Neue Montreal woff2 로드. 한글 글리프는
   Pretendard 폴백이 자동 처리 (영문 폰트는 한글 미포함).
   ──────────────────────────────────────────────── */
```

#### 4.1.2 빌드업 원칙

1. **모든 컴포넌트는 `var(--font-display)` 또는 `var(--font-sans)`만 사용**. `"Pretendard"` 하드코딩 금지.
2. 폰트페이스(`@font-face` import) 정의는 **`globals.css` 한 곳에만** 집중. 컴포넌트 파일에서 폰트 직접 import 금지.
3. 한글은 항상 Pretendard 폴백을 통해 처리됨 — 영문 전용 유료 폰트는 한글 글리프를 정의하지 않으므로 자동으로 Pretendard로 폴백.
4. 영문 폰트 swap 시점: 내부 승인 + 라이선스 확보 + Phase D 빌드업 완료 이후. 별도 한 줄 PR로 처리 가능.

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

한 폰트(Pretendard Variable) 기준으로 단순화. 한·영 모두 동일 폰트, 굵기·자간으로만 위계.

| 위치 | 폰트 토큰 | 굵기 | 행간 | 자간 |
|------|----------|------|------|------|
| Display (영문 헤로) | `--font-display` | 500 | 1.05 | -0.02em |
| H1 (영문) | `--font-display` | 600 | 1.10 | -0.02em |
| H1 (한글) | `--font-sans` | 700 | 1.25 | 0 |
| H2 | `--font-sans` | 600 | 1.20 | -0.01em (영) / 0 (한) |
| Body | `--font-sans` | 400 (강조 500) | 1.75 | 0 |
| Eyebrow | `--font-sans` | 500 | 1.0 | 0.22em (uppercase) |
| Mono (필요 시) | `--font-mono` | 400 | 1.5 | 0 |

> `wordBreak: keep-all` 전역. 한국어 줄바꿈 손상 방지.
> 영문 유료 폰트 swap 시 영문 굵기(500/600)는 해당 폰트 메트릭에 맞춰 1단계 가감 검토.

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

### 6.2 Smooth Scroll Policy — *Lenis 제거 확정*

**결정 (Phase C, D3): Lenis 제거. 네이티브 스크롤 + 미세 진입 모션.**

근거:
- v2의 Lenis(`duration: 1.55`)는 JS 비용·접근성 도구 충돌·모바일 fps 부담이 큼
- Twelve Labs·Linear·Anthropic 모두 네이티브 스크롤 사용
- "모멘텀 부드러움"은 일부 손실되나, 진입 애니메이션의 정밀도로 충분히 보상

구현 정책:
- `globals.css`에 `html { scroll-behavior: smooth; }` — 앵커 점프만 부드럽게
- 진입 애니메이션은 `useInView` + framer-motion으로 처리 (Lenis 의존성 없음)
- ScrollProgressBar의 `useScroll` 훅은 윈도우 네이티브 스크롤에서 정상 동작

Phase D 의존성 정리:
- 제거 대상: `@studio-freight/lenis`, `lenis`
- 삭제 또는 `/v1` 이동: `src/components/SmoothScroll.tsx`

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

### 7.2 Implementation — *Canvas 2D 텍스트 파티클 확정*

**결정 (Phase C, D4): Canvas 2D 텍스트 파티클.**

#### 구현 개요

1. 오프스크린 `<canvas>`에 문자열(`"Architecture for thinking with AI"`)을 큰 폰트로 한 번 렌더
2. `ctx.getImageData()`로 픽셀 샘플링 → 비투명 픽셀 좌표 배열 추출 (3~5px 간격)
3. 각 좌표를 파티클 객체(`{x, y, targetX, targetY, vx, vy}`)로 변환
4. RAF 루프에서 spring 보간으로 target 위치로 수렴, 마우스 위치 ±4px 끌림 적용
5. 5종 변주(줄바꿈/자간) 사이를 페이지 활성 동안 순환

#### 파라미터

| 항목 | 값 |
|------|---|
| 파티클 수 (데스크톱) | 1,500~3,000 |
| 파티클 수 (모바일) | 500~1,000 |
| 파티클 크기 | 1.5px (rgba slate, 0.85 opacity) |
| spring stiffness | 0.08 |
| spring damping | 0.86 |
| 변주 dwell | 2.5s (조립 머묾) + 1s (분해) + 1s (재조립) |
| 마우스 끌림 반경 | 160px |
| 마우스 끌림 강도 | 4px |

#### 번들·의존성

- **외부 라이브러리 없이 vanilla TypeScript로 구현** (50KB 미만 추정)
- three.js, troika-three-text, GSAP, MorphSVG 모두 **불필요**

#### Phase D 의존성 정리 (Lenis 제거와 함께 진행)

- 제거 후보 (v3 미사용): `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `gsap`, `@gsap/react`
- v1 라우트가 별도 청크로 코드 스플릿되면 위 패키지 유지 가능. 단 메인 번들에는 포함 안 됨.
- v2의 `OrbCanvas.tsx`는 `/v1`로 이동(Phase D), v3 진입점에서는 import 없음.

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

### 9.7 SectionIndicator — *제거 확정*

**결정 (Phase C, D5): v3에서 제거.**

근거:
- P5(절제) 원칙. 7개 섹션 사이트에서 우측 도트 레일은 시각 노이즈.
- 위치 인지 신호는 `ScrollProgressBar`(상단 1px) 단독으로 충분.
- Twelve Labs·Linear·Anthropic 등 참조 사이트 모두 동일 결정.

v2의 `src/components/SectionIndicator.tsx`는 Phase D에서 `/v1`로 이동. v3 메인 코드에서는 import 없음.

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

**All resolved in Phase C.** 전체 결정 로그는 plan 파일 `/root/.claude/plans/transient-nibbling-rabbit.md` 참조.

요약:
- 컬러 → **C안 (페이퍼 #EFE9DD + 미드나이트 #0F1419 + 슬레이트 #2B3A4A)** — §3 반영
- 폰트 → **Pretendard Variable 단독 + 토큰 추상화** (PP Neue Montreal 등 무중단 swap 가능) — §4 반영
- Lenis → **제거**, 네이티브 스크롤 + `scroll-behavior: smooth` — §6.2 반영
- 히어로 generative → **Canvas 2D 텍스트 파티클** (외부 라이브러리 0) — §7.2 반영
- SectionIndicator → **제거** — §9.7 반영
- 추가 차용 레퍼런스 → **Anthropic만** — §2.4 반영

차기 단계(다크 모드 자동 전환, 추가 페이지 디자인, i18n 라우팅, CMS 연동 등) 결정이 필요한 시점에 본 챕터에 재개항한다.

> PRD 결정(인라인 폼·신규 매니페스토·Siriai 단독 영문명·진단 가격 정책)은 [`PRD.next.md` §8](./PRD.next.md#8-open-questions) 참조.

---

## Cross-references

- 정보구조·카피·섹션 스펙 → [`PRD.next.md`](./PRD.next.md)
- v2 디자인 시스템 (참고용 보존) → [`PRD.md` §디자인 시스템](./PRD.md)
- 프로젝트 운영 컨텍스트 → [`CLAUDE.md`](./CLAUDE.md), [`AGENTS.md`](./AGENTS.md)
