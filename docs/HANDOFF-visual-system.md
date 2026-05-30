# HANDOFF — SIRIAI 비주얼 시스템 (로컬 세션 인수인계 v2)

> 이전 세션: claude.ai/code 클라우드 컨테이너 / 다음 세션: 윈도우 PC 로컬 Claude Code.
> 이 문서 하나만 읽으면 멈춤 없이 production line 운영 가능.

---

## 0. 왜 로컬로 옮기는가 (냉정한 이유)

입력 파일 접근 문제는 채팅 첨부로 이미 해결됐다(파일 4개 레포 복사 완료).
**진짜 이유는 "비주얼 production 라인 운영 효율"이다.**

| 항목 | 클라우드 | 로컬 |
|---|---|---|
| Skills 확장 | 빌트인 한정 | `~/.claude/skills/` 무제한 |
| MCP 커넥터 | 사전 허용된 것만 (세션 중 연결 끊김 사례 있음) | **Figma·Linear·Slack·GitHub·커스텀** 자유 등록 |
| 사용자 시각 피드백 | Vercel preview(분 단위) / SendUserFile | `npm run dev` = sub-second |
| 장시간 자율 하네스 | 세션 TTL · idle reclaim 위험 | 무제한 |
| 환경 영속 | 컨테이너 재설정 가능 | 한 번 셋업 후 유지 |
| 여러 산출물 동시 검토 | 갤러리 전송 | dev port 여러 개 동시 |

→ "가능하냐"가 아니라 "최선이냐" 기준. 비주얼 production = 로컬이 명확히 우월.

---

## 1. 목표

별도 에이전트가 만든 비주얼 가이드(`docs/`)와 토큰(`src/styles/tokens.css`)을 메인 `/`(v3)에 적용해
**완성도 높은 시안 N개를 자동으로 생성** → 사용자가 단 1회 방향 선택 → 운영 페이지 확정.

비즈니스 원칙: **"1개를 완벽히, 매번 묻고"가 아니라 "N개를 동시에 → 비교 → 확정"**.
1차 프로덕트조차 완성 못 한 상태를 반복하지 않는다.

---

## 2. 확정 사항 (재논의 금지, 진행 전제)

이전 세션 사용자 문답으로 확정:

1. **적용 범위 = 메인 `/`(v3) — 비주얼만**.
   산출물의 K뷰티·인플루언서 카피·케이스(TOCOBO/NCT WISH/무신사)는 **채택 안 함**.
   AI 컨설팅 정체성(CLAUDE.md 본문) 그대로 유지.

2. **브랜드 액센트 = 보라 유지 + 토큰 교정**.
   산출물 원본 테라코타 `#C0532F`는 제안값 → 폐기.
   `--c-accent:#c4b5fd` / `--c-accent-soft:#ece6f5` / `--c-accent-ink:#818cf8`.
   OrbCanvas Sparkles/Bloom·Growth gradient·card strip 자산 그대로 보존.

3. **폰트 = Fraunces 페어링 도입**.
   헤드라인 `--f-serif:Fraunces`, 본문·UI `--f-sans:Inter,Pretendard`.
   한국어 헤드라인은 Pretendard / Noto Serif KR fallback.

4. **AskUserQuestion 규칙**: 추천안을 첫 번째에 두고 label 끝 `(Recommended)` 표기.

---

## 3. 현재 상태 (이미 한 일 — 다시 하지 말 것)

브랜치: **`design/visual-system`** (origin/master `3bf412b`에서 분기).
마지막 commit: **`6b3189c`**.

### 완료된 커밋 시퀀스
```
3e6718e  chore(visual): 비주얼 시스템 산출물 4개 레포로 복사
         → src/styles/tokens.css, docs/style-guide.html,
           docs/reference-report.md, docs/visual-workflow.md
(token)  tokens(visual): accent·dark 교정 (테라코타→보라, 1C1A17→111110)
(claude) docs(CLAUDE): SIRIAI 비주얼 규칙 추가 (design/visual-system 트랙)
6b3189c  feat(visual): tokens.css import + Fraunces 폰트 로드
         → globals.css에 @import 2줄 추가만, 기존 토큰·body 그대로
```

### 현재 효과
- `tokens.css` 정의는 노출됐으나 **컴포넌트 클래스는 0건 변경** → 시각 결과 무변화 (안전한 도입 단계).
- `npm run build` 통과 (7 라우트 prerender).
- Fraunces 폰트는 로드되지만 아직 어디서도 사용 안 함.

### 진단 결과 (재사용)
| 항목 | 값 |
|---|---|
| Framework | Next.js 16 App Router · Turbopack |
| Styling | Tailwind v4 (CSS-first, config 파일 없음) |
| 전역 스타일 | `src/app/globals.css` |
| 기존 폰트 | Pretendard 400-800 (`@fontsource`) |

