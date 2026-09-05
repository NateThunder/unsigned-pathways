"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";
import styles from "./scrambleLabel.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

/** Animates the label when its enclosing link or button is hovered or focused. */
export function ScrambleLabel({ children }: { children: string }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const control = text?.closest("a, button");
    if (!text || !control) return;

    const reset = () => {
      gsap.killTweensOf(text);
      text.textContent = children;
    };
    const scramble = () => {
      reset();
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        control.matches(":disabled, [aria-disabled='true']")
      ) return;

      gsap.to(text, {
        duration: 0.28,
        ease: "none",
        scrambleText: {
          text: children,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          speed: 1.4,
        },
      });
    };
    const onPointerEnter = (event: Event) => {
      if ((event as PointerEvent).pointerType !== "touch") scramble();
    };
    const onFocus = () => {
      if (control.matches(":focus-visible")) scramble();
    };

    control.addEventListener("pointerenter", onPointerEnter);
    control.addEventListener("pointerleave", reset);
    control.addEventListener("focus", onFocus);
    control.addEventListener("blur", reset);
    return () => {
      control.removeEventListener("pointerenter", onPointerEnter);
      control.removeEventListener("pointerleave", reset);
      control.removeEventListener("focus", onFocus);
      control.removeEventListener("blur", reset);
      reset();
    };
  }, [children]);

  return (
    <span className={styles.label}>
      <span className={styles.sizer}>{children}</span>
      <span ref={textRef} className={styles.text} aria-hidden="true">{children}</span>
    </span>
  );
}
