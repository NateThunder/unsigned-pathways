"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SynthModelProps = {
  motionAllowed: boolean;
};

function SynthModel({ motionAllowed }: SynthModelProps) {
  const { scene } = useGLTF("/3d/synth_red.glb");
  const group = useRef<THREE.Group>(null);
  const rotation = useRef(0);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 8 / Math.max(size.x, size.y, size.z);

    clone.position.copy(center).multiplyScalar(-1);
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        object.material = materials.map(() => {
          return new THREE.MeshToonMaterial({
            color: "#d52d28",
          });
        });
        if (object.material.length === 1) object.material = object.material[0];

        const outline = new THREE.LineSegments(
          new THREE.EdgesGeometry(object.geometry, 28),
          new THREE.LineBasicMaterial({
            color: "#161412",
            opacity: 0.72,
            transparent: true,
          }),
        );
        outline.name = "technical-outline";
        outline.renderOrder = 2;
        object.add(outline);

        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return { clone, scale };
  }, [scene]);

  useFrame((_, delta) => {
    const object = group.current;
    if (!object) return;

    if (motionAllowed) rotation.current += delta * 0.055;
    const targetX = -0.18 + rotation.current;

    object.rotation.x = THREE.MathUtils.damp(object.rotation.x, targetX, 3, delta);
    object.rotation.y = THREE.MathUtils.damp(
      object.rotation.y,
      0,
      2.2,
      delta,
    );
    object.position.x = THREE.MathUtils.damp(
      object.position.x,
      2.55,
      3,
      delta,
    );
    object.position.y = THREE.MathUtils.damp(
      object.position.y,
      0,
      3,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[-0.18, 0, 0]}>
      <primitive object={model.clone} scale={model.scale} />
    </group>
  );
}

export function BenefitsScene() {
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 8.6], fov: 32, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.25} />
      <directionalLight
        castShadow
        color="#fff7e8"
        intensity={3.4}
        position={[-4, 7, 8]}
      />
      <directionalLight color="#345dff" intensity={0.65} position={[5, 1, 5]} />
      <Suspense fallback={null}>
        <SynthModel motionAllowed={motionAllowed} />
        <Environment preset="studio" environmentIntensity={0.35} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/3d/synth_red.glb");
