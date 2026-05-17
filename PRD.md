# Siriai Website — PRD v3 (next)

> 본 문서는 v3 전면 재설계 PRD입니다. v2.0 PRD(`PRD.md`)는 초기 테스트 히스토리로 별도 보존합니다.
> 시각 시스템 세부는 자매 문서 [`Design.md`](./Design.md)를 참조합니다.
> 작성: 2026-05-16 · 상태: **DRAFT — 리뷰 대기**

---

## 0. Document Map

| 챕터 | 다루는 것 | 결정 상태 |
|------|----------|----------|
| 1. Positioning | Siriai의 좌표, 차별화 3축, 타겟 | ✅ 결정 기반 |
| 2. Message Hierarchy | 카피의 구조, 한·영 페어링 원칙 | ✅ 결정 기반 |
| 3. Information Architecture | 홈 섹션 7개 압축안 | ✅ 결정 기반 |
| 4. Section Specs | 섹션별 1페이지 스펙 + 카피 시드 | ✅ Phase C 결정 반영 |
| 5. Contact Page Spec | 폼·후속 응대 | ✅ Phase C 결정 반영 |
| 6. Success Criteria | 정성·정량 기준 | ✅ 결정 기반 |
| 7. Out of Scope | 이번에 하지 않는 것 | ✅ 결정 기반 |
| 8. Open Questions | 다음 회차 결정 | ✅ 전건 해결 (Phase C) |

---

## 1. Positioning

### 1.1 One-line Statement

**EN:** *Siriai designs the architecture for Insight with AI.*
**KR:** 시리아이는 AI로 사고하는 구조를 설계합니다.

> 톤 노트: "AI를 도입"하지 않는다. "사고의 구조를 설계"한다. 명사(아키텍처)와 동사(설계)의 조합 — 도구가 아니라 시스템에 책임을 둔다.

### 1.2 What we are / What we are not

| | We are | We are not |
|---|--------|------------|
| 정체 | AI 아키텍처 설계 컨설팅 | AI 도구 도입 대행 |
| 산출물 | 운영 구조, 의사결정 프레임, 리터러시 커리큘럼 | 프롬프트 모음, 챗봇 빌더, 단발 영상 제작 |
| 관점 | "어떻게 생각할 것인가"를 시스템화 | "어떤 도구를 쓸 것인가"를 추천 |
| 거래 형태 | 어드바이저리 + 스튜디오(운영 동반) | 시간제 발주, 외주 페이먼트 |

### 1.3 Target Audience

핵심 타겟은 **"AI 도입을 설계해야 하는 위치에 있는 사람"**.

| 세그먼트 | 직책 예시 | 의사결정 동기 |
|---------|----------|--------------|
| **In-house Architect** | AI 전략 리드, 데이터·플랫폼 아키텍트, Chief of Staff | 회사 전반의 AI 운영 구조를 책임지고 설계해야 하는 입장. 도구가 아닌 **운영 모델**이 필요. |
| **Strategy Consultant** | 컨설팅 펌·VC·사내 전략실 | 클라이언트(또는 포트폴리오 사)의 AI 도입을 자문해야 함. **재활용 가능한 프레임워크와 진단 도구**가 필요. |
| (보조) Operator | 스케일업 COO, 사업개발 임원 | 위 두 타입과 협업하며 실행을 책임. 사이트의 직접 설득 대상은 아니지만 공유 가능한 자료여야 함. |

브랜딩이 직접 말을 거는 1·2차 대상: **In-house Architect + Strategy Consultant 두 명**. 사이트는 이 두 사람의 책상 위 의사결정 자료가 되는 것이 목표.

### 1.4 Competitive Map

```
                    높은 추상도 (전략·구조)
                              │
                              │   ◎ Siriai
              컨설팅 펌 ◐     │
              (Big4, MBB)    │     ○ Twelve Labs류
                              │       (AI 인프라/플랫폼)
   ───────────────────────────┼───────────────────────────
              ◐ BX/디자인     │     ○ 일반 AI 도입 대행
                에이전시       │       (프롬프트·자동화)
                              │
                    낮은 추상도 (실행·도구)
        브랜드 자산                          기술 자산
```

