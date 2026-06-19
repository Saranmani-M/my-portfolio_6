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

/* ── tiny inline SVG factory ─────────────────────────────────────────── */
const svgIcon = (viewBox, path) =>
  ({ size = 20, className = "" }) => (
    <svg viewBox={viewBox} width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );

const SiPython    = svgIcon("0 0 24 24","M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04z");
const SiAmazonaws = svgIcon("0 0 24 24","M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.24-.112a2.475 2.475 0 01-.287-.375 6.18 6.104 0 01-.248-.478c-.623.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.51.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.026-.527.27-.352 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.608zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z");
const SiLinux     = svgIcon("0 0 24 24","M12.504 0c-.155 0-.315.008-.480.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.005 3.02-.806 1.207-1.937 2.7-2.875 4.314-.932 1.59-1.893 3.33-2.393 5.103-.498 1.768-.952 3.656-.952 5.103.003 1.092.532 2.224 1.424 2.765.899.54 2.09.475 3.313.052 1.264-.437 2.602-.836 3.993-.918.703-.04 1.405-.04 2.108 0 1.391.082 2.729.481 3.993.918 1.223.423 2.414.488 3.313-.052.892-.54 1.421-1.673 1.424-2.765-.002-1.447-.455-3.335-.953-5.103-.5-1.773-1.461-3.513-2.393-5.103-.938-1.614-2.069-3.107-2.875-4.314-.705-1.067-.929-1.928-1.005-3.02-.065-1.491 1.056-5.966-3.17-6.298-.164-.013-.324-.021-.479-.021z");
const SiNetapp    = svgIcon("0 0 24 24","M2 4h2.5v9.5L17 4h5.5L12 13.5 22.5 24h-5L7 14v10H2z");
const SiIam       = svgIcon("0 0 24 24","M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z");
const SiAmazons3  = svgIcon("0 0 24 24","M12 2L4 5.5v5.24c0 4.52 3.4 8.76 8 9.76 4.6-1 8-5.24 8-9.76V5.5L12 2z");
const SiAmazonec2 = svgIcon("0 0 24 24","M4 4h16v2H4zm0 14h16v2H4zm-2-2V8h2v8zm20-8v8h-2V8zM8 8h8v8H8z");
const SiGnubash   = svgIcon("0 0 24 24","M2 4h20v2H2zm0 7h12v2H2zm0 7h20v2H2zM16 8l4 5-4 5");
const SiGit       = svgIcon("0 0 24 24","M21.62 11.108l-8.731-8.729a1.294 1.294 0 00-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 011.939 1.95l2.214 2.217a1.532 1.532 0 011.784 2.369 1.533 1.533 0 01-1.517 1.527 1.53 1.53 0 01-1.517-1.527v-.012a1.529 1.529 0 00-.994-1.429L11.61 9.61v4.09a1.533 1.533 0 11-1.51.001V9.36a1.533 1.533 0 01-.449-2.861L7.397 4.19 1.379 10.208a1.294 1.294 0 000 1.822l8.731 8.729a1.294 1.294 0 001.822 0l9.689-9.652a1.294 1.294 0 000-1.999");
const SiDocker    = svgIcon("0 0 24 24","M4.5 10.5v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm2-6v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm2-6v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm2-6v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2z");
const SiPycharm   = svgIcon("0 0 24 24","M4 2h16v20H4zm2 2v16h12V4zm2 2h8v2H8zm0 4h8v2H8zm0 4h5v2H8z");

const MARQUEE_SKILLS = [
  { label: "Python",  Icon: SiPython    },
  { label: "AWS",     Icon: SiAmazonaws },
  { label: "Linux",   Icon: SiLinux     },
  { label: "SAN/NAS", Icon: SiNetapp    },
  { label: "IAM",     Icon: SiIam       },
  { label: "S3",      Icon: SiAmazons3  },
  { label: "EC2",     Icon: SiAmazonec2 },
  { label: "Bash",    Icon: SiGnubash   },
  { label: "Git",     Icon: SiGit       },
  { label: "Docker",  Icon: SiDocker    },
  { label: "PyCharm", Icon: SiPycharm   },
];

/* ── Music src — file must be placed in your project's /public folder ─ */
const MUSIC_SRC = "/Running_Up_That_Hill_A_Deal_With_God.mp3";

/* ── Animated waveform icon ──────────────────────────────────────────── */
const WaveformIcon = ({ playing, size = 18 }) => {
  const bars = [0.45, 1, 0.6, 0.88, 0.5, 0.78, 0.38];
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 2.6 + 0.5}
          y={10 - h * 8}
          width={1.8}
          height={h * 16}
          rx={0.9}
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

