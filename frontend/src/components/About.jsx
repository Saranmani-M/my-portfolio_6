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

          {/* Right — Name Card */}
          <Reveal delay={0.2}>
            <div
              className="hidden md:flex flex-shrink-0 w-[260px] h-[360px] rounded-3xl border border-white/10 relative overflow-hidden flex-col justify-between p-7 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #0d0d0d 100%)",
              }}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #e8ff47 0px, #e8ff47 1px, transparent 1px, transparent 40px),
                                    repeating-linear-gradient(90deg, #e8ff47 0px, #e8ff47 1px, transparent 1px, transparent 40px)`,
                }}
              />

              {/* Glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10"
                style={{ background: "#e8ff47", filter: "blur(60px)" }}
              />

              {/* Top — year */}
              <div className="relative z-10 flex justify-between items-start">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                  style={{ background: "#e8ff4722" }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "#e8ff47" }} />
                </div>
                <span className="text-[11px] tracking-[0.2em] text-white/25 uppercase">
                  2026
                </span>
              </div>

              {/* Middle decorative lines */}
              <div className="relative z-10 flex flex-col gap-1 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full"
                    style={{
                      background: "#e8ff47",
                      width: `${100 - i * 15}%`,
                      opacity: 1 - i * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Bottom — name & role */}
              <div className="relative z-10">
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/35 mb-3">
                  Cloud Security Engineer
                </div>
                <div className="font-serif text-4xl font-light text-white leading-[1.1]">
                  Saranmani
                  <br />M
                </div>
                <div
                  className="mt-4 text-[9px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: "#e8ff47cc" }}
                >
                  Vel Tech · Chennai, India
                </div>
              </div>

              {/* Bottom shine */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent, #e8ff47, transparent)",
                }}
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
