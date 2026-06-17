import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Asterisk } from "lucide-react";

const TESTIMONIALS = [
  [
    {
      title: "Research clarity",
      body:
        "Saranmani's paper on hybrid Paillier × ElGamal stood out for its rigor and the unusual clarity with which he explained a notoriously complex topic. A student who reads, builds and writes — rare combination.",
      name: "Faculty Reviewer",
      role: "Department of IT · Vel Tech",
      initials: "VT",
      color: "#A78BFA",
    },
    {
      title: "Calm under pressure",
      body:
        "We collaborated through CYBERNIX '25 and he was the one keeping the project honest — methodical, security-minded and quietly excellent on deadline.",
      name: "Project Teammate",
      role: "CYBERNIX '25 · Co-presenter",
      initials: "CN",
      color: "#60A5FA",
    },
  ],
  [
    {
      title: "Storage instincts",
      body:
        "Across SAN/NAS labs Saranmani showed an unusual feel for the physical side of storage — RAID layouts, backup windows, the small failure modes that matter in production.",
      name: "Lab Coordinator",
      role: "Storage Systems · Vel Tech",
      initials: "LC",
      color: "#e8ff47",
    },
    {
      title: "Genuinely helpful",
      body:
        "He's the person who quietly fixes other people's Linux setups before sitting down with his own. The kind of teammate I'd want on call.",
      name: "Peer · Class of 2026",
      role: "Information Technology",
      initials: "PR",
      color: "#f472b6",
    },
  ],
];

export const Testimonials = () => {
  const [page, setPage] = useState(0);

  const go = (dir) => {
    setPage((p) => (p + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const items = TESTIMONIALS[page];

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-extrabold tracking-[-0.02em] leading-[1.1] text-white text-3xl md:text-5xl lg:text-6xl max-w-4xl"
        >
          Hear it from the people
          <br />
          <span className="text-white/55">
            who totally didn&rsquo;t get paid to say this.
          </span>
        </motion.h2>

        {/* Testimonial pair */}
        <div className="mt-14 md:mt-20 min-h-[380px] md:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
            >
              {items.map((t, i) => (
                <div
                  key={i}
                  data-testid={`testimonial-${page}-${i}`}
                  className="flex flex-col"
                >
                  {/* Title */}
                  <div className="flex items-center gap-3 mb-7">
                    <Asterisk
                      size={28}
                      className="text-white"
                      strokeWidth={2.5}
                    />
                    <h3 className="font-sans font-medium text-white text-2xl md:text-3xl">
                      {t.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-white/55 max-w-[520px]">
                    {t.body}
                  </p>

                  {/* Person */}
                  <div className="mt-8 flex items-center gap-3.5">
                    <span
                      className="w-10 h-10 rounded-full grid place-items-center text-[12px] font-medium text-black"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <div className="text-white text-[14px] font-medium leading-tight">
                        {t.name}
                      </div>
                      <div className="text-white/45 text-[12px] mt-0.5">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            data-testid="testimonials-prev"
            aria-label="Previous"
            className="w-11 h-11 rounded-full border border-white/15 grid place-items-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            data-testid="testimonials-next"
            aria-label="Next"
            className="w-11 h-11 rounded-full border border-white/15 grid place-items-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
