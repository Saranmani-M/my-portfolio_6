import React from "react";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { SOCIALS, PROFILE } from "../lib/data";

const socials = [
  { name: "LinkedIn", url: SOCIALS.linkedin, Icon: Linkedin },
  { name: "GitHub", url: SOCIALS.github, Icon: Github },
  { name: "Instagram", url: SOCIALS.instagram, Icon: Instagram },
  { name: "X", url: SOCIALS.twitter, Icon: Twitter },
];

export const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="relative px-6 md:px-12 pt-20 pb-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-10 md:gap-16 mb-16">
          <div className="col-span-12 md:col-span-6">
            <h3 className="font-serif text-5xl md:text-7xl font-light text-white leading-[0.95] text-balance">
              Quiet systems.
              <br />
              <em className="italic text-white/70">Loud impact.</em>
            </h3>
            <p className="mt-6 max-w-md text-[15px] text-white/55">
              {PROFILE.headline}
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] tracking-[0.28em] uppercase text-white/40 mb-4">
              Elsewhere
            </div>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`social-${s.name.toLowerCase()}`}
                    className="group inline-flex items-center gap-3 text-white/75 hover:text-white"
                  >
                    <s.Icon size={14} className="opacity-80" />
                    <span className="link-underline text-[14px]">{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] tracking-[0.28em] uppercase text-white/40 mb-4">
              Reach
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="block text-white/80 hover:text-white text-[14px] link-underline w-fit"
              data-testid="footer-email"
            >
              {PROFILE.email}
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-linkedin-badge"
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8ff47]/30 bg-[#e8ff47]/[0.04] text-[#e8ff47] text-[11px] tracking-[0.18em] uppercase hover:bg-[#e8ff47]/[0.08] transition-colors"
            >
              <Linkedin size={12} /> LinkedIn
            </a>
            <p className="mt-3 text-white/45 text-[13px]">{PROFILE.location}</p>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex items-center justify-between flex-wrap gap-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
          <span>© {new Date().getFullYear()} Saranmani M. All rights reserved.</span>
          <span className="font-mono">Designed &amp; built with care</span>
        </div>
      </div>
    </footer>
  );
};
