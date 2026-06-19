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
  { label: "Python",  icon: "python/python-original.svg" },
  { label: "AWS",     icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { label: "Linux",   icon: "linux/linux-original.svg" },
  { label: "Bash",    icon: "bash/bash-original.svg" },
  { label: "Docker",  icon: "docker/docker-original.svg" },
  { label: "Git",     icon: "git/git-original.svg" },
];

const RUNNING_LOGOS = [
  { name: "AWS",      color: "#FF9900" },
  { name: "Microsoft",color: "#F25022" },
  { name: "Google",   color: "#4285F4" },
  { name: "Red Hat",  color: "#EE0000" },
  { name: "Cisco",    color: "#1BA0D7" },
  { name: "VMware",   color: "#607078" },
  { name: "Dell EMC", color: "#007DB8" },
  { name: "NetApp",   color: "#0067C5" },
];

// ─── Drop animation variants ────────────────────────────────────────────────
const dropVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── Waveform ────────────────────────────────────────────────────────────────
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

// ─── Canvas background ───────────────────────────────────────────────────────
const VIRTUAL_W = 1600;
const VIRTUAL_H = 1000;

const GlassBubbleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = VIRTUAL_W * dpr;
    canvas.height = VIRTUAL_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const bubbles = [];
    const STEPS = 18, TURNS = 2.4, HR = 1.55, HH = 4.4;

    for (let i = 0; i < STEPS; i++) {
      const frac  = i / STEPS;
      const angle = frac * Math.PI * 2 * TURNS;
      const y     = (frac - 0.5) * HH;
      const x1 = Math.cos(angle) * HR, z1 = Math.sin(angle) * HR;
      const x2 = Math.cos(angle + Math.PI) * HR, z2 = Math.sin(angle + Math.PI) * HR;
      bubbles.push({ x: x1, y, z: z1, r: 0.62 + (i % 3) * 0.07, seed: i });
      bubbles.push({ x: x2, y, z: z2, r: 0.58 + ((i + 1) % 3) * 0.07, seed: i + 50 });
    }
    for (let i = 0; i < 10; i++) {
      bubbles.push({
        x: (((i * 73.13) % 100) / 100 - 0.5) * 3.6,
        y: (((i * 41.29) % 100) / 100 - 0.5) * 4.0,
        z: (((i * 29.81) % 100) / 100 - 0.5) * 2.0,
        r: 0.22 + ((i * 17.3) % 100) / 100 * 0.3,
        seed: i + 100,
      });
    }

    let isScrolling = false, scrollTimer;
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { isScrolling = false; }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, VIRTUAL_W, VIRTUAL_H);
      if (!isScrolling) t += 0.0035;

      const cx = VIRTUAL_W * 0.5, cy = VIRTUAL_H * 0.46;
      const scale = Math.min(VIRTUAL_W, VIRTUAL_H) * 0.62;
      const cosY = Math.cos(t * 0.5), sinY = Math.sin(t * 0.5);
      const cosX = Math.cos(0.35), sinX = Math.sin(0.35);

      const proj = bubbles.map(b => {
        const rx = b.x * cosY - b.z * sinY, rz = b.x * sinY + b.z * cosY;
        const ry = b.y * cosX - rz * sinX, rz2 = b.y * sinX + rz * cosX;
        const psp = 2.6 / (2.6 + rz2);
        return { sx: cx + rx * scale * psp, sy: cy + ry * scale * psp, z: rz2, r: b.r * scale * 0.34 * psp, seed: b.seed };
      });
      proj.sort((a, b) => a.z - b.z);

      proj.forEach(p => {
        const dep = Math.max(0, Math.min(1, (p.z + 1.8) / 3.4));
        const base = 60 + dep * 70;

        const glow = ctx.createRadialGradient(p.sx, p.sy, p.r * 0.4, p.sx, p.sy, p.r * 1.5);
        glow.addColorStop(0, `rgba(${base},${base},${base},0.10)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.fillStyle = glow; ctx.arc(p.sx, p.sy, p.r * 1.5, 0, Math.PI * 2); ctx.fill();

        const body = ctx.createLinearGradient(p.sx - p.r, p.sy - p.r, p.sx + p.r, p.sy + p.r);
        body.addColorStop(0,   `rgba(${base * 0.18},${base * 0.18},${base * 0.18},1)`);
        body.addColorStop(0.35,`rgba(${Math.min(255, base * 1.5)},${Math.min(255, base * 1.5)},${Math.min(255, base * 1.5)},1)`);
        body.addColorStop(0.5, `rgba(${base * 0.35},${base * 0.35},${base * 0.35},1)`);
        body.addColorStop(0.7, `rgba(${Math.min(255, base * 2.1)},${Math.min(255, base * 2.1)},${Math.min(255, base * 2.1)},1)`);
        body.addColorStop(1,   `rgba(${base * 0.12},${base * 0.12},${base * 0.12},1)`);
        ctx.beginPath(); ctx.fillStyle = body; ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2); ctx.fill();

        ctx.save();
        ctx.beginPath(); ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2); ctx.clip();
        for (let k = 0; k < 4; k++) {
          const ringR = p.r * (0.3 + k * 0.22);
          const ringOpacity = 0.10 + 0.05 * Math.sin(t * 3 + p.seed + k);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, ringOpacity)})`;
          ctx.lineWidth = p.r * 0.05;
          ctx.ellipse(p.sx, p.sy - p.r * 0.1, ringR, ringR * 0.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        const spec = ctx.createRadialGradient(p.sx - p.r * 0.3, p.sy - p.r * 0.35, 0, p.sx - p.r * 0.3, p.sy - p.r * 0.35, p.r * 0.35);
        spec.addColorStop(0, `rgba(255,255,255,${0.55 * dep})`);
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.fillStyle = spec; ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2); ctx.fill();
      });
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("scroll", onScroll); clearTimeout(scrollTimer); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ width: "100%", height: "100%" }} />;
};

