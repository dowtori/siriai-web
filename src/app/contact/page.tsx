import type { Metadata } from "next";
import Navigation from "@/components/v3/Navigation";
import ContactForm from "@/components/v3/ContactForm";
import CalInlineEmbed from "@/components/v3/CalInlineEmbed";

export const metadata: Metadata = {
  title: "Contact — Siriai",
  description:
    "사전 미팅으로 시작합니다. 현재 운영 구조를 함께 점검하고, 우선순위를 정리해 드립니다.",
};

const FAQ = [
  {
    q: "사전 미팅은 어떻게 진행되나요?",
    a: "약 30분 화상 미팅입니다. 현재 운영 구조의 주요 마찰 지점을 함께 점검하고, 우선순위를 한 페이지로 정리해 드립니다.",
  },
  {
    q: "어떤 정보를 미리 준비해야 하나요?",
    a: "회사·역할·현재 AI 도입 단계 정도만 알려주시면 충분합니다. 미팅 전후로 추가 자료를 요청드리지 않습니다.",
  },
  {
    q: "이후 작업으로 이어지지 않아도 되나요?",
    a: "물론입니다. 사전 미팅 한 번으로 끝나도 부담 없이 마무리됩니다.",
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
              maxWidth: "40ch",
            }}
          >
            사전 미팅으로 시작합니다. 현재 운영 구조를 함께 점검하고, 우선순위를 한 페이지로 정리해 드립니다. 메모만 남기셔도 좋고, 아래에서 직접 시간을 정하셔도 됩니다.
          </p>
        </section>

        {/* Form + FAQ */}
        <section className="mx-auto max-w-screen-xl px-6 pb-28 md:px-10 md:pb-32">
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

        {/* Schedule — Cal embed */}
        <section
          id="schedule"
          className="border-t mx-auto max-w-screen-xl scroll-mt-24 px-6 pb-32 pt-20 md:px-10 md:pb-40 md:pt-28"
          style={{ borderColor: "var(--line-default)" }}
        >
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
            <div className="md:col-span-4">
              <p
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--fg-muted)" }}
              >
                Schedule
              </p>
              <h2
                className="mt-6 tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                시간을 직접 정합니다.
              </h2>
              <p
                className="mt-6"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.85,
                  color: "var(--fg-muted)",
                  wordBreak: "keep-all",
                  maxWidth: "32ch",
                }}
              >
                비어있는 시간을 직접 선택해 사전 미팅을 정합니다. 약 30분 화상 미팅.
              </p>
            </div>

            <div className="md:col-span-8">
              <CalInlineEmbed />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
