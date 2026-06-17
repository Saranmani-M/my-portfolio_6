import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Toaster } from "sonner";
import { PROFILE, SOCIALS } from "../lib/data";

const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
  "Hi Saranmani — let's talk",
)}&body=${encodeURIComponent("Hi Saranmani,\n\n")}`;

const LINKS = [
  {
    k: "email",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    Icon: Mail,
    testId: "contact-email",
  },
  {
    k: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/saranmani-m",
    href: SOCIALS.linkedin,
    Icon: Linkedin,
    testId: "contact-linkedin",
    external: true,
  },
  {
    k: "github",
    label: "GitHub",
    value: "github.com/Saranmani-M",
    href: SOCIALS.github,
    Icon: Github,
    testId: "contact-github",
    external: true,
  },
  {
    k: "instagram",
    label: "Instagram",
    value: "@m.sxrxn",
    href: SOCIALS.instagram,
    Icon: Instagram,
    testId: "contact-instagram",
    external: true,
  },
];

export const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-14 md:py-20 px-6 md:px-12"
    >
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0D0D0D",
            border: "1px solid rgba(232,255,71,0.18)",
            color: "white",
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-8"
        >
          (Get in touch)
        </motion.div>

        {/* Editorial headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light text-white leading-[0.95] text-balance"
        >
          <span className="block text-5xl md:text-7xl lg:text-[7.5rem]">
            Just say
          </span>
          <span className="block text-[5.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] italic text-[#e8ff47] leading-none">
            hi.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-white/70"
        >
          No forms. No filters. Just send a quick &ldquo;hi&rdquo; — or pick
          your favourite channel below. I read every message.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={mailtoHref}
            data-testid="say-hi-btn"
            className="group inline-flex items-center gap-3 rounded-full bg-[#e8ff47] text-black px-8 py-4 text-[14px] tracking-wide hover:bg-[#f1ff7a] transition-all"
          >
            Say hi over email
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="say-hi-linkedin"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-[13px] tracking-wide text-white hover:border-white/40 transition-all"
          >
            Or DM on LinkedIn <Linkedin size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