Siriai의 좌표: **고추상 × 기술-브랜드 경계**. 컨설팅 펌만큼 구조적이되, BX 에이전시만큼 미감 있고, AI 인프라사만큼 실체가 있는 자리. 이 좌표 자체가 사이트의 첫인상이어야 함.

### 1.5 Differentiation — 3 Pillars

| Pillar | 한 줄 정의 | 산출 형태 |
|--------|----------|----------|
| **Architecture** | 조직·제품 안에 AI를 배치하는 운영 구조 설계 | 시스템 아키텍처 다이어그램, 의사결정 트리, 책임 매트릭스 |
| **Literacy** | 구성원이 AI로 "생각하는 법"을 학습하는 커리큘럼 | 진단 → 트랙별 워크숍 → 운영 매뉴얼 |
| **Mapping** | 현황·문제를 함께 매핑하는 진입의 첫 행위 | 현황 진단 매핑, 결정의 결, 첫 한 페이지 |

> v3 reframe(2026-05): 기존 Operation 축은 §03 System(흐름)으로 의미 이전. 그 자리에 진입의 행위인 **Mapping**이 채워진다. 세 축은 사이트 전반에서 반복 노출하지 않고 (One Word, One Place), §02 한 자리에서만 명확히 정의한다.

---

## 2. Message Hierarchy

### 2.1 Layered Claims

```
L1  Hero claim         "Architecture for Insight with AI."  ← 'Insight' 키워드는 여기까지 (One Word, One Place)
                       사고의 구조를 설계합니다.

L2  Sub-claim          "Tools change. Structure remains. We design it."
                       AI 도구는 매주 등장합니다. 바뀌어도 남는 자리가 있습니다.

L3  Section narratives  Stance → Methodology → System → Clients → Voice → Contact
                       (각 섹션이 L2를 다른 각도에서 입증 — 단어 반복이 아닌 태도의 일관으로)

L4  CTA                "Let's start with coffee." / 커피 한 잔으로 시작합니다.
```

### 2.2 한·영 페어링 원칙

| 사용 위치 | 영문 | 한글 |
|----------|------|------|
| Hero / 섹션 헤드라인 | **선언형 단문** (4~8 단어). 마침표로 끝맺기. | 영문의 의미를 보충하거나 한 단계 풀어쓰기. |
| 섹션 레이블 / Eyebrow | **대문자 + 자간 0.22em** (예: `01 — METHODOLOGY`) | 사용 안 함 (영문 단독) |
| 본문 / 설명 | 사용 안 함 (한글 단독) | **간결한 한국어 문장**. 평균 35자/문장. `wordBreak: keep-all`. |
| 버튼 / CTA | 짧은 동사구 (예: `Start a diagnosis →`) | 한국어 명령형 (예: `진단부터 시작하기`) |
| 푸터·메타·정책 | 보조 (옵션) | 메인 |

> 원칙: **영문은 정체성과 톤, 한글은 신뢰와 의미.** 영문이 한글의 번역이 되면 안 된다 — 별도의 카피로 작성하되 같은 사상을 다른 결로 표현한다.

### 2.3 Tone of Voice

| Dimension | Position | Don't |
|-----------|---------|-------|
| 어조 | 선언적·간결·확정적 + 1~2자리 따뜻한 결 | 설명적·열거식·완곡 · 전체 차가움 |
| 인칭 | 1인칭 복수 ("우리는") 또는 무인칭 | 2인칭 직접 호명 ("당신의 비즈니스를...") |
| 동사 | 설계, 운영, 정의, 정렬, 정리, 매핑, 구축, 듣다, 답하다 | 활용, 도와드리다, 향상시키다, 솔루션을 제공하다 |
| 명사 | 구조, 시스템, 운영 모델, 리터러시, 프레임, 사고, 자리 | 솔루션, 서비스, AI 기술, 노하우, 트렌드 |
| 길이 | 헤드 3~6단어 / 본문 1~2문장 | 6줄 이상 헤드, 형용사 중첩 |

### 2.4 카피웍 메타 원칙 (BX/UX)

> 표면 단어 반복으로 정합성을 만들지 않는다. 좋은 brand voice는 키워드 echo가 아닌 **태도의 일관**에서 나온다.

