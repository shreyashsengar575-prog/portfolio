"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Icosahedron, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function DistortSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = t * 0.05;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={2.1}>
        <Sphere args={[1, 128, 128]}>
          <MeshDistortMaterial
            color="#0ea5b7"
            emissive="#5eead4"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.9}
            distort={0.45}
            speed={2.2}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[3.4, 0.03, 16, 200]} />
      <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.2} />
    </mesh>
  );
}

function Particles({ count = 2500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#5eead4" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame((state) => {
    const target = state.pointer;
    state.camera.position.x += (target.x * 1.5 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-target.y * 1.0 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
      <directionalLight position={[-5, -2, -5]} intensity={0.8} color="#a78bfa" />
      <DistortSphere />
      <Ring />
      <Particles />
      <Icosahedron args={[0.4, 0]} position={[3, 2, -2]}>
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} wireframe />
      </Icosahedron>
      <Rig />
    </Canvas>
  );
}
