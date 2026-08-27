import { IBM_Plex_Mono } from "next/font/google";
import { AboutScrambleLink } from "./AboutScrambleLink";
import { PathwayChain } from "./PathwayChain";
import styles from "./about.module.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

const pathways = [
  {
    number: "01",
    stage: "Entry",
    title: "UP: Sessions",
    description:
      "Open live sessions where artists can test material, build confidence, and take a first step.",
  },
  {
    number: "02",
    stage: "Development",
    title: "UP: Hub",
    description:
      "Focused development that helps artists shape their sound, identity, and next moves.",
  },
  {
    number: "03",
    stage: "Access",
    title: "UP: Access",
    description:
      "Opportunities, showcases, and support that connect artists with wider audiences.",
  },
  {
    number: "04",
    stage: "Partnership",
    title: "UP: Partnership",
    description:
      "Collaborations with venues, organisations, and partners to build lasting impact.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      className={`${styles.about} ${ibmPlexMono.variable}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <div className={styles.introduction}>
          <div className={styles.headingSide}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" /> About Unsigned Pathway
            </p>
            <h2 id="about-title">
              Four
              <br />
              pathways.
              <br />
              One artist-led
              <br />
              ecosystem<span className={styles.blueFullStop}>.</span>
            </h2>
          </div>

          <div className={styles.copySide}>
            <p>
              Unsigned Pathway is a practical, artist-led route for performers
              to develop their craft, reach real audiences, and grow into
              sustainable careers.
            </p>
            <p>
              We combine creative guidance, real-world experience, and industry
              connections to help artists build confidence, clarity, and
              momentum.
            </p>
            <p>
              Four pathways. One ecosystem. Designed to meet you where you are,
              and take you further.
            </p>
            <AboutScrambleLink />
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.pathways}>
          <PathwayChain />

          {pathways.map((pathway, index) => (
            <article
              className={styles.pathway}
              style={{ "--pathway-index": index } as React.CSSProperties}
              key={pathway.number}
            >
              <p className={styles.pathwayMeta}>
                <span>{pathway.number}</span>
                <span aria-hidden="true">--</span>
                {pathway.stage}
              </p>
              <h3>{pathway.title}</h3>
              <div className={styles.routeSpace} aria-hidden="true" />
              <p className={styles.description}>{pathway.description}</p>
            </article>
          ))}
        </div>
      </div>

      <span className={`${styles.corner} ${styles.topLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.topRight}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bottomLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bottomRight}`} aria-hidden="true" />
      <div className={styles.visualNoise} aria-hidden="true" />
    </section>
  );
}
