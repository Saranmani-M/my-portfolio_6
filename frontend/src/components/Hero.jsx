import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { PROFILE, SOCIALS } from "../lib/data";

const SOCIAL_ICONS = [
  { Icon: Linkedin,  url: SOCIALS.linkedin,  k: "linkedin"  },
  { Icon: Github,    url: SOCIALS.github,    k: "github"    },
  { Icon: Instagram, url: SOCIALS.instagram, k: "instagram" },
  { Icon: Twitter,   url: SOCIALS.twitter,   k: "x"         },
];

const MARQUEE_SKILLS = [
  { label: "Python"  },
  { label: "AWS"     },
  { label: "Linux"   },
  { label: "Bash"    },
  { label: "Docker"  },
  { label: "Git"     },
  { label: "IAM"     },
  { label: "S3"      },
  { label: "EC2"     },
  { label: "PyCharm" },
  { label: "SAN/NAS" },
];

const RUNNING_LOGOS = [
  { name: "Gears",  color: "text-white/40"     },
  { name: "Rahi",   color: "text-blue-400/50"  },
  { name: "idp",    color: "text-green-400/50" },
  { name: "Google", color: "text-red-400/50"   },
];

/* ── Waveform icon ───────────────────────────────────────────────────── */
const WaveformIcon = ({ playing, size = 16 }) => {
  const bars = [0.45, 1, 0.6, 0.88, 0.5];
  return (
    <svg width={size} height={size} viewBox="0 0 20 16" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 3.2 + 1}
          y={8 - h * 6}
          width={2}
          height={h * 12}
          rx={1}
          fill="currentColor"
          style={playing ? {
            animation: `waveBar ${0.45 + i * 0.08}s ease-in-out ${i * 0.04}s infinite alternate`,
            transformOrigin: "50% 100%",
          } : {}}
        />
      ))}
    </svg>
  );
};

