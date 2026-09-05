"use client";

import type { FormEvent } from "react";
import styles from "./page.module.css";

export function PartnershipForm() {
  const keepPresentational = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={keepPresentational}>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" />
      </label>
      <label>
        <span>Organisation</span>
        <input name="organisation" type="text" autoComplete="organization" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label className={styles.messageField}>
        <span>Tell us about your interest</span>
        <textarea name="interest" rows={3} />
      </label>
      <button type="submit" aria-disabled="true">
        Send message
      </button>
    </form>
  );
}
