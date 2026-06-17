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
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 md:gap-14">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-5">
                (About)
              </div>
              <motion.h2
                style={{ y }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1] text-white"
              >
                A student of{" "}
                <em className="italic text-[#e8ff47]/85">infrastructure</em>,
                calm and secure.
              </motion.h2>
              <p className="mt-7 text-sm tracking-wide text-white/50 max-w-xs">
                {PROFILE.location} · Bachelor of Information Technology · Final
                year
              </p>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8 md:col-start-6 lg:col-start-6 space-y-8 md:space-y-10">
          <Reveal delay={0.1}>
            <h3 className="font-serif text-3xl md:text-5xl leading-[1.1] text-white text-balance">
              Building <span className="italic text-white/80">reliable</span>{" "}
              and <span className="italic text-white/80">secure</span> digital
              infrastructure.
            </h3>
          </Reveal>

          <div className="space-y-7 text-[17px] md:text-lg leading-[1.7] text-white/75 max-w-2xl text-pretty">
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
                Beyond coursework, I&rsquo;ve presented research at IEEE and
                ASSET conferences, and I&rsquo;m actively exploring practical
                cryptography — particularly homomorphic schemes that allow
                computation on encrypted data.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {[
                { k: "Focus", v: "Cloud · Storage" },
                { k: "Stack", v: "Python · AWS · Linux" },
                { k: "Status", v: "Open to roles" },
              ].map((m) => (
                <div key={m.k}>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">
                    {m.k}
                  </div>
                  <div className="mt-2 font-serif text-xl text-white">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
