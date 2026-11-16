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

      // Continuous orbital revolution around the central reticle (0, 0).
      gsap.set(orbit, { transformOrigin: "0px 0px" });
      gsap.to(orbit, {
        rotationZ: -360,
        duration: orbitDuration,
        ease: "none",
        repeat: -1,
        transformOrigin: "0px 0px",
      });

      // Counter-rotate each illustration around its own center so it stays upright.
      visualRefs.current.forEach((visual) => {
        if (!visual) return;

        gsap.set(visual, { transformOrigin: "50% 50%" });
        gsap.to(visual, {
          rotationZ: 360,
          duration: orbitDuration,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });

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

      gsap.to(reticle, {
        scale: 1.035,
        opacity: 0.78,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: rootRef, dependencies: [], revertOnUpdate: false },
  );
}
