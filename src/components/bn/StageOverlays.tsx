"use client";

import { useEffect, useRef } from "react";
import { stageProgress, type ZJourneyHandle } from "./useZJourney";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const MARK = "var(--bn-mark), serif";
const MONO = "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

/**
 * Envelope helper:
 * progress ∈ [from, to] 구간에서 (inRatio · 1 · outRatio) 단계 fade envelope.
 * fadeIn 구간을 지나서 sustain 후 fadeOut. 결과 opacity ∈ [0, 1].
 */
function envelope(
  progress: number,
  from: number,
  to: number,
  inRatio = 0.22,
  outRatio = 0.22,
) {
  const lp = stageProgress(progress, from, to);
  const inT = clamp01(lp / inRatio);
  const outT = clamp01((lp - (1 - outRatio)) / outRatio);
  return inT * (1 - outT);
}

export default function StageOverlays({ handle }: { handle: ZJourneyHandle }) {
  // ── refs for every animated DOM node ─────────────────
  const s1WordRef = useRef<HTMLDivElement>(null);
  const s1CapRef = useRef<HTMLDivElement>(null);

  const s2HeadRef = useRef<HTMLDivElement>(null);
  const s2KrRef = useRef<HTMLDivElement>(null);
  const s2EyebrowRef = useRef<HTMLDivElement>(null);

  const s3HeadRef = useRef<HTMLDivElement>(null);
  const s3NodesRef = useRef<HTMLDivElement>(null);

  const s4HeadRef = useRef<HTMLDivElement>(null);
  const s4AxesRef = useRef<HTMLDivElement>(null);

  const s5HeadRef = useRef<HTMLDivElement>(null);
  const s5KrRef = useRef<HTMLDivElement>(null);

  const s6HeadRef = useRef<HTMLDivElement>(null);
  const s6CtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;

      // ╭─ Stage I — Hero (0.00 – 0.32) ────────────────────╮
      if (s1WordRef.current) {
        const lp = stageProgress(p, 0, 0.32);
        const scale = mix(1.0, 5.4, Math.pow(lp, 1.55));
        const opacity = lp < 0.55 ? 1 : 1 - clamp01((lp - 0.55) / 0.45);
        const letter = mix(-0.06, 0.14, lp);
        s1WordRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
        s1WordRef.current.style.opacity = String(opacity);
        s1WordRef.current.style.letterSpacing = `${letter}em`;
      }
      if (s1CapRef.current) {
        const op = envelope(p, 0.0, 0.32, 0.0, 0.22);
        s1CapRef.current.style.opacity = String(op);
      }

      // ╭─ Stage II — Stance (0.16 – 0.5) ──────────────────╮
      if (s2HeadRef.current) {
        const lp = stageProgress(p, 0.16, 0.5);
        const op = envelope(p, 0.16, 0.5, 0.22, 0.24);
        const scale = mix(0.82, 1.16, lp);
        s2HeadRef.current.style.opacity = String(op);
        s2HeadRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (s2KrRef.current) {
        const op = envelope(p, 0.16, 0.5, 0.35, 0.2);
        s2KrRef.current.style.opacity = String(op);
        const lp = stageProgress(p, 0.16, 0.5);
        s2KrRef.current.style.transform = `translate3d(0,${(1 - clamp01((lp - 0.3) / 0.4)) * 14}px,0)`;
      }
      if (s2EyebrowRef.current) {
        const op = envelope(p, 0.16, 0.5, 0.18, 0.25);
        s2EyebrowRef.current.style.opacity = String(op);
      }

      // ╭─ Stage III — System (0.32 – 0.68) ────────────────╮
      if (s3HeadRef.current) {
        const lp = stageProgress(p, 0.32, 0.68);
        const op = envelope(p, 0.32, 0.68, 0.22, 0.24);
        const scale = mix(0.86, 1.12, lp);
        s3HeadRef.current.style.opacity = String(op);
        s3HeadRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (s3NodesRef.current) {
        const op = envelope(p, 0.32, 0.68, 0.4, 0.22);
        s3NodesRef.current.style.opacity = String(op);
      }

      // ╭─ Stage IV — Methodology (0.5 – 0.84) ─────────────╮
      if (s4HeadRef.current) {
        const lp = stageProgress(p, 0.5, 0.84);
        const op = envelope(p, 0.5, 0.84, 0.22, 0.24);
        const scale = mix(0.86, 1.12, lp);
        s4HeadRef.current.style.opacity = String(op);
        s4HeadRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (s4AxesRef.current) {
        const op = envelope(p, 0.5, 0.84, 0.4, 0.22);
        s4AxesRef.current.style.opacity = String(op);
      }

      // ╭─ Stage V — Voice (0.68 – 0.94) ───────────────────╮
      if (s5HeadRef.current) {
        const lp = stageProgress(p, 0.68, 0.94);
        const op = envelope(p, 0.68, 0.94, 0.25, 0.18);
        const scale = mix(0.84, 1.14, lp);
        s5HeadRef.current.style.opacity = String(op);
        s5HeadRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (s5KrRef.current) {
        const op = envelope(p, 0.68, 0.94, 0.42, 0.18);
        s5KrRef.current.style.opacity = String(op);
      }

      // ╭─ Stage VI — Contact (0.84 – 1.0) ─────────────────╮
      if (s6HeadRef.current) {
        const lp = stageProgress(p, 0.84, 1.0);
        const op = envelope(p, 0.84, 1.0, 0.3, 0.0);
        const scale = mix(0.85, 1.06, lp);
        s6HeadRef.current.style.opacity = String(op);
        s6HeadRef.current.style.transform = `translate3d(0,0,0) scale(${scale})`;
      }
      if (s6CtaRef.current) {
        const op = envelope(p, 0.84, 1.0, 0.55, 0.0);
        s6CtaRef.current.style.opacity = String(op);
        s6CtaRef.current.style.pointerEvents = op > 0.6 ? "auto" : "none";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle]);

  // shared style helpers
  const eyebrow: React.CSSProperties = {
    fontFamily: MONO,
    fontWeight: 400,
    fontSize: "10.5px",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "var(--bn-ink-faint)",
  };
  const captionMono: React.CSSProperties = {
    fontFamily: MONO,
    fontWeight: 400,
    fontSize: "11px",
    color: "var(--bn-ink-muted)",
    letterSpacing: "0.18em",
  };

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage I — Hero · §00                             ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s1WordRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <span
          style={{
            fontFamily: MARK,
            fontWeight: 900,
            fontSize: "clamp(5rem, 19vw, 24rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.06em",
            color: "var(--bn-ink)",
            textShadow:
              "0 0 60px rgba(184,145,106,0.18), 0 0 120px rgba(184,145,106,0.08)",
          }}
        >
          Siriai
        </span>
      </div>

      <div
        ref={s1CapRef}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        {/* §00 Hero claim — centered bottom block */}
        <div className="absolute inset-x-0 bottom-[17%] flex flex-col items-center gap-3.5 px-6">
          <span
            className="block h-px w-10"
            style={{ background: "var(--bn-accent)" }}
          />
          <span
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.4vw, 22px)",
              lineHeight: 1.35,
              color: "var(--bn-ink)",
              letterSpacing: "0.005em",
              textAlign: "center",
            }}
          >
            Architecture for
            <br />
            Insight with AI.
          </span>
          <span
            style={{
              fontFamily: PRETENDARD,
              fontWeight: 400,
              fontSize: "13px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.005em",
              wordBreak: "keep-all",
              textAlign: "center",
              maxWidth: "30ch",
            }}
          >
            AI로 사고하는 구조를 설계합니다.
          </span>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage II — Stance · §01                          ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s2EyebrowRef}
        className="absolute top-[26%] left-1/2 -translate-x-1/2 will-change-transform"
      >
        <span style={eyebrow}>01 — Stance</span>
      </div>

      <div
        ref={s2HeadRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <h2
          style={{
            fontFamily: MARK,
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 8.4vw, 8.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--bn-ink)",
            textAlign: "center",
            textShadow: "0 0 60px rgba(10,9,8,0.65)",
          }}
        >
          Tools change.
          <br />
          Structure remains.
          <br />
          We design it.
        </h2>
      </div>

      <div
        ref={s2KrRef}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 will-change-transform max-w-[680px] px-6 text-center"
      >
        <div
          className="space-y-2.5"
          style={{
            fontFamily: PRETENDARD,
            fontSize: "15px",
            lineHeight: 1.95,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          <p>AI 도구는 매일 새롭게 등장합니다.</p>
          <p>필요한 건 창의성과 결합.</p>
          <p style={{ color: "var(--bn-ink)" }}>
            시리아이는 그 구조를 설계합니다.
          </p>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage III — System · §03 (4-node decision flow) ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s3HeadRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>02 — System</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2
            style={{
              fontFamily: MARK,
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 7.6vw, 7.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bn-ink)",
              textShadow: "0 0 60px rgba(10,9,8,0.65)",
            }}
          >
            Decision flow.
            <br />
            Made visible.
          </h2>
          <p
            className="mt-6"
            style={{
              fontFamily: PRETENDARD,
              fontSize: "14px",
              color: "var(--bn-ink-muted)",
              letterSpacing: "0.005em",
              wordBreak: "keep-all",
            }}
          >
            판단의 흐름을, 보이게.
          </p>
        </div>
      </div>

      <div
        ref={s3NodesRef}
        className="absolute bottom-[19%] left-1/2 -translate-x-1/2 will-change-transform flex items-center gap-4 px-6"
      >
        {["Signal", "Judgment", "Action", "Record"].map((n, i) => (
          <div key={n} className="flex items-center gap-4">
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: i === 0 ? "var(--bn-accent)" : "var(--bn-ink-muted)",
              }}
            >
              {n}
            </span>
            {i < 3 && (
              <span style={{ color: "var(--bn-ink-faint)", fontFamily: MONO }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage IV — Methodology · §02 (3 axes)            ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s4HeadRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>03 — Methodology</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2
            style={{
              fontFamily: MARK,
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 7.6vw, 7.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bn-ink)",
              textShadow: "0 0 60px rgba(10,9,8,0.65)",
            }}
          >
            Three ways in.
            <br />
            One place to begin.
          </h2>
          <p
            className="mt-6"
            style={{
              fontFamily: PRETENDARD,
              fontSize: "14px",
              color: "var(--bn-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            세 갈래로 들어가, 한 자리에서 시작합니다.
          </p>
        </div>
      </div>

      <div
        ref={s4AxesRef}
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 will-change-transform grid grid-cols-3 gap-x-12 gap-y-1 px-6 text-center max-w-[720px]"
      >
        {[
          { num: "01", title: "Architecture", kr: "의사결정의 구조." },
          { num: "02", title: "Literacy", kr: "AI로 사고하는 법." },
          { num: "03", title: "Mapping", kr: "진짜 문제의 결." },
        ].map((a) => (
          <div key={a.title} className="flex flex-col items-center gap-1.5">
            <span style={{ ...captionMono, fontSize: "10px", color: "var(--bn-accent)" }}>
              {a.num}
            </span>
            <span
              style={{
                fontFamily: MARK,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "17px",
                color: "var(--bn-ink)",
                letterSpacing: "0.005em",
              }}
            >
              {a.title}
            </span>
            <span
              style={{
                fontFamily: PRETENDARD,
                fontWeight: 400,
                fontSize: "12px",
                color: "var(--bn-ink-muted)",
                letterSpacing: "0.005em",
                wordBreak: "keep-all",
              }}
            >
              {a.kr}
            </span>
          </div>
        ))}
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage V — Voice · §05                            ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s5HeadRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="text-center px-6">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>04 — Voice</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2
            style={{
              fontFamily: MARK,
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 7vw, 6.8rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--bn-ink)",
              textShadow: "0 0 60px rgba(10,9,8,0.65)",
              maxWidth: "22ch",
              margin: "0 auto",
            }}
          >
            We don&apos;t recommend tools.
            <br />
            We architect what stays.
          </h2>
        </div>
      </div>

      <div
        ref={s5KrRef}
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 will-change-transform max-w-[600px] px-6 text-center"
      >
        <p
          style={{
            fontFamily: PRETENDARD,
            fontSize: "15px",
            lineHeight: 2.0,
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          도구로서의 AI 접근을 넘어
          <br />
          니즈를 정확히 이해하고{" "}
          <span style={{ color: "var(--bn-ink)", fontWeight: 600 }}>
            &lsquo;사람&rsquo;
          </span>
          을 돕습니다.
        </p>
        <p
          className="mt-5"
          style={{
            fontFamily: MARK,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "13px",
            color: "var(--bn-accent)",
            letterSpacing: "0.04em",
          }}
        >
          — Siriai Manifesto, MMXXVI
        </p>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage VI — Contact · §06                         ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s6HeadRef}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="text-center px-6">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>05 — Contact</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2
            style={{
              fontFamily: MARK,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 8vw, 8rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--bn-ink)",
              textShadow: "0 0 60px rgba(10,9,8,0.65)",
            }}
          >
            Let&apos;s start
            <br />
            with coffee.
          </h2>
          <p
            className="mt-7"
            style={{
              fontFamily: PRETENDARD,
              fontWeight: 400,
              fontSize: "15px",
              color: "var(--bn-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            가벼운 커피챗으로, 해묵은 고민을 시원하게.
          </p>
        </div>
      </div>

      <div
        ref={s6CtaRef}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 will-change-transform flex flex-col items-center gap-3"
        style={{ pointerEvents: "none" }}
      >
        <a
          href="/contact"
          className="group inline-flex items-center gap-3 border px-7 py-3 transition-colors"
          style={{
            borderColor: "var(--bn-accent)",
            color: "var(--bn-ink)",
            fontFamily: MARK,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "15px",
            letterSpacing: "0.02em",
            background: "rgba(184,145,106,0.05)",
          }}
        >
          Send a note
          <span aria-hidden style={{ fontFamily: MONO }}>
            →
          </span>
        </a>
        <span style={{ ...captionMono, fontSize: "10.5px" }}>
          contact@siriai.io
        </span>
      </div>
    </div>
  );
}
