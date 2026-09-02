import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import styles from "../information.module.css";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Unsigned Pathway",
  description:
    "Contact Unsigned Pathway about artist opportunities, programmes, partnerships and general enquiries.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main id="home">
        <section className={styles.contactSection} aria-labelledby="contact-options-title">
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Direct contact</p>
            <h2 id="contact-options-title">Use the route that works for you.</h2>
            <p>
              The form is best for a structured enquiry. You can also email us directly or follow current activity on social media.
            </p>
            <div className={styles.contactLinks}>
              <a href="mailto:hello@unsignedpathway.com">hello@unsignedpathway.com</a>
              <a href="https://www.instagram.com/unsignedpathway" target="_blank" rel="noreferrer">Instagram @unsignedpathway</a>
              <a href="https://www.tiktok.com/@unsignedpathway" target="_blank" rel="noreferrer">TikTok @unsignedpathway</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
