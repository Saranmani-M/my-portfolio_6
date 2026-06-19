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
];

const RUNNING_LOGOS = [
  { name: "Gears",  color: "text-white/40"     },
  { name: "Rahi",   color: "text-blue-400/50"  },
  { name: "idp",    color: "text-green-400/50" },
  { name: "Google", color: "text-red-400/50"   },
];

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

// ── ROTATING DNA DOUBLE HELIX BACKGROUND ──
const DNAHelixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── helix parameters ──
    const STRANDS     = 2;          // double helix
    const BEADS_PER   = 120;        // beads per strand
    const BRIDGE_STEP = 6;          // every Nth bead gets a cross-bridge
    const HELIX_R     = 0.28;       // helix radius as fraction of min(W,H)
    const HELIX_H     = 2.6;        // helix vertical span (world units)
    const TURNS       = 3.2;        // number of full turns

    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.004;

      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      const cx   = W * 0.5;
      const cy   = H * 0.48;
      const R    = Math.min(W, H) * HELIX_R;
      const scaleY = H * 0.44;

      // Global rotation around Y axis (makes it spin slowly)
      const rotY = t * 0.35;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Tilt around X axis (lean it so it looks 3-D)
      const tiltX = 0.38;
      const cosTX = Math.cos(tiltX);
      const sinTX = Math.sin(tiltX);

      // ── collect all beads from both strands ──
      const allBeads = [];

      for (let s = 0; s < STRANDS; s++) {
        const phaseOffset = (s / STRANDS) * Math.PI * 2; // 0 and π for double helix

        for (let i = 0; i < BEADS_PER; i++) {
          const frac  = i / (BEADS_PER - 1);              // 0 → 1
          const angle = frac * Math.PI * 2 * TURNS + phaseOffset + t * 0.5;
          const yWorld = (frac - 0.5) * HELIX_H;

          // 3-D position in helix local frame
          const xLocal = Math.cos(angle) * R;
          const zLocal = Math.sin(angle) * R;

          // Rotate around Y (spin)
          const xR = xLocal * cosY - zLocal * sinY;
          const zR = xLocal * sinY + zLocal * cosY;

          // Tilt around X
          const yR  = yWorld * cosTX - zR * sinTX;
          const zR2 = yWorld * sinTX + zR * cosTX;

          // Perspective
          const psp = 900 / (900 + zR2 * 180);
          const sx  = cx + xR * psp * (W * 0.38);
          const sy  = cy + yR * psp * scaleY;

          // Depth-based size & brightness
          const depth  = (zR2 + 2) / 4;   // 0 → 1
          const radius = psp * (3.5 + depth * 4);
          const bright = Math.floor(80 + depth * 130);
          const alpha  = 0.18 + depth * 0.65;

          allBeads.push({ sx, sy, radius, bright, alpha, zR2, strand: s, idx: i, angle });
        }
      }

      // Sort back-to-front for correct painter's algorithm
      allBeads.sort((a, b) => a.zR2 - b.zR2);

      // ── draw cross-bridges (rungs of the ladder) ──
      // group beads by index for quick lookup
      const byIdx = {};
      allBeads.forEach(b => {
        if (!byIdx[b.idx]) byIdx[b.idx] = [];
        byIdx[b.idx].push(b);
      });

      for (let i = 0; i < BEADS_PER; i += BRIDGE_STEP) {
        const pair = byIdx[i];
        if (!pair || pair.length < 2) continue;
        const [a, b] = pair;

        const midZ  = (a.zR2 + b.zR2) / 2;
        const depth  = (midZ + 2) / 4;
        const alpha  = (0.06 + depth * 0.18);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(160,180,255,${alpha})`;
        ctx.lineWidth   = 0.9 + depth * 1.2;
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // ── draw beads ──
      allBeads.forEach(({ sx, sy, radius, bright, alpha, strand, zR2 }) => {
        const depth = (zR2 + 2) / 4;

        // Outer glow
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 2.8);
        glow.addColorStop(0,   `rgba(${bright},${bright},${bright + 20},${alpha * 0.25})`);
        glow.addColorStop(1,   `rgba(0,0,0,0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(sx, sy, radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Sphere body gradient
        const gx = sx - radius * 0.3;
        const gy = sy - radius * 0.35;
        const body = ctx.createRadialGradient(gx, gy, 0, sx, sy, radius);
        const hi   = Math.min(255, bright + 90);
        const lo   = Math.floor(bright * 0.12);
        body.addColorStop(0,   `rgba(${hi},${hi},${hi},${alpha})`);
        body.addColorStop(0.45,`rgba(${bright},${bright},${bright},${alpha * 0.85})`);
        body.addColorStop(1,   `rgba(${lo},${lo},${lo + 12},${alpha * 0.9})`);

        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight
        const spec = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius * 0.55);
        spec.addColorStop(0, `rgba(255,255,255,${0.45 * depth})`);
        spec.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.fillStyle = spec;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 py-4">
      <div className="overflow-hidden">
        <div className="flex items-center shrink-0 gap-8 sm:gap-12 whitespace-nowrap animate-[marquee-scroll_34s_linear_infinite] will-change-transform">
          {items.map(({ label }, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-mono">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const audioRef   = useRef(null);
  const cursorRef  = useRef(null);
  const mousePos   = useRef({ x: -100, y: -100 });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    let animFrameId;
    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      }
      animFrameId = requestAnimationFrame(update);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(update);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(animFrameId); };
  }, []);

  useEffect(() => {
    const audio = new Audio("/Hans_Zimmer_Patrik_Pietschmann_-_Interstaller_(mp3.pm).mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else         { audio.play().catch(() => {}); setPlaying(true); }
  }, [playing]);

  const loopLogos = [...RUNNING_LOGOS, ...RUNNING_LOGOS, ...RUNNING_LOGOS];

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, #root, a, button, img, svg, [role="button"] { cursor: none !important; }
        }
        @keyframes marquee-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes waveBar { from{transform:scaleY(0.3)} to{transform:scaleY(1)} }
        @media(prefers-reduced-motion:reduce){ [class*="animate-"]{animation:none !important} }
      `}</style>

      <div
        ref={cursorRef}
        className="fixed w-3.5 h-3.5 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference will-change-transform hidden md:block"
        style={{ left: 0, top: 0 }}
      />

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#060608" }}
      >
        {/* DNA Helix rotating background */}
        <DNAHelixBackground />

        {/* Overlay: darken edges, keep center readable */}
        <div className="absolute inset-0 z-[1]" style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.72) 70%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.90) 100%)",
        }} />

        {/* ── HERO CENTER BLOCK ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 max-w-5xl mx-auto w-full">

          <h1 className="font-sans font-bold tracking-tight text-white max-w-4xl text-center leading-[1.2]
            text-4xl sm:text-5xl md:text-[4.2rem]">

            <span className="block mb-2">
              <span className="text-white/60 font-medium">Hey, I&rsquo;m </span>
              <span className="inline-flex items-center justify-center bg-white/10 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 mx-2 align-middle transform translate-y-[-2px]">
                <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover scale-110" />
              </span>
              <span className="text-white">Saranmani</span>
            </span>

            <span className="block mb-2">
              <span className="text-white/60 font-medium">An </span>
              <span className="text-white">Infrastructure Engineer </span>
              <span className="inline-flex items-center justify-center bg-white/5 px-2 py-1 h-7 sm:h-9 md:h-11 rounded-lg border border-white/10 mx-1 align-middle transform translate-y-[-4px]">
                <span className="text-xs sm:text-sm font-mono text-white/40">⚡</span>
              </span>
            </span>

            <span className="block">
              <span className="text-white/60 font-medium">At </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30 font-extrabold">
                Cloud Canvas
              </span>
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-white/45 max-w-[88vw] sm:max-w-[480px] md:max-w-[560px] leading-relaxed">
            I enjoy taking messy, complicated infrastructure architectures and
            making them feel automated, secure, and effortless for global
            engineering teams.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              {SOCIAL_ICONS.map(({ Icon, url, k }) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors">
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <span className="w-px h-5 bg-white/20" />

            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pause music" : "Play music"}
              className={`transition-colors ${playing ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              <WaveformIcon playing={playing} size={18} />
            </button>

            <span className="w-px h-5 bg-white/20" />

            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors">
              Résumé →
            </a>

            <a href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase px-3 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Say hi ↗
            </a>
          </div>
        </div>

        {/* ── BOTTOM BLOCK ── */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mb-5 sm:mb-8 px-4 sm:px-6">

          <div className="w-full overflow-hidden mb-4 sm:mb-6">
            <div className="flex gap-8 sm:gap-16 whitespace-nowrap animate-[marquee-scroll_25s_linear_infinite] will-change-transform items-center h-8">
              {loopLogos.map((logo, i) => (
                <span key={i} className={`text-sm sm:text-base font-extrabold tracking-wider ${logo.color} select-none font-sans`}>
                  {logo.name}
                </span>
              ))}
            </div>
          </div>

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