/* ── Skills marquee ──────────────────────────────────────────────────── */
const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 py-4">
      <div className="overflow-hidden">
        <div className="flex items-center shrink-0 gap-8 sm:gap-12 whitespace-nowrap animate-[marquee-scroll_34s_linear_infinite] will-change-transform">
          {items.map(({ label }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-mono"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   HERO
   - Background: the dark bubble-helix image (bg-helix.png in /public)
   - Custom white dot cursor
   - Music toggle (waveform) inline in the action row
   - All your existing content preserved
═══════════════════════════════════════════════════════════════════════ */
const MUSIC_SRC = "/Running_Up_That_Hill_A_Deal_With_God.mp3";

export const Hero = () => {
  const audioRef  = useRef(null);
  const dotRef    = useRef(null);
  const outerRef  = useRef(null);
  const mousePos  = useRef({ x: -200, y: -200 });
  const smoothPos = useRef({ x: -200, y: -200 });
  const [playing, setPlaying] = useState(false);

  /* ── Custom cursor ── */
  useEffect(() => {
    // Inject global cursor:none
    const style = document.createElement("style");
    style.id = "cursor-none-global";
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html, body, *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const onMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const { x, y } = mousePos.current;
      // Inner dot — instant
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      // Outer ring — smooth lag
      smoothPos.current.x += (x - smoothPos.current.x) * 0.12;
      smoothPos.current.y += (y - smoothPos.current.y) * 0.12;
      if (outerRef.current)
        outerRef.current.style.transform = `translate(${smoothPos.current.x - 20}px, ${smoothPos.current.y - 20}px)`;
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      const el = document.getElementById("cursor-none-global");
      if (el) el.remove();
    };
  }, []);

  /* ── Music ── */
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play().catch(() => {}); setPlaying(true); }
  }, [playing]);

  const loopLogos = [...RUNNING_LOGOS, ...RUNNING_LOGOS, ...RUNNING_LOGOS];

  return (
    <>
      <style>{`
        @keyframes marquee-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes waveBar        { from{transform:scaleY(0.3)}   to{transform:scaleY(1)}        }
        @media(prefers-reduced-motion:reduce){ [class*="animate-"]{animation:none !important} }
      `}</style>

      {/* ── White dot cursor ── */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 10, height: 10, borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none", zIndex: 999999,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={outerRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 40, height: 40, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.45)",
          pointerEvents: "none", zIndex: 999998,
          willChange: "transform",
        }}
      />

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
      >
        {/* ── BACKGROUND IMAGE ──
            Put bg-helix.png inside your /public folder.
            It will be served at /bg-helix.png automatically by Vite/CRA.    */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:    "url('/bg-helix.png')",
            backgroundSize:     "cover",
            backgroundPosition: "center center",
            backgroundRepeat:   "no-repeat",
            backgroundColor:    "#060608",   /* fallback if image fails */
          }}
        />

        {/* Dark vignette overlay so text stays readable */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              /* soft center glow keeps the helix visible */
              "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.0) 60%)," +
              /* top + bottom fade to black */
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 25%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* ── HERO TEXT ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 max-w-5xl mx-auto w-full">

          {/* Open-to-work badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[11px] tracking-[0.18em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-flex" />
            Open to Work · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16,1,0.3,1], delay: 0.3 }}
            className="font-sans font-bold tracking-tight text-white max-w-4xl leading-[1.15]
              text-[2.6rem] sm:text-5xl md:text-[4.2rem]"
          >
            <span className="block mb-2">
              <span className="text-white/60 font-medium">Hey, I&rsquo;m </span>
              <span
                className="inline-flex items-center justify-center bg-white/10 rounded-full overflow-hidden border border-white/20 mx-2 align-middle"
                style={{ width:"2.4rem", height:"2.4rem", verticalAlign:"middle" }}
              >
                <img
                  src={PROFILE.photoUrl}
                  alt="Saranmani M"
                  className="w-full h-full object-cover scale-110"
                />
              </span>
              <span className="text-white">Saranmani M</span>
            </span>

            <span className="block text-white/80 font-light text-[1.6rem] sm:text-[2rem] md:text-[2.5rem] mt-1">
              Cloud Security &amp; Linux Engineer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16,1,0.3,1] }}
            className="mt-5 sm:mt-7 text-xs sm:text-sm md:text-base text-white/50 max-w-[88vw] sm:max-w-[480px] md:max-w-[560px] leading-relaxed"
          >
            IT Graduate — building reliable and secure digital infrastructure,
            one system at a time.
          </motion.p>

          {/* ── ACTION ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16,1,0.3,1] }}
            className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
          >
            {/* Social icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {SOCIAL_ICONS.map(({ Icon, url, k }) => (
                <a
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`hero-social-${k}`}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <span className="w-px h-5 bg-white/20" />

            {/* Music toggle — waveform button */}
            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pause music" : "Play music"}
              title={playing ? "Pause Running Up That Hill" : "Play Running Up That Hill"}
              className={`inline-flex items-center gap-1.5 transition-colors
                ${playing ? "text-white" : "text-white/45 hover:text-white"}`}
            >
              <WaveformIcon playing={playing} size={18} />
              <span className="text-[10px] tracking-widest uppercase hidden sm:inline">
                {playing ? "playing" : "music"}
              </span>
            </button>

            <span className="w-px h-5 bg-white/20" />

            {/* Résumé link */}
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-resume"
              className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
            >
              Résumé →
            </a>

            {/* Say hi CTA */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase px-3 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>

        {/* ── BOTTOM SCROLL INDICATOR + LOGO STRIP ── */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mb-5 sm:mb-8 px-4 sm:px-6">
          {/* Scrolling company logos */}
          <div className="w-full overflow-hidden mb-4 sm:mb-6">
            <div className="flex gap-8 sm:gap-16 whitespace-nowrap animate-[marquee-scroll_25s_linear_infinite] will-change-transform items-center h-8">
              {loopLogos.map((logo, i) => (
                <span
                  key={i}
                  className={`text-sm sm:text-base font-extrabold tracking-wider ${logo.color} select-none font-sans`}
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 text-white/35 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase">
            <span className="hidden sm:inline">Scroll down</span>
            <div className="h-px flex-1 max-w-[80px] sm:max-w-[160px] bg-white/15" />
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5 shrink-0">
              <motion.div
                className="w-1 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="h-px flex-1 max-w-[80px] sm:max-w-[160px] bg-white/15" />
            <span className="hidden sm:inline">to see projects</span>
          </div>
        </div>

        <SkillsMarquee />
      </section>
    </>
  );
};
