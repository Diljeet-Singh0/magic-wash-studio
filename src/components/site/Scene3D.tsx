import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Bubble({ position, scale, speed = 1, color = "#5cd8ff" }: { position: [number, number, number]; scale: number; speed?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
      <Sphere ref={ref} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function ChromeOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.1, 0.35, 200, 32]} />
      <meshStandardMaterial color="#9fe8ff" metalness={1} roughness={0.05} />
    </mesh>
  );
}

export function Scene3D({ variant = "bubbles" }: { variant?: "bubbles" | "orb" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#7fdfff" />
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#3a9fd6" />
        <Environment preset="city" />

        {variant === "orb" ? (
          <ChromeOrb />
        ) : (
          <>
            <Bubble position={[-2.5, 1, 0]} scale={0.6} speed={1.2} />
            <Bubble position={[2.8, -0.5, -1]} scale={0.9} speed={0.8} color="#7fdfff" />
            <Bubble position={[1.2, 1.8, 0.5]} scale={0.4} speed={1.5} />
            <Bubble position={[-1.8, -1.5, 1]} scale={0.5} speed={1.0} color="#a0e8ff" />
            <Bubble position={[0, 0, -2]} scale={0.7} speed={0.6} />
            <Bubble position={[3, 2, 0]} scale={0.35} speed={1.8} />
            <Bubble position={[-3, 2.2, -0.5]} scale={0.45} speed={1.3} color="#6fd0ff" />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}
