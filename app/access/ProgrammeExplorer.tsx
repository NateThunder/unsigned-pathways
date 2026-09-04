"use client";

import { useState } from "react";
import { ProgrammeField } from "./ProgrammeField";
import styles from "./page.module.css";

const stages = [
  {
    number: "01",
    title: "Music",
    caption: "Create and express.",
    body: "Artist-led music sessions give young people a practical route into confidence, self-expression and communication.",
  },
  {
    number: "02",
    title: "Sport",
    caption: "Move and connect.",
    body: "Structured sport sessions support emotional regulation, teamwork and positive engagement through shared activity.",
  },
  {
    number: "03",
    title: "Mentoring",
    caption: "Reflect and progress.",
    body: "Consistent mentoring rooted in lived experience helps young people build confidence, make stronger choices and track progress.",
  },
] as const;

export function ProgrammeExplorer() {
  const [activeStage, setActiveStage] = useState(1);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [focusedStage, setFocusedStage] = useState<number | null>(null);
  const displayedStage = hoveredStage ?? focusedStage ?? activeStage;

  return (
    <div className={styles.explorer}>
      <ProgrammeField stage={displayedStage} />
      <ol className={styles.stageList}>
        {stages.map((stage, index) => (
          <li className={styles.stageItem} key={stage.number}>
            <button
              className={`${styles.stageButton} ${activeStage === index ? styles.stageButtonActive : ""}`}
              type="button"
              aria-pressed={activeStage === index}
              onClick={() => setActiveStage(index)}
              onMouseEnter={() => setHoveredStage(index)}
              onMouseLeave={() => setHoveredStage(null)}
              onFocus={() => setFocusedStage(index)}
              onBlur={() => setFocusedStage(null)}
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
        <span>{stages[displayedStage].number} / {stages[displayedStage].title}</span>
        <p>{stages[displayedStage].body}</p>
      </div>
    </div>
  );
}
