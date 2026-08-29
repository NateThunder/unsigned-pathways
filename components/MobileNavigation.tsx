"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../app/page.module.css";

const links = [
  ["Home", "/#home"],
  ["About", "/about"],
  ["Artists", "/#artists"],
  ["Access Programme", "/#access-programme"],
  ["Partnership", "/#partnership"],
  ["More", "/#more"],
] as const;

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.mobileNavigation}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.menuButtonLine} />
        <span className={styles.menuButtonLine} />
      </button>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