| 원칙 | 의미 | 참조 |
|------|------|------|
| **One Word, One Place** | 강한 키워드 명사(예: Insight)는 단 한 자리(보통 Hero)에서만 강하게 쓴다. 다른 자리는 자기 톤으로 자유. | Anthropic `Frontier intelligence` · Apple `Think different` |
| **Spirit over Surface** | 섹션 간 정합성은 단어 반복이 아닌 태도·관점·자세의 일관에서 잡힌다. | Linear · Stripe |
| **Negative Space** | 모든 자리에서 모든 말을 하지 않는다. 의도된 침묵·여백·미언급은 정보보다 강하다. 단 빈 공간이 의미를 못 만들면 그건 그냥 빈 공간이다 — 비대칭은 비율로 검증한다. | Muji · Teenage Engineering · Patagonia |
| **Indirection** | 키워드를 직접 정의하지 않고 그 결과·자세를 보여준다. `Insight is not a feature.` 같은 직접 정의는 노골적. | Stripe `Payments infrastructure for the internet` |
| **Verb-led, not Noun-led** | 명사 키워드 ≪ 동사·행위 중심. 명사를 굴려 응집성을 만들지 않고 동사·자세를 굴린다. | Linear `Plan and build` · Resend `Email for developers` |
| **EN/KR 不 mirror** | §2.2 확장. 영문·한국어가 1:1 번역이 아닌 서로 다른 의미 layer를 표현한다. 한 줄을 두 번 말하지 않는다. | — |
| **Each Section Owns Its Voice** | 각 섹션이 독립된 voice. 헤드라인끼리 echo는 약하게, 자기 메시지에 집중. | Anthropic 홈 · Vercel |

> **Anti-pattern**: LLM이 응집성을 위해 키워드를 기계적으로 반복하는 패턴 (예: §00 `Insight` → §01 헤드 `Insight is not a feature.` → §05 헤드 `Insight emerges from it.`). 인공적·반복적으로 들리며 brand voice를 약화시킨다. **Hero에 키워드를 못박은 순간 다른 자리는 그 단어를 회피해야 한다.**

---

## 3. Information Architecture

### 3.1 홈 섹션 — 7 sections

v2의 15개 섹션을 7개로 압축한다. 원칙: **한 섹션 = 한 메시지 = 한 비주얼 장치.**

```
00  Hero               Identity claim         [Generative typography]
01  Stance             Problem reframing      [Quote / split layout]
02  Methodology        Architecture · Literacy · Mapping 진입 3축 [Diagram A]
03  System             실제 운영 구조 다이어그램   [Diagram B]
04  Services           Studio · Advisory · Literacy 3개 모드  [Grid 3-col]
05  Voice              파운더/팀 관점, 매니페스토 인용         [Quote scroll-scrub]
06  Contact            Start a diagnosis CTA                  [Form preview]
```

### 3.2 섹션별 KPI

| # | 섹션 | 설득 포인트 | 증명 장치 | 행동 유도 |
|---|------|-----------|----------|----------|
| 00 | Hero | 우리는 다르다 (첫인상) | 비주얼 자체 | 스크롤 |
| 01 | Stance | 문제 재정의 능력 | 카피의 정확도 | 다음 섹션으로 |
| 02 | Methodology | 방법론 보유 | **Diagram A** (3축 프레임) | "방법론 자세히" 또는 다음 |
| 03 | System | 실제 설계 역량 | **Diagram B** (아키텍처) | "사례 문의" |
| 04 | Services | 거래 가능성 | 3개 모드의 명료한 구분 | "어드바이저리 문의" |
| 05 | Voice | 사람·사상의 신뢰 | 인용·관점 | 푸터로 자연 진입 |
| 06 | Contact | 진입 장벽 낮추기 | 폼 단순함 | **제출** |

### 3.3 글로벌 요소

| 요소 | v3 정책 |
|------|--------|
| Navigation | 상단 고정, 스크롤 시 컴팩트(높이 -30%, 백드롭 블러), 한·영 토글 없음 (한영 병기로 처리) |
| ScrollProgressBar | **유지**. 단 두께·색감은 Design.md에서 재정의 |
| SectionIndicator | **재검토** — Twelve Labs류는 보통 미사용. Design.md에서 옵션 비교 후 결정 |
| Footer | 미니멀, 한 줄 매니페스토 + 연락처 + 법적 고지. 소셜 링크 X (의도된 부재) |

---

