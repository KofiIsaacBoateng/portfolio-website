"use client";

import React, { RefObject, useEffect, useState } from "react";

interface TerminalProps {
  commandCharRefs: RefObject<(HTMLElement | null)[]>;
}

export const COMMAND =
  "./init --profile=engineer --mode=systems --focus=building";

const Terminal = ({ commandCharRefs }: TerminalProps) => {
  const [loginDate, setLoginDate] = useState<string>("");

  useEffect(() => {
    (() => {
      setLoginDate(new Date().toDateString());
    })();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center px-4 md:pl-[10vw] lg:pl-[12vw]">
      {/* 1. Monochrome CRT TV Terminal Window */}
      <div
        className="about-command pointer-events-auto invisible relative w-full max-w-lg origin-center opacity-0 md:w-[52vw] md:max-w-2xl"
        aria-hidden="true"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#08080a]/85 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-2xl">
          {/* Pure White Phosphor Beam Flash */}
          <div className="crt-flash pointer-events-none absolute inset-0 z-20 bg-white/30 opacity-0" />

          {/* Top Specular Edge Reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />

          {/* Monochrome Window Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/3 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-white/85" />
              <span className="size-3 rounded-full bg-white/45" />
              <span className="size-3 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-0.5 font-sans text-[11px] font-medium tracking-wide text-white/75">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              <span>zsh — kb@portfolio</span>
            </div>

            <div className="w-11" />
          </div>

          {/* Terminal Body */}
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="mb-3 flex items-center justify-between font-terminal text-[11px] text-white/40">
              <span>
                Last login: {loginDate || "Session active"} on ttys001
              </span>
              <span className="hidden sm:inline text-white/60">UTF-8</span>
            </div>

            {/* Command Input Line */}
            <div className="flex flex-wrap items-center gap-x-1.5 font-terminal text-sm leading-relaxed tracking-normal sm:text-base">
              <div className="flex shrink-0 items-center gap-1.5 select-none">
                <span className="font-semibold text-white">kb@portfolio</span>
                <span className="text-white/40">~</span>
                <span className="font-bold text-white">%</span>
              </div>

              {/* Typed Command Characters + Cursor */}
              <span className="ml-1 inline-flex flex-wrap items-center text-white/95">
                {COMMAND.split("").map((character, index) => (
                  <span
                    key={index}
                    ref={(element) => {
                      commandCharRefs.current[index] = element;
                    }}
                    className="command-char hidden"
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                ))}

                <span
                  aria-hidden="true"
                  className="terminal-cursor ml-1 inline-block h-4 w-1.5 shrink-0 rounded-xs bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Monochrome "Executing..." Display */}
      <div
        className="executing-banner pointer-events-none invisible absolute flex items-center gap-3 rounded-full border border-white/25 bg-[#08080a]/90 px-6 py-3 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl"
        aria-hidden="true"
      >
        <span className="size-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
        <span className="font-terminal text-sm font-medium tracking-wider text-white sm:text-base">
          Executing...
        </span>
      </div>
    </div>
  );
};

export default Terminal;
