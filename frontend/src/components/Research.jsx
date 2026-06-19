import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { RESEARCH } from "../lib/data";

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

export const Research = () => {
  return (
    <section
      id="research"
      data-testid="research-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-[13px] tracking-[0.28em] uppercase text-white/45 mb-5 flex items-center gap-3">
            <BookOpen size={15} className="text-[#e8ff47]" />
            (Research · IEEE)
          </div>
          <h2 className="font-serif text-5xl md:text-8xl font-light text-white text-balance leading-[1]">
            On <em className="italic">cryptography</em>, in print.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-8 md:gap-14">

          {/* Meta */}
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="md:sticky md:top-28 space-y-6">
                <div>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                    Venue
                  </div>
                  <div className="mt-2 font-serif text-2xl text-white">
                    {RESEARCH.venue}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                    Date
                  </div>
                  <div className="mt-2 font-mono text-white/85">
                    {RESEARCH.date}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                    Status
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e8ff47]/30 bg-[#e8ff47]/[0.04] text-[#e8ff47] text-[11px] tracking-[0.18em] uppercase">
                    {RESEARCH.status}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Paper */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h3
                data-testid="research-title"
                className="font-serif text-4xl md:text-6xl font-light text-white leading-[1.05] text-balance"
              >
                {RESEARCH.title}
              </h3>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-lg md:text-xl leading-[1.75] text-white/75 text-pretty">
                {RESEARCH.abstract}
              </p>
            </Reveal>

            {/* Metrics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {RESEARCH.metrics.map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07 }}
                  data-testid={`research-metric-${i}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.015] p-5 hover:border-[#e8ff47]/30 transition-colors"
                >
                  <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">
                    {m.k}
                  </div>
                  <div className="mt-3 font-serif text-3xl md:text-4xl text-white">
                    {m.v}
                  </div>
                  <div className="mt-2 text-[12px] text-white/45">{m.note}</div>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                
                  href="https://customer-assets.emergentagent.com/job_saranmani-portfolio/artifacts/4loeugtd_publised%20certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="research-view-paper"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-[13px] tracking-wide hover:bg-white/90 transition-all"
                >
                  View Paper
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#e8ff47]/90">
                  <ArrowUpRight size={14} />
                  Hybrid Paillier × ElGamal
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
