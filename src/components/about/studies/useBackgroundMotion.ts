"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type ElementRef<T extends HTMLElement> = {
  current: T | null;
};

type ElementArrayRef<T extends HTMLElement> = {
  current: (T | null)[];
};

type BackgroundMotionOptions = {
  rootRef: ElementRef<HTMLElement>;
  orbitRef: ElementRef<HTMLDivElement>;
  visualRefs: ElementArrayRef<HTMLDivElement>;
  floatRefs: ElementArrayRef<HTMLDivElement>;
  reticleRef: ElementRef<HTMLDivElement>;
  orbitDuration?: number;
};

export function useBackgroundMotion({
  rootRef,
  orbitRef,
  visualRefs,
  floatRefs,
  reticleRef,
  orbitDuration = 90,
}: BackgroundMotionOptions) {
  useGSAP(
    () => {
      const orbit = orbitRef.current;
      const reticle = reticleRef.current;

      if (!orbit || !reticle) return;

      // Continuous orbital rotation.
      gsap.to(orbit, {
        rotationZ: -360,
        duration: orbitDuration,
        ease: "none",
        repeat: -1,
      });

      // Counter-rotate each illustration so it remains upright.
      visualRefs.current.forEach((visual) => {
        if (!visual) return;

        gsap.to(visual, {
          rotationZ: 360,
          duration: orbitDuration,
          ease: "none",
          repeat: -1,
        });
      });

      // Subtle, independent movement for each illustration.
      floatRefs.current.forEach((element, index) => {
        if (!element) return;

        const direction = index % 2 === 0 ? 1 : -1;

        const drift = gsap.timeline({
          repeat: -1,
          yoyo: true,
          delay: index * 0.85,
        });

        drift
          .to(element, {
            x: direction * (9 + index * 2),
            y: -12 - index * 2,
            rotationZ: direction * 1.4,
            duration: 4.1 + index * 0.8,
            ease: "sine.inOut",
          })
          .to(element, {
            x: -direction * 8,
            y: 10 + index,
            rotationZ: -direction * 1.1,
            duration: 4.5 + index * 0.6,
            ease: "sine.inOut",
          });
      });

      // Gentle reticle breathing.
      gsap.to(reticle, {
        scale: 1.035,
        opacity: 0.78,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { dependencies: [], revertOnUpdate: false },
  );
}
