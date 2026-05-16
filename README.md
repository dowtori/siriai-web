# Siriai

> AI 아키텍처 설계 · AI 리터러시 구축 전문 컨설팅 공식 사이트
>
> **AI를 쓰는 것이 아니라, AI로 사고하는 구조를 설계합니다.**

Next.js 16 App Router · TypeScript · Tailwind CSS v4 · framer-motion · Pretendard Variable.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

선택: `.env.local`에 Supabase 키 설정 (미설정 시 contact form은 console.log fallback).
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Routes

| 경로 | 내용 |
|------|------|
| `/` | 메인 (v3, 7섹션) |
| `/contact` | Contact 페이지 (헤더 + 폼 + FAQ) |
| `/v1` · `/v1/contact` · `/v1/portfolio` | v1 legacy (noindex) |
| `/api/contact` | Supabase insert API |

## Documentation

- [`PRD.md`](./PRD.md) — 포지셔닝 · IA · 섹션 스펙 · 카피
- [`Design.md`](./Design.md) — 디자인 시스템 (컬러 · 폰트 · 모션 · 다이어그램 · 컴포넌트)
- [`CLAUDE.md`](./CLAUDE.md) — 에이전트·기여자용 컨텍스트
- [`archive/PRD.v2.md`](./archive/PRD.v2.md) — v2 PRD (legacy 보존)

## Deploy

Vercel 자동 배포 — `main` 브랜치 push 시 production, 그 외 브랜치는 preview.
