# Siriai Website — Plan D — Design System

> 작성일: 2026-05-20
> 짝 문서: [`PRD-D.md`](./PRD-D.md)
> 레퍼런스: [lusion.co](https://lusion.co)
> 목적: Plan D 구축에 필요한 디자인 토큰·모션·레이아웃·컴포넌트 사양을 단일 진실 소스(SSoT)로 고정.

---

## 0. 디자인 원칙 (5)

1. **모션은 의미를 갖는다.** 장식이 아니라 정보의 운반 수단. 모션 없이도 정보는 도달 가능해야 한다.
2. **타이포그래피가 그래픽이다.** 일러스트로 도망치지 않는다. 글자 자체가 무대 위에 선다.
3. **다크 퍼스트, 크림은 호흡.** 어둠 속에서 사고 구조를 그리고, 크림 인터루드는 휴식.
4. **체험을 약속하면 지킨다.** 모든 마이크로 인터랙션은 사용자의 행동에 응답해야 한다 — 호버, 스크롤, 정지, 클릭.
5. **사용자의 제어를 빼앗지 않는다.** Lenis 모멘텀은 무겁되, 스크롤 차단·강제 핀은 한계 구간(Atlas · Literacy Lab)에서만.

---

## 1. 색상 토큰

### 1.1 베이스 팔레트

| 토큰 | 값 | 사용 |
|---|---|---|
| `--ink-900` | `#0A0A09` | 최심부 다크 (Field 배경 그래디언트 하단) |
| `--ink-800` | `#111110` | 기본 다크 |
| `--ink-700` | `#1A1916` | 카드/모듈 배경 |
| `--ink-600` | `#2A2922` | 보더 다크 모드 |
| `--olive-700` | `#3D3B2A` | Atlas 챕터 전용 |
| `--olive-500` | `#5A573F` | Atlas 보조 |
| `--cream-100` | `#F4F1EB` | 크림 인터루드 |
| `--cream-200` | `#E8E3D8` | 크림 카드 분리 |
| `--cream-300` | `#D8D0C0` | 크림 보더 |
| `--ink-fg` | `#F4F1EB` | 다크 위 텍스트 |
| `--cream-fg` | `#1A1916` | 크림 위 텍스트 |

### 1.2 액센트

| 토큰 | 값 | 사용 |
|---|---|---|
| `--violet-300` | `#c4b5fd` | 1차 액센트 (커서, glow, active dot) |
| `--violet-500` | `#818cf8` | 2차 액센트 (그라디언트 페어) |
| `--violet-glow` | `radial-gradient(circle, rgba(196,181,253,0.32), transparent 60%)` | Pulse 우하단 글로우 |
| `--signal-amber` | `#F4C57A` | Signal 폼 success state |
| `--error-red` | `#E5635A` | 폼 에러 |

### 1.3 노이즈 그레인

- SVG noise turbulence를 PNG로 베이크 → `/public/images/noise-grain.png` (256×256, 약 8KB).
- 다크 챕터 전역에 `mix-blend-mode: overlay; opacity: 0.04;` 풀스크린 fixed.
- 크림 챕터에는 적용하지 않음 (오염되어 보임).

---

## 2. 타이포그래피

### 2.1 패밀리

| 역할 | 패밀리 | 로드 |
|---|---|---|
| Display Serif | **Fraunces** (Google Fonts variable) | `next/font/google` — display: 'swap', weight: variable |
| Sans | **Pretendard** | `@fontsource/pretendard` 기존 유지 |
| Mono | **JetBrains Mono** | `next/font/google` — weight: 400, 500 |

Fraunces 권장 axes: `opsz 144 SOFT 50 WONK 1`. Soft 50으로 살짝 부드럽게, opsz 144로 디스플레이 톤.

### 2.2 스케일

```
--type-display  : clamp(3rem,    7vw,   9rem  );   // Fraunces, leading 1.02
--type-h1       : clamp(2.4rem,  5vw,   6.4rem);   // Pretendard bold, leading 1.06
--type-h2       : clamp(2rem,    3.5vw, 5rem  );   // Pretendard bold, leading 1.12
--type-h3       : clamp(1.4rem,  2vw,   2.4rem);   // Pretendard bold, leading 1.22
--type-lead     : clamp(1.05rem, 1.4vw, 1.4rem);   // Pretendard medium, leading 1.55
--type-body     : 14px / 1.9;                       // Pretendard regular
--type-mono-sm  : 11px / 1.4 letter-spacing 0.22em uppercase
--type-mono-md  : 13px / 1.5 letter-spacing 0.18em uppercase
```

### 2.3 한국어 정책

- `word-break: keep-all` 전역.
- 헤드라인 한국어는 `letter-spacing: -0.01em` 가벼운 트래킹.
- 영문 디스플레이는 `letter-spacing: -0.02em`.
- 한국어/영문 혼용 시 영문에만 `font-feature-settings: 'ss01', 'ss02'` (Fraunces 스타일릭).

### 2.4 텍스트 컬러 페어링

| 배경 | 메인 | 보조 (60%) | 라벨 (40%) |
|---|---|---|---|
| ink-800 | `#F4F1EB` | `#F4F1EBA0` | `#F4F1EB66` |
| olive-700 | `#F4F1EB` | `#F4F1EBB3` | `#F4F1EB80` |
| cream-100 | `#1A1916` | `#1A1916B3` | `#1A191680` |

---

## 3. 모션 시스템

### 3.1 이징

```ts
export const ease = {
  // Plan D 기본 — 강한 안착, overshoot 없음
  out: [0.22, 1, 0.36, 1] as const,
  // 진입/퇴장 부드러움
  inOut: [0.65, 0, 0.35, 1] as const,
  // 시네마틱 — 느린 출발, 빠른 후반
  cine: [0.83, 0, 0.17, 1] as const,
  // 노드 필드 idle용 — 호흡
  breath: [0.5, 0, 0.5, 1] as const,
};
```

기존 v2.0의 `[0.16, 1, 0.3, 1]` → Plan D 표준 `[0.22, 1, 0.36, 1]`로 미세 조정. (조금 더 차분하게.)

### 3.2 시간 토큰

```ts
export const dur = {
  micro: 0.18,   // hover, focus
  short: 0.36,   // 카드 진입, label swap
  base:  0.72,   // 챕터 헤드 reveal
  long:  1.20,   // ChapterCurtain
  cine:  2.20,   // BootOverlay 전체
};
```

### 3.3 스태거

| 컨텍스트 | 간격 |
|---|---|
| 단어 단위 (Hero headline) | 0.08s |
| 줄 단위 (Pulse, Premise) | 0.12s |
| 카드 그리드 (Practice, Evidence) | 0.06s |
| 챕터 HUD 인덱스 메뉴 | 0.04s |

### 3.4 Scroll-linked 패턴

```ts
// Premise 줄별 reveal
const lineOpacity = useTransform(scrollYProgress, [start, start + 0.15], [0, 1]);
const lineY       = useTransform(scrollYProgress, [start, start + 0.15], [24, 0]);
const lineSpacing = useTransform(scrollYProgress, [start, start + 0.15], [0.04, 0]);
```

```ts
// Atlas — 8 컴포넌트 swap. 카드 i (0~7)
const t = 0.10 + i * 0.0875;
const cardOpacity = useTransform(scroll, [t, t + 0.04, t + 0.0875 - 0.04, t + 0.0875], [0, 1, 1, 0]);
const cardY       = useTransform(scroll, [t, t + 0.04], [16, 0]);
```

### 3.5 마이크로 인터랙션 표준

| 인터랙션 | 사양 |
|---|---|
| 호버 buttons | scale 1.0 → 1.02, dur micro, ease out, +violet underline grow |
| Focus input | label 6px → -18px, border-bottom-color → violet-300, dur short |
| Card hover | inner-shadow 0→1, border violet-300 fade-in, dur short |
| Cursor enter hoverable | ring 24px → 48px, lerp 0.18, label opacity 0→1 dur micro |
| Image reveal | mask clip-path inset(0 100% 0 0) → inset(0 0 0 0), dur 0.9, ease cine |

---

## 4. 그리드 & 레이아웃

### 4.1 그리드

- **베이스 그리드**: 12 컬럼, 24px gutter, max-width 1440px, side margin `clamp(20px, 5vw, 96px)`.
- **베이스라인**: 8px. 모든 값은 8의 배수 권장.
- **챕터 패딩**: top `clamp(96px, 14vh, 160px)`, bottom 동일.
- **풀블리드 챕터**: max-width 무시, side margin 동일 적용.

### 4.2 챕터 컨테이너

```tsx
<section
  className="relative min-h-screen"
  style={{ padding: 'clamp(96px,14vh,160px) clamp(20px,5vw,96px)' }}
>
  {/* ChapterHUD가 외부에서 portal 마운트 */}
</section>
```

### 4.3 Practice Bento (6칸)

```
grid-template-columns: 2fr 1fr 1fr
grid-template-rows:    1fr 1fr
grid-template-areas:
  "a a b c"
  "a a b d"
  "e e f f"
gap: 16px
```

→ 모바일 (<768px): 단일 컬럼 stack.

### 4.4 Atlas (sticky 320vh)

```tsx
<div className="relative" style={{ height: '320vh' }}>
  <div className="sticky top-0 h-screen overflow-hidden">
    {/* 좌 sticky 3D, 우 8 카드 swap */}
  </div>
</div>
```

좌우 50/50, gap 64px. 모바일에서는 3D를 상단 1/3, 카드 하단 2/3 stack.

### 4.5 Literacy Lab (수평)

```tsx
<div ref={containerRef} className="relative" style={{ height: '500vh' }}>
  <div className="sticky top-0 h-screen overflow-hidden flex items-center">
    <motion.div style={{ x }} className="flex gap-12">
      {cases.map(...)}
    </motion.div>
  </div>
</div>
```

`x`: `useTransform(scrollYProgress, [0,1], [0, -(cases.length-1) * vw])`.

---

## 5. 컴포넌트 카탈로그

### 5.1 `<BootOverlay />`

```ts
props: { onComplete: () => void }
state: { progress: number; logIndex: number }
```

- 위치: `fixed inset-0 z-[100]`
- 배경: `--ink-800` + noise grain
- 중앙 모노 텍스트 + 1px 보라 라인 진행 바 (`--violet-300`)
- 하단 로그 10줄 — 220ms 간격으로 한 줄씩 노출
- 완료 시 `clip-path: inset(0 0 100% 0)` 위로 wipe-out, 0.8s ease cine
- `sessionStorage.bootSeen = '1'` 저장
- `prefers-reduced-motion` → 즉시 onComplete 호출

### 5.2 `<RingCursor />`

```ts
state: { x: number; y: number; lagX: number; lagY: number; mode: 'default' | 'hover' | 'drag' | 'send' }
```

- 위치: `fixed inset-0 z-[90] pointer-events-none`
- 두 개의 SVG circle — 디스크 12px, 링 24/48px
- 링 위치는 마우스 좌표를 lerp(0.18)
- mode: 데이터 어트리뷰트 `[data-cursor="hover"]` 등으로 감지
- 다크/크림 모드 자동 반전: 부모 챕터의 data-theme 감지
- 터치 디바이스: `matchMedia('(hover: hover)')` false → 비렌더

### 5.3 `<ChapterCurtain />`

```ts
state: { phase: 'idle' | 'closing' | 'opening' }
```

- 5개 슬라이스, 각 `width: 20vw, height: 100vh`
- 닫힘: stagger 0.06s, 각 슬라이스 `scaleY: 0 → 1` from top, dur 0.4
- 5번째 슬라이스 중앙에 챕터 번호 텍스트
- 열림: stagger 0.06s, `scaleY: 1 → 0` to bottom, dur 0.4
- next/navigation의 라우터 푸시를 wrap한 `useChapterRouter` 훅으로 트리거

### 5.4 `<ChapterHUD />`

- 위치: `fixed bottom-6 left-6 z-[80]`
- 표시: `<span className="font-mono text-[11px] tracking-[0.22em] uppercase">{i}/09 · {label}</span>`
- 클릭 시 9개 챕터 인덱스 메뉴 펼침 (위쪽으로 확장, 라인 위에 한 줄씩 fade-in stagger 0.04)
- IntersectionObserver — 각 챕터 `<section id="ch-XX">` 감지
- ESC로 메뉴 close, 외부 클릭으로 close

### 5.5 `<NodeField />` (R3F)

```ts
props: { nodeCount?: number; performance?: 'high' | 'low' }
```

- InstancedMesh — 256 노드 (모바일/저성능 96)
- 각 노드: small icosahedron (radius 0.04 unit)
- 위치: 구체 표면에 fibonacci 분포 + 약간의 random offset
- 마우스 인근 (world space distance < 0.6) → emissive 강도 ↑, scale 1.4
- 라인 연결: 가까운 노드끼리 (delaunay 또는 nearest-3) Catmull-Rom curve, drei `<Line />`
- 카메라: PerspectiveCamera fov 35, position (0, 0, 4)
- 스크롤에 따라 카메라 z 4 → 8 (dolly out)
- shader uniforms: `uTime`, `uMouse`, `uScroll`
- 모바일: 셰이더 precision `mediump`

### 5.6 `<DistortText />`

```ts
props: { text: string; as?: 'h1' | 'h2' | 'p'; intensity?: number }
```

- 텍스트를 SVG `<text>`로 렌더 → SVG `<filter>` displacementMap (turbulence)
- scroll velocity (`useVelocity(scrollY)`) → filter `scale` 0 ~ intensity\*40
- 정지 시 0으로 감속
- 폴백 (no SVG filter support): 일반 텍스트
- prefers-reduced-motion → 강제 0

### 5.7 `<ChapterSerif />`

```ts
props: { children: ReactNode; lines: string[]; startOffset?: number; endOffset?: number }
```

- 줄별로 `<motion.span>` wrap
- `useScroll({ target, offset: ['start end', 'end start'] })` → 각 줄 [start + i*0.12, start + i*0.12 + 0.15] 구간에 opacity·y·letter-spacing reveal
- Fraunces 폰트 강제 (스타일 인라인)

### 5.8 `<HorizontalTrack />`

```ts
props: { cases: CaseItem[] }
```

- 위 4.5 참조. sticky 컨테이너 + translateX
- 키보드: ← → 로 케이스 인덱스 점프 (각 케이스 별 anchor offset 정의)
- 하단 progress bar: 1px 라인 + 현재 인덱스 / 총 개수
- 케이스 카드 hover → cursor "VIEW →"

### 5.9 `<BentoGrid />`

```ts
props: { items: BentoItem[] }
type BentoItem = { id: string; area: 'a'|'b'|'c'|'d'|'e'|'f'; title: string; eyebrow: string; body: string }
```

- CSS Grid template-areas (위 4.3 참조)
- 각 셀: 호버 시 violet border fade-in (border 1px → 1px solid var(--violet-300)), inner micro 3D icon (R3F nested canvas 또는 SVG 모핑)
- 클릭 가능한 셀은 RingCursor "OPEN" 모드

### 5.10 `<SignalForm />`

- name · email · message · 카테고리 select
- 라벨 floating (focus 시 위로)
- 제출 → `POST /api/contact` (기존 라우트)
- 상태: idle / sending / sent / error
- sent → 폼 0.6s fade-out → "Signal received." 텍스트 0.6s fade-in + violet glow pulse 1회
- error → 폼 흔들림 micro shake (translate-x [-4, 4, -2, 2, 0], 0.4s)

---

## 6. 챕터별 비주얼 아트 보드

### Field
```
배경: linear-gradient(180deg, #111110 0%, #0A0A09 100%) + noise overlay 0.04
중앙: NodeField — 마우스 인력 반응
헤드: 좌측 정렬, 디스플레이 sans bold, 클립패스 reveal
서브: 좌하단 모노 — > SIRIAI / ARCHITECTURE STUDIO
HUD: 우상단 KST 시계, 좌하단 챕터 인덱스 00/09
```

### Premise
```
배경: ink-800 풀블리드
좌: 비어둠 1/3
우: Fraunces 디스플레이 거대 텍스트, 줄별 scrub reveal
모서리: 우상단 violet 점 5s pulse
```

### Atlas
```
배경: olive-700 (#3D3B2A)
좌 sticky: R3F 모델 (Icosahedron/Torus 등 — 8개 사전 정의)
우: 카드 1개 view at a time, 8 swap
스크럽 진행 표시: 좌하단 0/8 → 8/8 모노 카운터
```

### Practice (크림 인터루드)
```
배경: cream-100, 상단 다크→크림 wipe transition (clip-path bottom 100→0)
6 bento — 가장 큰 셀(a)이 좌상단 2×2
각 셀 내부 micro 3D 아이콘
하단: 작은 모노 캡션 "06 / SERVICES — PRACTICE FIELDS"
```

### Literacy Lab
```
배경: ink-800
sticky 풀스크린 컨테이너, 가로 트랙
케이스 카드: 영상/이미지 4:5 비율 + 클라이언트명 + 한 줄 결과
케이스 호버: 카드 scale 1.02 + border violet
하단: 진행 트랙 바 1px
```

### Evidence
```
배경: ink-800
상단 50%: SVG 성장 곡선, pathLength stroke draw, 분기점 dot hover 툴팁
하단 50%: 12 PhotoCircle 그리드 (3×4)
좌측: 30+ / 12+ / 100% 통계 stat strip
```

### Pulse
```
배경: ink-800 풀블리드
우하단: violet radial glow 800px × blur 200px × opacity 0.3
중앙 좌정렬: 매니페스토 5~6줄, 스크럽 줄별 reveal, Fraunces 디스플레이
```

### Studio (크림 인터루드)
```
배경: cream-100
상단: 다크→크림 wipe
좌: 카피 — "AI 도구를 운영 구조로 직조한다."
우: 마키 2행 (정/역방향) — AI 툴 로고 (sora, gemini, dalle, midjourney, chatgpt, runway, claude, stable-diffusion)
하단: 4 stat strip
```

### Signal
```
배경: ink-800
좌: 헤드 + sub
우: 인라인 폼, 라벨 floating, violet underline grow
제출 후: violet glow pulse + "Signal received."
```

### Sign-off
```
배경: ink-800
3-col footer: 좌 워드마크 / 중앙 4 링크 컬럼 / 우 한국어 사업자 정보
하단 바: © 2026 SIRIAI / KST live clock
이스터에그: 워드마크 호버 → 글자별 distortion + 미니 NodeField pulse
```

---

## 7. 인터랙션 디테일 (Lusion 톤 mimic)

- **마우스 정지 감지**: 2초 무동작 시 Field NodeField가 idle ambient (노드들이 천천히 자기 자리에서 micro pulse).
- **헤더 진입**: 뷰포트 진입 시 단어/줄 reveal. 한 번만. `useInView({ once: true })`.
- **챕터 첫 진입**: HUD 챕터 번호가 0.36s 동안 모노 디지트 카운트업 (이전 번호 → 새 번호).
- **모바일 탭**: 터치 시작 시 작은 보라 ripple (16px → 64px, opacity 0.4 → 0, 0.5s).
- **헤로 헤드라인 마우스 인터랙션**: 마우스가 헤드라인 영역 위에 있을 때 NodeField가 헤드라인 텍스트 모양으로 정렬되도록 시도 (어트랙터 포인트 동적 변경) — 고급 옵션, M4 단계 폴리시.

---

## 8. 아이콘 / 일러스트 정책

- Lusion은 거의 일러스트를 쓰지 않는다. 모든 비주얼은 3D 또는 타이포 또는 사진.
- Plan D도 동일:
  - **UI 아이콘**: 1.5px stroke, 16/20/24 사이즈, 라운드 caps. Lucide 또는 커스텀.
  - **섹션 비주얼**: R3F 또는 사진. 일러스트 금지.
  - **로고**: 워드마크 only. 심볼 마크는 차후.

---

## 9. 셰이더 노트

### NodeField fragment shader (개요)

```glsl
uniform float uTime;
uniform vec2  uMouse;       // world space
uniform float uScroll;      // 0..1
varying vec3  vWorldPos;
varying vec3  vNormal;

void main() {
  float dist = length(vWorldPos.xy - uMouse);
  float pulse = exp(-dist * 2.2) * (0.8 + 0.2 * sin(uTime * 1.8));
  float fres  = pow(1.0 - dot(vNormal, vec3(0,0,1)), 2.0);
  vec3  base  = vec3(0.77, 0.71, 0.99);    // violet-300
  vec3  rim   = vec3(0.51, 0.55, 0.97);    // violet-500
  vec3  col   = mix(base, rim, fres) * (0.18 + pulse * 1.6);
  col *= (1.0 - uScroll * 0.6);
  gl_FragColor = vec4(col, 1.0);
}
```

### DistortText SVG filter

```xml
<filter id="distort-text">
  <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="3" />
  <feDisplacementMap in="SourceGraphic" scale="{velocity * 40}" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

velocity가 0일 때는 SVG filter 자체를 detach (재계산 비용 회피).

---

## 10. 반응형 브레이크포인트

| 토큰 | 값 | 비고 |
|---|---|---|
| `--bp-sm` | 640px | 폰 가로 |
| `--bp-md` | 768px | 태블릿 세로 |
| `--bp-lg` | 1024px | 태블릿 가로 / 작은 노트북 |
| `--bp-xl` | 1280px | 데스크톱 |
| `--bp-2xl` | 1536px | 와이드 |

### 모바일 폴백 (< md)

| 기능 | 폴백 |
|---|---|
| RingCursor | 비활성 |
| ChapterCurtain | 단순 fade (0.3s) |
| BootOverlay | 짧은 1.5s 버전, 로그 5줄로 축약 |
| NodeField | 노드 96, 라인 24, mediump precision |
| Atlas sticky 320vh | 일반 스택 — 카드를 vertical scroll로 펼침 |
| Literacy Lab 수평 | 일반 vertical 카드 리스트 |
| DistortText | filter 비활성, 일반 텍스트 |

---

## 11. 토큰 파일 구조

```
src/styles/
├── tokens.css          // CSS 변수 (color, type scale, dur, ease)
├── globals.css         // 리셋, 폰트 페이스, scrollbar
└── chapters/           // 챕터별 추가 토큰 (필요 시)

src/lib/motion/
├── ease.ts             // ease, dur 토큰 (JS)
├── viewport.ts         // useChapterScroll, useReducedMotion 헬퍼
└── scroll.ts           // Lenis 인스턴스 + ScrollContext
```

---

## 12. 체크리스트 (PR마다 통과)

- [ ] 모든 모션이 prefers-reduced-motion 폴백을 가진다
- [ ] 모든 인터랙티브 요소가 키보드 접근 가능
- [ ] 다크/크림 전환부에 a11y contrast 4.5:1 이상
- [ ] WebGL 캔버스는 모바일에서 노드 수 자동 감산
- [ ] BootOverlay는 sessionStorage 1회만 발화
- [ ] Lenis가 모든 챕터에서 정상 작동 (sticky 구간 포함)
- [ ] Fraunces 폰트는 디스플레이 챕터에서만 로드
- [ ] LCP < 2.5s (Field 챕터, throttled 4G)

---

## 13. 변경 로그

| 날짜 | 변경 |
|---|---|
| 2026-05-20 | 초안. v2.0 디자인 토큰 인계 + Lusion 톤 신규 토큰 (Fraunces, DistortText, NodeField, BootOverlay 등) 정의. |
