# SIRIAI — Hero & 홈페이지 리디자인 · 디자인 브리프

> "Claude Design"(또는 디자인 전문 AI/디자이너)에게 그대로 전달하기 위한 문서.
> 목표: **monopo 수준의 임팩트와 깊이(depth)를 가진 Hero**를 중심으로,
> 홈페이지 경험 전체의 아트 디렉션 시안을 받는다.

---

## 0. 복붙용 프롬프트 (이 한 단락 + 아래 문서 + 첨부 이미지 함께 전달)

```
당신은 시니어 아트 디렉터이자 인터랙션 디자이너입니다. SIRIAI(AI 컨설팅 브랜드)
홈페이지를 리디자인합니다. 특히 "히어로 섹션"을 monopo.london / monopo.vn 수준의
몰입감·깊이·아트 디렉션으로 끌어올리는 게 핵심입니다.

핵심 키워드는 '신비주의(mysterious)', '느린(slow/deliberate)', '스마트(smart/precise)'.
지금 시안(아래 §5 v4)은 아트 디렉션이 없어 "디자인을 배우지 않은 개발자 결과물"처럼
밋밋합니다. 이걸 갤러리급 경험으로 다시 설계해 주세요.

산출물: 서로 다른 히어로 컨셉 2~3안 (무드/모션 안무/깊이 연출/타이포/오브젝트/빛·색),
그리고 압축된 전체 페이지 구성안. 각 안은 비주얼 목업(가능하면 이미지 또는 실행 가능한
HTML/CSS/JS 데모)으로, 디자인 의도와 함께 제시. 아래 §6 제약과 §7 카피는 반드시 준수.
Next.js/React + framer-motion/GSAP/three.js/canvas로 구현 가능한 범위 안에서 제안.
```

---

## 1. 프로젝트 · 브랜드

- **SIRIAI (시리아이)** — 서울 기반 **AI 컨설팅**. AI 아키텍처 · 리터러시 · 매핑.
- 브랜드 한 줄: *"Architecture for Insight with AI"* / "AI로 사고하는 조직을 위한 의사결정 구조 설계."
- 매니페스토(톤의 핵심): **"We don't recommend tools. We architect what stays."** (도구를 추천하지 않는다. 남는 구조를 설계한다.)
- 결: 프리미엄 · 절제 · 지적(smart) · B2B지만 글로벌 감도. 과시 없이 깊이로 설득.

## 2. 의뢰 (무엇을 · 왜)

- **메인 의뢰: 홈페이지 Hero를 비주얼 임팩트·깊이 있는 경험으로 재설계.** 부차적으로 페이지 전체 구성도.
- **현재 문제(솔직히):** Hero의 비주얼 임팩트가 약하다. 모션·깊이·아트 디렉션이 없어 "디자인을 전혀 배우지 않은 개발자와만 일한" 결과물처럼 보인다. (현 시안 §5 참고)
- **원하는 수준:** monopo.london / monopo.vn 정도의 몰입·깊이·연출. "긴 페이지"가 아니라 **1~3 화면 안의 복합적·층위적 경험**.

## 3. 디자인 방향 키워드 (3축)

1. **신비주의(Mysterious)** — 어둠에서 서서히 드러남, 여백과 암시, 즉시 다 보여주지 않는 긴장. (monopo의 "어둠에서 떠오르는" 결)
2. **느린(Slow / deliberate)** — 천천히 호흡하는 모션, 긴 이징, 체류·전환의 여유. 빠르고 분주하지 않음.
3. **스마트(Smart / precise)** — 정밀한 타이포·그리드·타이밍. 절제됐지만 지적인 디테일. 키치/과장 금지.
   - 보조: **프리미엄 · 깊이(depth)** — 레이어드 모션/패럴랙스/광원/그레인 등으로 평면이 아닌 공간감.

## 4. 레퍼런스 (반드시 보고 출발 · 첨부 스크린샷 동봉)

| 레퍼런스 | 무엇을 가져올까 | 왜 |
|---|---|---|
| **monopo.london** / **monopo.vn** | **Hero의 목표 수준** — 다크·몰입·느린·신비, 강한 타이포 아트 디렉션, 레이어드 모션·전환, 깊이감 | "비주얼 임팩트·깊이"의 기준점. 갤러리/시네마틱 결 |
| **twelvelabs.io/ko** | **바디 컬러 = 흰색 기반** + 절제된 변주, 깔끔한 정보 밀도 | 본문은 밝고 명료하게 |
| **gemini.google/kr/about** | **흰색 기반** + **단 하나의 빛/오브젝트를 잘 쓴** Hero, pill 버튼 디테일 | "오브젝트 절제" + 버튼 포인트의 좋은 예 |

> 첨부 이미지: `monopo`(다크·신비 Hero), `twelvelabs`/`gemini`(흰색 바디·오브젝트 1개), 그리고 현재 시안(`v4`) 스크린샷.
> 라이브로도 직접 보길 권장 (URL은 §5).

## 5. 현재 상태 (이걸 딛고 발전)

- **확정 베이스(콘텐츠·UX라이팅은 좋음, 유지):** 프로덕션 라이브 → https://siriai-beta.vercel.app/
- **현재 리디자인 1차 시안(= 개선 대상, Hero 약함):** https://siriai-git-design-v4-dowtoris-projects.vercel.app/v4
  - 잘된 것: 흰색 기반 바디, 6섹션 → Hero+2 act 압축, pill 버튼·불렛 포인트.
  - **약한 것(개선 핵심): Hero.** 다크+글로우+텍스트 페이드뿐 — 깊이·연출·아트 디렉션 부재.

