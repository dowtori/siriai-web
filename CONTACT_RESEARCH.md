# Contact Research — UX 사례 분석

> 작성: 2026-05-16 · 본 문서는 Siriai Contact 섹션 디벨롭의 **선행 자료**.
> Reference 3종 — Resend / Cal.com / Studio Dumbar — 의 톤·UX 패턴을 분석하고 Siriai 적용 후보 옵션을 정리.
> 본 라운드에서 코드 적용은 **하지 않음**. 사용자 검토 후 별도 라운드에서 디벨롭.

> ⚠ **한계 명시**: 본 라운드에서 환경 네트워크 정책으로 외부 사이트 fetch가 모두 403. 본 문서는 **사전 지식 + 일반에 알려진 패턴** 기반. 실제 페이지 톤·정확 카피와 차이가 있을 수 있음. 사용자가 사이트 직접 확인 후 보정 권장.

---

## 1. Reference 분석

### 1.1 Resend — `resend.com`

**브랜드 컨텍스트** — 개발자 친화적 이메일 API. 미니멀 craft 톤.

| 영역 | 패턴 |
|---|---|
| 톤 | 차갑지 않지만 무덤덤. craft에 의지하는 미니멀. 따뜻함보다 정확함. |
| Contact 진입 | 메인 페이지 footer 또는 `/contact` — 짧은 폼 (Name / Email / Message) + 직설 라벨 |
| 시각 | 흰 배경 · 검정 텍스트 · 매우 절제된 컬러 액센트 · sans-serif (Inter 류) |
| Submit | 짧은 동사구 ("Send", "Contact us") |
| 성공 메시지 | 짧고 명확 ("We'll get back to you.") |

**Siriai에 가져올 만한 것**
- 폼 minimal craft — 라벨 / placeholder의 절제된 톤.
- 성공 메시지 단정 + 짧은 약속 (이미 v3 ContactForm은 이 톤).
- 폼 위 intro는 짧은 동사구 1줄로 — 현재 Siriai는 `진단 통화로 시작합니다. …` 평이 OK.

**가져오지 말 것**
- product-y CTA 동사("Get started for free", "Try Resend").
- 가입 유도 색채.

---

### 1.2 Cal.com — `cal.com`

**브랜드 컨텍스트** — 오픈소스 스케줄링. 가용 시간대 선택의 표준.

| 영역 | 패턴 |
|---|---|
| 핵심 UX | 인라인 캘린더 → 날짜 클릭 → 슬롯 vertical list → 슬롯 클릭 → 최소 폼 (이름·이메일·짧은 메시지) → 확정 메일 |
| 단계 | 1) Event type 선택 (15min / 30min / 60min) → 2) Date → 3) Time slot → 4) Form → 5) Confirm |
| Embed 옵션 | `<Cal />` React component (`@calcom/embed-react`), iframe, popup |
| 톤 | 미니멀·기능 우선. 친근하지만 톤은 product-y. |
| 시각 | 흰 배경 · 보라 또는 검정 액센트 · 캘린더 grid가 시각의 핵심 |
| 통합 | Google Cal / Outlook / Zoom / Stripe / 결제 옵션 |

**Siriai에 가져올 만한 것**
- **`@calcom/embed-react` 인라인 임베드** — 별도 라우트 이동 없이 ContactSection 안에서 슬롯 선택 + 폼 통합.
- Event type 분기 — Studio / Advisory / Literacy 3 interest를 Cal Event Type 3개로 매핑 (각각 다른 길이·다른 안내 메시지 가능).
- 슬롯 선택의 **가벼움** — "지금 시간 한 번 정해 두고 가세요" 식의 거리감 0 UX.

**가져오지 말 것**
- Cal.com 브랜드 색감(보라) — Siriai는 슬레이트 액센트만 사용 (CSS 토큰 `--accent`).
- Cal.com 자체 footer / branding 노출 — paid plan으로 white-label 가능.
- 결제/스폰서십 통합 — 현재 Siriai는 "가격 노출 X" (PRD Phase C 결정).

**기술 통합 메모**
- `npm i @calcom/embed-react`
- iframe 임베드는 v3 Canvas / framer-motion과 동일 페이지 공존 OK.
- Cal Event Type 3개 (`/siriai/studio-15min`, `/siriai/advisory-30min`, `/siriai/literacy-30min` 등)를 사전 생성 필요.
- iframe 안의 폼 + 우리 ContactForm 둘 다 Supabase로 데이터 흘릴 수 있는지 검토 (Cal webhook → Supabase function).

---

### 1.3 Studio Dumbar — `studiodumbar.com`

**브랜드 컨텍스트** — 네덜란드 디자인 스튜디오. 시각 atmosphere로 브랜드.

| 영역 | 패턴 |
|---|---|
| Contact 진입 | 폼이 아닌 이메일 직접 노출 (`studio@dumbar.nl` 류). 간단한 안내문 + 메일 링크. |
| 톤 | 시적이지 않고 절제됨. brand는 visual로 표현. |
| 시각 | 흰 + 검정 + 강한 컬러 액센트 (작업별 다름) · 큰 typography · 여백 |
| Footer | 워드마크 큼 · 주소 · 이메일 · 소셜 minimal |

**Siriai에 가져올 만한 것**
- **카피 절제** — 시적 표현 회피 (R11과 일치).
- 시각 무게 — 큰 typography로 brand presence.
- "이메일 직접 노출 + 짧은 안내문" 옵션을 **가벼운 진입점**으로 검토 (`hello@siriai.io` 직접 노출).

**가져오지 말 것**
- 폼 없이 이메일만 두는 형태 — Siriai는 폼 기반 진단 통화 신청이 핵심 funnel. 폼은 유지하되, **이메일 직접 노출을 보조 진입점으로 추가** 검토.

