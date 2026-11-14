"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { aboutStudies } from "./aboutStudies";
import { useBackgroundMotion } from "./useBackgroundMotion";
import { useAcquisitionMotion } from "./useAcquisitionMotion";
import { useMissionController } from "./useMissionController";

gsap.registerPlugin(useGSAP);

export default function About() {
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
    zoomScale: 1.5,
  });

  const { activeIndex, phase } = useMissionController({
    rootRef,
    focusVisualRef,
    missionCardRef,
    studyCount: aboutStudies.length,
    acquire,
    release,
  });

  console.log("Mission phase:", phase);

  useGSAP(
    () => {
      if (!focusVisualRef.current || activeIndex === null) return;

      gsap.fromTo(
        focusVisualRef.current,
        {
          scale: 0.65,
          opacity: 0,
          filter: "blur(12px)",
        },
        {
          scale: 1,
          opacity: 0.95,
          filter: "blur(0px)",
          duration: 1.1,
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
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
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
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-[#050403] text-[#EAE6E1]"
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,43,20,0.13),transparent_65%)]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,119,77,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(196,119,77,0.12) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
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

              const x = Math.cos(angle) * 43;
              const y = Math.sin(angle) * 35;

              const StudyVisual = study.Visual;

              return (
                <div
                  key={study.id}
                  ref={(element) => {
                    targetRefs.current[index] = element;
                  }}
                  className="absolute left-0 top-0"
                  style={{
                    width: "min(64vw, 460px)",
                    height: "min(50vw, 360px)",
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
                        opacity: 0.52,
                        filter: "blur(1.1px)",
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
              className="relative h-[190px] w-[190px] md:h-[230px] md:w-[230px]"
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
                className="h-[min(65vw,480px)] w-[min(75vw,560px)]"
                style={{
                  filter: "drop-shadow(0 0 24px rgba(196,119,77,0.12))",
                }}
              >
                <FocusVisual />
              </div>
            );
          })()}
      </div>

      {/* MISSION INFORMATION CARD */}
      {activeIndex !== null && (
        <div
          key={aboutStudies[activeIndex].id}
          ref={missionCardRef}
          className="absolute bottom-8 left-1/2 z-40 w-[min(90%,620px)] -translate-x-1/2 translate-y-0"
        >
          <div className="relative overflow-hidden rounded-xl border border-[#C4774D]/30 bg-black/75 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
            {/* TOP METADATA */}
            <div className="flex items-center justify-between">
              <span className="font-terminal text-[10px] tracking-[0.25em] text-[#C4774D]">
                MISSION REPORT / {aboutStudies[activeIndex].number}
              </span>

              <span className="flex items-center gap-2 font-terminal text-[9px] tracking-widest text-[#C4774D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C4774D]" />
                TARGET ACQUIRED
              </span>
            </div>

            {/* TITLE */}
            <h3 className="mt-5 font-heading text-3xl text-[#EAE6E1] md:text-4xl">
              {aboutStudies[activeIndex].title}
            </h3>

            <p className="mt-2 font-terminal text-[10px] tracking-widest text-[#C4774D]/80">
              {aboutStudies[activeIndex].subtitle}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xl font-sans text-sm leading-7 text-white/65">
              {aboutStudies[activeIndex].description}
            </p>

            {/* KEYWORDS */}
            <div className="mt-6 flex flex-wrap gap-3">
              {aboutStudies[activeIndex].keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-[#C4774D]/25 px-3 py-1.5 font-terminal text-[9px] tracking-widest text-[#C4774D]"
                >
                  {keyword.toUpperCase()}
                </span>
              ))}
            </div>

            {/* BOTTOM METADATA */}
            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-terminal text-[9px] tracking-widest text-white/30">
                ENGINEERING PROFILE
              </span>

              <span className="font-terminal text-[9px] tracking-widest text-[#C4774D]/70">
                {activeIndex + 1} / {aboutStudies.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* INTERFACE LABELS */}
      {/* <div className="pointer-events-none absolute left-6 top-7 z-40 md:left-14 md:top-10">
        <p className="font-terminal text-[10px] tracking-[0.3em] text-[#C4774D]">
          SYSTEM / ABOUT
        </p>

        <p className="mt-2 font-terminal text-[9px] tracking-widest text-white/35">
          INITIALIZING MISSION CONTROL
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-6 right-6 z-40 flex items-end justify-between md:bottom-10 md:left-14 md:right-14">
        <div>
          <p className="font-terminal text-[9px] tracking-[0.25em] text-[#C4774D]">
            TARGETING SYSTEM
          </p>

          <p className="mt-2 font-sans text-xs text-white/35">
            Awaiting target acquisition
          </p>
        </div>

        <p className="font-terminal text-[9px] tracking-widest text-white/30">
          05 / UNASSIGNED
        </p>
      </div> */}
    </section>
  );
}
