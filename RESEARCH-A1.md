# A1 — Reference Research

> 트랙: **A1 (Mystic Compressed)** — A안 sibling
> 작성: 2026-05-28 · Agent 1차 리서치 결과 정리
> 출처 검증 태그: `[observed]` (인용 가능) · `[inferred]` (관행 추정) · `[recommended]` (제안 baseline)
> 환경 제약: 모든 1차 사이트(monopo.london, monopo.vn, twelvelabs.io, gemini.google) 정면 fetch는 403. Awwwards · Pentagram · BP&O · Creative Review · design.google · Brand New · GSAP/Lenis docs · CSS-Tricks · Codrops · FWA 등 우회 검증.

---

## 1. 핵심 레퍼런스 (사용자 인용 4개)

### 1.1 monopo.london

- **Pacing** — WebGL transition 0.8–1.2s `[inferred from GSAP/Vue/Three.js stack]`. Cursor lerp 0.08–0.10. Native + GSAP timeline scrubbing, 무거운 Lenis momentum 미사용 `[inferred]`.
- **Mood** — Tokyo-precision × London-warmth. 신비는 **reactive cursor blob**(viewport에 color pooling)에서 생성. 섹션별 색조 톤 피벗.
- **Text reveal** — Mask + clip-path word slide-up. 대형 display 타이포가 "swipe in" `[observed: Awwwards typography/cursor/animation 태그]`.
- **Color** — `#000 / #2779A7 (steel blue) / #DF6C4F (coral)` 3-color `[observed: Awwwards]`. 강한 negative space + 호버 시 accent fill bleed.
- **구조·스크롤** — Long single page, case tile block, scroll-linked WebGL palette swap, no snap.
- **A1 차용** — **§1 Hero primary ref.** 하나의 reactive Canvas/WebGL blob을 거의 순수한 surface 위에 배치. cursor-as-mood-painter 패턴 차용 — 다만 흰 베이스 위 deep midnight ink wash로 톤 전환 (coral 폐기).

### 1.2 monopo.vn (Saigon)

- **Pacing** — 런던보다 cinematic. GSAP + Lottie + Swiper + Nuxt stack `[observed: Awwwards/FWA]`. Hero intro 1.5–2.5s `[inferred]`.
- **Mood** — Hypnotic. Gradient-tinted color washes, slow loops, tactile transitions — "hypnotic colors"는 Awwwards 공식 태그.
- **Text reveal** — Mask reveals + 3D-feeling stacked transitions. "Vertical curtain" wipes `[inferred]`.
- **Color** — Near-black base 위 saturated gradient (purple→blue→amber). 고정 accent 없이 palette mood-shift `[observed: FWA]`.
- **구조·스크롤** — 각 case가 distinct chromatic chapter. Smooth scroll + 200–400ms settle `[inferred]`.
- **A1 차용** — **§1→§2 transition pattern.** 다크에서 흰으로 넘어갈 때 snap/jump 대신 600–900ms gradient wash dissolve.

### 1.3 twelvelabs.io

- **Pacing** — Calm declarative. "Fluid, layered, continuous, revealing structure" `[observed: Pentagram case study]`. 0.6–1.0s per element + subtle parallax.
- **Mood** — Smart, not mystic. 신비주의 angle은 **구조적** — 다이어그램이 살아있는 듯 pulse/breathe (Muybridge galloping-horse motion 계보).
- **Text reveal** — Quiet fade-up + slight upward translate `[inferred]`. 헤드는 negative space 안에 정지.
- **Color** — **White space punctuated by bright color** `[observed: BP&O]`. **LCH color space**, 3개 feature-keyed subset: pink-purple (search) / orange-yellow (generate) / green-blue (embed) `[observed: Creative Review]`. Hairline 매우 얇음.
- **Typography** — **Milling** by Tanguy Vanlaeys (205TF), CNC-toolpath 기반 mono-weight `[observed: Creative Review · 205TF · Fonts In Use]`. Single-line geometry → diagram-friendly.
- **구조** — Thread + timeline 기반 그리드. **Lozenge-shaped containers**(video volume metaphor) `[observed: Pentagram]`. ~50–60% empty `[inferred]`.
- **A1 차용** — **§2 white composition primary ref.** (a) lozenge/pill bullet, (b) thread-line connector between diagram nodes, (c) headline-in-whitespace rhythm. Milling 폐기 → **Pretendard Variable weight 300-400** 으로 mono-toolpath 결 대체 (또는 PP Neue Montreal/Inter Display 도입 검토).

