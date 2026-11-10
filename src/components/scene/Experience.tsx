"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import Character from "./Character";

const CHARACTER_CONFIG = {
  position: [0, -1.33, 0] as [number, number, number],
  scale: 1.1,
  rotation: [0, 0, 0] as [number, number, number],
};

const CAMERA_CONFIG = {
  position: [0, 0, 1] as [number, number, number],
  fov: 40,
  target: [0, 1.4, 0] as [number, number, number],
};

interface ExperienceProps {
  spinCharacter: boolean;
}

export default function Experience({ spinCharacter }: ExperienceProps) {
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
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
        gl.shadowMap.type = THREE.VSMShadowMap;
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0002}
          shadow-normalBias={0.03}
          shadow-radius={4}
        />

        <pointLight
          position={[-3, 2, -2]}
          color="#7deaff"
          intensity={10}
          distance={8}
        />

        <pointLight position={[3, 1, 2]} intensity={2.5} distance={10} />

        <hemisphereLight args={["#dceeff", "#101820", 0.8]} />

        {/* Character configuration */}
        <Character
          position={CHARACTER_CONFIG.position}
          scale={CHARACTER_CONFIG.scale}
          rotation={CHARACTER_CONFIG.rotation}
          spin={spinCharacter}
        />
      </Suspense>
    </Canvas>
  );
}
