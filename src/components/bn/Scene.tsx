"use client";

import { useFrame, useThree } from "@react-three/fiber";
import StarField from "./StarField";
import CoreOrb from "./CoreOrb";
import type { ZJourneyHandle } from "./useZJourney";

const CAMERA_Z_START = 6;
const CAMERA_Z_END = -54;

export default function Scene({ handle }: { handle: ZJourneyHandle }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = handle.progressRef.current;
    const z = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * p;
    camera.position.z = z;
    const vel = handle.velocityRef.current;
    camera.position.x = Math.sin(p * Math.PI * 2) * 0.18 + vel * 0.04;
    camera.position.y = Math.cos(p * Math.PI * 1.6) * 0.12;
    camera.lookAt(0, 0, z - 6);
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[0, 0, 4]} intensity={1.25} color="#9FB3C8" distance={22} />
      <StarField handle={handle} />
      <CoreOrb handle={handle} />
    </>
  );
}
