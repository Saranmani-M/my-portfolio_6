import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { PROFILE, SOCIALS } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

const SOCIAL_ICONS = [
  { Icon: Linkedin, url: SOCIALS.linkedin, k: "linkedin" },
  { Icon: Github, url: SOCIALS.github, k: "github" },
  { Icon: Instagram, url: SOCIALS.instagram, k: "instagram" },
  { Icon: Twitter, url: SOCIALS.twitter, k: "x" },
];

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] px-6 md:px-10 lg:px-12 pt-28 md:pt-32 pb-12 md:pb-16"
    >
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left — text */}
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            data-testid="badge-open-to-work"
            className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[11px] tracking-[0.18em] uppercase"
          >
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            Open to Work · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.25, ease: easeOut }}
            data-testid="hero-name"
            className="font-sans font-extrabold tracking-[-0.03em] leading-[0.92] text-white text-[3rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.75rem]"
          >
            Learning Cloud
            <br />
            <span>&amp; Security</span>
            <br />
            Since 2026
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: easeOut }}
            className="mt-10"
          >
            <p className="text-[18px] md:text-[20px] text-white font-medium leading-relaxed">
              Hi, I&rsquo;m Saranmani M
            </p>
            <p
              className="mt-1 text-[15px] md:text-[16px] text-white/55 leading-relaxed"
              data-testid="hero-role"
            >
              IT Student | Learning Linux, Cloud Computing &amp; Python
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: easeOut }}
            data-testid="hero-description"
            className="mt-6 max-w-[520px] text-[14px] md:text-[15px] leading-[1.75] text-white/55"
          >
            Focused on building a strong foundation in cloud technologies,
            automation, and system administration. Currently developing
            hands-on skills through projects and continuous learning, with the
            goal of becoming a Cloud &amp; Storage Engineer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOut }}
            className="mt-9 flex items-center gap-5"
          >
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a
                key={k}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`hero-social-${k}`}
                className="text-white/55 hover:text-[#e8ff47] transition-colors"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-resume"
              className="ml-3 text-[11px] tracking-[0.22em] uppercase text-white/65 hover:text-[#e8ff47] link-underline"
            >
              Résumé →
            </a>
          </motion.div>
        </div>

        {/* Right — framed portrait card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: easeOut, delay: 0.4 }}
            className="relative mx-auto w-[88%] sm:w-[72%] md:w-[64%] lg:w-full max-w-[520px]"
            data-testid="hero-portrait"
          >
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative"
            >
              {/* Yellow strip frame — appears outside the photo on hover */}
              <motion.div
                aria-hidden
                variants={{
                  rest: { opacity: 0, scale: 1.02 },
                  hover: { opacity: 1, scale: 1.06 },
                }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="absolute inset-0 rounded-[34px] pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 0 1.5px #e8ff47, 0 0 40px 6px rgba(232,255,71,0.35), 0 0 120px 20px rgba(232,255,71,0.18)",
                }}
              />

              {/* Card */}
              <motion.div
                variants={{
                  rest: { scale: 1, y: 0 },
                  hover: { scale: 1.025, y: -4 },
                }}
                transition={{ duration: 0.55, ease: easeOut }}
                className="relative rounded-[28px] overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]"
              >
                <img
                  src={PROFILE.photoUrl}
                  alt="Saranmani M"
                  loading="eager"
                  className="w-full h-auto aspect-[4/5] object-cover"
                />

                {/* Top label */}
                <div className="absolute top-5 left-5 right-5 text-[10px] tracking-[0.32em] uppercase text-white/75 mix-blend-difference">
                  FIG · 01 — Portrait
                </div>

                {/* Bottom labels */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[10px] tracking-[0.28em] uppercase text-white/85">
                  <span>Saranmani · M</span>
                  <span className="font-mono">Chennai · IND</span>
                </div>

                {/* Subtle bottom darken so labels read */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505]/55 via-[#050505]/15 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
