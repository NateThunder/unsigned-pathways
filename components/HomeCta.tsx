import Link from "next/link";
import styles from "./homeCta.module.css";

const actions = [
  { href: "/access", label: "Apply as an artist" },
  { href: "/partnership", label: "Partner with us" },
] as const;

export function HomeCta() {
  return (
    <section className={styles.cta} aria-labelledby="home-cta-title">
      <div className={styles.intro}>
        <h2 id="home-cta-title">Work With Us</h2>
        <p className={styles.copy}>
          We partner with artists, schools and organisations to create meaningful
          opportunities through music, creativity and structured development.
        </p>
      </div>

      <div className={styles.actions}>
        {actions.map((action) => (
          <Link className={styles.action} href={action.href} key={action.href}>
            <span>{action.label}</span>
            <span className={styles.arrow} aria-hidden="true">&#8599;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