## 4. Section Specs

> 각 섹션 카피는 **시드(seed)** 임. 톤·길이의 기준이며, 최종 카피는 Phase C 리뷰 후 확정.

### Section 00 — Hero

**Goal:** 5초 안에 "다른 결의 회사"임을 각인.

**Layout:**
- 풀스크린 (100vh, 모바일 100svh)
- 좌측: 생성형 타이포 캔버스 (60% 영역)
- 우측: 정적 텍스트 블록 (40% 영역) — 영문 클레임 + 한글 보조 + 작은 메타정보
- 하단: 스크롤 힌트 (단순 라인)

**Generative concept:**
"Architecture for Insight with AI" 문장이 글자 단위로 **조립·해체**되며 순환. 마우스 위치에 따라 글자가 미세하게 끌려옴. 자세한 구현은 Design.md §7 참조.

**Copy seed:**
```
[Eyebrow]   SIRIAI — ARCHITECTURE FOR INSIGHT, AI

[Hero EN]   Architecture for
            Insight with AI.

[Hero KR]   AI로 사고하는 구조를 설계합니다.

[Meta]      Founded in Seoul · Practice since 2024
```

**Interactions:** 마우스 추적 1단계, scroll-out 시 페이드. 모바일에서는 generative 단순화(정적 1프레임 또는 reduced-motion fallback).

**Proof element:** 없음 (자체가 인상 장치).

---

### Section 01 — Stance

**Goal:** "도구가 아니라 구조"라는 입장을 한 호흡으로 각인.

**Layout:**
- 풀폭, 좌우 비대칭 (왼쪽 짧은 헤드 / 오른쪽 긴 단락 1개)
- 배경: 라이트 톤 (Design.md에서 결정)
- 큰 인용 부호 또는 라인 디바이더 1개

**Copy seed:**
```
[Eyebrow]   01 — STANCE

[Headline]  Tools change.
            Structure remains.
            We design it.

[Body KR]   AI 도구는 매주 등장합니다.
            바뀌어도 남는 자리가 있습니다.
            시리아이는 그 자리를 설계합니다.

(주: §00 Hero에 'Insight' 키워드가 못박혀 있으므로 §01은 그 단어를 회피한다.
 EN은 동사형(change/remain/design), KR은 시간성·자리·자세로 다른 layer 표현.)
```

**Interactions:** 본문이 1~2단계로 진입. 줄별 stagger.

**Proof element:** 카피 자체.

---

### Section 02 — Methodology  · *Diagram A*

**Goal:** "우리는 검증된 방법론을 가졌다"를 시각화.

**Layout:**
- 좌: 텍스트 (Architecture / Literacy / Operation 3축 설명)
- 우 (또는 하단): **Diagram A** — 3축이 서로 어떻게 맞물리는지 보여주는 다이어그램
- 스크롤 인터랙션: 다이어그램의 각 축이 순차 활성화 (라인 드로우 + 노드 점등)

**Copy seed:**
```
[Eyebrow]   02 — METHODOLOGY

[Headline]  Three ways in.
            One place to begin.

[Sub KR]    세 갈래로 들어가, 한 자리에서 시작합니다.

[Core]      OPERATING MODEL
            함께 운영하는 자리.

[Axis 1]    ARCHITECTURE
            의사결정의 구조를 설계합니다.
            흐름, 책임, 데이터의 자리.

[Axis 2]    LITERACY
            조직이 AI로 사고하는 법을 익힙니다.
            관점 점검, 트랙별 학습, 사내 매뉴얼.

[Axis 3]    MAPPING                          (← Operation에서 교체 / 진입 framing)
            무엇이 진짜 문제인지 함께 그립니다.
            현황 매핑, 결정의 결, 첫 한 페이지.
```

**Section logic (v3 reframe 2026-05):** §02 = 진입 (어떻게 일을 시작하는가) → §03 = 흐름 (일이 어떻게 운영되는가). Operation 축은 §03 System으로 의미 이전되었고, 그 자리에 진입의 첫 행위인 **Mapping**이 채워진다.

