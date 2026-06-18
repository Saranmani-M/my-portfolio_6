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

              {/* Lanyard SVG */}
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Lanyard rope - left side */}
                <path
                  d="M40 0 C40 0, 10 20, 10 60 C10 80, 30 90, 40 100"
                  stroke="url(#lanyardGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Lanyard rope - right side */}
                <path
                  d="M40 0 C40 0, 70 20, 70 60 C70 80, 50 90, 40 100"
                  stroke="url(#lanyardGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Clasp body */}
                <rect x="28" y="95" width="24" height="18" rx="4" fill="url(#claspGrad)" />
                {/* Clasp highlight */}
                <rect x="28" y="95" width="24" height="6" rx="4" fill="white" fillOpacity="0.15" />
                {/* Clasp hole */}
                <rect x="35" y="100" width="10" height="8" rx="2" fill="#050505" />
                {/* Clasp screw left */}
                <circle cx="32" cy="104" r="2" fill="#333" />
                {/* Clasp screw right */}
                <circle cx="48" cy="104" r="2" fill="#333" />

                <defs>
                  <linearGradient id="lanyardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#444444" />
                    <stop offset="50%" stopColor="#666666" />
                    <stop offset="100%" stopColor="#e8ff47" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="claspGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#888888" />
                    <stop offset="100%" stopColor="#333333" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Card */}
              <motion.div
                whileHover={{ rotate: 4, y: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 8 }}
                className="w-[240px] rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl cursor-pointer mt-[-12px]"
                style={{
                  background: "linear-gradient(145deg, #161616 0%, #1e1e1e 50%, #111111 100%)",
                  height: 340,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                {/* Glossy top shine */}
                <div
                  className="absolute top-0 left-0 right-0 h-[45%] rounded-t-3xl opacity-5"
                  style={{
                    background: "linear-gradient(180deg, white 0%, transparent 100%)",
                  }}
                />

                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, #e8ff47 0px, #e8ff47 1px, transparent 1px, transparent 35px),
                                      repeating-linear-gradient(90deg, #e8ff47 0px, #e8ff47 1px, transparent 1px, transparent 35px)`,
                  }}
                />

                {/* Glow */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
                  style={{ background: "#e8ff47", opacity: 0.08, filter: "blur(50px)" }}
                />

                {/* Top row — logo dot + year */}
                <div className="relative z-10 flex justify-between items-start">
                  <div
                    className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center"
                    style={{ background: "#e8ff4718" }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: "#e8ff47" }}
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-light">
                    2026
                  </span>
                </div>

                {/* Middle — big monogram watermark */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div
                    className="font-serif select-none"
                    style={{
                      fontSize: "7rem",
                      fontWeight: 300,
                      color: "#e8ff47",
                      opacity: 0.07,
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    SM
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="relative z-10 h-px w-full mb-4 opacity-10"
                  style={{
                    background: "linear-gradient(90deg, transparent, #e8ff47, transparent)",
                  }}
                />

                {/* Bottom — name & role */}
                <div className="relative z-10">
                  <div className="text-[8px] tracking-[0.35em] uppercase mb-2"
                    style={{ color: "#e8ff4799" }}>
                    Cloud Security Engineer
                  </div>
                  <div
                    className="font-sans font-bold text-white leading-tight"
                    style={{ fontSize: "1.6rem" }}
                  >
                    Saranmani M
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ background: "#e8ff47" }}
                    />
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/30">
                      Vel Tech · Chennai, India
                    </span>
                  </div>
                </div>

                {/* Bottom shine */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-30"
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
