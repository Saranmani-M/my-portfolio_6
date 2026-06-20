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

// Skills shown in the bottom strip with icons
const MARQUEE_SKILLS = [
  { label: "Python",  icon: "python/python-original.svg" },
  { label: "AWS",     icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { label: "Linux",   icon: "linux/linux-original.svg" },
  { label: "Bash",    icon: "bash/bash-original.svg" },
  { label: "Docker",  icon: "docker/docker-original.svg" },
  { label: "Git",     icon: "git/git-original.svg" },
];

// Dream stack logos shown in the middle logo row
const RUNNING_LOGOS = [
  { name: "AWS",       color: "#FF9900", icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Microsoft", color: "#F25022", icon: "azure/azure-original.svg" },
  { name: "Google",    color: "#4285F4", icon: "google/google-original.svg" },
  { name: "Red Hat",   color: "#EE0000", icon: "redhat/redhat-original.svg" },
  { name: "Cisco",     color: "#1BA0D7", icon: "linux/linux-original.svg" },
  { name: "VMware",    color: "#607078" , icon: "debian/debian-original.svg" },
  { name: "Dell EMC",  color: "#007DB8", icon: "docker/docker-original.svg" },
  { name: "NetApp",    color: "#0067C5", icon: "kubernetes/kubernetes-plain.svg" },
];

const BASE_ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

// ─── Drop animation variants ─────────────────────────────────────────────────
const drop = {
  hidden: { opacity: 0, y: -36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Waveform ────────────────────────────────────────────────────────────────
const WaveformIcon = ({ playing, size = 16 }) => {
  const bars = [0.45, 1, 0.6, 0.88, 0.5];
  return (
    <svg width={size} height={size} viewBox="0 0 20 16" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect key={i} x={i * 3.2 + 1} y={8 - h * 6} width={2} height={h * 12} rx={1} fill="currentColor"
          style={playing ? { animation: `waveBar ${0.45 + i * 0.08}s ease-in-out ${i * 0.04}s infinite alternate`, transformOrigin: "50% 100%" } : {}}
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
      const frac = i / STEPS, angle = frac * Math.PI * 2 * TURNS, y = (frac - 0.5) * HH;
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
        r: 0.22 + ((i * 17.3) % 100) / 100 * 0.3, seed: i + 100,
      });
    }
    let isScrolling = false, scrollTimer;
    const onScroll = () => { isScrolling = true; clearTimeout(scrollTimer); scrollTimer = setTimeout(() => { isScrolling = false; }, 150); };
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
        body.addColorStop(0,    `rgba(${base * 0.18},${base * 0.18},${base * 0.18},1)`);
        body.addColorStop(0.35, `rgba(${Math.min(255, base * 1.5)},${Math.min(255, base * 1.5)},${Math.min(255, base * 1.5)},1)`);
        body.addColorStop(0.5,  `rgba(${base * 0.35},${base * 0.35},${base * 0.35},1)`);
        body.addColorStop(0.7,  `rgba(${Math.min(255, base * 2.1)},${Math.min(255, base * 2.1)},${Math.min(255, base * 2.1)},1)`);
        body.addColorStop(1,    `rgba(${base * 0.12},${base * 0.12},${base * 0.12},1)`);
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

// ─── Bottom skills strip ──────────────────────────────────────────────────────
const SkillsStrip = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/50 py-3 overflow-hidden">
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-ltr 30s linear infinite", width: "max-content" }}
      >
        {items.map(({ label, icon }, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-white/40 text-[11px] tracking-[0.14em] uppercase font-mono shrink-0">
            <img src={`${BASE_ICON}${icon}`} alt={label} className="w-4 h-4 opacity-60" style={{ filter: "brightness(1.3) grayscale(0.2)" }} />
            {label}
            <span className="text-white/12 ml-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Static logo grid — evenly spaced across full width, like reference image ──
const LogoGrid = () => (
  <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-6">
    {/* Label */}
    <p className="text-center text-[9px] tracking-[0.28em] uppercase font-mono text-white/18 mb-5 select-none">
      Dream Stacks &amp; Engineering Ambitions
    </p>
    {/* Logo row — evenly distributed, no scrolling */}
    <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
      {RUNNING_LOGOS.map((logo, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1.5 group opacity-45 hover:opacity-90 transition-opacity duration-400 flex-1 min-w-0"
        >
          <img
            src={`${BASE_ICON}${logo.icon}`}
            alt={logo.name}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            style={{ filter: "brightness(1.4) grayscale(0.15)" }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase font-sans text-center leading-tight"
            style={{ color: logo.color }}
          >
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Touch detection ──────────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const audioRef   = useRef(null);
  const cursorRef  = useRef(null);
  const mousePos   = useRef({ x: -100, y: -100 });
  const [playing, setPlaying] = useState(false);
  const [isTouch]  = useState(() => isTouchDevice());

  // Custom cursor — desktop only
  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    let raf;
    const tick = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform =
          `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [isTouch]);

  useEffect(() => {
    const audio = new Audio("/1.mp3");
    audio.loop = true; audio.volume = 0.5;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  }, [playing]);

  return (
    <>
      <style>{`
        ${!isTouch ? `html,body,#root,a,button,img,svg,[role="button"]{cursor:none!important}` : ""}
        @keyframes marquee-ltr { from{transform:translateX(0)} to{transform:translateX(-25%)} }
        @keyframes waveBar     { from{transform:scaleY(0.3)}  to{transform:scaleY(1)} }
        @media(prefers-reduced-motion:reduce){[style*="animation"]{animation:none!important}}
        .soc { display:inline-flex;align-items:center;justify-content:center;padding:7px;min-width:36px;min-height:36px; }
      `}</style>

      {/* Custom cursor */}
      {!isTouch && (
        <div ref={cursorRef}
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

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.80) 75%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.92) 100%)",
        }} />

        {/* ── Navbar pill ── */}
        <motion.div variants={drop} initial="hidden" animate="visible" custom={0}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 select-none bg-black/45 backdrop-blur-md px-3 py-2 rounded-full border border-white/[0.07] shadow-lg whitespace-nowrap max-w-[calc(100vw-2rem)]"
        >
          <button onClick={toggleMusic} aria-label={playing ? "Pause" : "Play"}
            className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${playing ? "text-white" : "text-white/35 hover:text-white"}`}
          >
            <WaveformIcon playing={playing} size={14} />
          </button>
          <span className="text-white/15 text-sm">|</span>
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer"
                className="soc text-white/35 hover:text-white transition-colors"
              >
                <Icon size={14} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="pt-20" aria-hidden="true" />

        {/* ── Hero body ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 max-w-5xl mx-auto w-full py-4">

          {/* Badge — "Open to Work" only, no "Live //" */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={1}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 mb-6 backdrop-blur-sm select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-green-400/90 font-medium">
              Open to Work
            </span>
          </motion.div>

          {/* Heading line 1 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={2}
            className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] text-white mb-1"
          >
            <span className="text-white/38 font-normal">Hey, I&rsquo;m</span>
            <span className="inline-block w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 align-middle flex-shrink-0">
              <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover grayscale" />
            </span>
            <span>Saranmani M</span>
          </motion.div>

          {/* Heading line 2 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={3}
            className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] text-white mb-1"
          >
            <span className="text-white/38 font-normal">Aspiring</span>
            <span>Cloud &amp; Storage Engineer</span>
          </motion.div>

          {/* Heading line 3 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={4}
            className="flex items-center gap-2 flex-wrap justify-center text-2xl sm:text-3xl md:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] text-white"
          >
            <span className="text-white/38 font-normal">Building</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/35">
              Secure Infrastructure
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={drop} initial="hidden" animate="visible" custom={5}
            className="mt-5 text-[13px] md:text-[15px] text-white/40 max-w-[500px] leading-relaxed px-2"
          >
            I enjoy working with Linux systems, cloud infrastructure, and storage technologies,
            building reliable, secure, and scalable environments while continuously learning.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={6}
            className="mt-7 flex items-center justify-center gap-5 flex-wrap"
          >
            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="text-[11px] tracking-[0.22em] uppercase text-white/50 hover:text-white transition-colors py-2"
            >
              Résumé →
            </a>
            <span className="w-px h-4 bg-white/15" />
            <a href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>

        {/* ── Scroll indicator — "Scroll down ——[mouse]—— to see projects" ── */}
        <motion.div variants={drop} initial="hidden" animate="visible" custom={7}
          className="relative z-10 flex items-center justify-center gap-4 mb-2 px-10 text-white/22 text-[10px] tracking-[0.2em] uppercase"
        >
          <span className="hidden sm:inline">Scroll down</span>
          <div className="h-px flex-1 max-w-[140px] bg-white/10" />
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 shrink-0">
            <motion.div
              className="w-1 h-1.5 bg-white/35 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="h-px flex-1 max-w-[140px] bg-white/10" />
          <span className="hidden sm:inline">to see projects</span>
        </motion.div>

        {/* ── Static logo grid — evenly spaced like reference ── */}
        <motion.div variants={drop} initial="hidden" animate="visible" custom={8}>
          <LogoGrid />
        </motion.div>

        {/* ── Skills strip — very bottom ── */}
        <SkillsStrip />
      </section>
    </>
  );
};
