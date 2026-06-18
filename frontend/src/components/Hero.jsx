import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import {
  SiPython,
  SiAmazonaws,
  SiLinux,
  SiNetapp,
  SiIam,
  SiAmazons3,
  SiAmazonec2,
  SiGnubash,
  SiGit,
  SiDocker,
  SiPycharm,
} from "react-icons/si";
import { PROFILE, SOCIALS } from "../lib/data";

const easeOut = [0.16, 1, 0.3, 1];

const SOCIAL_ICONS = [
  { Icon: Linkedin, url: SOCIALS.linkedin, k: "linkedin" },
  { Icon: Github, url: SOCIALS.github, k: "github" },
  { Icon: Instagram, url: SOCIALS.instagram, k: "instagram" },
  { Icon: Twitter, url: SOCIALS.twitter, k: "x" },
];

// Skills shown in the running marquee strip, as logos instead of text.
// Edit this list to change what scrolls. Some entries (SAN/NAS, RAID, IAM,
// S3, EC2) don't have a dedicated brand mark in react-icons/si, so they
// fall back to the closest related/representative icon — swap in your own
// SVGs in /lib or /assets if you'd rather use exact logos for those.
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

// Fixed virtual canvas resolution. All bubble geometry is computed in this
// constant coordinate space, then the canvas element itself is stretched
// with CSS to fill its container. This is the key fix for the "shifts on
// zoom/resize" bug: browser zoom changes window.innerWidth/innerHeight,
// and the old version recalculated bubble positions/sizes from those live
// numbers, so the whole cluster visibly reflowed. Now the bubble layout is
// computed exactly once against fixed numbers and never touches viewport
// size again — only the CSS box stretches, like scaling a photograph.
const VIRTUAL_W = 1600;
const VIRTUAL_H = 1000;

/**
 * BubbleBackground
 * Replaces the old DNABackground point-cloud with a dark, organic
 * cluster-of-spheres render reminiscent of a clay/bubble material,
 * lit from the top-left, slowly drifting.
 *
 * NOTE: bubble geometry is computed once against a fixed virtual canvas
 * size (VIRTUAL_W x VIRTUAL_H), not the live viewport. The canvas element
 * is then scaled with CSS to fill its container. Result: the cluster's
 * position/scale/density never changes with browser zoom or window
 * resize — only animation (drift/breathing) moves it, exactly as before.
 */
const BubbleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    // Render buffer is fixed-resolution and never resized after this.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = VIRTUAL_W;
    const height = VIRTUAL_H;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // CSS stretches this fixed buffer to fill the section. No JS resize
    // listener at all — there is nothing to recompute on zoom/resize.

    // Build bubbles wrapped around a twisted, elongated ribbon (torus-knot-like)
    // path so the cluster reads as an organic, overlapping ridge rather than a
    // tight ball — this fills the whole frame edge to edge like a real render.
    const BUBBLES = 620; // more bubbles than before -> denser, always-joined look
    const bubbles = [];
    const STRANDS = 7; // more ridge "tubes" wrapped around the knot path
    const TURNS = 3.2; // how many times the path twists along its length

    for (let i = 0; i < BUBBLES; i++) {
      const strand = i % STRANDS;
      const along = Math.floor(i / STRANDS) / Math.ceil(BUBBLES / STRANDS); // 0..1 along the path
      const u = along * Math.PI * 2 * TURNS;

      // Base knot path: a stretched figure-eight / helix shape, elongated
      // vertically so it spans top-to-bottom of the viewport like the reference.
      const pathX = Math.sin(u * 1.5) * 0.8;
      const pathY = (along - 0.5) * 2.6; // stretch further top to bottom -> fills full viewport height
      const pathZ = Math.cos(u) * 0.65;

      // Wrap a small tube of bubbles (the "strand") around the path,
      // offset by angle per strand for the ridged, overlapping look.
      const strandAngle = (strand / STRANDS) * Math.PI * 2 + along * 3;
      const tubeR = 0.22; // wider tube -> strands overlap each other, no visible gaps
      const offX = Math.cos(strandAngle) * tubeR;
      const offZ = Math.sin(strandAngle) * tubeR;

      bubbles.push({
        x: pathX + offX,
        y: pathY,
        z: pathZ + offZ,
        r: Math.random() * 0.55 + 0.85, // bigger relative bubble size -> guarantees overlap
        jitter: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background stays transparent here; the page's own bg-black shows through.
      t += 0.0016;

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Tie baseRadius to the fixed virtual canvas size (never the live
      // viewport), so cluster scale is constant regardless of zoom/resize.
      const baseRadius = Math.max(width, height) * 0.5;

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
          // Bubble pixel radius scales with baseRadius (viewport-relative),
          // so on small or large screens (and at any zoom %) the bubbles
          // stay proportionally large enough to overlap their neighbors.
          r: b.r * (baseRadius * 0.115) * perspective * breathe,
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.9, width: "100%", height: "100%" }}
    />
  );
};

/**
 * SkillsMarquee
 * Continuous right-to-left scrolling strip of skill logos,
 * separated by dots, framed by hairline rules. Pauses on hover.
 * Contained to the same max-width as the rest of the hero content
 * (instead of bleeding edge-to-edge) so it reads as a centered row,
 * matching the rest of the page's content column.
 */
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
                    <Icon size={20} aria-hidden="true" />
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
