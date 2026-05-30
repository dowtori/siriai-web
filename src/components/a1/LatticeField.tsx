"use client";

import { useEffect, useRef } from "react";
import { useA1Motion } from "./motion-context";

/**
 * Stage 1 Hero 중심 — Revelation 모델.
 *
 * 철학: 구조는 이미 어둠 속에 완성된 채 존재한다("Structure remains").
 * 커서는 빛을 만들지 않고 등(lantern)이 되어, 화면(world)에 고정된 설계된
 * lattice를 비춘다. 빛이 닿은 자리의 노드·엣지가 사진처럼 천천히 현상되고,
 * 등이 떠나면 천천히 가라앉되 완전히 사라지지 않는다(희미한 기억).
 *
 * 직선/puppet 느낌을 죽이는 핵심: 시각 콘텐츠가 커서가 아니라 world에
 * 고정된다. 커서는 콘텐츠를 끌고 다니지 않는다 — 같은 위치는 항상 같은
 * 구조를 드러낸다(결정론적 = "we design it").
 */

type ForcedCursor = { x: number; y: number };
type Props = { forcedCursor?: ForcedCursor };

// 결정론적 PRNG — 매번 동일한 구조. 랜덤 노이즈가 아니라 "설계된" lattice.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type LNode = {
  x: number; // world px
  y: number;
  illum: number; // 현재 조도 0..1 (lantern + core)
  mem: number; // 잔존 기억 0..MEM_CAP
  coreFloor: number; // 항상 켜진 중앙 floor
};

// 격자 설계
const SPACING = 84;
const JITTER = 26;
const EDGE_MAX = SPACING * 1.55;
const CORE_RADIUS = 168; // 중앙 always-lit heart 반경
const CORE_PEAK = 0.42;

// 시간 상수 — "느림"은 여기서 온다 (lerp 직역 아님).
const REVEAL_RISE = 0.045; // 빛이 닿으면 사진처럼 천천히 떠오름 (~1.1s to 95%)
const REVEAL_FALL = 0.012; // 떠나면 더 천천히 가라앉음 (~4s)
const MEM_DECAY = 0.9986; // 기억은 아주 천천히 소멸 (half-life ~8s) — "structure remains"
const MEM_GAIN = 0.7;
const MEM_CAP = 0.2;

const INK = "232, 230, 222"; // --a1-on-midnight rgb
const BASE = "#0B0F14"; // --a1-midnight

