import React, { useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Blobs = () => (
  <>
    <div
      className="ambient-blob"
      style={{
        top: "-10%",
        left: "-10%",
        width: 520,
        height: 520,
        background:
          "radial-gradient(closest-side, rgba(96,165,250,0.45), rgba(96,165,250,0) 70%)",
      }}
    />
    <div
      className="ambient-blob"
      style={{
        top: "30%",
        right: "-12%",
        width: 600,
        height: 600,
        background:
          "radial-gradient(closest-side, rgba(167,139,250,0.42), rgba(167,139,250,0) 70%)",
      }}
    />
    <div
      className="ambient-blob"
      style={{
        bottom: "-20%",
        left: "20%",
        width: 700,
        height: 700,
        background:
          "radial-gradient(closest-side, rgba(96,165,250,0.18), rgba(96,165,250,0) 70%)",
        opacity: 0.5,
      }}
    />
  </>
);

const Vignette = () => (
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

export const AmbientBackground = () => {
  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 38, density: { enable: true, area: 1000 } },
        color: { value: ["#A78BFA", "#60A5FA", "#FFFFFF"] },
        opacity: {
          value: { min: 0.05, max: 0.35 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size: { value: { min: 0.4, max: 1.4 } },
        move: {
          enable: true,
          speed: 0.18,
          direction: "none",
          outModes: { default: "out" },
          random: true,
          straight: false,
        },
        shape: { type: "circle" },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "bubble" } },
        modes: {
          bubble: { distance: 140, size: 2, duration: 1, opacity: 0.6 },
        },
      },
    }),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      data-testid="ambient-bg"
    >
      <Blobs />
      <ParticlesProvider init={loadSlim}>
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0"
        />
      </ParticlesProvider>
      <Vignette />
    </div>
  );
};
