import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";

// Fraunces — variable serif with optical sizing + soft/wonk axes.
// Editorial New(Locomotive) 결의 가장 가까운 무료 대안. 워드마크·헤드 모두 담당.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--bn-mark",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--bn-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siriai — Architecture for Insight with AI",
  description:
    "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
};

const editorialTokens: CSSProperties = {
  // ── Editorial cinematic palette (B안) ────────────────
  ["--bn-bg" as never]: "#0A0908",
  ["--bn-bg-deep" as never]: "#050403",
  ["--bn-ink" as never]: "#F2EAD3",
  ["--bn-ink-muted" as never]: "rgba(242,234,211,0.55)",
  ["--bn-ink-faint" as never]: "rgba(242,234,211,0.28)",
  ["--bn-accent" as never]: "#B8916A", // copper — primary
  ["--bn-accent-deep" as never]: "#7A5C42",
  ["--bn-accent-blue" as never]: "#7A8A9A", // luxury restraint deep blue tint (A안 #2B3A4A 변주 — dark bg에 맞춰 lift)
  ["--bn-rule" as never]: "rgba(242,234,211,0.12)",
};

export default function BNLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${plexMono.variable} antialiased`}
      style={{
        ...editorialTokens,
        background: "var(--bn-bg)",
        color: "var(--bn-ink)",
      }}
    >
      {children}
    </div>
  );
}
