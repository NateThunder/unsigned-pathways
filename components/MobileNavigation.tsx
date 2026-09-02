"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../app/page.module.css";

const links = [
  ["Home", "/#home"],
  ["About", "/about"],
  ["Artists", "/artists"],
  ["Access Programme", "/access"],
  ["Partnership", "/partnership"],
  ["UP Festival", "/up-festival"],
] as const;

const moreLinks = [
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
] as const;

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsMoreOpen(false);
    setIsOpen(false);
  };

  return (
    <div className={styles.mobileNavigation}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => {
          if (isOpen) setIsMoreOpen(false);
          setIsOpen((open) => !open);
        }}
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
            <Link key={href} href={href} onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
              {label}
            </Link>
          ))}
          <div className={styles.mobileMore}>
            <button
              type="button"
              aria-expanded={isMoreOpen}
              aria-controls="mobile-more-navigation"
              onClick={() => setIsMoreOpen((open) => !open)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span>More</span>
              <span aria-hidden="true">{isMoreOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`${styles.mobileMorePanel} ${isMoreOpen ? styles.mobileMorePanelOpen : ""}`}
              id="mobile-more-navigation"
              aria-hidden={!isMoreOpen}
            >
              <div>
                {moreLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    tabIndex={isOpen && isMoreOpen ? 0 : -1}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