/* ── Music toggle — import into your Navbar right after the logo ─────── */
export const MusicToggle = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio      = new Audio(MUSIC_SRC);
    audio.loop       = true;
    audio.volume     = 0.6;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing]);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause music" : "Play music"}
      style={{ cursor: "none" }}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-md transition-colors duration-200
        ${playing
          ? "text-white bg-white/10"
          : "text-white/50 hover:text-white hover:bg-white/8"}
      `}
    >
      <WaveformIcon playing={playing} size={18} />
    </button>
  );
};

/* ── Global white-dot cursor (active for every page) ─────────────────── */
export const GlobalCursor = () => {
  const dotRef   = useRef(null);
  const outerRef = useRef(null);
  const pos      = useRef({ x: -100, y: -100 });
  const smooth   = useRef({ x: -100, y: -100 });

  useEffect(() => {
    document.documentElement.style.cursor = "none";

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      }
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.13;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.13;
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${smooth.current.x - 18}px,${smooth.current.y - 18}px)`;
      }
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Solid white dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 8, height: 8, borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none", zIndex: 99999,
          willChange: "transform",
        }}
      />
      {/* Lagging outer ring */}
      <div
        ref={outerRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 36, height: 36, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.4)",
          pointerEvents: "none", zIndex: 99998,
          willChange: "transform",
        }}
      />
    </>
  );
};

/* ── Dark monochrome sphere canvas ───────────────────────────────────── */
const VIRTUAL_W = 1600;
const VIRTUAL_H = 1000;

const DARK_PALETTE = [
  [24,  24,  24],
  [36,  36,  36],
  [48,  48,  48],
  [20,  20,  20],
  [42,  42,  42],
  [30,  30,  30],
  [56,  56,  56],
];

