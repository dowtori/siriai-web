# Siriai Brand Voice — v3.0

> 직전 BRAND_VOICE 시도(v1 인벤토리 기반, branch `C8WLj`)는 폐기. v3 6+1섹션 IA·PRD §2.3 톤·NEXT_SESSION_MEMO 사용자 톤 가이드를 통합한 운영 룰북입니다.
> 본 문서는 카피를 **쓸 때 / 검토할 때 / reseed할 때** 단일 출처. PRD §2.3은 톤의 추상 정의, 본 문서는 그 톤을 라인 단위로 실행하는 규칙.

작성: 2026-05-16 · 적용 브랜치: `claude/redesign-homepage-premium-DiV5b`

---

## 1. 출발선

### 1.1 Reference DNA — 3-tone 합금

| Reference | 가져오는 것 | 버리는 것 |
|---|---|---|
| **Anthropic** | 사고하는 단문. 단정 짓되 신중함. "왜"를 설명하지 않고 "어떻게 작동하는가"를 보여준다. | 학술적 장황함, hedging. |
| **Studio Dumbar** | 선언적 manifesto. 단어를 끊어 호흡으로 의미를 만든다. 시(詩)적 atmosphere. | 추상명사 나열, 의미 없는 단어 미학. |
| **Resend** | 한 줄에 한 메시지. craft. 군더더기 제거. | product-y 동사("ship", "deploy"), 기능 자랑. |

Anthropic이 **베이스**. Dumbar는 manifesto 면적(§00 Hero / §05 Voice)에, Resend는 functional 면적(§04 Services / §06 Contact)에 가중. §6 매핑 참조.

### 1.2 Baseline 톤 (drift 이전, 보존)

PRD §1.1 + §2.1 — 모든 reseed의 출발선.

```
EN  Siriai designs the architecture for thinking with AI.
KR  시리아이는 AI로 사고하는 구조를 설계합니다.
```

NEXT_SESSION_MEMO의 13개 drift 항목은 본 문서 §6의 **reseed 시드 표**로 정리. drift 직전 baseline을 출발점 삼아 reference DNA로 변주한다 — 단순 복원이 아니다.

### 1.3 사용자 톤 가이드 (누적, NEXT_SESSION_MEMO 인계)

- **`Insight`는 한국어에서도 `인사이트`로 통용.** `통찰` 무게감 다름, 부적합.
- **`더불어 살다`·상생 어조 부적합.**
- **`Architecture` = A-to-Z·0-to-1 설계 의미.** 건축 메타포 약화.
- **가치 우선순위: 비전·인사이트·철학 > 기술의존도.**
- **직선적 강제 묶음(Insight → Decision) 회피** — `인사이트가 의사결정으로 이어지는 구조` 같은 패턴 금지.
- **하이엔드 BX 수준.** Linear / Vercel / Anthropic / Resend / Studio Dumbar 류 단문·명사 압축 톤.

---

## 2. Voice Architecture — 3-layer

한 페이지에서 세 톤이 충돌하지 않게, 컴포넌트마다 **한 층위**만 사용한다.

### Layer A — Manifesto (Dumbar 가중)
**어디서**: §00 Hero EN/KR · §05 Voice · L1·L2 Claim.
**원칙**: 단어를 끊는다. 헤드는 4~8단어, 마침표로 끝맺기. 호흡이 의미를 만든다.

```
We don't deploy tools.
We design how decisions are made.
```

### Layer B — Editorial (Anthropic 가중)
**어디서**: §01 Stance body · §02 Methodology axis 설명 · §03 System sub/caption · §05 Voice 중간 단락.
**원칙**: 1~2문장. 한 단락에 한 가지 사고. 형용사 1개 이하. 평균 35자/문장(PRD §2.2).

```
도입의 본질은 도구가 아니라,
그것이 작동하는 의사결정 구조에 있습니다.
```

### Layer C — Functional (Resend 가중)
**어디서**: §04 Services 카드(모드명·tagline·bullet) · §06 Contact 폼·CTA · Navigation · Footer · 다이어그램 라벨.
**원칙**: 라벨 1~3단어. 설명 1문장 ≤ 20자(KR) / ≤ 8단어(EN). 동사로 끝낸다.

```
Studio — 운영을 함께 설계하고, 함께 운영합니다.
```

---

## 3. 일곱 가지 룰

PRD §2.3을 라인 단위 실행 규칙으로 정련.

