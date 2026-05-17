export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--surface-inverse)",
        color: "var(--fg-on-inverse)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 md:py-32">
        {/* (a) Manifesto echo */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              maxWidth: "32ch",
            }}
          >
            We don&apos;t recommend tools. We architect what stays.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--fg-on-inverse-muted)",
              wordBreak: "keep-all",
              maxWidth: "32ch",
            }}
          >
            도구는 권하지 않습니다. 변하지 않는 것을 설계합니다.
          </p>
        </div>

        <div
          className="my-16 h-px"
          style={{ backgroundColor: "var(--line-on-inverse-strong)" }}
          aria-hidden
        />

        {/* (c) Mini about — 클루 보강 */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16">
          <div
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.85,
              wordBreak: "keep-all",
            }}
          >
            AI 도입을 고민하는 조직과,
            <br />
            의사결정의 구조부터 설계합니다.
            <br />
            운영 모델 · 정기 자문 · 사내 리터러시 — 세 갈래.
            <br />
            서울에서, 2024년부터.
          </div>
          <div
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.85,
              color: "var(--fg-on-inverse-muted)",
            }}
          >
            For organizations bringing AI into their work,
            <br />
            we design the structures behind their decisions.
            <br />
            Operating model · Advisory · Literacy — three modes.
            <br />
            From Seoul, since 2024.
          </div>
        </div>

        <div
          className="my-16 h-px"
          style={{ backgroundColor: "var(--line-on-inverse)" }}
          aria-hidden
        />

        {/* (d) Contact + copyright */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-on-inverse-muted)" }}
          >
            contact@siriai.io · Seoul, KR
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-on-inverse-muted)" }}
          >
            © {year} Siriai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
