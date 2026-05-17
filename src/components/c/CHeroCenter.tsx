"use client";

// Hero 중앙 orb — Property 1=N(orbs/01~16.png)을 fade transition으로 1장씩 carousel.
// 사용자 결정: orb 16개를 1장씩, ←/→ 수동 + 5초 자동 advance, hover 시 자동 pause.

import Image from "next/image";
import { useEffect } from "react";

const ORB_LABELS = [
  "Context", "Signal", "Question", "Edge",
  "Clarity", "Modeling", "Oversight", "Trace",
  "Flow", "Rhythm", "Connection", "Momentum",
  "Evidence", "Benchmark", "Learning", "Compounding",
];

const AUTO_ADVANCE_MS = 5000;

type Props = {
  index: number; // 1..16
  onAdvance: () => void;
  paused: boolean;
};

export default function CHeroCenter({ index, onAdvance, paused }: Props) {
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(onAdvance, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, onAdvance]);

  return (
    <div className="c-hero-center" aria-live="polite">
      {ORB_LABELS.map((label, i) => {
        const padded = `${i + 1}`.padStart(2, "0");
        const active = i + 1 === index;
        return (
          <Image
            key={label}
            src={`/c/assets/orbs/${padded}.png`}
            alt={active ? label : ""}
            width={640}
            height={640}
            priority={i < 2}
            className="c-hero-center-img"
            data-active={active ? "true" : "false"}
          />
        );
      })}
    </div>
  );
}
