import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { PROFILE } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-8 md:pb-12 px-6 md:px-12"
    >
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left — editorial typography */}
        <div className="lg:col-span-7 relative z-10">
          {/* Open to work badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            data-testid="badge-open-to-work"
            className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[11px] tracking-[0.18em] uppercase"
          >
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            Open to Work · 2026
          </motion.div>

          <h1
            className="font-serif text-white text-balance leading-[0.92]"
            data-testid="hero-name"
            style={{ letterSpacing: "-0.02em" }}
          >
            {"SARANMANI".split("").map((c, i) => (
              <motion.span
                key={`s1-${i}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.04,
                  ease: easeOut,
                }}
                className="inline-block text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[9rem] font-light"
              >
                {c}
              </motion.span>
            ))}
            <br />
            <span className="inline-flex items-baseline gap-4">
              {"M.".split("").map((c, i) => (
                <motion.span
                  key={`s2-${i}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.65 + i * 0.05,
                    ease: easeOut,
                  }}
                  className="inline-block text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[9rem] font-light italic text-white/85"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: easeOut, delay: 1.05 }}
            className="mt-8 max-w-xl font-serif text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug text-balance"
            data-testid="hero-headline"
          >
            Building <em className="italic text-white">reliable</em> and{" "}
            <em className="italic text-white">secure</em> digital
            infrastructure, calm and precise.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 1.2 }}
            className="mt-6 max-w-md text-base md:text-[17px] leading-relaxed text-[#A1A1AA]"
            data-testid="hero-description"
          >
            {PROFILE.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 1.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              data-testid="cta-projects"
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-[13px] tracking-wide hover:bg-white/90 transition-all"
            >
              View Projects
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a
              data-testid="cta-resume"
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[13px] tracking-wide text-white hover:bg-white/[0.04] transition-all"
            >
              Download Resume <Download size={14} />
            </a>
            <button
              data-testid="cta-contact"
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[13px] tracking-wide text-white/80 hover:text-white hover:border-white/25 transition-all"
            >
              Contact Me <Mail size={13} />
            </button>
          </motion.div>
        </div>

        {/* Right — premium framed portrait (larger + yellow glow) */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: easeOut, delay: 0.3 }}
            className="relative mx-auto w-[88%] sm:w-[72%] md:w-[66%] lg:w-full max-w-[560px]"
            data-testid="hero-portrait"
          >
            {/* Yellow halo */}
            <div
              aria-hidden
              className="absolute -inset-12 rounded-[44px] -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(232,255,71,0.32), rgba(167,139,250,0.18) 55%, transparent 80%)",
                filter: "blur(48px)",
              }}
            />

            {/* Frame */}
            <motion.div
              whileHover={{ scale: 1.015, rotate: -0.4 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative rounded-[32px] overflow-hidden border border-[#e8ff47]/30 portrait-glow-yellow bg-[#0D0D0D]"
            >
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(232,255,71,0.4),transparent_55%)]" />
              <img
                src={PROFILE.photoUrl}
                alt="Saranmani M"
                loading="eager"
                className="w-full h-auto aspect-[4/5] object-cover grayscale-[0.18] contrast-105"
                style={{ filter: "saturate(0.92) brightness(0.98)" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

              {/* Caption */}
              <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between text-[10px] tracking-[0.25em] uppercase text-white/70">
                <span>Saranmani · M</span>
                <span className="font-mono">Chennai · IND</span>
              </div>
            </motion.div>

            {/* Floating meta */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: easeOut, delay: 1.6 }}
              className="absolute -left-4 md:-left-10 top-10 rotate-[-90deg] origin-left text-[10px] tracking-[0.4em] uppercase text-white/40 hidden md:block"
            >
              FIG · 01 — Portrait
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-white/40"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
};
