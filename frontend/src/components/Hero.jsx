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

const RUNNING_LOGOS = [
  { name: "AWS",       color: "#FF9900", icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Microsoft", color: "#F25022", icon: "azure/azure-original.svg" },
  { name: "Google",    color: "#4285F4", icon: "google/google-original.svg" },
  { name: "Red Hat",   color: "#EE0000", icon: "redhat/redhat-original.svg" },
  { name: "Cisco",     color: "#1BA0D7", icon: "linux/linux-original.svg" },
  { name: "VMware",    color: "#607078", icon: "debian/debian-original.svg" },
  { name: "Dell EMC",  color: "#007DB8", icon: "docker/docker-original.svg" },
  { name: "NetApp",    color: "#0067C5", icon: "kubernetes/kubernetes-plain.svg" },
];

const BASE_ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const drop = {
  hidden: { opacity: 0, y: -24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Waveform ─────────────────────────────────────────────────────────────────
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

// ─── Twisted Rope Background (bumpy intertwined strands, pure black) ──────────
const TwistedRopeBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw a single bumpy sphere (one "bead" on the rope)
    const drawBead = (x, y, r, lightAngle) => {
      // Main sphere body — dark grey, almost black
      const grad = ctx.createRadialGradient(
        x - r * 0.3, y - r * 0.3, r * 0.05,
        x, y, r
      );
      grad.addColorStop(0,   "rgba(90,90,90,0.95)");
      grad.addColorStop(0.3, "rgba(45,45,45,0.98)");
      grad.addColorStop(0.7, "rgba(18,18,18,1)");
      grad.addColorStop(1,   "rgba(5,5,5,1)");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Specular highlight — small bright dot
      const specR = r * 0.28;
      const specX = x - r * 0.28;
      const specY = y - r * 0.28;
      const specGrad = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
      specGrad.addColorStop(0,   "rgba(200,200,200,0.55)");
      specGrad.addColorStop(0.5, "rgba(120,120,120,0.15)");
      specGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(specX, specY, specR, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Rim shadow — bottom-right darkening
      const rimGrad = ctx.createRadialGradient(
        x + r * 0.25, y + r * 0.25, r * 0.4,
        x, y, r
      );
      rimGrad.addColorStop(0,   "rgba(0,0,0,0)");
      rimGrad.addColorStop(0.7, "rgba(0,0,0,0.3)");
      rimGrad.addColorStop(1,   "rgba(0,0,0,0.75)");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();
    };

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.005;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // Two intertwined strands — each is a helix projected to 2D
      // They form an X shape crossing in the center
      const strandCount = 2;
      const beadR = Math.min(W, H) * 0.028;   // bead radius
      const beadSpacing = beadR * 1.85;
      const numBeads = Math.ceil((W * 1.6) / beadSpacing);

      // Strand paths: two diagonal lines crossing center (like the X in the image)
      // Strand A: top-left → bottom-right
      // Strand B: top-right → bottom-left
      const spread = Math.min(W, H) * 0.22; // how far apart the strands spread at edges
      const len = Math.sqrt(W * W + H * H) * 0.6;

      const strands = [
        { angle:  Math.PI * 0.28, color: 0 }, // \ direction
        { angle: -Math.PI * 0.28, color: 1 }, // / direction
      ];

      // Collect all beads for depth-sorted rendering
      const allBeads = [];

      strands.forEach((strand, si) => {
        const cos = Math.cos(strand.angle);
        const sin = Math.sin(strand.angle);
        const perpCos = Math.cos(strand.angle + Math.PI / 2);
        const perpSin = Math.sin(strand.angle + Math.PI / 2);

        for (let i = -numBeads / 2; i < numBeads / 2; i++) {
          const along = i * beadSpacing;
          // Helix twist: offset perpendicular to strand direction
          const twist = Math.sin(along * 0.045 + t + si * Math.PI) * spread * 0.38;
          const depthWave = Math.cos(along * 0.045 + t + si * Math.PI); // -1..1 for z-depth

          const bx = cx + cos * along + perpCos * twist;
          const by = cy + sin * along + perpSin * twist;

          // Scale bead by depth (farther = slightly smaller, more faded)
          const depthScale = 0.82 + depthWave * 0.18;
          const depthAlpha = 0.72 + depthWave * 0.28;

          allBeads.push({ x: bx, y: by, r: beadR * depthScale, alpha: depthAlpha, z: depthWave });
        }
      });

      // Sort by z so closer beads render on top
      allBeads.sort((a, b) => a.z - b.z);

      allBeads.forEach(bead => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, bead.alpha));
        drawBead(bead.x, bead.y, bead.r, 0);
        ctx.restore();
      });

      // Heavy vignette — keep edges pure black, focus center
      const vig = ctx.createRadialGradient(cx, cy, H * 0.12, cx, cy, W * 0.72);
      vig.addColorStop(0,   "rgba(0,0,0,0)");
      vig.addColorStop(0.5, "rgba(0,0,0,0.25)");
      vig.addColorStop(1,   "rgba(0,0,0,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

// ─── Smaller refined marquee (like image 2 company logos strip) ───────────────
const SkillsStrip = () => {
  const items = [...RUNNING_LOGOS, ...RUNNING_LOGOS, ...RUNNING_LOGOS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.05] bg-black/70 py-3 overflow-hidden">
      <p className="text-center text-[8px] tracking-[0.32em] uppercase font-mono text-white/18 mb-3 select-none">
        Dream Stacks &amp; Engineering Ambitions
      </p>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,1), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to left, rgba(0,0,0,1), transparent)" }} />
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-ltr 60s linear infinite", width: "max-content" }}
      >
        {items.map((logo, i) => (
          <span key={i} className="inline-flex flex-col items-center gap-1 shrink-0 opacity-40 hover:opacity-80 transition-opacity duration-300">
            {/* Logo image — smaller: w-5 h-5 instead of w-7 h-7 */}
            <img
              src={`${BASE_ICON}${logo.icon}`}
              alt={logo.name}
              className="w-5 h-5 object-contain"
              style={{ filter: "brightness(1.4) grayscale(0.15)" }}
            />
            {/* Text — smaller: 8px instead of 10px */}
            <span
              className="text-[8px] tracking-[0.2em] uppercase font-mono font-semibold"
              style={{ color: logo.color }}
            >
              {logo.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Touch detection ──────────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const audioRef  = useRef(null);
  const cursorRef = useRef(null);
  const mousePos  = useRef({ x: -100, y: -100 });
  const [playing, setPlaying] = useState(false);
  const [isTouch] = useState(() => isTouchDevice());

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
        @keyframes marquee-ltr { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
        @keyframes waveBar     { from{transform:scaleY(0.3)}  to{transform:scaleY(1)} }
        @media(prefers-reduced-motion:reduce){[style*="animation"]{animation:none!important}}
      `}</style>

      {/* Custom cursor */}
      {!isTouch && (
        <div ref={cursorRef}
          className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference will-change-transform"
          style={{ left: 0, top: 0 }}
        />
      )}

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#000" }}
      >
        {/* ── Twisted rope background ── */}
        <TwistedRopeBackground />

        {/* ── Music toggle — centered top pill ── */}
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <motion.div
            variants={drop} initial="hidden" animate="visible" custom={0}
            className="pointer-events-auto flex items-center select-none bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/[0.07] shadow-lg"
          >
            <button onClick={toggleMusic} aria-label={playing ? "Pause" : "Play"}
              className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${playing ? "text-white" : "text-white/35 hover:text-white"}`}
            >
              <WaveformIcon playing={playing} size={14} />
            </button>
          </motion.div>
        </div>

        {/* Spacer for navbar */}
        <div className="pt-20" aria-hidden="true" />

        {/* ── Hero body — CENTERED ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-10 max-w-3xl mx-auto w-full py-6">

          {/* Badge */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={1}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/25 bg-black/40 backdrop-blur-sm mb-7 select-none"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.24em] font-mono text-green-400/90 font-medium">
              Open to Work
            </span>
          </motion.div>

          {/* Heading line 1 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={2}
            className="flex items-center justify-center gap-2 flex-wrap text-xl sm:text-2xl md:text-[2.2rem] font-light tracking-[-0.01em] leading-[1.2] text-white mb-0.5"
          >
            <span className="text-white/40 font-light">Hey, I&rsquo;m</span>
            <span className="inline-block w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-white/20 align-middle flex-shrink-0">
              <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover grayscale" />
            </span>
            <span className="font-bold">Saranmani M</span>
          </motion.div>

          {/* Heading line 2 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={3}
            className="flex items-center justify-center gap-2 flex-wrap text-xl sm:text-2xl md:text-[2.2rem] font-light tracking-[-0.01em] leading-[1.2] text-white mb-0.5"
          >
            <span className="text-white/40 font-light">Aspiring</span>
            <span className="font-bold">Cloud &amp; Storage Engineer</span>
          </motion.div>

          {/* Heading line 3 */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={4}
            className="flex items-center justify-center gap-2 flex-wrap text-xl sm:text-2xl md:text-[2.2rem] font-light tracking-[-0.01em] leading-[1.2] text-white mb-5"
          >
            <span className="text-white/40 font-light">Building</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              Secure Infrastructure
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={drop} initial="hidden" animate="visible" custom={5}
            className="text-[12px] md:text-[13px] text-white/35 max-w-[420px] leading-relaxed mb-7"
          >
            I enjoy working with Linux systems, cloud infrastructure, and storage technologies,
            building reliable, secure, and scalable environments while continuously learning.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={drop} initial="hidden" animate="visible" custom={6}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer"
                data-testid={`hero-social-${k}`}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="text-[10px] tracking-[0.22em] uppercase text-white/45 hover:text-white transition-colors py-2 ml-1"
            >
              Résumé →
            </a>
            <span className="w-px h-3.5 bg-white/15" />
            <a href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>

        {/* ── Dream stack slow marquee — smaller ── */}
        <SkillsStrip />
      </section>
    </>
  );
};
