# SIRIAI 홈페이지 — 클로드 코드 협업 프롬프트 & 워크플로우

> 목적: 위에서 만든 분석·스타일가이드·토큰을 **클로드 코드가 실제 코드에 반영**하게 만드는 실행 패키지.
> 핵심 문제였던 "클로드 코드의 비주얼 감도 약함"은 대부분 **시각적 기준(레퍼런스·토큰)을 안 줘서** 생긴다. 이 문서가 그 기준을 준다.

---

## A. 왜 감도가 약했나 (진단)

클로드 코드는 "예쁘게 만들어줘"라는 추상적 지시엔 약하다. 코드 모델이라 **구체적 수치·규칙·시각 레퍼런스**가 있어야 감도가 산다. 해결책 3가지:

1. **토큰을 코드에 박는다** — 색·간격·타입을 변수로 고정하면 "감도"의 70%가 자동 해결(일관성).
2. **시각 레퍼런스를 눈으로 준다** — 동봉한 `SIRIAI_02_비주얼_스타일가이드.html`을 열어 스크린샷 → 클로드 코드에 첨부.
3. **스크린샷 인 더 루프** — 클로드 코드가 만든 화면을 스크린샷 찍어 다시 보여주고 "스타일가이드와 비교해 고쳐"라고 한다.

---

## B. 셋업 — 프로젝트에 넣을 파일

```
your-site/
├─ CLAUDE.md                 ← 아래 C 섹션 내용 붙여넣기
├─ src/styles/tokens.css     ← SIRIAI_design-tokens.css 그대로 복사
├─ docs/style-guide.html     ← SIRIAI_02_비주얼_스타일가이드.html 복사
└─ docs/reference-report.md  ← SIRIAI_01_레퍼런스_분석_리포트.md 복사
```

`tokens.css`를 전역 진입점에서 import하고, 모든 색/간격은 **하드코딩 금지, 변수만 사용**.

---

## C. CLAUDE.md 에 넣을 비주얼 규칙 (복사용)

```markdown
## SIRIAI 비주얼 규칙 (반드시 준수)

무드: 미니멀·여백 + 감성·에디토리얼 + 절제된 모션. "조용한 고급감".
경쟁사(Viral Nation 등)가 시끄럽게 갈 때 우리는 조용히 가서 차별화한다.

### 색
- 모든 색은 src/styles/tokens.css 의 CSS 변수만 사용. HEX 하드코딩 금지.
- 배경은 --c-canvas(웜 페이퍼). 액센트 --c-accent(테라코타)는 화면당 1~2회만.
- 큰 면적 채색 금지. 대비 섹션은 --c-dark 사용.

### 타입
- 헤드라인은 --f-serif(Fraunces), 본문·UI는 --f-sans(Inter/Pretendard).
- 히어로 헤드라인은 --t-display, weight 300, line-height 1.05, letter-spacing -0.015em.
- 본문 폭은 --maxw-text(720px) 이하로 제한. line-height 1.6.

### 간격·레이아웃
- 8px 그리드. 모든 margin/padding은 --s-* 토큰.
- 섹션 상하 패딩 --section-y. 컨테이너 --maxw(1200px), gutter --gutter.
- 라운드는 작게(--r-sm~--r-lg). pill은 버튼만. 과한 둥근 모서리 금지.
- 비대칭/에디토리얼 그리드 허용. 여백을 사치스럽게 — 한 화면에 적게 담기.

### 모션
- 모든 transition은 --ease, 200~480ms. 느린 모션 금지.
- 스크롤 등장: translateY(24px)+opacity, stagger 60~80ms.
- 스무스 스크롤은 Lenis(lerp 0.1) + GSAP ScrollTrigger.
- 시그니처 모션은 히어로 1곳에만. 자동재생 캐러셀·과한 패럴랙스 금지.
- prefers-reduced-motion 반드시 존중.

### 작업 규칙
- 새 컴포넌트는 docs/style-guide.html 의 패턴(버튼/카드/타입)을 먼저 참고.
- UI를 바꾸면 스스로 설명 말고, 스크린샷을 찍어 style-guide.html 과 대조해 차이를 보고.
- 접근성: 대비 AA 이상, 포커스 링 유지, 시맨틱 태그.
```

---

## D. 작업 지시 프롬프트 (클로드 코드에 그대로)

### D-1. 토큰 적용 (1순위, 가장 효과 큼)
```
src/styles/tokens.css 를 전역에 import해줘. 그리고 현재 코드 전체를 훑어서
하드코딩된 색·폰트·간격·radius·transition을 전부 tokens.css 의 CSS 변수로
치환해줘. 치환 전후를 표로 보고하고, 토큰에 없는 값이 있으면 가장 가까운
토큰을 제안해줘. 임의로 새 색은 만들지 마.
```

