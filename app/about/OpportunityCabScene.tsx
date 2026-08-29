"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneVisibility } from "../../components/three/useSceneVisibility";

const MODEL_PATH = "/3d/Meshy_AI_Coiled_Instrument_Cab_0829042938_optimized.glb";

function InstrumentCabinet({ motionAllowed }: { motionAllowed: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 2.9 / Math.max(size.x, size.y, size.z);
    const rankedMeshes: Array<{ mesh: THREE.Mesh; span: number }> = [];

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.computeBoundingBox();
      const meshSize = object.geometry.boundingBox?.getSize(new THREE.Vector3());
      rankedMeshes.push({ mesh: object, span: meshSize?.length() ?? 0 });
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
        () => new THREE.MeshToonMaterial({ color: "#0759c9" }),
      );
      if (object.material.length === 1) object.material = object.material[0];

      if (outlinedMeshes.has(object)) {
        const outline = new THREE.Mesh(
          object.geometry,
          new THREE.MeshBasicMaterial({
            color: "#080909",
            side: THREE.BackSide,
          }),
        );
        outline.name = "cel-outline";
        outline.scale.setScalar(1.014);
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
        if (!(object instanceof THREE.Mesh)) return;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      });
    },
    [model],
  );

  useFrame(({ clock, pointer }, delta) => {
    const object = group.current;
    if (!object) return;

    const targetX = motionAllowed ? 0.22 + pointer.y * 0.07 : 0.22;
    const targetY = motionAllowed
      ? -0.4 + pointer.x * 0.11 + Math.sin(clock.elapsedTime * 0.44) * 0.07
      : -0.4;

    object.rotation.x = THREE.MathUtils.damp(object.rotation.x, targetX, 4, delta);
    object.rotation.y = THREE.MathUtils.damp(object.rotation.y, targetY, 4, delta);
    object.position.y = motionAllowed
      ? Math.sin(clock.elapsedTime * 0.69 + 2.1) * 0.045
      : 0;
  });

  return (
    <group ref={group} rotation={[0.22, -0.4, -0.04]}>
      <primitive object={model.clone} scale={model.scale} />
    </group>
  );
}

export function OpportunityCabScene() {
  const [motionAllowed, setMotionAllowed] = useState(true);
  const { containerRef, shouldMount, isActive } = useSceneVisibility();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {shouldMount && (
        <Canvas
          dpr={[1, 1.4]}
          frameloop={isActive ? "always" : "never"}
          camera={{ position: [0, 0.15, 6], fov: 32, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          shadows
        >
          <ambientLight intensity={1.4} />
          <directionalLight
            castShadow
            color="#fff5e5"
            intensity={3.4}
            position={[-4, 6, 7]}
          />
          <directionalLight color="#2f64ff" intensity={0.75} position={[4, 1, 5]} />
          <Suspense fallback={null}>
            <InstrumentCabinet motionAllowed={motionAllowed} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