### R1. 선언한다, 설명하지 않는다.
| 금지 | 권장 |
|---|---|
| "~을 제공합니다 / 도와드립니다 / 알려드립니다" | "~을 설계합니다" |
| "~에 대해 알아보세요 / 만나보세요" | _(라인 삭제)_ |
| "~을 활용해 ~을 향상시킵니다" | "~을 정렬합니다" |

### R2. 동사로 끝낸다.
한 단락에 `-입니다` 종결은 최대 1회. 나머지는 행위 동사(설계·정렬·정의·매핑·운영·진단·구축·정리).

### R3. 형용사는 한 단락에 한 개.
`진정한 / 혁신적인 / 차별화된 / 최고의 / 새로운 / 강력한 / 완벽한 / 효율적인 / 스마트한` — 금지. 의미가 살려면 한 개만.

### R4. 추상명사는 행위가 따라온다.
`신뢰`, `구조`, `감각`, `인사이트` 같은 단어를 던지지 않는다. **무엇을 한다**가 붙어야 한다.

```
✗  깊은 인사이트를 기반으로
✓  인사이트로 다음 결정을 정렬합니다 — (단 §3.5 R5b 직선 묶음 회피와 충돌 시 다른 패턴 채택)
✗  사고의 구조
✓  사고하는 방식을 설계합니다
```

### R5. 한·영 페어링은 거울이 아니다.
PRD §2.2 원칙 강제.
- **R5a — 영문은 정체성, 한글은 의미.** 한글이 영문의 직역이면 페어를 깬다.
- **R5b — 한 라인에 한·영 혼용 금지.** 영문 라벨(`STUDIO`)과 한글 부제(`스튜디오`)는 다른 라인.
- **R5c — `Insight → Decision` 등 직선적 강제 묶음 금지.** "A가 B로 이어지는 구조" 형식은 baseline 톤에서 벗어남.

### R6. 1줄 = 1메시지.
두 가지를 말해야 하면 두 줄로 나눈다. Dumbar 호흡.

### R7. 도구·플랫폼·트렌드를 전면에 두지 않는다.
- AI 도구명(ChatGPT/Sora/Midjourney…), `Multi-Agent`, `Orchestration`, `Pipeline`, `RAG`, `LLM` 등 기술 어휘는 헤드라인·sub·CTA에 노출 금지. 본문에 풀어쓰기.
- `인플루언서`, `크리에이터`, `바이럴`은 v3 전면 노출 0회 (PRD §7 Out of Scope와 일치).
- `트렌드`, `노하우`, `솔루션`은 명사 사전에서 제거(§4 No).

---

## 4. Yes / No Lexicon

PRD §2.3 동사·명사 정책 + 사용자 톤 가이드 통합.

### Yes 단어

**동사** — 설계한다, 운영한다, 진단한다, 정의한다, 정렬한다, 정리한다, 매핑한다, 구축한다, 번역한다, 읽는다, 구조화한다, 정착시킨다, 남긴다, 측정한다, 작동시킨다, 회고한다, 점검한다

**명사** — 구조, 시스템, 운영 모델, 아키텍처, 리터러시, 프레임, 사고, 신호, 판단, 실행, 기록, 결, 토대, 맥락, 증거, 인사이트, 흐름, 의사결정, 진단

**형용사 (한 단락 1회)** — 정렬된, 일관된, 명시적, 구조적, 미세한, 정밀한

### No 단어

**자랑 동사** — 도와드립니다, 제공합니다, 알려드립니다, 만나보세요, 경험해보세요, 함께해보세요, 활용합니다, 향상시킵니다

**마케팅 형용사** — 진정한, 혁신적, 차별화된, 최고의, 새로운, 강력한, 완벽한, 효율적인, 스마트한, 신뢰할 수 있는

**상투 명사** — 솔루션, 서비스(거래 모드는 OK), AI 기술, 노하우, 트렌드, 통찰, 전문성, 비전(헤드 노출 X)

**기술 자랑** — Multi-Agent, Orchestration, Pipeline, RAG, LLM, Agentic, GPT 직접 노출

**과장 부사** — 즉시, 단번에, 한 번에, 모든, 진심으로, 깊은(`깊은 인사이트` 패턴 금지)

### 회색지대 (조건부)
- **"AI"** — 한 섹션 헤드 + 본문 합쳐 최대 3회. 그 이상이면 `구조`, `판단`, `운영`으로 대체.
- **"Insight / 인사이트"** — `인사이트`로 통일. 단 직선적 강제 묶음(R5c) 금지.
- **숫자 통계** — 단위·근거가 명확할 때만. `100% 브랜드 맞춤` 같은 비교 불가 100% 금지.

