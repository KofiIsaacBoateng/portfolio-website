"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COMMAND = "./init --profile=engineer --mode=systems --focus=building";

interface HeroProps {
  transitionProgress: RefObject<{ value: number }>;
  introComplete: boolean;
  heroRef: RefObject<HTMLElement | null>;
  onMissionProgressRef: RefObject<((progress: number) => void) | null>;
}

export default function Hero({
  transitionProgress,
  introComplete,
  heroRef,
  onMissionProgressRef,
}: HeroProps) {
  useGSAP(
    () => {
      if (!introComplete) return;

      // 1. HERO REVEAL
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
          end: () => `+=${window.innerHeight * 16}`, // Extended runway for mobile & desktop dwell
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            onMissionProgressRef.current?.(self.progress);
          },
        },
      });

      // [0.00 -> 1.40] Hero content exits & 3D character repositions
      transitionTimeline
        .to(
          ".hero-quote",
          {
            x: 180,
            y: -45,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.9,
            ease: "power3.in",
          },
          0.1,
        )
        .to(
          ".hero-name",
          {
            x: 220,
            y: -45,
            opacity: 0,
            filter: "blur(12px)",
            duration: 1.0,
            ease: "power3.in",
          },
          0.1,
        )
        .to(
          ".hero-description",
          {
            x: 180,
            y: -45,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.9,
            ease: "power3.in",
          },
          0.15,
        )
        .to(
          ".identity-card",
          {
            x: -100,
            y: 45,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.0,
            ease: "power3.in",
          },
          0.1,
        )
        .to(
          transitionProgress.current,
          {
            value: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0,
        );

      // [1.50 -> 1.95] CRT TV Turn-On (Monochrome beam -> vertical expand)
      transitionTimeline
        .fromTo(
          ".about-command",
          {
            autoAlpha: 1,
            scaleX: 0,
            scaleY: 0.015,
            filter: "brightness(2.5)",
          },
          {
            scaleX: 1,
            scaleY: 0.015,
            duration: 0.18,
            ease: "power2.out",
            immediateRender: false,
          },
          1.5,
        )
        .fromTo(
          ".crt-flash",
          { opacity: 0.95 },
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
            immediateRender: false,
          },
          1.5,
        )
        .to(
          ".about-command",
          {
            scaleY: 1,
            filter: "brightness(1)",
            duration: 0.27,
            ease: "expo.out",
            immediateRender: false,
          },
          1.68,
        );

      // [2.05 -> 3.85] Command Types Out Slowly
      transitionTimeline.fromTo(
        ".command-char",
        { display: "none" },
        {
          display: "inline-block",
          duration: 0.01,
          stagger: {
            each: 1.8 / COMMAND.length,
          },
          ease: "none",
          immediateRender: false,
        },
        2.05,
      );

      // [3.85 -> 4.35] PAUSE FOR "ENTER KEY" SOUND EFFECT (0.5 units dead-hold)
      transitionTimeline.to({}, { duration: 0.5 }, 3.85);

      // [4.35 -> 4.75] CRT TV Shut-Down
      transitionTimeline
        .to(
          ".crt-flash",
          {
            opacity: 0.9,
            duration: 0.15,
            ease: "power2.in",
            immediateRender: false,
          },
          4.35,
        )
        .to(
          ".about-command",
          {
            scaleY: 0.015,
            filter: "brightness(2.6)",
            duration: 0.22,
            ease: "power3.in",
            immediateRender: false,
          },
          4.35,
        )
        .to(
          ".about-command",
          {
            scaleX: 0,
            autoAlpha: 0,
            duration: 0.18,
            ease: "power2.in",
            immediateRender: false,
          },
          4.57,
        );

      // [4.80 -> 5.75] "Executing..." Appears, Holds for a beat, then Exits
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
            duration: 0.25,
            ease: "back.out(1.7)",
            immediateRender: false,
          },
          4.8,
        )
        .to(
          ".executing-banner",
          {
            autoAlpha: 0,
            y: -12,
            scale: 0.96,
            duration: 0.25,
            ease: "power2.in",
            immediateRender: false,
          },
          5.5,
        );

      // [5.55 -> 6.15] DRAMATIC FULL-SCREEN CRT MONITOR BOOT-UP FOR #ABOUT
      transitionTimeline
        // Stage 1: Horizontal phosphor beam shoots across the center of the screen
        .fromTo(
          "#about",
          {
            autoAlpha: 0,
            scaleX: 0,
            scaleY: 0.008,
            filter: "brightness(3)",
          },
          {
            autoAlpha: 1,
            scaleX: 1,
            scaleY: 0.008,
            duration: 0.16,
            ease: "power2.out",
            immediateRender: false,
          },
          5.55,
        )
        // Stage 2: White phosphor flash + vertical screen snap-open
        .fromTo(
          ".about-boot-flash",
          { opacity: 0.85 },
          {
            opacity: 0,
            duration: 0.38,
            ease: "power2.out",
            immediateRender: false,
          },
          5.68,
        )
        .to(
          "#about",
          {
            autoAlpha: 1,
            scaleY: 1,
            filter: "brightness(1)",
            duration: 0.28,
            ease: "expo.out",
            immediateRender: false,
          },
          5.71,
        )
        // Stage 3: HUD header snaps into focus right as the monitor stabilizes
        .fromTo(
          ".about-hud-header",
          { autoAlpha: 0, y: -12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            ease: "power3.out",
            immediateRender: false,
          },
          5.92,
        );

      // [6.15 -> 18.65] Extended Scroll Runway for About Target Acquisition & Reading Dwell
      transitionTimeline.to({}, { duration: 12.5 }, 6.15);
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
