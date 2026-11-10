"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface IntroProps {
  onReveal: () => void;
  onComplete: () => void;
}

export default function Intro({ onReveal, onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);

  useLayoutEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Establish initial positions before the browser paints.
      // gsap.set([leftRef.current, rightRef.current], {
      //   yPercent: 100,
      //   opacity: 0,
      // });

      const timeline = gsap.timeline({
        onComplete: () => completeRef.current(),
      });

      timeline
        .fromTo(
          [leftRef.current, rightRef.current],
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
          },
        )
        .to({}, { duration: 1 })
        .call(onReveal)
        .to([leftRef.current, rightRef.current], {
          xPercent: (index) => (index === 0 ? -105 : 105),
          duration: 1.3,
          ease: "power4.inOut",
        })
        .to(
          backdropRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "<",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onReveal]);

  return (
    <div
      ref={containerRef}
      className="fixed font-heading font-extrabold inset-0 overflow-hidden z-150"
    >
      {/* Black backdrop */}
      <div ref={backdropRef} className="absolute inset-0 bg-black" />

      {/* Left curtain */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 z-20 flex w-1/2 pr-6 shrink items-center justify-end bg-black opacity-0"
      >
        <span className="whitespace-nowrap text-[clamp(2.5rem,6vw,10rem)] uppercase tracking-[-0.07em] text-white">
          Built
        </span>
      </div>

      {/* Right curtain */}
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 z-20 flex min-w-1/2 grow pr-4 items-center justify-start bg-black opacity-0"
      >
        <span className="whitespace-nowrap text-[clamp(2.5rem,6vw,10rem)] uppercase tracking-[-0.07em] text-white">
          Different
        </span>
      </div>
    </div>
  );
}
