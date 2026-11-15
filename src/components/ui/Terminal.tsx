"use client";

import React, { RefObject } from "react";

interface TerminalProps {
  commandCharRefs: RefObject<(HTMLElement | null)[]>;
}

export const COMMAND =
  "./init --profile=engineer --mode=systems --focus=building";

const Terminal = ({ commandCharRefs }: TerminalProps) => {
  return (
    /* Full-screen flex wrapper handles centering */
    <div className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center px-4 md:pl-[8vw] lg:pl-[10vw]">
      {/* 1. CRT TV Terminal Window */}
      <div
        className="about-command pointer-events-auto invisible relative w-full max-w-lg origin-center opacity-0 md:w-[52vw] md:max-w-2xl"
        aria-hidden="true"
      >
        {/* iOS / macOS Frosted Glass Window */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0c1015]/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-2xl">
          {/* CRT Beam Flash Overlay (brightens when snapping open/closed) */}
          <div className="crt-flash pointer-events-none absolute inset-0 z-20 bg-[#35E89A]/25 opacity-0" />

          {/* Top Specular Edge Reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* iOS / macOS Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F56] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
              <span className="size-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
              <span className="size-3 rounded-full bg-[#27C93F] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-0.5 font-sans text-[11px] font-medium tracking-wide text-white/60">
              <span className="size-1.5 rounded-full bg-[#35E89A]" />
              <span>zsh — kb@portfolio</span>
            </div>

            <div className="w-11" />
          </div>

          {/* Terminal Body */}
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="mb-3 flex items-center justify-between font-terminal text-[11px] text-white/35">
              <span>Last login: {new Date().toDateString()} on ttys001</span>
              <span className="hidden sm:inline text-emerald-400/60">
                UTF-8
              </span>
            </div>

            {/* Command Input Line */}
            <div className="flex flex-wrap items-center gap-x-1.5 font-terminal text-sm leading-relaxed tracking-normal">
              <div className="flex shrink-0 items-center gap-1.5 select-none">
                <span className="font-semibold text-[#35E89A]">
                  kb@portfolio
                </span>
                <span className="text-white/40">~</span>
                <span className="font-bold text-[#35E89A]">%</span>
              </div>

              {/* Typed Command Characters + Cursor */}
              <span className="ml-1 inline-flex flex-wrap items-center text-[#E6F4EE]">
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
                  className="terminal-cursor ml-1 inline-block h-4 w-1.5 shrink-0 rounded-[2px] bg-[#35E89A] shadow-[0_0_10px_rgba(53,232,154,0.75)]"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "Executing..." Display (Appears right after CRT shuts down) */}
      <div
        className="executing-banner pointer-events-none invisible absolute flex items-center gap-3 rounded-full border border-emerald-400/25 bg-[#0c1015]/85 px-6 py-3 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl"
        aria-hidden="true"
      >
        {/* Spinning iOS-style Activity Ring */}
        <span className="size-4 animate-spin rounded-full border-2 border-[#35E89A]/25 border-t-[#35E89A]" />

        <span className="font-terminal text-sm font-medium tracking-wider text-[#E6F4EE] sm:text-base">
          Executing...
        </span>
      </div>
    </div>
  );
};

export default Terminal;
