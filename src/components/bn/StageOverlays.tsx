"use client";

import { useEffect, useRef } from "react";
import { type ZJourneyHandle } from "./useZJourney";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const MARK = "var(--bn-mark), serif";
const MONO = "var(--bn-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

/**
 * stageOpacity:
 *   progress ∈ [from, to] 구간 외에서는 0.
 *   stage 진입/이탈 시 fadeRatio 비율로 부드러운 envelope.
 */
function stageOpacity(p: number, from: number, to: number, fadeRatio = 0.18) {
  if (p <= from || p >= to) return 0;
  const lp = (p - from) / (to - from);
  return clamp01(lp / fadeRatio) * clamp01((1 - lp) / fadeRatio);
}

/**
 * stageZ:
 *   stage가 z축 진입에 따라 멀리서 다가와 → 활성에서 z=0 → 이탈 시 카메라 뒤로.
 *   stage 범위 + 양옆 ext만큼 z motion 전개. progress 외부에서는 ±zRange로 클램프.
 */
function stageZ(p: number, from: number, to: number, zRange = 480, ext = 0.05) {
  const inFrom = from - ext;
  const outTo = to + ext;
  if (p < inFrom) return -zRange;
  if (p > outTo) return zRange;
  const lp = (p - inFrom) / (outTo - inFrom); // 0..1 over extended range
  return (lp - 0.5) * 2 * zRange;
}

/** Word stagger 계산 — stage 활성 진입에 따라 단어별 opacity·translateY 갱신. */
function wordOpacityY(
  p: number,
  from: number,
  to: number,
  wordIdx: number,
  wordCount: number,
  fadeRatio = 0.18,
) {
  if (p <= from || p >= to) {
    // stage 밖이면 ‘아직 안 들어옴’ 상태로 — 단 from 이전엔 위에 숨겨두고, to 이후엔 그냥 fade-out된 상태
    if (p <= from) return { op: 0, y: 18 };
    return { op: 0, y: -12 };
  }
  const lp = (p - from) / (to - from);
  // 진입(0→fadeRatio) 동안 단어별 stagger.
  // 단어 i는 lp_offset = lp - i * (fadeRatio / wordCount) 시점에 진입.
  const perWord = (fadeRatio * 0.7) / Math.max(1, wordCount); // 0.7 leaves trailing breath
  const lpWord = clamp01((lp - wordIdx * perWord) / (fadeRatio - wordIdx * perWord || fadeRatio));
  // sustain 후 fade out
  const outRatio = fadeRatio;
  const outT = clamp01((lp - (1 - outRatio)) / outRatio);
  const op = lpWord * (1 - outT);
  const y = (1 - lpWord) * 18 + outT * -10;
  return { op, y };
}

