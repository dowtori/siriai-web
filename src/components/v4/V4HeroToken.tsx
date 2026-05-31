"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

/**
 * V4 Hero CTA — 진짜 3D 오브제 토큰 버튼 (히어로 재미요소).
 * 광택 재질 + 라벨이 오브제에 박힘 + 드래그로 뱅글뱅글 회전 + 호버 글로우. 원본 구현.
 * reduced-motion이면 정적(정면 고정).
 */
const GLOW = "#5b8cc8";

function Token({ reduce }: { reduce: boolean }) {
  const g = useRef<THREE.Group>(null);
  const vel = useRef(0);
  const t = useRef(0);
  const drag = useRef({ on: false, last: 0, moved: 0 });
  const [hover, setHover] = useState(false);

  useFrame((_, delta) => {
    if (!g.current) return;
    const d = Math.min(delta, 0.05);
    t.current += d;
    if (!reduce) {
      g.current.rotation.y += vel.current * d + (hover ? 0.55 : 0.28) * d;
      vel.current *= 0.93;
      g.current.rotation.x = Math.sin(t.current * 0.6) * 0.12;
    }
    const s = hover ? 1.07 : 1;
    g.current.scale.x += (s - g.current.scale.x) * 0.12;
    g.current.scale.y = g.current.scale.z = g.current.scale.x;
  });

  function down(e: any) { e.stopPropagation(); drag.current = { on: true, last: e.clientX ?? 0, moved: 0 }; (e.target as Element)?.setPointerCapture?.(e.pointerId); }
  function move(e: any) {
    if (!drag.current.on) return;
    const dx = (e.clientX ?? 0) - drag.current.last;
    drag.current.last = e.clientX ?? 0;
    drag.current.moved += Math.abs(dx);
    vel.current += dx * 0.0012;
  }
  function up(e: any) {
    const wasClick = drag.current.moved < 6;
    drag.current.on = false;
    if (wasClick && typeof window !== "undefined") window.location.hash = "contact";
  }

  return (
    <group
      ref={g}
      onPointerOver={() => { setHover(true); document.body.style.cursor = "grab"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
    >
      <RoundedBox args={[2.7, 1.02, 0.34]} radius={0.17} smoothness={6}>
        <meshStandardMaterial color="#1b2433" metalness={0.85} roughness={0.26} envMapIntensity={1.8} emissive={GLOW} emissiveIntensity={hover ? 0.42 : 0.28} />
      </RoundedBox>
      {/* 라벨 — 오브제에 박힘 (앞/뒤) */}
      <Text position={[0, 0, 0.18]} fontSize={0.32} letterSpacing={-0.01} color="#eef4ff" anchorX="center" anchorY="middle">
        Talk to us  →
      </Text>
      <Text position={[0, 0, -0.18]} rotation={[0, Math.PI, 0]} fontSize={0.32} letterSpacing={-0.01} color="#eef4ff" anchorX="center" anchorY="middle">
        Talk to us  →
      </Text>
    </group>
  );
}

export default function V4HeroToken({ reduce: reduceProp }: { reduce?: boolean }) {
  const reduceHook = useReducedMotion();
  const reduce = reduceProp ?? reduceHook ?? false;
  return (
    <div style={{ position: "relative", width: "min(360px, 80vw)", height: 170, touchAction: "none" }}>
      {/* 소프트 글로우 헤일로 — 토큰을 포컬로 */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-30% -10%",
          background: "radial-gradient(closest-side, rgba(79,123,191,0.34), rgba(79,123,191,0) 72%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <Canvas style={{ position: "relative" }} camera={{ position: [0, 0, 4.1], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <pointLight position={[-3, -1, 2]} intensity={1.5} color={GLOW} />
        <Token reduce={reduce} />
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 2, 3]} scale={[5, 5, 1]} color="#bcd4ff" />
          <Lightformer intensity={1.4} position={[-3, -1, 2]} scale={[4, 4, 1]} color={GLOW} />
          <Lightformer intensity={1.0} position={[3, 1, -2]} scale={[4, 4, 1]} color="#ffffff" />
        </Environment>
      </Canvas>
    </div>
  );
}
