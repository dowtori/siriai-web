"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const valid = form.name.trim() && form.email.trim() && agreed;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") return <ReceivedBlock />;

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <Field
        label="이름"
        required
        value={form.name}
        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
      />
      <Field
        label="회사 / 소속"
        value={form.company}
        onChange={(v) => setForm((f) => ({ ...f, company: v }))}
      />
      <Field
        label="이메일"
        type="email"
        required
        value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
      />

      <div>
        <label
          htmlFor="contact-msg"
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--fg-muted)" }}
        >
          메시지 (선택)
        </label>
        <textarea
          id="contact-msg"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          maxLength={500}
          placeholder="어떤 대화를 시작하고 싶으신가요? 한두 문장이면 충분합니다."
          className="mt-2 w-full resize-none border-b bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-[color:var(--fg-default)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] placeholder:text-[color:var(--fg-muted)]"
          style={{
            borderColor: "var(--line-strong)",
            color: "var(--fg-default)",
            fontFamily: "var(--font-sans)",
          }}
        />
      </div>

      <label
        className="flex cursor-pointer items-start gap-3"
        style={{
          fontSize: "0.8125rem",
          color: "var(--fg-muted)",
          lineHeight: 1.7,
        }}
      >
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--accent)]"
          style={{
            borderColor: agreed ? "var(--fg-default)" : "var(--line-strong)",
            backgroundColor: agreed ? "var(--fg-default)" : "transparent",
          }}
        >
          {agreed && (
            <svg
              viewBox="0 0 12 12"
              width={10}
              height={10}
              fill="none"
              stroke="var(--surface-base)"
              strokeWidth={2}
            >
              <path d="M2 6 L5 9 L10 3" />
            </svg>
          )}
        </span>
        사전 미팅 안내를 위한 개인정보 수집·이용에 동의합니다.
      </label>

      <button
        type="submit"
        disabled={!valid || status === "loading"}
        className="group mt-4 flex items-center gap-4 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.125rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--fg-default)",
        }}
      >
        <span>
          {status === "loading"
            ? "전송 중..."
            : "메모 보내기 / Send a note"}
        </span>
        <span
          aria-hidden
          className="transition-transform group-enabled:group-hover:translate-x-1"
          style={{ fontWeight: 500 }}
        >
          →
        </span>
      </button>

      {status === "error" && (
        <p
          className="text-[12px]"
          style={{ color: "#a44343", lineHeight: 1.6 }}
        >
          전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: "text" | "email";
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        className="text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
        {required && (
          <span style={{ marginLeft: 6, color: "var(--accent)" }}>*</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-[color:var(--fg-default)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
        style={{
          borderColor: "var(--line-strong)",
          color: "var(--fg-default)",
          fontFamily: "var(--font-sans)",
        }}
      />
    </div>
  );
}

function ReceivedBlock() {
  return (
    <div
      className="border p-10 text-center"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <p
        className="text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "var(--fg-muted)" }}
      >
        Received
      </p>
      <p
        className="mt-5"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
        }}
      >
        메시지가 도착했습니다.
      </p>
      <p
        className="mt-4 text-sm"
        style={{
          color: "var(--fg-muted)",
          wordBreak: "keep-all",
          lineHeight: 1.7,
        }}
      >
        24시간 안에 답신 드립니다.
      </p>
      <p
        className="mt-3 text-sm"
        style={{
          color: "var(--fg-muted)",
          wordBreak: "keep-all",
          lineHeight: 1.7,
        }}
      >
        알아가는 것부터 시작합니다.
      </p>
    </div>
  );
}
