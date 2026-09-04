import { IBM_Plex_Mono } from "next/font/google";
import styles from "./benefits.module.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-benefits-mono",
});

const benefits = [
  {
    number: "01",
    title: "Real opportunities",
    description:
      "Live stages, wider audiences and practical routes into the next part of your career.",
  },
  {
    number: "02",
    title: "Creative development",
    description:
      "Honest guidance around your sound, confidence, performance and artist identity.",
  },
  {
    number: "03",
    title: "Community and support",
    description:
      "A network of artists, mentors and partners who understand the journey.",
  },
  {
    number: "04",
    title: "Access and inclusion",
    description:
      "Free pathways designed to reduce gatekeeping rather than repeat it.",
  },
] as const;

export function BenefitsSection() {
  return (
    <section
      className={`${styles.benefits} ${ibmPlexMono.variable}`}
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <span className={`${styles.corner} ${styles.topLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.topRight}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bottomLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bottomRight}`} aria-hidden="true" />

      <header className={styles.heading}>
        <p className={styles.eyebrow}>Why it matters</p>
        <h2 id="benefits-title">
          The benefits of
          <br />
          Unsigned Pathway.
        </h2>
        <p className={styles.intro}>
          Talent is everywhere. Access, confidence and credible opportunity are
          not. We build the conditions artists need to move forward.
        </p>
      </header>

      <p className={styles.modelLabel} aria-hidden="true">
        <span>UP / SOUND SYSTEM</span>
        <span>MODEL 01 — ACTIVE</span>
      </p>

      <ol className={styles.list}>
        {benefits.map((benefit, index) => (
          <li
            className={styles.item}
            style={{ "--benefit-index": index } as React.CSSProperties}
            key={benefit.number}
          >
            <span className={styles.number}>{benefit.number}</span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.coordinates} aria-hidden="true">
        <span>SOUND: ACTIVE</span>
        <span>STAGE: DEVELOPMENT</span>
        <span>ACCESS: OPEN</span>
      </div>

      <div className={styles.noise} aria-hidden="true" />
    </section>
  );
}
