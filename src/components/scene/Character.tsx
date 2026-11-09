"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/character.glb";

interface CharacterProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export default function Character({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: CharacterProps) {
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

useGLTF.preload(MODEL_PATH);
