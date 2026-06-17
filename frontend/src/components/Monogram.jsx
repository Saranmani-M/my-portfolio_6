import React from "react";

// Handwritten "Saran" signature — used as the personal logo across the site.
// Asset is white-on-transparent PNG at /brand/signature.png — no CSS filter needed.
export const Monogram = ({ size = 56, className = "", variant = "card" }) => {
  if (variant === "plain") {
    return (
      <img
        src="/brand/signature.png"
        alt="Saran"
        className={`block ${className}`}
        style={{
          height: size,
          width: "auto",
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
        }}
      />
    </span>
  );
};
