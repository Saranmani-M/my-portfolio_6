import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Code2 } from "lucide-react";
import { PROFILES } from "../lib/data";

const iconFor = (name) => {
  if (name === "GitHub") return <Github size={20} />;
  return <Code2 size={20} />;
};

export const CodingProfiles = () => {
  return (
    <section
      id="profiles"
      data-testid="profiles-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-6">
            (Coding Profiles)
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
            Where the <em className="italic">practice</em> happens.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`profile-${p.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative block rounded-3xl border border-white/10 bg-[#0D0D0D]/60 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-72 h-72 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    p.name === "GitHub"
                      ? "radial-gradient(closest-side,#60A5FA,transparent)"
                      : "radial-gradient(closest-side,#A78BFA,transparent)",
                }}
              />
              <div className="relative flex items-start justify-between mb-12">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white/85">
                    {iconFor(p.name)}
                  </span>
                  <span className="text-[11px] tracking-[0.28em] uppercase text-white/45">
                    {p.name}
                  </span>
                </div>
                <span className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white/80 transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>
              </div>
              <div className="relative font-serif text-4xl md:text-5xl font-light text-white leading-[1.05]">
                {p.handle}
              </div>
              <p className="relative mt-6 text-[15px] leading-relaxed text-white/60 max-w-md">
                {p.line}
              </p>
              <div className="relative mt-10 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-white/40">
                <span>Visit profile</span>
                <span className="font-mono">/ {String(i + 1).padStart(2, "0")}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
