"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/character.glb";

interface CharacterProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  spin?: boolean;
  groupRef?: RefObject<THREE.Group | null>;
}

export default function Character({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  spin = false,
  groupRef,
}: CharacterProps) {
  const { scene } = useGLTF(MODEL_PATH);

  const idleGroupRef = useRef<THREE.Group>(null);
  const spinStartRef = useRef<number | null>(null);

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.metalnessMap = null;
            material.metalness = 0;
            material.roughness = 0.75;
            material.normalScale.set(0.85, 0.85);
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const group = idleGroupRef.current;
    if (!group) return;

    const time = clock.elapsedTime;

    if (spin) {
      if (spinStartRef.current === null) {
        spinStartRef.current = time;
      }

      const progress = Math.min((time - spinStartRef.current) / 1.3, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      group.rotation.y = easedProgress * Math.PI * 2;
    } else {
      spinStartRef.current = null;
      group.rotation.y = 0;
    }

    // Breathing
    group.position.y = Math.sin(time * 1.2) * 0.015;

    // Idle sway
    if (spin && spinStartRef.current !== null) {
      const elapsed = time - spinStartRef.current;

      if (elapsed >= 1.3) {
        group.rotation.y = Math.PI * 2 + Math.sin(time * 0.7) * 0.025;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <group ref={idleGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
