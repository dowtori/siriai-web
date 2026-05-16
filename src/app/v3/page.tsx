import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siriai — Architecture for thinking with AI",
  description:
    "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
};

type Tone = "light" | "dark";

const SECTIONS: Array<{ id: string; label: string; tone: Tone }> = [
  { id: "hero", label: "00 — HERO", tone: "light" },
  { id: "stance", label: "01 — STANCE", tone: "light" },
  { id: "methodology", label: "02 — METHODOLOGY · Diagram A", tone: "light" },
  { id: "system", label: "03 — SYSTEM · Diagram B", tone: "dark" },
  { id: "services", label: "04 — SERVICES", tone: "light" },
  { id: "voice", label: "05 — VOICE", tone: "dark" },
  { id: "contact", label: "06 — CONTACT", tone: "light" },
];

export default function V3Home() {
  return (
    <main
      style={{
        backgroundColor: "var(--surface-base)",
        color: "var(--fg-default)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {SECTIONS.map((s) => (
        <PlaceholderSection key={s.id} {...s} />
      ))}
    </main>
  );
}

function PlaceholderSection({ id, label, tone }: { id: string; label: string; tone: Tone }) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center border-t"
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
