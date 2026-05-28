# PRD A1 — Mystic Compressed

> 트랙: **A1** (A안 sibling) · 작성: 2026-05-28
> 베이스 브랜치: A안 HEAD `claude/redesign-homepage-premium-DiV5b @ 7bb9263`
> 본 작업 브랜치: `claude/mystic-compressed-a1`
> 프리뷰 라우트: `/a1` (운영 `/`는 A안 유지)
> 승인 상태: **⏳ 사용자 검토 대기**
> 부록: 레퍼런스 분석은 [`RESEARCH-A1.md`](./RESEARCH-A1.md) 참조

---

## 1. 컨셉

**3대 키워드**: 신비주의 · 느린 · 스마트한

**핵심 모순**: Hero는 다크 신비, 나머지는 흰 미니멀. 두 모드의 **전환점**이 A1 디자인 임팩트. "느림"은 인터랙션 톤, "스마트함"은 정보 구조 — voice·UX 라이팅·정보 응축은 A안에서 carry, mood만 mystic으로 swap.

**스크롤 볼륨**: 3 stage, ~2.5–3 viewport. A안 7섹션 대비 ~60% 축소.

---

## 2. 구조 — 3 stage

### Stage 1 — Mystic Hero (다크, 100vh)

- Background: `var(--a1-midnight)` `#0B0F14`
- 콘텐츠: A안 §01 Stance 끌어올림
  - "Tools change. / Structure remains. / We design it." (3 line)
  - 한국어 echo: 작게 (0.55 opacity), A안 §01 결 — "AI 도구는 매일 새롭게 등장합니다. / 필요한 건 창의성과 결합. / 시리아이는 그 구조를 설계합니다."
- 모션:
  - **Text reveal**: blur(12px) → blur(0), 800ms per line, 120ms stagger. 영문 먼저, 한국어 echo 1.2s 뒤
  - **Cursor lerp**: 0.08–0.10, 180px influence radius. ink-wash blob (Canvas 2D, alpha ~0.06–0.10)
  - **Central rotating form**: SVG 또는 Canvas, 10s 1 revolution, slow easing
  - **Scroll hint**: bottom center, 3s sinusoidal pulse
- 전환 (→ Stage 2): 600–900ms gradient wash dissolve. 색은 midnight → paper로 morph (monopo.vn 차용)

### Stage 2 — White Composition (흰, ~150vh)

- Background: `var(--a1-paper)` `#FAFAF7`
- 통합 콘텐츠 (A안 §02 + §03 + §04 압축):
  - **Methodology 3 axes**: Architecture · Literacy · Mapping (A안 카피 carry)
  - **System 4 layers**: Signal · Judgment · Action · Record — 다이어그램 폐기, **lozenge bullet + thread connector** 형식으로 inline 표현
  - **Clients (With)**: 단일 가로 wall 유지 (slow marquee 60s → 90s 더 느리게). 또는 본 stage에서 폐기하고 §3 진입 직전 단독 ribbon (decision pending)
- 디자인 포인트:
  - **Lozenge bullet**: `border-radius: 999px`, 1px `var(--a1-hairline)` border, padding `4px 10px`, mono caption 11px
  - **Thread connector**: `motion.path` `pathLength` 0→1, 1.4s, stroke `var(--a1-hairline-strong)`, 1px
  - **Button**: 1px border, 6px radius, no shadow, no fill default → fill on hover 200ms ease
  - 헤드라인 floats in whitespace, ~50% empty ratio
- 모션 톤: text reveal 800–1000ms, stagger 100ms. native scroll (또는 Lenis lerp 0.08)

### Stage 3 — Voice + Contact (흰 베이스 + small dark accent, ~100vh)

