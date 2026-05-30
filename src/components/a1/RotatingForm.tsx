"use client";

import { motion } from "framer-motion";
import { useA1Motion } from "./motion-context";

/**
 * Stage 1 중앙 도형 — semantic core 역할.
 * 동심원 3 + 내부 dashed cross + counter-rotating dashed outer + center dot.
 * 시간 layering 원칙에 따라 마우스 무관 — 자기 시간(rotationDuration)으로만 회전.
 * 사용자 시선 안정 기준점. 톤은 hairline only.
 */
export default function RotatingForm() {
  const { params, reducedMotion } = useA1Motion();
  const rot = reducedMotion ? 0 : params.rotationDuration;
  const counterRot = reducedMotion ? 0 : params.rotationDuration * 1.6;
  const ambient = reducedMotion ? 0 : params.ambientLoop;

  const stroke = "var(--a1-hairline-on-midnight)";

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

      {/* Middle thin solid ring — static */}
      <circle
        cx={300}
        cy={300}
        r={200}
        fill="none"
        stroke={stroke}
        strokeWidth={0.5}
      />

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

      {/* Core dot — 자기 시간으로 호흡, 마우스 무관 */}
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
    </svg>
  );
}