### 1.4 gemini.google/kr/about

- **Pacing** — "Defined start/end, directional flow mirroring user actions" `[observed: design.google]`. Ambient loop 4–8s, engaged transition 0.3–0.6s.
- **Mood** — "Living system." Particle = "shoal of fish — moving together, changing direction, responding while maintaining clear structure" `[observed: design.google]`. **Siriai의 intelligent-but-quiet 결에 가장 근접한 ref.**
- **Text reveal** — Gradient text mask + opacity fade. Gradient-stroke headline `[observed: CSS-Tricks Gmail Gemini]`.
- **Color** — 4-color gradient: `#217BFE (blue) / #AC87EB (purple) / pink-red / amber` `[observed: Gemini source CSS]`. Light/dark 베이스 + blue gradient overlay.
- **구조·스크롤** — Long-scroll about page + section snap to feature demos. Scroll-linked particle intensity.
- **A1 차용** — **§3 Voice/Contact primary ref.** Ambient → engaged state shift metaphor. Hero는 calm, contact 근접 시 motion 미세 tighten. **Gradient 자체는 차용 X** (Google 사인 = 표절감).

---

## 2. 추가 발굴 레퍼런스 (5)

### 2.1 Active Theory (activetheory.net)

- **Pacing** — WebGL 풀로딩이나 LCP 1.3s desktop / 1.7s 4G `[observed: webgpu.com showcase]`. `prefers-reduced-motion` honor.
- **Mood** — Cinematic dark. "Pitch-black canvas, full-bleed WebGL detonating with color."
- **Text reveal** — XXL Monument Grotesk headlines, strict 12-column grid, hover-bloom case tile 60fps `[observed]`.
- **Color** — Base **#0B0B0B** `[observed]` (pure #000 X — softened). Mono-sans body.
- **구조** — Networked cursor tubes connecting active visitors across the site (presence-as-art).
- **A1 차용** — **§1 Hero secondary ref.** ★ 핵심 인사이트: **#0B0B0B not #000** — true black은 print 느낌, ink off-black이 atmosphere를 만듦. → A1 `--a1-midnight: #0B0F14`로 적용.

### 2.2 Linear.app

- **Pacing** — Subtle micro-motion. Hover 120–200ms `[inferred]`.
- **Mood** — Smart, restrained, slightly futuristic. Gradient = aura, not statement.
- **Text reveal** — Modest fade-up. Still composition 위주.
- **Color** — Indigo / Woodsmoke / Oslo Gray / Black Haze / White `[observed: Mobbin]`. Dark base + linear gradient blur background.
- **구조** — **8px spacing scale** `[observed: LogRocket]`, Radix UI primitives, in-house "Orbiter" design system.
- **A1 차용** — **§2 secondary ref**, 8px scale + hairline button discipline. 1px border, 4–6px radius, no shadow.

### 2.3 Vercel.com

- **Pacing** — "Subtle magic" motion (Luis Gutierrez Rico, Geist Pixel) `[observed: Vercel blog]`. Quiet, precise.
- **Mood** — Swiss-engineered minimalism. "Premium through what it doesn't do."
- **Color** — Pure `#000000 / #FFFFFF`, marketing 페이지 near-zero radius `[observed: SeedFlip]`.
- **Typography** — **Geist Sans + Geist Mono** (free, geometric, web-optimized) `[observed: vercel.com/font]`.
- **구조** — Aggressive reduction, single accent per page.
- **A1 차용** — **§2 button language.** Zero-shadow / 1px-line / micro-radius. Mono caption(Geist Mono) for footnote / timestamp on white surface.

