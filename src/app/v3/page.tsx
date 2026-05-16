import type { Metadata } from "next";
import Navigation from "@/components/v3/Navigation";
import StanceSection from "@/components/v3/StanceSection";
import VoiceSection from "@/components/v3/VoiceSection";

export const metadata: Metadata = {
  title: "Siriai — Architecture for thinking with AI",
  description:
    "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
};

type Tone = "light" | "dark";

export default function V3Home() {
  return (
    <>
      <Navigation />
      <main
        style={{
          backgroundColor: "var(--surface-base)",
          color: "var(--fg-default)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <PlaceholderSection id="hero" label="00 — HERO · Canvas 2D 텍스트 파티클" tone="light" />
        <StanceSection />
        <PlaceholderSection id="methodology" label="02 — METHODOLOGY · Diagram A" tone="light" />
        <PlaceholderSection id="system" label="03 — SYSTEM · Diagram B" tone="dark" />
        <PlaceholderSection id="services" label="04 — SERVICES" tone="light" />
        <VoiceSection />
        <PlaceholderSection id="contact" label="06 — CONTACT · 인라인 폼" tone="light" />
      </main>
    </>
  );
}

function PlaceholderSection({ id, label, tone }: { id: string; label: string; tone: Tone }) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className="flex min-h-screen items-center justify-center border-t"
      style={{
        backgroundColor: dark ? "var(--surface-inverse)" : "var(--surface-base)",
        color: dark ? "var(--fg-on-inverse)" : "var(--fg-default)",
        borderColor: dark ? "var(--line-on-inverse)" : "var(--line-default)",
      }}
    >
      <div className="px-8 text-center">
        <p
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: dark ? "var(--fg-on-inverse-muted)" : "var(--fg-muted)" }}
        >
          {label}
        </p>
        <p className="mt-4 text-sm opacity-50">Under construction</p>
      </div>
    </section>
  );
}
