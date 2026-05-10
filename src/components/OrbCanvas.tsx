"use client";

import { useRef, useMemo, useEffect } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N             = 160;
const SPHERE_R      = 1.8;
const SURFACE_K     = 0.008;    // 구 표면으로 당기는 스프링
const SWIRL         = 0.000020; // 느린 자전 (Y축 회전력)
const CONNECT_D     = 0.90;
const CONNECT_D2    = CONNECT_D * CONNECT_D;
const REPEL_D       = 0.40;
const REPEL_D2      = REPEL_D * REPEL_D;
const MAX_SIGNALS   = 4;
const SIGNAL_HOPS   = 8;
const SIGNAL_DELAY  = 18;
const SIGNAL_SPAWN  = 80;
const GLOW_DECAY    = 0.94;

const HEAT_RADIUS   = 0.65;
const HEAT_RADIUS2  = HEAT_RADIUS * HEAT_RADIUS;
const HEAT_RATE     = 0.020;
const HEAT_DECAY    = 0.974;
const CRYSTAL_MID   = 0.45;


const VERT = /* glsl */`
  attribute float glow;
  attribute float heat;
  varying  float vGlow;
  varying  float vHeat;
  varying  float vDepth;
  uniform  float uSphereR;
  void main() {
    vGlow  = glow;
    vHeat  = heat;
    // vDepth: 0 = 뒷면, 1 = 앞면
    vDepth = clamp(position.z / uSphereR * 0.5 + 0.5, 0.0, 1.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float h2 = heat * heat;
    gl_PointSize = (0.14 + glow * 0.30 + h2 * 0.20) * 420.0 / -mv.z;
    gl_Position  = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */`
  uniform sampler2D dotTex;
  varying float vGlow;
  varying float vHeat;
  varying float vDepth;
  void main() {
    vec4 t = texture2D(dotTex, gl_PointCoord);
    if (t.a < 0.01) discard;
    vec3 base = vec3(0.14, 0.10, 0.35);   // 어두운 인디고
    vec3 lit  = vec3(0.65, 0.42, 0.95);   // 바이올렛 (신호)
    vec3 hot  = vec3(0.95, 0.62, 0.18);   // 앰버 (열)
    vec3 col  = mix(base, lit, vGlow);
    col       = mix(col, hot, vHeat * vHeat);
    // 뒷면은 불투명도 줄어 3D 구 형태 강조
    float df  = 0.28 + vDepth * 0.72;
    float a   = t.a * (0.55 + vGlow * 0.45 + vHeat * vHeat * 0.30) * df;
    gl_FragColor = vec4(col, a);
  }