기존 하드코딩 (치환 대상):
- `bg-[#F4F1EB]` × 8, `bg-[#111110]` × 7 (Tailwind arbitrary)
- 카드 배경 6종 (`#fef9e7 #fdf2f0 #f0f4f8 #ece6f5 #e8f4ec #e8edf8 #dce8ff`)
- `rounded-full` × 17, `rounded-2xl` × 5
- 인라인 `fontSize: clamp(...)` 컴포넌트마다 다른 값

---

## 4. 자동 하네스 — Visual Production Line 설계

사용자 명시: **"피드백마다 수동 병목 없이 자동으로 완성까지"**. 폐쇄 루프 6단계.

```
[1] Reference Baseline
    docs/style-guide.html → Playwright 캡처 → docs/_baselines/style-guide.png
    src/styles/tokens.css → 코드 표준 1세트
    이 둘이 모든 평가의 기준점

[2] Variant Generator
    /lab/<section>/<a..f> 라우트 자동 생성 (operational / 와 격리, noindex)
    한 섹션에 N개(4~6) variant — 같은 토큰 위에서 1축만 다르게
    (예: 정렬 / 폰트 weight / 여백 / 비대칭 그리드 / 다크-라이트)

[3] Auto Capture
    scripts/lab-capture.ts — Playwright headless chrome
    같은 viewport(1440×900) · 같은 폰트 로딩 대기 · prefers-reduced-motion
    PNG로 docs/_lab/<section>/<id>.png

[4] Auto Evaluator (Claude 멀티모달)
    Read 도구로 각 캡처를 직접 봄. 6축 평가:
      ① 토큰 일치  ② 8px 그리드 정렬  ③ 시각 위계
      ④ 여백 비율  ⑤ 대비/접근성  ⑥ 에디토리얼 결
    각 variant 점수표 + 약점 + 다음 iter 후보 제안

[5] Auto Iterate (3~5회)
    약점 → 코드 자동 수정 → 다시 캡처 → 다시 평가
    내부 루프, 사용자 호출 0

[6] Curated Delivery (사용자 호출 1회만)
    살아남은 N개 PNG 갤러리로 SendUserFile / 또는 docs/_lab/index.html
    사용자는 "방향 X로 간다" 한 번만 결정
    그 결정이 다음 라운드 evaluator 기준으로 박힘 → 시간 갈수록 사용자 결로 수렴
```

### 자동 평가의 한계 (정직)
- 정량(토큰·그리드·대비) = 거의 완전 자동
- 정성("에디토리얼 결인가") = 내 멀티모달도 사용자 취향만큼은 못 align
  → 첫 라운드는 내가 *제시*, 사용자 한 번 결정이 evaluator 기준으로 박힘 (점진 수렴)

---

## 5. 기술 셋업 체크리스트 (로컬 세션 첫 작업)

```bash
# 1. 최신 가져오기
git fetch origin
git checkout design/visual-system
git pull

# 2. 의존성
npm install

# 3. Playwright (캡처 도구)
npm i -D playwright
npx playwright install chromium

# 4. 캡처 스크립트 신설 — scripts/lab-capture.ts
#    인자: route, output path / viewport·폰트로드 대기·reduced-motion 강제

# 5. /lab/ 라우트 트리 신설
#    src/app/lab/<section>/<id>/page.tsx, robots: { index: false }
#    layout.tsx에서 디버그 패널 / 토큰 표시 / variant 메타 노출

# 6. baseline 캡처 1회
#    style-guide.html은 정적 파일 → file:// 또는 dev 서버에서 /style-guide 라우트 임시 노출 후 캡처
#    → docs/_baselines/style-guide.png
```

### MCP 커넥터 (옵션, 권장)
- **Figma MCP** — 디자이너 시드를 코드로 자동 import (`@modelcontextprotocol/server-figma` 등)
- **GitHub MCP** — PR·이슈 자동 관리 (이미 있을 수 있음)
- `~/.claude.json` 또는 `~/.config/claude-code/settings.json`에 등록

---

## 6. 첫 라운드 액션 (로컬 세션이 즉시 할 것)

순서대로:

1. **§5 셋업 완료**.
2. **§7 미해결 결정 1번**(첫 병렬 생산 대상)을 **사용자에게 문답**.
   기본 추천: Hero 섹션 단독.
3. 결정된 단위에 대해 **variant 4~6개 시드**.
   - 예시 Hero variant 4종:
     - A: 세리프 중앙 정렬 (style-guide 스펙 그대로)
     - B: 좌우 비대칭 (에디토리얼 그리드)
     - C: 다크 hero (`--c-dark` 베이스)
     - D: 풀블리드 이미지 + 텍스트 오버레이
