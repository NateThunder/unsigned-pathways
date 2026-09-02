import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Footer } from "../../components/Footer";
import { PartnershipForm } from "./PartnershipForm";
import styles from "./page.module.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-partnership-mono",
});

export const metadata: Metadata = {
  title: "Partnership Programme | Unsigned Pathway",
  description:
    "Work with Unsigned Pathway to invest in talent, strengthen communities and create lasting opportunities.",
};

const reasons = [
  {
    number: "01",
    title: "Real impact",
    body: "Support programmes that create real opportunities for young people and emerging artists.",
  },
  {
    number: "02",
    title: "Stronger communities",
    body: "Help build confident, creative communities where everyone can belong and thrive.",
  },
  {
    number: "03",
    title: "Meaningful connections",
    body: "Align your organisation with creativity, inclusion and the next generation.",
  },
  {
    number: "04",
    title: "Lasting legacy",
    body: "Leave a legacy that inspires talent, strengthens culture and drives change.",
  },
] as const;

const opportunities = [
  {
    icon: "rings",
    title: "Financial support",
    body: "Fund programmes, scholarships and opportunities that break down barriers.",
  },
  {
    icon: "squares",
    title: "Programme partnership",
    body: "Collaborate on projects, workshops, events and creative development initiatives.",
  },
  {
    icon: "diamonds",
    title: "In-kind support",
    body: "Provide skills, venues, equipment or resources that help our community grow.",
  },
  {
    icon: "burst",
    title: "Corporate partnership",
    body: "Build a long-term partnership that aligns your values with real social impact.",
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.sectionLabel}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function PageMarker({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.pageMarker} aria-hidden="true">
      {children}<span />
    </p>
  );
}

function OpportunityIcon({ type }: { type: (typeof opportunities)[number]["icon"] }) {
  return (
    <span className={`${styles.opportunityIcon} ${styles[type]}`} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

export default function PartnershipPage() {
  return (
    <div className={`${styles.page} ${mono.variable}`}>
      <main id="home">
        <section className={styles.hero} aria-labelledby="partnership-title">
          <div className={styles.heroCopy}>
            <SectionLabel>Partnership programme</SectionLabel>
            <h1 id="partnership-title">
              Stronger<br />
              together.<br />
              Greater<br />
              impact<span>.</span>
            </h1>
            <p className={styles.heroIntro}>
              We work with organisations, businesses and funders who believe in
              talent, community and opportunity.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#opportunities">
                Explore partnership <span aria-hidden="true">&#8599;</span>
              </a>
              <a className={styles.secondaryAction} href="#contact">
                Get in touch <span aria-hidden="true">&#8595;</span>
              </a>
            </div>
          </div>

          <dl className={styles.heroFacts}>
            <div><dt>Collaboration</dt><dd>On</dd></div>
            <div><dt>Impact</dt><dd>Real</dd></div>
            <div><dt>Community</dt><dd>Active</dd></div>
          </dl>
          <PageMarker>01</PageMarker>
        </section>

        <section className={styles.reasons} aria-labelledby="reasons-title">
          <div className={styles.sectionHeading}>
            <SectionLabel>Why partner</SectionLabel>
            <h2 id="reasons-title">Partner for<br />change that<br />lasts<span>.</span></h2>
          </div>
          <div className={styles.reasonGrid}>
            {reasons.map((reason, index) => (
              <article
                className={styles.reason}
                style={{ "--index": index } as React.CSSProperties}
                key={reason.number}
              >
                <p className={styles.number}>{reason.number}</p>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </div>
          <PageMarker>02</PageMarker>
        </section>

        <section className={styles.opportunities} id="opportunities" aria-labelledby="opportunities-title">
          <div className={styles.sectionHeading}>
            <SectionLabel>Partnership opportunities</SectionLabel>
            <h2 id="opportunities-title">Work with<br />us in ways<br />that fit<br />your goals<span>.</span></h2>
          </div>
          <div className={styles.opportunityGrid}>
            {opportunities.map((opportunity, index) => (
              <article
                className={styles.opportunity}
                style={{ "--index": index } as React.CSSProperties}
                key={opportunity.title}
              >
                <OpportunityIcon type={opportunity.icon} />
                <h3>{opportunity.title}</h3>
                <p>{opportunity.body}</p>
              </article>
            ))}
          </div>
          <PageMarker>03</PageMarker>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.contactCopy}>
            <SectionLabel>Let&apos;s create together</SectionLabel>
            <h2 id="contact-title">Ready to<br />make an<br />impact<span>?</span></h2>
            <p>
              We&apos;d love to hear how we can work together to support young people,
              artists and communities.
            </p>
          </div>
          <PartnershipForm />
          <PageMarker>04</PageMarker>
        </section>
      </main>

      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
