"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = { x: number; y: number; label: string };
type Layer = { name: string; y: number; nodes: Node[] };

const LAYERS: Layer[] = [
  {
    name: "01 — SIGNAL",
    y: 110,
    nodes: [
      { x: 200, y: 110, label: "Audience" },
      { x: 500, y: 110, label: "Operations" },
      { x: 800, y: 110, label: "Market" },
    ],
  },
  {
    name: "02 — JUDGMENT",
    y: 250,
    nodes: [
      { x: 350, y: 250, label: "Triage" },
      { x: 650, y: 250, label: "Editorial" },
    ],
  },
  {
    name: "03 — ACTION",
    y: 390,
    nodes: [
      { x: 200, y: 390, label: "Pipeline" },
      { x: 500, y: 390, label: "Channels" },
      { x: 800, y: 390, label: "Partner" },
    ],
  },
  {
    name: "04 — RECORD",
    y: 530,
    nodes: [
      { x: 350, y: 530, label: "Knowledge" },
      { x: 650, y: 530, label: "Archive" },
    ],
  },
];

// [layerFrom, nodeFrom, layerTo, nodeTo]
const EDGES: Array<[number, number, number, number]> = [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [0, 2, 1, 1],
  [1, 0, 2, 0],
  [1, 0, 2, 1],
  [1, 1, 2, 1],
  [1, 1, 2, 2],
  [2, 0, 3, 0],
  [2, 1, 3, 0],
  [2, 1, 3, 1],
  [2, 2, 3, 1],
];

export default function SystemSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      id="system"
      ref={ref}
      data-tone="dark"
      style={{
        backgroundColor: "var(--surface-inverse)",
        color: "var(--fg-on-inverse)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-on-inverse-muted)" }}
          >
            03 — System
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
            This is what a thinking
            <br />
            organization looks like.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
            className="mt-6"
            style={{
              fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
              lineHeight: 1.85,
              color: "var(--fg-on-inverse-muted)",
              wordBreak: "keep-all",
              maxWidth: "48ch",
            }}
          >
            사고하는 조직의 구조를 한 장으로 그립니다.
          </motion.p>
        </div>

        <div className="mt-20 md:mt-28">
          <DiagramB inView={inView} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 2.6 }}
          className="mt-16 md:mt-20"
          style={{
            fontSize: "12px",
            color: "var(--fg-on-inverse-muted)",
            lineHeight: 1.8,
            maxWidth: "52ch",
            wordBreak: "keep-all",
          }}
        >
          실제 클라이언트와 함께 설계한 운영 다이어그램의 추상화.
          <br />
          레이어:{" "}
          <span style={{ color: "var(--fg-on-inverse)" }}>
            Signal → Judgment → Action → Record
          </span>
        </motion.p>
      </div>
    </section>
  );
}

function DiagramB({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      width="100%"
      style={{ overflow: "visible" }}
      role="img"
      aria-label="System diagram: four layers Signal, Judgment, Action, Record with nodes and edges"
    >
      {/* Horizontal layer rules */}
      {LAYERS.map((layer, li) => (
        <motion.line
          key={`rule-${li}`}
          x1={50}
          y1={layer.y}
          x2={950}
          y2={layer.y}
          stroke="var(--line-on-inverse)"
          strokeWidth={0.5}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 + li * 0.3 }}
        />
      ))}

      {/* Edges */}
      {EDGES.map(([li1, ni1, li2, ni2], i) => {
        const from = LAYERS[li1].nodes[ni1];
        const to = LAYERS[li2].nodes[ni2];
        const delay = 0.35 + li2 * 0.3 + (i % 4) * 0.06;
        return (
          <motion.line
            key={`edge-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--line-on-inverse)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.7, ease: EASE, delay }}
          />
        );
      })}

      {/* Nodes + node labels */}
      {LAYERS.map((layer, li) => (
        <g key={`layer-${li}`}>
          {layer.nodes.map((node, ni) => {
            const delay = 0.25 + li * 0.3 + ni * 0.06;
            return (
              <g key={`node-${li}-${ni}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={6}
                  fill="var(--surface-inverse)"
                  stroke="var(--fg-on-inverse)"
                  strokeWidth={1.2}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.5, ease: EASE, delay }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <motion.text
                  x={node.x}
                  y={node.y - 14}
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.6, ease: EASE, delay: delay + 0.1 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 11,
                    fontWeight: 500,
                    fill: "var(--fg-on-inverse)",
                  }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}

          {/* Layer label, right edge */}
          <motion.text
            x={970}
            y={layer.y + 4}
            textAnchor="end"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 + li * 0.3 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 10,
              fontWeight: 600,
              fill: "var(--fg-on-inverse-muted)",
              letterSpacing: "0.22em",
            }}
          >
            {layer.name}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}
