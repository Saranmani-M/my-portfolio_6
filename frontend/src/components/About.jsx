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
      <div className="max-w-3xl mx-auto flex flex-col gap-8 md:gap-14"
        <Reveal>
         <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-5 text-center">
           (About)
         </div>
         </Reveal>

        <div className="w-full space-y-8 md:space-y-10">
          
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
      </div>
    </section>
  );
};
