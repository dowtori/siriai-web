import Stage12Transition from "@/components/a1/Stage12Transition";

/**
 * Phase A1.3 carry — Stage 1 → 2 wash transition isolation.
 * 위 80vh를 midnight 잔여로 시뮬레이션, 그 아래 Stage12Transition (40vh wash),
 * 그 아래 80vh paper 잔여 — scroll로 진입 trigger 확인.
 */
export default function HarnessTransition12() {
  return (
    <main style={{ background: "var(--a1-midnight)" }}>
      <section
        aria-hidden
        style={{
          height: "80vh",
          background: "var(--a1-midnight)",
          color: "var(--a1-on-midnight)",
          padding: 24,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-on-mute)",
            margin: 0,
          }}
        >
          Harness · Transition 1→2 isolation
        </p>
        <p
          style={{
            marginTop: 16,
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--a1-on-mute)",
            maxWidth: "44ch",
          }}
        >
          Stage 1 (midnight) 잔여물 시뮬레이션 — 스크롤하면 wash dissolve가 진입 trigger 됩니다.
        </p>
      </section>

      <Stage12Transition />

      <section
        aria-hidden
        style={{
          height: "80vh",
          background: "var(--a1-paper)",
          color: "var(--a1-mute)",
          padding: 24,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-mute)",
            margin: 0,
          }}
        >
          Stage 2 paper 잔여 (placeholder)
        </p>
      </section>
    </main>
  );
}
