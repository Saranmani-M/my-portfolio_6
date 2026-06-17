import React from "react";

// Bookmark-style "M" monogram — used as default state of the brand card.
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
    <path d="M 24 76 L 24 22 L 40 22 L 50 48 L 50 76 Z" fill="#FFFFFF" />
    <path
      d="M 50 48 L 60 22 L 76 22 L 76 76 L 50 76 Z"
      fill="#FFFFFF"
      fillOpacity="0.35"
    />
    <path d="M 76 22 L 24 76" stroke="#0D0D0D" strokeWidth="3" />
  </svg>
);
