import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Asterisk, ArrowUpRight } from "lucide-react";
import { FEATURED_PROJECT, SECOND_PROJECT, COMING_PROJECTS } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: easeOut, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const CaseStudy = ({ p, idx, testId, setCursorState }) => {
  const handleProjectClick = (url) => {
    document.body.style.opacity = "0.3";
    setTimeout(() => {
      window.location.href = url || "#";
    }, 240);
  };

  return (
    <article 
      className="relative mb-32 group" 
      data-testid={testId}
    >
      <div 
        onClick={() => handleProjectClick(p.link)}
        onMouseEnter={() => setCursorState("project")}
        onMouseLeave={() => setCursorState("default")}
        className="block project-card-elem"
      >
        {/* Subtle Number Frame Row */}
        <div className="flex items-center gap-3 text-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4">
          <span>PROJECT // 0{idx + 1}</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* High-Contrast Typographic Header Container */}
        <div className="grid grid-cols-12 gap-6 items-end mb-8">
          <div className="col-span-12 md:col-span-8">
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {p.title} <span className="text-white/40 font-normal">— {p.subtitle}</span>
            </h3>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end gap-10 text-[11px] font-mono tracking-[0.15em] uppercase text-white/50">
            <div>
              <span className="text-white/20 block mb-1">Role:</span>
              <span className="text-white/80">{p.role || "Engineer"}</span>
            </div>
            <div>
              <span className="text-white/20 block mb-1">Year:</span>
              <span className="text-white/80">{p.year}</span>
            </div>
          </div>
        </div>

        {/* Immersive Structural Image Visual Area */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] aspect-[16/9] overflow-hidden mb-10 group-hover:border-white/20 transition-colors duration-500">
          <img
            src={p.cover}
            alt={p.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-90 scale-100 group-hover:scale-[1.02] transition-all duration-700 ease-out will-change-transform grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-80" />
          
          {/* Internal Magnetic Badge Trigger */}
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* Structural Metadata Spec Grid */}
      <div className="grid grid-cols-12 gap-y-6 md:gap-x-12 border-b border-white/[0.06] pb-12">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-2">
            Brief Overview
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {p.problem || p.solution}
          </p>
        </div>

        {p.architecture && (
          <div className="col-span-12 md:col-span-4">
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-3">
              Core Framework
            </div>
            <ul className="space-y-2 text-xs text-white/50">
              {p.architecture.slice(0, 4).map((line, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-white/30 font-mono">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="leading-normal">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="col-span-12 md:col-span-4">
          <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-3">
            Technology Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[11px] font-mono rounded-full bg-white/[0.03] border border-white/[0.06] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export const Projects = () => {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState("default");

  // Lag-free Hardware-Accelerated Animation Loop
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    let animFrameId;
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      }
      animFrameId = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Suppress fallback systems for fully customized experience */
        .project-card-elem, .project-card-elem * {
          cursor: none !important;
        }
      `}</style>

      {/* Dynamic Cursor Target Layer */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999] left-0 top-0 will-change-transform flex items-center justify-center transition-all duration-300 ease-out"
      >
        {cursorState !== "default" && (
          <motion.div 
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-4 py-2 bg-white text-black text-[9px] font-bold font-mono tracking-[0.2em] uppercase rounded-full shadow-2xl border border-black/10 whitespace-nowrap"
          >
            UX Case Study ↗
          </motion.div>
        )}
      </div>

      <section
        id="projects"
        data-testid="projects-section"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#070708]"
      >
        <div className="max-w-6xl mx-auto">
          
          {/* Main Visual Header Row Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24 pb-8 border-b border-white/[0.06]">
            <Reveal>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#e8ff47] block mb-3">
                // Selected Architecture Work
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Case studies, <span className="text-white/40 font-normal">not cards.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-xs md:text-sm leading-relaxed text-white/45 font-light">
                Two infrastructure environments deployed to global production. Documented thoroughly.
              </p>
            </Reveal>
          </div>

          {/* Active Work Grid Rows */}
          <CaseStudy p={FEATURED_PROJECT} idx={0} testId="featured-project" setCursorState={setCursorState} />
          <CaseStudy p={SECOND_PROJECT} idx={1} testId="second-project" setCursorState={setCursorState} />

          {/* Backlogged/Pipeline In Motion Section */}
          <div className="mt-28">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  In <span className="text-white/40 font-normal">motion</span>
                </h3>
                <p className="text-xs text-white/45 max-w-xs font-light">
                  Pipelines currently building. Documented and analyzed when completed.
                </p>
              </div>
            </Reveal>

            <div className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
              {COMING_PROJECTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  data-testid={`coming-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: easeOut }}
                  className="group grid grid-cols-12 gap-4 py-6 md:py-8 items-center hover:bg-white/[0.01] transition-colors px-2 rounded-lg"
                >
                  <div className="col-span-1 font-mono text-[11px] text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-7 md:col-span-6 text-lg md:text-xl font-bold text-white/70 group-hover:text-white transition-colors">
                    {p.title}
                  </div>
                  <div className="col-span-3 md:col-span-3 text-[10px] font-mono tracking-[0.15em] uppercase text-white/45">
                    {p.discipline}
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-2 text-[10px] font-mono text-white/30">
                    <Asterisk size={10} className="text-[#e8ff47]/50 animate-spin-slow" />
                    {p.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
