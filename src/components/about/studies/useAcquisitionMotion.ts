"use client";

import { useCallback } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type AcquisitionOptions = {
  rootRef: RefObject<HTMLElement | null>;
  cameraRigRef: RefObject<HTMLDivElement | null>;
  orbitRef: RefObject<HTMLDivElement | null>;
  targetRefs: RefObject<(HTMLDivElement | null)[]>;
  floatRefs: RefObject<(HTMLDivElement | null)[]>;
  visualRefs: RefObject<(HTMLDivElement | null)[]>;
  reticleMarkerRef: RefObject<HTMLDivElement | null>;
  zoomScale?: number;
};

export function useAcquisitionMotion({
  rootRef,
  cameraRigRef,
  orbitRef,
  targetRefs,
  floatRefs,
  visualRefs,
  reticleMarkerRef,
  zoomScale = 1.5,
}: AcquisitionOptions) {
  const pauseBackground = useCallback(() => {
    const elements = [
      orbitRef.current,
      ...visualRefs.current,
      ...floatRefs.current,
    ];

    elements.forEach((element) => {
      if (!element) return;
      gsap.getTweensOf(element).forEach((tween) => tween.pause());
    });
  }, [orbitRef, visualRefs, floatRefs]);

  const resumeBackground = useCallback(() => {
    const elements = [
      orbitRef.current,
      ...visualRefs.current,
      ...floatRefs.current,
    ];

    elements.forEach((element) => {
      if (!element) return;
      gsap.getTweensOf(element).forEach((tween) => tween.resume());
    });
  }, [orbitRef, visualRefs, floatRefs]);

  const acquire = useCallback(
    (index: number, onLocked?: () => void) => {
      const rig = cameraRigRef.current;
      const marker = reticleMarkerRef.current;
      const root = rootRef.current;
      const target = targetRefs.current[index];

      if (!rig || !marker || !root || !target) return;

      // Prevent an old acquisition animation from interfering.
      gsap.killTweensOf(marker);
      gsap.killTweensOf(rig);

      const search = gsap.timeline();

      // The reticle hesitates and explores before committing.
      for (let i = 0; i < 5; i++) {
        const x = gsap.utils.random(-110, 110);
        const y = gsap.utils.random(-85, 85);

        search.to(marker, {
          left: x,
          top: y,
          duration: gsap.utils.random(0.22, 0.48),
          ease: "sine.inOut",
        });
      }

      // Pause the environment before final alignment.
      search.call(() => {
        pauseBackground();

        const targetRect = target.getBoundingClientRect();
        const rigRect = rig.getBoundingClientRect();

        const x =
          targetRect.left +
          targetRect.width / 2 -
          (rigRect.left + rigRect.width / 2);

        const y =
          targetRect.top +
          targetRect.height / 2 -
          (rigRect.top + rigRect.height / 2);

        const alignment = gsap.timeline({
          onComplete: onLocked,
        });

        // Reticle moves onto the selected illustration.
        alignment.to(marker, {
          left: x,
          top: y,
          duration: 0.9,
          ease: "power3.inOut",
        });

        // Both now move together into the centre of the viewport.
        alignment.to(
          rig,
          {
            x: -x * zoomScale,
            y: -y * zoomScale,
            scale: zoomScale,
            duration: 1.35,
            ease: "power3.inOut",
          },
          "-=0.15",
        );
      });

      return search;
    },
    [
      cameraRigRef,
      reticleMarkerRef,
      rootRef,
      targetRefs,
      pauseBackground,
      zoomScale,
    ],
  );

  const release = useCallback(
    (onReleased?: () => void) => {
      const rig = cameraRigRef.current;
      const marker = reticleMarkerRef.current;

      if (!rig || !marker) return;

      const timeline = gsap.timeline({
        onComplete: () => {
          resumeBackground();
          onReleased?.();
        },
      });

      // Return the entire camera rig to its scanning position.
      timeline.to(rig, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut",
      });

      // Return the reticle to its default position.
      timeline.to(marker, {
        left: 0,
        top: 0,
        duration: 0.55,
        ease: "power2.inOut",
      });

      return timeline;
    },
    [cameraRigRef, reticleMarkerRef, resumeBackground],
  );

  return { acquire, release };
}
