"use client";

/**
 * Stage IV — Methodology
 * Artifact: 3축 (Architecture · Literacy · Mapping) + SVG triangle outline.
 * Mechanic: 3 라벨이 triangle vertex 위치 (top center · bottom-left · bottom-right).
 *           SVG path가 stroke-dashoffset로 progress 따라 그려짐.
 *           중앙에 convergence point (작은 dot).
 */

import { useEffect, useRef } from "react";
import {
  applyStageTransform,
  clamp01,
  localProgress,
  MARK,
  MONO,
  PRETENDARD,
} from "../shared/stageMath";
import type { StageProps } from "./StageI_Hero";

// triangle vertex 좌표 (viewBox 800 × 600)
const VERTICES = {
  arch: { x: 400, y: 90, label: "Architecture", kr: "의사결정의 구조." },
  lit: { x: 100, y: 510, label: "Literacy", kr: "AI로 사고하는 법." },
  map: { x: 700, y: 510, label: "Mapping", kr: "진짜 문제의 결." },
};

// triangle path 둘레 (estimated for stroke-dasharray)
const TRIANGLE_PATH = `M ${VERTICES.arch.x} ${VERTICES.arch.y} L ${VERTICES.lit.x} ${VERTICES.lit.y} L ${VERTICES.map.x} ${VERTICES.map.y} Z`;

export default function StageIV_Methodology({ handle, from, to }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const trianglePathRef = useRef<SVGPathElement>(null);
  const archRef = useRef<SVGGElement>(null);
  const litRef = useRef<SVGGElement>(null);
  const mapRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // triangle path 둘레 측정 후 dasharray 설정
    const path = trianglePathRef.current;
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    }

    let raf = 0;
    const tick = () => {
      const p = handle.progressRef.current;
      applyStageTransform(wrapRef.current, p, from, to);
      const lp = localProgress(p, from, to);

      const setFade = (
        el: HTMLElement | SVGElement | null,
        delay: number,
      ) => {
        if (!el) return;
        const opIn = clamp01((lp - delay) / 0.18);
        const opOut = clamp01((lp - 0.82) / 0.18);
        (el as HTMLElement).style.opacity = String(opIn * (1 - opOut));
      };
      setFade(eyebrowRef.current, 0.0);
      setFade(subRef.current, 0.78);

      // 3 vertex label stagger
      setFade(archRef.current, 0.15);
      setFade(litRef.current, 0.23);
      setFade(mapRef.current, 0.31);

      // triangle path 그려짐 — stroke-dashoffset 0 → -len
      if (trianglePathRef.current) {
        const len = parseFloat(
          trianglePathRef.current.style.strokeDasharray || "0",
        );
        const lpDraw = clamp01((lp - 0.42) / 0.32);
        const opOut = clamp01((lp - 0.82) / 0.18);
        trianglePathRef.current.style.strokeDashoffset = String(len * (1 - lpDraw));
        trianglePathRef.current.style.opacity = String(1 - opOut);
      }

      // convergence point
      if (coreRef.current) {
        const opIn = clamp01((lp - 0.72) / 0.12);
        const opOut = clamp01((lp - 0.82) / 0.18);
        const sc = opIn * (1 - opOut);
        coreRef.current.style.opacity = String(sc);
        coreRef.current.setAttribute("r", String(2 + sc * 3));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handle, from, to]);

  // vertex 텍스트 위치 (label 중심 기준)
  const labelStyle = {
    fontFamily: MARK,
    fontSize: "clamp(20px, 3vw, 38px)",
    fontWeight: 500,
    letterSpacing: "-0.025em",
    fill: "var(--bn-ink)",
  } as React.CSSProperties;

  const subLabelStyle = {
    fontFamily: PRETENDARD,
    fontSize: "11px",
    fill: "var(--bn-ink-muted)",
  } as React.CSSProperties;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 grid place-items-center will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col items-center gap-8 px-6 text-center max-w-[820px] w-full">
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
            03 — Method
          </span>
        </div>

        <svg
          viewBox="0 0 800 600"
          style={{ width: "100%", maxWidth: "700px", height: "auto", overflow: "visible" }}
          role="img"
          aria-label="Architecture · Literacy · Mapping — triangle of methodology"
        >
          {/* Triangle outline */}
          <path
            ref={trianglePathRef}
            d={TRIANGLE_PATH}
            fill="none"
            stroke="var(--bn-accent)"
            strokeWidth="1"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />

          {/* Convergence core */}
          <circle
            ref={coreRef}
            cx={(VERTICES.arch.x + VERTICES.lit.x + VERTICES.map.x) / 3}
            cy={(VERTICES.arch.y + VERTICES.lit.y + VERTICES.map.y) / 3}
            r="2"
            fill="var(--bn-accent)"
            style={{ opacity: 0 }}
          />

          {/* Vertex: Architecture (top) */}
          <g ref={archRef} style={{ opacity: 0 }}>
            <circle
              cx={VERTICES.arch.x}
              cy={VERTICES.arch.y}
              r="4"
              fill="var(--bn-accent)"
            />
            <text
              x={VERTICES.arch.x}
              y={VERTICES.arch.y - 18}
              textAnchor="middle"
              style={labelStyle}
            >
              Architecture
            </text>
            <text
              x={VERTICES.arch.x}
              y={VERTICES.arch.y - 50}
              textAnchor="middle"
              style={subLabelStyle}
            >
              의사결정의 구조.
            </text>
          </g>

          {/* Vertex: Literacy (bottom-left) */}
          <g ref={litRef} style={{ opacity: 0 }}>
            <circle
              cx={VERTICES.lit.x}
              cy={VERTICES.lit.y}
              r="4"
              fill="var(--bn-accent)"
            />
            <text
              x={VERTICES.lit.x}
              y={VERTICES.lit.y + 32}
              textAnchor="start"
              style={labelStyle}
            >
              Literacy
            </text>
            <text
              x={VERTICES.lit.x}
              y={VERTICES.lit.y + 56}
              textAnchor="start"
              style={subLabelStyle}
            >
              AI로 사고하는 법.
            </text>
          </g>

          {/* Vertex: Mapping (bottom-right) */}
          <g ref={mapRef} style={{ opacity: 0 }}>
            <circle
              cx={VERTICES.map.x}
              cy={VERTICES.map.y}
              r="4"
              fill="var(--bn-accent)"
            />
            <text
              x={VERTICES.map.x}
              y={VERTICES.map.y + 32}
              textAnchor="end"
              style={labelStyle}
            >
              Mapping
            </text>
            <text
              x={VERTICES.map.x}
              y={VERTICES.map.y + 56}
              textAnchor="end"
              style={subLabelStyle}
            >
              진짜 문제의 결.
            </text>
          </g>
        </svg>

        <p
          ref={subRef}
          className="will-change-[opacity]"
          style={{
            opacity: 0,
            fontFamily: PRETENDARD,
            fontSize: "14px",
            color: "var(--bn-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          세 갈래의 진입.
        </p>
      </div>
    </div>
  );
}
