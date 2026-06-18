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

/**
 * Inline brand-mark SVGs for the skills marquee.
 * Self-contained (no react-icons / external package required) so the
 * build never depends on a dependency that might be missing — each is a
 * minimal single-path glyph, sized via a `size` prop like a normal icon
 * component: <SiPython size={20} />
 */
const svgIcon = (viewBox, path) => ({ size = 20, className = "" }) => (
  <svg
    viewBox={viewBox}
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const SiPython = svgIcon(
  "0 0 24 24",
  "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"
);

const SiAmazonaws = svgIcon(
  "0 0 24 24",
  "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.24-.112a2.475 2.475 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.029-.375-1.277-.255-.248-.686-.367-1.3-.367-.279 0-.566.031-.862.103a6.366 6.366 0 00-.862.272 2.295 2.295 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.611.611 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.272.758-.51.128-.151.224-.32.272-.510.048-.19.08-.422.08-.694v-.335a6.66 6.66 0 00-.735-.136 5.98 5.98 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.151 0 .256.025.32.08.063.048.119.16.151.312l1.261 5.348 1.381-5.348c.048-.16.103-.264.16-.312a.52.52 0 01.31-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.103.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.064.056-.176.08-.32.08zm10.255.215a5.255 5.255 0 01-1.222-.144c-.391-.096-.694-.2-.894-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.27.119.566.215.878.279.32.064.63.096.95.096.502 0 .894-.088 1.165-.264.272-.176.415-.43.415-.758a.685.685 0 00-.191-.495c-.128-.135-.367-.255-.71-.367l-1.022-.32c-.51-.16-.886-.398-1.117-.71a1.665 1.665 0 01-.351-1.022c0-.295.064-.558.191-.79.128-.23.296-.43.51-.59.215-.16.463-.279.75-.36.288-.08.59-.111.91-.111.16 0 .32.008.48.024.16.024.31.048.46.072.144.024.279.056.407.088.127.04.231.08.31.119.128.064.224.135.288.215a.464.464 0 01.087.288v.375c0 .168-.064.255-.183.255-.064 0-.168-.032-.304-.096-.46-.215-.974-.32-1.541-.32-.455 0-.815.072-1.063.215-.247.144-.375.367-.375.671 0 .2.072.375.215.51.143.136.407.272.79.392l1.005.318c.502.16.862.382 1.077.671.215.288.319.622.319.99 0 .302-.064.583-.183.823-.128.247-.296.454-.51.622-.216.176-.471.295-.766.383a3.41 3.41 0 01-.99.144zM18.717 16.516c-2.273 1.685-5.578 2.578-8.418 2.578-3.98 0-7.564-1.477-10.27-3.93-.215-.192-.024-.456.232-.304 2.92 1.7 6.534 2.73 10.27 2.73 2.52 0 5.286-.527 7.832-1.612.383-.176.71.247.354.538zM19.95 15.111c-.288-.376-1.93-.176-2.665-.088-.224.024-.256-.168-.056-.32 1.31-.918 3.46-.654 3.708-.343.247.32-.064 2.473-1.294 3.502-.192.16-.375.072-.288-.144.28-.694.902-2.252.595-2.607z"
);

const SiLinux = svgIcon(
  "0 0 24 24",
  "M12.504 0c-.155 0-.315.008-.480.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.005 3.02-.823 1.037-1.964 2.7-2.5 4.404-.247.804-.366 1.628-.282 2.453-.012.044-.012.087-.027.131-.193 1.087-.927 1.852-1.49 2.708-.563.856-1.06 1.86-.86 2.965.16.873.7 1.503 1.6 1.85.9.345 2.226.27 3.74-.43.34.16.7.27 1.04.31 1.4.16 2.7-.42 3.5-1.6.51.07 1.03.07 1.54.03.51-.04.99-.16 1.42-.36 1.5.7 2.84.78 3.74.43.9-.35 1.44-.98 1.6-1.85.2-1.1-.3-2.1-.86-2.96-.56-.86-1.3-1.62-1.49-2.71-.02-.04-.02-.09-.03-.13.08-.83-.04-1.65-.28-2.46-.54-1.7-1.68-3.37-2.5-4.4-.7-1.07-.93-1.93-1-3.02-.07-1.49 1.05-5.96-3.17-6.3-.166-.013-.327-.02-.482-.02zm.084 1.51c.34 0 .67.05.97.16.78.27 1.27.93 1.45 1.99.18 1.07.07 2.27-.32 3.32-.39 1.06-1.05 1.97-1.86 2.51-.81.54-1.78.65-2.65.21-.87-.44-1.5-1.43-1.62-2.62-.12-1.19.27-2.5.99-3.41.72-.91 1.79-1.43 2.94-1.16h.1zm-2.7 9.93c.5.27 1.06.41 1.64.41.58 0 1.14-.14 1.64-.41.45-.25.85-.6 1.18-1.02.36 1.27.99 2.43 1.7 3.55.71 1.12 1.5 2.21 1.74 3.43.13.7.07 1.42-.27 2.05-.34.63-.93 1.06-1.66 1.18-.41.07-.84.04-1.27-.07-.43-.11-.84-.3-1.2-.55-.18-.13-.37-.13-.55-.02-.18.11-.27.31-.24.51.06.4.02.78-.11 1.13-.13.35-.34.65-.61.87-.27.22-.6.36-.95.4-.35.04-.71-.03-1.04-.2-.33-.17-.61-.43-.81-.75-.2-.32-.31-.69-.31-1.07 0-.2-.1-.39-.27-.49-.17-.1-.38-.1-.55.01-.36.24-.77.42-1.2.52-.43.1-.88.12-1.31.04-.69-.13-1.27-.56-1.6-1.19-.32-.63-.37-1.36-.23-2.06.27-1.21 1.05-2.29 1.76-3.41.71-1.12 1.34-2.27 1.7-3.54.33.42.73.77 1.18 1.02z"
);

const SiNetapp = svgIcon(
  "0 0 24 24",
  "M2 4h2.5v9.5L17 4h5v16h-2.5V10.5L7 20.5H2V4zm17 13h2V7h-2v10z"
);

const SiIam = svgIcon(
  "0 0 24 24",
  "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.52-3.05 8.74-7 9.93-3.95-1.19-7-5.41-7-9.93v-4.7l7-3.12zM11 7v6h2V7h-2zm0 8v2h2v-2h-2z"
);

const SiAmazons3 = svgIcon(
  "0 0 24 24",
  "M12 2L4 5.5v6.6c0 4.6 3.4 8.9 8 9.9 4.6-1 8-5.3 8-9.9V5.5L12 2zm0 2.2l6 2.66v5.24c0 3.6-2.6 6.97-6 7.86-3.4-.89-6-4.26-6-7.86V6.86l6-2.66zM9.2 8.4v1.5h1.9v5.7h1.8V9.9h1.9V8.4H9.2z"
);

const SiAmazonec2 = svgIcon(
  "0 0 24 24",
  "M4 4h16v4h-2V6H6v2H4V4zm0 6h2v4H4v-4zm16 0h2v4h-2v-4zM4 16h2v2h12v-2h2v4H4v-4zM9 9h6v6H9V9zm2 2v2h2v-2h-2z"
);

const SiGnubash = svgIcon(
  "0 0 24 24",
  "M2 4h20v2H2V4zm2 4h2v2H4V8zm4 0h12v2H8V8zm-4 4h2v2H4v-2zm4 0h8v2H8v-2zm-4 4h2v2H4v-2zm4 0h12v2H8v-2z"
);

const SiGit = svgIcon(
  "0 0 24 24",
  "M21.62 11.108l-8.73-8.73a1.49 1.49 0 00-2.12 0l-1.78 1.78 2.26 2.26a1.78 1.78 0 012.25 2.27l2.17 2.17a1.78 1.78 0 11-1.06 1.06 1.79 1.79 0 01-.39-1.94l-2.03-2.02v5.32a1.78 1.78 0 11-1.47-.05V8.05a1.78 1.78 0 01-.96-2.34L7.4 3.4l-5.02 5.02a1.49 1.49 0 000 2.12l8.73 8.73a1.49 1.49 0 002.12 0l8.39-8.39a1.49 1.49 0 000-2.12z"
);

const SiDocker = svgIcon(
  "0 0 24 24",
  "M4.5 10.5h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9-3h2v2h-2v-3zm3 0h2v2h-2v-3zm3 0h2v2h-2v-3zm3 0h2v2h-2v-3zm3 3h2v2h-2v-2zm3.7.7c-.3-.2-1-.4-1.7-.3-.1-.6-.5-1.1-1-1.5l-.3-.2-.2.3c-.4.5-.5 1.3-.4 1.9.1.3.2.6.4.8-.2.1-.5.2-.7.2H1.7c-.2.7-.2 3.5.9 5.4 1 1.8 2.6 2.7 4.6 2.7 4.4 0 7.7-2 9.2-5.7.6 0 1.9 0 2.6-1.3.2-.3.2-.6.1-.8l-.2-.5z"
);

const SiPycharm = svgIcon(
  "0 0 24 24",
  "M4 2h16v9.5l-8 6.3-8-6.3V2zm2 2v6.4l6 4.7 6-4.7V4H6zm0 12h12v6H6v-6zm2 1.5v3h2v-3H8zm3 0v3h2v-3h-2zm3 0v3h2v-3h-2z"
);

// Skills shown in the running marquee strip, as logos instead of text.
// Edit this list to change what scrolls. Some entries (SAN/NAS, RAID, IAM,
// S3, EC2) don't have a universally standardized brand mark, so they use a
// representative glyph — swap in your own SVGs above if you'd rather use
// exact official logos for those.
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
