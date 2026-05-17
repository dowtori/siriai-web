"use client";

// Hero "글자 파편 구체" — 외주 BX 명세 충실 구현
// 컨셉(요약): "다양한 글자의 파편이 형태를 이루어 이미지를 표현",
//            "다양한 철자들이 자유롭게 움직이며 포인트가 되는 구성",
//            마우스 = "시야 왜곡" — 주변 글자들이 자유롭게 밀려나며 흩어짐,
//            "중앙 집중 / 외각으로 갈수록 흐릿" — 사람의 시야 묘사,
//            "차분한 컬러" — 무채색 위주 + 가끔 따뜻한 액센트.
//
// 구현: Three.js InstancedMesh × 글자 atlas 텍스처.
//   - rest position: fibonacci 구 분포(N≈260)
//   - 각 인스턴스: glyph index, scale, rest, current pos/vel
//   - useFrame: spring restore + 마우스 거리 기반 외향 force + 잔잔한 brown noise
//   - fragment: atlas glyph alpha test + 외각 fresnel fade
//   - 마우스는 부모(CHero)에서 0~1 정규화 좌표로 props 전달 → 카메라 평면 unproject

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// 밀도: 진짜 "검은 구체"처럼 dense하게 보이려면 입자 대폭 증가 + 두께 + 큰 글자.
// 1500도 사용자가 "택도없다" 평가 → 3000으로 2배. sphere R는 stage mask 안에 fit하게 축소.
const N = 3000;
const SPHERE_R_MIN = 1.20;
const SPHERE_R_MAX = 1.42;

// 시야 dispersion 파라미터 (sphere 작아진 만큼 조정)
const DISPERSION_RADIUS = 1.00;       // 마우스 영향 반경 (world units)
const DISPERSION_STRENGTH = 0.050;    // 가까울수록 강하게 밀려남
const RESTORE_K = 0.022;              // spring 복귀 강도
const DAMPING = 0.86;                 // 속도 감쇠
const JITTER = 0.0006;                // 상시 미세 떨림 (자연스러움)

// 글자 풀 — 다양한 시각적 부피
const GLYPHS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "0","1","2","3","4","5","6","7","8","9",
  "+","-","·","×","÷","=","≈","∞","◯","◇","◈","◎","∙","·",
  ".",",",":",";","/","\\","|","_",
];

// 글자 atlas Canvas 생성 (8×8 grid, 글자 60개 들어감)
function makeGlyphAtlas(): { texture: THREE.Texture; gridSize: number; tilePx: number } {
  const gridSize = 8;            // 8×8 = 64칸
  const tilePx = 64;             // 각 칸 64×64
  const sizePx = gridSize * tilePx;
  const cv = document.createElement("canvas");
  cv.width = sizePx;
  cv.height = sizePx;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, sizePx, sizePx);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 40px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < GLYPHS.length; i++) {
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    const cx = col * tilePx + tilePx / 2;
    const cy = row * tilePx + tilePx / 2;
    ctx.fillText(GLYPHS[i], cx, cy);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  return { texture: tex, gridSize, tilePx };
}

// fibonacci 구 분포 + 반경 랜덤 (두께/볼륨 부여)
function makeFibSphereWithThickness(n: number, rMin: number, rMax: number): Float32Array {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    // 각 입자에 약간씩 다른 반경 → 표면 두께
    const r = rMin + Math.random() * (rMax - rMin);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
}

