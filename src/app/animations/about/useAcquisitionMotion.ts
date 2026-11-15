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
  zoomScale = 1.45,
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

      gsap.killTweensOf([marker, rig]);

      const search = gsap.timeline();

      // Quick reticle scan hops before locking onto target
      for (let i = 0; i < 3; i++) {
        const x = gsap.utils.random(-95, 95);
        const y = gsap.utils.random(-75, 75);

        search.to(marker, {
          left: x,
          top: y,
          duration: gsap.utils.random(0.16, 0.28),
          ease: "sine.inOut",
        });
      }

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

        alignment.to(marker, {
          left: x,
          top: y,
          duration: 0.65,
          ease: "power3.inOut",
        });

        alignment.to(
          rig,
          {
            x: -x * zoomScale,
            y: -y * zoomScale,
            scale: zoomScale,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "-=0.1",
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

      // Kill any active acquire/search tweens so reset never fights in-flight hops
      gsap.killTweensOf([marker, rig]);

      const timeline = gsap.timeline({
        onComplete: () => {
          resumeBackground();
          onReleased?.();
        },
      });

      timeline.to(
        rig,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0,
      );

      timeline.to(
        marker,
        {
          left: 0,
          top: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0,
      );

      return timeline;
    },
    [cameraRigRef, reticleMarkerRef, resumeBackground],
  );

  return { acquire, release };
}
