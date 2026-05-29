"use client";

import { useEffect, useRef } from "react";
import { useA1Motion } from "./motion-context";

type Props = {
  forcedCursor?: { x: number; y: number };
};

export default function MysticCursor({ forcedCursor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { params, reducedMotion } = useA1Motion();
  const paramsRef = useRef(params);
  const forcedRef = useRef<Props["forcedCursor"]>(forcedCursor);

  // RAF loop은 마운트 시 한 번만 시작. 매 프레임 최신 값을 읽도록 ref로 전달.
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);
  useEffect(() => {
    forcedRef.current = forcedCursor;
  }, [forcedCursor]);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let initialized = false;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 시작 위치: 중앙
      if (!initialized) {
        mouseX = curX = width / 2;
        mouseY = curY = height / 2;
        initialized = true;
      }
      // 초기 fill — midnight base
      ctx.fillStyle = "#0B0F14";
      ctx.fillRect(0, 0, width, height);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);

    const animate = () => {
      const { cursorLerp, cursorRadius } = paramsRef.current;

      // 강제 cursor 모드 (harness URL flag)
      if (forcedRef.current) {
        mouseX = forcedRef.current.x;
        mouseY = forcedRef.current.y;
      }

      curX += (mouseX - curX) * cursorLerp;
      curY += (mouseY - curY) * cursorLerp;

      // soft fade trail — midnight 위에 살짝 덮어서 잔향이 천천히 사라짐
      ctx.fillStyle = "rgba(11, 15, 20, 0.06)";
      ctx.fillRect(0, 0, width, height);

      // ink wash blob — radial gradient, warm paper color over midnight
      const g = ctx.createRadialGradient(curX, curY, 0, curX, curY, cursorRadius);
      g.addColorStop(0, "rgba(232, 230, 222, 0.10)");
      g.addColorStop(0.45, "rgba(232, 230, 222, 0.04)");
      g.addColorStop(1, "rgba(232, 230, 222, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(curX, curY, cursorRadius, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

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
