# Siriai Brand Voice

> v0.1 — 2026-05-16. 카피 재설계 라운드의 단일 출처.
> 모든 카피는 이 문서를 통과한 후에만 컴포넌트로 들어간다.

---

## 1. 출발점

Siriai의 카피는 **세 톤의 합금**이다.

| Reference | 가져오는 것 | 버리는 것 |
|---|---|---|
| **Anthropic** | 사고하는 문장. 단정 짓되 신중함. "왜"를 설명하지 않고 "어떻게 작동하는가"를 보여준다. | 학술적 장황함, hedging("might", "perhaps"). |
| **Studio Dumbar** | 선언적 manifesto. 단어를 끊어 호흡으로 의미를 만든다. 시(詩)적 atmosphere. | 추상 명사 나열, 의미 없는 단어 미학. |
| **Resend** | 한 줄에 한 메시지. craft. 군더더기 제거. | product-y 동사("ship", "deploy"), 기능 자랑. |

세 톤을 섹션 컨텍스트에 따라 다른 비율로 섞는다 (§6 참조).

---

## 2. 핵심 명제 (변하지 않음)

> **"AI를 쓰는 것이 아니라, AI로 생각하는 것."**

모든 카피는 이 명제와 같은 방향을 가리켜야 한다. 같은 방향을 가리키지 않으면 — 그 라인은 쓰지 않는다.

파생 축:
- **구조 > 도구**: AI 도구를 나열하지 않는다. 구조를 설명한다.
- **판단 > 자동화**: 자동화를 자랑하지 않는다. 판단의 질을 자랑한다.
- **기록 > 캠페인**: 캠페인이 아닌, 캠페인이 남긴 구조를 본다.

---

## 3. Voice Architecture — 3-layer

카피는 세 층위로 나뉜다. 한 페이지에서 세 톤이 같이 있어도 충돌하지 않게 — 단, 한 컴포넌트 안에서는 한 층위만 사용한다.

### Layer A — Manifesto (Dumbar 비중 高)
**어디서**: HeroSection 헤드라인, PhilosophySection 헤드라인, ManifestoQuoteSection, GrowthSection 서브헤드라인.
**원칙**: 단어를 끊는다. 문장은 짧다. 호흡으로 강조한다.

```
AI를 쓰는 것이 아니라,
AI로 생각하는 것.
```

### Layer B — Editorial (Anthropic 비중 高)
**어디서**: ConnectionSection / RelationshipIntro / ArchitectureSection / CreatorSection 본문, Philosophy 피처 설명.
**원칙**: 두세 문장의 풀문장. 한 단락에 한 가지 사고. 형용사 최대 1개.

```
콘텐츠는 사라지지만 구조는 남습니다.
데이터가 축적되고, 신뢰가 자산이 됩니다.
```

### Layer C — Functional (Resend 비중 高)
**어디서**: ServicesSection 카드, WorksSection 통계·라벨, CTASection, Navigation, Footer, 카드 데이터의 라벨.
**원칙**: 라벨 1~3단어, 설명 1문장 12단어 이내. 동사로 끝낸다.

```
적응형 타겟팅 — 오디언스 신호를 실시간으로 읽고 세그먼트를 다시 그립니다.
```

---

## 4. 일곱 가지 룰

### R1. 선언한다, 설명하지 않는다.
약속·설득·소개 동사를 쓰지 않는다.

| 금지 | 권장 |
|---|---|
| "저희는 ~을 제공합니다" | "~을 설계합니다" |
| "~에 대해 알아보세요" | _(라인 자체를 삭제)_ |
| "~을 도와드립니다" | "~을 구조로 다시 그립니다" |

### R2. 동사로 끝낸다.
"-입니다" 빈도를 줄이고 행위 동사로 마무리한다. 한 단락에 "-입니다" 종결은 최대 1회.

```
✗  데이터를 분석하는 것입니다.
✓  데이터를 읽는 방법을 설계합니다.
```

### R3. 형용사는 한 단락에 한 개.
"진정한 / 혁신적인 / 차별화된 / 최고의 / 새로운" — 전부 금지. 형용사가 들어가야만 의미가 살면 그 한 개만 둔다.

