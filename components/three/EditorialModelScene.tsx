"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneVisibility } from "./useSceneVisibility";

type EditorialModelSceneProps = {
  animate?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
  dragToSpin?: boolean;
  modelPath: string;
  particles?: boolean;
  preserveMaterials?: boolean;
  rotation?: [number, number, number];
  targetSize?: number;
  yawOnly?: boolean;
};

type EditorialModelProps = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  dragToSpin: boolean;
  modelPath: string;
  motionAllowed: boolean;
  preserveMaterials: boolean;
  rotation: [number, number, number];
  targetSize: number;
  yawOnly: boolean;
};

function BackgroundParticles({ motionAllowed }: { motionAllowed: boolean }) {
  const points = useRef<THREE.Points>(null);
  const tap = useRef({ x: 0, y: 0, strength: 0 });
  const { gl } = useThree();
  const positions = useMemo(() => {
    const values = new Float32Array(150 * 3);

    for (let index = 0; index < 150; index += 1) {
      const offset = index * 3;
      const seed = index + 1;
      values[offset] = (((seed * 47) % 101) / 100 - 0.5) * 8.5;
      values[offset + 1] = (((seed * 73) % 103) / 102 - 0.5) * 5.8;
      values[offset + 2] = -1.6 - ((seed * 29) % 100) / 80;
    }

    return values;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const handlePointerDown = (event: PointerEvent) => {
      if (!motionAllowed) return;
      const bounds = canvas.getBoundingClientRect();
      tap.current = {
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7,
        y: -((event.clientY - bounds.top) / bounds.height - 0.5) * 0.7,
        strength: 1,
      };
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    return () => canvas.removeEventListener("pointerdown", handlePointerDown);
  }, [gl, motionAllowed]);

  useFrame(({ clock, pointer }, delta) => {
    if (!points.current || !motionAllowed) return;
    const frameDelta = Math.min(delta, 1 / 30);
    const tapState = tap.current;
    const tapEase = tapState.strength * tapState.strength;

    points.current.rotation.z = clock.elapsedTime * 0.008 + tapEase * 0.08;
    points.current.position.x = THREE.MathUtils.damp(
      points.current.position.x,
      pointer.x * 0.24 + tapState.x * tapEase,
      5,
      frameDelta,
    );
    points.current.position.y = THREE.MathUtils.damp(
      points.current.position.y,
      pointer.y * 0.18 + tapState.y * tapEase + Math.sin(clock.elapsedTime * 0.18) * 0.035,
      5,
      frameDelta,
    );
    points.current.scale.setScalar(1 + tapEase * 0.16);
    tapState.strength = Math.max(0, tapState.strength - frameDelta * 1.8);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f4f3ee"
        opacity={0.72}
        size={0.025}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function EditorialModel({
  autoRotate,
  autoRotateSpeed,
  dragToSpin,
  modelPath,
  motionAllowed,
  preserveMaterials,
  rotation,
  targetSize,
  yawOnly,
}: EditorialModelProps) {
  const { scene } = useGLTF(modelPath);
  const { gl } = useThree();
  const group = useRef<THREE.Group>(null);
  const yaw = useRef(rotation[1]);
  const spinBoost = useRef(0);
  const drag = useRef({ active: false, pointerId: -1, lastX: 0, lastTime: 0 });

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = targetSize / Math.max(size.x, size.y, size.z);

    clone.position.copy(center).multiplyScalar(-1);
    clone.traverse((object) => {
      if (
        !(object instanceof THREE.Mesh) ||
        object.name === "editorial-outline"
      ) {
        return;
      }

      if (preserveMaterials) {
        object.material = Array.isArray(object.material)
          ? object.material.map((material) => material.clone())
          : object.material.clone();
        object.castShadow = true;
        object.receiveShadow = true;
        return;
      }

      object.material = new THREE.MeshToonMaterial({ color: "#0759c9" });

      const outline = new THREE.Mesh(
        object.geometry,
        new THREE.MeshBasicMaterial({
          color: "#0b0b0a",
          side: THREE.BackSide,
        }),
      );
      outline.name = "editorial-outline";
      outline.scale.setScalar(1.012);
      outline.renderOrder = 0;
      object.add(outline);

      object.castShadow = true;
      object.receiveShadow = true;
    });

    return { clone, scale };
  }, [preserveMaterials, scene, targetSize]);

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

  useEffect(() => {
    if (!dragToSpin || !motionAllowed) return;

    const canvas = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      drag.current = {
        active: true,
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastTime: event.timeStamp,
      };
      canvas.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const state = drag.current;
      if (!state.active || state.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - state.lastX;
      const elapsed = Math.max((event.timeStamp - state.lastTime) / 1000, 1 / 120);
      const dragRotation = deltaX * 0.008;

      yaw.current += dragRotation;
      spinBoost.current = THREE.MathUtils.clamp(dragRotation / elapsed, -7, 7);
      state.lastX = event.clientX;
      state.lastTime = event.timeStamp;
    };

    const stopDragging = (event: PointerEvent) => {
      if (drag.current.pointerId !== event.pointerId) return;
      drag.current.active = false;
      drag.current.pointerId = -1;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", stopDragging);
    canvas.addEventListener("pointercancel", stopDragging);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", stopDragging);
      canvas.removeEventListener("pointercancel", stopDragging);
    };
  }, [dragToSpin, gl, motionAllowed]);

  useFrame(({ clock, pointer }, delta) => {
    const object = group.current;
    if (!object) return;

    const frameDelta = Math.min(delta, 1 / 30);
    const targetX = rotation[0] + (motionAllowed && !yawOnly ? pointer.y * 0.08 : 0);
    const targetY = rotation[1] + (motionAllowed
      ? pointer.x * 0.12 + Math.sin(clock.elapsedTime * 0.42) * 0.08
      : 0);

    if (motionAllowed && autoRotate) {
      yaw.current += (autoRotateSpeed + spinBoost.current) * frameDelta;
      spinBoost.current = THREE.MathUtils.damp(spinBoost.current, 0, 1.35, frameDelta);
      object.rotation.y = yaw.current;
    } else {
      object.rotation.y = THREE.MathUtils.damp(object.rotation.y, targetY, 4, frameDelta);
    }

    object.rotation.x = THREE.MathUtils.damp(object.rotation.x, targetX, 4, frameDelta);
    object.rotation.z = THREE.MathUtils.damp(object.rotation.z, rotation[2], 4, frameDelta);
    object.position.y = motionAllowed && !yawOnly
      ? Math.sin(clock.elapsedTime * 0.68) * 0.055
      : 0;
  });

  return (
    <group ref={group} rotation={rotation}>
      <primitive object={model.clone} scale={model.scale} />
    </group>
  );
}

export function EditorialModelScene({
  animate = true,
  autoRotate = false,
  autoRotateSpeed = 0.12,
  className,
  dragToSpin = false,
  modelPath,
  particles = false,
  preserveMaterials = false,
  rotation = [-0.18, -0.35, 0.06],
  targetSize = 4.6,
  yawOnly = false,
}: EditorialModelSceneProps) {
  const [motionAllowed, setMotionAllowed] = useState(true);
  const { containerRef, shouldMount, isActive } = useSceneVisibility("200px 0px");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className={className} ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {shouldMount && (
        <Canvas
          dpr={[1, 1.4]}
          frameloop={isActive ? "always" : "never"}
          camera={{ position: [0, 0.15, 7], fov: 32, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          shadows
        >
          <ambientLight intensity={1.45} />
          <directionalLight
            castShadow
            color="#fff5e5"
            intensity={3.5}
            position={[-4, 7, 8]}
          />
          <directionalLight color="#2f64ff" intensity={0.8} position={[5, 1, 5]} />
          {particles && <BackgroundParticles motionAllowed={animate && motionAllowed} />}
          <Suspense fallback={null}>
            <EditorialModel
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              dragToSpin={dragToSpin}
              modelPath={modelPath}
              motionAllowed={animate && motionAllowed}
              preserveMaterials={preserveMaterials}
              rotation={rotation}
              targetSize={targetSize}
              yawOnly={yawOnly}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
