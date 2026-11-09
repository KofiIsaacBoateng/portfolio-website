"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import Character from "./Character";

const CHARACTER_CONFIG = {
  position: [0, 0.05, 0] as [number, number, number],
  scale: 1.1,
  rotation: [0, 0, 0] as [number, number, number],
};

const CAMERA_CONFIG = {
  position: [0, 1, 1] as [number, number, number],
  fov: 40,
  target: [0, 1.4, 0] as [number, number, number],
};

export default function Experience() {
  return (
    <Canvas
      camera={{
        position: CAMERA_CONFIG.position,
        fov: CAMERA_CONFIG.fov,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.7} />

        <directionalLight position={[3, 5, 4]} intensity={2} castShadow />

        <pointLight
          position={[-3, 2, -2]}
          color="#7deaff"
          intensity={18}
          distance={8}
        />

        <pointLight position={[3, 1, 2]} intensity={5} distance={10} />

        <hemisphereLight args={["#dceeff", "#101820", 1.2]} />

        {/* Character configuration */}
        <Character
          position={CHARACTER_CONFIG.position}
          scale={CHARACTER_CONFIG.scale}
          rotation={CHARACTER_CONFIG.rotation}
        />

        <OrbitControls enablePan enableZoom target={CAMERA_CONFIG.target} />
      </Suspense>
    </Canvas>
  );
}
