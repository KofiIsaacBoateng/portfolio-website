"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
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
    zoomScale: 1.85,
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
          opacity: 1,
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
          x: -24,
          opacity: 0,
        },
        {
          x: 0,
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
      className="pointer-events-none invisible fixed inset-0 z-50 h-dvh w-full overflow-hidden bg-[#050507]/75 text-white opacity-0 backdrop-blur-xl"
    >
      {/* FULL-SCREEN CRT BOOT FLASH */}
      <div className="about-boot-flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0" />

      {/* MONOCHROME ATMOSPHERIC GRID */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_50%,rgba(255,255,255,0.06),transparent_68%)]" />

        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
      </div>

      {/* SECTION HUD HEADER (Always visible in #about, clears Navbar & 30% Left Sidebar) */}
      <header className="pointer-events-none absolute left-4 right-4 top-20 z-30 flex items-center justify-between md:left-[33%] md:right-10 md:top-24">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-white/40" />
          <span className="font-terminal text-[11px] font-semibold tracking-[0.28em] text-white/80 uppercase">
            02 // About
          </span>
        </div>

        <span className="hidden font-terminal text-[10px] tracking-[0.22em] text-white/40 sm:inline">
          {activeIndex !== null
            ? `TARGET ACQUIRED [${aboutStudies[activeIndex].number}]`
            : "SCANNING PROFILE NODES..."}
        </span>
      </header>

      {/* MAIN TARGETING SYSTEM (Centered on mobile, occupies right 70% [midpoint 65%] on md+) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          ref={cameraRigRef}
          className="absolute left-1/2 top-1/2 h-0 w-0 md:left-[65%]"
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
              transformOrigin: "0 0",
            }}
          >
            {aboutStudies.map((study, index) => {
              const angle =
                (index / aboutStudies.length) * Math.PI * 2 - Math.PI / 2;

              const x = Math.cos(angle) * 38;
              const y = Math.sin(angle) * 40;

              const StudyVisual = study.Visual;

              return (
                <div
                  key={study.id}
                  ref={(element) => {
                    targetRefs.current[index] = element;
                  }}
                  className="absolute left-0 top-0"
                  style={{
                    width: "min(62vw, 480px)",
                    height: "min(48vw, 370px)",
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
                        opacity: 0.78,
                      }}
                    >
                      <StudyVisual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MONOCHROME CENTRAL RETICLE */}
          <div
            ref={reticleMarkerRef}
            className="pointer-events-none absolute left-0 top-0 z-30"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              ref={reticleRef}
              className="relative h-52 w-52 md:h-68 md:w-68"
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
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  strokeDasharray="3 8"
                  opacity="0.45"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="88"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeDasharray="2 5"
                  opacity="0.85"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="76"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  strokeDasharray="5 7"
                  opacity="0.6"
                />
                <path
                  d="M120 0V85 M120 155V240 M0 120H85 M155 120H240"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  opacity="0.45"
                  strokeDasharray="3 5"
                />
                <path
                  d="M120 105V115 M120 125V135 M105 120H115 M125 120H135"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                />
                <circle cx="120" cy="120" r="2.8" fill="#FFFFFF" />
                <path
                  d="M120 5V17 M120 223V235 M5 120H17 M223 120H235"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle cx="120" cy="12" r="2.2" fill="#FFFFFF" />
                <circle cx="120" cy="228" r="2.2" fill="#FFFFFF" />
                <circle cx="12" cy="120" r="2.2" fill="#FFFFFF" />
                <circle cx="228" cy="120" r="2.2" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* MASSIVE FOCUSED TARGET VISUAL */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center pb-24 pt-12 md:left-[30%] md:w-[70%] md:py-0">
        {activeIndex !== null &&
          (() => {
            const FocusVisual = aboutStudies[activeIndex].Visual;

            return (
              <div
                key={aboutStudies[activeIndex].id}
                ref={focusVisualRef}
                className="relative flex h-[74dvh] w-screen max-w-none items-center justify-center px-1 md:h-[84dvh] md:w-[66vw] md:max-w-5xl md:p-6"
                style={{
                  filter: "drop-shadow(0 0 36px rgba(255,255,255,0.22))",
                }}
              >
                {/* Subtle dark radial backing so massive white line-art stays razor-sharp */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(5,5,7,0.78)_0%,transparent_75%)]" />

                <FocusVisual />
              </div>
            );
          })()}
      </div>

      {/* TELEMETRY PANEL:
          - Small devices (< md): Expanded bottom card (Title + Subtitle + 2-line summary + Keywords)
          - Desktop (md+): Full-height left sidebar consuming 30% width (Full description + footer)
      */}
      {activeIndex !== null && (
        <aside
          key={aboutStudies[activeIndex].id}
          ref={missionCardRef}
          className="pointer-events-auto fixed bottom-4 left-4 right-4 z-40 md:inset-y-0 md:left-0 md:right-auto md:w-[30%] md:max-w-md"
        >
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#070709]/92 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-5 md:rounded-none md:border-y-0 md:border-l-0 md:border-r md:border-white/15 md:px-8 md:pb-10 md:pt-24">
            {/* TOP & MIDDLE CONTENT */}
            <div>
              {/* TOP METADATA */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-terminal text-[10px] tracking-[0.22em] text-white/60">
                  TARGET // {aboutStudies[activeIndex].number}
                </span>

                <span className="flex items-center gap-1.5 font-terminal text-[9px] tracking-widest text-white">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" />
                  LOCKED ({activeIndex + 1}/{aboutStudies.length})
                </span>
              </div>

              {/* TITLE & SUBTITLE */}
              <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl md:mt-6 md:text-3xl lg:text-4xl">
                {aboutStudies[activeIndex].title}
              </h3>

              <p className="mt-0.5 font-terminal text-[10px] tracking-wider text-white/60 md:mt-2 md:text-xs">
                {aboutStudies[activeIndex].subtitle}
              </p>

              <div className="my-3 h-px w-full bg-white/15 md:my-6" />

              {/* DESCRIPTION:
                  - Mobile (< md): Clamped to 3 lines so it fills the lower space without covering the illustration
                  - Desktop (md+): Unclamped full bio text
              */}
              <p className="line-clamp-3 font-sans text-xs leading-relaxed text-white/80 sm:text-sm md:line-clamp-none md:leading-7 lg:text-base">
                {aboutStudies[activeIndex].description}
              </p>

              {/* KEYWORDS (Visible on both Mobile & Desktop) */}
              <div className="mt-3.5 flex flex-wrap gap-1.5 md:mt-8 md:gap-2">
                {aboutStudies[activeIndex].keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded border border-white/25 bg-white/6 px-2.5 py-1 font-terminal text-[9px] tracking-widest text-white/90 md:px-3 md:py-1.5 md:text-[10px]"
                  >
                    {keyword.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* FOOTER METADATA (Desktop Sidebar Bottom) */}
            <div className="hidden items-center justify-between border-t border-white/15 pt-4 font-terminal text-[10px] tracking-widest text-white/45 md:flex">
              <span>ENGINEERING PROFILE</span>
              <span>SYS.MONOCHROME // ACTIVE</span>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
