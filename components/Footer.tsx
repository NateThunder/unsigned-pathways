import { IBM_Plex_Mono } from "next/font/google";
import styles from "./footer.module.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-footer-mono",
});

export function Footer() {
  return (
    <footer
      className={`${styles.footer} ${ibmPlexMono.variable}`}
      aria-labelledby="newsletter-title"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>[ Stay connected ]</p>
          <h2 className={styles.title} id="newsletter-title">
            Hear about sessions,
            <br />
            opportunities and events.
          </h2>
        </div>

        <form className={styles.form}>
          <label className={styles.label} htmlFor="newsletter-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <div className={styles.subscribeRow}>
            <input
              className={styles.input}
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="name@email.com"
              autoComplete="email"
              required
            />
            <button className={styles.button} type="submit">
              <span>Sign up</span>
              <span className={styles.arrow} aria-hidden="true">&rarr;</span>
            </button>
          </div>
          <label className={styles.consent}>
            <input name="consent" type="checkbox" required />
            <span>I want email updates and understand I can unsubscribe at any time.</span>
          </label>
        </form>
      </div>

      <div className={styles.companyDetails}>
        <section className={styles.companyBlock} aria-labelledby="company-heading">
          <h3 className={styles.detailHeading} id="company-heading">
            Unsigned Pathway C.I.C.
          </h3>
          <p>
            Community Interest Company
            <br />
            Registered in Scotland
            <br />
            No: SC887043
          </p>
        </section>

        <section className={styles.companyBlock} aria-labelledby="purpose-heading">
          <h3 className={styles.detailHeading} id="purpose-heading">Built for</h3>
          <p>
            Real opportunities for artists and
            <br className={styles.desktopBreak} /> young people across Scotland &amp; UK.
          </p>
        </section>
      </div>

      <div className={styles.utilityBar}>
        <p>&copy; 2026 Unsigned Pathway</p>
        <p>SC887043</p>
        <a href="#home">
          Back to top <span aria-hidden="true">&uarr;</span>
        </a>
      </div>
    </footer>
  );
}
