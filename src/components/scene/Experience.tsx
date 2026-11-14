"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import Character from "./Character";

const CHARACTER_CONFIG = {
  position: [0, -0.02, 0] as [number, number, number],
  scale: 1.2,
  rotation: [0, 0, 0] as [number, number, number],
};

const CAMERA_CONFIG = {
  position: [0, 1, 1] as [number, number, number],
  fov: 40,
  target: [0, 1.4, 0] as [number, number, number],
};

interface ExperienceProps {
  spinCharacter: boolean;
  transitionProgress: {
    current: { value: number };
  };
}

function SceneController({
  spinCharacter,
  transitionProgress,
}: ExperienceProps) {
  const characterRef = useRef<THREE.Group>(null);

  useFrame(({ camera, size }) => {
    const progress = transitionProgress.current.value;
    const character = characterRef.current;

    if (!character) return;

    const isMobile = size.width < 768;

    // Zoom first, then settle
    const zoomProgress = THREE.MathUtils.smoothstep(progress, 0, 0.45);

    const settleProgress = THREE.MathUtils.smoothstep(progress, 0.35, 1);

    // Keep character on-screen on every viewport
    const desktopX = THREE.MathUtils.lerp(0, -0.35, settleProgress);
    const mobileX = THREE.MathUtils.lerp(0, 0, settleProgress);
    const desktopRotateY = Math.PI / 2;
    const mobileRotateY = Math.PI * 2;

    character.position.x = isMobile ? mobileX : desktopX;
    const characterRotateY = isMobile ? mobileRotateY : desktopRotateY;

    // Zoom
    const zoomScale = THREE.MathUtils.lerp(
      CHARACTER_CONFIG.scale,
      CHARACTER_CONFIG.scale * 1.25,
      zoomProgress,
    );

    const finalScale = THREE.MathUtils.lerp(
      zoomScale,
      CHARACTER_CONFIG.scale,
      settleProgress,
    );

    character.scale.setScalar(finalScale);

    // Rotate sideways
    character.rotation.y = THREE.MathUtils.lerp(
      0,
      characterRotateY,
      settleProgress,
    );

    // Camera reframing: preserve the original framing on mobile
    camera.position.x = isMobile
      ? CAMERA_CONFIG.position[0]
      : THREE.MathUtils.lerp(0, 0.1, settleProgress);

    camera.lookAt(
      isMobile ? 0 : THREE.MathUtils.lerp(0, 0.1, settleProgress),
      CAMERA_CONFIG.target[1],
      CAMERA_CONFIG.target[2],
    );
  });

  return (
    <>
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

      <Character
        groupRef={characterRef}
        position={CHARACTER_CONFIG.position}
        scale={CHARACTER_CONFIG.scale}
        rotation={CHARACTER_CONFIG.rotation}
        spin={spinCharacter}
      />
    </>
  );
}

export default function Experience(props: ExperienceProps) {
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
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
        gl.shadowMap.type = THREE.VSMShadowMap;

        camera.lookAt(...CAMERA_CONFIG.target);
      }}
    >
      <Suspense fallback={null}>
        <SceneController {...props} />
      </Suspense>
    </Canvas>
  );
}
