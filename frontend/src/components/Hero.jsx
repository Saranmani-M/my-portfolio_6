import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { PROFILE, SOCIALS } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

const SOCIAL_ICONS = [
  { Icon: Linkedin, url: SOCIALS.linkedin, k: "linkedin" },
  { Icon: Github, url: SOCIALS.github, k: "github" },
  { Icon: Instagram, url: SOCIALS.instagram, k: "instagram" },
  { Icon: Twitter, url: SOCIALS.twitter, k: "x" },
];

const svgIcon = (viewBox, path) => ({ size = 20, className = "" }) => (
  <svg viewBox={viewBox} width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    <path d={path} />
  </svg>
);

const SiPython = svgIcon("0 0 24 24", "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04z");
const SiAmazonaws = svgIcon("0 0 24 24", "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.24-.112a2.475 2.475 0 01-.287-.375 6.18 6.104 0 01-.248-.478c-.623.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.51.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.026-.527.27-.352 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.608zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z");
const SiLinux = svgIcon("0 0 24 24", "M12.504 0c-.155 0-.315.008-.480.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.005 3.02-.806 1.207-1.937 2.7-2.875 4.314-.932 1.59-1.893 3.33-2.393 5.103-.498 1.768-.952 3.656-.952 5.103.003 1.092.532 2.224 1.424 2.765.899.54 2.09.475 3.313.052 1.264-.437 2.602-.836 3.993-.918.703-.04 1.405-.04 2.108 0 1.391.082 2.729.481 3.993.918 1.223.423 2.414.488 3.313-.052.892-.54 1.421-1.673 1.424-2.765-.002-1.447-.455-3.335-.953-5.103-.5-1.773-1.461-3.513-2.393-5.103-.938-1.614-2.069-3.107-2.875-4.314-.705-1.067-.929-1.928-1.005-3.02-.065-1.491 1.056-5.966-3.17-6.298-.164-.013-.324-.021-.479-.021z");
const SiNetapp = svgIcon("0 0 24 24", "M2 4h2.5v9.5L17 4h5.5L12 13.5 22.5 24h-5L7 14v10H2z");
const SiIam = svgIcon("0 0 24 24", "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z");
const SiAmazons3 = svgIcon("0 0 24 24", "M12 2L4 5.5v5.24c0 4.52 3.4 8.76 8 9.76 4.6-1 8-5.24 8-9.76V5.5L12 2z");
const SiAmazonec2 = svgIcon("0 0 24 24", "M4 4h16v2H4zm0 14h16v2H4zm-2-2V8h2v8zm20-8v8h-2V8zM8 8h8v8H8z");
const SiGnubash = svgIcon("0 0 24 24", "M2 4h20v2H2zm0 7h12v2H2zm0 7h20v2H2zM16 8l4 5-4 5");
const SiGit = svgIcon("0 0 24 24", "M21.62 11.108l-8.731-8.729a1.294 1.294 0 00-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 011.939 1.95l2.214 2.217a1.532 1.532 0 011.784 2.369 1.533 1.533 0 01-1.517 1.527 1.53 1.53 0 01-1.517-1.527v-.012a1.529 1.529 0 00-.994-1.429L11.61 9.61v4.09a1.533 1.533 0 11-1.51.001V9.36a1.533 1.533 0 01-.449-2.861L7.397 4.19 1.379 10.208a1.294 1.294 0 000 1.822l8.731 8.729a1.294 1.294 0 001.822 0l9.689-9.652a1.294 1.294 0 000-1.999");
const SiDocker = svgIcon("0 0 24 24", "M4.5 10.5v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v-2h-2v2zm2-8v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm2-8v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm2-8v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2zm0 2v2h2v-2z");
const SiPycharm = svgIcon("0 0 24 24", "M4 2h16v20H4zm2 2v16h12V4zm2 2h8v2H8zm0 4h8v2H8zm0 4h5v2H8z");

const MARQUEE_SKILLS = [
  { label: "Python", Icon: SiPython },
  { label: "AWS", Icon: SiAmazonaws },
  { label: "Linux", Icon: SiLinux },
  { label: "SAN / NAS", Icon: SiNetapp },
  { label: "IAM", Icon: SiIam },
  { label: "S3", Icon: SiAmazons3 },
  { label: "EC2", Icon: SiAmazonec2 },
  { label: "Bash", Icon: SiGnubash },
  { label: "Git", Icon: SiGit },
  { label: "Docker", Icon: SiDocker },
  { label: "PyCharm", Icon: SiPycharm },
];

const VIRTUAL_W = 1600;
const VIRTUAL_H = 1000;

const BubbleBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = VIRTUAL_W;
    const height = VIRTUAL_H;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Dense sphere cluster — many more bubbles, tighter packing
    const BUBBLES = 2200;
    const bubbles = [];
    const STRANDS = 14;
    const TURNS = 2.0;

    for (let i = 0; i < BUBBLES; i++) {
      const strand = i % STRANDS;
      const along = Math.floor(i / STRANDS) / Math.ceil(BUBBLES / STRANDS);
      const u = along * Math.PI * 2 * TURNS;
      const pathX = Math.sin(u * 1.3) * 0.6;
      const pathY = (along - 0.5) * 2.0;
      const pathZ = Math.cos(u * 0.9) * 0.6;
      const strandAngle = (strand / STRANDS) * Math.PI * 2 + along * 2.5;
      const tubeR = 0.42; // fatter tube = denser mass
      const offX = Math.cos(strandAngle) * tubeR;
      const offZ = Math.sin(strandAngle) * tubeR;
      bubbles.push({
        x: pathX + offX,
        y: pathY,
        z: pathZ + offZ,
        r: Math.random() * 0.45 + 0.7,
        jitter: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.0009; // slow, heavy rotation

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseRadius = Math.max(width, height) * 0.56; // fills screen more
      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(0.12);
      const sinB = Math.sin(0.12);

      const projected = bubbles.map((b) => {
        const breathe = 1 + Math.sin(t * 1.2 + b.jitter) * 0.025;
        const x1 = b.x * cosA - b.z * sinA;
        const z1 = b.x * sinA + b.z * cosA;
        const y2 = b.y * cosB - z1 * sinB;
        const z2 = b.y * sinB + z1 * cosB;
        const perspective = 2.8 / (2.8 + z2);
        return {
          sx: cx + x1 * baseRadius * perspective,
          sy: cy + y2 * baseRadius * perspective,
          z: z2,
          r: b.r * (baseRadius * 0.1) * perspective * breathe,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const depth = (p.z + 1.4) / 2.8;

        // Subtle outer glow
        const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, p.r * 2.0);
        glow.addColorStop(0, `rgba(15,15,15,${0.28 * depth})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(p.sx, p.sy, p.r * 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Main sphere body — strong highlight, deep shadow
        const lightX = p.sx - p.r * 0.38;
        const lightY = p.sy - p.r * 0.48;
        const body = ctx.createRadialGradient(lightX, lightY, p.r * 0.04, p.sx, p.sy, p.r * 1.1);
        const base = 6 + depth * 18;
        body.addColorStop(0, `rgba(${base + 52},${base + 52},${base + 52},0.98)`);
        body.addColorStop(0.35, `rgba(${base + 18},${base + 18},${base + 18},0.95)`);
        body.addColorStop(0.72, `rgba(${base + 4},${base + 4},${base + 4},0.92)`);
        body.addColorStop(1, `rgba(0,0,0,1)`);
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight — small, sharp, top-left
        const specX = p.sx - p.r * 0.3;
        const specY = p.sy - p.r * 0.35;
        const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, p.r * 0.38);
        spec.addColorStop(0, `rgba(255,255,255,${0.18 * depth})`);
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.fillStyle = spec;
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Thin dark rim
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,0,0,${0.55 * depth})`;
        ctx.lineWidth = Math.max(0.5, p.r * 0.05);
        ctx.arc(p.sx, p.sy, p.r * 0.97, 0, Math.PI * 2);
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 1, width: "100%", height: "100%" }}
    />
  );
};

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
                  <span
                    className="inline-flex items-center gap-2 px-6 text-white/80"
                    title={label}
                  >
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
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
    >
      <BubbleBackground />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(0,0,0,0.82) 72%), linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-10 md:pb-12 flex-1 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.3 }}
          className="max-w-[920px] mt-4 md:mt-8 flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            data-testid="badge-open-to-work"
            className="inline-flex items-center gap-2.5 mb-6 md:mb-8 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[11px] tracking-[0.18em] uppercase"
          >
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            Open to Work · 2026
          </motion.div>

          {/* Headline with photo inline */}
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

        {/* Social icons centered */}
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
            className="text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
          >
            Résumé →
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Say hi ↗
          </a>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center gap-4 text-white/30 text-[11px] tracking-[0.2em] uppercase mb-6"
        >
          <div className="h-px w-24 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
              <motion.div
                className="w-1 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div className="h-px w-24 bg-white/20" />
        </motion.div>
        <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-4">
          Scroll down to see projects
        </p>
      </div>

      <SkillsMarquee />
    </section>
  );
};
