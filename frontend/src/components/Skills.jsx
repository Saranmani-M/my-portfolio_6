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

const HEADLINE_TICKER = [
  "Cloud Engineer",
  "Storage Administrator",
  "Cybersecurity",
  "Python Developer",
  "IEEE Researcher",
];

const TECH = [
  { name: "Python", icon: "python/python-original.svg" },
  { name: "Linux", icon: "linux/linux-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Ubuntu", icon: "ubuntu/ubuntu-plain.svg" },
  { name: "Django", icon: "django/django-plain.svg" },
  { name: "OpenCV", icon: "opencv/opencv-original.svg" },
  { name: "Git", icon: "git/git-original.svg" },
  { name: "GitHub", icon: "github/github-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
  { name: "Spring", icon: "spring/spring-original.svg" },
  { name: "Angular", icon: "angularjs/angularjs-original.svg" },
  { name: "VS Code", icon: "vscode/vscode-original.svg" },
  { name: "PyCharm", icon: "pycharm/pycharm-original.svg" },
  { name: "NumPy", icon: "numpy/numpy-original.svg" },
  { name: "Bash", icon: "bash/bash-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "Pandas", icon: "pandas/pandas-original.svg" },
  { name: "FastAPI", icon: "fastapi/fastapi-original.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "Kubernetes", icon: "kubernetes/kubernetes-plain.svg" },
  { name: "Nginx", icon: "nginx/nginx-original.svg" },
  { name: "Postgres", icon: "postgresql/postgresql-original.svg" },
  { name: "Redis", icon: "redis/redis-original.svg" },
  { name: "Bitbucket", icon: "bitbucket/bitbucket-original.svg" },
];

const Ticker = ({ items, direction = "left", italic = false, accent = false, size = "lg" }) => (
  <div className="relative overflow-hidden border-y border-white/10 py-4 md:py-5">
    <div
      className={`flex gap-10 whitespace-nowrap ${
        direction === "right" ? "marquee-track-rev" : "marquee-track"
      }`}
    >
      {[...items, ...items].map((t, i) => (
        <span
          key={`${t}-${i}`}
          className={`font-serif ${
            size === "xl"
              ? "text-4xl md:text-6xl"
              : "text-2xl md:text-5xl"
          } ${italic ? "italic" : ""} ${
            accent ? "text-[#e8ff47]/85" : "text-white/75"
          }`}
        >
          {t}{" "}
          <span className="text-white/15 mx-2">{accent ? "✦" : "·"}</span>
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
      className="relative py-10 md:py-16 px-6 md:px-12"
    >
      {/* Headline running ticker (above section) */}
      <div className="-mx-6 md:-mx-12 mb-12 md:mb-16">
        <Ticker items={HEADLINE_TICKER} italic size="xl" accent />
      </div>

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

        {/* Tech logos — running line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-16 -mx-6 md:-mx-12"
          data-testid="tech-grid"
        >
          <div className="relative overflow-hidden border-y border-white/10 py-6 md:py-8">
            <div className="marquee-track flex items-center gap-12 md:gap-16 whitespace-nowrap">
              {[...TECH, ...TECH].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="group flex items-center gap-3 shrink-0"
                  title={t.name}
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}`}
                    alt={t.name}
                    loading="lazy"
                    className="w-8 h-8 md:w-9 md:h-9 opacity-65 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ filter: "grayscale(0.6) brightness(1.6)" }}
                  />
                  <span className="font-sans text-sm md:text-base text-white/55 group-hover:text-white transition-colors">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

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
      </div>
    </section>
  );
};
