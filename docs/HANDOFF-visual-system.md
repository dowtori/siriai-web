# HANDOFF — SIRIAI 비주얼 시스템 작업 (새 세션 인수인계)

> 이 문서는 **로컬 Claude Code 세션**이 끊김 없이 이어받기 위한 단일 컨텍스트 파일이다.
> 작성: 이전 클라우드 세션(`claude_code_remote`) / 대상: 윈도우 PC 로컬 세션.

---

## 0. 왜 세션을 바꿨나 (중요)

이전 작업은 **claude.ai/code 기반 클라우드 컨테이너**(격리 리눅스 VM)에서 진행됐다.
그 환경은 GitHub 레포만 clone돼 있어 **사용자 윈도우 PC의 로컬 파일에 접근 불가**다.
이번 비주얼 시스템 작업의 입력 산출물 4개가 윈도우 앱 캐시에만 존재하므로,
**로컬 파일 접근이 되는 로컬 세션이 적임자**라 인수인계한다.

→ 너(로컬 세션)는 아래 윈도우 경로에 **직접 접근 가능**해야 정상이다. 안 되면 사용자에게 경로 확인 요청.

---

## 1. 목표

SIRIAI 홈페이지(siriai-web)에 별도 에이전트가 만든 **레퍼런스 분석·비주얼 스타일가이드·디자인 토큰**을
안전하게(임의 큰 변경 금지) 단계적으로 적용한다.

---

## 2. 산출물 원본 경로 (윈도우 로컬 캐시 — 휘발 가능)

```
C:\Users\1004\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\local-agent-mode-sessions\c5d2488a-2992-4033-a046-d456f0270fcd\508b6b15-de95-4deb-b55b-ac64dd4460e0\local_4cf43fc4-1186-44f5-862a-7d59bfc2a6de\outputs
```

이 폴더의 4개 파일을 레포로 복사 (폴더 없으면 생성):

| 원본 | → 레포 목적지 |
|---|---|
| `SIRIAI_design-tokens.css` | `src/styles/tokens.css` |
| `SIRIAI_02_비주얼_스타일가이드.html` | `docs/style-guide.html` |
| `SIRIAI_01_레퍼런스_분석_리포트.md` | `docs/reference-report.md` |
| `SIRIAI_03_클로드코드_협업_프롬프트.md` | `docs/visual-workflow.md` |

---

## 3. 작업 절차 (순서대로, 안전하게)

### [0] 안전장치
- 작업 브랜치: **`design/visual-system`** (이미 origin/master에서 분기·push됨 — `git checkout design/visual-system && git pull`).
- 기존 파일 삭제·대규모 리라이트 금지. 작은 단위 커밋.
- 확신 없으면 바꾸지 말고 질문으로 남길 것.
- **각 스테이지(D-1, D-2…)를 사용자와 문답으로 진행** (사용자 명시 요구).

### [1] 산출물 복사
- §2 표대로 복사. `src/styles`, `docs` 없으면 생성. 복사만 하고 적용은 [4]에서.

### [2] 현재 코드 진단 — **이미 완료됨 (아래 §5 결과 그대로 사용, 재진단 불필요)**

### [3] 보고 후 승인 대기
- (1) 복사 완료 (2) 스타일 구조 (3) 기존 브랜드 컬러 (4) 토큰 적용 계획 보고 → 승인 전 컴포넌트/레이아웃 변경 금지.

### [4] (승인 후) 적용
- `docs/visual-workflow.md`의 **'C. CLAUDE.md 규칙'**을 프로젝트 `CLAUDE.md`에 추가.
- 같은 문서 **'D-1 토큰 적용'**부터 단계적. 각 단계 후 스크린샷 → `docs/style-guide.html`과 대조 → 차이 보고.
  - 로컬은 `npm run dev` 후 브라우저/스크린샷 가능. (클라우드 세션에선 불가했던 부분)

---

## 4. AskUserQuestion 규칙 (프로젝트 합의)

문답 시 **추천안을 첫 번째에 두고 label 끝에 `(Recommended)`** 표기. (CLAUDE.md에도 기재됨)

---

## 5. 현재 코드 진단 결과 (이전 세션이 완료 — 재사용)

기준 시점: `origin/master` = `3bf412b` (CLAUDE.md v2.0).

### 5.1 스타일 구조
| 항목 | 값 |
|---|---|
| Framework | Next.js 16 App Router (Turbopack) |
| Styling | **Tailwind CSS v4** — CSS-first config, `tailwind.config.*` 없음, `postcss.config.mjs`만 |
| 전역 스타일 | `src/app/globals.css` (74줄): `@import "tailwindcss"` + `:root` 토큰 + `@theme inline` |
| 폰트 | `@fontsource/pretendard` 400/500/600/700/800 · `--font-sans: "Pretendard", ...` |
| 기타 | `scroll-behavior:auto`(Lenis 제어), marquee keyframes 2개, 커스텀 scrollbar |

`globals.css` `:root` 기존 토큰: `--bg-primary:#F4F1EB`, `--bg-dark:#0A0A0A`, `--text-primary:#000`, `--text-white:#fff`, `--text-muted:#6B6B6B`, `--border:rgba(0,0,0,.1)` + typography clamp(`--display/--heading/--body/--caption`).

