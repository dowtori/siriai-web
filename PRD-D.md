# Siriai Website — Plan D — Product Requirements Document

> 작성일: 2026-05-20
> 코드네임: **Plan D — "Architecture in Motion"**
> 레퍼런스: [lusion.co](https://lusion.co) — 시네마틱 WebGL · 시퀀스 내러티브 · 인터랙티브 케이스 갤러리
> 위치: v2.0과 병행 보관. 진행 시 `src/app/(plan-d)/` 라우트 그룹으로 분기 구축.

---

## 0. Plan D가 존재하는 이유

v2.0은 "15 섹션의 정보 운반"에 충실했다. 그러나 Siriai의 본질 — **"AI 운영 구조 설계"** — 는 정보가 아니라 **체험**으로 전달되어야 한다.

Lusion은 작품 자체를 시연한다. 카피로 설명하지 않는다. Plan D도 같은 길을 간다:

- **"우리는 구조를 만든다"** 라고 쓰는 대신, 사용자가 페이지에 들어선 순간부터 그 구조가 **로딩되는 과정을 목격하게** 한다.
- 섹션을 나열하지 않는다. **하나의 시네마**로 흐른다. 챕터는 있되, 컷은 끊기지 않는다.
- 텍스트는 화면을 가득 채울 권리가 있다. 다만 그 텍스트는 **타이포그래피 자체가 모션**이다.

핵심 메시지는 유지: **"AI를 쓰는 것이 아니라, AI로 생각하는 것."**

---

## 1. 디자인 철학 (Lusion → Siriai 번역)

| Lusion 시그너처 | Siriai 적용 |
|---|---|
| Cinematic preloader ("Loading 87%") | **Booting Architecture…** 부팅 시퀀스 — 노드 그래프가 한 줄씩 점등 |
| 풀스크린 WebGL 히어로 | 마우스 추적 **노드 필드** — 점·선이 구조를 그리며 호흡 |
| Editorial type 풀블리드 | 디스플레이 세리프 × 모노 × 산스 **3중 타입 시스템** |
| Custom cursor (디스크/링) | 보라 링 커서 — 인터랙티브 영역에서 확장·문구 표시 |
| Page transition curtain | 챕터 전환 시 **수직 슬라이스 와이프** (Lusion 시그너처 mimic) |
| 횡스크롤 케이스 갤러리 | Literacy Lab — **수평 케이스 트랙** (휠로 가로 진행) |
| Glitch/displacement text | 헤드라인이 **포커스 진입 시 distortion → 정렬** |
| Bento asymmetric grid | Practice (서비스) — **6 칸 비대칭 모듈** |
| 다크 우선, 크림 인서트 | **다크 퍼스트** + 단 2개 크림 인터루드 (호흡 구간) |

### 변하지 않는 것

- 브랜드 톤: 간결·단호·선언적
- 컬러 코어: cream `#F4F1EB`, dark `#111110`, dark olive `#3D3B2A`, violet accent `#c4b5fd / #818cf8`
- 한국어 줄바꿈 정책: `word-break: keep-all`
- 기술 스택: Next.js 16 App Router · TS strict · Tailwind v4 · framer-motion · @react-three/fiber · Lenis · Supabase

---

## 2. 페이지 시퀀스 (10 챕터, 1 시네마)

```
/d                          src/app/(plan-d)/page.tsx
│
│  [Global Overlay]
├── Boot                    : 부팅 시퀀스 (최초 진입 시 1회)
├── Cursor                  : 커스텀 보라 링 커서
├── Curtain                 : 챕터 전환 와이프 (라우트 변경 시)
├── Chapter HUD             : 좌하단 챕터 번호/타이틀 (Lusion 스타일)
│
│  [Cinema]
├── 00  Field               다크. WebGL 노드 필드. 단어 distortion 진입.
├── 01  Premise             다크. "AI로 생각한다" 풀블리드 에디토리얼.
├── 02  Atlas               다크 olive. 8 구조 컴포넌트 — sticky 320vh 스크럽.
├── 03  Practice            크림 인터루드. 비대칭 벤토 6 칸 서비스.
├── 04  Literacy Lab        다크. 수평 스크롤 케이스 트랙.
├── 05  Evidence            다크. 데이터 비주얼 + 포토서클 그리드(축약).
├── 06  Pulse               다크. 스크롤 스크럽 풀블리드 인용.
├── 07  Studio              크림 인터루드. AI 툴 마키 + 운영 원리.
├── 08  Signal              다크. CTA — 컨택 폼 인라인.
└── 09  Sign-off            다크. 미니멀 푸터.

/d/work/[slug]              개별 케이스 디테일 (Plan D 신규)
/d/contact                  컨택 (Plan D 신규 — /signal 인라인 폼과 별도 라우트)
/api/contact                기존 유지 (Supabase insert)
```

---

## 3. 챕터별 상세 명세

### Chapter 00 — **Field** (Hero)

- **배경**: 다크 `#0A0A09`. 노이즈 그레인 오버레이 (CSS `mix-blend-overlay` 0.04).
- **WebGL**: `<NodeField />` — 인스턴스드 메쉬 256 노드 + Catmull-Rom 라인 64개. 마우스 인근에서 노드가 발광 & 인력. fragment shader에서 distance-based glow.
- **헤드라인**: `"We architect the way you think with AI."`
  - 단어 단위 entry — `clip-path: inset(100% 0 0 0)` → `inset(0)`, 0.08s stagger, `[0.22, 1, 0.36, 1]`.
  - 동시에 GLSL displacement 미세 적용 (scroll velocity → uniform).
- **서브**: 모노 타입 `> SIRIAI / ARCHITECTURE STUDIO / EST. 2024`.
- **인터랙션**: 마우스 정지 2초 → 노드 필드가 자기 자신을 그리기 시작 (idle ambient state).
- **스크롤 트리거**: 노드 필드 z-out (camera dolly), 텍스트 distortion 증가 후 fade-out.

### Chapter 01 — **Premise**

- **배경**: 다크 풀블리드.
- **레이아웃**: 좌 1/3 비어둠. 우 2/3에 에디토리얼 디스플레이 세리프 거대 텍스트.
  - `AI를 쓰는 것이 아니라, AI로 생각하는 것.`
  - 한 줄씩 스크롤 스크럽 reveal — `useScroll` + `useTransform` + clip-path mask.
- **사이드 캡션**: 좌 가장자리 세로쓰기 모노 — `01 / PREMISE`.
- **장식**: 우상단 작은 violet 점 — pulsing (5s loop).

### Chapter 02 — **Atlas** (Architecture)

- **배경**: 다크 olive `#3D3B2A` (브랜드 자산 유지).
- **구조**: sticky 320vh — Lusion의 스토리텔링 sticky.
- **스크럽 단계**:
  1. `[0.00 → 0.10]` 헤드 진입: "여덟 개의 구조 컴포넌트로 사고를 설계한다."
  2. `[0.10 → 0.80]` 좌측 sticky 3D 모델 (R3F — 회전하는 메쉬 라이브러리) + 우측 8 컴포넌트 카드가 순차 swap. 카드 1개당 [t, t+0.0875] 구간.
     - Context · Signal · Question · Edge · Clarity · Modeling · Oversight · Trace
  3. `[0.80 → 1.00]` 헤드 fade + 다음 챕터 큐 ("Practice →").
- **3D 모델**: 각 컴포넌트마다 다른 프리미티브 (Icosahedron / Torus / Box-grid / Tetra…). MeshDistortMaterial.
- **타이포**: 카드 번호는 모노 `0/8`, 타이틀은 sans bold, 본문은 본 시리아이 톤.

### Chapter 03 — **Practice** (Services) — 크림 인터루드

- **배경**: cream `#F4F1EB`. 다크에서 진입할 때 **상단 와이프 마스크** (clip-path bottom→top 100% 진행).
- **레이아웃**: 비대칭 벤토 6 칸.
  ```
  ┌──────────┬───────┬───┐
  │   01     │  02   │ 03│
  │ (2x2)    │ (1x2) │   │
  │          │       ├───┤
  │          │       │ 04│
  ├──────┬───┴───────┴───┤
  │  05  │       06      │
  └──────┴───────────────┘
  ```
- **카드**: 호버 시 carddrm border가 violet으로 점등 + 내부 micro 3D 아이콘 회전.
- **콘텐츠**: AI 아키텍처 컨설팅 · 리터러시 워크샵 · 운영 시스템 구축 · 데이터 진단 · 콘텐츠 운영 · 자문.

### Chapter 04 — **Literacy Lab** (수평 스크롤)

- **배경**: 다크.
- **메커니즘**: section pin (sticky) + transform translateX 매핑. `containerScrollProgress → x: 0 → -(N-1) * vw`.
- **카드**: 6~8 케이스. 각 카드는 비디오/이미지 + 클라이언트명 + 한 줄 결과.
- **인터랙션**: 카드 호버 시 cursor가 "VIEW →"로 변환. 클릭 → 챕터 전환 와이프 후 `/d/work/[slug]` 디테일 페이지.
- **하단 진행 표시**: `01 / 08 ━━━━━━━━━━━━━━` 트랙 바.

### Chapter 05 — **Evidence** (Growth + Works 통합)

- **배경**: 다크.
- **상단 절반**: SVG 성장 곡선 — 기존 GrowthSection 자산 재활용. pathLength 드로우 + violet glow.
  - 다만 **분기점 데이터포인트 호버 시 툴팁** 확장 (모노 라벨, 수치).
- **하단 절반**: 포토서클 그리드 12장 (16 → 12로 축약). RAF hover 회전 유지.
- **사이드 통계**: `30+ 프로젝트 / 12+ 클라이언트 / 100% 재구매`.

### Chapter 06 — **Pulse** (Manifesto Quote)

- **배경**: 다크 풀블리드. 우하단 violet 글로우 (radial 800px, blur 200px, opacity 0.3).
- **콘텐츠**: 5~6줄 매니페스토.
- **모션**: 스크롤 스크럽 — 줄별 0.15 구간 reveal. 각 줄은 `y: 24 → 0` + `opacity: 0 → 1` + `letterSpacing: 0.04em → 0em`.

### Chapter 07 — **Studio** (AI Studio) — 크림 인터루드

- **배경**: cream.
- **레이아웃**: 좌 카피 / 우 양방향 마키 2줄 (AI 툴 로고).
  - 1행: 정방향, 2행: 역방향. 6s/12s loop.
- **운영 원리 strip**: 4 stat — 사용 툴 수, 자동화 워크플로 수, 평균 응답 단축, 운영 시간.

### Chapter 08 — **Signal** (CTA + Contact)

- **배경**: 다크.
- **좌**: 큰 카피 `"You don't need another tool. You need a thinking architecture."` + sub.
- **우**: 인라인 컨택 폼 (name · email · message · 카테고리 셀렉트).
  - 제출 → `/api/contact` (기존 Supabase 엔드포인트 재사용).
  - 성공 시 폼이 violet glow와 함께 fade-out → `Signal received.` 텍스트 reveal.
- **마이크로 인터랙션**: 인풋 포커스 시 보라 언더라인 그로우 + 라벨 위로 이동.

### Chapter 09 — **Sign-off** (Footer)

- **배경**: 다크.
- **콘텐츠**:
  - 좌: `SIRIAI` 워드마크 (대문자, tight letter-spacing)
  - 중앙: 4개 링크 컬럼 (Work · Studio · Contact · Index)
  - 우: 작은 한국어 사업자 정보, 메일, SNS
- **하단 바**: `© 2026 SIRIAI — Architecting the way you think.` + 로컬 시간 (KST live clock).
- **이스터에그**: 워드마크 호버 시 글자별 distortion + 노드 필드 미니 인스턴스 발현.

---

## 4. 글로벌 UX 시스템

### 4.1 Boot Sequence (`<BootOverlay />`)

- **트리거**: 사이트 최초 진입 1회. `sessionStorage.bootSeen` 체크.
- **시간**: 약 2.2초 (Lusion 톤 유지, 짜증나지 않는 길이).
- **구성**:
  1. 다크 풀블리드.
  2. 중앙 모노 텍스트 `BOOTING ARCHITECTURE` + 진행률 `00 → 100`.
  3. 진행률 바 = 1px 보라 라인, scaleX [0 → 1].
  4. 하단에 라인별 페이드인 로그 (10줄):
     ```
     > establishing context
     > parsing signals
     > calibrating questions
     > drawing edge
     > clarifying frame
     > modeling sequence
     > oversight enabled
     > trace ready
     > architecture online
     > welcome.
     ```
  5. 완료 시 전체가 위로 wipe-out (clip-path bottom-up), Hero 노드 필드가 동시에 페이드인.
- **스킵**: 누구나 클릭/키프레스로 즉시 종료 (사용자 존중 원칙).

### 4.2 Custom Cursor (`<RingCursor />`)

- **기본 상태**: 12px 보라 디스크 + 24px 링 (링은 따라오는 lag 0.12s).
- **호버 가능 영역**: 링이 48px로 확장, 디스크 사라짐, 텍스트 라벨 인서트 가능 (`VIEW`, `OPEN`, `SEND` 등).
- **드래그 가능 영역**: `← DRAG →` 라벨.
- **다크/크림 전환**: cursor 색상 자동 반전 (mix-blend-mode: difference).
- **터치 디바이스**: 비활성.

### 4.3 Curtain Transition (`<ChapterCurtain />`)

- **메커니즘**: 라우트 전환 시 다크 슬라이스 5개가 수직으로 stagger 닫힘 → 페이지 교체 → stagger 열림.
- **시간**: 닫힘 0.6s, 열림 0.6s. 총 1.2s.
- **이스터에그**: 슬라이스 가운데 1개에 작은 챕터 번호 (e.g., `→ 04`) 표시.

### 4.4 Chapter HUD (`<ChapterHUD />`)

- **위치**: 좌하단 고정. `bottom-6 left-6`.
- **표시**: `현재 챕터 번호 / 09  —  타이틀` (모노 11px).
- **인터랙션**: 클릭 시 작은 챕터 인덱스 메뉴 펼침 (Lusion `INDEX` 톤).
- **모바일**: 보임 유지, 크기만 축소.

### 4.5 Scroll System

- **Lenis**: `duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4)`. 약간 더 무겁게 (현재 1.55 → 1.6).
- **휠 인터셉트**: Literacy Lab 챕터에서만 임시 vertical → horizontal 매핑 (sticky 구간 한정).
- **모멘텀 종료 후**: 챕터 경계 ±80px 이내라면 부드러운 보정 (사용자 제어를 빼앗지 않는 선에서).

### 4.6 진행 시각화

- 기존 `ScrollProgressBar` 폐기. 대신:
  - **좌상단 모노 시계**: `KST 03:14` live + 챕터 진행률 `01.42`.
  - **우측 도트 레일**: 9 챕터 (현재 11 → 9 축약). 다크/크림 전환은 mix-blend-difference로 자동 처리.

---

## 5. 타이포그래피 시스템 (확장)

| 역할 | 패밀리 | 사이즈 | 비고 |
|---|---|---|---|
| Display Serif | Fraunces / Tiempos (Adobe Fonts) | `clamp(3rem, 7vw, 9rem)` | Premise, Pulse 챕터 전용 |
| Sans Bold | Pretendard | `clamp(2rem, 3.5vw, 5rem)` | Field, Atlas, Practice 헤드 |
| Mono | JetBrains Mono | `11px → 13px` | 라벨, HUD, 보조 텍스트 |
| Body Sans | Pretendard | `14px / leading 1.9` | 본문 |

**중요**: 디스플레이 세리프는 Plan D의 시그너처. v2.0에는 없던 자산. 가능하면 자체 호스팅(`@fontsource`).

---

## 6. 사운드 (선택사항, v2 백로그)

- Lusion은 종종 미세한 사운드 큐를 사용 (boot 완료, 챕터 전환).
- Plan D v1에는 **포함하지 않음**. v2 백로그.
- 도입 시 원칙: 음소거 기본, 음량 제어 가능, 사용자 첫 인터랙션 이후에만 재생.

---

## 7. 컴포넌트 자산 보존 vs 신규

### 보존 (이관)
| v2.0 자산 | Plan D 매핑 |
|---|---|
| `OrbCanvas` | Field 챕터 NodeField와 조합. 중앙 오브로 재사용 가능. |
| `TurntableCarousel` | Practice 챕터 또는 Atlas 보조 비주얼로 재활용. |
| `GrowthSection` SVG 곡선 | Evidence 챕터 상단으로 이관. |
| `PhotoCircle` (Works) | Evidence 챕터 하단. 16 → 12장 축약. |
| `Supabase route` `/api/contact` | Signal 챕터 폼이 그대로 사용. |
| 컬러/이지잉/keep-all 등 디자인 토큰 | 전부 유지. |

### 신규
- `<BootOverlay />`
- `<RingCursor />`
- `<ChapterCurtain />`
- `<ChapterHUD />`
- `<NodeField />` (R3F instanced + custom shader)
- `<DistortText />` (scroll velocity → GLSL uniform)
- `<HorizontalTrack />` (Literacy Lab 횡스크롤 컨테이너)
- `<BentoGrid />` (Practice 비대칭 그리드)
- `<ChapterSerif />` (디스플레이 세리프 마스크 reveal)

### 폐기 (v2.0 라우트에서만, Plan D 라우트 그룹에서는 비사용)
- `ConnectionSection`, `RelationshipIntroSection` — 메시지가 Premise + Atlas로 통합됨.
- `PhilosophySection` (sticky 280vh) — Atlas로 재구성.
- `ArchivingSection` — Literacy Lab의 케이스 갤러리로 흡수.
- `SectionIndicator` (도트 레일 11) — Chapter HUD + 우측 9-도트 간소화.
- `ScrollProgressBar` (상단 라인) — 좌상단 모노 카운터로 교체.

---

## 8. 라우트 분기 전략

- Plan D는 **별도 라우트 그룹**으로 구축. v2.0 라이브를 건드리지 않는다.
- 구조: `src/app/(plan-d)/`
  - `/d` → Plan D 홈 (시네마)
  - `/d/work/[slug]` → 케이스 디테일
  - `/d/contact` → 풀페이지 컨택
- `(plan-d)` 그룹 layout에서 BootOverlay·RingCursor·ChapterCurtain·ChapterHUD를 portal 마운트.
- 폰트 로딩도 그룹 layout에서만 (`Fraunces`).
- 결정되기 전까지 `/` 는 v2.0 유지. 결정 후 `/d` → `/` 스왑 머지.

---

## 9. 성능 예산

| 항목 | 목표 |
|---|---|
| LCP (Field 챕터) | < 2.5s (4G) |
| CLS | < 0.05 |
| Hero JS bundle | < 220KB gzipped (R3F 청크 분리 dynamic import) |
| 60fps 유지 | Atlas sticky 스크럽, Literacy Lab 횡스크롤 |
| 모바일 WebGL | NodeField 노드 수 256 → 96으로 자동 감산 |
| Boot 완료 후 | NodeField idle 30fps cap (배터리 절약) |

**원칙**: 모바일은 WebGL을 포기하지 않되, 셰이더 정밀도와 노드 수만 감산. boot sequence는 모바일에서도 동일 톤 (텍스트만, 더 짧게 1.5s).

---

## 10. 접근성

- prefers-reduced-motion → BootOverlay 즉시 종료, NodeField 정적 SVG로 폴백, distortion 비활성, 횡스크롤은 일반 세로 스크롤로 폴백.
- 키보드 네비게이션 — Chapter HUD 인덱스 메뉴는 풀 a11y (focus trap, escape close).
- 모든 모션은 의미를 갖되, 정보는 모션 없이도 도달 가능해야 함.

---

## 11. 마일스톤 (Plan D 빌드 로드맵)

### M1 — Skeleton (1주)
- `(plan-d)` 라우트 그룹 생성, 폰트·토큰·layout 준비
- BootOverlay · RingCursor · ChapterHUD 스켈레톤
- 9 챕터 빈 컨테이너 + 스크롤 흐름 검증

### M2 — Core Cinema (2주)
- Field (NodeField R3F)
- Premise · Pulse (DistortText + scroll-scrub serif)
- Atlas (sticky 320vh, 8 컴포넌트 swap)

### M3 — Density (2주)
- Practice (BentoGrid)
- Literacy Lab (HorizontalTrack + 케이스 카드)
- Evidence (Growth + PhotoCircle 통합)
- Studio · Signal (form) · Sign-off

### M4 — Polish (1주)
- ChapterCurtain 라우트 전환
- 모바일 폴백 & 감산
- prefers-reduced-motion 분기
- Lighthouse 측정 → 성능 예산 충족 확인

### M5 — Cutover (0.5주)
- `/d` 내부 리뷰 통과 후 `/`로 스왑
- v2.0 라우트는 `/legacy/` 또는 git 태그로 보관

---

## 12. 결정 로그

| 날짜 | 결정 |
|---|---|
| 2026-05-20 | **Plan D 출범**. v2.0의 정보 운반 중심 구조를 시네마틱 WebGL 시퀀스로 재구성. 레퍼런스: lusion.co. |
| 2026-05-20 | **별도 라우트 그룹 `(plan-d)`로 병행 구축**. 결정 전까지 프로덕션 무영향. |
| 2026-05-20 | **다크 퍼스트** 전환 — 크림은 2개 인터루드(Practice, Studio)로 축약. |
| 2026-05-20 | **15 섹션 → 9 챕터** 통폐합. Connection/Relationship → Premise+Atlas, Archiving → Literacy Lab 흡수. |
| 2026-05-20 | **타이포 3중 시스템** 도입 — Display Serif (Fraunces) 신규. |
| 2026-05-20 | **사운드는 v1 미포함, v2 백로그**. |