**Diagram A spec:** Design.md §8.1 참조. 삼각 + 코어 구조 유지. **코어 라벨 OPERATING MODEL 부활** (2026-05 reframe에서 제거됐던 Negative Space 정책을 재변경 — 사용자가 셋의 수렴 가치가 시각적으로 비어 약하다고 판단). cliché 톤은 한국어 부제 '함께 운영하는 자리.'로 분산 — 1인칭 복수("함께") + 동사적("운영하는") + PRD §2.3 명사 사전("자리") 정합 + §05 매니페스토 voice("We architect what stays") 결 echo.

---

### Section 03 — System  · *Diagram B*

**Goal:** "우리가 만든 구조가 실제로 어떻게 생겼는지" 보여주기. 추상이 아닌 실체.

**Layout:**
- 풀폭, 어두운 배경
- 가운데에 큰 시스템 아키텍처 다이어그램 (SVG)
- 다이어그램 주변에 짧은 캡션 라벨 (영문)
- 하단에 한 줄 한글 설명

**Copy seed:**
```
[Eyebrow]   03 — SYSTEM

[Headline]  This is what a thinking
            organization looks like.

[Sub KR]    사고하는 조직의 구조를 한 장으로 그립니다.

[Caption KR]  실제 클라이언트와 함께 설계한 운영 다이어그램의 추상화.
              레이어: Signal → Judgment → Action → Record.
```

**Diagram B spec:** Design.md §8.2 참조. 4개 레이어(Signal / Judgment / Action / Record)가 위에서 아래로 흐르며, 각 레이어 안에 노드가 있고, 노드 간 엣지가 데이터·판단 흐름을 표현. 스크롤 진행에 따라 레이어가 순차 점등.

**Proof element:** **이 섹션이 사이트 전체에서 가장 강력한 신뢰 장치.** 정적 PNG가 아니라 SVG 기반으로 정밀하게 그려야 함.

---

### Section 04 — Clients (With)

**Goal:** "누구와 함께했는가"를 절제된 voice로. 부띠끄 신뢰 evidence + 협업 분야 비공개 정책 양립.

**Layout:**
- 가운데 정렬 eyebrow · 헤드 · 보조 1줄
- 단일 가로 logo wall (slow marquee 60s) · 16 로고 (5 SVG + 11 wordmark)
- 좌우 mask gradient (8% / 92%)

**Copy seed:**
```
[Eyebrow]   With

[Headline]  Brands we've sat with.

[Sub KR]    각자 다른 결, 같은 자세.
```

> v3 reframe(2026-05): Services 3-column 카드(Studio/Advisory/Literacy)를 제거하고 Clients logo wall + 절제된 voice 1쌍으로 교체.
> 협업 분야는 비공개. "고객"·"파트너"·"솔루션"을 평탄화하고, brand voice는 §05 매니페스토의 가까운 거리 자세를 변주로 echo (Spirit over Surface — 동일 단어 사용 회피).

**Interactions:** 헤드·보조 진입 stagger · marquee infinite scroll. hover/click 없음 (logo는 정보가 아닌 voice).

---

### Section 05 — Voice

**Goal:** "사람과 사상"의 신뢰. v3 포지셔닝("도구가 아니라 의사결정의 구조")을 매니페스토 한 단락으로 응축.

**Layout:**
- 풀폭, 좌측 정렬, **어두운 배경** (Diagram B와 연속된 다크 구간으로 묶을 수 있음)
- 큰 인용문 한 단락, 스크롤에 따라 **줄 단위 페이드 인**
- 하단에 출처 라벨 한 줄

**Copy seed (신규 — v3 포지셔닝 기반):**
```
[Eyebrow]   05 — VOICE

[Quote EN]  We don't recommend tools.
            We architect what stays.

[Quote KR]  우리가 만드는 것은 도구가 아닙니다.
            사고가 흐르는 자리입니다.

            가까운 거리에서 함께 사고합니다.
            충분히 듣고, 천천히 답합니다.

            어떤 신호를 보고, 어떻게 판단하며, 무엇을 실행하고, 무엇을 기록할지 —
            그 정렬을 함께 설계합니다.

(주: §00 Hero 'Insight' 키워드 회피. §01 'Tools change. Structure remains.'와 메시지 결은 같되 동사·자세를 굴려 표면 단어를 다르게 표현.)

[Caption]   — Siriai Manifesto, 2026
```