- Background: `var(--a1-paper)`
- 콘텐츠:
  - **Voice manifesto block** — `var(--a1-midnight)` dark band, full-bleed가 아닌 큰 inset card (max-width 920px, padding 64px)
    - 영문: "We don't recommend tools. / We architect what stays."
    - 한국어 3 stanza (A안 §05 그대로 carry)
    - Caption: "— Siriai Manifesto, 2026"
  - **Contact**: A안 ContactForm 재사용. 헤드 "Let's start with coffee. / 가벼운 커피챗으로, 해묵은 고민을 시원하게."
  - **CTA 버튼**: "바로 스케줄 예약하기 →" 1px border + dot prefix · + arrow suffix
  - **Footer**: A안 Footer 재사용
- **State-aware ambient** (옵션, 결정 필요):
  - Stage 1의 cursor blob ambient motion이 Stage 3 진입 시 10–15% speed up + opacity +8%
  - "We noticed you" signal. 구현 복잡도 낮음 (scrollProgress 기반)

---

## 3. 모션 baseline

| 채널 | duration | easing |
|---|---|---|
| Text reveal (per line) | 600–900ms | `cubic-bezier(0.16, 1, 0.3, 1)` (A안 carry) |
| Stagger | 80–140ms | — |
| Hover / button | 160–220ms | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Stage transition | 600–900ms | `cubic-bezier(0.7, 0, 0.3, 1)` |
| Cursor lerp | per-frame | `lerp ≈ 0.09` |
| Ambient hero loop | 6–10s | sinusoidal |
| 전체 reveal cap | ≤1.5s | best practice |

**Lenis** (옵션) — `lerp: 0.08`, `smoothWheel: true`. A안 v1에 이미 패키지 존재 → 재활용. A1에서 정식 도입 추천.

`prefers-reduced-motion` honor — blur·rotation·cursor blob 비활성, opacity fade만 유지.

---

## 4. 디자인 토큰

A안 토큰과 **공존**. A1 전용은 `--a1-*` prefix.

| Token | Value | 용도 |
|---|---|---|
| `--a1-paper` | `#FAFAF7` | Stage 2·3 베이스, 2% warm tint |
| `--a1-midnight` | `#0B0F14` | Stage 1 베이스, off-black ink |
| `--a1-ink` | `#0F1419` | body on paper (A안 carry) |
| `--a1-on-midnight` | `#E8E6DE` | body on hero, slight warmth |
| `--a1-mute` | `#5E6470` | secondary on paper |
| `--a1-on-mute` | `#8B919C` | secondary on midnight |
| `--a1-hairline` | `rgba(15,20,25,0.12)` | bullet, thread, button border |
| `--a1-hairline-strong` | `rgba(15,20,25,0.22)` | active thread, focused input |
| `--a1-accent-warm` | `#C77B3A` | rare warm punctuation (페이지 1회) |
| `--a1-accent-deep` | `#2B3A4A` | slate (A안 carry) |

---

## 5. 타이포그래피

- Display: Pretendard Variable
  - Stage 1 Hero: weight 300–400, tracking `-0.02em`, line-height 1.08
  - Stage 2 Section heads: weight 500–600
- Body: weight 400, line-height 1.7–1.85
- Eyebrow caps: 11px, `tracking-[0.22em]`, uppercase
- Mono caption (footnote, lozenge bullet number, dot indicator): **Geist Mono** 또는 **JetBrains Mono** 도입 검토 (별도 결정 — 본 PRD §10 참조)

---

## 6. 카피웍 정책

(이전 결정: "헤드 reset, 본문 echo")

- **Hero (Stage 1)**: A안 §01 Stance를 hero로 끌어올림 — 영문 3줄 + 한국어 echo. 카피 변경 X.
- **Stage 2**: A안 §02·§03·§04 헤드 reset 가능, 본문 echo
  - Methodology head: 현 "Three ways in. / One place to begin." → A1에서 reset 가능 (mystic 톤). 예: "Three doors. / One room."
  - System head: 현 "Decision flow. / Made visible." → reset 가능
  - Clients head: "Brands we've sat with." 그대로 carry
