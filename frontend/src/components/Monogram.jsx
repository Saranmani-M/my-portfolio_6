import React from "react";

// Saran handwritten signature — used as the personal logo across the site.
// Source: /brand/signature.png (white-on-dark via CSS invert filter)
export const Monogram = ({ size = 56, className = "", variant = "card" }) => {
  if (variant === "plain") {
    return (
      <img
        src="/brand/signature.png"
        alt="Saran"
        width={size * 1.6}
        height={size}
        className={`block ${className}`}
        style={{
          filter: "invert(1) brightness(1.2) contrast(1.3)",
          objectFit: "contain",
        }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-[#0D0D0D] border border-white/10 ${className}`}
      style={{ width: size, height: size }}
      aria-label="Saran signature"
    >
      <img
        src="/brand/signature.png"
        alt="Saran"
        className="block"
        style={{
          width: "76%",
          height: "auto",
          objectFit: "contain",
          filter: "invert(1) brightness(1.2) contrast(1.3)",
        }}
      />
    </span>
  );
};
