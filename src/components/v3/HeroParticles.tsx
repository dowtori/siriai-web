"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
};

const STIFFNESS = 0.08;
const DAMPING = 0.86;
const MOUSE_RADIUS = 160;
const MOUSE_FORCE = 4;
const DOT_COLOR = "rgba(43, 58, 74, 0.86)";
const DOT_SIZE = 1.5;

export default function HeroParticles({ lines }: { lines: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const oc = off.getContext("2d");
      if (!oc) return;

      const fontSize = Math.min(width / 8.5, height / 4.5);
      oc.fillStyle = "#000";
      oc.font = `500 ${fontSize}px "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif`;
      oc.textAlign = "left";
      oc.textBaseline = "alphabetic";
      const lineHeight = fontSize * 1.08;
      const x0 = Math.max(20, width * 0.06);
      const totalH = lines.length * lineHeight;
      const y0 = (height - totalH) / 2 + fontSize * 0.85;
      lines.forEach((line, i) => oc.fillText(line, x0, y0 + i * lineHeight));

      const data = oc.getImageData(0, 0, width, height).data;
      const step = width < 640 ? 5 : 4;
      const targets: Array<[number, number]> = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (data[idx + 3] > 128) targets.push([x, y]);
        }
      }

      if (particles.length === 0) {
        particles = targets.map(([tx, ty]) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          tx,
          ty,
          vx: 0,
          vy: 0,
        }));
      } else {
        const n = targets.length;
        if (n > particles.length) {
          for (let i = particles.length; i < n; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tx: targets[i][0],
              ty: targets[i][1],
              vx: 0,
              vy: 0,
            });
          }
        } else if (n < particles.length) {
          particles.length = n;
        }
        for (let i = 0; i < n; i++) {
          particles[i].tx = targets[i][0];
          particles[i].ty = targets[i][1];
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const mr2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (const p of particles) {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < mr2) {
          const md = Math.sqrt(md2) || 1;
          const f = (1 - md / MOUSE_RADIUS) * MOUSE_FORCE;
          dx += (mdx / md) * f;
          dy += (mdy / md) * f;
        }
        p.vx = (p.vx + dx * STIFFNESS) * DAMPING;
        p.vy = (p.vy + dy * STIFFNESS) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.fillStyle = DOT_COLOR;
      const half = DOT_SIZE / 2;
      for (const p of particles) ctx.fillRect(p.x - half, p.y - half, DOT_SIZE, DOT_SIZE);
      raf = requestAnimationFrame(tick);
    };

    const drawStatic = () => {
      for (const p of particles) {
        p.x = p.tx;
        p.y = p.ty;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;
      const half = DOT_SIZE / 2;
      for (const p of particles) ctx.fillRect(p.x - half, p.y - half, DOT_SIZE, DOT_SIZE);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();

    const start = async () => {
      try {
        await (document.fonts?.ready ?? Promise.resolve());
      } catch {
        /* noop */
      }
      build();
      if (reduced) {
        drawStatic();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    start();

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [lines]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
