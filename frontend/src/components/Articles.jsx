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
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-6">
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
            Short writing on cloud, security and the small Python rituals
            that hold an infra together.
          </motion.p>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {ARTICLES.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`article-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 gap-6 py-10 md:py-14 items-start hover:bg-white/[0.015] transition-colors px-2 -mx-2"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-[11px] text-white/35 pt-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-7">
                <h3 className="font-serif text-3xl md:text-5xl font-light text-white leading-[1.05] text-balance">
                  {a.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55 max-w-xl">
                  {a.excerpt}
                </p>
              </div>
              <div className="col-span-6 md:col-span-2 pt-2 text-[11px] tracking-[0.2em] uppercase text-white/45">
                {a.category}
              </div>
              <div className="col-span-6 md:col-span-2 pt-2 flex items-center justify-end gap-3 text-[11px] tracking-[0.2em] uppercase text-white/50">
                <span>{a.read}</span>
                <span className="w-9 h-9 rounded-full border border-white/15 grid place-items-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
