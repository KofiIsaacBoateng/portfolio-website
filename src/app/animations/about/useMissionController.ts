"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type MissionPhase = "IDLE" | "ACQUIRING" | "LOCKED" | "RELEASING";

type MissionControllerOptions = {
  rootRef: RefObject<HTMLElement | null>;
  focusVisualRef: RefObject<HTMLDivElement | null>;
  missionCardRef: RefObject<HTMLDivElement | null>;
  studyCount: number;
  acquire: (
    index: number,
    onLocked?: () => void,
  ) => gsap.core.Timeline | undefined;
  release: (onReleased?: () => void) => gsap.core.Timeline | undefined;
};

export function useMissionController({
  focusVisualRef,
  missionCardRef,
  studyCount,
  acquire,
  release,
}: MissionControllerOptions) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<MissionPhase>("IDLE");

  const targetStepRef = useRef(-1);
  const activeStepRef = useRef(-1);
  const phaseRef = useRef<MissionPhase>("IDLE");
  const transitionRef = useRef<(step: number) => void>(() => {});

  const updatePhase = useCallback((next: MissionPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const resetAll = useCallback(() => {
    gsap.killTweensOf([missionCardRef.current, focusVisualRef.current]);
    targetStepRef.current = -1;
    activeStepRef.current = -1;
    setActiveIndex(null);
    updatePhase("IDLE");
    release();
  }, [focusVisualRef, missionCardRef, release, updatePhase]);

  const transitionToStep = useCallback(
    (step: number) => {
      if (step < 0) {
        if (phaseRef.current !== "IDLE" || activeStepRef.current !== -1) {
          resetAll();
        }
        return;
      }

      if (step === activeStepRef.current && phaseRef.current === "LOCKED") {
        return;
      }

      if (phaseRef.current === "IDLE") {
        activeStepRef.current = step;
        updatePhase("ACQUIRING");

        acquire(step, () => {
          if (targetStepRef.current !== step) {
            updatePhase("IDLE");
            transitionRef.current(targetStepRef.current);
            return;
          }
          setActiveIndex(step);
          updatePhase("LOCKED");
        });
        return;
      }

      if (phaseRef.current === "LOCKED") {
        updatePhase("RELEASING");

        const exitTl = gsap.timeline({
          onComplete: () => {
            setActiveIndex(null);
            release(() => {
              updatePhase("IDLE");
              transitionRef.current(targetStepRef.current);
            });
          },
        });

        if (missionCardRef.current) {
          exitTl.to(
            missionCardRef.current,
            {
              y: 24,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            0,
          );
        }

        if (focusVisualRef.current) {
          exitTl.to(
            focusVisualRef.current,
            {
              scale: 0.85,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            0,
          );
        }
      }
    },
    [acquire, focusVisualRef, missionCardRef, release, resetAll, updatePhase],
  );

  useEffect(() => {
    transitionRef.current = transitionToStep;
  }, [transitionToStep]);

  const updateScrollProgress = useCallback(
    (progress: number) => {
      const ABOUT_START = 0.45;
      const ABOUT_END = 0.99;

      if (progress < ABOUT_START || progress > ABOUT_END) {
        targetStepRef.current = -1;
        transitionToStep(-1);
        return;
      }

      const normalized = (progress - ABOUT_START) / (ABOUT_END - ABOUT_START);
      const step = Math.min(
        Math.floor(normalized * studyCount),
        studyCount - 1,
      );

      if (step !== targetStepRef.current) {
        targetStepRef.current = step;
        transitionToStep(step);
      }
    },
    [studyCount, transitionToStep],
  );

  return {
    activeIndex,
    phase,
    updateScrollProgress,
  };
}
