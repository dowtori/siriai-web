import Reveal from "./Reveal";

/**
 * V4 Act 2 — Signals (라이트 변주 밴드).
 * Voice 매니페스토 + +32% stat + Clients. 카피 v3 그대로.
 * 흰색 기반 안의 소프트 밴드 변주.
 */
const CLIENTS = [
  "HYBE", "CJ ENM", "JYP", "MUSINSA", "COSRX", "innisfree",
  "moev", "oddtype", "8DIVISION", "OpenAI", "Anthropic", "Vercel",
];

export default function V4Proof() {
  return (
    <section
      style={{
        background: "var(--v4-band)",
        color: "var(--v4-ink)",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Voice + stat */}
        <div
          className="v4-proof-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.85fr)",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "end",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(2.1rem, 4.4vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.022em",
              }}
            >
              We don&apos;t recommend tools.<br />
              We architect <span style={{ color: "var(--v4-accent)" }}>what stays.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <div className="v4-stat" style={{ color: "var(--v4-accent)" }}>+32%</div>
              <p style={{ margin: "12px 0 0", color: "var(--v4-muted)", lineHeight: 1.6 }}>
                이상의 의사결정 비용 감소를 체험해보세요.<br />
                AI 리터러시적 사고를 기반으로 한 최적의 설계.
              </p>
            </div>
          </Reveal>
        </div>

        <hr className="v4-hr" style={{ margin: "clamp(52px, 7vw, 96px) 0" }} />

        {/* Clients */}
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <p className="v4-eyebrow">Brands we&apos;ve sat with</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>각자 다른 결, 같은 자세</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px, 2.2vw, 34px)",
              marginTop: 24,
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
              color: "var(--v4-ink)",
              opacity: 0.78,
            }}
          >
            {CLIENTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
