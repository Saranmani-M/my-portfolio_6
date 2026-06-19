import React from "react";
import { motion } from "framer-motion";

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
      className="relative py-8 md:py-12 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Tool icons — running line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="-mx-6 md:-mx-12"
          data-testid="toolkit-icons"
        >
          <div className="relative overflow-hidden border-y border-white/10 py-8 md:py-10">
            <div className="marquee-track flex items-center gap-14 md:gap-20 whitespace-nowrap">
              {[...TOOLS, ...TOOLS, ...TOOLS].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="group flex items-center gap-4 shrink-0"
                  title={t.name}
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}`}
                    alt={t.name}
                    loading="lazy"
                    className="w-10 h-10 md:w-12 md:h-12 opacity-65 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ filter: "grayscale(0.85) brightness(1.6)" }}
                  />
                  <span className="font-sans text-base md:text-lg text-white/55 group-hover:text-white transition-colors">
                    {t.name}
                  </span>
                  <span className="text-white/15 ml-2">·</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
