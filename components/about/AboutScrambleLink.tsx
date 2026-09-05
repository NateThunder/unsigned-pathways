import { ScrambleLabel } from "../ScrambleLabel";
import styles from "./about.module.css";

export function AboutScrambleLink() {
  return (
    <a className={styles.aboutLink} href="/about">
      <ScrambleLabel>More about us</ScrambleLabel>
    </a>
  );
}
