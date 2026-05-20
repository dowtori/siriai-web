import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--bn-mark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siriai — Architecture of Thought",
  description: "A z-axis journey into Siriai's operating model. Vol. I.",
};

const editorialTokens: CSSProperties = {
  // Editorial cinematic palette
  ["--bn-bg" as never]: "#0A0908",
  ["--bn-bg-deep" as never]: "#050403",
  ["--bn-ink" as never]: "#F2EAD3",
  ["--bn-ink-muted" as never]: "rgba(242,234,211,0.55)",
  ["--bn-ink-faint" as never]: "rgba(242,234,211,0.28)",
  ["--bn-accent" as never]: "#B8916A",
  ["--bn-accent-deep" as never]: "#7A5C42",
  ["--bn-rule" as never]: "rgba(242,234,211,0.12)",
};

export default function BNLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${playfair.variable} antialiased`}
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
