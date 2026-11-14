"use client";

import { useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MissionPhase = "IDLE" | "ACQUIRING" | "LOCKED" | "RELEASING" | "COMPLETE";

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

function shuffleTargets(length: number) {
  const targets = Array.from({ length }, (_, index) => index);

  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }

  return targets;
}

export function useMissionController({
  rootRef,
  focusVisualRef,
  missionCardRef,
  studyCount,
  acquire,
  release,
}: MissionControllerOptions) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<MissionPhase>("IDLE");

  const sequenceRef = useRef<number[]>([]);
  const requestedStepRef = useRef(-1);
  const currentStepRef = useRef(-1);
  const activeIndexRef = useRef<number | null>(null);
  const phaseRef = useRef<MissionPhase>("IDLE");
  const finishRequestedRef = useRef(false);

  const updatePhase = (nextPhase: MissionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const startStudy = (step: number) => {
    if (step < 0 || step >= studyCount) return;

    const index = sequenceRef.current[step];

    currentStepRef.current = step;
    activeIndexRef.current = null;

    updatePhase("ACQUIRING");

    acquire(index, () => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      updatePhase("LOCKED");

      // If the user has already scrolled ahead,
      // release this study and continue to the latest requested one.
      if (finishRequestedRef.current) {
        finishCurrent(null);
        return;
      }

      if (requestedStepRef.current > step) {
        finishCurrent(requestedStepRef.current);
      }
    });
  };

  const finishCurrent = (nextStep: number | null) => {
    if (phaseRef.current === "RELEASING") return;

    if (phaseRef.current === "ACQUIRING") {
      finishRequestedRef.current = true;
      return;
    }

    if (phaseRef.current !== "LOCKED") return;

    finishRequestedRef.current = false;
    updatePhase("RELEASING");

    const card = missionCardRef.current;
    const visual = focusVisualRef.current;

    const exitTimeline = gsap.timeline({
      onComplete: () => {
        activeIndexRef.current = null;
        setActiveIndex(null);

        release(() => {
          if (finishRequestedRef.current) {
            finishRequestedRef.current = false;
            updatePhase("COMPLETE");
            return;
          }

          if (nextStep !== null) {
            const latestStep = Math.max(nextStep, requestedStepRef.current);

            updatePhase("IDLE");
            startStudy(latestStep);
          } else {
            updatePhase("COMPLETE");
          }
        });
      },
    });

    if (card) {
      exitTimeline.to(
        card,
        {
          y: 90,
          opacity: 0,
          duration: 0.55,
          ease: "power2.in",
        },
        0,
      );
    }

    if (visual) {
      exitTimeline.to(
        visual,
        {
          scale: 0.82,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.55,
          ease: "power2.in",
        },
        0,
      );
    }
  };

  const requestStep = (step: number) => {
    if (step <= requestedStepRef.current) return;

    requestedStepRef.current = step;

    if (phaseRef.current === "IDLE") {
      startStudy(step);
      return;
    }

    if (phaseRef.current === "LOCKED") {
      finishCurrent(step);
    }
  };

  useGSAP(
    () => {
      sequenceRef.current = shuffleTargets(studyCount);

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        pinSpacing: true,
        scrub: false,
        anticipatePin: 1,

        onEnter: () => {
          console.log("[Mission] onEnter fired");
          requestStep(0);
        },

        onUpdate: (self) => {
          console.log("[Mission] progress:", self.progress);
          const step = Math.min(
            Math.floor(self.progress * studyCount),
            studyCount - 1,
          );
          requestStep(step);
        },

        onLeave: () => {
          console.log("[Mission] onLeave fired");
          finishRequestedRef.current = true;
          if (phaseRef.current === "LOCKED") finishCurrent(null);
          else if (phaseRef.current === "IDLE") updatePhase("COMPLETE");
        },
      });
    },
    { scope: rootRef },
  );

  return {
    activeIndex,
    phase,
  };
}
