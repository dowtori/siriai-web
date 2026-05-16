import type { Metadata } from "next";
import Navigation from "@/components/v3/Navigation";
import ContactForm from "@/components/v3/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Siriai",
  description:
    "진단 통화로 시작합니다. 현재 운영 구조를 함께 점검하고, 우선순위를 정리해 드립니다.",
};

const FAQ = [
  {
    q: "진단 통화는 어떻게 진행되나요?",
    a: "약 30분 화상 통화입니다. 현재 운영 구조의 주요 마찰 지점을 함께 점검하고, 우선순위를 한 페이지로 정리해 드립니다.",
  },
  {
    q: "어떤 정보를 미리 준비해야 하나요?",
    a: "회사·역할·현재 AI 도입 단계 정도만 알려주시면 충분합니다. 통화 전후로 추가 자료 제출을 요청드리지 않습니다.",
  },
  {
    q: "이후 작업으로 이어지지 않아도 되나요?",
    a: "물론입니다. 진단 통화 한 번으로 끝나도 부담 없이 마무리됩니다.",
  },
];

export default function ContactPage() {
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
        {/* Header */}
        <section className="mx-auto max-w-screen-xl px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
          <p
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-muted)" }}
          >
            Contact
          </p>
          <h1
            className="mt-6 tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              maxWidth: "20ch",
            }}
          >
            Start with
            <br />a diagnosis.
          </h1>
          <p
            className="mt-8"
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
              lineHeight: 1.8,
              color: "var(--fg-muted)",
              wordBreak: "keep-all",
              maxWidth: "36ch",
            }}
          >
            진단 통화로 시작합니다. 현재 운영 구조를 함께 점검하고, 우선순위를 한 페이지로 정리해 드립니다.
          </p>
        </section>

        {/* Form + FAQ */}
        <section className="mx-auto max-w-screen-xl px-6 pb-32 md:px-10 md:pb-40">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
            <div className="md:col-span-7">
              <ContactForm />
            </div>

            <aside
              className="md:col-span-4 md:col-start-9 md:border-l md:pl-8"
              style={{ borderColor: "var(--line-default)" }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--fg-muted)" }}
              >
                Frequently asked
              </p>
              <ul className="mt-8 space-y-10">
                {FAQ.map((item, i) => (
                  <li key={i}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        letterSpacing: "-0.005em",
                        wordBreak: "keep-all",
                      }}
                    >
                      {item.q}
                    </p>
                    <p
                      className="mt-3"
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.75,
                        color: "var(--fg-muted)",
                        wordBreak: "keep-all",
                      }}
                    >
                      {item.a}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