### R4. 추상명사는 항상 뒤에 행위가 따라온다.
"신뢰", "구조", "감각" 같은 단어를 던지지 않는다. **무엇을 한다**가 붙어야 한다.

```
✗  신뢰 자산
✓  신뢰가 자산이 된다
✗  도구가 아닌 감각
✓  도구를 감각으로 다시 묶는다
```

### R5. 영어는 라벨, 한국어는 사고.
영어는 라벨·태그·키워드에만 (≤ 3단어). 본문은 한국어. 한 라인에 한·영을 섞지 않는다. (예외: 고유명사, 카드 부제목.)

### R6. 1줄 = 1메시지.
한 줄에 두 가지 이상을 담지 않는다. 두 가지를 말해야 하면 두 줄로 나눈다 — 그게 Dumbar 호흡이다.

### R7. 인플루언서 비즈니스를 전면에 두지 않는다.
"인플루언서", "크리에이터 마케팅", "바이럴" 같은 단어를 헤드라인에 두지 않는다. CreatorSection에서 한 번만 노출 가능. 이외에는 "관계", "오디언스", "신호"로 우회.

---

## 5. Lexicon

### 사용 (Yes 단어)
**명사** — 아키텍처, 구조, 리터러시, 신호, 관계, 판단, 실행, 흐름, 결, 토대, 맥락, 증거, 기록, 신뢰, 감각, 언어  
**동사** — 설계한다, 번역한다, 읽는다, 구조화한다, 정착시킨다, 남긴다, 심는다, 다시 그린다, 묶는다, 측정한다, 작동시킨다

### 금지 (No 단어)
**마케팅 형용사** — 진정한, 혁신적, 차별화된, 최고의, 새로운, 강력한, 완벽한, 효율적인, 스마트한  
**자랑 동사** — 도와드립니다, 제공합니다, 알려드립니다, 만나보세요, 경험해보세요  
**기술 자랑** — Multi-Agent, Orchestration, Pipeline (그대로 노출 금지 — 한국어 의미로 풀어쓰기)  
**과장 부사** — 즉시, 단번에, 한 번에, 모든

### 회색지대 (조건부 허용)
- **"AI"** — 한 섹션 본문에 최대 2회. 그 이상이면 "구조", "판단", "운영"으로 대체.
- **숫자** — 통계는 단위 명확할 때만. "100% 브랜드 맞춤" 같은 비교 불가 100% 금지.

---

## 6. 섹션별 Layer 매핑

| 섹션 | Layer | 비중 |
|---|---|---|
| HeroSection | A · Manifesto | Dumbar 70 / Anthropic 30 |
| ConnectionSection | B · Editorial | Anthropic 60 / Resend 40 |
| RelationshipIntroSection | B · Editorial | Anthropic 60 / Dumbar 40 |
| ArchitectureSection | B · Editorial | Anthropic 70 / Resend 30 |
| PhilosophySection (헤드) | A · Manifesto | Dumbar 60 / Anthropic 40 |
| PhilosophySection (피처) | B · Editorial | Anthropic 80 / Resend 20 |
| AIStudioSection | B · Editorial | Anthropic 50 / Resend 50 |
| CreatorSection | B · Editorial | Anthropic 70 / Dumbar 30 |
| ArchivingSection | B · Editorial | Anthropic 60 / Resend 40 |
| ManifestoQuoteSection | A · Manifesto | Dumbar 80 / Anthropic 20 |
| GrowthSection | A · Manifesto (서브) + C · Functional (차트) | — |
| ServicesSection | C · Functional | Resend 80 / Anthropic 20 |
| WorksSection | C · Functional (라벨) + B · Editorial (좌텍) | — |
| CTASection | C · Functional | Resend 70 / Dumbar 30 |
| FooterSection / Navigation | C · Functional | Resend 100 |

---

## 7. BEFORE / AFTER — 톤 보정 샘플

> 룰의 효과를 검증하기 위한 4개 라인. 본 라운드의 _원칙 확정 후_, 동일 패턴으로 전 섹션 카피를 재작성한다.

