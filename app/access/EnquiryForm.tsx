"use client";

import { ScrambleLabel } from "../../components/ScrambleLabel";
import { FormEvent } from "react";
import styles from "./page.module.css";

export function EnquiryForm() {
  function openEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const organisation = String(data.get("organisation") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent("Access programme enquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${organisation}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:hello@unsignedpathway.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className={styles.enquiryForm} onSubmit={openEnquiry}>
      <div className={styles.fieldRow}>
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Organisation</span>
          <input name="organisation" autoComplete="organization" />
        </label>
      </div>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>What are you looking for?</span>
        <textarea name="message" rows={4} required />
      </label>
      <div className={styles.formActions}>
        <button type="submit">Send enquiry</button>
        <a href="mailto:hello@unsignedpathway.com?subject=Access%20programme%20mailing%20list">
          <ScrambleLabel>Join the mailing list</ScrambleLabel>
        </a>
      </div>
    </form>
  );
}
