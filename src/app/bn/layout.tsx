import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

// Geist Sans + Geist Mono — Vercel grotesque.
// Anthropic · Linear · Vercel 결. AI 컨설팅의 차가운 정체성.
// italic 미지원 — 모든 italic 자리는 regular + tracking으로 대체.
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--bn-mark",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--bn-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siriai — AI Architecture Practice",
  description:
    "AI 아키텍처 설계 컨설팅. 도구가 아닌 운영 구조를, 트렌드가 아닌 사고의 형태를 설계합니다.",
};

const tokens: CSSProperties = {
  // ── Cool cinematic palette (Round 6 자율 재설계) ─────
  ["--bn-bg" as never]: "#08090B",          // cool off-black (warm #0A0908 → cool)
  ["--bn-bg-deep" as never]: "#04050A",
  ["--bn-ink" as never]: "#E8EAEE",         // cool ivory (warm #F2EAD3 → cool gray)
  ["--bn-ink-muted" as never]: "rgba(232,234,238,0.55)",
  ["--bn-ink-faint" as never]: "rgba(232,234,238,0.28)",
  ["--bn-accent" as never]: "#9FB3C8",      // cool steel (copper #B8916A → cool)
  ["--bn-accent-deep" as never]: "#5C7790",
  ["--bn-rule" as never]: "rgba(232,234,238,0.12)",
};

export default function BNLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${geist.variable} ${geistMono.variable} antialiased`}
      style={{
        ...tokens,
        background: "var(--bn-bg)",
        color: "var(--bn-ink)",
      }}
    >
      {children}
    </div>
  );
}