---

## 5. 섹션 × Layer × Reference 매핑

| # | 섹션 | Layer | Reference 비중 | 비고 |
|---|---|---|---|---|
| §00 | Hero (EN/KR Claim) | A · Manifesto | Dumbar 70 / Anthropic 30 | L1 Claim. 4~8단어 EN + 1문장 KR. |
| §00 | Hero (Eyebrow·Meta) | C · Functional | Resend 100 | `SIRIAI · A practice in AI architecture` |
| §01 | Stance (EN headline) | A · Manifesto | Dumbar 50 / Anthropic 50 | L2 Sub-claim. |
| §01 | Stance (KR body 4줄) | B · Editorial | Anthropic 80 / Dumbar 20 | 줄별 stagger. 한 줄 한 사고. |
| §02 | Methodology (EN head) | A · Manifesto | Dumbar 40 / Anthropic 60 | "Three axes. One model." 식. |
| §02 | Methodology (KR sub) | B · Editorial | Anthropic 70 / Resend 30 | 한 줄. |
| §02 | Methodology (3 axes) | B · Editorial | Anthropic 60 / Resend 40 | 축 이름 EN + 정의 KR 1~2문장. |
| §03 | System (EN head + KR sub) | A · Manifesto + B | Anthropic 70 / Dumbar 30 | 다이어그램 언어. |
| §03 | System (caption · 노드 라벨) | C · Functional | Resend 100 | Signal · Judgment · Action · Record. |
| §04 | Services (EN head) | A · Manifesto | Dumbar 30 / Anthropic 70 | "Three modes of engagement." |
| §04 | Services (3 cards) | C · Functional | Resend 80 / Anthropic 20 | 모드 EN + 부제 KR + tagline 1줄 + bullet 3. |
| §05 | Voice (EN/KR head) | A · Manifesto | Dumbar 80 / Anthropic 20 | L2 변주. |
| §05 | Voice (KR 매니페스토 본문) | B · Editorial | Anthropic 60 / Dumbar 40 | 4~6줄. 마지막에 Signal/Judgment/Action/Record로 §03 거울. |
| §06 | Contact (EN/KR head) | A · Manifesto | Dumbar 40 / Resend 60 | "Start with a diagnosis." |
| §06 | Contact (sub + form) | C · Functional | Resend 100 | 폼 라벨·CTA. |
| — | Navigation / Footer | C · Functional | Resend 100 | 한·영 병기. |
| — | layout.tsx meta / OG | C · Functional + A 절충 | Anthropic 50 / Resend 50 | SEO 균형. §6 reseed 항목. |

---

## 6. Reseed 시드 표 (drift 13항목)

NEXT_SESSION_MEMO ⚠ 표를 본 문서 룰로 재정렬. **다음 라운드에서 일괄 적용**.

> ▶ `시드`는 baseline을 출발점으로 reference DNA로 변주한 1차 후보. 확정 전 사용자 검토 필요.

| # | 위치 | drift 현재 | 시드 (BRAND_VOICE v3.0 적용) | 룰 근거 |
|---|---|---|---|---|
| 1 | Hero EN CYCLES[0] | `Architecture for / insight.` | `Architecture for / thinking with AI.` | R5c, baseline 복원 |
| 2 | Hero KR sub | `깊은 인사이트를 기반으로, AI와 가깝게.` | `AI로 사고하는 구조를 설계합니다.` | R3(`깊은`), R5c, R1 |
| 3 | Stance §01 body L4 | `인사이트가 의사결정으로 이어지는 구조를 설계합니다.` | `조직이 AI와 함께 사고하는 방식을 설계합니다.` | R5c (직선 묶음), baseline 복원 |
| 4 | Voice §05 h2 (EN) | `We design how insight forms.` | `We design how an organization thinks.` | R4, R5c |
| 5 | Voice §05 KR L2 | `조직이 인사이트로 결정하도록 설계합니다.` | `조직이 사고하는 방식을 설계합니다.` | R5c, R2 |
| 6 | Methodology Literacy desc | `구성원이 AI를 의사결정에 활용하는 법을 익히는 커리큘럼.` | `구성원이 AI로 사고하는 법을 익히는 커리큘럼.` | No 동사 `활용` |
| 7 | Services Literacy tagline | `조직이 AI를 의사결정에 활용하는 법을 익힙니다.` | `조직이 AI로 사고하는 법을 학습합니다.` | No 동사 `활용`, R2 |
| 8 | layout.tsx title (메인) | `Siriai — Architecture for insight` | `Siriai — Architecture for thinking with AI` | baseline 복원 |
| 9 | layout.tsx description (메인) | `AI 시대의 인사이트와 의사결정 구조 설계. 서울 기반 …` | `AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.` | R5c, baseline 복원 |
| 10 | layout.tsx title (twitter·OG 등 × 2) | `Siriai — Architecture for insight` | `Siriai — Architecture for thinking with AI` | 동일 |
| 11 | layout.tsx description (twitter·OG 등 × 2) | `AI 시대의 인사이트와 의사결정 구조 설계.` | `AI로 사고하는 조직을 위한 의사결정 구조 설계.` | 동일 |
| 12 | opengraph-image alt | `Siriai — Architecture for insight` | `Siriai — Architecture for thinking with AI` | 동일 |
| 13 | opengraph-image headline | `Architecture for / insight.` | `Architecture for / thinking with AI.` | 동일 |
| 13b | opengraph-image subtitle | `Architecture for insight` | `Architecture for insight, AI` | 보조 라인 보존 (eyebrow 일치) |

