"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Link from "next/link";
import { useRef } from "react";
import styles from "../app/page.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

const links = [
  ["Home", "/#home"],
  ["About", "/about"],
  ["Artists", "/#artists", true],
  ["Access Programme", "/#access-programme"],
  ["Partnership", "/#partnership"],
  ["More", "/#more", true],
] as const;

function ScrambleLink({ label, href, hasArrow = false }: {
  label: string;
  href: string;
  hasArrow?: boolean;
}) {
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
    <Link href={href} aria-label={label} onMouseEnter={scramble} onMouseLeave={reset} onFocus={scramble} onBlur={reset}>
      <span className={styles.scrambleLabel} aria-hidden="true">
        <span className={styles.scrambleLabelSizer}>{label}</span>
        <span ref={labelRef} className={styles.scrambleLabelText}>{label}</span>
      </span>
      {hasArrow && <span className={styles.navArrow} aria-hidden="true">⌄</span>}
    </Link>
  );
}

export function DesktopNavigation() {
  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      {links.map(([label, href, hasArrow]) => (
        <ScrambleLink key={href} label={label} href={href} hasArrow={hasArrow} />
      ))}
    </nav>
  );
}