const VERT = /* glsl */ `
  attribute vec2 aTile;
  attribute float aScale;
  varying vec2 vTileF;
  varying vec2 vUv;
  varying float vAlpha;
  uniform vec3 uCameraPos;

  void main() {
    vTileF = aTile;
    vUv = uv;

    vec4 instCenter = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec3 toCam = normalize(uCameraPos - instCenter.xyz);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(up, toCam));
    if (length(right) < 0.001) right = vec3(1.0, 0.0, 0.0);
    vec3 newUp = cross(toCam, right);
    vec3 localOffset = right * position.x * aScale + newUp * position.y * aScale;
    vec3 world = instCenter.xyz + localOffset;

    // 깊이 페이드: 뒤쪽 입자는 살짝 흐림. 앞 입자는 100% 진하게.
    float depth01 = clamp(instCenter.z * 0.5 / 1.65 + 0.5, 0.0, 1.0);
    vAlpha = mix(0.55, 1.0, depth01);

    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vTileF;
  varying vec2 vUv;
  varying float vAlpha;
  uniform sampler2D uAtlas;
  uniform float uGrid;
  uniform vec3 uInkA;
  uniform vec3 uInkB;
  uniform float uTime;

  void main() {
    vec2 atlasUv = (vTileF + vec2(vUv.x, 1.0 - vUv.y)) / uGrid;
    float a = texture2D(uAtlas, atlasUv).a;
    if (a < 0.08) discard;

    // 잔잔한 톤 변화 (시간·tile 별)
    float warm = fract(vTileF.x * 0.37 + vTileF.y * 0.29 + uTime * 0.03);
    vec3 col = mix(uInkA, uInkB, smoothstep(0.7, 1.0, warm));

    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

type ParticlesProps = {
  /** 0..1 정규화된 마우스(부모 wrapper 기준). null이면 호버 아님. */
  mouseNorm: React.MutableRefObject<{ x: number; y: number } | null>;
};

function GlyphParticles({ mouseNorm }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, size } = useThree();

  // 인스턴스 메타 (rest pos, 현재 pos, vel, scale, tile)
  const state = useMemo(() => {
    const rest = makeFibSphereWithThickness(N, SPHERE_R_MIN, SPHERE_R_MAX);
    const pos = new Float32Array(rest);
    const vel = new Float32Array(N * 3);
    const tile = new Float32Array(N * 2);
    const scale = new Float32Array(N);
    const glyphCount = GLYPHS.length;
    for (let i = 0; i < N; i++) {
      // 글자는 골고루 분포 + 약간의 무작위 (같은 글자가 뭉치지 않게)
      const gi = Math.floor(Math.random() * glyphCount);
      tile[i * 2] = gi % 8;
      tile[i * 2 + 1] = Math.floor(gi / 8);
      // 크기 다양화 (0.10 ~ 0.32) — 큰 글자가 뼈대, 작은 글자가 밀도 채움
      scale[i] = 0.10 + Math.pow(Math.random(), 1.6) * 0.22;
    }
    return { rest, pos, vel, scale, tile };
  }, []);

  // atlas + material
  const { material, atlas } = useMemo(() => {
    const { texture, gridSize } = makeGlyphAtlas();
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uAtlas: { value: texture },
        uGrid: { value: gridSize },
        uCameraPos: { value: new THREE.Vector3() },
        uInkA: { value: new THREE.Color("#0A0A0A") },   // 진한 잉크 (구체 밀도 강조)
        uInkB: { value: new THREE.Color("#4A453E") },   // 따뜻한 회색 액센트 (약하게)
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
    return { material: mat, atlas: texture };
  }, []);

  // 기하 (plane) 1×1, 인스턴스 attribute 추가
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1);
    g.setAttribute(
      "aTile",
      new THREE.InstancedBufferAttribute(state.tile, 2),
    );
    g.setAttribute(
      "aScale",
      new THREE.InstancedBufferAttribute(state.scale, 1),
    );
    return g;
  }, [state]);

  // 초기 instanceMatrix
  useEffect(() => {
    const m = meshRef.current;
    if (!m) return;
    const mat4 = new THREE.Matrix4();
    for (let i = 0; i < N; i++) {
      mat4.setPosition(state.pos[i * 3], state.pos[i * 3 + 1], state.pos[i * 3 + 2]);
      m.setMatrixAt(i, mat4);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [state]);

  // 마우스 → world (구체 중심 z=0 평면으로 unproject)
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const mouseWorld = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useFrame((_, delta) => {
    // 마우스 정규화 좌표 → world (canvas size 기준 NDC → camera unproject @ z=0)
    const m = mouseNorm.current;
    if (m) {
      // canvas 내부 0..1 → -1..1 (y 반전)
      const ndcX = m.x * 2 - 1;
      const ndcY = -(m.y * 2 - 1);
      tmpVec.set(ndcX, ndcY, 0.5).unproject(camera);
      const dir = tmpVec.sub(camera.position).normalize();
      const t = -camera.position.z / dir.z;
      const wx = camera.position.x + dir.x * t;
      const wy = camera.position.y + dir.y * t;
      mouseWorld.current.x = wx;
      mouseWorld.current.y = wy;
      mouseWorld.current.active = true;
    } else {
      mouseWorld.current.active = false;
    }

    material.uniforms.uCameraPos.value.copy(camera.position);
    material.uniforms.uTime.value += delta;

    // 인스턴스 물리
    const mw = mouseWorld.current;
    const mat4 = new THREE.Matrix4();
    const mesh = meshRef.current!;
    for (let i = 0; i < N; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      // restoring force (spring → rest)
      let fx = (state.rest[ix] - state.pos[ix]) * RESTORE_K;
      let fy = (state.rest[iy] - state.pos[iy]) * RESTORE_K;
      let fz = (state.rest[iz] - state.pos[iz]) * RESTORE_K;

      // mouse dispersion (시야 외각으로 밀어냄)
      if (mw.active) {
        const dx = state.pos[ix] - mw.x;
        const dy = state.pos[iy] - mw.y;
        const dz = state.pos[iz]; // z는 무시 (mouse는 평면)
        const d2 = dx * dx + dy * dy + dz * dz * 0.4;
        const d = Math.sqrt(d2);
        if (d < DISPERSION_RADIUS && d > 0.0001) {
          const falloff = 1 - d / DISPERSION_RADIUS;
          const f = DISPERSION_STRENGTH * falloff * falloff;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
          fz += (dz / d) * f * 0.3; // z 방향 약하게
        }
      }

      // 잔잔한 떨림
      fx += (Math.random() - 0.5) * JITTER;
      fy += (Math.random() - 0.5) * JITTER;
      fz += (Math.random() - 0.5) * JITTER;

      // velocity update
      state.vel[ix] = (state.vel[ix] + fx) * DAMPING;
      state.vel[iy] = (state.vel[iy] + fy) * DAMPING;
      state.vel[iz] = (state.vel[iz] + fz) * DAMPING;

      // position update
      state.pos[ix] += state.vel[ix];
      state.pos[iy] += state.vel[iy];
      state.pos[iz] += state.vel[iz];

      mat4.setPosition(state.pos[ix], state.pos[iy], state.pos[iz]);
      mesh.setMatrixAt(i, mat4);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      atlas.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [atlas, material, geometry]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, N]}
      frustumCulled={false}
    />
  );
}

type Props = {
  mouseNorm: React.MutableRefObject<{ x: number; y: number } | null>;
};

export default function COrbCanvas({ mouseNorm }: Props) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", display: "block" }}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={
        typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1
      }
    >
      <GlyphParticles mouseNorm={mouseNorm} />
    </Canvas>
  );
}