// ─── Skills marquee (bottom strip) ──────────────────────────────────────────
const BASE_ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 py-4 overflow-hidden">
      <div
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-scroll 34s linear infinite", width: "max-content" }}
      >
        {items.map(({ label, icon }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-white/55 text-[11px] tracking-[0.12em] uppercase font-mono shrink-0"
          >
            <img src={`${BASE_ICON}${icon}`} alt={label} className="w-4 h-4 opacity-70" style={{ filter: "brightness(1.4)" }} />
            {label}
            <span className="text-white/15 ml-1">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Logos marquee (fills the empty gap above skills) ────────────────────────
const LogosMarquee = () => {
  // Triple for seamless looping
  const items = [...RUNNING_LOGOS, ...RUNNING_LOGOS, ...RUNNING_LOGOS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.04] bg-black/20 py-3 overflow-hidden">
      {/* Row 1 — left to right */}
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform mb-2"
        style={{ animation: "marquee-scroll 22s linear infinite", width: "max-content" }}
      >
        {items.map((logo, i) => (
          <span
            key={i}
            className="text-[11px] font-bold tracking-[0.2em] select-none font-sans uppercase shrink-0 opacity-80"
            style={{ color: logo.color }}
          >
            {logo.name}
          </span>
        ))}
      </div>
      {/* Row 2 — right to left (reverse direction) */}
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-scroll-reverse 28s linear infinite", width: "max-content" }}
      >
        {[...items].reverse().map((logo, i) => (
          <span
            key={i}
            className="text-[11px] font-bold tracking-[0.2em] select-none font-sans uppercase shrink-0 opacity-60"
            style={{ color: logo.color }}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Touch detection ─────────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const audioRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const [playing, setPlaying] = useState(false);
  const [isTouch] = useState(() => isTouchDevice());

  // Custom cursor — desktop only
  useEffect(() => {
    if (isTouch) return;
    const handleMouseMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    let animFrameId;
    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      }
      animFrameId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(animFrameId); };
  }, [isTouch]);

  useEffect(() => {
    const audio = new Audio("/1.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  }, [playing]);

  return (
    <>
      <style>{`
        ${!isTouch ? `html, body, #root, a, button, img, svg, [role="button"] { cursor: none !important; }` : ""}
        @keyframes marquee-scroll         { from{transform:translateX(0)}    to{transform:translateX(-33.333%)} }
        @keyframes marquee-scroll-reverse { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
        @keyframes waveBar { from{transform:scaleY(0.3)} to{transform:scaleY(1)} }
        @media(prefers-reduced-motion:reduce){ [style*="animation"]{animation:none !important} }
        .social-link { display:inline-flex; align-items:center; justify-content:center; padding:6px; min-width:36px; min-height:36px; }
      `}</style>

      {!isTouch && (
        <div
          ref={cursorRef}
          className="fixed w-3.5 h-3.5 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference will-change-transform"
          style={{ left: 0, top: 0 }}
        />
      )}

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#070708" }}
      >
        <GlassBubbleBackground />

        {/* Overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.82) 75%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.9) 100%)",
        }} />

        {/* ── Navbar ── */}
        <motion.div
          variants={dropVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center gap-3 select-none bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/[0.06] shadow-xl whitespace-nowrap max-w-[calc(100vw-2rem)]"
        >
          <button
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : "Play music"}
            className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${playing ? "text-white" : "text-white/40 hover:text-white active:text-white"}`}
          >
            <WaveformIcon playing={playing} size={15} />
          </button>
          <span className="text-white/20 font-light text-sm">|</span>
          <div className="flex items-center gap-0.5 sm:gap-2">
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="social-link text-white/40 hover:text-white active:text-white transition-colors">
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="pt-20" aria-hidden="true" />

        {/* ── Main content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 max-w-5xl mx-auto w-full py-6">

          {/* Badge — drop 1 */}
          <motion.div
            variants={dropVariants} initial="hidden" animate="visible" custom={1}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 mb-5 backdrop-blur-sm select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-green-400/90 font-medium">
              Live // Open to Work
            </span>
          </motion.div>

          {/* Heading — each line drops in sequence */}
          <h1 className="font-extrabold tracking-tight leading-[1.2] text-white w-full">

            {/* Line 1: Hey, I'm [photo] Saranmani M — drop 2 */}
            <motion.span
              variants={dropVariants} initial="hidden" animate="visible" custom={2}
              className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.4rem] mb-1"
            >
              <span className="text-white/40 font-normal">Hey, I&rsquo;m</span>
              <span className="inline-block w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 align-middle flex-shrink-0">
                <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover grayscale" />
              </span>
              <span>Saranmani M</span>
            </motion.span>

            {/* Line 2: Aspiring Cloud & Storage Engineer — drop 3 */}
            <motion.span
              variants={dropVariants} initial="hidden" animate="visible" custom={3}
              className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.4rem] mb-1"
            >
              <span className="text-white/40 font-normal">Aspiring</span>
              <span>Cloud &amp; Storage Engineer</span>
            </motion.span>

            {/* Line 3: Building Secure Infrastructure — drop 4 */}
            <motion.span
              variants={dropVariants} initial="hidden" animate="visible" custom={4}
              className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.4rem]"
            >
              <span className="text-white/40 font-normal">Building</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                Secure Infrastructure
              </span>
            </motion.span>
          </h1>

          {/* Bio — drop 5 */}
          <motion.p
            variants={dropVariants} initial="hidden" animate="visible" custom={5}
            className="mt-5 text-sm md:text-base text-white/45 max-w-[520px] leading-relaxed px-2"
          >
            I enjoy working with Linux systems, cloud infrastructure, and storage technologies, building reliable,
            secure, and scalable environments while continuously learning and improving my skills.
          </motion.p>

          {/* CTAs — drop 6 */}
          <motion.div
            variants={dropVariants} initial="hidden" animate="visible" custom={6}
            className="mt-7 flex items-center justify-center gap-4 sm:gap-5 flex-wrap"
          >
            <a
              href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white active:text-white transition-colors py-2 px-1"
            >
              Résumé →
            </a>
            <span className="w-px h-5 bg-white/20" />
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>

        {/* ── Scroll hint (compact, centered) — drop 7 ── */}
        <motion.div
          variants={dropVariants} initial="hidden" animate="visible" custom={7}
          className="relative z-10 flex justify-center items-center gap-4 mb-4 text-white/30 text-[10px] tracking-[0.18em] uppercase"
        >
          <div className="h-px w-16 bg-white/10" />
          <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5 shrink-0">
            <motion.div
              className="w-1 h-1.5 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="h-px w-16 bg-white/10" />
        </motion.div>

        {/* ── Logos marquee — fills empty space ── */}
        <motion.div
          variants={dropVariants} initial="hidden" animate="visible" custom={8}
        >
          <LogosMarquee />
        </motion.div>

        {/* ── Skills strip (very bottom) ── */}
        <SkillsMarquee />
      </section>
    </>
  );
};
