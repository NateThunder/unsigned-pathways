"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SymbolType = "rings" | "squares" | "diamonds" | "burst";

type OpportunitySymbolProps = {
  index: number;
  type: SymbolType;
};

type Stroke = {
  closed?: boolean;
  points: [number, number, number][];
};

const BLUE = "#0759c9";

function circle(x: number, radius = 0.72): Stroke {
  return {
    closed: true,
    points: Array.from({ length: 49 }, (_, pointIndex) => {
      const angle = (pointIndex / 48) * Math.PI * 2;
      return [x + Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
    }),
  };
}

const symbolStrokes: Record<SymbolType, Stroke[]> = {
  rings: [circle(-0.38), circle(0.38)],
  squares: [
    {
      closed: true,
      points: [[-0.82, 0.68, 0], [0.38, 0.68, 0], [0.38, -0.52, 0], [-0.82, -0.52, 0]],
    },
    {
      closed: true,
      points: [[-0.38, 0.3, 0], [0.82, 0.3, 0], [0.82, -0.9, 0], [-0.38, -0.9, 0]],
    },
  ],
  diamonds: [
    {
      closed: true,
      points: [[-0.95, 0, 0], [-0.32, 0.7, 0], [0.32, 0, 0], [-0.32, -0.7, 0]],
    },
    {
      closed: true,
      points: [[-0.28, 0, 0], [0.35, 0.7, 0], [0.98, 0, 0], [0.35, -0.7, 0]],
    },
  ],
  burst: [
    ...Array.from({ length: 8 }, (_, rayIndex): Stroke => {
      const angle = (rayIndex / 8) * Math.PI * 2;
      return {
        points: [
          [Math.cos(angle) * 0.08 - 0.35, Math.sin(angle) * 0.08 + 0.22, 0],
          [Math.cos(angle) * 0.84 - 0.35, Math.sin(angle) * 0.84 + 0.22, 0],
        ],
      };
    }),
    { points: [[-0.32, -0.72, 0], [0.7, -0.72, 0], [0.7, -0.05, 0]] },
    { points: [[0.7, -0.72, 0], [1.42, -0.72, 0]] },
  ],
};

function AnimatedSymbol({ index, type, motionAllowed }: OpportunitySymbolProps & { motionAllowed: boolean }) {
  const group = useRef<THREE.Group>(null);
  const strokes = useMemo(() => symbolStrokes[type], [type]);

  useFrame(({ clock, pointer }, delta) => {
    const symbol = group.current;
    if (!symbol || !motionAllowed) return;

    const time = clock.elapsedTime;
    const frameDelta = Math.min(delta, 1 / 30);
    const signal = Math.pow(Math.max(0, Math.sin(time * 0.72 - index * 0.85)), 10);
    const pointerStrength = Math.max(0, 1 - pointer.length()) * 0.11;
    const deconstruct = (Math.sin(time * 0.42 + index * 1.35) + 1) * 0.5;

    symbol.position.x = THREE.MathUtils.damp(
      symbol.position.x,
      pointer.x * pointerStrength,
      4.5,
      frameDelta,
    );
    symbol.position.y = THREE.MathUtils.damp(
      symbol.position.y,
      pointer.y * pointerStrength + Math.sin(time * 0.55 + index) * 0.025,
      4.5,
      frameDelta,
    );
    symbol.rotation.z = THREE.MathUtils.damp(
      symbol.rotation.z,
      (pointer.x - pointer.y) * 0.025 + (type === "burst" ? time * 0.018 : 0),
      3.5,
      frameDelta,
    );
    symbol.rotation.y = THREE.MathUtils.damp(symbol.rotation.y, pointer.x * 0.13, 3.5, frameDelta);
    symbol.rotation.x = THREE.MathUtils.damp(symbol.rotation.x, -pointer.y * 0.09, 3.5, frameDelta);
    symbol.scale.setScalar(1 + signal * 0.065 + deconstruct * 0.006);

    symbol.children.forEach((child, childIndex) => {
      const direction = childIndex % 2 === 0 ? -1 : 1;
      child.position.x = THREE.MathUtils.damp(
        child.position.x,
        direction * signal * 0.055,
        5,
        frameDelta,
      );
      child.position.z = THREE.MathUtils.damp(
        child.position.z,
        (childIndex % 3) * signal * 0.04,
        5,
        frameDelta,
      );
    });
  });

  return (
    <group ref={group}>
      {strokes.map((stroke, strokeIndex) => (
        <Line
          color={BLUE}
          key={`${type}-${strokeIndex}`}
          lineWidth={1.15}
          points={stroke.closed ? [...stroke.points, stroke.points[0]] : stroke.points}
          transparent
          opacity={0.96}
        />
      ))}
    </group>
  );
}

export function OpportunitySymbol({ index, type }: OpportunitySymbolProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <span className="opportunity-symbol" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={motionAllowed ? "always" : "demand"}
        orthographic
        camera={{ position: [0, 0, 5], zoom: 30 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <AnimatedSymbol index={index} motionAllowed={motionAllowed} type={type} />
      </Canvas>
    </span>
  );
}
