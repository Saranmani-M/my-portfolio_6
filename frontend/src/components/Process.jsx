import React from "react";
import { motion } from "framer-motion";

// Circular pie/meter icon — 1 wedge highlighted
const PieIcon = ({ angle = 60 }) => {
  const radius = 56;
  const cx = 60;
  const cy = 60;
  const start = -90; // start at top
  const end = start + angle;
  const toXY = (deg) => {
    const r = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(r), cy + radius * Math.sin(r)];
  };
  const [x1, y1] = toXY(start);
  const [x2, y2] = toXY(end);
  const large = angle > 180 ? 1 : 0;
  const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;

  return (
    <svg viewBox="0 0 120 120" className="w-16 h-16 md:w-20 md:h-20">
      <defs>
        <linearGradient id={`pie-${angle}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`pie-bg-${angle}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={radius} fill={`url(#pie-bg-${angle})`} />
      <path d={path} fill={`url(#pie-${angle})`} />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
    </svg>
  );
};

const STEPS = [
  {
    title: "Understanding the Problem",
    body:
      "I break down the system, not just the spec — aligning user trust, threat models and constraints to set a clear direction before any code is written.",
    angle: 60,
  },
  {
    title: "Research & Architecture",
    body:
      "I read the papers, the man-pages and the IAM docs — surfacing patterns that influence real decisions, not just validate easy ones.",
    angle: 130,
  },
  {
    title: "Build & Iterate",
    body:
      "I write small, deliberate Python, ship to a Linux box, and refine on feedback — keeping clarity, reliability and measurable impact in view.",
    angle: 220,
  },
  {
    title: "Test, Harden & Document",
    body:
      "I work closely with the people who'll run the thing — hardening, monitoring and writing down the why, so the system survives me.",
    angle: 310,
  },
];

const TOOLS = [
  { name: "Python", icon: "python/python-original.svg" },
  { name: "Linux", icon: "linux/linux-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Bash", icon: "bash/bash-original.svg" },
  { name: "Git", icon: "git/git-original.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "OpenCV", icon: "opencv/opencv-original.svg" },
  { name: "VS Code", icon: "vscode/vscode-original.svg" },
  { name: "PyCharm", icon: "pycharm/pycharm-original.svg" },
  { name: "PuTTY", icon: "putty/putty-original.svg" },
  { name: "NumPy", icon: "numpy/numpy-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
];

export const Process = () => {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-3xl md:text-5xl lg:text-6xl mb-12 md:mb-16 max-w-4xl"
        >
          Process? Yeah… I Have One.
          <br />
          <span className="text-white/60">And technical toolkit</span>
        </motion.h2>

        {/* Process cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              data-testid={`process-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl border border-white/10 bg-[#0D0D0D]/70 backdrop-blur-sm p-7 md:p-10 min-h-[320px] md:min-h-[420px] flex flex-col justify-between overflow-hidden hover:border-white/20 transition-colors"
            >
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(closest-side,#e8ff47,transparent)",
                }}
              />
              <div className="relative">
                <PieIcon angle={s.angle} />
              </div>
              <div className="relative">
                <h3 className="font-sans font-semibold text-white text-xl md:text-2xl mb-4 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/55">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool icons grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-14 md:mt-20"
          data-testid="toolkit-icons"
        >
          <div className="grid grid-cols-6 gap-x-4 md:gap-x-12 gap-y-8 md:gap-y-10">
            {TOOLS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                className="group flex flex-col items-center justify-center"
                title={t.name}
              >
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}`}
                  alt={t.name}
                  loading="lazy"
                  className="w-10 h-10 md:w-12 md:h-12 opacity-65 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  style={{ filter: "grayscale(0.85) brightness(1.6)" }}
                />
                <span className="mt-2 text-[10px] tracking-[0.18em] uppercase text-white/0 group-hover:text-white/55 transition-colors">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
