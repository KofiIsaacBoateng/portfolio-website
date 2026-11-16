"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface IntroProps {
  onReveal: () => void;
  onComplete: () => void;
}

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// 480 microscopic spray droplets (0.18px - 0.72px) so they stay razor-fine on mobile & crisp on desktop
const PAINT_SPECKS = Array.from({ length: 480 }, (_, i) => {
  const isTextBand = i < 240;

  const spreadX = isTextBand
    ? (seeded(i + 1) - 0.5) * 1440
    : (seeded(i + 1) + seeded(i + 101) - 1) * 760;

  const spreadY = isTextBand
    ? (seeded(i + 201) - 0.5) * 145
    : (seeded(i + 201) + seeded(i + 301) - 1) * 390;

  const cx = Math.round((800 + spreadX) * 10) / 10;
  const cy = Math.round((450 + spreadY) * 10) / 10;

  const sizeRoll = seeded(i + 401);
  const r =
    sizeRoll > 0.93
      ? 0.55 + seeded(i + 501) * 0.2
      : sizeRoll > 0.55
        ? 0.32 + seeded(i + 501) * 0.2
        : 0.18 + seeded(i + 501) * 0.14;

  const opacity = isTextBand
    ? 0.82 + seeded(i + 601) * 0.18
    : 0.45 + seeded(i + 601) * 0.5;

  return { cx, cy, r: Math.round(r * 100) / 100, opacity };
});

// 48 fine distressed grit flecks across the letter band
const TEXT_GRIT_PATCHES = Array.from({ length: 48 }, (_, i) => {
  const x =
    Math.round((130 + (i / 47) * 1340 + (seeded(i + 701) - 0.5) * 22) * 10) /
    10;
  const y = Math.round((408 + seeded(i + 801) * 84) * 10) / 10;
  const w = Math.round((2.5 + seeded(i + 901) * 7.5) * 10) / 10;
  const h = Math.round((1.4 + seeded(i + 1001) * 3.8) * 10) / 10;
  const rot = Math.round((seeded(i + 1101) - 0.5) * 26);
  const opacity = 0.85 + seeded(i + 1201) * 0.15;

  return { x, y, w, h, rot, opacity };
});

function PaintMistArtwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://w3.org"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="punisher-grit" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.32"
            numOctaves="3"
            seed="19"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* 480 Microscopic Mist & Dense Text-Band Grit */}
      <g fill="#FFFFFF">
        {PAINT_SPECKS.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            opacity={dot.opacity}
          />
        ))}
      </g>

      {/* Fine Distressed Paint Flecks & 2 Razor-Thin Whip Streaks */}
      <g fill="#FFFFFF" filter="url(#punisher-grit)">
        {TEXT_GRIT_PATCHES.map((p, idx) => (
          <path
            key={idx}
            d={`M${p.x} ${p.y} L${p.x + p.w} ${p.y - p.h * 0.35} L${p.x + p.w * 1.15} ${p.y + p.h * 0.65} L${p.x + p.w * 0.2} ${p.y + p.h} L${p.x - p.w * 0.15} ${p.y + p.h * 0.4} Z`}
            opacity={p.opacity}
            transform={`rotate(${p.rot} ${p.x + p.w / 2} ${p.y + p.h / 2})`}
          />
        ))}

        {/* Just 2 razor-thin horizontal whip streaks */}
        <path d="M180 456 H860 V457.1 H180 Z" opacity="0.82" />
        <path d="M690 438 H1410 V439.1 H690 Z" opacity="0.85" />
      </g>
    </svg>
  );
}

export default function Intro({ onReveal, onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const leftSplatterRef = useRef<HTMLDivElement>(null);
  const rightSplatterRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);

  useLayoutEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => completeRef.current(),
      });

      gsap.set([leftRef.current, rightRef.current], { opacity: 1 });

      timeline
        .fromTo(
          [leftTextRef.current, rightTextRef.current],
          {
            scale: 1.18,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "expo.out",
          },
          0,
        )
        .fromTo(
          [leftSplatterRef.current, rightSplatterRef.current],
          {
            scale: 1.24,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
          },
          0,
        )
        .to({}, { duration: 1.1 })
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
      className="fixed inset-0 z-120 overflow-hidden font-heading font-extrabold select-none"
    >
      {/* Pure black backdrop */}
      <div ref={backdropRef} className="absolute inset-0 bg-black" />

      {/* LEFT CURTAIN ("BUILT") */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 z-20 flex w-1/2 items-center justify-end overflow-hidden bg-black pr-1 sm:pr-3 md:pr-5"
      >
        <span
          ref={leftTextRef}
          className="relative z-10 origin-right whitespace-nowrap text-[10vw] uppercase leading-none tracking-[-0.06em] text-white opacity-0"
        >
          Built
        </span>

        <div
          ref={leftSplatterRef}
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[200%] origin-center mix-blend-difference opacity-0"
        >
          <PaintMistArtwork className="h-full w-full" />
        </div>
      </div>

      {/* RIGHT CURTAIN ("DIFFERENT") */}
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 z-20 flex w-1/2 items-center justify-start overflow-hidden bg-black pl-1 sm:pl-3 md:pl-5"
      >
        <span
          ref={rightTextRef}
          className="relative z-10 origin-left whitespace-nowrap text-[10vw] uppercase leading-none tracking-[-0.06em] text-white opacity-0"
        >
          Different
        </span>

        <div
          ref={rightSplatterRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[200%] origin-center mix-blend-difference opacity-0"
        >
          <PaintMistArtwork className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
