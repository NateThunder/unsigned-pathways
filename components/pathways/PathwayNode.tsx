import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useRef, useState } from "react";
import * as THREE from "three";

type PathwayNodeProps = {
  index: number;
  position: [number, number, number];
  progress: MutableRefObject<number>;
};

const colours = ["#dc8063", "#dfae35", "#80917d", "#6f9fba"];
const stagePoints = [0.31, 0.49, 0.67, 0.85];

function Connector({ y }: { y: number }) {
  const direction = y > 0 ? 1 : -1;

  return (
    <group position={[0, y, 0]}>
      <mesh>
        <boxGeometry args={[0.23, 0.24, 0.13]} />
        <meshStandardMaterial color="#d9d0bc" metalness={0.45} roughness={0.52} />
      </mesh>
      <mesh position={[0, direction * 0.155, 0]}>
        <boxGeometry args={[0.1, 0.055, 0.08]} />
        <meshStandardMaterial color="#665b4c" metalness={0.55} roughness={0.46} />
      </mesh>
    </group>
  );
}

function SessionsControl() {
  const heights = [0.18, 0.34, 0.52, 0.7, 0.48, 0.28, 0.12];
  return (
    <group position={[0, 0, 0.145]}>
      {heights.map((height, index) => (
        <mesh key={height} position={[(index - 3) * 0.13, 0, 0]} castShadow>
          <capsuleGeometry args={[0.045, height, 8, 14]} />
          <meshStandardMaterial color="#f6e3b9" metalness={0.08} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function HubControl() {
  const bars = [
    { x: -0.34, height: 0.3, colour: "#728a75" },
    { x: -0.12, height: 0.48, colour: "#49798a" },
    { x: 0.12, height: 0.68, colour: "#f0e4c6" },
    { x: 0.36, height: 0.28, colour: "#df7355" },
  ];
  return (
    <group position={[0, -0.08, 0.15]}>
      {bars.map((bar) => (
        <mesh key={bar.x} position={[bar.x, bar.height / 2 - 0.22, 0]} castShadow>
          <boxGeometry args={[0.18, bar.height, 0.09]} />
          <meshStandardMaterial color={bar.colour} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function FestivalControl() {
  return (
    <group position={[0, 0, 0.15]}>
      {[0.18, 0.34, 0.5].map((radius) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.035, 12, 48]} />
          <meshStandardMaterial color="#e8b349" metalness={0.52} roughness={0.34} />
        </mesh>
      ))}
      <mesh castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#543719" metalness={0.6} roughness={0.28} />
      </mesh>
    </group>
  );
}

function MentoringControl() {
  return (
    <group position={[0, 0, 0.16]} rotation={[0, 0, -0.24]}>
      <mesh scale={[1.22, 0.62, 1]}>
        <torusGeometry args={[0.38, 0.035, 12, 48]} />
        <meshStandardMaterial color="#e8b84d" metalness={0.45} roughness={0.36} />
      </mesh>
      <mesh position={[-0.27, 0.04, 0.05]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#dd8062" roughness={0.72} />
      </mesh>
      <mesh position={[0.28, -0.06, 0.05]} castShadow>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color="#e5b33f" roughness={0.72} />
      </mesh>
    </group>
  );
}

export function PathwayNode({ index, position, progress }: PathwayNodeProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const viewportWidth = useThree((state) => state.size.width);

  useFrame((state, delta) => {
    if (!group.current) return;

    const proximity = Math.max(0, 1 - Math.abs(progress.current - stagePoints[index]) * 7);
    const responsiveScale = viewportWidth <= 780 ? 0.68 : 1;
    const targetScale = responsiveScale * (1 + proximity * 0.055 + (hovered ? 0.07 : 0));
    const bob = Math.sin(state.clock.elapsedTime * 1.25 + index * 1.4) * 0.018;

    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta),
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.07,
      5,
      delta,
    );
    group.current.position.y = position[1] + bob;
  });

  const onPointer = (event: ThreeEvent<PointerEvent>, isHovered: boolean) => {
    event.stopPropagation();
    setHovered(isHovered);
    document.body.style.cursor = isHovered ? "pointer" : "";
  };

  return (
    <group
      ref={group}
      position={position}
      onPointerEnter={(event) => onPointer(event, true)}
      onPointerLeave={(event) => onPointer(event, false)}
    >
      <Connector y={0.86} />
      <Connector y={-0.86} />

      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.19, 64]} />
        <meshStandardMaterial color={colours[index]} metalness={0.04} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0, -0.085]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.055, 64]} />
        <meshStandardMaterial color="#eadfc7" metalness={0.08} roughness={0.65} />
      </mesh>

      {index === 0 && <SessionsControl />}
      {index === 1 && <HubControl />}
      {index === 2 && <FestivalControl />}
      {index === 3 && <MentoringControl />}
    </group>
  );
}
