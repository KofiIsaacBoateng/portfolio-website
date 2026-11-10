import { useCallback, useRef, useState } from "react";
import Experience from "../scene/Experience";
import Navbar from "../ui/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Intro from "../ui/Intro";

gsap.registerPlugin(useGSAP);
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
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

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".hero-quote",
          {
            x: 30,
            opacity: 0,
            duration: 1,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
          },
        )
        .fromTo(
          ".hero-name",
          {
            x: 50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
          },
          "<",
        )
        .fromTo(
          ".hero-description",
          {
            x: 30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
          },
          "<",
        )
        .fromTo(
          ".identity-card",
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 2,
          },
          "<",
        );
    },
    {
      scope: heroRef,
      dependencies: [introComplete],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate h-dvh min-h-175 w-full overflow-hidden bg-black text-white"
    >
      {/* INTRO */}
      {!introComplete && (
        <Intro onReveal={handleIntroOpening} onComplete={handleIntroComplete} />
      )}

      {/* 3D Character */}
      <div className="hero-character pointer-events-none absolute inset-0 bg-transparent z-30">
        <div className="absolute inset-0 bg-transparent">
          <Experience spinCharacter={introOpening} />
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* HERO */}
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
            Software engineer.
            <br />
            Building
            <br />
            intelligent
            <br />
            digital experiences.
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
    </section>
  );
}
