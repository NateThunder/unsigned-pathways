"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneVisibility } from "../../components/three/useSceneVisibility";

type ProgrammeFieldProps = {
  stage: number;
};

type SignalProps = ProgrammeFieldProps & {
  motionAllowed: boolean;
  pointer: React.MutableRefObject<THREE.Vector2>;
};

const POINT_COUNT = 420;

function seededNoise(index: number, offset: number) {
  const value = Math.sin(index * 91.17 + offset * 47.31) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

function createPattern(stage: number) {
  const positions = new Float32Array(POINT_COUNT * 3);

  for (let index = 0; index < POINT_COUNT; index += 1) {
    const progress = index / (POINT_COUNT - 1);
    const x = (progress - 0.5) * 13.5;
    const noise = seededNoise(index, stage) * 0.045;
    let y = 0;
    let z = seededNoise(index, stage + 4) * 0.22;

    if (stage === 0) {
      const envelope = Math.sin(progress * Math.PI);
      y = Math.sin(progress * Math.PI * 10) * envelope * 1.25 + noise;
    } else if (stage === 1) {
      const pointsPerArc = POINT_COUNT / 4;
      const arc = Math.min(3, Math.floor(index / pointsPerArc));
      const arcProgress = (index % pointsPerArc) / (pointsPerArc - 1);
      const angle = -Math.PI * 0.86 + arcProgress * Math.PI * 1.72;
      const radius = 0.8 + arc * 0.62;
      positions[index * 3] = Math.cos(angle) * radius * 1.55 - 0.4;
      y = Math.sin(angle) * radius * 0.72 + noise;
    } else {
      const side = index < POINT_COUNT / 2 ? -1 : 1;
      const pathProgress = (index % (POINT_COUNT / 2)) / (POINT_COUNT / 2 - 1);
      positions[index * 3] = (pathProgress - 0.5) * 11.5;
      y = side * Math.sin((pathProgress - 0.5) * Math.PI) * 1.38 + noise;
      z += side * Math.sin(pathProgress * Math.PI) * 0.18;
    }

    if (stage !== 1) positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
  }

  return positions;
}

function Signal({ stage, motionAllowed, pointer }: SignalProps) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const currentStage = useRef(stage);
  const pulseProgress = useRef(1);
  const patterns = useMemo(
    () => [createPattern(0), createPattern(1), createPattern(2)],
    [],
  );
  const positions = useMemo(() => patterns[0].slice(), [patterns]);
  const { invalidate } = useThree();

  useEffect(() => {
    currentStage.current = stage;
    pulseProgress.current = 0;
    invalidate();
  }, [invalidate, stage]);

  useFrame((state, delta) => {
    const pointObject = points.current;
    const field = group.current;
    if (!pointObject || !field) return;

    const positionAttribute = pointObject.geometry.attributes.position;
    const positionArray = positionAttribute.array as Float32Array;
    const target = patterns[currentStage.current];
    const blend = motionAllowed ? 1 - Math.exp(-delta * 4.5) : 1;

    for (let index = 0; index < positionArray.length; index += 1) {
      positionArray[index] += (target[index] - positionArray[index]) * blend;
    }
    positionAttribute.needsUpdate = true;

    const time = state.clock.elapsedTime;
    field.rotation.x = THREE.MathUtils.damp(field.rotation.x, pointer.current.y * 0.08, 3, delta);
    field.rotation.y = THREE.MathUtils.damp(field.rotation.y, pointer.current.x * 0.12, 3, delta);
    field.position.y = motionAllowed ? Math.sin(time * 0.32) * 0.08 : 0;

    if (pulse.current) {
      pulseProgress.current = Math.min(1, pulseProgress.current + delta * 0.7);
      const scale = 0.35 + pulseProgress.current * 4.8;
      pulse.current.scale.setScalar(scale);
      const material = pulse.current.material as THREE.MeshBasicMaterial;
      material.opacity = (1 - pulseProgress.current) * 0.35;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#0759c9"
          opacity={0.92}
          size={0.072}
          sizeAttenuation={false}
          transparent
          depthWrite={false}
        />
      </points>
      <mesh ref={pulse} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.96, 1, 96]} />
        <meshBasicMaterial color="#0759c9" opacity={0} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

export function ProgrammeField({ stage }: ProgrammeFieldProps) {
  const { containerRef, shouldMount, isActive } = useSceneVisibility("200px 0px");
  const [motionAllowed, setMotionAllowed] = useState(true);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);
    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      preference.removeEventListener("change", updatePreference);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div ref={containerRef} className="programme-field" aria-hidden="true">
      {shouldMount ? (
        <Canvas
          dpr={[1, 1.35]}
          orthographic
          camera={{ position: [0, 0, 9], zoom: 90, near: 0.1, far: 30 }}
          frameloop={isActive && motionAllowed ? "always" : "demand"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <Signal stage={stage} motionAllowed={motionAllowed} pointer={pointer} />
        </Canvas>
      ) : null}
    </div>
  );
}
