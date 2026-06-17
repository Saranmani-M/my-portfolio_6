import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X as XIcon, Award, FileText, Star, BookOpen } from "lucide-react";

const CERTS = [
  {
    id: "published",
    title: "IEEE Publication - Homomorphic Encryption",
    org: "ICIRCA 2026 - IEEE",
    pdf: "/publised certificate.pdf",   // ← changed
    accent: "#e8ff47",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    icon: "BookOpen",
    tag: "Research Paper",
  },
  {
    id: "appreciation",
    title: "Certificate of Appreciation",
    org: "Vel Tech - CYBERNIX '25",
    pdf: "/Certificate of Appreciation.pdf",  // ← changed
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #11998e 100%)",
    icon: "Star",
    tag: "Achievement",
  },
  {
    id: "participation1",
    title: "Certificate of Participation",
    org: "Workshop - 2025",
    pdf: "/Certificate of Participation 1.pdf",   // ← changed
    accent: "#60A5FA",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    icon: "Award",
    tag: "Workshop",
  },
  {
    id: "participation2",
    title: "Certificate of Participation",
    org: "Conference - 2025",
    pdf: "/Certificate of Participation 2.pdf",   // ← changed
    accent: "#f0abfc",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3d0068 50%, #c31432 100%)",
    icon: "FileText",
    tag: "Conference",
  },
];

const IconMap = { Award, FileText, Star, BookOpen };

const CertCard = ({ c, onClick, style, className, whileHover, initial, whileInView, transition, animate }) => {
  const Icon = IconMap[c.icon];
  return (
    <motion.button
      onClick={onClick}
      initial={initial}
      whileInView={whileInView}
      animate={animate}
      viewport={{ once: true }}
      whileHover={whileHover}
      transition={transition}
      className={className}
      style={style}
    >
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: c.gradient }} />

      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: c.accent }} />
      <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full opacity-10" style={{ background: c.accent }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${c.accent}33 20px, ${c.accent}33 21px),
                            repeating-linear-gradient(90deg, transparent, transparent 20px, ${c.accent}33 20px, ${c.accent}33 21px)`
        }}
      />

      {/* Shine effect top */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-left">
        {/* Top section */}
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20"
            style={{ background: `${c.accent}22` }}>
            <Icon size={18} style={{ color: c.accent }} />
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full border font-medium"
            style={{ color: c.accent, borderColor: `${c.accent}44`, background: `${c.accent}11` }}>
            {c.tag}
          </span>
        </div>

        {/* Middle decorative element */}
        <div className="flex items-center gap-1 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-0.5 rounded-full flex-1" style={{ background: c.accent, opacity: 1 - i * 0.1 }} />
          ))}
        </div>

        {/* Bottom section */}
        <div>
          <span className="text-[9px] tracking-[0.24em] uppercase mb-2 block font-semibold" style={{ color: c.accent }}>
            {c.org}
          </span>
          <div className="font-serif text-base text-white leading-tight">{c.title}</div>
          <div className="mt-3 flex items-center gap-1.5 opacity-60">
            <div className="w-1 h-1 rounded-full" style={{ background: c.accent }} />
            <span className="text-[10px] text-white/60">Click to view</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export const Certificates = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="certificates" data-testid="certificates-section" className="relative py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-4">(Certificates)</div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-none">Paper <em className="italic text-[#e8ff47]/85">trail</em></h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} className="max-w-sm text-sm leading-relaxed text-white/55">
            Click any card to preview the certificate. Hover to fan them out.
          </motion.p>
        </div>

        {/* Desktop fan layout */}
        <div className="hidden md:block relative h-[560px] lg:h-[620px] group">
          <div className="absolute inset-0 flex items-center justify-center">
            {CERTS.map((c, i) => {
              const center = (CERTS.length - 1) / 2;
              const delta = i - center;
              return (
                <CertCard
                  key={c.id}
                  c={c}
                  onClick={() => setOpen(c)}
                  initial={{ opacity: 0, y: 40, rotate: delta * 8, x: delta * 90 }}
                  whileInView={{ opacity: 1, y: 0, rotate: delta * 8, x: delta * 90 }}
                  whileHover={{ y: -20, rotate: delta * 11, x: delta * 140, scale: 1.05, zIndex: 50 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  style={{ width: 360, height: 500, zIndex: 10 + i }}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CERTS.map((c) => (
            <CertCard
              key={c.id}
              c={c}
              onClick={() => setOpen(c)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl"
              style={{ height: 220 }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-md grid place-items-center p-4 md:p-10">
            <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.4 }} onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d0d]">

              <div className="w-full h-[55vh] md:h-[65vh] bg-black relative flex items-center justify-center border-b border-white/5">
                {open.pdf && open.pdf !== "/" && !open.pdf.includes("emergentagent") ? (
                  <iframe
                    src={open.pdf}
                    title={open.title}
                    className="w-full h-full border-0"
                  />
                ) : (
                  /* Placeholder when no PDF yet */
                  <div className="flex flex-col items-center gap-4 text-white/30">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                      style={{ background: `${open.accent}22` }}>
                      {React.createElement(IconMap[open.icon], { size: 28, style: { color: open.accent } })}
                    </div>
                    <p className="text-sm">PDF not uploaded yet</p>
                    <p className="text-xs text-white/20">Upload to frontend/public/ folder</p>
                  </div>
                )}
              </div>

              <button onClick={() => setOpen(null)}
                className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors z-50">
                <XIcon size={16} />
              </button>

              <div className="px-5 py-4 flex items-center justify-between gap-4 bg-[#0d0d0d]">
                <div className="text-left">
                  <span className="text-[10px] tracking-[0.24em] uppercase font-semibold" style={{ color: open.accent }}>{open.org}</span>
                  <div className="font-serif text-lg text-white mt-0.5">{open.title}</div>
                </div>
                {open.pdf && !open.pdf.includes("emergentagent") && (
                  <a href={open.pdf} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-[12px] font-medium hover:bg-neutral-200 transition-colors z-50"
                    onClick={(e) => e.stopPropagation()}>
                    Open PDF <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