### 보존 (keep, 재작업 불요)

NEXT_SESSION_MEMO에 명시된 어색 한글 정리는 v3.0 룰 위반 없음:
- Methodology Operation: `함께 운영하며 정기적으로 점검·튜닝합니다.` ✅ Yes 동사
- Services Studio tagline: `운영을 함께 설계하고, 함께 운영합니다.` ✅ R6
- Services Advisory tagline: `정기 자문으로 의사결정 구조를 정렬합니다.` ✅ Yes 동사
- Contact 4곳: `우선순위를` 패턴 ✅ R1

---

## 7. BEFORE / AFTER — 패턴 샘플 3

### #1 — `깊은 인사이트` 패턴 (R3·R4·R5c 동시 위반)
**Before**
```
깊은 인사이트를 기반으로, AI와 가깝게.
```
**문제**: `깊은` = No 형용사 (R3). `인사이트를 기반으로` = 추상명사 단독 + 직선적 묶음(R4·R5c).
**After (Layer A · Hero KR)**
```
AI로 사고하는 구조를 설계합니다.
```

### #2 — `Insight → Decision` 직선 묶음 (R5c)
**Before**
```
We design how insight forms.
조직이 인사이트로 결정하도록 설계합니다.
```
**문제**: `insight → decision` 직선 강제. 사용자가 명시적으로 회피 요청한 패턴.
**After (Layer A · §05 Voice EN/KR)**
```
We design how an organization thinks.
조직이 사고하는 방식을 설계합니다.
```

### #3 — `활용` 동사 (R1 / No 동사)
**Before**
```
조직이 AI를 의사결정에 활용하는 법을 익힙니다.
```
**문제**: `활용` = No 동사. `의사결정에 활용` = 도구 추천 어조 (PRD §1.2 What we are not).
**After (Layer C · §04 Services Literacy tagline)**
```
조직이 AI로 사고하는 법을 학습합니다.
```

---

## 8. 검수 체크리스트

라인 작성·리뷰 시 — 8개 항목 통과해야 한다.

- [ ] PRD §1.1 baseline 명제와 같은 방향을 가리키는가?
- [ ] §5 매핑의 Layer가 섹션·요소와 맞는가?
- [ ] R1–R7 위반 없는가?
- [ ] Yes 단어 ≥ 1개, No 단어 0개?
- [ ] `AI` 노출이 한 섹션 합쳐 3회 이하인가?
- [ ] `인사이트` 사용 시 R5c(직선 묶음) 회피했는가?
- [ ] 한 줄에 한 메시지인가? (Layer A·B), 마지막 단어가 동사인가? (Layer B·C)
- [ ] 한·영 페어가 거울이 아닌가? (R5a)

---

## 9. 다음 라운드

본 문서 v3.0이 사용자 승인되면:

1. **§6 표대로 13항목 일괄 reseed** — 컴포넌트·layout.tsx·opengraph-image 동시 수정.
2. 변경된 라인을 §8 체크리스트로 자기검수.
3. `next build` + Vercel preview로 메타·OG 정합성 확인.
4. 사용자 검토 → 1회 미세 조정.
5. 단일 commit 또는 (필요 시) `copy-reseed/<section>` 시리즈 commit.