> 마지막 문장의 "신호·판단·실행·기록"은 §03 System 다이어그램의 4개 레이어(Signal / Judgment / Action / Record)와 의도적으로 연결된다. Voice 섹션이 다이어그램의 언어적 거울 역할.

**Interactions:** 줄 단위 scroll-scrub reveal (v2의 ManifestoQuoteSection 패턴 계승, 단 시각 언어는 v3 토큰 적용).

**Proof element:** 카피의 권위 자체.

---

### Section 06 — Contact

**Goal:** 진입 장벽 0. 1 스크롤 안에서 폼 제출까지 가능. 마찰을 최소화한다.

**Layout (확정 — 인라인 폼):**
- 풀폭, 좌우 50:50 분할 (모바일 stack)
- 좌측: Eyebrow + Headline(영문/한글) + Sub + 부가 메시지
- 우측: **인라인 ContactForm** — 라우트 이동 없이 그 자리에서 제출
- 폼은 `/contact` 페이지와 동일한 `<ContactForm>` 컴포넌트 재사용 (Phase D 구현 시 props로 `variant: "inline" | "page"` 분기)

**Copy seed:**
```
[Eyebrow]   06 — CONTACT

[Headline]  Let's start with coffee.

[Sub KR]    커피 한 잔으로 시작합니다.
            메모 한 줄이면 충분합니다.
            어떤 대화든, 먼저 듣는 자리부터.

[Form fields, 인라인]
            이름            [text, required]
            회사·소속        [text]
            이메일          [email, required]
            메시지(선택)    [textarea, 500자, placeholder: "어떤 대화를 시작하고 싶으신가요? 한두 문장이면 충분합니다."]
            ☐ 개인정보 수집·이용에 동의합니다 [상세]

[Submit]    메모 보내기  →
            Send a note  →
```

> 가격 정책: **"무료" 단어 미사용** (Phase C 결정). 가격 정보는 사이트 노출 X, 후속 응대에서 조정.
> 톤 전환 (2026-05): "진단/diagnosis" 의료·전문 메타포 → "대화/coffee" 따뜻한 톤. §05 매니페스토의 "가까운 거리에서 함께 사고합니다"와 echo.

**Interactions:** 폼 진입 시 라벨 → 필드 stagger. Submit 후 §5.3 Submit UX와 동일.

**Proof element:** "이게 다인가" 라는 가벼움 자체.

---

## 5. Contact Page Spec (`/contact`)

### 5.0 홈과의 관계

홈 §06의 **인라인 폼이 1차 진입점**. `/contact` 라우트는 다음 용도로 유지:
- 직접 URL 접근, 외부 링크, SEO 인덱싱용 표준 경로
- 검색 결과·푸터 링크에서의 정식 진입점
- 홈 §06과 **동일한 `<ContactForm>` 컴포넌트** 재사용 (단일 진실)
- 단독 페이지로서는 헤더 카피·진단 흐름 설명·FAQ 1~3개 부가

### 5.1 페이지 목적

홈 §06에서 유입된 사용자의 정보를 받아 진단 통화로 연결.

### 5.2 폼 필드 (재설계)

| 필드 | 유형 | 필수 | 비고 |
|------|------|------|------|
| 이름 | text | ✅ | placeholder: "성함" |
| 회사·소속 | text | ✅ | placeholder: "회사 또는 소속 (개인이면 '개인')" |
| 직책 | text | ⬜ | placeholder: "역할 (선택)" |
| 이메일 | email | ✅ | |
| 관심 모드 | radio | ✅ | Studio / Advisory / Literacy / 미정 |
| 현재 단계 | radio | ✅ | "도입 검토 중" / "도입했으나 정리 필요" / "운영 중 튜닝 필요" / "기타" |
| 메시지 | textarea | ⬜ | 500자 제한, placeholder: "지금 가장 풀고 싶은 문제 한 가지 (선택)" |
| 개인정보 수집 동의 | checkbox | ✅ | 한 줄, 별도 페이지 링크 |

> 전화번호는 받지 않는다 (의도된 부재 — 비대면 진단 우선).

### 5.3 Submit UX

1. 클릭 시 버튼이 로딩 상태로 전환 (스피너 X, 텍스트 변경: "전송 중…")
2. 성공: 폼이 페이드 아웃되고 같은 자리에 확인 메시지 + 다음 액션
3. 실패: 인라인 에러 메시지, 폼 데이터 보존
4. Supabase `contact_submissions` 테이블에 insert (현재 미연결 — Phase D에서 환경변수 정리)

