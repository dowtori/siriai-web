"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const MODES = ["Studio", "Advisory", "Literacy", "미정"];

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    interest: "미정",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    try {
      const m = sessionStorage.getItem("siriai-mode");
      if (m && MODES.includes(m)) {
        setForm((f) => ({ ...f, interest: m }));
        sessionStorage.removeItem("siriai-mode");
      }
    } catch {
      /* noop */
    }
  }, []);

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

  return (
    <section
      id="contact"
      ref={ref}
      style={{ backgroundColor: "var(--surface-base)", color: "var(--fg-default)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
          {/* Left: header */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--fg-muted)" }}
            >
              06 — Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="mt-8 tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                fontWeight: 500,
                lineHeight: 1.08,
              }}
            >
              Start with
              <br />a diagnosis.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
              className="mt-7"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.85,
                color: "var(--fg-muted)",
                wordBreak: "keep-all",
                maxWidth: "32ch",
              }}
            >
              진단 통화로 시작합니다. 현재 운영의 구조를 함께 살펴보고, 어디부터 손대야 할지 한 페이지로 정리해 드립니다.
            </motion.p>
          </div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
            onSubmit={onSubmit}
            className="md:col-span-6 md:col-start-7"
            noValidate
          >
            {status === "ok" ? (
              <ReceivedBlock />
            ) : (
              <div className="space-y-7">
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

                {/* Interest mode */}
                <div>
                  <span
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    Interest
                  </span>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                    {MODES.map((m) => {
                      const checked = form.interest === m;
                      return (
                        <label
                          key={m}
                          className="flex cursor-pointer items-center gap-2"
                          style={{ fontSize: "0.9375rem" }}
                        >
                          <input
                            type="radio"
                            name="interest"
                            value={m}
                            checked={checked}
                            onChange={() => setForm((f) => ({ ...f, interest: m }))}
                            className="sr-only"
                          />
                          <span
                            className="inline-flex h-4 w-4 items-center justify-center rounded-full border transition-colors"
                            style={{
                              borderColor: checked
                                ? "var(--fg-default)"
                                : "var(--line-strong)",
                            }}
                          >
                            <span
                              className="block rounded-full transition-all"
                              style={{
                                width: checked ? 8 : 0,
                                height: checked ? 8 : 0,
                                background: "var(--fg-default)",
                              }}
                            />
                          </span>
                          {m}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="v3-msg"
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    메시지 (선택)
                  </label>
                  <textarea
                    id="v3-msg"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    maxLength={500}
                    className="mt-2 w-full resize-none border-b bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-[color:var(--fg-default)]"
                    style={{
                      borderColor: "var(--line-strong)",
                      color: "var(--fg-default)",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>

                {/* Agreement */}
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
                    className="sr-only"
                  />
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center border transition-colors"
                    style={{
                      borderColor: agreed
                        ? "var(--fg-default)"
                        : "var(--line-strong)",
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
                  진단 통화 응대 목적의 개인정보 수집·이용에 동의합니다.
                </label>

                {/* Submit */}
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
                      : "진단 통화 신청 / Start a diagnosis"}
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
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
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
        className="mt-2 w-full border-b bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-[color:var(--fg-default)]"
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
        진단 통화 신청이 접수되었습니다.
      </p>
      <p
        className="mt-4 text-sm"
        style={{ color: "var(--fg-muted)", wordBreak: "keep-all", lineHeight: 1.7 }}
      >
        24시간 안에 이메일로 일정 옵션을 보내드립니다.
      </p>
    </div>
  );
}
