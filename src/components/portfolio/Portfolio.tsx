"use client";

import { useCallback, useRef, useState } from "react";

import Experience from "../scene/Experience";
import Hero from "../sections/Hero/Hero";
import About from "../sections/About/About";
import Intro from "../ui/Intro";
import Navbar from "../ui/Navbar";
import Terminal from "../ui/Terminal";

export default function Portfolio() {
  const transitionProgress = useRef({ value: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [introOpening, setIntroOpening] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Terminal
  const commandCharRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // About
  const onMissionProgressRef = useRef<((progress: number) => void) | null>(
    null,
  );

  const onIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const onIntroOpening = useCallback(() => {
    setIntroOpening(true);
  }, []);

  return (
    <div className="relative isolate min-h-dvh w-full overflow-y-clip overflow-x-clip bg-transparent text-white">
      {/*** Into */}
      {!introComplete && (
        <Intro onReveal={onIntroOpening} onComplete={onIntroComplete} />
      )}

      {/*** NAVIGATION BAR */}
      <Navbar />

      {/* Persistent 3D scene */}
      <div className="hero-character pointer-events-none fixed inset-0 z-30 bg-transparent">
        <div className="absolute inset-0 bg-transparent">
          <Experience
            spinCharacter={introOpening}
            transitionProgress={transitionProgress}
          />
        </div>

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/** Hero */}
      <div ref={heroRef}>
        <Hero
          transitionProgress={transitionProgress}
          introComplete={introComplete}
          heroRef={heroRef}
          onMissionProgressRef={onMissionProgressRef}
        />

        {/* Identity card */}
        <div className="identity-card z-40 bottom-[1%] md:bottom-[3%] left-4 md:left-10 backdrop-blur-2xl mt-auto flex w-[min(250px,50%)] flex-col justify-between gap-8 py-4 px-4 text-white md:h-100.5 md:w-80 md:p-6 opacity-0 -translate-x-10">
          {/* Top content */}
          <h2 className="font-heading text-[clamp(0.7rem,2vw,1.4rem)] font-semibold uppercase leading-relaxed tracking-wider">
            Software engineer. <br />
            Building <br />
            intelligent <br /> digital experiences.
          </h2>
          {/* Divider */}
          <div className="w-full hidden md:block border-t border-dashed border-white/50" />
          {/* Bottom content */}
          <p className="md:ml-auto md:text-right font-sans text-[clamp(0.7rem,2vw,1rem)] font-medium leading-relaxed text-white/80">
            Focused on backend engineering, scalable systems, and emerging
            technologies.
          </p>
        </div>

        {/* Terminal */}
        <Terminal commandCharRefs={commandCharRefs} />

        {/* About Overlay (z-50: fixed overlay on top of z-30 character) */}
        <About onMissionProgressRef={onMissionProgressRef} />
      </div>
    </div>
  );
}
