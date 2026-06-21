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

// ─── 3D Vertical Panels Background (like image 1) ────────────────────────────
const PanelsBackground = () => {
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

    const PANELS = 11;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.004;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      const totalW = W * 0.82;
      const startX = (W - totalW) / 2;
      const panelW = totalW / PANELS;
      const gapW   = panelW * 0.18;
      const slotW  = panelW - gapW;

      for (let i = 0; i < PANELS; i++) {
        const x = startX + i * panelW + gapW / 2;

        // Each panel has a slightly different brightness driven by sine wave → 3D depth feel
        const phase = (i / PANELS) * Math.PI * 2;
        const wave  = Math.sin(t + phase);
        // Center panels brightest, edges darker — plus slow pulse
        const centerFactor = 1 - Math.abs((i - (PANELS - 1) / 2) / ((PANELS - 1) / 2)) * 0.55;
        const brightness = Math.max(0.08, centerFactor * (0.55 + wave * 0.12));

        // Panel top and bottom with perspective taper
        const topY    = H * 0.08;
        const bottomY = H * 0.88;
        const panelH  = bottomY - topY;

        // Vertical gradient — bright white-grey in middle, fade top/bottom
        const grad = ctx.createLinearGradient(x, topY, x, bottomY);
        grad.addColorStop(0,    `rgba(255,255,255,0)`);
        grad.addColorStop(0.15, `rgba(220,220,220,${brightness * 0.6})`);
        grad.addColorStop(0.45, `rgba(255,255,255,${brightness})`);
        grad.addColorStop(0.55, `rgba(240,240,240,${brightness * 0.95})`);
        grad.addColorStop(0.85, `rgba(200,200,200,${brightness * 0.5})`);
        grad.addColorStop(1,    `rgba(255,255,255,0)`);

        // Draw panel with slight perspective (narrow at top, wider at bottom)
        const taperTop    = slotW * 0.82;
        const taperBottom = slotW;
        const cx = x + slotW / 2;

        ctx.beginPath();
        ctx.moveTo(cx - taperTop / 2,    topY);
        ctx.lineTo(cx + taperTop / 2,    topY);
        ctx.lineTo(cx + taperBottom / 2, bottomY);
        ctx.lineTo(cx - taperBottom / 2, bottomY);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle inner glow / specular on left edge
        const specGrad = ctx.createLinearGradient(cx - taperBottom / 2, 0, cx, 0);
        specGrad.addColorStop(0, `rgba(255,255,255,${brightness * 0.3})`);
        specGrad.addColorStop(0.3, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.moveTo(cx - taperTop / 2,    topY);
        ctx.lineTo(cx + taperTop / 2,    topY);
        ctx.lineTo(cx + taperBottom / 2, bottomY);
        ctx.lineTo(cx - taperBottom / 2, bottomY);
        ctx.closePath();
        ctx.fillStyle = specGrad;
        ctx.fill();
      }

      // Silhouette figure in center — blurred shadow effect
      const figX = W / 2;
      const figY = H * 0.52;
      const figH = H * 0.28;
      const figW = figH * 0.28;

      ctx.save();
      ctx.globalAlpha = 0.35 + Math.sin(t * 0.7) * 0.05;
      // Body
      const bodyGrad = ctx.createRadialGradient(figX, figY, 0, figX, figY, figW * 2.5);
      bodyGrad.addColorStop(0, "rgba(30,30,30,0.9)");
      bodyGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.ellipse(figX, figY + figH * 0.1, figW, figH * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.arc(figX, figY - figH * 0.38, figW * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.7)";
      ctx.fill();
      ctx.restore();

      // Floor reflection glow
      const floorGrad = ctx.createLinearGradient(0, H * 0.82, 0, H);
      floorGrad.addColorStop(0, "rgba(255,255,255,0.04)");
      floorGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, H * 0.82, W, H * 0.18);

      // Heavy vignette edges
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, W*0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

// ─── Dream stack slow marquee ─────────────────────────────────────────────────
const SkillsStrip = () => {
  const items = [...RUNNING_LOGOS, ...RUNNING_LOGOS, ...RUNNING_LOGOS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/60 py-5 overflow-hidden">
      <p className="text-center text-[9px] tracking-[0.28em] uppercase font-mono text-white/20 mb-4 select-none">
        Dream Stacks &amp; Engineering Ambitions
      </p>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,1), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to left, rgba(0,0,0,1), transparent)" }} />
      <div
        className="flex items-center gap-16 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-ltr 60s linear infinite", width: "max-content" }}
      >
        {items.map((logo, i) => (
          <span key={i} className="inline-flex flex-col items-center gap-2 shrink-0 opacity-50 hover:opacity-95 transition-opacity duration-300">
            <img src={`${BASE_ICON}${logo.icon}`} alt={logo.name} className="w-7 h-7 object-contain" style={{ filter: "brightness(1.5) grayscale(0.1)" }} />
            <span className="text-[10px] tracking-[0.18em] uppercase font-mono font-bold" style={{ color: logo.color }}>{logo.name}</span>
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
        {/* ── 3D Panels background ── */}
        <PanelsBackground />

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

        {/* ── Hero body — CENTERED, smaller text ── */}
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

          {/* Heading line 1 — smaller */}
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

        {/* ── Dream stack slow marquee ── */}
        <SkillsStrip />
      </section>
    </>
  );
};