### D-2. 히어로 리디자인 (레퍼런스 기반)
```
docs/style-guide.html 을 열어 스크린샷을 찍어 참고해. 그 페이지의 hero 데모와
docs/reference-report.md 의 Aesop·Cuberto 분석을 기준으로, 우리 홈 히어로를
다시 만들어줘:
- 배경 --c-canvas, 중앙 정렬, --t-display 세리프 헤드라인(weight 300)
- 짧은 --t-lg lede 1줄, 그 아래 primary + ghost 버튼
- 풀블리드 이미지가 들어갈 자리는 하단 그라데이션(밝음→어두움) 처리
- 진입 시 헤드라인 줄 단위로 부드럽게 등장(stagger). 과하지 않게.
완료 후 스크린샷 찍어서 style-guide.html 의 hero와 나란히 비교하고 차이를 고쳐줘.
```

### D-3. 케이스(성공사례) 섹션
```
style-guide.html 의 케이스 카드 패턴을 사용해 캠페인 사례 그리드를 만들어줘.
각 카드는 개요 → 성과 KPI(숫자) 구조. 호버 시 translateY(-4px)+그림자(300ms).
데이터는 일단 더미(TOCOBO/NCT WISH/무신사)로, 나중에 교체 가능하게 구조화.
```

### D-4. 모션 레이어
```
Lenis + GSAP ScrollTrigger를 붙여줘. 모든 섹션에 등장 reveal(translateY 24px,
opacity, --dur-slow, --ease, stagger 70ms). 모션 토큰은 tokens.css 사용.
prefers-reduced-motion 일 때 전부 비활성화. 성능: 60fps 유지, 무거운 라이브러리 금지.
```

---

## E. 스크린샷 인 더 루프 (감도 끌어올리는 핵심 루프)

이게 "비주얼 감도"를 실제로 올리는 방법이다. 반복:

1. 클로드 코드가 화면을 구현.
2. **스크린샷**을 찍는다(클로드 코드 안에서 Playwright/Puppeteer로 캡처하거나, 직접 캡처해 첨부).
3. 스타일가이드 스크린샷과 **나란히** 주고: "왼쪽이 우리 화면, 오른쪽이 기준. 간격·타입·여백 차이를 찾아 코드로 고쳐."
4. 차이가 없을 때까지 2–3회 반복.

> 팁: 한 번에 "전부 예쁘게"보다, **한 섹션씩** 기준과 대조하는 게 훨씬 빠르고 정확하다.

### 클로드 코드용 자동 캡처 스니펫 (선택)
```bash
# 로컬 dev 서버 띄운 뒤
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 home.png
# → home.png 를 style-guide 스크린샷과 비교 요청
```

---

## F. 추천 기술 스택 (이 무드에 최적)

- **프레임워크**: 기존 그대로 OK. 신규면 Next.js 또는 Astro(콘텐츠/에디토리얼에 강함).
- **스타일**: CSS 변수(tokens.css) + Tailwind v4(`@theme`로 토큰 매핑) 또는 순수 CSS.
- **폰트**: Fraunces(Google) + Inter(Google) + Pretendard(jsdelivr). `font-display:swap`, 서브셋·preload로 CLS 방지.
- **모션**: Lenis(스무스 스크롤) + GSAP ScrollTrigger + SplitText(줄 단위 reveal).
- **이미지**: 차세대 포맷(AVIF/WebP), 풀블리드는 `object-fit:cover`, 지연 로딩.
- **성능 목표**: 홈 LCP < 3s, CLS < 0.1, 첫 화면에 CTA. (최상위 에이전시 공통 기준)

---

## G. 이번 작업의 한계 & 다음에 더 잘 하려면

- 지금은 홈페이지 **프로젝트 폴더가 연결돼 있지 않아** 현재 코드를 직접 읽지 못했다.
  폴더를 연결해주면: 현재 코드의 비주얼 상태를 진단 → 토큰 적용 → 섹션별 리디자인까지 내가 직접 할 수 있다.
- 말씀하신 코드 세션(`[잠정완료]플랜A - 다듬기...`)은 현재 내 쪽 세션 목록에 안 잡혔다.
  그 세션이 **열려 있는 상태**면 자동으로 연결되니, 켜둔 채 알려주면 작업 내용을 이어받아 보강할 수 있다.

---

## 동봉 파일
- `SIRIAI_01_레퍼런스_분석_리포트.md` — 레퍼런스 해부 + 실측 캡처 + 트렌드 근거
- `SIRIAI_02_비주얼_스타일가이드.html` — 브라우저로 열어보는 리빙 스펙(스크린샷용)
- `SIRIAI_design-tokens.css` — 코드에 바로 붙이는 단일 토큰 소스
- `SIRIAI_03_클로드코드_협업_프롬프트.md` — 이 문서
