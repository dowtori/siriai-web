"use client";

import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * V4 Hero 배경 — GLSL 안개/오로라 + luminous core (원본 구현, 단독 안정본).
 * 풀스크린 plane(클립공간 정점) + frustumCulled=false. ssr:false 전용.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime; uniform vec2 uMouse; uniform vec2 uRes;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
  float noise(vec2 p){ vec2 i=floor(p),f=fract(p);
    float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
  float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5;} return v; }
  void main(){
    float aspect=uRes.x/max(uRes.y,1.0);
    vec2 p=vec2((vUv.x-0.5)*aspect, vUv.y-0.5);
    vec2 m=uMouse*0.12; float t=uTime*0.025;
    float q=fbm(p*2.1+vec2(t,t*0.6)+m);
    float n=fbm(p*2.1+q*1.6+vec2(-t*0.5,t*0.45)+m);
    vec3 base=vec3(0.043,0.059,0.078); vec3 glow=vec3(0.34,0.58,0.86);
    float r=length(p);
    float vig=smoothstep(1.05,0.10,r); float core=smoothstep(0.70,0.0,r);
    float mist=smoothstep(0.28,0.92,n);
    vec3 col=base; col+=glow*mist*vig*1.15; col+=glow*core*(0.18+0.10*n); col*=mix(0.5,1.0,vig);
    gl_FragColor=vec4(col,1.0);
  }
`;

function Aurora() {
  const { pointer, size } = useThree();
  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() }, uRes: { value: new THREE.Vector2(1, 1) } },
    depthTest: false, depthWrite: false,
  }), []);
  useFrame((_, d) => {
    const u = mat.uniforms;
    u.uTime.value += Math.min(d, 0.05);
    u.uMouse.value.x += (pointer.x - u.uMouse.value.x) * 0.03;
    u.uMouse.value.y += (pointer.y - u.uMouse.value.y) * 0.03;
    u.uRes.value.set(size.width, size.height);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

export default function V4HeroScene() {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: false }} onCreated={({ gl }) => gl.setClearColor("#0b0f14", 1)}>
      <Aurora />
    </Canvas>
  );
}