const DarkSphereBackground = () => {
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

    /* Build atoms */
    const atoms  = [];
    const STEPS  = 140;
    const TURNS  = 5.5;
    const HR     = 1.45;   // helix radius
    const HH     = 3.0;   // helix height

    for (let i = 0; i < STEPS; i++) {
      const frac  = i / STEPS;
      const angle = frac * Math.PI * 2 * TURNS;
      const y     = (frac - 0.5) * HH;

      // Strand 1
      atoms.push({ x: Math.cos(angle) * HR, y, z: Math.sin(angle) * HR, r: 1.05, color: DARK_PALETTE[i % 3] });
      // Strand 2
      atoms.push({ x: Math.cos(angle + Math.PI) * HR, y, z: Math.sin(angle + Math.PI) * HR, r: 1.05, color: DARK_PALETTE[(i + 2) % 3] });

      // Rungs
      if (i % 2 === 0) {
        const x1 = Math.cos(angle) * HR, z1 = Math.sin(angle) * HR;
        const x2 = Math.cos(angle + Math.PI) * HR, z2 = Math.sin(angle + Math.PI) * HR;
        for (let j = 1; j < 5; j++) {
          const t = j / 5;
          atoms.push({ x: x1+(x2-x1)*t, y, z: z1+(z2-z1)*t, r: 0.7, color: DARK_PALETTE[3+(j%4)] });
        }
      }

      // Small sugar atoms
      for (let k = 0; k < 3; k++) {
        const n    = ((k * 137.5) % 1) * 0.18 - 0.09;
        const ao   = angle + n * Math.PI;
        const ro   = HR + 0.14 + n * 0.1;
        atoms.push({ x: Math.cos(ao)*ro,           y: y+n*0.15, z: Math.sin(ao)*ro,           r: 0.48, color: DARK_PALETTE[(i+k+4)%7] });
        atoms.push({ x: Math.cos(ao+Math.PI)*ro,   y: y+n*0.15, z: Math.sin(ao+Math.PI)*ro,   r: 0.48, color: DARK_PALETTE[(i+k+1)%7] });
      }
    }

    // Edge-fill scatter atoms
    for (let i = 0; i < 260; i++) {
      atoms.push({
        x: (((i*73.137+17)%100)/100 - 0.5) * 4.4,
        y: (((i*41.293+5) %100)/100 - 0.5) * 3.2,
        z: (((i*29.817+31)%100)/100 - 0.5) * 2.4,
        r: 0.25 + ((i*17.391)%100)/100 * 0.85,
        color: DARK_PALETTE[i % 7],
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
      if (isScrolling) return;
      ctx.clearRect(0, 0, VIRTUAL_W, VIRTUAL_H);
      t += 0.006;

      const cx    = VIRTUAL_W * 0.5;
      const cy    = VIRTUAL_H * 0.5;
      const scale = Math.min(VIRTUAL_W, VIRTUAL_H) * 0.60;
      const cosY  = Math.cos(t * 0.4), sinY = Math.sin(t * 0.4);
      const cosX  = Math.cos(0.18),    sinX = Math.sin(0.18);

      const proj = atoms.map((a) => {
        const rx  =  a.x*cosY - a.z*sinY;
        const rz  =  a.x*sinY + a.z*cosY;
        const ry  =  a.y*cosX - rz*sinX;
        const rz2 =  a.y*sinX + rz*cosX;
        const psp = 2.5 / (2.5 + rz2);
        return { sx: cx+rx*scale*psp, sy: cy+ry*scale*psp, z: rz2, r: a.r*scale*0.065*psp, color: a.color };
      });
      proj.sort((a, b) => a.z - b.z);

      proj.forEach((p) => {
        const dep = Math.max(0, Math.min(1, (p.z + 1.5) / 3.0));
        const [cr, cg, cb] = p.color;
        const dr = Math.round(cr*(0.4+0.6*dep));
        const dg = Math.round(cg*(0.4+0.6*dep));
        const db = Math.round(cb*(0.4+0.6*dep));

        // Glow
        const glow = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,p.r*1.8);
        glow.addColorStop(0, `rgba(${dr},${dg},${db},0.13)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.fillStyle = glow;
        ctx.arc(p.sx, p.sy, p.r*1.8, 0, Math.PI*2); ctx.fill();

        // Body
        const body = ctx.createRadialGradient(p.sx-p.r*.35,p.sy-p.r*.4,p.r*.05,p.sx,p.sy,p.r);
        body.addColorStop(0,   `rgba(${Math.min(255,dr+55)},${Math.min(255,dg+55)},${Math.min(255,db+55)},1)`);
        body.addColorStop(0.5, `rgba(${dr},${dg},${db},1)`);
        body.addColorStop(1,   `rgba(${Math.round(dr*.2)},${Math.round(dg*.2)},${Math.round(db*.2)},1)`);
        ctx.beginPath(); ctx.fillStyle = body;
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI*2); ctx.fill();

        // Specular
        const spec = ctx.createRadialGradient(p.sx-p.r*.28,p.sy-p.r*.32,0,p.sx-p.r*.28,p.sy-p.r*.32,p.r*.38);
        spec.addColorStop(0, `rgba(255,255,255,${0.22*dep})`);
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.fillStyle = spec;
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI*2); ctx.fill();
      });
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 1, width: "100%", height: "100%" }}
    />
  );
};

/* ── Skills marquee ──────────────────────────────────────────────────── */
const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div
      data-testid="skills-marquee"
      className="relative z-10 w-full border-t border-b border-white/10 py-5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 overflow-hidden">
        <div className="marquee-track flex items-center whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {items.map(({ label, Icon }, i) => (
                <React.Fragment key={`${copy}-${label}-${i}`}>
                  <span className="inline-flex items-center gap-2 px-6 text-white/80" title={label}>
                    <Icon size={20} />
                    <span className="sr-only">{label}</span>
                  </span>
                  <span className="text-white/30 text-[10px]">•</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 38s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes waveBar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1);   }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

/* ── Hero (main export) ──────────────────────────────────────────────── */
export const Hero = () => {
  return (
    <>
      {/* White dot cursor — affects the entire page */}
      <GlobalCursor />

      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ background: "#080808" }}
      >
        <DarkSphereBackground />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 18%, rgba(0,0,0,0.68) 65%)," +
              "linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.80) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-10 md:pb-12 flex-1 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.3 }}
            className="max-w-[920px] mt-4 md:mt-8 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              data-testid="badge-open-to-work"
              className="inline-flex items-center gap-2.5 mb-6 md:mb-8 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[11px] tracking-[0.18em] uppercase"
            >
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Open to Work · 2026
            </motion.div>

            <h1
              data-testid="hero-name"
              className="font-sans font-extrabold tracking-[-0.02em] leading-[0.95] text-white text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5.25rem] flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              <span>Hey, I&rsquo;m</span>
              <span
                className="inline-block w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 align-middle mx-1"
                style={{ verticalAlign: "middle" }}
              >
                <img
                  src={PROFILE.photoUrl}
                  alt="Saranmani M"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(0.3)" }}
                />
              </span>
              <span>Saranmani M</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: easeOut }}
              className="mt-6 text-[16px] md:text-[18px] text-white/60 max-w-[600px] leading-relaxed"
            >
              IT Graduate — Cloud Security &amp; Linux Engineer. Building reliable
              and secure digital infrastructure, one system at a time.
            </motion.p>
          </motion.div>

          <div className="flex-1 min-h-[24px] md:min-h-[32px]" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOut }}
            className="flex items-center justify-center gap-6 mb-10"
          >
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a
                key={k}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`hero-social-${k}`}
                style={{ cursor: "none" }}
                className="text-white/50 hover:text-white transition-colors"
              >
                <Icon size={22} strokeWidth={1.5} />
              </a>
            ))}
            <span className="w-px h-5 bg-white/20" />
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-resume"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-4 text-white/30 text-[11px] tracking-[0.2em] uppercase mb-6"
          >
            <div className="h-px w-24 bg-white/20" />
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
              <motion.div
                className="w-1 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="h-px w-24 bg-white/20" />
          </motion.div>
          <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-4">
            Scroll down to see projects
          </p>
        </div>

        <SkillsMarquee />
      </section>
    </>
  );
};
