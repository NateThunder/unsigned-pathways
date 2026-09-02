"use client";

import { useState } from "react";
import { EditorialModelScene } from "../../components/three/EditorialModelScene";
import styles from "./page.module.css";

const stages = [
  {
    number: "01",
    title: "Discover",
    caption: "Try things.",
    body: "A welcoming first session for exploring sound, ideas and creative confidence.",
  },
  {
    number: "02",
    title: "Develop",
    caption: "Build skills.",
    body: "Artist-led sessions turn early ideas into practical skills, stronger choices and a clear direction.",
  },
  {
    number: "03",
    title: "Share",
    caption: "Make something real.",
    body: "Young people finish with something they can perform, record or share on their own terms.",
  },
] as const;

export function ProgrammeExplorer() {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <div className={styles.explorer}>
      <ol className={styles.stageList}>
        {stages.map((stage, index) => (
          <li className={styles.stageItem} key={stage.number}>
            <button
              className={`${styles.stageButton} ${activeStage === index ? styles.stageButtonActive : ""}`}
              type="button"
              aria-pressed={activeStage === index}
              onClick={() => setActiveStage(index)}
            >
              <span className={styles.stageNumber}>{stage.number}</span>
              <strong>{stage.title}</strong>
              <small>{stage.caption}</small>
              <span className={styles.stageNode} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <div className={styles.explorerReadout} aria-live="polite">
        <span>{stages[activeStage].number} / {stages[activeStage].title}</span>
        <p>{stages[activeStage].body}</p>
      </div>
    </div>
  );
}

export function ThemeMixer() {
  return (
    <div className={styles.mixer}>
      <div
        className={styles.mixerControls}
        role="img"
        aria-label="Blue studio dials viewed from above"
      >
        <div className={styles.mixerModel} aria-hidden="true">
          <EditorialModelScene
            animate={false}
            modelPath="/3d/blue_dials_optimized.glb"
            preserveMaterials
            rotation={[Math.PI / 2, 0, 0]}
            targetSize={9.36}
          />
        </div>
      </div>
    </div>
  );
}
