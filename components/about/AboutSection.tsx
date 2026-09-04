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
    stage: "Entry Pathway",
    title: "Entry",
    description:
      "UP: Sessions are live open mic events for artists aged 16+, creating a space to perform, build confidence and gain real experience in front of an audience.",
  },
  {
    number: "02",
    stage: "Development Pathway",
    title: "Development",
    description:
      "UP: Hub supports selected artists from our live sessions through structured development, helping them refine their sound, build their identity and move towards professional opportunities.",
  },
  {
    number: "03",
    stage: "Platform Pathway",
    title: "Platform",
    description:
      "UP: Festival connects artists to wider audiences, industry exposure and further opportunities through live showcases and events.",
  },
  {
    number: "04",
    stage: "Mentoring Pathway",
    title: "Mentoring",
    description:
      "UP: Mentoring is where artists step into leadership, supporting others while continuing to grow, develop and strengthen the community around them.",
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
              One ecosystem
            </h2>
          </div>

          <div className={styles.copySide}>
            <p>
              Unsigned Pathway is an artist-led, community-focused platform supporting 
              emerging artists and young people through structured programmes, 
              live performance and real-world opportunities.
            </p>
            <p>
              Built on real-life experience, we create practical pathways that help 
              people develop their skills, build confidence and gain meaningful 
              experience within music and the wider creative industries.
            </p>
            <p>
              Our aim is simple: to make progression clearer, opportunities 
              more accessible and give artists and young people the support 
              they need to move forward.
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
