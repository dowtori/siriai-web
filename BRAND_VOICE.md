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

---

## 10. Etymological Overlay (v3.2)

> 변경 이력: v3.1(2026-05-16, 어원 layer 5표면 + Footer 어원 시그니처 도입) → **v3.2(2026-05-16, 사용자 피드백 반영 — 시적 표현 회피·어원 사이트 노출 0회로 축소)**.
>
> 사명 `시리아이`의 어원 `知り合い`은 이름의 기원으로만 두고 **사이트 카피에는 노출하지 않는다.** 따뜻함은 카피의 시적 표현이 아니라 **UX의 결**(예: 슬롯 픽커·커피챗 신청 흐름·평이한 구어체)로 실현. 헤드라인·tagline·핵심 명제는 침범하지 않는다.
> Reference: Sakana AI 류 어원 노출 패턴은 v3.1에서 일부 시도했으나 **Siriai brand에는 과함** — 시적·의인화 라인이 "오그라드는" 인상을 줌. v3.2에서 축소 결정.

### 10.1 어원 명제 (내부 출처 전용)

> **시리아이 = `知り合い (しりあい)` = 함께 아는 사람 / 지인 / 관계.**
>
> 본 명제는 brand identity의 **내부 출처**로만 둔다. 어원은 작명의 기원·팀 내부의 결을 잡는 컴퍼스이지, 외부 카피에는 옮기지 않는다. 동아시아적 따뜻함·관계성은 시적 라인이 아니라 **UX와 평이한 구어체**로 표현.

### 10.2 Overlay Rules — R8 ~ R11

| 룰 | 정의 |
|---|---|
| **R8 — 어원 사이트 노출 0회** | `知り合い` 원문, `시리아이의 어원은…` 식의 풀이, `함께 아는 사이라는 뜻에서…` 식의 어원 출처 명시 — 모두 **사이트 합산 0회**. 어원은 본 문서·내부 자료에만. |
| **R9 — 풀이어 단어종 한도** | 어원 풀이어(§10.3 Yes 단어)가 페이지를 가득 채우지 않게 — **어원 layer로 신규 도입하는 라인 내에서** 각 단어종이 한 페이지 합산 ≤ 3회. baseline brand에 이미 정착된 풀이어 사용은 카운트 제외. |
| **R10 — 헤드 침범 금지** | 어원 풀이어 라인은 **보조 표면 전용** — caption / success message / footer mini-about만. L1·L2 Claim · section h2 · service tagline · eyebrow 침범 금지. |
| **R11 — 시적 표현 금지** | 의인화·은유·추상명사 중첩·시적 호흡 라인 사용 금지. 예: `사람 사이에서 길어 올린 결` / `곁에 서는 깊이` / `결을 알아간다` — 모두 금지. **평이한 구어체 + 직설적 동사**로 따뜻함을 실현. R3·R4 강화. |

### 10.3 Etymology Lexicon

**Yes (어원 풀이어, R9 카운트 대상)** — 단, 시적이지 않은 평이 문맥에서만.
관계, 함께, 알아간다, 이어진다 (4개로 축소 — `곁 / 결 / 사이 / 마주하다 / 같이 본다`는 v3.1에서 시도했으나 시적 인상 R11 충돌, 제외)

**No (어원 오용 + 시적 어조)**
- 가족 / 패밀리 / 한 식구 — 가족주의
- 동반자 / 더불어 살다 — §1.3 위반
- 따뜻함 / 정성 / 진심 — 마케팅 형용사 R3
- 인연 / 만남 / 운명 — 영적·우연 어조
- 정(情) — 한·일 어조 혼선
- **곁 / 결 / 사이 (어원 풀이어 단독 사용) — 시적 인상 R11** (한 단어로 따뜻함을 부여하려는 시도, 오그라듦)
- **`길어 올린 / 알아챈 / 받아 들인` 같은 시적 술어** — R11

### 10.4 표면 매핑 (강도)

v3.1의 7표면 → **v3.2 1표면**으로 축소. 어원 layer는 사이트에서 거의 사라지고, 따뜻함은 UX(§10.7 Contact 작업 라운드)와 평이 카피로.

