import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../lib/data";

/* Flatten every item across your skill groups into one tag list,
   de-duplicated, in the order the groups appear. */
const SKILL_TAGS = Array.from(
  new Set(SKILL_GROUPS.flatMap((g) => g.items))
);

const TOOLKIT = [
  { name: "Python",  icon: "python/python-original.svg",                          sub: "Scripting & automation" },
  { name: "Linux",   icon: "linux/linux-original.svg",                            sub: "Systems administration" },
  { name: "AWS",     icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg", sub: "Cloud infrastructure" },
  { name: "Ubuntu",  icon: "ubuntu/ubuntu-plain.svg",                              sub: "Server environments" },
  { name: "Django",  icon: "django/django-plain.svg",                             sub: "Backend framework" },
  { name: "OpenCV",  icon: "opencv/opencv-original.svg",                          sub: "Computer vision" },
  { name: "Git",     icon: "git/git-original.svg",                                sub: "Version control" },
  { name: "GitHub",  icon: "github/github-original.svg",                          sub: "Source hosting" },
  { name: "Java",    icon: "java/java-original.svg",                              sub: "Spring Boot" },
  { name: "Spring",  icon: "spring/spring-original.svg",                          sub: "Application framework" },
  { name: "Angular", icon: "angularjs/angularjs-original.svg",                     sub: "Frontend framework" },
  { name: "VS Code", icon: "vscode/vscode-original.svg",                          sub: "Code editor" },
  { name: "PyCharm", icon: "pycharm/pycharm-original.svg",                        sub: "Python IDE" },
  { name: "Docker",  icon: "docker/docker-original.svg",                          sub: "Containerization" },
  { name: "Kubernetes", icon: "kubernetes/kubernetes-plain.svg",                  sub: "Orchestration" },
  { name: "Nginx",   icon: "nginx/nginx-original.svg",                            sub: "Web server" },
  { name: "Postgres", icon: "postgresql/postgresql-original.svg",                 sub: "Relational database" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg",                        sub: "NoSQL database" },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-16 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* ── Skills tag cloud ── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-20 md:mb-28"
          data-testid="skill-tag-cloud"
        >
          {SKILL_TAGS.map((tag, i) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-md border border-white/15 bg-white/[0.02] text-[13px] text-white/80 hover:border-white/30 hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* ── Toolkit grid ── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          Toolkit
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
          {TOOLKIT.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-white/12 bg-[#0c0c0c] p-5 flex flex-col gap-3"
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}`}
                alt={t.name}
                loading="lazy"
                className="w-7 h-7"
                style={{ filter: "grayscale(0.15) brightness(1.1)" }}
              />
              <div>
                <p className="text-white font-semibold text-[15px] leading-tight">{t.name}</p>
                <p className="text-white/45 text-[13px] leading-tight mt-0.5">{t.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
