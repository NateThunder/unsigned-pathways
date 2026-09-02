"use client";

import type { FormEvent } from "react";
import styles from "../information.module.css";

export function ContactForm() {
  const keepPresentational = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.formWrap}>
      <div className={styles.formMeta}>
        <span>Contact form</span>
        <span>Offline for now</span>
      </div>
      <form className={styles.form} onSubmit={keepPresentational}>
        <label className={styles.field}>
          <span>Your name *</span>
          <input name="contact-name" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Reason for contacting us *</span>
          <select name="enquiry-type" defaultValue="" required>
            <option value="" disabled>Select an option</option>
            <option value="Artist opportunity">Artist opportunity</option>
            <option value="ACCESS Programme">ACCESS Programme</option>
            <option value="Partnership">Partnership</option>
            <option value="Press or media">Press or media</option>
            <option value="General question">General question</option>
          </select>
        </label>
        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Message *</span>
          <textarea name="message" rows={5} required />
        </label>
        <label className={styles.consent}>
          <input name="privacy-consent" type="checkbox" value="yes" required />
          <span>
            I have read the <a href="https://unsigned-gateway.netlify.app/privacy">privacy notice</a> and agree that Unsigned Pathway may use this information to respond to my submission. *
          </span>
        </label>
        <button className={styles.submitButton} type="submit" disabled>
          <span>Send enquiry</span>
          <span aria-hidden="true">↗</span>
        </button>
      </form>
    </div>
  );
}
