import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../lib/data";

const TICKER_TOP = [
  "Python",
  "AWS",
  "Linux",
  "SAN / NAS",
  "RAID",
  "IAM",
  "S3",
  "EC2",
  "Homomorphic Encryption",
  "Paillier",
  "ElGamal",
  "Networking",
  "Backup & Recovery",
  "PuTTY",
  "Git",
  "Django",
];

const TICKER_BOTTOM = [
  "Cloud Security",
  "Cryptography",
  "OpenCV",
  "Spring Boot",
  "Angular",
  "Web Security",
  "IEEE",
  "ICIRCA 2026",
  "CYBERNIX '25",
  "Vel Tech",
  "Storage Admin",
  "Cloud Engineer",
];

const IMAGE_STRIP = [
  // Server / data center vibe
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=70",
  // Code on screen
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=70",
  // Linux terminal
  "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=70",
  // Network cables / racks
  "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=900&q=70",
  // Encryption / abstract
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=70",
  // Cloud servers
  "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=900&q=70",
];

const Ticker = ({ items, direction = "left", italic = false, accent = false }) => (
  <div className="relative overflow-hidden border-y border-white/10 py-5">
    <div
      className={`flex gap-10 whitespace-nowrap ${
        direction === "right" ? "marquee-track-rev" : "marquee-track"
      }`}
    >
      {[...items, ...items].map((t, i) => (
        <span
          key={`${t}-${i}`}
          className={`font-serif text-3xl md:text-5xl ${
            italic ? "italic" : ""
          } ${accent ? "text-[#e8ff47]/85" : "text-white/75"}`}
        >
          {t}{" "}
          <span className="text-white/15 mx-2">
            {accent ? "✦" : "·"}
          </span>
        </span>
      ))}
    </div>
  </div>
);

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-4">
              (Skills · 05)
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              A quiet, deliberate <em className="italic">toolkit</em>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="max-w-sm text-sm leading-relaxed text-white/55"
          >
            Tools I&rsquo;ve lived inside long enough to trust. No grand stack
            chart, no progress bars — just the things I keep reaching for.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-12 md:gap-x-12">
          {SKILL_GROUPS.map((g, idx) => (
            <motion.div
              key={g.title}
              data-testid={`skill-group-${g.index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative pt-6 border-t border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[11px] text-white/40 tracking-widest">
                  {g.index}
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-white/30">
                  Category
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-5 transition-transform group-hover:-translate-y-0.5">
                {g.title}
              </h3>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] text-white/65 tracking-wide flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Running tickers */}
        <div className="mt-12 md:mt-16 space-y-3">
          <Ticker items={TICKER_TOP} direction="left" italic />
          <Ticker items={TICKER_BOTTOM} direction="right" accent />
        </div>

        {/* Image strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12"
          data-testid="skills-image-strip"
        >
          <div className="text-[10px] tracking-[0.28em] uppercase text-white/40 mb-4">
            (Field · Imagery)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {IMAGE_STRIP.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#0D0D0D]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.35] contrast-[1.05] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
