"use client";

import { useState } from "react";
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

const themes = [
  {
    label: "Songwriting",
    value: "Ideas become lyrics, structure and an original voice.",
  },
  {
    label: "Performance",
    value: "Practice becomes presence, confidence and connection.",
  },
  {
    label: "Recording",
    value: "Sessions become tracks, technical skills and something to share.",
  },
] as const;

export function ThemeMixer() {
  const [activeTheme, setActiveTheme] = useState(1);

  return (
    <div className={styles.mixer}>
      <div className={styles.mixerControls} role="group" aria-label="Explore programme themes">
        {themes.map((theme, index) => (
          <button
            className={`${styles.mixerControl} ${activeTheme === index ? styles.mixerControlActive : ""}`}
            key={theme.label}
            type="button"
            aria-pressed={activeTheme === index}
            onClick={() => setActiveTheme(index)}
          >
            <span className={styles.controlLabel}>{theme.label}</span>
            <span className={styles.dial} aria-hidden="true">
              <span style={{ transform: `rotate(${index * 55 - 55}deg)` }} />
            </span>
          </button>
        ))}
      </div>
      <div className={styles.mixerOutput} aria-live="polite">
        <span>Channel {String(activeTheme + 1).padStart(2, "0")}</span>
        <p>{themes[activeTheme].value}</p>
      </div>
    </div>
  );
}
