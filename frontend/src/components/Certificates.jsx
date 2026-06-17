import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X as XIcon } from "lucide-react";

const CERTS = [
  {
    id: "published",
    title: "IEEE Publication - Homomorphic Encryption",
    org: "ICIRCA 2026 - IEEE",
    img: "https://unsplash.com",
    pdf: "https://emergentagent.com",
    accent: "#e8ff47",
  },
  {
    id: "appreciation",
    title: "Certificate of Appreciation",
    org: "Vel Tech - CYBERNIX '25",
    img: "https://unsplash.com",
    pdf: "https://emergentagent.com",
    accent: "#A78BFA",
  },
  {
    id: "participation1",
    title: "Certificate of Participation",
    org: "Workshop - 2025",
    img: "https://unsplash.com",
    pdf: "https://emergentagent.com",
    accent: "#60A5FA",
  },
  {
    id: "participation2",
    title: "Certificate of Participation",
    org: "Conference - 2025",
    img: "https://unsplash.com",
    pdf: "https://emergentagent.com",
    accent: "#f0abfc",
  },
];

export const Certificates = () => {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="certificates"
      data-testid="certificates-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-4">
              (Certificates)
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              Paper <em className="italic text-[#e8ff47]/85">trail</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="max-w-sm text-sm leading-relaxed text-white/55"
          >
            Click any card to preview the certificate. Hover to fan them out.
          </motion.p>
        </div>

        {/* Stacked fan on desktop, grid on mobile */}
        <div className="hidden md:block relative h-[460px] lg:h-[520px] group">
          <div className="absolute inset-0 flex items-center justify-center">
            {CERTS.map((c, i) => {
              const center = (CERTS.length - 1) / 2;
              const delta = i - center;
              const restRot = delta * 8;
              const restX = delta * 90;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setOpen(c)}
                  data-testid={`cert-card-${c.id}`}
                  initial={{ opacity: 0, y: 40, rotate: restRot, x: restX }}
                  whileInView={{ opacity: 1, y: 0, rotate: restRot, x: restX }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -16,
                    rotate: restRot * 1.4,
                    x: restX * 1.8,
                    scale: 1.04,
                    zIndex: 50,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  style={{
                    width: 280,
                    height: 380,
                    zIndex: 10 + i,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-3xl opacity-50 blur-2xl"
                    style={{
                      background: `radial-gradient(closest-side, ${c.accent}66, transparent)`,
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `linear-gradient(to top, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.4) 50%, transparent 100%), url(${c.img})` 
                    }}
                  >
                    <div className="absolute bottom-5 left-5 right-5 text-left">
                      <div>
                        <span 
                          className="text-[10px] tracking-[0.24em] uppercase mb-1 block font-semibold"
                          style={{ color: c.accent }}
                        >
                          {c.org}
                        </span>
                      </div>
                      <div className="font-serif text-lg text-white leading-tight mt-1">
                        {c.title}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CERTS.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setOpen(c)}
              data-testid={`cert-mobile-${c.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] text-left aspect-[4/3]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `linear-gradient(to top, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.4) 50%, transparent 100%), url(${c.img})` 
                }}
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <span 
                    className="text-[9px] tracking-[0.24em] uppercase mb-1 block font-semibold"
                    style={{ color: c.accent }}
                  >
                    {c.org}
                  </span>
                  <div className="font-serif text-base text-white leading-tight">
                    {c.title}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            data-testid="cert-lightbox"
            className="fixed inset-0 z-[100] bg-[#050505]/90 backdrop-blur-md grid place-items-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d0d]"
            >
              <iframe
                src={open.pdf}
                title={open.title}
                className="w-full h-[60vh] md:h-[75vh] border-0 bg-black z-0"
                loading="lazy"
              />
              <button
                onClick={() => setOpen(null)}
                data-testid="cert-close"
                className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors z-50"
              >
                <XIcon size={16} />
              </button>
              <div className="px-5 py-4 flex items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span 
                    className="text-[10px] tracking-[0.24em] uppercase font-semibold"
                    style={{ color: open.accent }}
                  >
                    {open.org}
                  </span>
                  <div className="font-serif text-xl text-white mt-0.5">
                    {open.title}
                  </div>
                </div>
                <a
                  href={open.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-[12px] font-medium hover:bg-neutral-200 transition-colors z-50 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open PDF <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
