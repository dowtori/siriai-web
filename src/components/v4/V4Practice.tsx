import Reveal from "./Reveal";

/**
 * V4 Act 1 — Practice (흰색 기반, 압축).
 * Stance + Methodology(소프트 틴트 카드) + System. 카피 v3 그대로.
 * 디자인 언어: 밝은 바디·틴트 카드·부드러운 reveal (SIRIAI 원본 적용).
 */
const STANCE_BULLETS = [
  "AI 도구는 매일 새롭게 등장합니다.",
  "필요한 건 도구가 아니라 창의성과 결합된 구조.",
  "시리아이는 그 구조를 설계합니다.",
];

const PILLARS = [
  { n: "01", t: "Architecture", d: "의사결정의 구조를 설계합니다.", tint: "v4-card--cool" },
  { n: "02", t: "Literacy", d: "조직이 AI로 사고하는 법을 익힙니다.", tint: "v4-card--sand" },
  { n: "03", t: "Mapping", d: "무엇이 진짜 문제인지 함께 그립니다.", tint: "v4-card--sage" },
];

const FLOW = ["Signal", "Judgment", "Action", "Record"];

export default function V4Practice() {
  return (
    <section
      style={{
        background: "var(--v4-paper)",
        color: "var(--v4-ink)",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Stance */}
        <Reveal>
          <p className="v4-eyebrow">01 — Practice</p>
        </Reveal>
        <div
          className="v4-practice-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: "clamp(28px, 5vw, 72px)",
            marginTop: 24,
            alignItems: "start",
          }}
        >
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="v4-bullets" style={{ display: "grid", gap: 14, fontSize: "1.02rem", color: "var(--v4-muted)", paddingTop: 8 }}>
              {STANCE_BULLETS.map((b) => (
                <li key={b} className="v4-bullet">{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <hr className="v4-hr" style={{ margin: "clamp(52px, 7vw, 100px) 0" }} />

        {/* Methodology — 소프트 틴트 카드 */}
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <p className="v4-eyebrow">02 — Three ways in. One place to begin.</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>세 갈래로 들어가, 한 자리에서 시작합니다</span>
          </div>
        </Reveal>
        <div
          className="v4-pillar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(16px, 1.8vw, 24px)",
            marginTop: 32,
          }}
        >
          {PILLARS.map((p, idx) => (
            <Reveal key={p.t} delay={idx * 0.08}>
              <div className={`v4-card ${p.tint}`} style={{ height: "100%" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>{p.n}</span>
                <h3
                  style={{
                    margin: "14px 0 10px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "1.45rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.t}
                </h3>
                <p style={{ margin: 0, color: "var(--v4-muted)", lineHeight: 1.6 }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <hr className="v4-hr" style={{ margin: "clamp(52px, 7vw, 100px) 0" }} />

        {/* System — decision flow, 압축 */}
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 24 }}>
            <p className="v4-eyebrow">03 — Decision flow. Made visible.</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--v4-faint)" }}>판단의 흐름을, 보이게</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
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
        </Reveal>
      </div>
    </section>
  );
}