- **Stage 3**: A안 §05·§06 그대로 carry (manifesto는 brand voice 코어)

---

## 7. 라우트·파일 구조

```
src/app/a1/
├─ page.tsx                A1 페이지 (3 stage stack)
├─ layout.tsx              A1-specific (noindex, follow) + DebugPanel mount
└─ h/                      디버깅 하네스 (§8)
   ├─ page.tsx             하네스 인덱스
   ├─ stage-1/page.tsx     Stage 1 isolation
   ├─ stage-2/page.tsx     Stage 2 isolation
   └─ stage-3/page.tsx     Stage 3 isolation

src/components/a1/
├─ Stage1Hero.tsx          다크 신비 hero
├─ Stage2Composition.tsx   흰 미니멀 통합
├─ Stage3Outro.tsx         voice + contact wrapper
├─ MysticCursor.tsx        cursor lerp blob (Canvas 2D)
├─ RotatingForm.tsx        central form (SVG 1차)
├─ ThreadConnector.tsx     motion.path 연결선
├─ LozengeBullet.tsx       pill 불렛
├─ MysticButton.tsx        1px border button
├─ AmbientField.tsx        ambient particle field (cross-stage)
└─ DebugPanel.tsx          모션 파라미터 라이브 컨트롤 (§8)
```

A안 컴포넌트(`src/components/v3/*`) **import 가능하나 강제 X**. 재사용 후보: `Navigation`, `Footer`, `ContactForm`.

---

## 8. 디버깅 하네스 구조

**목적**: monopo 결의 모션 튜닝이 본질 — duration·easing·blur·cursor lerp 등을 빌드·새로고침 cycle 없이 라이브 조절·검증.

### 8.1 Motion Debug Panel (`/a1?debug=1` 또는 ⌘D)

- 우측 floating panel (`Cmd+D` toggle, 또는 `?debug=1` URL param)
- 컨트롤 (slider + value display):
  - Text reveal duration (0.3–2.0s)
  - Stagger interval (40–300ms)
  - Cursor lerp (0.04–0.20)
  - Cursor influence radius (80–280px)
  - Rotating form revolution (4–20s)
  - Hover transition (100–400ms)
  - Stage transition (300–1500ms)
  - Ambient loop (3–15s)
- 변경값: CSS custom property 즉시 반영 (`--a1-reveal-duration`, `--a1-cursor-lerp` 등)
- localStorage 저장 → 새로고침 후 복원
- **"Copy as code"** 버튼 — 현 값을 `:root` CSS variable definition으로 클립보드 복사 (확정값을 코드로 옮기는 ritual)
- **"Reset to recommended"** 버튼 — `RESEARCH-A1.md` §4 baseline으로 일괄 복원

### 8.2 Stage Isolation (`/a1/h/stage-N`)

> 명명 참고: Next.js 16 App Router에서 `_` prefix 폴더는 private convention(라우팅 제외). 그래서 `_h` 대신 `h` 사용.

- 각 stage 단독 렌더링 (전후 stage 비가시)
- URL query로 상태 강제:
  - `?scroll=0.5` — scrollProgress 0–1 강제 (scroll-linked motion 검증)
  - `?cursor=320,240` — mouse position 강제 (cursor blob 위치 lock)
  - `?reduced=1` — `prefers-reduced-motion` 시뮬레이션
  - `?seed=42` — random seed 고정 (particle deterministic)
- Top-right badge: stage 번호 + 강제 query 값 표시
- 빌드에서도 접근 가능 (dev tool 용도)

### 8.3 노출 정책

- `/a1/h/*` · `?debug=1`: robots noindex (A1 라우트 자체가 noindex이므로 자동)
- 운영 빌드에 포함 — 게이팅 별도 X. 단순함 우선.
- 옵션: 환경변수 `NEXT_PUBLIC_A1_DEBUG_HIDDEN=1`로 hide 처리 (향후)

### 8.4 본 PRD 범위 외 (백로그)

