"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * V4 Hero 3D 씬 — WebGL 깊이 (원본 구현).
 * 노드 래티스(지능/구조 은유) + 깊이 더스트 + fog + bloom + 스크롤 카메라 돌리 + 마우스 패럴랙스.
 * ssr:false 동적 임포트 전용 (V4HeroV2에서 로드).
 */
const GLOW = "#5b8cc8";
const NODE_N = 260;
const NODE_R = 2.25;
const NEIGHBORS = 3;
const DUST_N = 1500;

function buildNodes() {
  const pos = new Float32Array(NODE_N * 3);
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_N; i++) {
    const y = 1 - (i / (NODE_N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const v = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(NODE_R);
    pts.push(v);
    pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
  }
  const seg: number[] = [];
  for (let i = 0; i < pts.length; i++) {
    const d = pts
      .map((p, j) => ({ j, dist: p.distanceTo(pts[i]) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, NEIGHBORS);
    for (const { j } of d) if (j > i) seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
  }
  return { pos, lines: new Float32Array(seg) };
}

function buildDust() {
  const pos = new Float32Array(DUST_N * 3);
  for (let i = 0; i < DUST_N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 18;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = -2 - Math.random() * 12;
  }
  return pos;
}

function Scene({ progress, reduce }: { progress: React.MutableRefObject<number>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);
  const { camera, pointer } = useThree();
  const node = useMemo(buildNodes, []);
  const dustPos = useMemo(buildDust, []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const p = progress.current;
    if (group.current) {
      if (!reduce) {
        group.current.rotation.y += d * 0.045;
        group.current.rotation.x += (pointer.y * 0.18 - group.current.rotation.x) * 0.04;
        group.current.position.x += (pointer.x * 0.4 - group.current.position.x) * 0.04;
      }
      group.current.scale.setScalar(0.92 + p * 0.16);
    }
    if (dust.current && !reduce) dust.current.rotation.y -= d * 0.012;
    const targetZ = reduce ? 6 : 6 - p * 1.9;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#0b0f14", 6.5, 17]} />
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color={GLOW} transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[node.lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={GLOW} transparent opacity={0.14} depthWrite={false} blending={THREE.AdditiveBlending} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[node.pos, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.07} color={"#cfe0ff"} transparent opacity={0.95} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>
      <EffectComposer>
        <Bloom intensity={0.85} luminanceThreshold={0.06} luminanceSmoothing={0.25} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export default function V4HeroScene({ progress, reduce }: { progress: React.MutableRefObject<number>; reduce: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor("#0b0f14", 1)}
    >
      <Scene progress={progress} reduce={reduce} />
    </Canvas>
  );
}
