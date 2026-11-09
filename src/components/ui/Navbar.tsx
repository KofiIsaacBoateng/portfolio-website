"use client";

import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-100 backdrop-blur-md flex items-center justify-between px-4 py-6 md:px-10">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-1.5 text-sm font-heading font-semibold text-white"
        >
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_15px_#dfe7e8]" />
          KB
        </a>

        {/* Menu button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-1 rounded-full border border-white/70 px-3 py-1.5 text-[10px] text-white transition-opacity hover:opacity-60 cursor-pointer"
        >
          {/* Hamburger → X */}
          <span className="relative flex h-3 w-5 flex-col gap-2 justify-center items-end">
            <span
              className={`absolute h-px w-3 bg-current transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-45" : "-translate-y-0.75"
              }`}
            />

            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-300 ease-in-out ${
                isOpen ? "scale-x-0" : "scale-x-100"
              }`}
            />

            <span
              className={`absolute h-px w-3 bg-current transition-transform duration-300 ease-in-out ${
                isOpen ? "-rotate-45" : "translate-y-0.75"
              }`}
            />
          </span>

          {/* Menu → Close */}
          <span className="h-[1em] overflow-hidden leading-none">
            <span
              className={`flex flex-col font-sans font-semibold transition-transform duration-300 ease-in-out ${
                isOpen ? "-translate-y-1/2" : "translate-y-0"
              }`}
            >
              <span className="h-[1em]">Menu</span>
              <span className="h-[1em]">Close</span>
            </span>
          </span>
        </button>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-80 bg-black/60 transition-opacity duration-500 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Side drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-90 flex h-svh w-full flex-col justify-center bg-[#080808] px-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[min(480px,85vw)] sm:px-14 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-5">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              className={`flex items-baseline gap-5 text-5xl font-heading font-medium tracking-tight text-white sm:text-5xl transition-transform duration-500 ${
                isOpen ? "translate-x-0" : "translate-x-100"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <span className="font-sans text-[1rem] text-white/50">
                0{index + 1}
              </span>

              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
