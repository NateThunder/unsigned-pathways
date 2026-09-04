"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

const links = [
  ["Home", "/#home"],
  ["About", "/about"],
  ["Artists", "/artists"],
  ["Access Programme", "/access"],
  ["Partnership", "/partnership"],
  ["UP:Festival", "/up-festival"],
] as const;

const moreLinks = [
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
] as const;

function useScramble(label: string) {
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

  return { labelRef, reset, scramble };
}

function ScrambleLabel({ label, labelRef }: {
  label: string;
  labelRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <span className={styles.scrambleLabel} aria-hidden="true">
      <span className={styles.scrambleLabelSizer}>{label}</span>
      <span ref={labelRef} className={styles.scrambleLabelText}>{label}</span>
    </span>
  );
}

function ScrambleLink({ label, href }: { label: string; href: string }) {
  const { labelRef, reset, scramble } = useScramble(label);

  return (
    <Link href={href} aria-label={label} onMouseEnter={scramble} onMouseLeave={reset} onFocus={scramble} onBlur={reset}>
      <ScrambleLabel label={label} labelRef={labelRef} />
    </Link>
  );
}

function MoreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { labelRef, reset, scramble } = useScramble("More");

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };

    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={styles.moreDropdown}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        className={styles.moreButton}
        type="button"
        aria-label="More"
        aria-expanded={isOpen}
        aria-controls="more-navigation"
        onClick={() => setIsOpen((open) => !open)}
        onMouseEnter={scramble}
        onMouseLeave={reset}
        onFocus={scramble}
      >
        <ScrambleLabel label="More" labelRef={labelRef} />
        <span className={styles.navArrow} aria-hidden="true" />
      </button>
      <div
        className={`${styles.morePanel} ${isOpen ? styles.morePanelOpen : ""}`}
        id="more-navigation"
        aria-hidden={!isOpen}
      >
        {moreLinks.map(([label, href], index) => (
          <Link
            href={href}
            key={href}
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DesktopNavigation() {
  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      {links.map(([label, href]) => (
        <ScrambleLink key={href} label={label} href={href} />
      ))}
      <MoreDropdown />
    </nav>
  );
}
