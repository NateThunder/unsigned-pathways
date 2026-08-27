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
              <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
          </div>
          <label className={styles.consent}>
            <input name="consent" type="checkbox" required />
            <span>I want email updates and understand I can unsubscribe at any time.</span>
          </label>
        </form>
      </div>
    </footer>
  );
}
