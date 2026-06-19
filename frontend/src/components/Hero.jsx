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
  { name: "Rahi",   color: "text-blue-400/50"  },
  { name: "idp",    color: "text-green-400/50" },
  { name: "Google", color: "text-red-400/50"   },
  { name: "Gears",  color: "text-white/40"     },
];

const WaveformIcon = ({ playing, size = 16 }) => {
  const bars = [0.45, 1, 0.6, 0.88, 0.5];
  return (
    <svg width={size} height={size} viewBox="0 0 20 16" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <React.Fragment key={i}>
          <rect
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
        </React.Fragment>
      ))}
    </svg>
  );
};

// ── 3D ACTIVELY SPINNING CROSS-BEAD BACKGROUND ENGINE ──
const CylinderBeadBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let time = 0;

    const render = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width  = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else {
        ctx.clearRect(0, 0, W, H);
      }

      const cx = W * 0.5;
      const cy = H * 0.5;
      const scale = Math.min(W, H) / 800;

      // High-density parameters matching the bold tactile texture look
      const RINGS    = 70;       
      const STRANDS  = 420;      
      const MAIN_R   = 195 * scale; 
      const TUBE_R   = 95  * scale; 
      const SPHERE_R = 14.5 * scale; 
      const PERSP    = 2000;
      const WRAPS    = Math.PI * 10;
      const Y_SPAN   = H * 1.4;

      // Active spinning velocity clock increment
      time += 0.004; 

      const particles = [];

      const addArm = (tiltAngle, directionClock) => {
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);

        for (let ring = 0; ring < RINGS; ring++) {
          const tubeAngle = (ring / RINGS) * Math.PI * 2;
          const tubeCosX  = Math.cos(tubeAngle) * TUBE_R;
          const tubeSinZ  = Math.sin(tubeAngle) * TUBE_R;

          for (let i = 0; i < STRANDS; i++) {
            const p      = i / STRANDS;
            const yWorld = (p - 0.5) * Y_SPAN;
            const pinch  = 1 - 0.42 * Math.exp(-Math.pow((p - 0.5) * 2.8, 2));
            const curR   = MAIN_R * pinch;

            // Mathematical rotation calculation over continuous frame variations
            const angle = p * WRAPS + (directionClock * time);
            const hx    = Math.cos(angle) * curR;
            const hz    = Math.sin(angle) * curR;

            const px = hx + tubeCosX;
            const pz = hz + tubeSinZ;

            const rx = px * cosT - yWorld * sinT;
            const ry = px * sinT + yWorld * cosT;

            const persp = PERSP / (PERSP + pz);

            particles.push({
              sx: cx + rx * persp,
              sy: cy + ry * persp,
              pz,
              r:  SPHERE_R * persp,
            });
          }
        }
      };

      // Perfect interlocking X-shape arrangement
      addArm(0.52, 1);  
      addArm(-0.52, -1); 

      // Sort coordinates depth-first to produce uniform lighting structures
      particles.sort((a, b) => a.pz - b.pz);

      particles.forEach(({ sx, sy, pz, r }) => {
        const depth = Math.max(0, Math.min(1, (pz + PERSP * 0.5) / PERSP));
        const hi = 0.04 + depth * 0.15; 

        const g = ctx.createRadialGradient(
          sx - r * 0.38, sy - r * 0.42, r * 0.01,
          sx,            sy,            r
        );
        g.addColorStop(0,    `rgba(72,69,65,${hi * 1.25})`);
        g.addColorStop(0.25, `rgba(22,20,18,0.99)`);
        g.addColorStop(0.70, `rgba(6,5,5,1)`);
        g.addColorStop(1,    `rgba(3,3,4,1)`);

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();

        // Matte dynamic light sheen highlight spots
        ctx.beginPath();
        ctx.fillStyle = `rgba(130,125,118,${hi * 0.52})`;
        ctx.arc(sx - r * 0.32, sy - r * 0.34, r * 0.10, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
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

      {/* FIXED TOP NAVIGATION BAR (Left company logo token, right menu button cleared) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 pointer-events-none">
        <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 pointer-events-auto">
          {/* Company Logo Brand Icon Token Shape */}
          <svg className="w-5 h-5 text-white animate-spin-slow" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 6c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 23.523 6 10s4.477-10 10-10z" fill="currentColor" fillOpacity="0.15"/>
            <path d="M10 14c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" fill="currentColor"/>
          </svg>
        </div>
        <div className="hidden md:block" />
      </nav>

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#030304" }}
      >
        {/* HTML5 Canvas Component Rendering Active 3D Rotational Geometry Loops */}
        <CylinderBeadBackground />

        {/* Shadow Overlay Gradient Coating */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(3,3,4,0.02) 0%, rgba(3,3,4,0.70) 100%)"
          }}
        />

        {/* ── MAIN CONTENT TYPOGRAPHY BLOCK ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 max-w-5xl mx-auto w-full pt-16">

          <h1 className="font-sans font-bold tracking-tight text-white max-w-4xl text-center leading-[1.2]
            text-4xl sm:text-5xl md:text-[4.2rem]">

            <span className="block mb-2">
              <span className="text-white/60 font-medium">Hey, I&rsquo;m </span>
              <span className="inline-flex items-center justify-center bg-white/10 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 mx-2 align-middle transform translate-y-[-2px]">
                <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover scale-110" />
              </span>
              <span className="text-white">Saranmani</span>
            </span>

            <span className="block">
              <span className="text-white/60 font-medium">An </span>
              <span className="text-white">Infrastructure Engineer</span>
              <span className="inline-flex items-center justify-center bg-white/5 px-2 py-1 h-7 sm:h-9 md:h-11 rounded-lg border border-white/10 mx-1 align-middle transform translate-y-[-4px]">
                <span className="text-xs sm:text-sm font-mono text-white/40">⚡</span>
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

        {/* ── FOOTER CONTAINER WITH INTERESTED COMPANIES MARQUEE TRACK ── */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mb-5 sm:mb-8 px-4 sm:px-6">
          
          {/* STATIC CATEGORY ANCHOR BLOCK */}
          <div className="mb-4">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-white/30 uppercase font-sans">
              Interested Companies
            </span>
          </div>

          <div className="w-full overflow-hidden mb-5 sm:mb-6">
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
