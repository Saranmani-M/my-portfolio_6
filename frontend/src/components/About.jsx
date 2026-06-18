import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

const IDCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="hidden md:flex flex-col items-center flex-shrink-0">

      {/* Lanyard rope SVG */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg width="100" height="130" viewBox="0 0 100 130" fill="none">
          {/* Left rope */}
          <path
            d="M50 0 C50 0, 15 25, 12 65 C11 85, 35 100, 50 112"
            stroke="url(#ropeL)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right rope */}
          <path
            d="M50 0 C50 0, 85 25, 88 65 C89 85, 65 100, 50 112"
            stroke="url(#ropeR)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Text on lanyard */}
          <text
            x="58" y="45"
            fontSize="6"
            fill="white"
            fillOpacity="0.25"
            transform="rotate(75, 58, 45)"
            fontFamily="monospace"
            letterSpacing="1"
          >
            SARANMANI M
          </text>

          {/* Clasp outer ring */}
          <circle cx="50" cy="112" r="10" stroke="#555" strokeWidth="2.5" fill="#1a1a1a" />
          {/* Clasp inner ring */}
          <circle cx="50" cy="112" r="5" stroke="#777" strokeWidth="1.5" fill="#111" />
          {/* Clasp hook body */}
          <rect x="43" y="118" width="14" height="10" rx="3" fill="url(#hookGrad)" />
          {/* Clasp hook opening */}
          <rect x="46" y="121" width="8" height="5" rx="1.5" fill="#050505" />
          {/* Clasp highlight */}
          <rect x="43" y="118" width="14" height="3" rx="3" fill="white" fillOpacity="0.12" />

          <defs>
            <linearGradient id="ropeL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#555555" />
              <stop offset="100%" stopColor="#333333" />
            </linearGradient>
            <linearGradient id="ropeR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#444444" />
              <stop offset="100%" stopColor="#222222" />
            </linearGradient>
            <linearGradient id="hookGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#888888" />
              <stop offset="100%" stopColor="#333333" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Card drop animation */}
      <motion.div
        initial={{ opacity: 0, y: -120 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{ rotate: 3, y: 8 }}
        style={{ marginTop: -14 }}
      >
        {/* Card */}
        <div
          className="relative w-[260px] rounded-3xl overflow-hidden cursor-pointer"
          style={{ height: 360 }}
        >
          {/* Card background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, #0e0e0e 0%, #161616 50%, #0a0a0a 100%)",
            }}
          />

          {/* Glowing monogram pattern — like the reference image */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Big glowing SM letters tiled */}
            {[
              { top: "5%", left: "20%", size: "5rem", opacity: 0.08 },
              { top: "5%", left: "55%", size: "5rem", opacity: 0.06 },
              { top: "25%", left: "5%", size: "5rem", opacity: 0.05 },
              { top: "25%", left: "38%", size: "6rem", opacity: 0.18, glow: true },
              { top: "25%", left: "68%", size: "5rem", opacity: 0.07 },
              { top: "50%", left: "20%", size: "5rem", opacity: 0.07 },
              { top: "50%", left: "55%", size: "5rem", opacity: 0.05 },
              { top: "70%", left: "5%", size: "5rem", opacity: 0.04 },
              { top: "70%", left: "38%", size: "5rem", opacity: 0.06 },
              { top: "70%", left: "68%", size: "5rem", opacity: 0.04 },
            ].map((item, i) => (
              <div
                key={i}
                className="absolute font-serif select-none"
                style={{
                  top: item.top,
                  left: item.left,
                  fontSize: item.size,
                  color: "white",
                  opacity: item.opacity,
                  fontWeight: 300,
                  lineHeight: 1,
                  filter: item.glow ? "blur(0px) drop-shadow(0 0 20px white)" : "none",
                  transform: "translate(-50%, -50%)",
                }}
              >
                SM
              </div>
            ))}
          </div>

          {/* Radial glow center */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 60% 35%, rgba(255,255,255,0.08) 0%, transparent 65%)",
            }}
          />

          {/* Top gradient fade for text readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%]"
            style={{
              background: "linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.7) 60%, transparent 100%)",
            }}
          />

          {/* Year — top right */}
          <div className="absolute top-5 right-5 z-10">
            <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-light">
              2026
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
            {/* Name */}
            <div
              className="font-sans font-bold text-white leading-[1.05] mb-2"
              style={{ fontSize: "2rem" }}
            >
              Saranmani
              <br />M
            </div>

            {/* Role */}
            <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-3">
              Cloud Security Engineer
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 mb-3" />

            {/* Company */}
            <div className="text-[9px] tracking-[0.25em] uppercase text-white/30">
              Vel Tech
            </div>
          </div>

          {/* Border loading animation */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ borderRadius: "1.5rem" }}
          >
            <rect
              x="1" y="1"
              width="258" height="358"
              rx="23" ry="23"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.15"
            />
            {isInView && (
              <motion.rect
                x="1" y="1"
                width="258" height="358"
                rx="23" ry="23"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="1234"
                strokeDashoffset="1234"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
                style={{ filter: "drop-shadow(0 0 4px white)" }}
              />
            )}
          </svg>

        </div>
      </motion.div>
    </div>
  );
};

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

          {/* Right — ID Card */}
          <IDCard />

        </div>
      </div>
    </section>
  );
};
