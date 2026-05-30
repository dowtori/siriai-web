/**
 * V4 Act 1 — Practice (흰색 기반, 압축).
 * v3의 Stance + Methodology + System을 한 화면 밀도로 압축. 카피 v3 그대로.
 */
const STANCE_BULLETS = [
  "AI 도구는 매일 새롭게 등장합니다.",
  "필요한 건 도구가 아니라 창의성과 결합된 구조.",
  "시리아이는 그 구조를 설계합니다.",
];

const PILLARS = [
  { n: "01", t: "Architecture", d: "의사결정의 구조를 설계합니다." },
  { n: "02", t: "Literacy", d: "조직이 AI로 사고하는 법을 익힙니다." },
  { n: "03", t: "Mapping", d: "무엇이 진짜 문제인지 함께 그립니다." },
];

const FLOW = ["Signal", "Judgment", "Action", "Record"];

export default function V4Practice() {
  return (
    <section
      style={{
        background: "var(--v4-paper)",
        color: "var(--v4-ink)",
        padding: "clamp(72px, 9vw, 132px) clamp(24px, 5vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Stance */}
        <p className="v4-eyebrow">01 — Practice</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: "clamp(28px, 5vw, 72px)",
            marginTop: 24,
            alignItems: "start",
          }}
          className="v4-practice-grid"
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Tools change.<br />Structure remains.<br />
            <span style={{ color: "var(--v4-accent)" }}>We design it.</span>
          </h2>
          <ul className="v4-bullets" style={{ display: "grid", gap: 14, fontSize: "1.02rem", color: "var(--v4-muted)", paddingTop: 8 }}>
            {STANCE_BULLETS.map((b) => (
              <li key={b} className="v4-bullet">{b}</li>
            ))}
          </ul>
        </div>

        <hr className="v4-hr" style={{ margin: "clamp(48px, 7vw, 96px) 0" }} />

        {/* Methodology */}
        <p className="v4-eyebrow">02 — Three ways in. One place to begin.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(24px, 3vw, 44px)",
            marginTop: 32,
          }}
          className="v4-pillar-grid"
        >
          {PILLARS.map((p) => (
            <div key={p.t} style={{ borderTop: "1px solid var(--v4-line-strong)", paddingTop: 20 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>{p.n}</span>
              <h3
                style={{
                  margin: "10px 0 8px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.t}
              </h3>
              <p style={{ margin: 0, color: "var(--v4-muted)", lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </div>

        <hr className="v4-hr" style={{ margin: "clamp(48px, 7vw, 96px) 0" }} />

        {/* System — decision flow, 압축 */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 24 }}>
          <p className="v4-eyebrow">03 — Decision flow. Made visible.</p>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>판단의 흐름을, 보이게</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 1.5vw, 20px)",
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          {FLOW.map((step, idx) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 20px)" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {step}
              </span>
              {idx < FLOW.length - 1 && (
                <span aria-hidden style={{ color: "var(--v4-faint)", fontSize: "1.2rem" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
