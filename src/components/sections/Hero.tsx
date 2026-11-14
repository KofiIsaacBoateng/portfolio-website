"use client";

import { useCallback, useRef, useState } from "react";

import Experience from "../scene/Experience";
import Navbar from "../ui/Navbar";
import Intro from "../ui/Intro";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "../about/studies/About";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COMMAND =
  "./initialize --profile=engineer --mode=systems --focus=building";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const transitionProgress = useRef({ value: 0 });
  const commandCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const typingProgress = useRef({ value: 0 });

  const [introOpening, setIntroOpening] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroOpening = useCallback(() => {
    setIntroOpening(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

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
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Hero content disappears into a pocket

      transitionTimeline
        .fromTo(
          ".hero-quote",
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            x: 180,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.65,
            ease: "power3.in",
          },
          0,
        )
        .fromTo(
          ".hero-name",
          {
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
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
        .fromTo(
          ".hero-description",
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            x: 180,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.65,
            ease: "power3.in",
          },
          0.1,
        );

      // Identity card fragments
      transitionTimeline.fromTo(
        ".identity-card",
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          x: -100,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power3.in",
        },
        0,
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
        },
        1.3,
      );

      // 4. Command types out
      const commandChars = commandCharRefs.current.filter(
        (char): char is HTMLSpanElement => char !== null,
      );

      // Start with all characters removed from layout.
      gsap.set(commandChars, { display: "none" });

      transitionTimeline.fromTo(
        typingProgress.current,
        { value: 0 },
        {
          value: COMMAND.length,
          duration: 1.5,
          ease: "none",
          onUpdate: () => {
            const visibleCount = Math.floor(typingProgress.current.value);

            commandChars.forEach((char, index) => {
              char.style.display =
                index < visibleCount ? "inline-block" : "none";
            });
          },
        },
        1.5,
      );

      // 5. Command disintegrates
      transitionTimeline.to(
        commandChars,
        {
          x: () => gsap.utils.random(-50, 50),
          y: () => gsap.utils.random(-35, 35),
          rotation: () => gsap.utils.random(-45, 45),
          autoAlpha: 0,
          filter: "blur(5px)",
          stagger: {
            each: 0.004,
            from: "random",
          },
          duration: 0.4,
          ease: "power2.in",
        },
        3,
      );

      // 6. Clear command container
      transitionTimeline.to(
        ".about-command",
        {
          autoAlpha: 0,
          duration: 0.15,
        },
        3.5,
      );
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
        ref={heroRef}
        className="relative isolate h-dvh min-h-175 w-full overflow-hidden bg-black text-white"
      >
        {!introComplete && (
          <Intro
            onReveal={handleIntroOpening}
            onComplete={handleIntroComplete}
          />
        )}
        {/* 3D Character */}
        <div className="hero-character pointer-events-none absolute inset-0 z-30 bg-transparent">
          <div className="absolute inset-0 bg-transparent">
            <Experience
              spinCharacter={introOpening}
              transitionProgress={transitionProgress}
            />
          </div>

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <Navbar />
        {/* HERO CONTENT */}
        <section className="relative flex flex-col gap-4 min-h-dvh pb-4 md:pb-8 pt-18 px-4 md:px-10">
          {/* Heading - Name */}
          <div className="z-10 flex flex-col items-end size-fit gap-2 uppercase text-nowrap min-w-fit">
            <p className="hero-quote font-sans text-[clamp(1.1rem,1.5vw,1.5rem)] font-semibold text-white/60 opacity-0 translate-x-7.5">
              Building beyond the ordinary
            </p>

            <h1 className="hero-name font-heading text-[clamp(5rem,12vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.065em] text-white opacity-0 translate-x-12.5">
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
          {/* Identity card */}
          <div className="identity-card bottom-[1%] md:bottom-[3%] backdrop-blur-2xl mt-auto z-40 flex w-[min(250px,50%)] flex-col justify-between gap-8 py-4 px-4 text-white md:h-100.5 md:w-80 md:p-6 opacity-0 -translate-x-10">
            {/* Top content */}
            <h2 className="font-heading text-[clamp(0.8rem,2vw,1.4rem)] font-semibold uppercase leading-relaxed tracking-wider">
              Software engineer. <br />
              Building <br />
              intelligent <br /> digital experiences.
            </h2>
            {/* Divider */}
            <div className="w-full hidden md:block border-t border-dashed border-white/50" />
            {/* Bottom content */}
            <p className="md:ml-auto max-w-[80%] md:text-right font-sans text-[clamp(0.7rem,2vw,1rem)] font-medium leading-relaxed text-white/80">
              Focused on backend engineering, scalable systems, and emerging
              technologies.
            </p>
          </div>
        </section>

        {/* COMMAND LINE */}
        <div
          className="about-command invisible absolute left-[5%] top-1/2 z-50 w-[90%] -translate-y-1/2 rounded-lg border border-emerald-400/15 bg-black/65 p-5 opacity-0 backdrop-blur-md md:left-[43%] md:w-[52%] md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none"
          aria-hidden="true"
        >
          <div className="flex flex-wrap items-center gap-x-0.5 font-terminal text-base leading-relaxed tracking-normal sm:text-lg md:text-xl">
            <span className="shrink-0 text-[#35E89A]">kb@portfolio</span>

            <span className="text-[#80AFA0]">~</span>

            <span className="text-[#35E89A]">%</span>

            <span className="text-[#C5DCCF] ml-2 text-sm">
              {COMMAND.split("").map((character, index) => (
                <span
                  key={index}
                  ref={(element) => {
                    commandCharRefs.current[index] = element;
                  }}
                  className="hidden"
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              ))}

              <span className="terminal-cursor ml-1 inline-block h-[0.1em] w-[1em] md:w-[0.7em] translate-y-0.5 bg-[#35E89A]" />
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <About />
    </>
  );
}