### 5.2 기존 브랜드 컬러 (소비 빈도순) — ⚠️ 절대 임의 덮어쓰기 금지
| 컬러 | 역할 | 정의 | 사용 |
|---|---|---|---|
| `#F4F1EB` | Cream 메인 배경 | `--bg-primary` | 17회 |
| `#111110` | Dark 메인 배경 | **미정의**(CLAUDE.md만) | 15회 |
| `#c4b5fd` | **보라(라벤더) 액센트 — 시각 시그니처** | 미정의 | 12회 (OrbCanvas Sparkles/Bloom, Growth gradient, dots, 카드 strip) |
| `#3D3B2A` | Dark olive (Architecture) | 미정의 | 6회 |
| `#818cf8` | 보라 보조(인디고) | 미정의 | 4회 (gradient stop, bar) |
| `#0A0A0A` | (legacy) `--bg-dark` | `--bg-dark` | **불일치**: 코드는 `#111110` 사용 |
| `#000`/`#fff`/`#6B6B6B` | text | `--text-*` | 일관 |

- 카드 배경 6종(각 1회): `#fef9e7 #fdf2f0 #f0f4f8 #ece6f5 #e8f4ec #e8edf8`(+`#dce8ff`) — Archiving/RelationshipIntro.
- TurntableCarousel 채도색 12종(`#ffee00` 등) — 차량 페인트칩, 도메인-특정.
- 폰트 예외 1: `GrowthSection.tsx:72` SVG label `fontFamily="monospace"`.

### 5.3 🔴 브랜드 컬러 핵심 경고
제안 토큰 액센트 **`#C0532F`(테라코타)** ↔ 기존 브랜드 **보라(`#c4b5fd`/`#818cf8`)** = **다른 컬러 패밀리**.
보라는 OrbCanvas WebGL 셰이더(Hero 오브), Growth 차트, 카드 strip 등에 깊게 박힌 시그니처.
토큰 액센트는 사용자가 **'제안값'**이라 명시 → 기존 브랜드 우선, 토큰을 거기 맞춰 교정. **단순 교체 불가.**

### 5.4 하드코딩 분산
| 카테고리 | 분포 |
|---|---|
| 컬러(arbitrary) | `bg-[#F4F1EB]`×8, `bg-[#111110]`×7, `bg-[#c4b5fd]`×3, 카드 배경 6종 |
| rgba | dark 위 white overlay 18+ (`rgba(255,255,255,0.015~0.28)`) |
| Radius | `rounded-full`×17, `rounded-2xl`×5, `rounded-xl`×1, inline `borderRadius:"50%"`×6 |
| Font size | 8+ 컴포넌트 inline `fontSize: clamp(...)`, 값이 제각각 |
| Spacing | arbitrary 1건만 — 거의 일관 |

### 5.5 토큰 적용 계획 (제안 — 승인 후 실행, 비파괴 점진)
1. `src/styles/tokens.css` 신규 + `globals.css`에서 `@import` (기존 `:root`와 namespace 충돌 회피)
2. 불일치 fix: `--bg-dark:#0A0A0A` → `#111110` (코드 정합)
3. 기정의 토큰 활용: `bg-[#F4F1EB]`×8, `bg-[#111110]`×7 → Tailwind v4 theme 토큰으로 치환
4. 카드 배경 6종 → 토큰 매핑 vs 유지 (스타일가이드 참고)
5. 보라 액센트 토큰화 (브랜드 결정 — §5.3)
6. radius·typography clamp 정규화 (영향 큼, 마지막)

컴포넌트/레이아웃 무변경, 시각 결과 무변화 목표.

---

## 6. 브랜치 지형 (혼동 주의)

- **`design/visual-system`** ← **이번 작업 브랜치**. `origin/master`(`3bf412b`)에서 분기. (이 핸드오프 문서가 여기 있음)
- `claude/mystic-compressed-a1` ← **별개 트랙** (A1 "Mystic Compressed", master 대비 74커밋 앞). 비주얼 시스템과 무관. 합칠지는 미정.
- 기타 `claude/redesign-*`, `claude/visual-impact-bn` ← 과거 트랙.

→ 비주얼 시스템 base를 master(현재)로 갈지, mystic-compressed-a1 위에 얹을지는 **미해결 질문**(§8).

---

## 7. 미해결 질문 (새 세션 첫 라운드에 문답)
1. **브랜드 액센트**: 기존 보라(`#c4b5fd`) 유지 + 토큰 교정 vs 제안 테라코타(`#C0532F`) 채택 vs 절충. → §5.3
2. **base 브랜치**: master vs mystic-compressed-a1 위.
3. **카드 배경 6종**: 토큰화 vs 도메인-특정 유지.
4. **적용 범위**: `/`(v3 운영) 전체 vs 특정 섹션부터.

---

## 8. 참고 문서 (레포 내)
- `PLAN.md` — 전체 작업 이력 (Plan A / B / A1 트랙, Phase별 일지). A1 트랙 상세는 §3.
- `CLAUDE.md` — 프로젝트 규칙·스택·디자인 시스템 요약.
- `PRD-A1.md`, `RESEARCH-A1.md` — A1 트랙 전용 (이번 작업과 별개, 참고만).

---

## 9. 새 세션 시작 프롬프트 (사용자가 붙여넣을 것)
`docs/HANDOFF-visual-system.md`를 가장 먼저 읽고 시작하라는 짧은 프롬프트는 이 문서와 함께 전달됨.
