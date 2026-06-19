import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { PROFILE, SOCIALS } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

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

/* ═══════════════════════════════════════════════════════════════════════
   Glassy chrome bubble-helix background (reference: image 3)
   Monochrome, glossy, high-contrast specular spheres — not flat colored
   dots. Each "bubble" is rendered with multiple nested gradients to fake
   glass refraction + chrome reflection, all in greyscale.
═══════════════════════════════════════════════════════════════════════ */
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
        return {
          sx: cx + rx * scale * psp,
          sy: cy + ry * scale * psp,
          z: rz2,
          r: b.r * scale * 0.34 * psp,
          seed: b.seed,
        };
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

const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 py-5">
      <div className="overflow-hidden">
        <div className="flex items-center shrink-0 gap-12 whitespace-nowrap animate-[marquee-scroll_34s_linear_infinite] will-change-transform">
          {items.map(({ label }, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[11px] tracking-[0.2em] uppercase font-mono">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const dotRef = useRef(null);
  const pos    = useRef({ x: -200, y: -200 });
  const [mounted, setMounted] = useState(false);

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    // Belt-and-suspenders: a global stylesheet rule AND a direct inline
    // !important override on html/body. Inline style + !important always
    // wins the CSS cascade over any external stylesheet rule, even if that
    // stylesheet also uses !important — this is the strongest override
    // available without touching other files.
    let style = document.getElementById("no-cursor-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "no-cursor-style";
      style.textContent = "html, body, *, *::before, *::after { cursor: none !important; }";
    }
    document.head.appendChild(style);

    document.documentElement.style.setProperty("cursor", "none", "important");
    document.body.style.setProperty("cursor", "none", "important");

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate(${pos.current.x - 6}px,${pos.current.y - 6}px)`;
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      const el = document.getElementById("no-cursor-style");
      if (el) el.remove();
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(encodeURI("/Paul_C__Schmidt_-_Interstellar_Main_Theme__mp3_pm_.mp3"));
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

  return (
    <>
      <style>{`
        @keyframes marquee-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes waveBar { from{transform:scaleY(0.3)} to{transform:scaleY(1)} }
        @media(prefers-reduced-motion:reduce){ [class*="animate-"]{animation:none !important} }
      `}</style>

      {mounted && createPortal(
        <div
          ref={dotRef}
          style={{
            position: "fixed", top: 0, left: 0, width: 16, height: 16,
            borderRadius: "50%", background: "#fff",
            pointerEvents: "none", zIndex: 2147483647,
            willChange: "transform",
            boxShadow: "0 0 14px 4px rgba(255,255,255,0.65), 0 0 2px 1px rgba(255,255,255,0.9)",
          }}
        />,
        document.body
      )}

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#070708" }}
      >
        <GlassBubbleBackground />

        <div className="absolute inset-0 z-[1]" style={{
          background:
            "radial-gradient(ellipse at 50% 38%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 70%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.85) 100%)",
        }} />

        {/* ── Music pill — sits beside your existing logo/name in the real
             Navbar (not duplicated here). Matches the "🔊 MUSIC" pill style
             from your reference. Tune `left` to land right after your logo
             block ends. ── */}
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause music" : "Play music"}
          style={{ cursor: "none", left: "168px", top: "20px" }}
          className={`fixed z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase font-medium transition-all duration-200 ${
            playing
              ? "border-white/30 bg-white/10 text-white"
              : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/25"
          }`}
        >
          <WaveformIcon playing={playing} size={14} />
          <span>{playing ? "playing" : "music"}</span>
        </button>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-10 max-w-5xl mx-auto">
          <h1 className="font-extrabold tracking-tight leading-[1.15] text-white text-3xl sm:text-4xl md:text-[3.4rem] flex flex-col items-center gap-1">
            <span className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-white/40 font-normal">Hey, I&rsquo;m</span>
              <span className="inline-block w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 align-middle">
                <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover grayscale" />
              </span>
              <span>Saranmani</span>
            </span>
            <span className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-white/40 font-normal">An</span>
              <span>Infrastructure Engineer</span>
            </span>
            <span className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-white/40 font-normal">At</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                Cloud Canvas
              </span>
            </span>
          </h1>

          <p className="mt-6 text-sm md:text-base text-white/45 max-w-[560px] leading-relaxed">
            I enjoy taking messy, complicated infrastructure architectures and
            making them feel automated, secure, and effortless for global
            engineering teams.
          </p>

          <div className="mt-8 flex items-center justify-center gap-5">
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a
                key={k} href={url} target="_blank" rel="noopener noreferrer"
                style={{ cursor: "none" }}
                className="text-white/50 hover:text-white transition-colors"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
            <span className="w-px h-5 bg-white/20" />
            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pause music" : "Play music"}
              title={playing ? "Pause music" : "Play music"}
              style={{ cursor: "none" }}
              className={`transition-colors ${playing ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              <WaveformIcon playing={playing} size={18} />
            </button>
            <span className="w-px h-5 bg-white/20" />
            <a
              href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
              style={{ cursor: "none" }}
              className="text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
            >
              Résumé →
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              style={{ cursor: "none" }}
              className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Say hi ↗
            </a>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-4 text-white/35 text-[11px] tracking-[0.15em] uppercase mb-8 px-6">
          <span>Scroll down</span>
          <div className="h-px w-28 md:w-40 bg-white/15" />
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="h-px w-28 md:w-40 bg-white/15" />
          <span>to see projects</span>
        </div>

        <SkillsMarquee />
      </section>
    </>
  );
};
