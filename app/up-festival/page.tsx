import type { Metadata } from "next";
import Link from "next/link";
import { SocialLinks } from "../../components/SocialLinks";
import { EditorialModelScene } from "../../components/three/EditorialModelScene";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "UP:Festival | Unsigned Pathway",
  description:
    "UP:Festival brings emerging talent and communities together through live music, creativity and culture.",
};

const festivalDetails = [
  { label: "Date", value: "Coming soon" },
  { label: "Location", value: "Scotland" },
  { label: "Status", value: "In planning" },
] as const;

const festivalLinks = [
  { label: "Explore the festival", href: "#festival" },
  { label: "View artists", href: "/artists" },
  { label: "Get updates", href: "#updates" },
] as const;

function Spark() {
  return (
    <span className={styles.spark} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function UpFestivalPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main} id="home">
        <section className={styles.poster} id="festival" aria-label="UP:Festival">
          <div className={styles.intro}>
            <h1 className={styles.festivalHeading}>
              <span aria-hidden="true" />
              UP:Festival
            </h1>

            <p className={styles.summary}>
              A festival that celebrates emerging talent and brings people together
              through live music, creativity and culture.
            </p>

            <div className={styles.manifesto}>
              <Spark />
              <p>
                A platform.
                <br />
                A celebration.
                <br />
                A movement.
              </p>
            </div>
          </div>

          <div className={styles.emptyStage} aria-label="Three-dimensional festival stage">
            <EditorialModelScene
              autoRotate
              autoRotateSpeed={0.1}
              className={styles.stageCanvas}
              dragToSpin
              modelPath="/3d/stage_optimized.glb"
              rotation={[-0.12, -0.34, 0]}
              targetSize={3.15}
              yawOnly
            />
          </div>

          <aside className={styles.details} aria-label="Festival details">
            <dl>
              {festivalDetails.map((detail) => (
                <div className={styles.detail} key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.planningMark} aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <i key={index} style={{ "--ray": index } as React.CSSProperties} />
              ))}
            </div>

            <div className={styles.updates} id="updates">
              <a href="mailto:hello@unsignedpathway.co.uk?subject=UP%20Festival%20updates">
                Keep me updated <span aria-hidden="true">&#8599;</span>
              </a>
              <p>Sign up for news, artist announcements and more.</p>
            </div>
          </aside>
        </section>

        <nav className={styles.linkRail} aria-label="Festival links">
          {festivalLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <strong>{link.label}</strong>
              <span className={styles.linkArrow} aria-hidden="true">&#8599;</span>
            </Link>
          ))}
        </nav>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Unsigned Pathway C.I.C.</p>
        <nav aria-label="Legal links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="mailto:hello@unsignedpathway.co.uk">Contact</a>
        </nav>
        <SocialLinks className={styles.socials} />
      </footer>

      <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
