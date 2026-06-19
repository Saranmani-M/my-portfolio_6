import React, { useEffect, useRef, useState, useCallback } from "react";
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

const WaveformIcon = ({ playing, size = 12 }) => {
  const bars = [0.4, 0.9, 0.5, 0.8, 0.4];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 2.5 + 2}
          y={8 - h * 6}
          width={1.5}
          height={h * 12}
          rx={0.5}
          fill="currentColor"
          style={playing ? {
            animation: `waveBar ${0.4 + i * 0.08}s ease-in-out ${i * 0.04}s infinite alternate`,
            transformOrigin: "50% 100%",
          } : {}}
        />
      ))}
    </svg>
  );
};

const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative z-10 w-full border-t border-white/[0.06] bg-[#09090b] py-5 mt-auto">
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center whitespace-nowrap">
          <div className="flex items-center shrink-0 gap-10 animate-[marquee-scroll_40s_linear_infinite]">
            {items.map(({ label, Icon }, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 text-white/30 hover:text-white/60 transition-colors">
                <Icon size={14} /> 
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  // Bulletproof custom tracking cursor logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const audio = new Audio("/Paul_C_Schmidt_Interstellar_Main_Theme.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setPlaying(true); }
  }, [playing]);

  return (
    <>
      <style>{`
        /* Complete Global Reset to Force-Kill the Default Browser Cursor */
        html, body, #root, a, button, img, svg, [role="button"] {
          cursor: none !important;
        }
        @keyframes marquee-scroll { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
        @keyframes waveBar { 
          from { transform: scaleY(0.3); } 
          to { transform: scaleY(1); } 
        }
      `}</style>

      {/* Fluid hardware-accelerated invert crosshair point */}
      <div
        ref={cursorRef}
        className="fixed w-3.5 h-3.5 bg-white rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform transition-transform duration-75 ease-out"
        style={{ left: "-100px", top: "-100px" }}
      />

      {/* The Omkar Layout System Matrix */}
      <div className="bg-[#09090b] text-white min-h-screen flex flex-col md:flex-row font-sans relative overflow-hidden selection:bg-white/10">
        
        {/* LEFT COMPONENT: Fixed structural dark dashboard profile line */}
        <aside className="w-full md:w-[340px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] p-8 md:p-10 flex flex-col justify-between z-10 bg-[#121214]">
          <div className="flex flex-col items-start gap-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-[#09090b] p-1">
              <img src={PROFILE.photoUrl} alt="Saranmani M" className="w-full h-full object-cover rounded-xl grayscale" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] tracking-widest font-mono uppercase mb-3">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Available for work
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">Saranmani M</h2>
              <p className="text-xs text-white/40 font-mono mt-1">@saranmani · Chennai, IN</p>
            </div>
          </div>

          <div className="my-10 space-y-3.5">
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Cloud Security &amp; Linux Engineer specializing in building secure, zero-trust infrastructure environments.
            </p>
            <a href={`mailto:${PROFILE.email}`} className="w-full py-3 px-4 rounded-xl bg-white text-black text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center hover:bg-white/90 transition-all active:scale-[0.98]">
              Get In Touch
            </a>
            <div className="flex gap-2.5 pt-1">
              {SOCIAL_ICONS.map(({ Icon, url, k }) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border border-white/[0.08] bg-[#09090b] text-white/40 hover:text-white hover:border-white/20 transition-all flex-1 flex justify-center">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-white/[0.06] pt-5 text-[10px] font-mono text-white/30 tracking-wide">
            <p className="flex items-center gap-2"><span>🛡️</span> DevSecOps Principles</p>
            <p className="flex items-center gap-2"><span>💻</span> Systems Automation Expert</p>
          </div>
        </aside>

        {/* RIGHT COMPONENT: Clean, minimalist flat typography layer */}
        <main className="flex-1 flex flex-col relative min-h-[100vh] md:h-screen overflow-y-auto bg-[#09090b]">
          
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-20 pt-28 pb-16 max-w-[900px] mx-auto text-center">
            
            {/* Audio Toggle Pill Button exactly aligned above the text row blocks */}
            <button
              onClick={toggleMusic}
              className={`mb-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[9px] tracking-[0.25em] font-mono uppercase transition-all duration-200 ${
                playing 
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                  : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              <WaveformIcon playing={playing} />
              <span>{playing ? "Theme Active" : "Ambient Audio"}</span>
            </button>

            {/* Flat Modern Display Typography Engine */}
            <h1 className="text-4xl sm:text-5xl md:text-[4.75rem] font-black tracking-tight leading-[1.05] text-white select-none">
              Hey, I'm <span className="text-white/30 font-light font-sans">Saranmani</span> <br />
              An Infrastructure <span className="underline decoration-white/20 underline-offset-8 font-serif italic font-normal tracking-normal text-white/90">Engineer</span> <br />
              At <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">Cloud Canvas</span>
            </h1>

            <p className="mt-8 text-sm md:text-base text-white/40 max-w-[560px] leading-relaxed font-normal">
              I enjoy taking messy, complicated infrastructure architectures and making them feel automated, secure, and effortless for global engineering teams!
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-[10px] tracking-[0.2em] font-mono uppercase text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-200">
                View Résumé →
              </a>
            </div>
          </div>

          <SkillsMarquee />
        </main>

      </div>
    </>
  );
};

const MARQUEE_SKILLS = [
  { label: "Python",  Icon: () => <span className="font-mono text-[10px]">PY</span> },
  { label: "AWS",     Icon: () => <span className="font-mono text-[10px]">WS</span> },
  { label: "Linux",   Icon: () => <span className="font-mono text-[10px]">LX</span> },
  { label: "Bash",    Icon: () => <span className="font-mono text-[10px]">SH</span> },
  { label: "Docker",  Icon: () => <span className="font-mono text-[10px]">DK</span> },
  { label: "Git",     Icon: () => <span className="font-mono text-[10px]">GT</span> },
];
