import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X as XIcon } from "lucide-react";
import { PROFILE, NAV } from "../lib/data";

// 4-dot icon
const DotsIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2" fill="currentColor" />
    <circle cx="16" cy="8" r="2" fill="currentColor" />
    <circle cx="8" cy="16" r="2" fill="currentColor" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
  </svg>
);

const TEASERS = [
  {
    label: "IEEE · ICIRCA 2026",
    title: "Hybrid Paillier × ElGamal",
    bg: "#FFFFFF",
    text: "#0D0D0D",
    img: "/certs/published.jpg",
    href: "#research",
  },
  {
    label: "CYBERNIX '25 · 2nd Prize",
    title: "Secure Cloud Storage",
    bg: "linear-gradient(135deg,#7c2d12,#dc2626)",
    text: "#fff",
    img: "https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    href: "#projects",
  },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {/* Top-left brand card */}
      <motion.button
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => go("home")}
        data-testid="brand-card"
        className="fixed top-5 left-5 md:top-6 md:left-6 z-50 flex items-center gap-3 group"
      >
        <span className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden border border-white/10 bg-[#0D0D0D] shrink-0">
          <img
            src={PROFILE.photoUrl}
            alt="Saranmani M"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(0.4) contrast(1.05) brightness(0.95)" }}
          />
        </span>
        <span className="text-white leading-[1.1] text-left">
          <span className="block text-[13px] md:text-[14px] font-medium">
            Saranmani
          </span>
          <span className="block text-[13px] md:text-[14px] text-white/65">
            M
          </span>
        </span>
      </motion.button>

      {/* Top-right 4-dot menu */}
      <motion.button
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(true)}
        data-testid="menu-toggle"
        aria-label="Open menu"
        className="fixed top-5 right-5 md:top-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-white/10 bg-[#0D0D0D]/70 backdrop-blur-md grid place-items-center text-white hover:bg-[#0D0D0D] hover:border-white/25 transition-colors"
      >
        <DotsIcon size={20} />
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] bg-[#050505]/85 backdrop-blur-xl"
            data-testid="menu-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-4 md:inset-10 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
            >
              {/* Close button (top-right of drawer) */}
              <button
                onClick={() => setOpen(false)}
                data-testid="menu-close"
                className="absolute top-5 right-5 md:top-6 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-white/10 bg-[#0D0D0D]/70 backdrop-blur-md grid place-items-center text-white hover:bg-[#0D0D0D] hover:border-white/25 transition-colors"
              >
                <XIcon size={18} />
              </button>

              <div className="h-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-5 md:p-8 lg:p-12 overflow-y-auto">
                {/* Left: visual teasers */}
                <div className="md:col-span-5 lg:col-span-5 grid grid-cols-1 gap-4 md:gap-5">
                  {TEASERS.map((t, i) => (
                    <motion.a
                      key={i}
                      href={t.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(t.href.replace("#", ""));
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
                      whileHover={{ y: -3 }}
                      data-testid={`menu-teaser-${i}`}
                      className="relative rounded-3xl overflow-hidden group min-h-[180px] md:min-h-0 md:flex-1"
                      style={{
                        background: t.bg,
                        color: t.text,
                      }}
                    >
                      <div className="relative w-full h-full min-h-[180px] md:min-h-[260px] p-5 md:p-7 flex flex-col justify-between">
                        <img
                          src={t.img}
                          alt={t.title}
                          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity"
                          style={{
                            filter:
                              t.bg === "#FFFFFF"
                                ? "none"
                                : "grayscale(0.4) brightness(0.85)",
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              t.bg === "#FFFFFF"
                                ? "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.9))"
                                : "linear-gradient(180deg, transparent, rgba(0,0,0,0.5))",
                          }}
                        />
                        <div className="relative text-[10px] tracking-[0.24em] uppercase opacity-75">
                          {t.label}
                        </div>
                        <div
                          className="relative font-sans font-bold text-2xl md:text-3xl lg:text-4xl leading-tight"
                          style={{ color: t.text }}
                        >
                          {t.title}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Right: nav list */}
                <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between gap-4">
                  <div className="divide-y divide-white/10">
                    {NAV.map((n, i) => (
                      <motion.button
                        key={n.id}
                        onClick={() => go(n.id)}
                        data-testid={`nav-${n.id}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.25 + i * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group w-full flex items-center justify-between py-4 md:py-5 text-left hover:pl-4 transition-all"
                      >
                        <span className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-tight group-hover:text-[#e8ff47] transition-colors">
                          {n.label}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="text-white/40 group-hover:text-[#e8ff47] transition-colors"
                        />
                      </motion.button>
                    ))}
                  </div>

                  <motion.a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.7 }}
                    data-testid="menu-resume"
                    className="group flex items-center justify-between py-4 md:py-5 border-t border-white/10 hover:pl-4 transition-all"
                  >
                    <span className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-tight group-hover:text-[#e8ff47] transition-colors">
                      Download Resume
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-white/40 group-hover:text-[#e8ff47] transition-colors"
                    />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
