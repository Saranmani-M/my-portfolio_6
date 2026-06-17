import React from "react";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { SOCIALS, PROFILE } from "../lib/data";
import { Monogram } from "./Monogram";

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
      className="relative px-6 md:px-12 pt-24 md:pt-32 pb-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: signature only — no name */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <Monogram size={130} variant="plain" className="h-[110px] md:h-[140px]" />
          <div className="mt-8 flex items-center gap-6 text-white/55">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`footer-social-${s.name.toLowerCase()}`}
                aria-label={s.name}
                className="hover:text-[#e8ff47] transition-colors"
              >
                <s.Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Center tagline — single font family */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h4 className="font-sans font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em]">
            From plaintext <br className="hidden md:block" />
            to ciphertext, <br className="hidden md:block" />
            let&rsquo;s make it{" "}
            <span className="text-[#e8ff47]">secure</span>.
          </h4>
          <p className="mt-10 text-[14px] md:text-[15px] text-white/55 leading-relaxed">
            Curious about cloud, storage or cryptography? <br />
            Let&rsquo;s connect and talk about what really matters.
          </p>
        </div>

        <div className="hairline mb-8" />

        <div className="flex items-center justify-between flex-wrap gap-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
          <span className="font-mono">{PROFILE.location}</span>
        </div>
      </div>
    </footer>
  );
};
