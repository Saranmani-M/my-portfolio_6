import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const SoftSphere = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.18) * 0.18;
    ref.current.rotation.y = t * 0.04;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#0D0D0D" wireframe transparent opacity={0.08} />
    </mesh>
  );
};

// Very subtle, almost invisible — sits behind hero to add depth.
export const SubtleThree = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-50"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <SoftSphere />
      </Canvas>
    </div>
  );
};
