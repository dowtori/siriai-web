# Next Session Memo — Brand Copy Redo

> 직전 세션(2026-05-16)에서 카피 drift 누적이 발생해 새 세션으로 이관하기 위한 정리본입니다.
> CLAUDE.md / Design.md / PRD.md 는 이미 적용된 사항. 본 메모는 **차이분**만 정리합니다.

---

## 프로젝트

- repo: `dowtori/siriai-web`
- 작업 브랜치: `claude/redesign-homepage-premium-DiV5b`
- 직전 세션 종료 commit: `d55e0c2` (§01 좌측 KR sub 제거)

---

## 현재 상태

### ✅ 비주얼 — 완료 (재작업 불필요)

| 섹션 | 핵심 |
|---|---|
| §00 Hero | Canvas 2D particle cycle 4종 · 8s settled + 0.9s dissolve · eyebrow `Siriai · A practice in AI architecture` |
| §01 Stance | 좌 EN h2 + vertical accent line ascending + `Statement · 01 of 06` · 우 body 4줄 micro 인덱스 · 풀폭 divider |
| §02 Methodology | `Three axes. One model.` + 한글 sub `세 축이 하나의 모델로.` + spoke dash flow + core echo |
| §03 System | `Decision flow. Made visible.` + flow pulse + 4레이어 노드 |
| §04 Services | 3-col + 카드 인덱스 `01/02/03` + h2 한글 sub `세 모드로 함께합니다.` + hover 상단 accent line draw + border accent |
| §05 Voice | 매니페스토 (dark) · h2 EN |

### ✅ 어색 한글 정리 — keep (재작업 불필요)

| 위치 | 변경 |
|---|---|
| Methodology Operation | `설계를 함께 운영하며 튜닝하는 동반 모드.` → `함께 운영하며 정기적으로 점검·튜닝합니다.` |
| Services Studio tagline | `운영을 함께 설계하고 함께 돌립니다.` → `운영을 함께 설계하고, 함께 운영합니다.` |
| Services Advisory tagline | `정기 자문으로 의사결정의 결을 맞춥니다.` → `정기 자문으로 의사결정 구조를 정렬합니다.` |
| Contact intro·FAQ·description (4곳) | `어디부터 손대야 할지` → `우선순위를` |

> 위 정리는 자연스러운 어색함 개선. brand 카피 원칙 재설계와 별개로 keep 권장.

---

## ⚠️ 카피 drift (redo 대상)

직전 세션에서 사용자 피드백을 매번 직역 적용해 brand 응집력이 약해진 항목들. **새 카피 원칙 정립 후 일괄 reseed 필요**.

| 위치 | 초기 baseline (drift 이전) | 현재 (drift 누적) |
|---|---|---|
| Hero EN CYCLES[0] | `Architecture for / thinking with AI.` | `Architecture for / insight.` |
| Hero KR sub | `AI로 사고하는 구조를 설계합니다.` | `깊은 인사이트를 기반으로, AI와 가깝게.` |
| Stance §01 body L4 | `조직이 AI와 함께 사고하는 방식을 설계합니다.` | `인사이트가 의사결정으로 이어지는 구조를 설계합니다.` |
| Voice §05 h2 (EN) | `We design how it thinks.` | `We design how insight forms.` |
| Voice §05 KR L2 | `조직이 사고하는 방식을 설계합니다.` | `조직이 인사이트로 결정하도록 설계합니다.` |
| Methodology Literacy desc | `구성원이 AI로 사고하는 법을 익히는 커리큘럼.` | `구성원이 AI를 의사결정에 활용하는 법을 익히는 커리큘럼.` |
| Services Literacy tagline | `조직이 AI로 사고하는 법을 학습합니다.` | `조직이 AI를 의사결정에 활용하는 법을 익힙니다.` |
| layout.tsx title (× 3) | `Siriai — Architecture for thinking with AI` | `Siriai — Architecture for insight` |
| layout.tsx description (× 3) | `AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 …` | `AI 시대의 인사이트와 의사결정 구조 설계. 서울 기반 …` |
| page.tsx (홈 metadata) | (위와 동일 패턴) | (위와 동일 패턴) |
| opengraph-image alt | `Siriai — Architecture for thinking with AI` | `Siriai — Architecture for insight` |
| opengraph-image headline | `Architecture for / thinking with AI.` | `Architecture for / insight.` |
| opengraph-image subtitle | `Architecture for insight, AI` | `Architecture for insight` |

> 사용자 메시지(2026-05-16) — "나의 첫 인사이트 관련 피드백 이후 전체적인 카피 품질이 낮아졌어. 그 이전으로 카피 원칙은 롤백할 수 있나? 롤백이 아니더라도 하이엔드 BX 수준에는 맞출 수 있는 다른 방법도 좋아."

---

## 사용자 톤 가이드 (누적)

직전 세션 동안 사용자가 명시한 brand 톤 원칙:

- **'Insight'는 한국에서도 '인사이트'로 통용**. '통찰'은 무게감 다름, 적합성 낮음.
- **'더불어 살다'·상생 어조 부적합** (전체 brand 톤 안 맞음).
- **'Architecture' = A-to-Z·0-to-1 설계 의미로 활성화**. 건축 메타포 약화.
- **가치 우선순위**: 비전·인사이트·철학 > 기술의존도.
- **톤앤매너 예시** (방향 참고용, 직역 금지): "사람과 AI가 함께 더불어 살다 · 더욱 쉽고 정교하게".
- **직선·강제 묶음(Insight→Decision) 회피** — 직선적 강제 묶음은 brand 결과 어색.
- **하이엔드 BX 수준** — Linear / Vercel / Anthropic / Resend / Studio Dumbar 류 단문·명사 압축 톤.

---

## 새 세션 권고 흐름

1. **brand reference 정의** — 사용자가 reference 1~2개 명시 (예: Linear / Vercel / Anthropic / Resend / Studio Dumbar · 또는 사용자 선호 사례).
2. **카피 원칙 정립** — 어조·동사 보류 정도·명사 압축 수준·EN/KR 페어 패턴·SEO 키워드 균형. 직역 적용 금지 원칙 명시.
3. **redo 대상 일괄 reseed** — 위 ⚠️ 표 항목에 새 원칙 적용. 비주얼·어색 한글 정리는 keep.
4. **검증** — `next build` + Vercel preview · 사용자 검토 · 필요 시 1회 미세 조정.

---

## 새 세션 시작 시 명령 예시

```
NEXT_SESSION_MEMO.md 읽고 brand 카피 원칙 재설계 라운드 시작.
reference는 [사용자 제공].
```

> 새 세션의 첫 응답에서 NEXT_SESSION_MEMO.md + CLAUDE.md 둘 다 읽고 시작하면 컨텍스트 손실 없이 진행 가능.
