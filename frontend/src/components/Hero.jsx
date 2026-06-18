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

// Skills shown in the running marquee strip. Edit this list to change what scrolls.
const MARQUEE_SKILLS = [
  "Python",
  "AWS",
  "Linux",
  "SAN / NAS",
  "RAID",
  "IAM",
  "S3",
  "EC2",
  "Bash",
  "Git",
  "Docker",
  "PyCharm",
];

/**
 * BubbleBackground
 * Replaces the old DNABackground point-cloud with a dark, organic
 * cluster-of-spheres render reminiscent of a clay/bubble material,
 * lit from the top-left, slowly drifting.
 */
const BubbleBackground = () => {
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

    // Build bubbles wrapped around a twisted, elongated ribbon (torus-knot-like)
    // path so the cluster reads as an organic, overlapping ridge rather than a
    // tight ball — this fills the whole frame edge to edge like a real render.
    const BUBBLES = 420;
    const bubbles = [];
    const STRANDS = 5; // number of ridge "tubes" wrapped around the knot path
    const TURNS = 2.6; // how many times the path twists along its length

    for (let i = 0; i < BUBBLES; i++) {
      const strand = i % STRANDS;
      const along = Math.floor(i / STRANDS) / Math.ceil(BUBBLES / STRANDS); // 0..1 along the path
      const u = along * Math.PI * 2 * TURNS;

      // Base knot path: a stretched figure-eight / helix shape, elongated
      // vertically so it spans top-to-bottom of the viewport like the reference.
      const pathX = Math.sin(u * 1.5) * 0.75;
      const pathY = (along - 0.5) * 2.05; // stretch top to bottom
      const pathZ = Math.cos(u) * 0.6;

      // Wrap a small tube of bubbles (the "strand") around the path,
      // offset by angle per strand for the ridged, overlapping look.
      const strandAngle = (strand / STRANDS) * Math.PI * 2 + along * 3;
      const tubeR = 0.16;
      const offX = Math.cos(strandAngle) * tubeR;
      const offZ = Math.sin(strandAngle) * tubeR;

      bubbles.push({
        x: pathX + offX,
        y: pathY,
        z: pathZ + offZ,
        r: Math.random() * 0.55 + 0.6, // relative bubble size
        jitter: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background stays transparent here; the page's own bg-black shows through.
      t += 0.0016;

      const cx = width * 0.5;
      const cy = height * 0.48;
      const baseRadius = Math.max(width, height) * 0.46;

      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(0.15); // slight fixed tilt, not animated, for a stable silhouette
      const sinB = Math.sin(0.15);

      const projected = bubbles.map((b) => {
        // slow organic breathing per-bubble
        const breathe = 1 + Math.sin(t * 1.4 + b.jitter) * 0.04;

        const x1 = b.x * cosA - b.z * sinA;
        const z1 = b.x * sinA + b.z * cosA;
        const y2 = b.y * cosB - z1 * sinB;
        const z2 = b.y * sinB + z1 * cosB;

        const perspective = 2.6 / (2.6 + z2);
        return {
          sx: cx + x1 * baseRadius * perspective,
          sy: cy + y2 * baseRadius * perspective,
          z: z2,
          r: b.r * (baseRadius * 0.1) * perspective * breathe,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const depth = (p.z + 1.3) / 2.6; // 0 (back) -> 1 (front)

        // Soft ambient glow behind each bubble
        const glow = ctx.createRadialGradient(
          p.sx, p.sy, 0,
          p.sx, p.sy, p.r * 2.2
        );
        glow.addColorStop(0, `rgba(20,20,20,${0.35 * depth})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(p.sx, p.sy, p.r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // The bubble itself: matte dark sphere lit from top-left
        const lightX = p.sx - p.r * 0.45;
        const lightY = p.sy - p.r * 0.55;
        const body = ctx.createRadialGradient(
          lightX, lightY, p.r * 0.05,
          p.sx, p.sy, p.r * 1.15
        );
        const base = 8 + depth * 14; // dark gray -> slightly lighter near front
        body.addColorStop(0, `rgba(${base + 24},${base + 24},${base + 24},${0.9})`);
        body.addColorStop(0.55, `rgba(${base + 6},${base + 6},${base + 6},${0.85})`);
        body.addColorStop(1, `rgba(2,2,2,0.95)`);

        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();

        // subtle rim shadow for separation between overlapping bubbles
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,0,0,${0.4 * depth})`;
        ctx.lineWidth = Math.max(1, p.r * 0.06);
        ctx.arc(p.sx, p.sy, p.r * 0.98, 0, Math.PI * 2);
        ctx.stroke();
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
      style={{ opacity: 0.9 }}
    />
  );
};

/**
 * SkillsMarquee
 * Continuous right-to-left scrolling strip of skill keywords,
 * separated by dots, framed by hairline rules. Pauses on hover.
 */
const SkillsMarquee = () => {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

  return (
    <div
      data-testid="skills-marquee"
      className="relative z-10 w-full border-t border-b border-white/10 py-5 overflow-hidden"
    >
      <div className="marquee-track flex items-center whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {items.map((skill, i) => (
              <React.Fragment key={`${copy}-${skill}-${i}`}>
                <span className="font-serif italic text-white/80 text-[20px] md:text-[26px] px-6">
                  {skill}
                </span>
                <span className="text-white/30 text-[10px]">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 38s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
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

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.75) 75%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 100%)",
        }}
      />

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
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            Open to Work · 2026
          </motion.div>

          <h1
            data-testid="hero-name"
            className="font-sans font-extrabold tracking-[-0.02em] leading-[0.95] text-white text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5.25rem]"
          >
            Learning Cloud
            <br />
            &amp; Security
            <br />
            Since 2026
          </h1>
        </motion.div>

        <div className="flex-1 min-h-[24px] md:min-h-[32px]" />

        <div className="max-w-[560px] space-y-6 md:space-y-7 flex flex-col items-center">
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
            className="flex items-center justify-center gap-5 pt-2"
          >
            {SOCIAL_ICONS.map(({ Icon, url, k }) => (
              <a
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
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-resume"
              className="ml-3 text-[11px] tracking-[0.22em] uppercase text-white/65 hover:text-[#e8ff47] link-underline"
            >
              Résumé →
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="ml-3 inline-flex items-center gap-1.5 bg-[#e8ff47] text-black text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Say hi ↗
            </a>
          </motion.div>
        </div>
      </div>

      <SkillsMarquee />
    </section>
  );
};
