-- 20260516120000_add_interest_to_contact_submissions.sql
--
-- v3 contact form 신규 필드 'interest' 추가.
-- 값: 'Studio' | 'Advisory' | 'Literacy' | '미정' (한글 표기)
-- v3 인라인/페이지 폼에서 사용자가 선택한 모드를 그대로 저장.
-- NULL = v1 폼 제출 또는 v3에서 미선택(기본 '미정' 외).
--
-- 또한 message 컬럼을 NULL 허용으로 변경 — v3 인라인 폼은 메시지를 선택 입력으로 받음.
-- v1 폼은 자체 required 로 message 필수 유지 (UI 레이어에서 강제).

alter table public.contact_submissions
  add column if not exists interest text;

alter table public.contact_submissions
  alter column message drop not null;

comment on column public.contact_submissions.interest is
  'v3 contact form interest mode (Studio | Advisory | Literacy | 미정). NULL = v1 폼 또는 미선택.';