- Playwright + 스크린샷 visual regression
- Lighthouse / Web Vitals 자동 측정
- Motion timeline visualizer (GSAP DevTools 류)

---

## 9. 구현 단계 (승인 후)

**Phase A1.1 — 기반**
- `globals.css` `--a1-*` 토큰 추가
- `/a1/layout.tsx` (noindex), 빈 `/a1/page.tsx`
- `/a1/h/*` 하네스 (DebugPanel + stage isolation)
- 빈 Stage1/2/3 placeholder (스크롤만 동작)

**Phase A1.2 — Stage 1 Hero**
- 다크 background + 텍스트 reveal (blur)
- `MysticCursor` (Canvas 2D blob)
- `RotatingForm` 1차 (SVG, 10s revolution)
- DebugPanel 1차 (reveal duration, stagger, cursor lerp)

**Phase A1.3 — Stage 1 → 2 transition**
- Gradient wash dissolve (600–900ms)
- Stage 2 진입 시 cursor blob fade out

**Phase A1.4 — Stage 2 Composition**
- 통합 콘텐츠 (Methodology + System + Clients)
- `LozengeBullet`, `ThreadConnector`, `MysticButton`
- Headline-in-whitespace 리듬

**Phase A1.5 — Stage 3 Voice + Contact**
- Voice manifesto dark inset card
- ContactForm 재사용
- State-aware ambient (Stage 1 motion echo)

**Phase A1.6 — 튜닝 + 마무리**
- DebugPanel로 모션 파라미터 fine-tune
- 카피 헤드 1차 reset (§6)
- 모바일 fallback (cursor blob → 단순 fade, rotation → 정지 SVG)
- `prefers-reduced-motion` 검증

---

## 10. 결정 사항 (2026-05-28 확정)

1. **하네스 구조** — ✅ §8.1 + §8.2 그대로 (Motion Debug Panel + Stage Isolation)
2. **Lozenge vs Numbered bullet** — ✅ 둘 다 사용. Lozenge(pill)는 주, Numbered는 보조
3. **Clients (With) 처리** — ✅ Stage 2 → 3 사이 단독 가로 ribbon. marquee 60s → 90s 더 느리게. 호흡 1번 + 시각 break
4. **State-aware ambient** — ✅ 도입. Stage 1 motion이 Stage 3 진입(scrollProgress 기반) 시 10–15% 가속 + opacity +8%
5. **Mono caption font** — ✅ Geist Mono 도입. footnote · dot indicator · lozenge bullet 번호 한정
6. **Lenis 정식 도입** — ✅ A1 한정 `lerp: 0.08`, `smoothWheel: true`. v1 패키지 재활용
7. **§2 카피 헤드 reset** — ✅ Methodology만 reset(mystic 톤). System head("Decision flow. / Made visible.")는 carry. 구체 카피는 Phase A1.4에서 후보 다수 제시 후 결정
8. **운영 `/` 갈아끼우기 시점** — ⏳ 평가 후 결정. 본 PRD 범위 외

---

## 11. 비범위 (이번 트랙에서 안 함)

- 모바일 별도 디자인 (fallback만, 별도 트랙)
- 다국어 (한국어/영문만, 본 트랙)
- SEO / OG 이미지 (A1 라우트는 noindex이므로 우선순위 낮음)
- Storybook 도입
- Visual regression 자동화
- 운영 도메인 결정

---

## 12. 승인 체크리스트 (2026-05-28 완료)

- [x] 컨셉(§1) · 3 stage 구조(§2) · 모션 baseline(§3) OK
- [x] 디자인 토큰(§4) · 컬러 OK
- [x] 카피 reset 정책(§6) OK (§10.7 — Methodology만 reset)
- [x] 라우트·파일 구조(§7) OK
- [x] 디버깅 하네스 구조(§8) OK
- [x] §10 결정 항목 8개 확정
- [x] 구현 단계(§9) Phase A1.1부터 시작 OK
