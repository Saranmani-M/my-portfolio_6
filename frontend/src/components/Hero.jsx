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

// ── ROTATING DNA DOUBLE HELIX — large, vivid, fills viewport ──
const DNAHelixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.005;

      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      // Center of the helix on screen
      const cx = W * 0.5;
      const cy = H * 0.5;

      // Helix geometry — made large so beads span the full screen height
      const BEADS        = 90;       // beads per strand
      const TURNS        = 2.5;      // full rotations top to bottom
      const HELIX_RADIUS = W * 0.22; // wide enough to fill screen horizontally
      const HELIX_HEIGHT = H * 1.1;  // taller than screen so it overflows nicely
      const BRIDGE_EVERY = 5;        // cross-bridge every N beads

      // Slow Y-axis spin + gentle X tilt
      const rotY  = t * 0.3;
      const tiltX = 0.28;
      const cosY  = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosTX = Math.cos(tiltX), sinTX = Math.sin(tiltX);

      // Build bead list for both strands
      const beads = [];
      for (let s = 0; s < 2; s++) {
        const phase = s * Math.PI; // 0 and π → double helix

        for (let i = 0; i < BEADS; i++) {
          const frac  = i / (BEADS - 1);                        // 0→1
          const angle = frac * Math.PI * 2 * TURNS + phase + t * 0.4;
          const yW    = (frac - 0.5) * HELIX_HEIGHT;            // world Y

          // Helix local coords
          const xL = Math.cos(angle) * HELIX_RADIUS;
          const zL = Math.sin(angle) * HELIX_RADIUS;

          // Rotate around Y (spin)
          const xR  =  xL * cosY - zL * sinY;
          const zR1 =  xL * sinY + zL * cosY;

          // Tilt around X
          const yR  = yW * cosTX - zR1 * sinTX;
          const zR  = yW * sinTX + zR1 * cosTX;

          // Perspective projection
          const FOV = 1800;
          const psp = FOV / (FOV + zR);
          const sx  = cx + xR * psp;
          const sy  = cy + yR * psp;

          // Depth cue: 0 = back, 1 = front
          const depth  = Math.max(0, Math.min(1, (-zR + FOV * 0.5) / FOV));
          const radius = psp * (6 + depth * 10);          // 6–16 px
          const alpha  = 0.35 + depth * 0.65;             // 0.35–1.0

          beads.push({ sx, sy, zR, radius, depth, alpha, strand: s, idx: i });
        }
      }

      // Painter's sort — back to front
      beads.sort((a, b) => a.zR - b.zR);

      // Index beads by idx for bridge drawing
      const byIdx = {};
      beads.forEach(b => {
        if (!byIdx[b.idx]) byIdx[b.idx] = [];
        byIdx[b.idx].push(b);
      });

      // ── Draw cross-bridges ──
      for (let i = 0; i < BEADS; i += BRIDGE_EVERY) {
        const pair = byIdx[i];
        if (!pair || pair.length < 2) continue;
        const [a, b] = pair;
        const d = (a.depth + b.depth) / 2;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(130,160,255,${0.12 + d * 0.30})`;
        ctx.lineWidth   = 1.5 + d * 2;
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // ── Draw beads ──
      beads.forEach(({ sx, sy, radius, depth, alpha }) => {
        const hi  = Math.floor(120 + depth * 135);   // 120–255
        const lo  = Math.floor(hi * 0.1);

        // Glow halo
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 3);
        glow.addColorStop(0, `rgba(${hi},${hi},${hi + 15},${alpha * 0.22})`);
        glow.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(sx, sy, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Sphere body
        const gx   = sx - radius * 0.3;
        const gy   = sy - radius * 0.35;
        const body = ctx.createRadialGradient(gx, gy, 0, sx, sy, radius);
        body.addColorStop(0,    `rgba(${Math.min(255, hi + 80)},${Math.min(255, hi + 80)},${Math.min(255, hi + 90)},${alpha})`);
        body.addColorStop(0.45, `rgba(${hi},${hi},${hi},${alpha * 0.9})`);
        body.addColorStop(1,    `rgba(${lo},${lo},${lo + 10},${alpha * 0.85})`);
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight
        const spec = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius * 0.5);
        spec.addColorStop(0, `rgba(255,255,255,${0.55 * depth})`);
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
      window.removeEventListener("resize", setSize);
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
  const audioRef  = useRef(null);
  const cursorRef = useRef(null);
  const mousePos  = useRef({ x: -100, y: -100 });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const move = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    let raf;
    const tick = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform =
          `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const audio = new Audio("/Hans_Zimmer_Patrik_Pietschmann_-_Interstaller_(mp3.pm).mp3");
    audio.loop = true; audio.volume = 0.5;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play().catch(() => {}); setPlaying(true); }
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
        <DNAHelixBackground />

        {/* Gentle radial dim only — keep helix visible */}
        <div className="absolute inset-0 z-[1]" style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 100%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.85) 100%)",
        }} />

        {/* ── HERO TEXT ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 max-w-5xl mx-auto w-full">

          <h1 className="font-sans font-bold tracking-tight text-white max-w-4xl leading-[1.2]
            text-4xl sm:text-5xl md:text-[4.2rem]">

            <span className="block mb-2">
              <span className="text-white/60 font-medium">Hey, I&rsquo;m </span>
              <span className="inline-flex items-center justify-center bg-white/10 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 mx-2 align-middle translate-y-[-2px]">
                <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover scale-110" />
              </span>
              <span className="text-white">Saranmani</span>
            </span>

            <span className="block mb-2">
              <span className="text-white/60 font-medium">An </span>
              <span className="text-white">Infrastructure Engineer </span>
              <span className="inline-flex items-center justify-center bg-white/5 px-2 py-1 h-7 sm:h-9 md:h-11 rounded-lg border border-white/10 mx-1 align-middle translate-y-[-4px]">
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

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-white/50 max-w-[88vw] sm:max-w-[480px] md:max-w-[560px] leading-relaxed">
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
            <button onClick={toggleMusic}
              aria-label={playing ? "Pause music" : "Play music"}
              className={`transition-colors ${playing ? "text-white" : "text-white/50 hover:text-white"}`}>
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