/** 영문 헤드를 단어 단위 span으로 분해한 정적 마크업. ref-array는 부모가 관리. */
function Words({
  lines,
  refsArr,
  styleFn,
}: {
  lines: string[][];
  refsArr: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  styleFn: () => React.CSSProperties;
}) {
  let counter = -1;
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w, wi) => {
            counter += 1;
            const myIdx = counter;
            return (
              <span
                key={`${li}-${wi}`}
                ref={(el) => {
                  refsArr.current[myIdx] = el;
                }}
                className="inline-block will-change-transform"
                style={{
                  ...styleFn(),
                  marginRight: wi < line.length - 1 ? "0.28em" : 0,
                  opacity: 0,
                  transform: "translate3d(0,18px,0)",
                }}
              >
                {w}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/** 한 stage의 z motion + opacity envelope을 한 곳에 적용하는 wrapper. */
function applyStageTransform(
  el: HTMLElement | null,
  p: number,
  from: number,
  to: number,
  fadeRatio = 0.18,
) {
  if (!el) return;
  const op = stageOpacity(p, from, to, fadeRatio);
  const z = stageZ(p, from, to);
  // pre-stage는 위에서 떨어지듯, post-stage는 카메라 뒤로 사라지듯
  el.style.opacity = String(op);
  el.style.transform = `translate3d(0,0,${z}px)`;
}

export default function StageOverlays({ handle }: { handle: ZJourneyHandle }) {
  // ── stage container refs (perspective children) ───────
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  const s5Ref = useRef<HTMLDivElement>(null);
  const s6Ref = useRef<HTMLDivElement>(null);

  // ── inner secondary refs (sub block envelopes) ────────
  const s1WordRef = useRef<HTMLSpanElement>(null);
  const s2WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const s2KrRef = useRef<HTMLDivElement>(null);
  const s3WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const s3SubRef = useRef<HTMLDivElement>(null);
  const s3NodesRef = useRef<HTMLDivElement>(null);
  const s4WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const s4SubRef = useRef<HTMLDivElement>(null);
  const s4AxesRef = useRef<HTMLDivElement>(null);
  const s5WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const s5KrRef = useRef<HTMLDivElement>(null);
  const s6WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const s6CtaRef = useRef<HTMLDivElement>(null);

  // ── stage range (disjoint, matches useZJourney STAGES) ─
  const R = {
    I: { from: 0.0, to: 0.18 },
    II: { from: 0.18, to: 0.36 },
    III: { from: 0.36, to: 0.54 },
    IV: { from: 0.54, to: 0.72 },
    V: { from: 0.72, to: 0.9 },
    VI: { from: 0.9, to: 1.0 },
  };

  useEffect(() => {
    let raf = 0;

    // word counts (set after first render via refs.length when nodes mounted)
    const tick = () => {
      const p = handle.progressRef.current;

      // ── Stage wrappers: z + opacity ────────────────────
      applyStageTransform(s1Ref.current, p, R.I.from, R.I.to);
      applyStageTransform(s2Ref.current, p, R.II.from, R.II.to);
      applyStageTransform(s3Ref.current, p, R.III.from, R.III.to);
      applyStageTransform(s4Ref.current, p, R.IV.from, R.IV.to);
      applyStageTransform(s5Ref.current, p, R.V.from, R.V.to);
      applyStageTransform(s6Ref.current, p, R.VI.from, R.VI.to);

      // ── Stage I — Hero wordmark scale ─────────────────
      if (s1WordRef.current) {
        const lp = clamp01((p - R.I.from) / (R.I.to - R.I.from));
        const scale = mix(0.96, 1.42, Math.pow(lp, 1.2));
        const letter = mix(-0.06, 0.0, lp);
        s1WordRef.current.style.transform = `scale(${scale})`;
        s1WordRef.current.style.letterSpacing = `${letter}em`;
      }

      // ── Word stagger helpers per stage ────────────────
      const staggerStage = (
        refsArr: React.MutableRefObject<(HTMLSpanElement | null)[]>,
        from: number,
        to: number,
      ) => {
        const list = refsArr.current;
        const N = list.length;
        for (let i = 0; i < N; i++) {
          const el = list[i];
          if (!el) continue;
          const { op, y } = wordOpacityY(p, from, to, i, N, 0.42);
          el.style.opacity = String(op);
          el.style.transform = `translate3d(0,${y}px,0)`;
        }
      };
      staggerStage(s2WordsRef, R.II.from, R.II.to);
      staggerStage(s3WordsRef, R.III.from, R.III.to);
      staggerStage(s4WordsRef, R.IV.from, R.IV.to);
      staggerStage(s5WordsRef, R.V.from, R.V.to);
      staggerStage(s6WordsRef, R.VI.from, R.VI.to);

      // ── Sub block envelopes (KR sub, axes, nodes, CTA) ─
      const subEnv = (
        el: HTMLElement | null,
        from: number,
        to: number,
        delay = 0.45,
        outAt = 0.85,
      ) => {
        if (!el) return;
        const lp = (p - from) / (to - from);
        if (lp <= 0 || lp >= 1) {
          el.style.opacity = "0";
          return;
        }
        const inT = clamp01((lp - delay) / 0.2);
        const outT = clamp01((lp - outAt) / (1 - outAt));
        el.style.opacity = String(inT * (1 - outT));
      };
      subEnv(s2KrRef.current, R.II.from, R.II.to, 0.45);
      subEnv(s3SubRef.current, R.III.from, R.III.to, 0.42);
      subEnv(s3NodesRef.current, R.III.from, R.III.to, 0.6);
      subEnv(s4SubRef.current, R.IV.from, R.IV.to, 0.42);
      subEnv(s4AxesRef.current, R.IV.from, R.IV.to, 0.6);
      subEnv(s5KrRef.current, R.V.from, R.V.to, 0.5);
      if (s6CtaRef.current) {
        subEnv(s6CtaRef.current, R.VI.from, R.VI.to, 0.4, 1.0);
        const lp = clamp01((p - R.VI.from) / (R.VI.to - R.VI.from));
        s6CtaRef.current.style.pointerEvents = lp > 0.55 ? "auto" : "none";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle, R.I.from, R.I.to, R.II.from, R.II.to, R.III.from, R.III.to, R.IV.from, R.IV.to, R.V.from, R.V.to, R.VI.from, R.VI.to]);

  // ── shared style helpers ───────────────────────────
  const eyebrow: React.CSSProperties = {
    fontFamily: MONO,
    fontWeight: 400,
    fontSize: "10.5px",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "var(--bn-ink-faint)",
  };
  const headStyle = (size: string, weight: number = 500): React.CSSProperties => ({
    fontFamily: MARK,
    fontWeight: weight,
    fontSize: size,
    lineHeight: 1.04,
    letterSpacing: "-0.025em",
    color: "var(--bn-ink)",
    textShadow: "0 0 60px rgba(10,9,8,0.6)",
    // Fraunces variable axes (where supported)
    fontVariationSettings: '"opsz" 144, "SOFT" 50',
  });

  return (
    // perspective parent — z translate가 진짜 depth로 보이게
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage I — Hero · §00                             ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s1Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-7 px-6 text-center">
          <span
            ref={s1WordRef}
            className="inline-block will-change-transform"
            style={{
              fontFamily: MARK,
              fontWeight: 900,
              fontSize: "clamp(5rem, 18vw, 22rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.06em",
              color: "var(--bn-ink)",
              textShadow:
                "0 0 60px rgba(184,145,106,0.18), 0 0 120px rgba(184,145,106,0.08)",
              fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 0',
            }}
          >
            Siriai
          </span>
          <div className="flex flex-col items-center gap-3">
            <span
              className="block h-px w-10"
              style={{ background: "var(--bn-accent)" }}
            />
            <span
              style={{
                fontFamily: MARK,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.3vw, 19px)",
                lineHeight: 1.4,
                color: "var(--bn-ink)",
                letterSpacing: "0.005em",
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
                wordBreak: "keep-all",
                maxWidth: "30ch",
              }}
            >
              AI로 사고하는 구조를 설계합니다.
            </span>
          </div>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage II — Stance · §01                          ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s2Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-12 px-6 text-center max-w-[1100px]">
          <span style={eyebrow}>01 — Stance</span>
          <h2 style={headStyle("clamp(2.4rem, 7.8vw, 7.5rem)", 600)}>
            <Words
              lines={[
                ["Tools", "change."],
                ["Structure", "remains."],
                ["We", "design", "it."],
              ]}
              refsArr={s2WordsRef}
              styleFn={() => headStyle("inherit", 600) as React.CSSProperties}
            />
          </h2>
          <div ref={s2KrRef} className="will-change-[opacity]">
            <div
              className="space-y-1.5"
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
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage III — System · §03                         ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s3Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-10 px-6 text-center max-w-[1100px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>02 — System</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2 style={headStyle("clamp(2.4rem, 7.2vw, 7rem)", 600)}>
            <Words
              lines={[
                ["Decision", "flow."],
                ["Made", "visible."],
              ]}
              refsArr={s3WordsRef}
              styleFn={() => headStyle("inherit", 600) as React.CSSProperties}
            />
          </h2>
          <p
            ref={s3SubRef}
            className="will-change-[opacity]"
            style={{
              fontFamily: PRETENDARD,
              fontSize: "14px",
              color: "var(--bn-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            판단의 흐름을, 보이게.
          </p>
          <div
            ref={s3NodesRef}
            className="flex items-center gap-4 will-change-[opacity]"
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
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage IV — Methodology · §02                     ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s4Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-10 px-6 text-center max-w-[1100px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>03 — Methodology</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2 style={headStyle("clamp(2.4rem, 7.2vw, 7rem)", 600)}>
            <Words
              lines={[
                ["Three", "ways", "in."],
                ["One", "place", "to", "begin."],
              ]}
              refsArr={s4WordsRef}
              styleFn={() => headStyle("inherit", 600) as React.CSSProperties}
            />
          </h2>
          <p
            ref={s4SubRef}
            className="will-change-[opacity]"
            style={{
              fontFamily: PRETENDARD,
              fontSize: "14px",
              color: "var(--bn-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            세 갈래로 들어가, 한 자리에서 시작합니다.
          </p>
          <div
            ref={s4AxesRef}
            className="grid grid-cols-3 gap-x-12 will-change-[opacity] max-w-[720px]"
          >
            {[
              { num: "01", title: "Architecture", kr: "의사결정의 구조." },
              { num: "02", title: "Literacy", kr: "AI로 사고하는 법." },
              { num: "03", title: "Mapping", kr: "진짜 문제의 결." },
            ].map((a) => (
              <div key={a.title} className="flex flex-col items-center gap-1.5">
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 400,
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "var(--bn-accent)",
                  }}
                >
                  {a.num}
                </span>
                <span
                  style={{
                    fontFamily: MARK,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "18px",
                    color: "var(--bn-ink)",
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
                    wordBreak: "keep-all",
                  }}
                >
                  {a.kr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage V — Voice · §05                            ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s5Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-10 px-6 text-center max-w-[1100px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>04 — Voice</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2 style={headStyle("clamp(2.2rem, 6.8vw, 6.4rem)", 600)}>
            <Words
              lines={[
                ["We", "don't", "recommend", "tools."],
                ["We", "architect", "what", "stays."],
              ]}
              refsArr={s5WordsRef}
              styleFn={() => headStyle("inherit", 600) as React.CSSProperties}
            />
          </h2>
          <div ref={s5KrRef} className="will-change-[opacity] max-w-[560px]">
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
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  Stage VI — Contact · §06                         ║
          ╚══════════════════════════════════════════════════╝ */}
      <div
        ref={s6Ref}
        className="absolute inset-0 grid place-items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-9 px-6 text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
            <span style={eyebrow}>05 — Contact</span>
            <span className="h-px w-6" style={{ background: "var(--bn-accent)" }} />
          </div>
          <h2
            style={{
              ...headStyle("clamp(2.4rem, 8vw, 7.6rem)", 400),
              fontStyle: "italic",
            }}
          >
            <Words
              lines={[
                ["Let's", "start"],
                ["with", "coffee."],
              ]}
              refsArr={s6WordsRef}
              styleFn={() => ({
                ...headStyle("inherit", 400),
                fontStyle: "italic",
              })}
            />
          </h2>
          <p
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
          <div
            ref={s6CtaRef}
            className="flex flex-col items-center gap-3 will-change-[opacity]"
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
                pointerEvents: "auto",
              }}
            >
              Send a note
              <span aria-hidden style={{ fontFamily: MONO }}>
                →
              </span>
            </a>
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 400,
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                color: "var(--bn-ink-muted)",
              }}
            >
              contact@siriai.io
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
