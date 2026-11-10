"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/character.glb";

interface CharacterProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  spin?: boolean;
}

export default function Character({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  spin = false,
}: CharacterProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
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
            material.roughnessMap = material.roughnessMap;
            material.normalScale.set(0.85, 0.85);
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.elapsedTime;

    // Full 360-degree intro spin
    if (spin) {
      if (spinStartRef.current === null) {
        spinStartRef.current = time;
      }

      const progress = Math.min((time - spinStartRef.current) / 1.3, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      group.rotation.y = rotation[1] + easedProgress * Math.PI * 2;
    } else {
      spinStartRef.current = null;
      group.rotation.y = rotation[1];
    }

    // Subtle breathing
    group.position.y = position[1] + Math.sin(time * 1.2) * 0.015;

    // Gentle sway after the spin
    if (spin && spinStartRef.current !== null) {
      const elapsed = time - spinStartRef.current;

      if (elapsed >= 1.3) {
        group.rotation.y =
          rotation[1] + Math.PI * 2 + Math.sin(time * 0.7) * 0.025;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
