"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type {
  MutableRefObject,
  PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";
import { useSceneVisibility } from "../three/useSceneVisibility";
import styles from "./about.module.css";

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type ChainSceneProps = {
  pointer: MutableRefObject<PointerState>;
  scrollEnergyRef: MutableRefObject<number>;
  motionAllowed: boolean;
};

const POINT_COUNT = 220;

function ChainScene({
  pointer,
  scrollEnergyRef,
  motionAllowed,
}: ChainSceneProps) {
  const { viewport } = useThree();
  const lineRef = useRef<
    THREE.Line<THREE.BufferGeometry, THREE.LineDashedMaterial>
  >(null);
  const animatedY = useRef(new Float32Array(POINT_COUNT));
  const previousPointer = useRef({ x: 0, y: 0 });
  const lastPointerX = useRef(0);
  const pointerEnergy = useRef(0);
  const phase = useRef(0);
  const scrollPhase = useRef(0);
  const [lineObject] = useState(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(POINT_COUNT * 3), 3),
    );

    return new THREE.Line(
      geometry,
      new THREE.LineDashedMaterial({
        color: "#0759c9",
        dashSize: 0.025,
        gapSize: 0.05,
      }),
    );
  });

  useEffect(
    () => () => {
      lineObject.geometry.dispose();
      lineObject.material.dispose();
    },
    [lineObject],
  );

  useFrame((_, delta) => {
    const line = lineRef.current;
    if (!line) return;

    const positionAttribute = line.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const inset = 0.08;
    const left = -viewport.width / 2 + inset;
    const right = viewport.width / 2 - inset;
    const pointerX = pointer.current.x * (viewport.width / 2);
    const pointerY = pointer.current.y * (viewport.height / 2);

    if (motionAllowed && pointer.current.active) {
      const dx = pointer.current.x - previousPointer.current.x;
      const dy = pointer.current.y - previousPointer.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      pointerEnergy.current = Math.min(
        0.09,
        pointerEnergy.current + speed * 0.9,
      );
      lastPointerX.current = pointerX;
    }

    pointerEnergy.current = THREE.MathUtils.damp(
      pointerEnergy.current,
      0,
      5.5,
      delta,
    );
    scrollEnergyRef.current = THREE.MathUtils.damp(
      scrollEnergyRef.current,
      0,
      3,
      delta,
    );
    phase.current += delta * (7 + pointerEnergy.current * 18);
    scrollPhase.current +=
      delta * (5.5 + Math.abs(scrollEnergyRef.current) * 0.12);
    previousPointer.current.x = pointer.current.x;
    previousPointer.current.y = pointer.current.y;

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const t = index / (POINT_COUNT - 1);
      const x = THREE.MathUtils.lerp(left, right, t);
      const scaled = t * 4;
      const segmentPosition = scaled - Math.floor(scaled);
      const anchorMask = Math.sin(segmentPosition * Math.PI);
      const restingSag = -0.04 * anchorMask;
      const imperfection =
        Math.sin(t * Math.PI * 17 + 0.45) * 0.007 * anchorMask;

      const influenceX = Math.exp(
        -Math.pow(
          (x - (pointer.current.active ? pointerX : lastPointerX.current)) /
            (viewport.width * 0.12),
          2,
        ) * 2.5,
      );
      const influenceY = Math.exp(
        -Math.pow(pointerY / Math.max(viewport.height * 0.34, 0.1), 2) * 2.2,
      );
      const influence = influenceX * influenceY;
      const pull =
        motionAllowed && pointer.current.active
          ? THREE.MathUtils.clamp(pointerY * 0.18, -0.16, 0.16) *
            influence *
            anchorMask
          : 0;
      const ripple =
        motionAllowed
          ? Math.sin(
              Math.abs(x - lastPointerX.current) * 7 - phase.current,
            ) *
            pointerEnergy.current *
            influenceX *
            anchorMask
          : 0;
      const scrollWave = motionAllowed
        ? (Math.sin(t * Math.PI * 6 - scrollPhase.current) * 0.76 +
            Math.sin(
              t * Math.PI * 11 + scrollPhase.current * 1.35,
            ) *
              0.24) *
          scrollEnergyRef.current *
          0.00215 *
          anchorMask
        : 0;
      const targetY =
        restingSag + imperfection + pull + ripple + scrollWave;

      animatedY.current[index] = THREE.MathUtils.damp(
        animatedY.current[index],
        targetY,
        pointer.current.active || Math.abs(scrollEnergyRef.current) > 0.5
          ? 12
          : 6,
        delta,
      );

      positionAttribute.setXYZ(index, x, animatedY.current[index], 0);
    }

    positionAttribute.needsUpdate = true;
    line.computeLineDistances();
  });

  return (
    <primitive ref={lineRef} object={lineObject} frustumCulled={false} />
  );
}

type PathwayChainProps = {
  className?: string;
};

export function PathwayChain({ className }: PathwayChainProps = {}) {
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });
  const scrollEnergy = useRef(0);
  const previousScroll = useRef(0);
  const [motionAllowed, setMotionAllowed] = useState(true);
  const { containerRef, shouldMount, isActive } = useSceneVisibility();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);

    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    previousScroll.current = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const velocity = currentScroll - previousScroll.current;

      previousScroll.current = currentScroll;
      if (!motionAllowed) return;

      scrollEnergy.current = THREE.MathUtils.clamp(
        scrollEnergy.current * 0.55 + velocity * 2.2,
        -95,
        95,
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [motionAllowed]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = (event.clientX - bounds.left) / bounds.width;
    const localY = (event.clientY - bounds.top) / bounds.height;

    pointer.current.x = localX * 2 - 1;
    pointer.current.y = -(localY * 2 - 1);
    pointer.current.active = true;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.route}${className ? ` ${className}` : ""}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        pointer.current.active = true;
      }}
      onPointerLeave={() => {
        pointer.current.active = false;
      }}
      aria-hidden="true"
    >
      {shouldMount && (
        <Canvas
          orthographic
          frameloop={isActive ? "always" : "never"}
          camera={{ position: [0, 0, 10], zoom: 100 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <ChainScene
            pointer={pointer}
            scrollEnergyRef={scrollEnergy}
            motionAllowed={motionAllowed}
          />
        </Canvas>
      )}
    </div>
  );
}
