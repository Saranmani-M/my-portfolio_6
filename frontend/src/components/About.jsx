import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "../lib/data";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">

        {/* (About) label */}
        <Reveal>
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-10 text-center">
            (About)
          </div>
        </Reveal>

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">

          {/* Left — text content */}
          <div className="flex-1 space-y-8">
            <Reveal delay={0.1}>
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.1] text-white text-balance">
                Building <span className="italic text-white/80">reliable</span>{" "}
                and <span className="italic text-white/80">secure</span> digital
                infrastructure.
              </h3>
            </Reveal>

            <div className="space-y-6 text-[17px] md:text-lg leading-[1.7] text-white/75 max-w-2xl">
              <Reveal delay={0.05}>
                <p>
                  {PROFILE.bio.split("CYBERNIX")[0]}
                  <em className="italic text-white">CYBERNIX</em>
                  {PROFILE.bio.includes("CYBERNIX")
                    ? PROFILE.bio.split("CYBERNIX")[1]
                    : ""}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  My current focus sits at the intersection of{" "}
                  <em className="italic text-white">cloud security</em> and{" "}
                  <em className="italic text-white">storage administration</em> —
                  designing systems that are easy to trust and hard to break.
                  Python is the language I reach for most, and Linux is where I
                  feel at home.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Beyond academics, I&rsquo;ve presented research at IEEE and
                  ASSET conferences, and I&rsquo;m actively exploring practical
                  cryptography — particularly homomorphic schemes that allow
                  computation on encrypted data.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="pt-6 border-t border-white/5 text-[13px] tracking-[0.18em] uppercase text-white/45">
                Focus · Cloud &amp; Storage Engineering — Open to roles ·
                Chennai, India
              </div>
            </Reveal>
          </div>

          {/* Right — ID Card with Lanyard */}
          <Reveal delay={0.2}>
            <div className="hidden md:flex flex-col items-center flex-shrink-0">

              {/* Lanyard string */}
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
                {/* Hook */}
                <div className="w-5 h-5 rounded-full border-2 border-white/30 flex items-center justify-center mb-[-1px]">
                  <div className="w-2 h-2 rounded-full border border-white/40" />
                </div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ rotate: 3, y: 8 }}
                transition={{ type: "spring", stiffness: 120, damping: 8 }}
                className="w-[220px] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl cursor-pointer"
                style={{
                  background: "linear-gradient(145deg, #131313 0%, #1c1c1c 60%, #0f0f0f 100%)",
                  height: 320,
                }}
              >
                {/* Pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20L0 0h40L20 20zm0 0L0 40h40L20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Glow top right */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                  style={{ background: "#e8ff47", filter: "blur(50px)" }}
                />

                {/* Top row */}
                <div className="relative z-10 flex justify-between items-start">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center"
                    style={{ background: "#e8ff4715" }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#e8ff47" }} />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                    2026
                  </span>
                </div>

                {/* Middle — large monogram */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div
                    className="font-serif text-8xl font-light opacity-10 select-none"
                    style={{ color: "#e8ff47", lineHeight: 1 }}
                  >
                    SM
                  </div>
                </div>

                {/* Bottom — name & role */}
                <div className="relative z-10">
                  <div className="text-[8px] tracking-[0.3em] uppercase text-white/35 mb-2">
                    Cloud Security Engineer
                  </div>
                  <div className="font-sans text-2xl font-bold text-white leading-tight">
                    Saranmani M
                  </div>
                  <div
                    className="mt-3 text-[8px] tracking-[0.25em] uppercase font-medium"
                    style={{ color: "#e8ff47bb" }}
                  >
                    Vel Tech · Chennai
                  </div>
                </div>

                {/* Bottom shine line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-20"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #e8ff47, transparent)",
                  }}
                />
              </motion.div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
