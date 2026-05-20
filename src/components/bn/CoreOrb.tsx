"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stageProgress, type ZJourneyHandle } from "./useZJourney";

export default function CoreOrb({ handle }: { handle: ZJourneyHandle }) {
  const glowRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Volumetric soft-light glow material (always visible, very subtle)
  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        uniforms: {
          uColor: { value: new THREE.Color("#B8916A") },
          uIntensity: { value: 0.55 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            float alpha = fres * uIntensity;
            gl_FragColor = vec4(uColor * (0.6 + fres), alpha);
          }
        `,
      }),
    [],
  );

  useFrame((state, dt) => {
    const p = handle.progressRef.current;
    const lp = stageProgress(p, 0.22, 0.7);
    const ambientLp = stageProgress(p, 0, 0.7); // visible from start
    const t = state.clock.elapsedTime;

    if (glowRef.current) {
      const s = 3.4 + ambientLp * 1.6;
      glowRef.current.scale.setScalar(s);
      glowRef.current.rotation.y += dt * 0.06;
      glowMaterial.uniforms.uIntensity.value = 0.32 + ambientLp * 0.4;
    }
    if (wireRef.current) {
      const s = 0.18 + lp * 2.0;
      wireRef.current.scale.setScalar(s);
      wireRef.current.rotation.y += dt * 0.16;
      wireRef.current.rotation.x = Math.sin(t * 0.22) * 0.18;
      const mat = wireRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = lp * 0.45;
    }
    if (coreRef.current) {
      const s = 0.05 + Math.pow(lp, 2) * 0.85;
      coreRef.current.scale.setScalar(s);
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + lp * 0.55;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.35;
      ringRef.current.scale.setScalar(0.6 + lp * 2.0);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = lp * 0.28;
    }
  });

  return (
    <group position={[0, 0, -30]}>
      {/* Volumetric soft-light glow (Fresnel back-side) — always present */}
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>
      {/* Wireframe icosahedron — architecture hint */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#B8916A" wireframe transparent opacity={0} />
      </mesh>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#F2EAD3" transparent opacity={0} />
      </mesh>
      {/* Orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.3, 128]} />
        <meshBasicMaterial color="#B8916A" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
