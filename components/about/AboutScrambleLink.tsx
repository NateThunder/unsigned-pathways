"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef } from "react";
import styles from "./about.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

const label = "More about us";

export function AboutScrambleLink() {
  const labelRef = useRef<HTMLSpanElement>(null);

  const scramble = () => {
    const element = labelRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.killTweensOf(element);
    gsap.to(element, {
      duration: 0.28,
      ease: "none",
      scrambleText: {
        text: label,
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        speed: 1.4,
      },
    });
  };

  const reset = () => {
    const element = labelRef.current;
    if (!element) return;

    gsap.killTweensOf(element);
    element.textContent = label;
  };

  return (
    <a
      className={styles.aboutLink}
      href="#"
      aria-label={label}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onFocus={scramble}
      onBlur={reset}
    >
      <span className={styles.scrambleLabel} aria-hidden="true">
        <span className={styles.scrambleLabelSizer}>{label}</span>
        <span ref={labelRef} className={styles.scrambleLabelText}>{label}</span>
      </span>
      <span className={styles.aboutLinkArrow} aria-hidden="true">↳</span>
    </a>
  );
}
