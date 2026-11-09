import Experience from "../scene/Experience";
import Navbar from "../ui/Navbar";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate h-dvh min-h-175 w-full overflow-hidden bg-black text-white"
    >
      {/* 3D Character */}
      <div className="pointer-events-none absolute inset-0 bg-transparent z-30">
        <div className="absolute inset-0 bg-transparent">
          <Experience />
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col gap-4 min-h-dvh pb-4 md:pb-8 pt-18 px-4 md:px-10">
        {/* Heading - Name */}
        <div className="z-10 flex flex-col items-end size-fit gap-2 uppercase text-nowrap min-w-fit">
          <p className="font-sans text-[clamp(1.1rem,1.5vw,1.5rem)] font-semibold text-white/60">
            Building beyond the ordinary
          </p>

          <h1 className="font-heading text-[clamp(5rem,12vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.065em] text-white">
            BOATENG
          </h1>
        </div>

        {/* Description */}
        <div className="z-10 w-[min(75%,320px)] md:w-[min(50%,380px)] ml-auto md:my-auto hidden md:inline">
          <p className="font-heading text-right text-[clamp(1rem,1vw,1.5rem)] font-medium leading-normal text-white/70">
            Design scalable digital experiences, intelligent systems, and
            reliable software that solve real-world problems.
          </p>
        </div>

        {/* Identity card */}
        <div className="identity-card backdrop-blur-2xl mt-auto z-40 flex w-[min(250px,60%)] flex-col justify-between gap-8 py-6 px-4 text-white md:h-100.5 md:w-80 md:p-6">
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
