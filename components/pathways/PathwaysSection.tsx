"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useEffect, useRef } from "react";
import logo from "../../public/photos/logo.png";
import { PathwaysScene } from "./PathwaysScene";
import styles from "./pathways.module.css";

const pathways = [
  {
    number: "01",
    title: "UP: Sessions",
    tag: "Entry",
    status: "Open",
    tone: "coral",
  },
  {
    number: "02",
    title: "UP: Hub",
    tag: "Development",
    status: null,
    tone: "gold",
  },
  {
    number: "03",
    title: "UP: Festival",
    tag: "Platform",
    status: null,
    tone: "sage",
  },
  {
    number: "04",
    title: "UP: Mentoring",
    tag: "Leadership",
    status: null,
    tone: "coral",
  },
] as const;

export function PathwaysSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      progress.current = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / travel),
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pathways"
      className={styles.pathways}
      aria-labelledby="pathways-title"
    >
      <header className={styles.sectionHeader}>
        <a className={styles.sectionLogo} href="#home" aria-label="Unsigned Pathways home">
          <Image src={logo} alt="" priority={false} />
        </a>
        <nav className={styles.sectionNav} aria-label="Pathways navigation">
          <a className={styles.active} href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#artists">Artists <span aria-hidden="true">⌄</span></a>
          <a href="#access-programme">Access Programme</a>
          <a href="#partnership">Partnership</a>
          <a href="#more">More <span aria-hidden="true">⌄</span></a>
        </nav>
      </header>

      <div className={styles.scene} aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [0, 0, 32], fov: 28, near: 0.1, far: 80 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <PathwaysScene progress={progress} />
        </Canvas>
      </div>

      <div className={styles.intro}>
        <p className={styles.eyebrow}>Our pathways <span aria-hidden="true" /></p>
        <h2 id="pathways-title">Four pathways.</h2>
        <p className={styles.script}>One ecosystem.</p>
        <p className={styles.description}>
          Enter where you are. Progress when you are ready. Every stage is
          artist-led and free to access.
        </p>
      </div>

      <div className={styles.pathwayList}>
        {pathways.map((pathway, index) => (
          <article
            className={`${styles.pathwayCopy} ${styles[`pathway${index + 1}`]}`}
            id={pathway.title.toLowerCase().replace(/\W+/g, "-")}
            key={pathway.number}
          >
            <a href={`#${pathway.title.toLowerCase().replace(/\W+/g, "-")}`}>
              <span className={`${styles.number} ${styles[pathway.tone]}`}>
                {pathway.number}
              </span>
              <h3>{pathway.title}</h3>
              <span className={styles.tags}>
                <span className={`${styles.tag} ${styles[pathway.tone]}`}>
                  {pathway.tag}
                </span>
                {pathway.status && (
                  <span className={styles.status}>
                    <i aria-hidden="true" /> {pathway.status}
                  </span>
                )}
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
