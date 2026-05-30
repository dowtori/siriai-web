"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useA1Motion } from "./motion-context";

/**
 * Stage 1 중앙 도형 — semantic core 역할.
 * 동심원 + 4-arc segmentation (Stage 2 §4 layers prefigure) + counter-rotating
 * dashed outer + dashed cross + magnet drift core.
 * 의미: 구조의 층이 코어로 수렴, 코어는 시선(마우스)에 미세 끌림.
 * 톤은 hairline only — 신비주의 결, 노출 최소.
 */
export default function RotatingForm() {
  const { params, reducedMotion } = useA1Motion();
  const rot = reducedMotion ? 0 : params.rotationDuration;
  const counterRot = reducedMotion ? 0 : params.rotationDuration * 1.6;
  const ambient = reducedMotion ? 0 : params.ambientLoop;

  const stroke = "var(--a1-hairline-on-midnight)";

  const coreGroupRef = useRef<SVGGElement | null>(null);

  // Core dot magnet — viewport 중앙에서 마우스 방향으로 미세 drift (max 6px).
  // reducedMotion 시 비활성.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let driftX = 0;
    let driftY = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("pointermove", onMove);

    const animate = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);
      const maxDrift = 6;
      const factor = dist > 0 ? Math.min(dist / 400, 1) * (maxDrift / Math.max(dist, 1)) : 0;
      const targetX = dx * factor;
      const targetY = dy * factor;
      driftX += (targetX - driftX) * 0.06;
      driftY += (targetY - driftY) * 0.06;
      if (coreGroupRef.current) {
        coreGroupRef.current.setAttribute(
          "transform",
          `translate(${driftX.toFixed(2)} ${driftY.toFixed(2)})`,
        );
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  // 4-arc middle segmentation (Signal · Judgment · Action · Record prefigure).
  // 각 arc 80도, 사이 10도 break — 코어 십자 라인과 일치.
  const arcR = 200;
  const arcCx = 300;
  const arcCy = 300;
  const arcs = [0, 90, 180, 270].map((startDeg) => {
    const s = ((startDeg + 5) * Math.PI) / 180;
    const e = ((startDeg + 85) * Math.PI) / 180;
    const x1 = arcCx + arcR * Math.cos(s);
    const y1 = arcCy + arcR * Math.sin(s);
    const x2 = arcCx + arcR * Math.cos(e);
    const y2 = arcCy + arcR * Math.sin(e);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${arcR} ${arcR} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 560,
        height: 560,
        marginLeft: -280,
        marginTop: -280,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {/* Outer dashed ring — slow rotation */}
      <motion.g
        animate={rot > 0 ? { rotate: 360 } : undefined}
        transition={
          rot > 0
            ? { duration: rot, repeat: Infinity, ease: "linear" }
            : undefined
        }
        style={{ transformOrigin: "300px 300px" }}
      >
        <circle
          cx={300}
          cy={300}
          r={280}
          fill="none"
          stroke={stroke}
          strokeWidth={0.5}
          strokeDasharray="2 12"
        />
      </motion.g>

      {/* Middle ring — 4-arc segmentation (Signal · Judgment · Action · Record hint) */}
      {arcs.map((d, i) => (
        <path
          key={`arc-${i}`}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={0.5}
        />
      ))}

      {/* Inner ring — counter rotation, longer cycle */}
      <motion.g
        animate={counterRot > 0 ? { rotate: -360 } : undefined}
        transition={
          counterRot > 0
            ? { duration: counterRot, repeat: Infinity, ease: "linear" }
            : undefined
        }
        style={{ transformOrigin: "300px 300px" }}
      >
        <circle
          cx={300}
          cy={300}
          r={120}
          fill="none"
          stroke={stroke}
          strokeWidth={0.5}
          strokeDasharray="1 6"
        />
        {/* 십자축 — subtle */}
        <line
          x1={300}
          y1={180}
          x2={300}
          y2={420}
          stroke={stroke}
          strokeWidth={0.5}
          strokeDasharray="1 5"
        />
        <line
          x1={180}
          y1={300}
          x2={420}
          y2={300}
          stroke={stroke}
          strokeWidth={0.5}
          strokeDasharray="1 5"
        />
      </motion.g>

      {/* Core group — magnet drift to mouse direction (max 6px, lerp 0.06) */}
      <g ref={coreGroupRef}>
        <motion.circle
          cx={300}
          cy={300}
          r={3}
          fill="var(--a1-on-midnight)"
          animate={
            ambient > 0
              ? { opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }
              : undefined
          }
          transition={
            ambient > 0
              ? { duration: ambient, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px", transformBox: "fill-box" }}
        />

        {/* Echo ring — core dot에서 천천히 퍼짐 */}
        {ambient > 0 && (
          <motion.circle
            cx={300}
            cy={300}
            r={3}
            fill="none"
            stroke={stroke}
            strokeWidth={0.5}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 18], opacity: [0.5, 0] }}
            transition={{
              duration: ambient * 1.2,
              repeat: Infinity,
              ease: "easeOut",
              repeatDelay: 0.5,
            }}
            style={{ transformOrigin: "300px 300px", transformBox: "fill-box" }}
          />
        )}
      </g>
    </svg>
  );
}
