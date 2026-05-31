"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * V4 ACT 2 — Practice / 기술자산 시각화 (pinned, 흰색).
 * 추상 방법론을 '조립되는 구조'로: 입력 3축 → Operating Model 코어 → 의사결정 파이프라인.
 * 스크롤이 노드 등장·엣지 드로잉·신호 펄스를 구동. 원본 SVG 구현. 카피 v3 그대로.
 * 감도: 정밀·주석·깊이(프리미엄 테크). reduced-motion이면 완성 상태 정적.
 */
const ACCENT = "#2b3a4a";
const GLOW = "#4f7bbf";

const INPUTS = [
  { x: 235, y: 175, n: "01", t: "Architecture", d: "의사결정의 구조" },
  { x: 235, y: 330, n: "02", t: "Literacy", d: "AI로 사고하는 법" },
  { x: 235, y: 485, n: "03", t: "Mapping", d: "진짜 문제를 그림" },
];
const CORE = { x: 640, y: 330, w: 210, h: 84 };
const PIPE = [
  { x: 815, y: 330, t: "Signal" },
  { x: 940, y: 330, t: "Judgment" },
  { x: 1065, y: 330, t: "Action" },
  { x: 1190, y: 330, t: "Record" },
];

const len = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

function Edge({ p, a, b, x1, y1, x2, y2, reduce }: { p: MotionValue<number>; a: number; b: number; x1: number; y1: number; x2: number; y2: number; reduce: boolean }) {
  const L = len(x1, y1, x2, y2);
  const off = useTransform(p, [a, b], [L, 0]);
  const op = useTransform(p, [a, Math.min(a + 0.02, b)], [0, 1]);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={GLOW} strokeWidth={1.4} strokeDasharray={L}
      style={reduce ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: off, opacity: op }}
    />
  );
}

function Pop({ p, a, b, reduce, children }: { p: MotionValue<number>; a: number; b: number; reduce: boolean; children: React.ReactNode }) {
  const opacity = useTransform(p, [a, b], [0, 1]);
  const scale = useTransform(p, [a, b], [0.82, 1]);
  return (
    <motion.g style={reduce ? { opacity: 1 } : { opacity, scale, transformBox: "fill-box", transformOrigin: "center" }}>
      {children}
    </motion.g>
  );
}

export default function V4Act2() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const pulseX = useTransform(p, [0.82, 1], [PIPE[0].x, PIPE[3].x]);
  const pulseOp = useTransform(p, [0.8, 0.85, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", height: reduce ? "auto" : "300vh", background: "var(--v4-paper)", color: "var(--v4-ink)" }}>
      <div style={{ position: reduce ? "relative" : "sticky", top: 0, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(64px, 8vh, 110px) clamp(24px, 5vw, 56px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
          <p className="v4-eyebrow">01 — Practice · Operating Model</p>
          <h2 style={{ margin: "16px 0 4px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem, 3.4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Tools change. Structure remains.<br /><span style={{ color: ACCENT }}>We design it.</span>
          </h2>
          <p style={{ margin: "0 0 clamp(20px, 3vw, 40px)", color: "var(--v4-muted)", maxWidth: 560 }}>
            세 갈래로 들어가, 한 자리에서 시작합니다 — 판단의 흐름을, 보이게.
          </p>

          <svg viewBox="0 0 1280 640" style={{ width: "100%", height: "auto", overflow: "visible" }}>
            {/* 깊이 백드롭 — 은은한 등각 그리드 */}
            <g opacity={0.5}>
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={"gx" + i} x1={120 + i * 130} y1={70} x2={120 + i * 130 - 90} y2={580} stroke="var(--v4-line)" strokeWidth={1} />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={"gy" + i} x1={70} y1={140 + i * 110} x2={1210} y2={140 + i * 110 - 30} stroke="var(--v4-line)" strokeWidth={1} />
              ))}
            </g>

            {/* 엣지: 입력 → 코어 */}
            {INPUTS.map((inp, i) => (
              <Edge key={"e" + i} p={p} reduce={reduce} a={0.22 + i * 0.03} b={0.46} x1={inp.x + 88} y1={inp.y} x2={CORE.x - CORE.w / 2} y2={CORE.y} />
            ))}
            {/* 코어 → 파이프라인 */}
            <Edge p={p} reduce={reduce} a={0.54} b={0.62} x1={CORE.x + CORE.w / 2} y1={CORE.y} x2={PIPE[0].x - 26} y2={PIPE[0].y} />
            {PIPE.slice(1).map((nd, i) => (
              <Edge key={"pe" + i} p={p} reduce={reduce} a={0.62 + i * 0.05} b={0.7 + i * 0.05} x1={PIPE[i].x + 26} y1={PIPE[i].y} x2={nd.x - 26} y2={nd.y} />
            ))}

            {/* 입력 노드 */}
            {INPUTS.map((inp, i) => (
              <Pop key={"in" + i} p={p} reduce={reduce} a={0.02 + i * 0.05} b={0.18 + i * 0.05}>
                <rect x={inp.x - 88} y={inp.y - 34} width={176} height={68} rx={14} fill="var(--v4-paper-2)" stroke="var(--v4-line-strong)" />
                <text x={inp.x - 72} y={inp.y - 10} fontFamily="var(--font-mono)" fontSize={12} fill="var(--v4-faint)">{inp.n}</text>
                <text x={inp.x - 72} y={inp.y + 8} fontFamily="var(--font-display)" fontSize={19} fontWeight={600} fill="var(--v4-ink)">{inp.t}</text>
                <text x={inp.x - 72} y={inp.y + 26} fontFamily="var(--font-sans)" fontSize={12} fill="var(--v4-muted)">{inp.d}</text>
              </Pop>
            ))}

            {/* 코어 */}
            <Pop p={p} reduce={reduce} a={0.44} b={0.56}>
              <rect x={CORE.x - CORE.w / 2} y={CORE.y - CORE.h / 2} width={CORE.w} height={CORE.h} rx={16} fill={ACCENT} />
              <text x={CORE.x} y={CORE.y - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill={GLOW} letterSpacing={2}>CORE</text>
              <text x={CORE.x} y={CORE.y + 18} textAnchor="middle" fontFamily="var(--font-display)" fontSize={22} fontWeight={600} fill="#eef4ff">Operating Model</text>
            </Pop>

            {/* 파이프라인 노드 */}
            {PIPE.map((nd, i) => (
              <Pop key={"pn" + i} p={p} reduce={reduce} a={0.56 + i * 0.05} b={0.7 + i * 0.05}>
                <circle cx={nd.x} cy={nd.y} r={26} fill="var(--v4-paper)" stroke={ACCENT} strokeWidth={1.6} />
                <circle cx={nd.x} cy={nd.y} r={6} fill={ACCENT} />
                <text x={nd.x} y={nd.y + 52} textAnchor="middle" fontFamily="var(--font-display)" fontSize={16} fontWeight={500} fill="var(--v4-ink)">{nd.t}</text>
                <text x={nd.x} y={nd.y + 70} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--v4-faint)">{String(i + 1).padStart(2, "0")}</text>
              </Pop>
            ))}

            {!reduce && <motion.circle cx={pulseX} cy={PIPE[0].y} r={7} fill={GLOW} style={{ opacity: pulseOp }} />}

            <Pop p={p} reduce={reduce} a={0.7} b={0.82}>
              <text x={PIPE[0].x} y={250} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--v4-faint)">Signal · Judgment · Action · Record</text>
            </Pop>
          </svg>
        </div>
      </div>
    </section>
  );
}
