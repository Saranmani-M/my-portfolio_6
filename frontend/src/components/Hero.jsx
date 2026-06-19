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

// ── CYLINDER BEAD BACKGROUND — centered X/hourglass, reference match ──
const CylinderBeadBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const buildArm = (allParticles, W, H, rotDir, tilt) => {
      const scale    = Math.min(W, H) / 800;
      const RINGS    = 60;            // rows of spheres around tube
      const STRANDS  = 380;           // spheres along the helix length
      const MAIN_R   = 230 * scale;   // helix radius — controls width of X arms
      const TUBE_R   = 85  * scale;   // tube thickness — controls sphere density
      const SPHERE_R = 19  * scale;   // individual sphere size
      const PERSP    = 2000;

      const cx = W * 0.5;
      const cy = H * 0.5;

      for (let ring = 0; ring < RINGS; ring++) {
        for (let i = 0; i < STRANDS; i++) {
          const p = i / STRANDS;

          // Vertical — just enough to bleed slightly past top & bottom
          const yWorld = (p - 0.5) * H * 1.35;

          // Helix rotation + animation
          const helixAngle = p * Math.PI * 9 + t * rotDir;

          // X pinch — narrow waist at center, wide arms at top & bottom
          const pinch = 1 - 0.50 * Math.exp(-Math.pow((p - 0.5) * 3.0, 2));
          const curR  = MAIN_R * pinch;

          const hx = Math.cos(helixAngle) * curR;
          const hz = Math.sin(helixAngle) * curR;

          // Tube cross-section
          const tubeAngle = (ring / RINGS) * Math.PI * 2;
          const tx = Math.cos(tubeAngle) * TUBE_R;
          const tz = Math.sin(tubeAngle) * TUBE_R;

          const px = hx + tx;
          const pz = hz + tz;

          // Tilt to form X — arm1 tilts one way, arm2 the other
          const rx = px * Math.cos(tilt) - yWorld * Math.sin(tilt);
          const ry = px * Math.sin(tilt) + yWorld * Math.cos(tilt);

          const persp = PERSP / (PERSP + pz);

          allParticles.push({
            sx: cx + rx * persp,
            sy: cy + ry * persp,
            sz: pz,
            r:  SPHERE_R * persp,
            PERSP,
          });
        }
      }
    };

    const drawSphere = ({ sx, sy, sz, r, PERSP }) => {
      const depth   = Math.max(0, Math.min(1, (sz + PERSP * 0.5) / PERSP));
      const hi      = 0.10 + depth * 0.22;

      // Dark matte — exact reference look
      const g = ctx.createRadialGradient(
        sx - r * 0.36, sy - r * 0.40, r * 0.01,
        sx,            sy,            r
      );
      g.addColorStop(0,    `rgba(85, 82, 78, ${hi})`);
      g.addColorStop(0.18, `rgba(34, 32, 30, 0.97)`);
      g.addColorStop(0.58, `rgba(12, 11, 10, 1)`);
      g.addColorStop(1,    `rgba(2,  2,  2,  1)`);

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();

      // Specular dot upper-left
      ctx.beginPath();
      ctx.fillStyle = `rgba(155, 150, 143, ${hi * 0.65})`;
      ctx.arc(sx - r * 0.31, sy - r * 0.33, r * 0.115, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.003;

      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      const all = [];
      // Arm 1: tilts /, rotates clockwise (+1)
      buildArm(all, W, H, +1,  0.52);
      // Arm 2: tilts \, rotates counter-clockwise (-1)
      buildArm(all, W, H, -1, -0.52);

      // Global depth sort — arms correctly occlude at the cross
      all.sort((a, b) => a.sz - b.sz);
      all.forEach(drawSphere);
    };

    animate();
    return () => {
      cancelAnimationFrame(frame);
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
        style={{ background: "#050507" }}
      >
        {/* Abstract Bead Background Mesh */}
        <CylinderBeadBackground />

        {/* ── UPDATED OVERLAY ── */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(5,5,7,0.55) 100%)"
          }}
        />

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
