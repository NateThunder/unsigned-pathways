import { MutableRefObject, useMemo } from "react";
import * as THREE from "three";
import { PathwayNode } from "./PathwayNode";

type PathwaysSceneProps = {
  progress: MutableRefObject<number>;
};

const nodePositions: [number, number, number][] = [
  [0.02, 2.48, 0],
  [0.05, -0.34, 0],
  [-0.04, -2.68, 0],
  [0.08, -5.55, 0],
];

export function PathwaysScene({ progress }: PathwaysSceneProps) {
  const cable = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, 8.35, -0.04),
      new THREE.Vector3(-0.12, 7.15, -0.04),
      new THREE.Vector3(0.12, 5.85, -0.04),
      new THREE.Vector3(0.02, 2.82, -0.04),
      new THREE.Vector3(0.05, 0.06, -0.04),
      new THREE.Vector3(-0.04, -2.28, -0.04),
      new THREE.Vector3(0.08, -5.15, -0.04),
      new THREE.Vector3(-0.03, -6.9, -0.04),
      new THREE.Vector3(0.42, -7.75, -0.04),
    ]);

    return new THREE.TubeGeometry(curve, 220, 0.035, 12, false);
  }, []);

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight
        castShadow
        color="#fff1d8"
        intensity={3.2}
        position={[-5, 7, 9]}
      />
      <directionalLight color="#df8f5e" intensity={0.9} position={[5, 1, 5]} />

      <mesh geometry={cable} receiveShadow>
        <meshStandardMaterial color="#0759c9" metalness={0.18} roughness={0.38} />
      </mesh>

      {nodePositions.map((position, index) => (
        <PathwayNode
          key={index}
          index={index}
          position={position}
          progress={progress}
        />
      ))}
    </>
  );
}
