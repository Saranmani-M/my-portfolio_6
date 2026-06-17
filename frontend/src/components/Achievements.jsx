import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ACHIEVEMENTS, CERTIFICATIONS } from "../lib/data";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Achievements = () => {
  return (
    <section
      id="achievements"
      data-testid="achievements-section"
      className="relative py-20 md:py-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-5 flex items-center gap-3">
            <Trophy size={13} className="text-[#e8ff47]" />
            (Achievements)
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              Quietly <em className="italic">recognised</em>.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              A few moments worth noting — small markers along a long road.
            </p>
          </div>
        </Reveal>

        {/* Achievements list */}
        <div className="mt-14 divide-y divide-white/10 border-t border-b border-white/10">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`achievement-${i}`}
              className="grid grid-cols-12 gap-4 py-7 md:py-9 items-center"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-[11px] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-6">
                <div className="font-serif text-2xl md:text-3xl text-white leading-tight">
                  {a.title}
                </div>
                <div className="mt-1.5 text-[13px] text-white/55">{a.line}</div>
              </div>
              <div className="col-span-7 md:col-span-3 text-[12px] tracking-[0.18em] uppercase text-white/45">
                {a.org}
              </div>
              <div className="col-span-5 md:col-span-2 flex items-center justify-end gap-2 text-[11px] tracking-[0.22em] uppercase text-[#e8ff47]/90 font-mono">
                {a.date}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-24 md:mt-28">
          <Reveal>
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-5">
              (Certifications)
            </div>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-white leading-[1] mb-12">
              Course<span className="italic">work</span> &amp; credentials.
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                data-testid={`cert-${i}`}
                className="group relative rounded-3xl border border-white/10 bg-[#0D0D0D]/60 backdrop-blur-sm p-7 md:p-8 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-25 blur-3xl group-hover:opacity-40 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(closest-side,#e8ff47,transparent)",
                  }}
                />
                <div className="relative flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] text-white/40">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#e8ff47]/80">
                    Cert
                  </span>
                </div>
                <h4 className="relative font-serif text-2xl md:text-3xl font-light text-white leading-snug">
                  {c.title}
                </h4>
                <p className="relative mt-3 text-[12px] tracking-[0.18em] uppercase text-white/45">
                  {c.org}
                </p>
                <p className="relative mt-5 text-[14px] leading-relaxed text-white/60">
                  {c.line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
