import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
);

const PROJECT = {
  id: "project-1",
  label: "IEEE ICIRCA 2026",
  title: "Homomorphic Encryption",
  subtitle: "Hybrid Paillier & ElGamal Approach",
  role: "Lead Researcher",
  year: "2026",
  venue: "ICIRCA 2026 · RVS College, Coimbatore",
  link: "https://github.com/Saranmani-M",
  cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
  overview:
    "Designed a secure hybrid framework combining Paillier (additive) and ElGamal (multiplicative) homomorphic encryption schemes, enabling computations on encrypted cloud data without ever decrypting it. Evaluated on 385 stratified random samples across structured, semi-structured, and unstructured data types in a simulated cloud environment.",
  stack: ["Python", "Paillier Encryption", "ElGamal Encryption", "Cloud Security", "Cryptography", "IEEE"],
  metrics: [
    { value: "0.085s", label: "Paillier Encrypt" },
    { value: "99%",   label: "Data Integrity"  },
    { value: "385",   label: "Data Samples"    },
  ],
};

export const Projects = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      window.open(PROJECT.link, "_blank", "noopener,noreferrer");
      setIsNavigating(false);
    }, 350);
  };

  return (
    <>
      <style>{`
        @keyframes subtle-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation: subtle-spin 12s linear infinite; }
      `}</style>

      {/* Page-fade overlay on click */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-[#070708] z-[999999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <section
        id="projects"
        data-testid="projects-section"
        className="relative py-20 md:py-32 px-6 md:px-12 bg-[#070708] overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Centered header (same style as About) ── */}
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-4">
                (Projects)
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Featured{" "}
                <span className="text-white/40 font-normal italic">Projects</span>
              </h2>
            </div>
          </Reveal>

          {/* ── Single large project card ── */}
          <Reveal delay={0.1}>
            <div
              onClick={handleClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500"
              style={{ cursor: "none" }}
            >
              {/* Cover image — full width, tall */}
              <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 45vw, 540px)" }}>
                <img
                  src={PROJECT.cover}
                  alt={PROJECT.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-55 group-hover:opacity-90 scale-100 group-hover:scale-[1.02] transition-all duration-700 ease-out will-change-transform"
                />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/40 to-transparent" />

                {/* IEEE badge — top left */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono tracking-[0.18em] uppercase text-white/70 backdrop-blur-sm">
                    ◆ {PROJECT.label}
                  </span>
                </div>

                {/* Hover CTA pill — center */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 backdrop-blur-md text-black text-[11px] font-bold tracking-[0.18em] uppercase shadow-2xl">
                    View on GitHub <ArrowUpRight size={14} />
                  </div>
                </motion.div>

                {/* Arrow button — bottom right */}
                <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="p-6 sm:p-8 md:p-10">

                {/* Index + divider */}
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-white/25 uppercase mb-6">
                  <span>PROJECT // 01</span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span>{PROJECT.year}</span>
                </div>

                {/* Title row */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {PROJECT.title}
                    </h3>
                    <p className="text-white/40 font-normal text-base sm:text-lg mt-1">
                      — {PROJECT.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-8 text-[11px] font-mono tracking-[0.15em] uppercase shrink-0">
                    <div>
                      <span className="text-white/20 block mb-1">Role</span>
                      <span className="text-white/75">{PROJECT.role}</span>
                    </div>
                    <div>
                      <span className="text-white/20 block mb-1">Venue</span>
                      <span className="text-white/75 text-[10px]">{PROJECT.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] mb-6" />

                {/* 3-col bottom: overview · stack · metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                  {/* Overview */}
                  <div className="sm:col-span-1">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-3">
                      Overview
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 font-light">
                      {PROJECT.overview}
                    </p>
                  </div>

                  {/* Stack */}
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-3">
                      Stack & Keywords
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-white/[0.04] border border-white/[0.08] text-white/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-3">
                      Key Results
                    </div>
                    <div className="flex flex-col gap-3">
                      {PROJECT.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-white">{m.value}</span>
                          <span className="text-[10px] uppercase font-mono text-white/35">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
};
