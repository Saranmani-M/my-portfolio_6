import React from "react";

// Bold monogram — stylized "M" with diagonal cut (bookmark feel)
export const Monogram = ({ size = 56, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    aria-label="Saranmani M"
  >
    <rect width="100" height="100" rx="22" fill="#0D0D0D" />
    <rect
      x="0.5"
      y="0.5"
      width="99"
      height="99"
      rx="21.5"
      stroke="rgba(255,255,255,0.10)"
    />
    {/* Stylized M with diagonal split */}
    <path
      d="M 22 78 L 22 22 L 38 22 L 50 50 L 50 78 Z"
      fill="#FFFFFF"
    />
    <path
      d="M 50 50 L 62 22 L 78 22 L 78 78 L 50 78 Z"
      fill="#FFFFFF"
      fillOpacity="0.35"
    />
    {/* Diagonal accent line */}
    <path
      d="M 78 22 L 22 78"
      stroke="#0D0D0D"
      strokeWidth="3"
    />
  </svg>
);
