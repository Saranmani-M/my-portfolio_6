import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { FEATURED_PROJECT, COMING_PROJECTS } from "../lib/data";

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

export const Projects = () => {
  const { scrollYProgress } = useScroll();
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-32 md:py-44 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-20 md:mb-28">
          <Reveal>
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-6">
              (Selected Work)
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              Case studies, not <em className="italic">cards</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              One project I&rsquo;m proud to talk about. Others, quietly in
              motion.
            </p>
          </Reveal>
        </div>

        {/* Featured case study */}
        <article className="relative" data-testid="featured-project">
          {/* Meta header */}
          <Reveal>
            <div className="grid grid-cols-12 gap-6 pb-8 border-b border-white/10 mb-10 md:mb-14">
              <div className="col-span-12 md:col-span-7">
                <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] text-balance">
                  {FEATURED_PROJECT.title}
                  <br />
                  <em className="italic text-white/70">
                    {FEATURED_PROJECT.subtitle}
                  </em>
                </h3>
              </div>
              <div className="col-span-6 md:col-span-2 md:col-start-9">
                <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">
                  Year
                </div>
                <div className="mt-2 text-white/85 font-mono">
                  {FEATURED_PROJECT.year}
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">
                  Role
                </div>
                <div className="mt-2 text-white/85">{FEATURED_PROJECT.role}</div>
              </div>
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/9] mb-16 md:mb-24">
              <motion.img
                src={FEATURED_PROJECT.cover}
                alt="Secure Cloud Storage System"
                style={{ y: imgY }}
                className="w-full h-[120%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[10px] tracking-[0.28em] uppercase text-white/70">
                <span>FIG · 02 — System Cover</span>
                <span className="font-mono">2025</span>
              </div>
            </div>
          </Reveal>

          {/* Body */}
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            {/* Problem */}
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                  01 / Problem
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="col-span-12 md:col-span-8 md:col-start-5">
              <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-white/90 text-balance">
                {FEATURED_PROJECT.problem}
              </p>
            </Reveal>

            <div className="col-span-12 hairline my-8" />

            {/* Solution */}
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                  02 / Solution
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="col-span-12 md:col-span-8 md:col-start-5">
              <p className="text-lg md:text-xl leading-[1.7] text-white/75 text-pretty">
                {FEATURED_PROJECT.solution}
              </p>
            </Reveal>

            <div className="col-span-12 hairline my-8" />

            {/* Architecture */}
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                  03 / Architecture
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="col-span-12 md:col-span-8 md:col-start-5">
              <ol className="space-y-4">
                {FEATURED_PROJECT.architecture.map((line, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-5 text-white/80"
                  >
                    <span className="font-mono text-[11px] text-white/35 mt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] leading-relaxed">{line}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="col-span-12 hairline my-8" />

            {/* Tech */}
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                  04 / Technologies
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="col-span-12 md:col-span-8 md:col-start-5">
              <div className="flex flex-wrap gap-2">
                {FEATURED_PROJECT.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-1.5 text-[12px] tracking-wide rounded-full border border-white/15 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="col-span-12 hairline my-8" />

            {/* Outcome */}
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="text-[11px] tracking-[0.28em] uppercase text-white/40">
                  05 / Outcome
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="col-span-12 md:col-span-8 md:col-start-5">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-white">
                {FEATURED_PROJECT.outcome}
              </p>
            </Reveal>
          </div>
        </article>

        {/* Coming soon list */}
        <div className="mt-36 md:mt-48">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <h3 className="font-serif text-3xl md:text-5xl font-light text-white">
                In <em className="italic">motion</em>
              </h3>
              <p className="text-sm text-white/50 max-w-xs">
                A few things forming. Documented when they&rsquo;re ready, not before.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {COMING_PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                data-testid={`coming-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
                className="group grid grid-cols-12 gap-4 py-8 md:py-10 items-center"
              >
                <div className="col-span-1 font-mono text-[11px] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 md:col-span-6 font-serif text-2xl md:text-4xl text-white/85 group-hover:text-white transition-colors">
                  {p.title}
                </div>
                <div className="col-span-3 md:col-span-3 text-[12px] tracking-[0.18em] uppercase text-white/45">
                  {p.discipline}
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-2 text-[11px] tracking-[0.28em] uppercase text-white/50">
                  <Asterisk size={12} className="opacity-60" />
                  {p.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ArrowChip = () => (
  <span className="inline-flex items-center gap-1 text-white/70">
    Read <ArrowUpRight size={12} />
  </span>
);
