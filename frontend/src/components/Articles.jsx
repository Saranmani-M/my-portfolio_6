import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "../lib/data";

export const Articles = () => {
  return (
    <section
      id="articles"
      data-testid="articles-section"
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
              (Field Notes)
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white text-balance leading-[1]">
              Featured <em className="italic">articles</em>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.12 }}
            className="max-w-sm text-sm leading-relaxed text-white/55"
          >
            Short writing on cloud, security and the small Python rituals that
            hold an infra together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ARTICLES.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`article-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl border border-white/10 bg-[#0D0D0D]/70 backdrop-blur-sm overflow-hidden hover:border-[#e8ff47]/30 transition-colors"
            >
              {/* Cover */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={a.cover}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-sm border border-white/10 text-[10px] tracking-[0.2em] uppercase text-white/75">
                  {a.category}
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#050505]/80 backdrop-blur-sm border border-white/10 grid place-items-center text-white/80 group-hover:rotate-45 group-hover:text-[#e8ff47] transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-7">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-[1.15] text-balance">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                  {a.excerpt}
                </p>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-white/45">
                  <span>{a.read}</span>
                  <span className="font-mono">{a.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