`;

type MousePos = { x: number; y: number };
type Signal   = { node: number; timer: number; hops: number };

function Network({ mouse }: { mouse: MutableRefObject<MousePos> }) {
  const signals    = useRef<Signal[]>([]);
  const spawnTimer = useRef(0);

  const { points, lines, pos, vel, lnBuf, lnCol, glowArr, heatArr } = useMemo(() => {
    const pos     = new Float32Array(N * 3);
    const vel     = new Float32Array(N * 3);
    const lnBuf   = new Float32Array(N * N * 3);
    const lnCol   = new Float32Array(N * N * 3);
    const glowArr = new Float32Array(N);
    const heatArr = new Float32Array(N);

    // Fibonacci 구 분포 — 균등한 표면 커버리지
    for (let i = 0; i < N; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pos[i*3]     = SPHERE_R * Math.sin(phi) * Math.cos(theta);
      pos[i*3 + 1] = SPHERE_R * Math.sin(phi) * Math.sin(theta);
      pos[i*3 + 2] = SPHERE_R * Math.cos(phi);
      vel[i*3]     = (Math.random() - 0.5) * 0.002;
      vel[i*3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i*3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const c2 = cv.getContext("2d")!;
    const g  = c2.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0,    "rgba(255,255,255,1)");
    g.addColorStop(0.40, "rgba(255,255,255,0.60)");
    g.addColorStop(1,    "rgba(255,255,255,0)");
    c2.fillStyle = g;
    c2.fillRect(0, 0, 64, 64);
    const dot = new THREE.CanvasTexture(cv);

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pos,     3));
    ptGeo.setAttribute("glow",     new THREE.BufferAttribute(glowArr, 1));
    ptGeo.setAttribute("heat",     new THREE.BufferAttribute(heatArr, 1));

    const ptMat = new THREE.ShaderMaterial({
      uniforms:       { dotTex: { value: dot }, uSphereR: { value: SPHERE_R } },
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
    });

    const lnGeo = new THREE.BufferGeometry();
    lnGeo.setAttribute("position", new THREE.BufferAttribute(lnBuf, 3));
    lnGeo.setAttribute("color",    new THREE.BufferAttribute(lnCol, 3));
    lnGeo.setDrawRange(0, 0);

    const lnMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent:  true,
      opacity:      0.50,
      depthWrite:   false,
    });

    return {
      points: new THREE.Points(ptGeo, ptMat),
      lines:  new THREE.LineSegments(lnGeo, lnMat),
      pos, vel, lnBuf, lnCol, glowArr, heatArr,
    };
  }, []);

  useEffect(() => {
    const seed = Math.floor(Math.random() * N);
    glowArr[seed] = 1.0;
    signals.current.push({ node: seed, timer: SIGNAL_DELAY, hops: SIGNAL_HOPS });
    return () => {
      points.geometry.dispose();
      lines.geometry.dispose();
      (points.material as THREE.ShaderMaterial).uniforms.dotTex.value.dispose();
      (points.material as THREE.Material).dispose();
      (lines.material  as THREE.Material).dispose();
    };
  }, [points, lines, glowArr]);

  useFrame(() => {
    const mx = mouse.current.x * 2.5;
    const my = mouse.current.y * 2.5;

    // ── 파티클 물리 + 열 누적 ────────────────────────────────────
    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;
      const x = pos[ix], y = pos[iy], z = pos[iz];

      // 표면 스프링: 구 반지름 유지
      const dist = Math.sqrt(x*x + y*y + z*z) || 0.001;
      const dr   = dist - SPHERE_R;
      const nx   = x/dist, ny = y/dist, nz = z/dist;
      vel[ix] -= nx * dr * SURFACE_K;
      vel[iy] -= ny * dr * SURFACE_K;
      vel[iz] -= nz * dr * SURFACE_K;

      // 접선 방향 브라운 노이즈 (구 표면을 따라 이동)
      const rx = (Math.random()-0.5)*0.00028;
      const ry = (Math.random()-0.5)*0.00028;
      const rz = (Math.random()-0.5)*0.00028;
      const rd = rx*nx + ry*ny + rz*nz;
      vel[ix] += rx - rd*nx;
      vel[iy] += ry - rd*ny;
      vel[iz] += rz - rd*nz;

      // 느린 자전 (Y축 기준)
      vel[ix] += -z * SWIRL;
      vel[iz] +=  x * SWIRL;

      vel[ix] *= 0.984; vel[iy] *= 0.984; vel[iz] *= 0.984;
      pos[ix] += vel[ix]; pos[iy] += vel[iy]; pos[iz] += vel[iz];

      // 열 누적 (2D 스크린 근접도 기반)
      const hx = mx - pos[ix], hy = my - pos[iy];
      const hd2 = hx*hx + hy*hy;
      if (hd2 < HEAT_RADIUS2) {
        heatArr[i] = Math.min(1.0, heatArr[i] + HEAT_RATE * (1 - Math.sqrt(hd2) / HEAT_RADIUS));
      } else {
        heatArr[i] *= HEAT_DECAY;
      }
    }

    // ── Glow 감쇠 + 열 기반 최소 밝기 ───────────────────────────
    for (let i = 0; i < N; i++) {
      glowArr[i] *= GLOW_DECAY;
      if (heatArr[i] > 0.1) glowArr[i] = Math.max(glowArr[i], heatArr[i] * heatArr[i] * 0.60);
    }

    // ── 신호 생성 (열점 우선) ─────────────────────────────────────
    spawnTimer.current++;
    if (spawnTimer.current >= SIGNAL_SPAWN && signals.current.length < MAX_SIGNALS) {
      spawnTimer.current = 0;
      let bestHeat = -1, seed = Math.floor(Math.random() * N);
      for (let i = 0; i < N; i++) {
        if (heatArr[i] > bestHeat && Math.random() < 0.6) { bestHeat = heatArr[i]; seed = i; }
      }
      glowArr[seed] = 1.0;
      signals.current.push({ node: seed, timer: SIGNAL_DELAY, hops: SIGNAL_HOPS });
    }

    // ── 신호 전파 (3D 거리, 열점 경유 우선) ──────────────────────
    signals.current = signals.current.filter(sig => {
      sig.timer--;
      if (sig.timer > 0) return true;
      const nbrs: number[] = [];
      for (let j = 0; j < N; j++) {
        if (j === sig.node) continue;
        const dx = pos[sig.node*3]   - pos[j*3];
        const dy = pos[sig.node*3+1] - pos[j*3+1];
        const dz = pos[sig.node*3+2] - pos[j*3+2];
        if (dx*dx + dy*dy + dz*dz < CONNECT_D2) nbrs.push(j);
      }
      if (!nbrs.length || sig.hops <= 0) return false;
      let next: number;
      const hasHotNbr = nbrs.some(j => heatArr[j] > CRYSTAL_MID);
      if (hasHotNbr) {
        let total = 0;
        for (const j of nbrs) total += 1 + heatArr[j] * 3;
        let rnd = Math.random() * total;
        next = nbrs[nbrs.length - 1];
        for (const j of nbrs) { rnd -= (1 + heatArr[j] * 3); if (rnd <= 0) { next = j; break; } }
      } else {
        next = nbrs[Math.floor(Math.random() * nbrs.length)];
      }
      glowArr[next] = 1.0;
      sig.node = next; sig.timer = SIGNAL_DELAY; sig.hops--;
      return true;
    });

    (points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (points.geometry.attributes.glow     as THREE.BufferAttribute).needsUpdate = true;
    (points.geometry.attributes.heat     as THREE.BufferAttribute).needsUpdate = true;

    // ── 연결선 + 반발 (O(N²), 깊이 페이드 포함) ──────────────────
    let vi = 0;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i*3]   - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const d2 = dx*dx + dy*dy + dz*dz;

        if (d2 < CONNECT_D2) {
          const sigBright = Math.max(glowArr[i], glowArr[j]);
          const heatLevel = Math.min(1.0, (heatArr[i] + heatArr[j]) * 0.8);
          const h2        = heatLevel * heatLevel;
          const bright    = Math.max(sigBright, h2 * 0.75);

          // 깊이 페이드: 뒷면 노드 연결선을 어둡게
          const di = Math.max(0.22, pos[i*3+2] / SPHERE_R * 0.40 + 0.62);
          const dj = Math.max(0.22, pos[j*3+2] / SPHERE_R * 0.40 + 0.62);
          const df = (di + dj) * 0.5;

          // 어두운 인디고 → 바이올렛 신호 → 앰버 열
          const cr = (0.15 + bright * 0.70 - h2 * 0.05) * df;
          const cg = (0.08 + bright * 0.52 + h2 * 0.48) * df;
          const cb = (0.38 + bright * 0.60 - h2 * 0.28) * df;

          lnBuf[vi] = pos[i*3]; lnBuf[vi+1] = pos[i*3+1]; lnBuf[vi+2] = pos[i*3+2];
          lnCol[vi] = cr;        lnCol[vi+1] = cg;          lnCol[vi+2] = cb;
          vi += 3;
          lnBuf[vi] = pos[j*3]; lnBuf[vi+1] = pos[j*3+1]; lnBuf[vi+2] = pos[j*3+2];
          lnCol[vi] = cr;        lnCol[vi+1] = cg;          lnCol[vi+2] = cb;
          vi += 3;
        }

        if (d2 < REPEL_D2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const f = (1 - d/REPEL_D) * 0.000038;
          vel[i*3]   += (dx/d)*f; vel[i*3+1] += (dy/d)*f; vel[i*3+2] += (dz/d)*f;
          vel[j*3]   -= (dx/d)*f; vel[j*3+1] -= (dy/d)*f; vel[j*3+2] -= (dz/d)*f;
        }
      }
    }

    lines.geometry.setDrawRange(0, vi / 3);
    (lines.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lines.geometry.attributes.color    as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <primitive object={points} />
      <primitive object={lines}  />
    </>
  );
}

export default function OrbCanvas() {
  const mouse = useRef<MousePos>({ x: 0, y: 0 });

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        mouse.current.y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <Network mouse={mouse} />
      </Canvas>
    </div>
  );
}