| 표면 | 파일 / 위치 | 강도 | 처리 |
|---|---|---|---|
| ContactForm 성공 후미 | `ContactForm.tsx` 성공 메시지 마지막 라인 뒤 | warmth | **유지** — `알아가는 것부터 시작합니다.` 평이·따뜻함, R11 통과 |
| Hero eyebrow 아래 KR 마이크로 | (신규 시도 v3.1) | — | **제거** — Hero는 eyebrow + h2로 충분, 클루는 Footer로 |
| Stance accent 보조 | (신규 시도 v3.1) | — | **제거** — `사람과 사람 사이에…` 시적 인상 R11 |
| Services intro echo | (신규 시도 v3.1) | — | **제거** — `곁에 서는 깊이…` 시적 인상 R11 |
| Voice 캡션 echo | (신규 시도 v3.1) | — | **제거** — `사람 사이에서 길어 올린 결.` 사용자 명시 지적 R11 |
| Footer 어원 시그니처 블록 (b) | `Footer.tsx` (b) | — | **제거** — R8 어원 사이트 노출 0회 |
| Footer (a) (c) (d) | `Footer.tsx` | clue | **유지** — Manifesto echo·Mini about·연락처는 어원 layer 아님, 클루 보강 |
| meta (layout / OG) | `layout.tsx` / `opengraph-image.tsx` | — | 변경 없음 |

### 10.5 검수 체크리스트 (§8 누적)

- [ ] 일본어 원문 `知り合い`·어원 풀이 사이트 합산 **0회** (R8)
- [ ] 어원 풀이어 단어종이 신규 layer 라인 내 합산 ≤ 3회 (R9)
- [ ] 어원·풀이어 라인이 L1·L2 Claim·h2·tagline·eyebrow 침범 0건 (R10)
- [ ] 시적 표현 (의인화·은유·추상명사 중첩·시적 술어) 0건 (R11)
- [ ] 모호성 보존 — 어원 layer가 서비스 정체성을 덮어쓰지 않는가

### 10.6 Footer 컴포넌트 spec (v3.2)

**파일**: `src/components/v3/Footer.tsx`. `page.tsx`의 `<ContactSection />` 다음에 `<Footer />`.

**시각 가이드** — dark surface(`var(--surface-inverse)`), 3 블록 vertical stack, Pretendard, 검정 미사용.

**3 블록 카피 (v3.2 적용)**

```
(a) Manifesto echo
EN  We don't deploy tools. We design how decisions are made.
KR  도구를 고르지 않고, 의사결정의 구조를 설계합니다.

— strong divider —

(c) Mini about — 클루 보강
KR
AI 도입을 고민하는 조직과,
의사결정의 구조부터 설계합니다.
운영 모델 · 정기 자문 · 사내 리터러시 — 세 모드.
서울에서, 2024년부터.

EN
For organizations bringing AI into their work,
we design the structures behind their decisions.
Operating model · Advisory · Literacy — three modes.
From Seoul, since 2024.

— weak divider —

(d) 연락처 + 카피라이트
contact@siriai.io · Seoul, KR
© {year} Siriai. All rights reserved.
```

(b) 어원 시그니처 블록 **삭제** — R8 0회 정책. (a)→(c)→(d) 3블록 구조로 단순화.

### 10.7 따뜻함은 UX로 — Contact 디벨롭

v3.2는 카피로 따뜻함을 부여하지 않는다. 따뜻함은 **Contact UX의 결**로 실현. 단, 잠재고객 UX 관점에서 **메인 §06 Contact에 캘린더는 너무 이르다** — 신뢰 7섹션 본 직후 30분 commitment 요구가 brand 무게감과 충돌. Cal embed는 **/contact 페이지 안에만** 위치.

| 위치 | 노출 | 사유 |
|---|---|---|
| 메인 홈 §06 Contact | ContactForm 단일 진입 + `/contact#schedule` 보조 링크 1줄 | 메인은 가벼운 진입(메모)만, 캘린더는 한 뎁스 안쪽 |
| `/contact` 페이지 | 헤더 + 폼·FAQ + **Schedule 섹션 (Cal embed)** | 의도 표명한 사용자 진입, Cal 풀 노출 OK |

사례 분석은 `CONTACT_RESEARCH.md` 참조.

### 10.8 변경 보류 — 명시적 비채택

| 항목 | 사유 |
|---|---|
| Hero / Stance / Services / Voice 모든 헤드·tagline·sub | drift 이전 baseline 보존 |
| 모든 시적·은유 라인 | R11 |
| 어원 사이트 노출 (원문·풀이·출처 명시) | R8 0회 |
| `layout.tsx` description / `opengraph-image.tsx` | SEO·OG는 기능 클루 우선 |
| Footer 어원 시그니처 블록 (b) | v3.2에서 제거 |
| Footer 대형 워드마크 (v1 패턴) | v3는 미니멀 typographic |