### #1 — ArchivingSection 헤드라인
**Before**
```
우리는 콘텐츠를 저장하지 않습니다.
가격을 구조화하고, 증거를 남깁니다.
```
**문제**: "가격을 구조화"의 의미 불명. R1(설명하지 않는다) 위반은 아니지만 R4(추상명사 + 행위) 연결이 부자연.
**After (Layer A — Manifesto, Dumbar 60 / Anthropic 40)**
```
콘텐츠는 흐르고,
구조는 남습니다.
캠페인이 끝난 자리에
기록이 작동하기 시작합니다.
```

### #2 — AIStudioSection 통계
**Before**
```
100% / 브랜드 맞춤 / 도구가 아닌 감각
```
**문제**: "100% 브랜드 맞춤" — R6 위반 (비교 불가 100%), R4 위반 ("감각" 추상명사 단독).
**After (Layer C — Functional, Resend 80 / Anthropic 20)**
```
6+   통합 AI 툴       목적별 조합
72h  배포 사이클     캠페인이 라이브가 되는 시간
1:1  도구와 감각     같은 결로 묶인다
```

### #3 — ServicesSection 4번 카드
**Before**
```
멀티 에이전트 캠페인 — Multi-Agent Campaign Orchestration
복수의 AI 에이전트가 채널과 시점을 조율하며 캠페인을 동시 운영합니다.
```
**문제**: R5 위반 (한 라인에 한·영 동시 + 영어가 라벨 길이 초과). 기술 용어가 전면 노출.
**After (Layer C — Functional, Resend 80 / Anthropic 20)**
```
다중 채널 조율 — Channel Orchestration
여러 채널이 같은 호흡으로 움직입니다. AI가 시점을 맞추고, 사람은 다음 판단을 본다.
```

### #4 — WorksSection 본문 + 16 레이블
**Before (좌텍)**
```
구조가 있어야 AI가 작동합니다.
Siriai는 AI 도구를 나열하지 않습니다.
조직이 AI를 실제로 운영할 수 있는 아키텍처를 설계합니다.
데이터, 판단, 실행이 연결되는 구조입니다.
```
**문제**: 좌텍은 강함 (Layer B 합격). 다만 **16개 레이블이 추상 단독명사 — R4 정면 위반.** 의미가 시각에만 의존.

**After (Layer C — Functional, 각 카드: 한 단어 라벨 + 한 줄 캡션)**
```
Context     — 신호 이전의 맥락을 본다
Signal      — 데이터에서 방향을 읽는다
Question    — 답보다 먼저 질문을 설계한다
Edge        — 경계에서 새로운 결이 생긴다
Clarity     — 흐림을 거른다, 판단이 남는다
Modeling    — 구조를 가능성의 모양으로 옮긴다
Oversight   — 자동화의 바깥에서 감독한다
Trace       — 결정의 자국을 남긴다
Flow        — 데이터가 판단으로 이어진다
Rhythm      — 캠페인은 박자다
Connection  — 점을 잇는 것이 아니라 결을 잇는다
Momentum    — 한 번의 작동이 다음을 끌어온다
Evidence    — 결과가 다음 설계의 토대가 된다
Benchmark   — 자신의 곡선과 비교한다
Learning    — 캠페인은 학습이 된다
Compounding — 기록이 누적되며 자산이 된다
```

---

## 8. 카피 작성·검토 체크리스트

라인을 쓸 때 / 리뷰할 때 — 8개 항목 통과해야 한다.

- [ ] 명제(§2)와 같은 방향을 가리키는가?
- [ ] Layer(§3)가 섹션과 맞는가?
- [ ] R1–R7 위반 없는가?
- [ ] Yes 단어가 ≥ 1개, No 단어가 0개?
- [ ] "AI"가 본문에서 2회 이하인가?
- [ ] 한 줄에 한 메시지인가?
- [ ] 마지막 단어가 동사인가? (Layer B/C에 한해)
- [ ] 소리 내어 읽었을 때 호흡이 끊기지 않는가?

---

## 9. 다음 단계 (이 문서 승인 후)

1. **§6 매핑대로 15개 섹션 카피 전수 재작성** — Layer별 작가 모드 전환.
2. 작성된 라인을 §8 체크리스트로 검수.
3. 컴포넌트 적용 — 한 섹션씩 커밋 (BEFORE/AFTER 가시성 확보).
4. 적용 완료 후 _카피 톤_ 단독 리뷰 라운드 (시각·인터랙션 분리 검증).
