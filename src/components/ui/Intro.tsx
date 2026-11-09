"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);

  useLayoutEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => completeRef.current(),
      });

      timeline
        .fromTo(
          [leftRef.current, rightRef.current],
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
          },
        )
        .to({}, { duration: 1 })
        .to(leftRef.current, {
          xPercent: -105,
          duration: 1.3,
          ease: "power4.inOut",
        })
        .to(
          rightRef.current,
          {
            xPercent: 105,
            duration: 1.3,
            ease: "power4.inOut",
          },
          "<",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed font-heading font-extrabold inset-0 z-100 overflow-hidden bg-black"
    >
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 z-20 flex w-1/2 pr-6 shrink items-center justify-end bg-black"
      >
        <span className="whitespace-nowrap text-[clamp(2.5rem,6vw,10rem)] uppercase tracking-[-0.07em] text-white">
          Built
        </span>
      </div>

      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 z-20 flex min-w-1/2 grow pr-4 items-center justify-start bg-black"
      >
        <span className="whitespace-nowrap text-[clamp(2.5rem,6vw,10rem)] uppercase tracking-[-0.07em] text-white">
          Different
        </span>
      </div>
    </div>
  );
}