export default function LatticeField({ forcedCursor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { params, reducedMotion } = useA1Motion();
  const paramsRef = useRef(params);
  const forcedRef = useRef<ForcedCursor | undefined>(forcedCursor);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);
  useEffect(() => {
    forcedRef.current = forcedCursor;
  }, [forcedCursor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const g = maybeCtx; // 클로저 내 non-null 보장

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: LNode[] = [];
    let edges: Array<[number, number]> = [];
    let raf = 0;

    let mouseX = 0;
    let mouseY = 0;
    let lampX = 0;
    let lampY = 0;
    let hasMouse = false;
    let initialized = false;
    let startT = 0;

    const build = () => {
      const rng = mulberry32(0x51514a1); // fixed seed — designed lattice
      nodes = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      const cx = width / 2;
      const cy = height / 2;
      const grid: number[][] = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const bx = (c - 1) * SPACING + SPACING / 2;
          const by = (r - 1) * SPACING + SPACING / 2;
          const x = bx + (rng() - 0.5) * 2 * JITTER;
          const y = by + (rng() - 0.5) * 2 * JITTER;
          const d = Math.hypot(x - cx, y - cy);
          const coreFloor =
            d < CORE_RADIUS ? (1 - d / CORE_RADIUS) * CORE_PEAK : 0;
          grid[r][c] = nodes.length;
          nodes.push({ x, y, illum: coreFloor, mem: 0, coreFloor });
        }
      }
      edges = [];
      const maxE2 = EDGE_MAX * EDGE_MAX;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = grid[r][c];
          const cand = [
            r < rows - 1 ? grid[r + 1][c] : -1,
            c < cols - 1 ? grid[r][c + 1] : -1,
            r < rows - 1 && c < cols - 1 ? grid[r + 1][c + 1] : -1,
            r < rows - 1 && c > 0 ? grid[r + 1][c - 1] : -1,
          ];
          for (const j of cand) {
            if (j < 0) continue;
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            if (dx * dx + dy * dy <= maxE2) edges.push([i, j]);
          }
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!initialized) {
        mouseX = lampX = width / 2;
        mouseY = lampY = height / 2;
        initialized = true;
      }
      build();
      if (reducedMotion) renderStatic();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hasMouse = true;
    };
    const onPointerLeave = () => {
      hasMouse = false;
    };

    function brightness(n: LNode) {
      const b = n.illum > n.mem ? n.illum : n.mem;
      return b > n.coreFloor ? b : n.coreFloor;
    }

    function draw(coreScale: number) {
      g.fillStyle = BASE;
      g.fillRect(0, 0, width, height);

      g.lineWidth = 0.6;
      for (let k = 0; k < edges.length; k++) {
        const a = nodes[edges[k][0]];
        const b = nodes[edges[k][1]];
        const ba = brightness(a);
        const bb = brightness(b);
        const e = ba < bb ? ba : bb;
        if (e <= 0.02) continue;
        g.strokeStyle = `rgba(${INK}, ${(e * 0.3).toFixed(3)})`;
        g.beginPath();
        g.moveTo(a.x, a.y);
        g.lineTo(b.x, b.y);
        g.stroke();
      }

      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        let b = brightness(n);
        // 중앙 heart는 자기 시간으로 호흡
        if (n.coreFloor > 0) b = Math.min(1, b * coreScale);
        if (b <= 0.02) continue;
        const rr = 0.9 + b * 1.4;
        g.fillStyle = `rgba(${INK}, ${(b * 0.82).toFixed(3)})`;
        g.beginPath();
        g.arc(n.x, n.y, rr, 0, Math.PI * 2);
        g.fill();
      }
    }

    function renderStatic() {
      // reduced motion: lattice 전체를 희미하게 + core. 인터랙션·애니메이션 없음.
      for (const n of nodes) n.illum = Math.max(n.coreFloor, 0.12);
      for (const n of nodes) n.mem = 0;
      draw(1);
    }

    const animate = (now: number) => {
      if (!startT) startT = now;
      const t = (now - startT) / 1000;
      const { cursorLerp, cursorRadius, ambientLoop } = paramsRef.current;

      const forced = forcedRef.current;
      if (forced) {
        mouseX = forced.x;
        mouseY = forced.y;
      }
      lampX += (mouseX - lampX) * cursorLerp;
      lampY += (mouseY - lampY) * cursorLerp;

      const active = hasMouse || !!forced;
      const radius = cursorRadius;
      const r2 = radius * radius;

      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        let lantern = 0;
        if (active) {
          const dx = n.x - lampX;
          const dy = n.y - lampY;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const u = 1 - Math.sqrt(d2) / radius; // 0..1
            lantern = u * u * (3 - 2 * u); // smoothstep
          }
        }
        const target = lantern > n.coreFloor ? lantern : n.coreFloor;
        const rate = target > n.illum ? REVEAL_RISE : REVEAL_FALL;
        n.illum += (target - n.illum) * rate;
        const memSrc = (n.illum - n.coreFloor) * MEM_GAIN;
        const decayed = n.mem * MEM_DECAY;
        n.mem = decayed > memSrc ? decayed : memSrc;
        if (n.mem > MEM_CAP) n.mem = MEM_CAP;
      }

      // core breathing — 자기 시간. ambientLoop이 한 주기.
      const phase = ambientLoop > 0 ? Math.sin((t / ambientLoop) * Math.PI * 2) : 0;
      const coreScale = 0.86 + 0.14 * (phase * 0.5 + 0.5);

      draw(coreScale);
      raf = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    if (!reducedMotion) raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