---

## 2. Siriai 적용 후보 — 3 옵션

> 사용자 의도: "비어있는 시간대 선택 + 커피챗/온라인 미팅 신청 + 현재 가벼운 방식 병행 + 따뜻하면서 센스 있는".

### 옵션 A — 듀얼 진입 (Recommended)

**구조**: 현재 ContactForm 유지 + Cal.com inline embed를 옆 또는 아래에 추가.

```
┌─ ContactSection ──────────────────────────────────┐
│                                                    │
│  06 — Contact                                      │
│  Start with a diagnosis.                           │
│  진단 통화로 시작합니다.                              │
│                                                    │
│  ┌────────────────────┐  ┌──────────────────────┐ │
│  │ [A] 시간 정해두기    │  │ [B] 메모만 남기기      │ │
│  │ Cal.com inline      │  │ ContactForm (현재)    │ │
│  │ — 30분 진단 통화      │  │ — interest 선택      │ │
│  │   슬롯 선택           │  │   메시지 (선택)        │ │
│  └────────────────────┘  └──────────────────────┘ │
│                                                    │
│  지금 결정하기 부담스러우면, 메모만 남겨도 됩니다.       │
│                                                    │
└────────────────────────────────────────────────────┘
```

- **(A) Cal.com inline** — 비어있는 시간대를 즉시 선택, 그 자리에서 확정 메일. interest별 Cal Event Type 분기.
- **(B) ContactForm** — 현재 v3 폼 유지. 시간 잡지 않고 메모만 남기는 가벼운 진입.
- **하단 코멘트** — "지금 결정하기 부담스러우면, 메모만 남겨도 됩니다." — 두 진입의 차이를 명시.

**장점**
- 사용자 의도 "병행" 정확 반영.
- "시간 정해두기 / 메모 남기기" 명시적 분기로 사용자 인지 부하 ↓.
- Cal.com Event Type 분기로 interest별 흐름 자연 통합.

**단점**
- 시각 면적 ↑ — 좌우 50:50 두 카드 구조 필요. 현 ContactSection 레이아웃 변경.
- Cal 계정 + Event Type 3개 사전 생성 필요.
- Cal embed 스타일링이 v3 토큰과 어긋날 위험 — white-label 조정 필요.

### 옵션 B — Cal.com 인라인 풀 통합 (단일 진입)

ContactForm 폐기 또는 Cal에 위임. 슬롯 선택이 1차 진입, Cal 자체 폼에 부가 필드(interest 등) 추가.

**장점**: 가장 일관·단순.
**단점**: 사용자 요청 "가벼운 방식 병행"과 충돌. 시간 잡기까지 부담스러운 사용자 진입 막힘.

→ 비채택.

### 옵션 C — 이메일 직접 노출 추가 (Dumbar 패턴)

ContactForm + `hello@siriai.io` 직접 노출. 슬롯 픽커 없음.

**장점**: 가장 가벼움.
**단점**: 사용자 요청 "비어있는 시간대 선택" 미충족.

→ 비채택. 단 옵션 A에 보조 진입으로 추가 가능 — Footer (d) 블록의 `contact@siriai.io`가 이미 그 역할.

---

## 3. 추천 흐름 — 다음 라운드

**채택**: 옵션 A (듀얼 진입)

**단계**
1. Cal.com 계정 생성 + Event Type 3개 사전 작성
   - `/siriai/studio` — 30min, "Studio 운영 설계 진단"
   - `/siriai/advisory` — 30min, "Advisory 자문 진단"
   - `/siriai/literacy` — 30min, "Literacy 커리큘럼 진단"
2. `npm i @calcom/embed-react` 설치
3. `ContactSection.tsx` 레이아웃 재설계 — 좌우 50:50 (모바일 stack)
   - 좌: Cal.com inline embed (white-label 토큰 매칭)
   - 우: 현재 ContactForm 유지 (조금 더 가벼운 톤으로 톤 조정 — Resend 미니멀 craft 참고)
4. **카피 톤 조정** (BRAND_VOICE §10 R11 준수, 시적 표현 0)
   - intro 한 줄 추가 안내문 — "지금 결정하기 부담스러우면, 메모만 남겨도 됩니다." (평이·따뜻함, 시적 0)
5. Cal webhook → Supabase `contact_submissions` 통합 (선택)
6. `next build` + Vercel preview → 사용자 검토

**예상 신규/수정 파일**
- `src/components/v3/ContactSection.tsx` — 좌우 분할 구조로 리디자인
- `src/components/v3/CalInlineEmbed.tsx` — Cal.com embed wrapper (신규)
- `src/components/v3/ContactForm.tsx` — placeholder·CTA 톤 미세 조정 (옵션)
- `package.json` — `@calcom/embed-react` 추가
- `src/app/api/cal-webhook/route.ts` — Cal → Supabase 통합 (옵션, 후속)

**미해결 결정 (사용자 확인 후 진행)**
- Cal.com 유료 plan 사용 여부 (white-label, branding 제거 필요)
- Cal Event Type 3개의 정확한 이름·길이·안내 카피
- ContactSection 좌우 분할 vs 상하 stack — desktop 시각 균형
- "intro 안내문"의 정확 한 줄 카피 — 사례 추가 검토 필요
- 현재 ContactForm 폼 필드 (`message`, `interest`)를 Cal 폼에도 매핑할지

---

## 4. 다음 라운드 산출물 예상

- `feat(v3): Cal.com inline embed + ContactSection 듀얼 진입`
- `style(v3): Cal embed white-label 토큰 매칭`
- 검증: 슬롯 선택 → 메일 수신 → Supabase insert 흐름 e2e + 모바일 stack 시각

본 문서는 그 라운드의 출발점.