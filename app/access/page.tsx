import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { EditorialModelScene } from "../../components/three/EditorialModelScene";
import { EnquiryForm } from "./EnquiryForm";
import { ProgrammeExplorer, ThemeMixer } from "./ProgrammeExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Access Programme | Unsigned Pathway",
  description:
    "Artist-led music and creative programmes for young people aged 11 to 18, delivered with schools, youth services and community organisations.",
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
    body: "Curriculum-aware creative sessions shaped around your timetable and learners.",
  },
  {
    number: "02",
    title: "Youth services",
    body: "Flexible delivery that meets young people where they already feel comfortable.",
  },
  {
    number: "03",
    title: "Community organisations",
    body: "Collaborative programmes built around local need, space and opportunity.",
  },
] as const;

export default function AccessPage() {
  return (
    <div className={styles.page}>
      <main id="home">
        <section className={styles.hero} aria-labelledby="access-title">
          <div className={styles.heroCopy}>
            <SectionLabel>Access programme / 11-18</SectionLabel>
            <h1 id="access-title">
              Creative access
              <br />
              for young people
            </h1>
            <p className={styles.heroIntro}>
              Artist-led music programmes for ages 11-18, delivered with schools,
              youth services and community organisations.
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
            <div><dt>Ages</dt><dd>11-18</dd></div>
            <div><dt>Delivery</dt><dd>Flexible</dd></div>
            <div><dt>Format</dt><dd>Artist-led</dd></div>
          </dl>
          <p className={styles.pageMarker} aria-hidden="true">01 / 05</p>
        </section>

        <section className={styles.programme} id="programme" aria-labelledby="programme-title">
          <div className={styles.sectionIntro}>
            <div>
              <SectionLabel>Our pathway. Their future.</SectionLabel>
              <h2 id="programme-title">Discover.<br />Develop.<br />Share</h2>
            </div>
            <p>
              A flexible programme that takes young people from their first creative
              session to something they can perform, record or share.
            </p>
          </div>
          <ProgrammeExplorer />
          <p className={styles.pageMarker} aria-hidden="true">02 / 05</p>
        </section>

        <section className={styles.themes} aria-labelledby="themes-title">
          <div className={styles.themesHeading}>
            <SectionLabel>Explore the themes.</SectionLabel>
            <h2 id="themes-title">Turn<br />the dial</h2>
          </div>
          <ThemeMixer />
          <ul className={styles.themeOutcomes}>
            <li>Confidence</li>
            <li>Collaboration</li>
            <li>Creative industries</li>
          </ul>
          <p className={styles.pageMarker} aria-hidden="true">03 / 05</p>
        </section>

        <section className={styles.delivery} aria-labelledby="delivery-title">
          <SectionLabel>Built around your setting.</SectionLabel>
          <h2 className={styles.visuallyHidden} id="delivery-title">Where the Access programme is delivered</h2>
          <div className={styles.settingGrid}>
            {settings.map((setting) => (
              <article className={styles.setting} key={setting.number}>
                <p>{setting.number}</p>
                <h3>{setting.title}</h3>
                <p>{setting.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.deliveryNote}>
            <p>Programme length, group size and delivery are agreed around your setting.</p>
            <ul>
              <li>Scotland + UK</li>
              <li>Safeguarding agreed</li>
              <li>Delivery adaptable</li>
            </ul>
          </div>
          <p className={styles.pageMarker} aria-hidden="true">04 / 05</p>
        </section>

        <section className={styles.enquiry} id="enquire" aria-labelledby="enquiry-title">
          <div className={styles.enquiryHeading}>
            <SectionLabel>Ready to start?</SectionLabel>
            <h2 id="enquiry-title">Let&apos;s make<br />something<br />happen</h2>
          </div>
          <p className={styles.enquiryIntro}>
            Tell us about your group and what you would like young people to get from
            the programme.
          </p>
          <EnquiryForm />
          <p className={styles.pageMarker} aria-hidden="true">05 / 05</p>
        </section>
      </main>

      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
