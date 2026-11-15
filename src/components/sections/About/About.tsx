"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { aboutStudies } from "../../about/studies/aboutStudies";
import { useBackgroundMotion } from "../../../app/animations/about/useBackgroundMotion";
import { useAcquisitionMotion } from "../../../app/animations/about/useAcquisitionMotion";
import { useMissionController } from "../../../app/animations/about/useMissionController";

gsap.registerPlugin(useGSAP);

interface AboutProps {
  onMissionProgressRef: RefObject<((progress: number) => void) | null>;
}

export default function About({ onMissionProgressRef }: AboutProps) {
  const rootRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reticleRef = useRef<HTMLDivElement>(null);
  const focusVisualRef = useRef<HTMLDivElement>(null);
  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const reticleMarkerRef = useRef<HTMLDivElement>(null);

  useBackgroundMotion({
    rootRef,
    orbitRef,
    visualRefs,
    floatRefs,
    reticleRef,
    orbitDuration: 90,
  });

  const { acquire, release } = useAcquisitionMotion({
    rootRef,
    cameraRigRef,
    orbitRef,
    targetRefs,
    floatRefs,
    visualRefs,
    reticleMarkerRef,
    zoomScale: 1.45,
  });

  const { activeIndex, updateScrollProgress } = useMissionController({
    rootRef,
    focusVisualRef,
    missionCardRef,
    studyCount: aboutStudies.length,
    acquire,
    release,
  });

  useEffect(() => {
    onMissionProgressRef.current = updateScrollProgress;
    return () => {
      onMissionProgressRef.current = null;
    };
  }, [onMissionProgressRef, updateScrollProgress]);

  useGSAP(
    () => {
      if (!focusVisualRef.current || activeIndex === null) return;

      gsap.fromTo(
        focusVisualRef.current,
        {
          scale: 0.72,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          scale: 1,
          opacity: 0.95,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        },
      );
    },
    {
      dependencies: [activeIndex],
      scope: rootRef,
    },
  );

  useGSAP(
    () => {
      if (!missionCardRef.current || activeIndex === null) return;

      gsap.fromTo(
        missionCardRef.current,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    },
    {
      dependencies: [activeIndex],
      scope: rootRef,
    },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className="pointer-events-none invisible fixed inset-0 z-50 h-dvh w-full overflow-hidden bg-black/25 text-[#EAE6E1] opacity-0 backdrop-blur-[3px]"
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,43,20,0.12),transparent_70%)]" />

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,119,77,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(196,119,77,0.14) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      {/* CAMERA RIG + BACKGROUND ILLUSTRATIONS */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          ref={cameraRigRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {/* ROTATING ILLUSTRATION FIELD */}
          <div
            ref={orbitRef}
            className="absolute left-0 top-0 h-0 w-0"
            style={{
              transformOrigin: "center center",
            }}
          >
            {aboutStudies.map((study, index) => {
              const angle =
                (index / aboutStudies.length) * Math.PI * 2 - Math.PI / 2;

              const x = Math.cos(angle) * 38;
              const y = Math.sin(angle) * 32;

              const StudyVisual = study.Visual;

              return (
                <div
                  key={study.id}
                  ref={(element) => {
                    targetRefs.current[index] = element;
                  }}
                  className="absolute left-0 top-0"
                  style={{
                    width: "min(56vw, 400px)",
                    height: "min(44vw, 310px)",
                    transform: `translate(-50%, -50%) translate3d(${x}vw, ${y}vh, 0)`,
                  }}
                >
                  <div
                    ref={(element) => {
                      floatRefs.current[index] = element;
                    }}
                    className="h-full w-full"
                  >
                    <div
                      ref={(element) => {
                        visualRefs.current[index] = element;
                      }}
                      className="h-full w-full"
                      style={{
                        opacity: 0.55,
                        filter: "blur(0.8px)",
                      }}
                    >
                      <StudyVisual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRAL RETICLE — NOW PART OF THE CAMERA RIG */}
          <div
            ref={reticleMarkerRef}
            className="pointer-events-none absolute left-0 top-0 z-30"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              ref={reticleRef}
              className="relative h-44 w-44 md:h-56 md:w-56"
            >
              <svg
                viewBox="0 0 240 240"
                className="h-full w-full overflow-visible"
                fill="none"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  stroke="#C4774D"
                  strokeWidth="0.65"
                  strokeDasharray="3 8"
                  opacity="0.55"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="88"
                  stroke="#E18A58"
                  strokeWidth="0.8"
                  strokeDasharray="2 5"
                  opacity="0.85"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="76"
                  stroke="#C4774D"
                  strokeWidth="0.7"
                  strokeDasharray="5 7"
                  opacity="0.7"
                />
                <path
                  d="M120 0V85 M120 155V240 M0 120H85 M155 120H240"
                  stroke="#C4774D"
                  strokeWidth="0.7"
                  opacity="0.5"
                  strokeDasharray="3 5"
                />
                <path
                  d="M120 105V115 M120 125V135 M105 120H115 M125 120H135"
                  stroke="#E18A58"
                  strokeWidth="1.4"
                />
                <circle cx="120" cy="120" r="2.5" fill="#E18A58" />
                <path
                  d="M120 5V17 M120 223V235 M5 120H17 M223 120H235"
                  stroke="#E18A58"
                  strokeWidth="1.2"
                />
                <circle cx="120" cy="12" r="2" fill="#E18A58" />
                <circle cx="120" cy="228" r="2" fill="#E18A58" />
                <circle cx="12" cy="120" r="2" fill="#E18A58" />
                <circle cx="228" cy="120" r="2" fill="#E18A58" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* FOCUSED TARGET */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        {activeIndex !== null &&
          (() => {
            const FocusVisual = aboutStudies[activeIndex].Visual;

            return (
              <div
                key={aboutStudies[activeIndex].id}
                ref={focusVisualRef}
                className="h-[min(55vw,400px)] w-[min(65vw,460px)]"
                style={{
                  filter: "drop-shadow(0 0 24px rgba(196,119,77,0.16))",
                }}
              >
                <FocusVisual />
              </div>
            );
          })()}
      </div>

      {/* MISSION INFORMATION CARD:
          - Small devices (< md): Minimal bottom bar (Title + Subtitle + Index)
          - Desktop (md+): Left sidebar (Full details, description, keywords)
      */}
      {activeIndex !== null && (
        <aside
          key={aboutStudies[activeIndex].id}
          ref={missionCardRef}
          className="pointer-events-auto fixed bottom-4 left-4 right-4 z-40 md:bottom-auto md:left-8 md:right-auto md:top-1/2 md:w-85 md:-translate-y-1/2 lg:w-96"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#C4774D]/30 bg-[#0c0e12]/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl md:p-6">
            {/* TOP METADATA */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-terminal text-[10px] tracking-[0.22em] text-[#C4774D]">
                TARGET // {aboutStudies[activeIndex].number}
              </span>

              <span className="flex items-center gap-1.5 font-terminal text-[9px] tracking-widest text-[#35E89A]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#35E89A]" />
                LOCKED ({activeIndex + 1}/{aboutStudies.length})
              </span>
            </div>

            {/* TITLE & SUBTITLE */}
            <h3 className="mt-2 font-heading text-xl font-semibold text-[#EAE6E1] md:mt-4 md:text-2xl lg:text-3xl">
              {aboutStudies[activeIndex].title}
            </h3>

            <p className="mt-1 font-terminal text-[10px] tracking-wider text-[#C4774D]/85 md:mt-1.5">
              {aboutStudies[activeIndex].subtitle}
            </p>

            {/* EXTENDED DETAILS (Desktop Sidebar Only) */}
            <div className="hidden md:block">
              <div className="my-4 h-px w-full bg-white/10" />

              <p className="font-sans text-xs leading-relaxed text-white/70 lg:text-sm lg:leading-6">
                {aboutStudies[activeIndex].description}
              </p>

              {/* KEYWORDS */}
              <div className="mt-5 flex flex-wrap gap-2">
                {aboutStudies[activeIndex].keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded border border-[#C4774D]/30 bg-[#C4774D]/10 px-2.5 py-1 font-terminal text-[9px] tracking-widest text-[#E18A58]"
                  >
                    {keyword.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* BOTTOM METADATA */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 font-terminal text-[9px] tracking-widest text-white/35">
                <span>ENGINEERING PROFILE</span>
                <span>SYS.ACTIVE</span>
              </div>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
