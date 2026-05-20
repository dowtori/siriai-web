"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2400;
const SPREAD_XY = 70;
const TUNNEL_DEPTH = 140;

export default function StarField() {
  const ref = useRef<THREE.Points>(null);

  const geom = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.7);
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * r * SPREAD_XY * 0.5 + (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.sin(angle) * r * SPREAD_XY * 0.5 + (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = -Math.random() * TUNNEL_DEPTH + 4;
      sizes[i] = Math.random() < 0.08 ? 0.18 : 0.05 + Math.random() * 0.05;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#c4b5fd") },
          uColorAlt: { value: new THREE.Color("#ffffff") },
        },
        vertexShader: /* glsl */ `
          attribute float size;
          varying float vDepth;
          varying float vSize;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = size * 320.0 / -mv.z;
            vDepth = -mv.z;
            vSize = size;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform vec3 uColorAlt;
          varying float vDepth;
          varying float vSize;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);
            float halo = smoothstep(0.5, 0.18, d);
            vec3 col = mix(uColor, uColorAlt, smoothstep(0.0, 0.18, vSize));
            float alpha = core * 0.95 + halo * 0.15;
            alpha *= smoothstep(120.0, 4.0, vDepth);
            gl_FragColor = vec4(col, alpha);
          }
        `,
      }),
    [],
  );

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.012;
    (material.uniforms.uTime.value as number) += dt;
  });

  return <points ref={ref} geometry={geom} material={material} />;
}
