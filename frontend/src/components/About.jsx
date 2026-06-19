import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
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

  const cardRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 150, damping: 18 });
  const springY = useSpring(my, { stiffness: 150, damping: 18 });
  const tiltX = useTransform(springY, [0, 1], [8, -8]);
  const tiltY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div ref={ref} className="hidden md:flex flex-col items-center flex-shrink-0">
      {/* Ribbon strap */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg width="64" height="150" viewBox="0 0 64 150" fill="none">
          <rect x="22" y="0" width="20" height="118" rx="2" fill="url(#ribbonGrad)" />
          <line x1="32" y1="0" x2="32" y2="118" stroke="black" strokeOpacity="0.35" strokeWidth="1" />
          <path
            d="M28 14 L32 8 L36 14 L33 14 L33 20 L31 20 L31 14 Z"
            fill="white"
            fillOpacity="0.85"
          />
          <text
            x="38"
            y="0"
            fontSize="7"
            fontWeight="700"
            fill="white"
            fillOpacity="0.85"
            fontFamily="sans-serif"
            letterSpacing="0.5"
            transform="rotate(90, 38, 0)"
          >
            SARANMANI M
          </text>
          <rect x="20" y="116" width="24" height="22" rx="11" fill="url(#claspGrad)" />
          <circle cx="32" cy="123" r="6" fill="#0a0a0a" stroke="#444" strokeWidth="1" />
          <path
            d="M32 138 C 32 142, 28 144, 28 148 C 28 152, 36 152, 36 148 C 36 144, 32 142, 32 138"
            stroke="#222"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="50%" stopColor="#1c1c1c" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="claspGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3a3a" />
              <stop offset="100%" stopColor="#0e0e0e" />
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
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-[300px] rounded-2xl overflow-hidden cursor-pointer"
          style={{ height: 420, perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* Card background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(145deg, #0e0e0e 0%, #161616 50%, #0a0a0a 100%)",
              }}
            />

            {/* ── PHOTO ADDED HERE ── fills the top ~60% of card, grayscale + fade at bottom */}
            <div className="absolute inset-0 z-[1]" style={{ height: "62%" }}>
              <img
                src={PROFILE.photoUrl}
                alt="Saranmani M"
                className="w-full h-full object-cover object-top"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />
              {/* Fade photo into card bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                  background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Diagonal zigzag pattern — overlaid on photo with low opacity */}
            <div className="absolute inset-0 overflow-hidden z-[2]">
              <svg width="100%" height="100%" viewBox="0 0 300 420" preserveAspectRatio="none">
                {Array.from({ length: 9 }).map((_, row) =>
                  Array.from({ length: 4 }).map((_, col) => {
                    const x = col * 90 - 60;
                    const y = row * 60 - 40;
                    return (
                      <path
                        key={`${row}-${col}`}
                        d={`M ${x} ${y} L ${x + 22} ${y + 30} L ${x + 44} ${y} L ${x + 22} ${y - 30} Z`}
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.07"
                        strokeWidth="2.2"
                      />
                    );
                  })
                )}
              </svg>
            </div>

            {/* Diagonal light streak / glare */}
            <div
              className="absolute inset-0 z-[3]"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 47%, rgba(255,255,255,0.02) 56%, transparent 70%)",
              }}
            />

            {/* Radial glow center */}
            <div
              className="absolute inset-0 z-[3]"
              style={{
                background: "radial-gradient(ellipse at 35% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
            />

            {/* Top gradient fade for text readability */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[55%] z-[4]"
              style={{
                background: "linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.7) 60%, transparent 100%)",
              }}
            />

            {/* Year — top right */}
            <div className="absolute top-5 right-5 z-[5]">
              <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-light">
                2026
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-[5] p-6">
              {/* Name */}
              <div
                className="font-sans font-bold text-white leading-[1.05] mb-2"
                style={{ fontSize: "2.25rem" }}
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
              className="absolute inset-0 w-full h-full z-[6]"
              style={{ borderRadius: "1rem" }}
            >
              <rect
                x="1"
                y="1"
                width="298"
                height="418"
                rx="15"
                ry="15"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.15"
              />
              {isInView && (
                <motion.rect
                  x="1"
                  y="1"
                  width="298"
                  height="418"
                  rx="15"
                  ry="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="1440"
                  strokeDashoffset="1440"
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
                  style={{ filter: "drop-shadow(0 0 4px white)" }}
                />
              )}
            </svg>
          </motion.div>
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
                Building <span className="italic text-white/80">reliable</span>
                {" "}
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
