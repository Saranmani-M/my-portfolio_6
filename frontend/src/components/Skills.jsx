import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../lib/data";

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-20 md:py-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-6">
              (Skills · 05)
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              A quiet, deliberate <em className="italic">toolkit</em>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="max-w-sm text-sm leading-relaxed text-white/55"
          >
            Tools I&rsquo;ve lived inside long enough to trust. No grand stack
            chart, no progress bars — just the things I keep reaching for.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 md:gap-x-12">
          {SKILL_GROUPS.map((g, idx) => (
            <motion.div
              key={g.title}
              data-testid={`skill-group-${g.index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative pt-8 border-t border-white/10"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[11px] text-white/40 tracking-widest">
                  {g.index}
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-white/30">
                  Category
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-6 transition-transform group-hover:-translate-y-0.5">
                {g.title}
              </h3>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] text-white/65 tracking-wide flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-20 md:mt-24 relative overflow-hidden border-y border-white/10 py-7">
          <div className="marquee-track flex gap-16 whitespace-nowrap">
            {[
              "Python",
              "AWS",
              "Linux",
              "SAN/NAS",
              "RAID",
              "IAM",
              "S3",
              "EC2",
              "Networking",
              "Backup & Recovery",
              "PuTTY",
              "Git",
            ]
              .concat([
                "Python",
                "AWS",
                "Linux",
                "SAN/NAS",
                "RAID",
                "IAM",
                "S3",
                "EC2",
                "Networking",
                "Backup & Recovery",
                "PuTTY",
                "Git",
              ])
              .map((t, i) => (
                <span
                  key={i}
                  className="font-serif italic text-3xl md:text-5xl text-white/70"
                >
                  {t} <span className="text-white/20 mx-2">·</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