**Copy seed (성공 메시지):**
```
EN  Thank you. We'll be in touch within 2 business days.
KR  접수되었습니다. 영업일 기준 2일 이내에 회신드립니다.

다음 액션 (작게):
    [방법론 다시 보기 →]  [홈으로 →]
```

### 5.4 후속 응대 흐름 카피 (운영 가이드, 사이트 노출 X)

- 자동 회신 이메일 1차: 접수 확인 + 진단 통화 예약 캘린더 링크
- 진단 통화 후: 1페이지 요약 메모 (PDF) 발송 — 이게 무료 가치 제공 + 후속 거래의 시발점

---

## 6. Success Criteria

### 6.1 정성 (BX 에이전시 수준)

| 항목 | 기준 |
|------|------|
| 톤 일관성 | 헤드라인·본문·CTA가 §2.3 Tone 표 안에 머무는가 |
| 시각 일관성 | 7개 섹션이 같은 시스템(Design.md)에서 파생되었는가 |
| 디테일 | 마이크로 인터랙션·포커스 링·로딩 상태가 의도적으로 설계되어 있는가 |
| 한·영 페어링 | 영문이 한글 번역이 아니라 별도 카피로 작성되었는가 |
| "두고 두고 보고 싶다" | 한 번 보고 닫는 것이 아니라, 동료에게 링크 보내고 싶은 사이트인가 |

### 6.2 정량

| 지표 | 목표 |
|------|------|
| LCP | < 2.0s (모바일 4G) |
| CLS | < 0.05 |
| INP | < 200ms |
| 모바일 fps | 60 (생성형 히어로 포함; reduced-motion 시 정적) |
| 접근성 | WCAG AA (명도 대비, 키보드 내비, prefers-reduced-motion 존중) |
| JS 번들 (모바일 gzip) | < 200KB (히어로 WebGL 코드 스플릿) |

---

## 7. Out of Scope (이번 단계)

이번 v3 작업에서 **하지 않는 것**:

- ❌ Portfolio 페이지 (`/portfolio`) — 차기 단계
- ❌ 블로그/저널 라우트
- ❌ i18n 다국어 라우팅 (`/en`, `/ko`) — 한영 병기로 처리
- ❌ CMS 연결 (Sanity, Notion 등)
- ❌ 다크 모드 자동 전환 — 다크/라이트 구간은 섹션별로 의도된 디자인
- ❌ 인플루언서/크리에이터 비즈니스의 전면 노출
- ❌ AI 도구 로고 마키 (v2의 AIStudioSection 패턴) — 도구 나열 금지 원칙

---

## 8. Open Questions

**All resolved in Phase C.** 전체 결정 로그는 plan 파일 `/root/.claude/plans/transient-nibbling-rabbit.md` 참조.

요약:
- §06 폼 노출 → **인라인** (본 PRD §4 Section 06 반영)
- §03 System 레이어 → **Signal / Judgment / Action / Record** (본 PRD §4 Section 03 반영)
- §05 Voice 카피 → **v3 포지셔닝 기반 신규 작성** (본 PRD §4 Section 05 반영)
- 회사 영문명 → **"Siriai" 단독** (Practice·Studio 등 보조어 미사용)
- 진단 통화 가격 정책 → **가격 언급 X**, CTA "진단 통화 신청 / Start a diagnosis"

차기 단계(Portfolio 확장, i18n 도입, CMS 연동, 다크 모드 자동 전환 등) 결정이 필요한 시점이 오면 본 챕터에 재개항한다.

> Design 시스템 결정(컬러 C안, Pretendard 단독 + 토큰 추상화, Lenis 제거, Canvas 2D 히어로, SectionIndicator 제거)은 [`Design.md` §12](./Design.md#12-open-questions) 참조.

---

## Cross-references

- 시각 시스템 / 컴포넌트 / 다이어그램 명세 → [`Design.md`](./Design.md)
- v2.0 PRD (참고용 보존) → [`PRD.md`](./PRD.md)
- 프로젝트 운영 컨텍스트 → [`CLAUDE.md`](./CLAUDE.md), [`AGENTS.md`](./AGENTS.md)
