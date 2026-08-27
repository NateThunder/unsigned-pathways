"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type SynthModelProps = {
  motionAllowed: boolean;
  setCursor: Dispatch<SetStateAction<"default" | "grab" | "grabbing">>;
};

type DragState = {
  active: boolean;
  pointerId: number;
  x: number;
  y: number;
  time: number;
};

function SynthModel({ motionAllowed, setCursor }: SynthModelProps) {
  const { scene } = useGLTF("/3d/synth_red.glb");
  const group = useRef<THREE.Group>(null);
  const drag = useRef<DragState>({
    active: false,
    pointerId: -1,
    x: 0,
    y: 0,
    time: 0,
  });
  const targetRotation = useRef(new THREE.Vector2(-0.18, 0));
  const angularVelocity = useRef(new THREE.Vector2());

  useEffect(() => {
    const stopPointerControl = (event: PointerEvent) => {
      if (event.pointerId !== drag.current.pointerId) return;

      drag.current.active = false;
      drag.current.pointerId = -1;
      setCursor("default");
    };
    const stopPointerControlOnBlur = () => {
      drag.current.active = false;
      drag.current.pointerId = -1;
      setCursor("default");
    };

    window.addEventListener("pointerup", stopPointerControl, true);
    window.addEventListener("pointercancel", stopPointerControl, true);
    window.addEventListener("blur", stopPointerControlOnBlur);

    return () => {
      window.removeEventListener("pointerup", stopPointerControl, true);
      window.removeEventListener("pointercancel", stopPointerControl, true);
      window.removeEventListener("blur", stopPointerControlOnBlur);
    };
  }, [setCursor]);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 8 / Math.max(size.x, size.y, size.z);
    const pivot = new THREE.Vector3(
      bounds.min.x + size.x * 0.37,
      bounds.min.y + size.y * 0.5,
      center.z,
    );

    // Preserve the model's original resting placement while moving its actual
    // transform origin to the chosen point on the synth body. Because the
    // primitive is scaled, its positional offset must be scaled explicitly too.
    const originalPivotOffset = pivot
      .clone()
      .multiplyScalar(scale)
      .sub(center)
      .applyEuler(new THREE.Euler(-0.18, 0, 0));
    const position = new THREE.Vector3(2.55, 0, 0).add(originalPivotOffset);

    clone.position.copy(pivot).multiplyScalar(-scale);
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        object.material = materials.map(() => {
          return new THREE.MeshToonMaterial({
            color: "#0759c9",
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

    return { clone, position, scale };
  }, [scene]);

  useFrame((_, delta) => {
    const object = group.current;
    if (!object) return;

    if (motionAllowed && !drag.current.active) {
      targetRotation.current.x += angularVelocity.current.x * delta;
      targetRotation.current.y += angularVelocity.current.y * delta;

      angularVelocity.current.multiplyScalar(Math.exp(-3.25 * delta));

      const inertia = angularVelocity.current.length();
      const idleBlend = 1 - THREE.MathUtils.clamp(inertia / 0.18, 0, 1);
      targetRotation.current.x += delta * 0.055 * idleBlend;
    }

    object.rotation.x = THREE.MathUtils.damp(
      object.rotation.x,
      targetRotation.current.x,
      drag.current.active ? 20 : 10,
      delta,
    );
    object.rotation.y = THREE.MathUtils.damp(
      object.rotation.y,
      targetRotation.current.y,
      drag.current.active ? 20 : 10,
      delta,
    );
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (
      !motionAllowed ||
      event.pointerType === "touch" ||
      event.button !== 0
    ) {
      return;
    }

    event.stopPropagation();
    (event.nativeEvent.target as HTMLElement).setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
    angularVelocity.current.set(0, 0);
    setCursor("grabbing");
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return;

    if ((event.buttons & 1) === 0) {
      drag.current.active = false;
      drag.current.pointerId = -1;
      setCursor("grab");
      return;
    }

    event.stopPropagation();
    const now = performance.now();
    const elapsed = Math.max((now - drag.current.time) / 1000, 1 / 120);
    const deltaX = event.clientX - drag.current.x;
    const deltaY = event.clientY - drag.current.y;
    const sensitivity = 0.008;
    const rotationX = deltaY * sensitivity;
    const rotationY = deltaX * sensitivity;

    targetRotation.current.x += rotationX;
    targetRotation.current.y += rotationY;
    angularVelocity.current.set(rotationX / elapsed, rotationY / elapsed);
    drag.current.x = event.clientX;
    drag.current.y = event.clientY;
    drag.current.time = now;
  };

  const stopDragging = (event: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return;

    drag.current.active = false;
    (event.nativeEvent.target as HTMLElement).releasePointerCapture(
      event.pointerId,
    );
    setCursor("grab");
  };

  return (
    <group
      ref={group}
      position={model.position}
      rotation={[-0.18, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerOver={(event) => {
        if (!motionAllowed || event.pointerType === "touch") return;
        event.stopPropagation();
        setCursor("grab");
      }}
      onPointerOut={() => {
        if (!drag.current.active) setCursor("default");
      }}
    >
      <primitive object={model.clone} scale={model.scale} />
    </group>
  );
}

export function BenefitsScene() {
  const [motionAllowed, setMotionAllowed] = useState(true);
  const [cursor, setCursor] = useState<"default" | "grab" | "grabbing">(
    "default",
  );

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
      style={{ cursor }}
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
        <SynthModel motionAllowed={motionAllowed} setCursor={setCursor} />
        <Environment preset="studio" environmentIntensity={0.35} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/3d/synth_red.glb");