### 2.4 Resn (resn.co.nz)

- **Pacing** — Hero anchored to **revolving black crystalline drop** (click-and-drag interactive) `[observed: DesignRush]`. Slow rotation loop.
- **Mood** — Truly mystic-dark. Elegant black imagery + single hero element as nexus.
- **Color** — Black-dominant + selective bright accent.
- **구조** — Hero as portal, rest of site cascades from central object.
- **A1 차용** — **§1 Hero co-primary ref** with monopo.london. Single-centerpiece-as-portal 패턴 = Siriai 본능. 하나의 slow-rotating ink form, click-to-explore.

### 2.5 Pentagram × TwelveLabs case study page

- 본 case study **페이지 자체**가 §2 reference. Generous margin, thread lines, lozenge containers, scroll-revealed diagrammatic chapter. **§2 composition rhythm만 보려면 이 한 페이지가 최강.**

---

## 3. 종합 권고 — Stage별 차용 디테일

### §1 Hero (다크 신비)
- Primary: **Resn** · Secondary: **monopo.london**
- 차용 3:
  1. **Off-black base `#0B0F14`** — never `#000` (Active Theory).
  2. **Cursor lerp 0.08–0.10**, 160–200px influence radius, ink-wash blob (Canvas 2D 또는 low-poly WebGL).
  3. **One slow rotating form** (8–14s 1 revolution) — viewport center anchor, semantic core 역할.

### §2 White Composition
- Primary: **TwelveLabs (Pentagram)** · Secondary: **Linear**
- 차용 3:
  1. **Lozenge/pill bullet** — `border-radius: 999px`, 1px hairline, padding 4px 10px. 다이어그램-as-volume language.
  2. **Thread-line connector** — 1px, `stroke: rgba(15,20,25,0.18)`, `motion.path` `pathLength` reveal. TwelveLabs grammar 차용 (말 아이콘 카피 X).
  3. **Button** — 1px border, **4–6px radius**, no shadow/fill on default, fill on hover 160ms ease (Linear + Vercel composite). Mono caption(Geist Mono/JetBrains Mono) for kbd/context.

### §3 Voice + Contact
- Primary: **gemini.google about**
- 차용 2:
  1. **State-aware ambient motion** — Hero loop calm baseline. 사용자가 contact까지 100vh 이내 진입 시 ambient particle 10–15% speed up + opacity +8%. "We noticed you" subtle 신호.
  2. **Gradient as voice underline only** — manifesto closer headline에 2px gradient underline 1점. Hero treatment로는 X (Google 표절 회피).

---

## 4. 모션 baseline

| 채널 | duration | easing |
|---|---|---|
| Text reveal (per line) | 600–900ms | `cubic-bezier(0.16, 1, 0.3, 1)` (A안 표준 carry) |
| Stagger between lines | 80–140ms | — |
| Hover / button | 160–220ms | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Scroll-linked parallax | scroll-driven | linear, scrubbed |
| Page/stage transition | 600–900ms | `cubic-bezier(0.7, 0, 0.3, 1)` |
| Cursor lerp | per-frame | `lerp ≈ 0.09` |
| Ambient hero loop | 6–10s full cycle | sinusoidal |
| 전체 reveal cap | ≤1.5s | `[observed best practice]` |

**Lenis (옵션, A1에서 재도입 시)** — `lerp: 0.08`, `smoothWheel: true`. Duration param은 lerp 설정 시 무시됨 `[observed: Lenis docs]`. A1 추천값 `lerp: 0.08`.

---

## 5. 컬러 토큰 (A1 — 흰 베이스 + 다크 hero)