## 6. 제약 / 불변 (반드시 준수)

- **카피·브랜드 정체성 변경 금지** (§7 그대로). AI 컨설팅 정체성 유지. K뷰티/인플루언서 콘텐츠 아님.
- **Hero = 다크·신비 (별개 경험)** / **바디 = 흰색 기반** + 필요시 다크 변주.
- **오브젝트는 절제** (Hero에 핵심 오브젝트 1개 수준). 과한 3D 장식 금지.
- **디자인 포인트는 버튼(pill)·불렛·디테일**에서 가져옴.
- **IA 압축:** 긴 스크롤 금지. 1~3 화면의 복합 경험.
- **구현 가능성:** Next.js 16 (App Router) · React 19 · framer-motion 사용 중. GSAP / three.js / canvas / WebGL / 셰이더 도입 가능. Vercel 배포. → 웹에서 구현 가능한 모션·연출로 제안.
- **접근성:** `prefers-reduced-motion` 존중(모션 대체), 텍스트 대비 확보.

## 7. 콘텐츠 / 카피 (verbatim — 이대로 사용)

**Hero (천천히 순환하는 메시지 4단, 또는 단일 고정 — 디자인 제안):**
- `Architecture for / Insight with AI.`  · KR 보조: `AI 기반 인사이트, 가장 쉽고 감각적으로.`
- `Not tools. / Structure.`
- `Not output. / Decisions.`
- `Not deployment. / Design.`

**01 Stance:** `Tools change. Structure remains. We design it.`
- AI 도구는 매일 새롭게 등장합니다.
- 필요한 건 도구가 아니라 창의성과 결합된 구조.
- 시리아이는 그 구조를 설계합니다.

**02 Methodology:** `Three ways in. One place to begin.` / 세 갈래로 들어가, 한 자리에서 시작합니다.
- **Architecture** — 의사결정의 구조를 설계합니다.
- **Literacy** — 조직이 AI로 사고하는 법을 익힙니다.
- **Mapping** — 무엇이 진짜 문제인지 함께 그립니다.

**03 System:** `Decision flow. Made visible.` / 판단의 흐름을, 보이게. — `Signal · Judgment · Action · Record`

**04 Clients:** `Brands we've sat with.` / 각자 다른 결, 같은 자세.
- HYBE · CJ ENM · JYP · MUSINSA · COSRX · innisfree · moev · oddtype · 8DIVISION · OpenAI · Anthropic · Gemini · Vercel · Supabase · Next.js

**05 Voice:** `We don't recommend tools. We architect what stays.`
- `+32%` 이상의 의사결정 비용 감소를 체험해보세요.
- AI 리터러시적 사고를 기반으로 한 최적의 설계. — Siriai Manifesto, 2026

**06 Contact:** `Let's start with coffee.` / 가벼운 커피챗으로, 해묵은 고민을 시원하게. — `contact@siriai.io`

**Wordmark:** `Siriai` (footer 풀폭, serif). 도구가 아닌 비전을 제시합니다.

## 8. 받고 싶은 결과물 (Deliverables)

1. **Hero 컨셉 2~3안** — 각 안마다:
   - 무드/컨셉 한 줄 + 분위기 보드(색·빛·질감).
   - **모션 안무(choreography):** 진입·체류·전환·스크롤 연동 — "느린·신비"가 어떻게 시간 축에서 펼쳐지는지.
   - **깊이 연출 기법:** 레이어/패럴랙스/광원/그레인/마스킹/3D·셰이더 등 구체적으로.
   - **타이포 아트 디렉션:** 위계·스케일·커닝·움직임.
   - **핵심 오브젝트 1개**의 형태·거동.
   - 가능하면 **비주얼 목업(이미지)** 또는 **실행 가능한 HTML/CSS/JS 데모**.
2. **전체 페이지 구성안** — 압축된 1~3 화면 복합 경험의 흐름(Hero→바디→마무리), 흰색 바디에서의 리듬과 다크 변주 위치.
3. **각 안의 근거** — §3 키워드·§4 레퍼런스와 어떻게 연결되는지.
4. (권장) **추천 1안** + 이유.

## 9. 성공 기준 (이렇게 판단한다)

- Hero가 **즉시 "와" 하는 임팩트 + 머무르고 싶은 깊이**가 있는가.
- **신비주의·느린·스마트**가 모션과 구성에서 실제로 느껴지는가.
- monopo 결의 **몰입/연출**에 근접하되, SIRIAI의 **절제·프리미엄·지적** 톤을 지키는가.
- 흰색 바디 / 다크 Hero, 오브젝트 절제, 버튼·불렛 포인트, 카피 불변을 지키는가.
- "개발자 기본값" 느낌을 벗고 **아트 디렉션이 보이는가**.

## 10. 기술 컨텍스트 (구현 현실성)

- 스택: Next.js 16 App Router · React 19 · TypeScript · framer-motion (GSAP/three.js/canvas/WebGL 도입 가능) · Tailwind v4 · Vercel.
- 폰트: Pretendard(본문/UI), Playfair Display(워드마크). 영문 디스플레이 폰트 도입 의향 있음(제안 환영).
- 제안이 채택되면 이 스택으로 `/v4`(격리 라우트)에 구현 → 프리뷰 → 확정 시 프로덕션 `/`로 승격.

---

### 첨부 권장 파일 (이 문서와 함께 전달)
- `monopo` 스크린샷 (Hero 목표 결)
- `twelvelabs` · `gemini` 스크린샷 (흰색 바디·오브젝트)
- 현재 `v4` Hero·전체 스크린샷 (개선 대상)
