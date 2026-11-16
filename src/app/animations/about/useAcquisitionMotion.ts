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
      // Measure the exact inner visual container so drift/padding never skews the center
      const targetVisual =
        visualRefs.current[index] ?? targetRefs.current[index];

      if (!rig || !marker || !root || !targetVisual) return;

      gsap.killTweensOf([marker, rig, orbitRef.current]);

      // Ensure reticle is visible and background is sharp while searching
      gsap.to(marker, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "power2.out",
        });
      }

      const search = gsap.timeline();

      // Quick reticle scan hops before locking onto target
      for (let i = 0; i < 3; i++) {
        const x = gsap.utils.random(-90, 90);
        const y = gsap.utils.random(-70, 70);

        search.to(marker, {
          left: x,
          top: y,
          duration: gsap.utils.random(0.18, 0.28),
          ease: "sine.inOut",
        });
      }

      search.call(() => {
        pauseBackground();

        // Reset rig transform momentarily before measuring to guarantee exact 1:1 local coordinates
        const currentScale = Number(gsap.getProperty(rig, "scale")) || 1;
        const currentX = Number(gsap.getProperty(rig, "x")) || 0;
        const currentY = Number(gsap.getProperty(rig, "y")) || 0;

        const targetRect = targetVisual.getBoundingClientRect();
        const rigRect = rig.getBoundingClientRect();

        // Exact local offset of the target's true center relative to cameraRig's (0,0) origin
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const rigOriginX = rigRect.left + rigRect.width / 2;
        const rigOriginY = rigRect.top + rigRect.height / 2;

        const localX = (targetCenterX - rigOriginX) / currentScale;
        const localY = (targetCenterY - rigOriginY) / currentScale;

        const alignment = gsap.timeline({
          onComplete: () => {
            // Once locked: hide reticle & blur/dim the background orbit so the focused target stands alone
            gsap.to(marker, {
              autoAlpha: 0,
              scale: 1.25,
              duration: 0.3,
              ease: "power2.in",
            });

            if (orbitRef.current) {
              gsap.to(orbitRef.current, {
                opacity: 0.12,
                filter: "blur(8px)",
                duration: 0.45,
                ease: "power2.out",
              });
            }

            onLocked?.();
          },
        });

        // 1. Snap reticle dead-center onto the target's exact local coordinates
        alignment.to(marker, {
          left: localX,
          top: localY,
          duration: 0.55,
          ease: "power3.inOut",
        });

        // 2. Zoom & center camera rig onto that exact point
        alignment.to(
          rig,
          {
            x: currentX - localX * zoomScale,
            y: currentY - localY * zoomScale,
            scale: zoomScale,
            duration: 0.85,
            ease: "power3.inOut",
          },
          "-=0.1",
        );
      });

      return search;
    },
    [
      cameraRigRef,
      orbitRef,
      reticleMarkerRef,
      rootRef,
      targetRefs,
      visualRefs,
      pauseBackground,
      zoomScale,
    ],
  );

  const release = useCallback(
    (onReleased?: () => void) => {
      const rig = cameraRigRef.current;
      const marker = reticleMarkerRef.current;

      if (!rig || !marker) return;

      gsap.killTweensOf([marker, rig, orbitRef.current]);

      const timeline = gsap.timeline({
        onComplete: () => {
          resumeBackground();
          onReleased?.();
        },
      });

      // Bring back the reticle & clear background blur for the next search
      timeline.to(
        marker,
        {
          autoAlpha: 1,
          scale: 1,
          left: 0,
          top: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0,
      );

      if (orbitRef.current) {
        timeline.to(
          orbitRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
          0,
        );
      }

      timeline.to(
        rig,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0,
      );

      return timeline;
    },
    [cameraRigRef, orbitRef, reticleMarkerRef, resumeBackground],
  );

  return { acquire, release };
}
