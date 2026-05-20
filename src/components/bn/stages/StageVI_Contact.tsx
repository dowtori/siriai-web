"use client";

/**
 * Stage VI — Contact
 * Artifact: inline mini form (Send a signal).
 * Mechanic: name · email · message 3 field. /api/contact POST.
 *           submit 시 pending → success state. 성공 후 quiet acknowledgment.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  applyStageTransform,
  clamp01,
  localProgress,
  MARK,
  MONO,
  PRETENDARD,
} from "../shared/stageMath";
import type { StageProps } from "./StageI_Hero";

type SubmitState = "idle" | "pending" | "success" | "error";

export default function StageVI_Contact({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);

      const setFade = (el: HTMLElement | null, delay: number) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.2);
        el.style.opacity = String(opIn);
      };
      setFade(eyebrowRef.current, 0.0);
      setFade(headRef.current, 0.15);
      setFade(subRef.current, 0.32);
      setFade(formRef.current, 0.48);
      if (formRef.current) {
        formRef.current.style.pointerEvents = lp > 0.55 ? "auto" : "none";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle, from, to]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      company: "",
    };
    if (!payload.name || !payload.email || !payload.message) {
      setErrorMsg("이름·이메일·메시지를 모두 채워주세요.");
      return;
    }
    setState("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        setErrorMsg(data?.error || "전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setErrorMsg("네트워크 오류. 잠시 후 다시 시도해주세요.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 0 10px",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(232,234,238,0.18)",
    color: "var(--bn-ink)",
    fontFamily: PRETENDARD,
    fontSize: "15px",
    outline: "none",
    transition: "border-color 200ms ease",
  };

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 grid place-items-center will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col items-center gap-8 px-6 text-center w-full max-w-[520px]">
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: "10.5px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--bn-ink-faint)",
            }}
          >
            05 — Contact
          </span>
        </div>

        <h2
          ref={headRef}
          style={{
            opacity: 0,
            fontFamily: MARK,
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 7.4vw, 6.8rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.045em",
            color: "var(--bn-ink)",
            textShadow: "0 0 60px rgba(8,9,11,0.6)",
          }}
        >
          Begin a diagnosis.
        </h2>

        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontWeight: 400,
            fontSize: "14px",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          사고의 매핑부터.
        </p>

        <div
          ref={formRef}
          className="w-full"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          {state === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <span
                style={{
                  fontFamily: MARK,
                  fontWeight: 500,
                  fontSize: "22px",
                  color: "var(--bn-ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                Signal received.
              </span>
              <span
                style={{
                  fontFamily: PRETENDARD,
                  fontSize: "13px",
                  color: "var(--bn-ink-muted)",
                  wordBreak: "keep-all",
                }}
              >
                매핑을 시작합니다. 영업일 기준 2일 안에 회신드립니다.
              </span>
              <span
                className="mt-3"
                style={{
                  fontFamily: MONO,
                  fontSize: "10.5px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--bn-accent)",
                }}
              >
                contact@siriai.io
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full text-left"
              noValidate
            >
              <input
                type="text"
                name="name"
                placeholder="이름"
                autoComplete="name"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--bn-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor =
                    "rgba(232,234,238,0.18)";
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="이메일"
                autoComplete="email"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--bn-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor =
                    "rgba(232,234,238,0.18)";
                }}
              />
              <textarea
                name="message"
                placeholder="현재 가장 풀고 싶은 한 문장."
                rows={3}
                required
                style={{
                  ...inputStyle,
                  resize: "none",
                  fontFamily: PRETENDARD,
                  lineHeight: 1.6,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--bn-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor =
                    "rgba(232,234,238,0.18)";
                }}
              />
              {errorMsg && (
                <span
                  style={{
                    fontFamily: PRETENDARD,
                    fontSize: "12px",
                    color: "#E89A8A",
                  }}
                >
                  {errorMsg}
                </span>
              )}
              <div className="flex items-center justify-between pt-2">
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 400,
                    fontSize: "10.5px",
                    letterSpacing: "0.18em",
                    color: "var(--bn-ink-faint)",
                  }}
                >
                  contact@siriai.io
                </span>
                <button
                  type="submit"
                  disabled={state === "pending"}
                  className="inline-flex items-center gap-3 border px-7 py-3 transition-colors disabled:opacity-50"
                  style={{
                    borderColor: "var(--bn-accent)",
                    color: "var(--bn-ink)",
                    fontFamily: MONO,
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: "rgba(159,179,200,0.05)",
                  }}
                >
                  {state === "pending" ? "Sending…" : "Send Signal"}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