| Token | Hex | Note |
|---|---|---|
| `--a1-paper` | **#FAFAF7** | paper white, 2% warm tint (pure #FFF X) |
| `--a1-midnight` | **#0B0F14** | hero base — off-black ink |
| `--a1-ink` | **#0F1419** | body on paper (A안 v3 carry) |
| `--a1-on-midnight` | **#E8E6DE** | body on hero — slight warmth |
| `--a1-mute` | **#5E6470** | secondary on paper |
| `--a1-on-mute` | **#8B919C** | secondary on midnight |
| `--a1-hairline` | **rgba(15,20,25,0.12)** | lozenge bullet, thread, button border |
| `--a1-hairline-strong` | **rgba(15,20,25,0.22)** | active thread, focused input |
| `--a1-accent-warm` | **#C77B3A** | single warm punctuation (rare — once per page) |
| `--a1-accent-deep` | **#2B3A4A** | slate (A안 carry) |

> `--a1-paper`가 pure `#FFFFFF`를 거부하는 이유 = `--a1-midnight`가 `#000`을 거부하는 이유와 동일. Pure 값은 untreated로 읽히고, tinted-near-pure는 **chosen**으로 읽힌다.

---

## 6. 구현 참고 자료

- [Lenis docs](https://lenis.darkroom.engineering/) — `lerp: 0.08–0.10`, easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10*t))`. Duration disabled when lerp set.
- [Cruip — Blur Reveal with Framer Motion + Tailwind](https://cruip.com/blur-reveal-effect-with-framer-motion-and-tailwind-css/) — 10px blur + 20% translateY + opacity 패턴. 본 `motion.div` 셋업에 직접 슬롯.
- [Codrops — SVG Mask Transitions on Scroll (GSAP ScrollTrigger, 2026)](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/) — §2 thread-reveal diagram용. 1s + 0.02s stagger.
- [Joseph Collicoat — IntersectionObserver + Framer Motion text reveal](https://www.josephcollicoat.com/articles/animating-text-with-the-intersection-observer-api-and-framer-motion) — 현 `useInView` 패턴과 호환.
- [ogblocks — 7 Framer Motion text patterns](https://ogblocks.dev/blog/framer-motion-text-animation) — split-letter, mask-slide-up, blur-fade. §1 hero에 mask-slide-up, §3 manifesto에 blur-fade.

---

## 7. 출처

- [monopo london — Awwwards SOTD](https://www.awwwards.com/sites/monopo-london)
- [monopo saigon — Awwwards SOTD](https://www.awwwards.com/sites/monopo-saigon)
- [TwelveLabs — Pentagram case study](https://www.pentagram.com/work/twelvelabs)
- [TwelveLabs identity inspired by motion studies — Creative Review](https://www.creativereview.co.uk/twelvelabs-ai-brand-identity-pentagram/)
- [New Logo for TwelveLabs — BP&O](https://bpando.org/2025/04/21/a-video-branding-twelvelabs-by-pentagram/)
- [Milling typeface — 205TF](https://www.205.tf/milling)
- [Gemini AI Visual Design — Google Design](https://design.google/library/gemini-ai-visual-design)
- [Recreating Gmail's Gemini Animation — CSS-Tricks](https://css-tricks.com/recreating-gmails-google-gemini-animation/)
- [Active Theory — WebGPU showcase](https://www.webgpu.com/showcase/active-theory-portfolio/)
- [Resn — DesignRush feature](https://www.designrush.com/best-designs/websites/resn)
- [Linear brand color palette — Mobbin](https://mobbin.com/colors/brand/linear)
- [Vercel Geist typography](https://vercel.com/font)
- [Lenis smooth scroll — darkroom.engineering](https://lenis.darkroom.engineering/)
- [Cruip — Blur Reveal Effect with Framer Motion](https://cruip.com/blur-reveal-effect-with-framer-motion-and-tailwind-css/)
- [Codrops — SVG Mask Transitions on Scroll (GSAP)](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
- [ogblocks — 7 Framer Motion text animation patterns](https://ogblocks.dev/blog/framer-motion-text-animation)
