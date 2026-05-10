"use client";

import { useRef, useEffect, useCallback } from "react";

const CARDS = [
  {
    gradient:
      "radial-gradient(circle at 38% 38%, #00e5ff 0%, #0047ff 55%, #001a40 100%)",
    label: "Data Flow",
  },
  {
    gradient:
      "radial-gradient(circle at 62% 35%, #ffb300 0%, #ff4500 55%, #1a0800 100%)",
    label: "AI Strategy",
  },
  {
    gradient:
      "radial-gradient(circle at 45% 60%, #00ffb8 0%, #00aabb 50%, #002030 100%)",
    label: "Insight",
  },
  {
    gradient:
      "radial-gradient(circle at 55% 40%, #d400ff 0%, #7700ff 55%, #10002b 100%)",
    label: "Architecture",
  },
  {
    gradient:
      "radial-gradient(circle at 50% 50%, #dce8ff 0%, #8fa8ff 50%, #081020 100%)",
    label: "Literacy",
  },
  {
    gradient:
      "radial-gradient(circle at 42% 58%, #ffee00 0%, #ff7700 55%, #150a00 100%)",
    label: "Logic",
  },
  {
    gradient:
      "radial-gradient(circle at 60% 42%, #00ffee 0%, #6600ff 50%, #000e20 100%)",
    label: "Workflow",
  },
  {
    gradient:
      "radial-gradient(circle at 50% 50%, #ff00c8 0%, #8800ff 38%, #00d4ff 72%, #000818 100%)",
    label: "Integration",
  },
];

const N = CARDS.length;
const RADIUS = 252;
const CARD_SIZE = 164;
const AUTO_VEL = 0.22;

interface Props {
  height?: number;
}

export default function TurntableCarousel({ height = 520 }: Props) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(AUTO_VEL);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const lastX = useRef(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    if (!isDragging.current) {
      const target = isHovering.current ? AUTO_VEL * 0.28 : AUTO_VEL;
      if (velRef.current > 0) {
        velRef.current += (target - velRef.current) * 0.025;
      } else {
        velRef.current *= 0.92;
        if (Math.abs(velRef.current) < 0.02) velRef.current = target;
      }
      angleRef.current += velRef.current;
    }
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotateX(-13deg) rotateY(${angleRef.current}deg)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ height, perspective: "780px" }}
      onPointerDown={(e) => {
        isDragging.current = true;
        lastX.current = e.clientX;
        velRef.current = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastX.current;
        velRef.current = dx * 0.38;
        angleRef.current += velRef.current;
        lastX.current = e.clientX;
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerLeave={() => {
        isDragging.current = false;
        isHovering.current = false;
      }}
      onPointerEnter={() => {
        isHovering.current = true;
      }}
    >
      {/* central core glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 96,
          height: 96,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(160,80,255,0.14) 40%, transparent 68%)",
          boxShadow:
            "0 0 72px 32px rgba(130,60,255,0.18), 0 0 140px 70px rgba(60,100,255,0.1)",
          pointerEvents: "none",
        }}
      />

      {/* 3D wheel */}
      <div
        ref={wheelRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: "rotateX(-13deg) rotateY(0deg)",
        }}
      >
        {CARDS.map((card, i) => {
          const itemAngle = (i / N) * 360;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: CARD_SIZE,
                height: CARD_SIZE,
                top: -CARD_SIZE / 2,
                left: -CARD_SIZE / 2,
                transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`,
                borderRadius: "50%",
                overflow: "hidden",
                background: card.gradient,
                boxShadow:
                  "0 8px 48px rgba(0,0,0,0.8), 0 0 28px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.32)",
              }}
            >
              {/* center highlight */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.18) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              {/* glassmorphism shimmer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 45%, transparent 60%)",
                  backdropFilter: "blur(1px)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  pointerEvents: "none",
                }}
              />
              {/* bottom inner shadow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 50% 115%, rgba(0,0,0,0.6) 0%, transparent 55%)",
                  pointerEvents: "none",
                }}
              />
              {/* label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "23%",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.62)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* depth vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 72% 62% at 50% 50%, transparent 32%, #111110 76%)",
        }}
      />
    </div>
  );
}
