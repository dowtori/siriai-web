import Link from "next/link";

const STAGES = [
  { num: 1, name: "Mystic Hero", route: "/a1/h/stage-1" },
  { num: 2, name: "White Composition", route: "/a1/h/stage-2" },
  { num: 3, name: "Voice + Contact", route: "/a1/h/stage-3" },
];

const TRANSITIONS = [
  { id: "1-2", name: "Wash 1 → 2", route: "/a1/h/transition-12" },
];

const QUERY_FLAGS = [
  { q: "?debug=1", desc: "모션 디버그 패널 자동 노출 (⌘D / Ctrl+D 토글)" },
  { q: "?scroll=0.5", desc: "scrollProgress 강제 (0–1, Phase A1.3+ 의미 있음)" },
  { q: "?cursor=320,240", desc: "마우스 위치 강제 (Phase A1.2 cursor blob 의미 있음)" },
  { q: "?reduced=1", desc: "prefers-reduced-motion 시뮬레이션" },
  { q: "?seed=42", desc: "particle/random seed 고정 (Phase A1.2+)" },
];

export default function A1HarnessIndex() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        fontFamily: "var(--font-sans)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--a1-mute)",
            margin: 0,
          }}
        >
          A1 · Harness · Phase A1.1
        </p>
        <h1
          style={{
            marginTop: 24,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Stage isolation.
        </h1>
        <p
          style={{
            marginTop: 16,
            fontSize: 15,
            lineHeight: 1.85,
            color: "var(--a1-mute)",
            maxWidth: "48ch",
          }}
        >
          각 stage를 단독 렌더링하고, URL 쿼리로 상태를 강제할 수 있는 개발자 도구.
          운영 / 와는 분리된 noindex 라우트.
        </p>

        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              margin: 0,
            }}
          >
            Stages
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "20px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {STAGES.map((s) => (
              <li key={s.num}>
                <Link
                  href={s.route}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 24,
                    padding: "20px 0",
                    borderTop: "1px solid var(--a1-hairline)",
                    color: "var(--a1-ink)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--a1-mute)",
                      minWidth: 32,
                    }}
                  >
                    {String(s.num).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--a1-mute)",
                    }}
                  >
                    {s.route} →
                  </span>
                </Link>
              </li>
            ))}
            <li style={{ borderBottom: "1px solid var(--a1-hairline)" }} />
          </ul>
        </section>

        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              margin: 0,
            }}
          >
            Transitions
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "20px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {TRANSITIONS.map((t) => (
              <li key={t.id}>
                <Link
                  href={t.route}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 24,
                    padding: "20px 0",
                    borderTop: "1px solid var(--a1-hairline)",
                    color: "var(--a1-ink)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--a1-mute)",
                      minWidth: 32,
                    }}
                  >
                    {t.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--a1-mute)",
                    }}
                  >
                    {t.route} →
                  </span>
                </Link>
              </li>
            ))}
            <li style={{ borderBottom: "1px solid var(--a1-hairline)" }} />
          </ul>
        </section>

        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              margin: 0,
            }}
          >
            URL query flags
          </h2>
          <dl
            style={{
              margin: "20px 0 0",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 24,
              rowGap: 12,
              fontSize: 13,
              lineHeight: 1.75,
            }}
          >
            {QUERY_FLAGS.map((f) => (
              <div key={f.q} style={{ display: "contents" }}>
                <dt
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--a1-ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.q}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    color: "var(--a1-mute)",
                    wordBreak: "keep-all",
                  }}
                >
                  {f.desc}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--a1-mute)",
              margin: 0,
            }}
          >
            Routes
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "20px 0 0",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              lineHeight: 2,
              color: "var(--a1-mute)",
            }}
          >
            <li>
              <Link
                href="/a1"
                style={{ color: "var(--a1-ink)", textDecoration: "underline" }}
              >
                /a1
              </Link>
              {"  "}— 3 stage stack (full preview)
            </li>
            <li>
              <Link
                href="/a1?debug=1"
                style={{ color: "var(--a1-ink)", textDecoration: "underline" }}
              >
                /a1?debug=1
              </Link>
              {"  "}— motion debug panel open
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
