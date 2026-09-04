import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { EditorialModelScene } from "../../components/three/EditorialModelScene";
import { EnquiryForm } from "./EnquiryForm";
import { ProgrammeExplorer } from "./ProgrammeExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Access Programme | Unsigned Pathway",
  description:
    "A structured artist-led early intervention programme supporting young people aged 12 to 15 through music, sport and mentoring.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.sectionLabel}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

const settings = [
  {
    number: "01",
    title: "Schools",
  },
  {
    number: "02",
    title: "Councils",
  },
  {
    number: "03",
    title: "Organisations",
  },
  {
    number: "04",
    title: "Youth services",
  },
  {
    number: "05",
    title: "Alternative education provisions (PRUs)",
  },
] as const;

const structure = [
  "12–16 week programme",
  "Weekly structured sessions",
  "Combination of music, sport and mentoring",
  "Delivered in schools or community settings",
] as const;

const outcomes = [
  "Increased confidence and self-expression",
  "Improved behaviour and emotional regulation",
  "Stronger engagement in education and activities",
  "Improved communication and teamwork",
] as const;

const partnerBenefits = [
  "End-to-end structured programme delivery",
  "Artist-led sessions rooted in real experience",
  "Measurable outcomes and progression tracking",
  "Flexible delivery tailored to your organisation",
] as const;

export default function AccessPage() {
  return (
    <div className={styles.page}>
      <main id="home">
        <section className={styles.hero} aria-labelledby="access-title">
          <div className={styles.heroCopy}>
            <SectionLabel>Access programme / Ages 12–15</SectionLabel>
            <h1 id="access-title">
              Early intervention
              <br />
              through creativity
            </h1>
            <p className={styles.heroIntro}>
              UP: ACCESS is a structured early intervention programme supporting young
              people aged 12–15 through music, sport and mentoring, designed to improve
              engagement, behaviour and confidence.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#enquire">
                Enquire about access <span aria-hidden="true">&#8599;</span>
              </a>
              <a className={styles.secondaryAction} href="#programme">
                Explore the programme <span aria-hidden="true">&#8595;</span>
              </a>
            </div>
          </div>

          <div className={styles.heroSignal} aria-hidden="true">
            <div className={styles.heroSignalModel}>
              <EditorialModelScene
                modelPath="/3d/tom_optimized.glb"
                rotation={[-0.18, -0.5, 0.08]}
                targetSize={2.55}
              />
            </div>
            <div className={styles.signalScope}>
              <span />
              <span />
              <span />
            </div>
            <p className={styles.signalWord}>Access</p>
          </div>

          <dl className={styles.heroFacts}>
            <div><dt>Ages</dt><dd>12–15</dd></div>
            <div><dt>Length</dt><dd>12–16 weeks</dd></div>
            <div><dt>Format</dt><dd>Weekly</dd></div>
          </dl>
        </section>

        <section className={styles.programme} id="programme" aria-labelledby="programme-title">
          <div className={styles.sectionIntro}>
            <div>
              <SectionLabel>Artist-led early intervention.</SectionLabel>
              <h2 id="programme-title">Music.<br />Sport.<br />Mentoring</h2>
            </div>
            <p>
              Led by artists with lived experience, UP: ACCESS engages young people in
              ways traditional interventions often cannot.
            </p>
          </div>
          <ProgrammeExplorer />
          <div className={styles.structureSummary}>
            <p>Structure</p>
            <ul>
              {structure.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className={styles.themes} aria-labelledby="themes-title">
          <div className={styles.themesHeading}>
            <SectionLabel>Measured change.</SectionLabel>
            <h2 id="themes-title">Outcomes</h2>
          </div>
          <ul className={styles.themeOutcomes}>
            {outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.delivery} aria-labelledby="delivery-title">
          <div className={styles.deliveryHeading}>
            <h2 id="delivery-title">Who it&apos;s<br />for.</h2>
          </div>
          <ol className={styles.settingGrid}>
            {settings.map((setting) => (
              <li className={styles.setting} key={setting.number}>
                <p aria-hidden="true">{setting.number}</p>
                <h3>{setting.title}</h3>
              </li>
            ))}
          </ol>
          <div className={styles.deliveryNote}>
            <p>
              Each programme is tailored to meet the needs of your organisation and
              the young people you support.
            </p>
            <p>
              Full programme details, delivery models and partnership options are
              available on request.
            </p>
          </div>
        </section>

        <section className={styles.enquiry} id="enquire" aria-labelledby="enquiry-title">
          <div className={styles.enquiryHeading}>
            <SectionLabel>What you get.</SectionLabel>
            <h2 id="enquiry-title">Built to<br />make an<br />impact</h2>
          </div>
          <ul className={styles.enquiryBenefits}>
            {partnerBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
          <EnquiryForm />
        </section>
      </main>

      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
