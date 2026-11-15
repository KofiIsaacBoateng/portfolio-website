"use client";

import { RefObject, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COMMAND = "./init --profile=engineer --mode=systems --focus=building";

interface HeroProps {
  transitionProgress: RefObject<{ value: number }>;
  introComplete: boolean;
  heroRef: RefObject<HTMLElement | null>;
  commandCharRefs: RefObject<(HTMLSpanElement | null)[]>;
  onMissionProgressRef: RefObject<((progress: number) => void) | null>;
}

export default function Hero({
  transitionProgress,
  introComplete,
  heroRef,
  commandCharRefs,
  onMissionProgressRef,
}: HeroProps) {
  const typingProgress = useRef<{ value: number }>({ value: 0 });

  useGSAP(
    () => {
      if (!introComplete) return;

      // HERO REVEAL
      const revealTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      revealTimeline
        .fromTo(
          ".hero-quote",
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
        )
        .fromTo(
          ".hero-name",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "<",
        )
        .fromTo(
          ".hero-description",
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5 },
          "<",
        )
        .fromTo(
          ".identity-card",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 2 },
          "<",
        );

      const transitionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            onMissionProgressRef.current?.(self.progress);
          },
        },
      });

      // 1. Hero content disappears into a pocket

      transitionTimeline
        .to(
          ".hero-quote",
          {
            x: 180,
            y: -45,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.65,
            ease: "power3.in",
          },
          0.05,
        )
        .to(
          ".hero-name",
          {
            x: 220,
            y: -45,
            opacity: 0,
            filter: "blur(12px)",
            duration: 0.8,
            ease: "power3.in",
          },
          0.05,
        )
        .to(
          ".hero-description",
          {
            x: 180,
            y: -45,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.65,
            ease: "power3.in",
          },
          0.1,
        );

      // Identity card fragments
      transitionTimeline.to(
        ".identity-card",
        {
          x: -100,
          y: 45,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power3.in",
        },
        0.05,
      );

      // 2. Character relocates and camera reframes
      transitionTimeline.to(
        transitionProgress.current,
        {
          value: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0,
      );

      // 3. Command line appears
      transitionTimeline.fromTo(
        ".about-command",
        {
          autoAlpha: 0,
          y: 15,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          immediateRender: false,
        },
        1.3,
      );

      // 3. CRT TV Turn-On (Horizontal beam -> Vertical expansion)
      transitionTimeline
        .fromTo(
          ".about-command",
          {
            autoAlpha: 1,
            scaleX: 0,
            scaleY: 0.015,
            filter: "brightness(2.2)",
          },
          {
            scaleX: 1,
            scaleY: 0.015,
            duration: 0.14,
            ease: "power2.out",
            immediateRender: false,
          },
          1.3,
        )
        .fromTo(
          ".crt-flash",
          { opacity: 0.9 },
          {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
            immediateRender: false,
          },
          1.3,
        )
        .to(
          ".about-command",
          {
            scaleY: 1,
            filter: "brightness(1)",
            duration: 0.22,
            ease: "expo.out",
            immediateRender: false,
          },
          1.44,
        );

      // 4. Command types out (cursor moves with each character)
      transitionTimeline.fromTo(
        ".command-char",
        { display: "none" },
        {
          display: "inline-block",
          duration: 0.01,
          stagger: {
            each: 1.35 / COMMAND.length,
          },
          ease: "none",
          immediateRender: false,
        },
        1.7,
      );

      // 5. CRT TV Shut-Down (Vertical collapse to line -> Horizontal collapse to dot)
      transitionTimeline
        .to(
          ".crt-flash",
          {
            opacity: 0.85,
            duration: 0.12,
            ease: "power2.in",
            immediateRender: false,
          },
          3.15,
        )
        .to(
          ".about-command",
          {
            scaleY: 0.015,
            filter: "brightness(2.4)",
            duration: 0.16,
            ease: "power3.in",
            immediateRender: false,
          },
          3.15,
        )
        .to(
          ".about-command",
          {
            scaleX: 0,
            autoAlpha: 0,
            duration: 0.14,
            ease: "power2.in",
            immediateRender: false,
          },
          3.31,
        );

      // 6. "Executing..." appears & holds before transitioning to About
      transitionTimeline
        .fromTo(
          ".executing-banner",
          {
            autoAlpha: 0,
            scale: 0.9,
            y: 10,
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
            ease: "back.out(1.7)",
            immediateRender: false,
          },
          3.48,
        )
        .to(
          ".executing-banner",
          {
            autoAlpha: 0,
            y: -12,
            scale: 0.96,
            duration: 0.22,
            ease: "power2.in",
            immediateRender: false,
          },
          4.05, // Holds visible from 3.48 -> 4.05, then fades out as About enters
        );

      // ABOUT OVERLAY REVEAL (Sits directly over the z-30 character)
      transitionTimeline.fromTo(
        "#about",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
          immediateRender: false,
        },
        4.15,
      );

      // Hold the rest of the timeline (4.6 -> 9.6) so About's study controller has 5 units of scroll
      transitionTimeline.to({}, { duration: 5.0 }, 4.6);
    },
    {
      scope: heroRef,
      dependencies: [introComplete],
      revertOnUpdate: true,
    },
  );

  return (
    <>
      <section
        id="home"
        className="relative isolate h-dvh min-h-175 w-full overflow-hidden bg-transparent text-white"
      >
        {/* HERO CONTENT */}
        <section className="relative flex flex-col gap-4 min-h-dvh pb-4 md:pb-8 pt-18 px-4 md:px-10">
          {/* Heading - Name */}
          <div className="z-10 flex flex-col items-end size-fit gap-2 uppercase text-nowrap min-w-fit">
            <p className="hero-quote z-10 font-sans text-[clamp(1.1rem,1.5vw,1.5rem)] font-semibold text-white/60 opacity-0 translate-x-7.5">
              Building beyond the ordinary
            </p>

            <h1 className="hero-name z-10 font-heading text-[clamp(5rem,12vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.065em] text-white opacity-0 translate-x-12.5">
              BOATENG
            </h1>
          </div>
          {/* Description */}
          <div className="hero-description z-10 w-[min(75%,320px)] md:w-[min(50%,380px)] ml-auto md:my-auto invisible md:visible opacity-0 translate-x-7.5">
            <p className="font-heading text-right text-[clamp(1rem,1vw,1.5rem)] font-medium leading-normal text-white/70">
              Design scalable digital experiences, intelligent systems, and
              reliable software that solve real-world problems.
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
