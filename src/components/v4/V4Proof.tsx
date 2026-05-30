/**
 * V4 Act 2 — Proof & Contact (다크 변주, 압축).
 * v3의 Voice + Clients + Contact + Footer를 한 마무리 act로 압축. 카피 v3 그대로.
 */
const CLIENTS = [
  "HYBE", "CJ ENM", "JYP", "MUSINSA", "COSRX", "innisfree",
  "moev", "oddtype", "8DIVISION", "OpenAI", "Anthropic", "Vercel",
];

export default function V4Proof() {
  const year = 2026;
  return (
    <section
      id="contact"
      style={{
        background: "var(--v4-midnight)",
        color: "var(--v4-on-midnight)",
        padding: "clamp(80px, 10vw, 148px) clamp(24px, 5vw, 56px) clamp(40px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Voice */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 0.9fr)",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "end",
          }}
          className="v4-proof-grid"
        >
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
            We architect <span style={{ color: "var(--v4-glow)" }}>what stays.</span>
          </h2>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              +32%
            </div>
            <p style={{ margin: "8px 0 0", color: "var(--v4-on-midnight-muted)" }}>
              이상의 의사결정 비용 감소를 체험해보세요.
            </p>
          </div>
        </div>

        <hr style={{ height: 1, background: "var(--v4-line-dark)", border: 0, margin: "clamp(48px, 7vw, 92px) 0" }} />

        {/* Clients */}
        <p className="v4-eyebrow" style={{ color: "var(--v4-on-midnight-muted)" }}>
          Brands we&apos;ve sat with · 각자 다른 결, 같은 자세
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(18px, 2.4vw, 36px)",
            marginTop: 22,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
            color: "var(--v4-on-midnight)",
            opacity: 0.82,
          }}
        >
          {CLIENTS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        <hr style={{ height: 1, background: "var(--v4-line-dark)", border: 0, margin: "clamp(48px, 7vw, 92px) 0" }} />

        {/* Contact CTA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "clamp(28px, 4vw, 64px)",
            alignItems: "center",
          }}
          className="v4-proof-grid"
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
              }}
            >
              Let&apos;s start<br />with coffee.
            </h2>
            <p style={{ margin: "16px 0 0", color: "var(--v4-on-midnight-muted)", fontSize: "1.05rem" }}>
              가벼운 커피챗으로, 해묵은 고민을 시원하게.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
            <a className="v4-btn v4-btn--onDark" href="mailto:contact@siriai.io">
              바로 스케줄 예약하기 <span className="v4-btn-dot" />
            </a>
            <a
              href="mailto:contact@siriai.io"
              style={{ color: "var(--v4-on-midnight-muted)", textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.02em" }}
            >
              contact@siriai.io
            </a>
          </div>
        </div>

        {/* slim footer */}
        <div
          style={{
            marginTop: "clamp(56px, 8vw, 104px)",
            paddingTop: 24,
            borderTop: "1px solid var(--v4-line-dark)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: "0.8rem",
            color: "var(--v4-on-midnight-muted)",
          }}
        >
          <span>© 2024 — {year} 주식회사 시리아이(SIRIAI). All Rights Reserved.</span>
          <span style={{ fontFamily: "var(--font-mark)", fontSize: "1.1rem", color: "var(--v4-on-midnight)" }}>Siriai</span>
        </div>
      </div>
    </section>
  );
}
