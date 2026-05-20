"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1100;
const SPREAD_XY = 70;
const TUNNEL_DEPTH = 140;

export default function StarField() {
  const ref = useRef<THREE.Points>(null);

  const geom = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const tones = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.7);
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * r * SPREAD_XY * 0.5 + (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.sin(angle) * r * SPREAD_XY * 0.5 + (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = -Math.random() * TUNNEL_DEPTH + 4;
      // sparse "large" particles for visual rhythm
      const rare = Math.random() < 0.04;
      sizes[i] = rare ? 0.22 : 0.04 + Math.random() * 0.05;
      // tone: 0 = ivory dust, 1 = copper accent. Mostly ivory with rare copper sparks.
      tones[i] = rare && Math.random() < 0.55 ? 1.0 : 0.0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("tone", new THREE.BufferAttribute(tones, 1));
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
          uIvory: { value: new THREE.Color("#E8DCC0") },
          uCopper: { value: new THREE.Color("#B8916A") },
        },
        vertexShader: /* glsl */ `
          attribute float size;
          attribute float tone;
          varying float vDepth;
          varying float vSize;
          varying float vTone;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = size * 340.0 / -mv.z;
            vDepth = -mv.z;
            vSize = size;
            vTone = tone;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uIvory;
          uniform vec3 uCopper;
          varying float vDepth;
          varying float vSize;
          varying float vTone;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);
            float halo = smoothstep(0.5, 0.18, d);
            vec3 col = mix(uIvory, uCopper, vTone);
            float alpha = core * 0.85 + halo * 0.18;
            alpha *= smoothstep(135.0, 4.0, vDepth);
            // soften far dust
            alpha *= mix(0.55, 1.0, smoothstep(0.06, 0.22, vSize));
            gl_FragColor = vec4(col, alpha);
          }
        `,
      }),
    [],
  );

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.009;
    (material.uniforms.uTime.value as number) += dt;
  });

  return <points ref={ref} geometry={geom} material={material} />;
}
