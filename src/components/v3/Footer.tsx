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
      <div className="mx-auto max-w-screen-xl px-6 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
        {/* (a) Manifesto — 한·영 페어링 */}
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
            도구가 아닌 비전을 제시합니다.
          </p>
        </div>

        {/* (b) Wordmark — 풀폭 serif brand anchor */}
        <div className="mt-24 md:mt-32" aria-hidden>
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-mark)",
              fontWeight: 900,
              fontSize: "clamp(5.5rem, 19vw, 16rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "var(--fg-on-inverse)",
            }}
          >
            Siriai
          </p>
        </div>

        {/* (c) © + contact — 작은 마감 */}
        <div className="mt-10 flex flex-col items-center gap-2 md:mt-12 md:flex-row md:justify-between">
          <p
            className="text-[11px] tracking-[0.12em]"
            style={{ color: "var(--fg-on-inverse-muted)", wordBreak: "keep-all" }}
          >
            © 2024 — {year} 주식회사 시리아이(SIRIAI). All Rights Reserved.
          </p>
          <p
            className="text-[11px] tracking-[0.12em]"
            style={{ color: "var(--fg-on-inverse-muted)" }}
          >
            contact@siriai.io
          </p>
        </div>
      </div>
    </footer>
  );
}
