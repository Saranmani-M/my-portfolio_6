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

const DNABackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    const TOTAL = 180;
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < TOTAL; i++) {
      const y = 1 - (i / (TOTAL - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      points.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        size: Math.random() * 3 + 1.5,
      });
    }
    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.003;
      const cx = width * 0.72;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.42;
      const projected = points.map((p) => {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const cosB = Math.cos(angle * 0.4);
        const sinB = Math.sin(angle * 0.4);
        const x1 = p.x * cosA - p.z * sinA;
        const z1 = p.x * sinA + p.z * cosA;
        const y2 = p.y * cosB - z1 * sinB;
        const z2 = p.y * sinB + z1 * cosB;
        const perspective = 2.5 / (2.5 + z2);
        return {
          sx: cx + x1 * scale * perspective,
          sy: cy + y2 * scale * perspective,
          z: z2,
          size: p.size * perspective,
        };
      });
      projected.sort((a, b) => a.z - b.z);
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.12 * ((projected[i].z + 1.5) / 2.5);
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      projected.forEach((p) => {
        const brightness = (p.z + 1.5) / 2.5;
        const alpha = brightness * 0.7 + 0.1;
        const r = p.size * brightness;
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3);
        grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.4})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,200,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
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
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.85 }}
    />
  );
};

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden"
    >
      <DNABackground />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(5,5,5,0.85) 70%), linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-28 md:pt-32 pb-16 md:pb-20 min-h-[100svh] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.3 }}
          className="max-w-[640px] mt-4 md:mt-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            data-testid="badge-open-to-work"
            className="inline-flex items-center gap-2.5 mb-6 md:mb-8 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 text-[10px] tracking-[0.22em] uppercase"
          >
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            Open to Work · 2026
          </motion.div>

          <h1
            data-testid="hero-name"
            className="font-sans font-extrabold tracking-[-0.03em] leading-[0.92] text-white text-[3rem] sm:text-[3.75rem] md:text-[4.75rem] lg:text-[6rem]"
          >
            Learning Cloud
            <br />
            &amp; Security
            <br />
            Since 2026
          </h1>
        </motion.div>

        <div className="flex-1 min-h-[40px]" />

        <div className="max-w-[520px] space-y-7 md:space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: easeOut }}
          >
            <p className="text-[18px] md:text-[20px] text-white font-medium leading-relaxed">
              Hi, I&rsquo;m Saranmani M
            </p>
            <p
              className="mt-1 text-[15px] md:text-[16px] text-white/55 leading-relaxed"
              data-testid="hero-role"
            >
              IT Graduate | Cloud Security &amp; Linux Engineer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: easeOut }}
            data-testid="hero-description"
            className="text-[14px] md:text-[15px] leading-[1.7] text-white/45 max-w-[460px]"
          >
            Focused on building a strong foundation in cloud technologies,
            automation, and system administration. Currently developing
            hands-on skills through projects and continuous learning, with the
            goal of becoming a Cloud &amp; Storage Engineer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: easeOut }}
            className="flex items-center gap-5 pt-2"
          >
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              
                key={k}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`hero-social-${k}`}
                className="text-white/55 hover:text-[#e8ff47] transition-colors"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
            
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-resume"
              className="ml-3 text-[11px] tracking-[0.22em] uppercase text-white/65 hover:text-[#e8ff47] link-underline"
            >
              Résumé →
            </a>
            
              href={`mailto:${PROFILE.email}`}
              className="ml-3 inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full hover:bg-[#d4eb30] transition-colors"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
