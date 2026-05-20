"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stageProgress, type ZJourneyHandle } from "./useZJourney";

export default function CoreOrb({ handle }: { handle: ZJourneyHandle }) {
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    const p = handle.progressRef.current;
    const lp = stageProgress(p, 0.22, 0.7);
    const t = state.clock.elapsedTime;

    if (wireRef.current) {
      const s = 0.2 + lp * 2.2;
      wireRef.current.scale.setScalar(s);
      wireRef.current.rotation.y += dt * 0.18;
      wireRef.current.rotation.x = Math.sin(t * 0.25) * 0.2;
      const mat = wireRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = lp * 0.55;
    }
    if (coreRef.current) {
      const s = 0.06 + Math.pow(lp, 2) * 0.9;
      coreRef.current.scale.setScalar(s);
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + lp * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.4;
      ringRef.current.scale.setScalar(0.6 + lp * 2.0);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = lp * 0.35;
    }
  });

  return (
    <group position={[0, 0, -30]}>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.32, 96]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
