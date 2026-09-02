import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import styles from "../information.module.css";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Unsigned Pathway",
  description:
    "Answers about eligibility, cost, pathways, applications, ACCESS and partnerships.",
};

const questions = [
  {
    question: "Who can apply as an artist?",
    answer:
      "Solo artists, duos, bands, groups, DJs, producers and collectives aged 16+ may apply. Every group member participating in an opportunity must be at least 16.",
  },
  {
    question: "Do you only support certain genres?",
    answer:
      "No. Unsigned Pathway is open to every genre and creative direction. Use your own words to describe your sound.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. There is no fee to apply for or participate in the artist pathways described on this website.",
  },
  {
    question: "Do I need professional recordings?",
    answer:
      "No. Share the strongest useful link you currently have. A live clip, demo, rehearsal recording or released track can all provide context.",
  },
  {
    question: "Can I apply directly to UP: Hub, Festival or Mentoring?",
    answer:
      "You can register your interest through the artist application. UP: Sessions is the open entry point; later stages are selected according to readiness, fit and available opportunities.",
  },
  {
    question: "Does an application guarantee a place?",
    answer:
      "No. Applications help us understand your work and goals. We contact artists when a suitable opportunity or next step is available.",
  },
  {
    question: "Is Unsigned Pathway Scotland-only?",
    answer:
      "Delivery is Scotland-first, while artist applications are welcomed from across the UK. Location and practical travel requirements are considered for each opportunity.",
  },
  {
    question: "What is the ACCESS Programme?",
    answer:
      "ACCESS is a structured music and creativity workshop series for young people aged 11–18, commissioned through schools and organisations and designed to finish with a live or recorded sharing opportunity.",
  },
  {
    question: "How can an organisation partner with you?",
    answer:
      "Use the partnership enquiry to outline your organisation, location, timeframe and how you would like to support delivery, stages, referrals, funding or artist opportunities.",
  },
  {
    question: "How long will you keep form information?",
    answer:
      "Artist applications and enquiries are retained for up to 12 months unless there is a legal or active operational reason to keep them longer. Newsletter records are kept until unsubscribe or removal.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className={styles.page}>
      <main id="home">
        <section className={styles.faqSection} aria-labelledby="questions-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Need to know</p>
            <h2 id="questions-title">Your route, explained.</h2>
            <p>Open a question to see the answer. If you still need help, use the Contact page.</p>
          </div>
          <div className={styles.faqList}>
            {questions.map((item, index) => (
              <details
                className={styles.faqItem}
                style={{ "--item-index": index } as React.CSSProperties}
                key={item.question}
              >
                <summary>
                  <span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.faqQuestion}>{item.question}</span>
                  <span className={styles.faqIcon} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
