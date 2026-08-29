"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneVisibility } from "../../components/three/useSceneVisibility";

const MODEL_PATH = "/3d/Meshy_AI_Blue_Microphone_0828230256_optimized.glb";

function Microphone({ motionAllowed }: { motionAllowed: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<THREE.Group>(null);
  const rotationPhase = useRef(0);
  const bobPhase = useRef(0);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3.78 / Math.max(size.x, size.y, size.z);
    const rankedMeshes: Array<{ mesh: THREE.Mesh; span: number }> = [];

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const meshSize = new THREE.Box3()
        .setFromObject(object)
        .getSize(new THREE.Vector3());
      rankedMeshes.push({ mesh: object, span: meshSize.length() });
    });

    const outlinedMeshes = new Set(
      rankedMeshes
        .sort((left, right) => right.span - left.span)
        .slice(0, 3)
        .map(({ mesh }) => mesh),
    );

    clone.position.copy(center).multiplyScalar(-1);
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh) || object.name === "cel-outline") return;

      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      object.material = sourceMaterials.map(
        () =>
          new THREE.MeshToonMaterial({
            color: "#0759c9",
          }),
      );

      if (object.material.length === 1) object.material = object.material[0];

      if (outlinedMeshes.has(object)) {
        const outline = new THREE.Mesh(
          object.geometry,
          new THREE.MeshBasicMaterial({
            color: "#11100f",
            side: THREE.BackSide,
          }),
        );
        outline.name = "cel-outline";
        outline.scale.setScalar(1.012);
        outline.renderOrder = 0;
        object.add(outline);
      }

      object.castShadow = true;
      object.receiveShadow = true;
    });

    return { clone, scale };
  }, [scene]);

  useEffect(
    () => () => {
      model.clone.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }

      });
    },
    [model],
  );

  useFrame(({ pointer }, delta) => {
    const object = group.current;
    if (!object) return;

    const frameDelta = Math.min(delta, 1 / 30);
    if (motionAllowed) {
      rotationPhase.current += frameDelta * 0.035;
      bobPhase.current += frameDelta * 0.72;
    }

    const targetX = motionAllowed ? -0.08 + pointer.y * 0.1 : -0.08;
    const targetY = motionAllowed
      ? -0.42 + pointer.x * 0.14 + rotationPhase.current
      : -0.42;

    object.rotation.x = THREE.MathUtils.damp(object.rotation.x, targetX, 4.5, frameDelta);
    object.rotation.y = THREE.MathUtils.damp(object.rotation.y, targetY, 4.5, frameDelta);
    object.position.y = motionAllowed
      ? Math.sin(bobPhase.current) * 0.08
      : 0;
  });

  return (
    <group ref={group} rotation={[-0.08, -0.42, 0.55]}>
      <primitive object={model.clone} scale={model.scale} />
    </group>
  );
}

export function AboutHeroScene() {
  const [motionAllowed, setMotionAllowed] = useState(true);
  const { containerRef, isActive } = useSceneVisibility("200px 0px");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isActive ? "always" : "never"}
        camera={{ position: [0, 0, 8.4], fov: 31, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={1.35} />
        <directionalLight
          castShadow
          color="#fff6e8"
          intensity={3.6}
          position={[-4, 7, 8]}
        />
        <directionalLight color="#2d61ff" intensity={0.8} position={[5, 0, 5]} />
        <Suspense fallback={null}>
          <Microphone motionAllowed={motionAllowed} />
          <Environment preset="studio" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