4. **자동 루프 1회 돌리기** ([3]→[4]→[5] 3~5 iter).
5. **사용자에게 갤러리 1회 전송** ([6]). "이 방향으로 간다" 결정.
6. 선택된 variant를 **운영 `/`로 머지** (별도 PR 또는 직접 적용).

---

## 7. 미해결 결정 (새 세션 첫 라운드에 사용자에게 문답)

1. **첫 병렬 생산 대상**:
   - (a) Hero 섹션 단독 (Recommended — 가장 빠른 검증)
   - (b) `/` 전체 페이지 (3-4 variant, 시간 더 걸림)
   - (c) Hero + Architecture + Voice 3섹션 병렬 (복잡, 시간 3배)

2. **Variant 축**: 어떤 1축을 다르게 할 것인가?
   기본: 정렬·여백·폰트 weight·다크/라이트.

3. **기존 OrbCanvas Hero를 살릴지**: 현재 v3 Hero는 WebGL Orb + Canvas 파티클.
   - (a) 유지 + 주변 타이포만 비주얼 시스템에 맞춤
   - (b) 폐기 후 산출물 style-guide hero 패턴(세리프 중앙) 채택
   - (c) variant별로 다르게 (A는 Orb, B는 정적 등)

---

## 8. 안전 가드레일 (어기지 말 것)

- **컴포넌트/레이아웃을 사용자 합의 없이 큰 변경 금지**.
- **카피·정체성(AI 컨설팅) 변경 금지**. 산출물의 K뷰티 카피 채택 안 함.
- **브랜드 보라 자산 보존**. OrbCanvas·Growth·card strip의 `#c4b5fd`/`#818cf8` 건드리지 말 것.
- **작은 단위 커밋**. 한 commit = 한 결정.
- **운영 `/` 직접 변경 금지**. `/lab/` 트리에서 검증 후 머지.
- **확신 없으면 질문**. AskUserQuestion 추천안 첫 번째 + `(Recommended)`.

---

## 9. 참고 문서 (레포 내)

- `docs/style-guide.html` — 리빙 스펙. baseline 캡처 대상.
- `docs/reference-report.md` — 레퍼런스 분석 (Aesop·Linear·Cuberto·Locomotive).
- `docs/visual-workflow.md` — 산출물 §C(CLAUDE 규칙)·§D(작업 프롬프트)·§E(스크린샷 루프).
- `src/styles/tokens.css` — 단일 토큰 소스 (보라 교정본).
- `CLAUDE.md` — `## SIRIAI 비주얼 규칙` 섹션.
- `PLAN.md` — 전체 작업 이력 (참고만, 이번 트랙과 분리).

---

## 10. 브랜치 지형

- **`design/visual-system`** ← 이번 작업 (이 문서가 여기).
- `claude/mystic-compressed-a1` ← A1 트랙(별개, 합칠지 미정).
- `master` ← 운영 baseline.

---

## 11. 새 세션 시작 프롬프트 (복붙용)

```
SIRIAI 비주얼 시스템 production line을 이어서 운영한다.

먼저 docs/HANDOFF-visual-system.md 를 처음부터 끝까지 읽어라.
모든 컨텍스트(확정 사항·현재 상태·자동 하네스 설계·첫 라운드 액션)가 이 한 장에 있다.

읽은 뒤 §6 [1] 셋업 체크리스트부터 순서대로 진행하라.
§7 미해결 결정 1번(첫 병렬 생산 대상)을 AskUserQuestion으로 나에게 물어라
(추천안 첫 번째 + "(Recommended)" 표기 규칙 준수).

답을 받으면 자동 하네스 [3]~[5] 루프를 돌려라.
사용자(나) 호출은 [6] 갤러리 전송 시 단 1회만 — 그 외 자율 진행.

가드레일: §8 가드레일 반드시 준수.
- 운영 / 직접 변경 금지 (/lab/에서만 작업)
- 카피·정체성 변경 금지
- 브랜드 보라 자산 보존
- 작은 단위 커밋

질문 끝나면 자동 production line 가동.
```

---

## 12. 의존성·환경 메모

- Node: package.json `engines` 확인.
- Playwright chromium: `npx playwright install chromium` (Linux는 추가 deps `--with-deps`).
- 로컬 OS: 윈도우 (사용자) — WSL이면 `--with-deps` 필요할 수 있음.
- Vercel 자동 빌드: `design/visual-system` 브랜치 push 시 preview URL 발급 (보조 확인용).

---

> 이 문서가 single source of truth. 진행 중 결정·진행 상황은 이 문서에 누적 갱신한다.
> 새 세션 시작 시 항상 이 파일이 최신 상태인지 git pull로 확인.
