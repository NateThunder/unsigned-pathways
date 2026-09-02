import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-artists-mono",
});

export const metadata: Metadata = {
  title: "Artists | Unsigned Pathway",
  description:
    "A free, artist-led pathway built around live experience, creative development, and community.",
};

const stages = [
  {
    number: "01",
    meta: "Entry",
    status: "Open",
    title: "UP: Sessions",
    line: "Start on stage.",
    body: "Open live sessions where artists aged 16+ can perform, experiment, meet other creatives and build real experience in front of an audience.",
    action: "Apply for sessions",
    outcomes: ["Perform live", "Build confidence", "Meet other artists", "Create momentum"],
  },
  {
    number: "02",
    meta: "Development",
    status: "Selected",
    title: "UP: Hub",
    line: "Shape what comes next.",
    body: "Focused development for artists ready to strengthen their music, live performance, creative identity and direction.",
    action: "Explore the hub",
    outcomes: ["Refine your sound", "Develop performance", "Build identity", "Plan your direction"],
  },
  {
    number: "03",
    meta: "Leadership",
    status: "Coming soon",
    title: "UP: Mentoring",
    line: "Grow by giving back.",
    body: "Artists with experience support others earlier in their journey, sharing practical knowledge while developing their own confidence as mentors and creative leaders.",
    action: "Register interest",
    outcomes: ["Mentor", "Lead", "Connect", "Grow"],
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

function ArrowLink({ href, children, inverted = false }: {
  href: string;
  children: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <Link className={`${styles.arrowLink} ${inverted ? styles.arrowLinkInverted : ""}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default function ArtistsPage() {
  return (
    <div className={`${styles.page} ${mono.variable}`}>
      <main id="home">
        <section className={styles.hero} aria-labelledby="artists-title">
          <div className={styles.heroCopy}>
            <SectionLabel>Artists / Pathway</SectionLabel>
            <h1 id="artists-title">
              Start where
              <br />
              you are. Go
              <br />
              further<span>.</span>
            </h1>
            <p className={styles.heroIntro}>
              A free, artist-led pathway built around live experience, creative
              development and community.
            </p>
            <div className={styles.heroActions}>
              <ArrowLink href="#apply" inverted>Apply as an artist</ArrowLink>
              <a className={styles.textLink} href="#pathway">
                Explore the pathway <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroRoute} aria-label="Pathway from sessions to mentoring">
            <div className={styles.heroStatus}>
              <p>Entry: <span>Open</span></p>
              <p>Development: <span>Active</span></p>
              <p>Access: <span>Free</span></p>
            </div>
            <div className={styles.routeTrack} aria-hidden="true">
              <span className={styles.routeStart}>Artist</span>
              <span className={styles.routeLine} />
              {stages.map((stage) => (
                <span className={styles.routeNode} key={stage.number}>
                  <b>{stage.number}</b>
                  <small>{stage.meta}</small>
                </span>
              ))}
            </div>
          </div>
          <p className={styles.pageMarker} aria-hidden="true">01</p>
        </section>

        <section className={styles.overview} id="pathway" aria-labelledby="pathway-title">
          <div>
            <SectionLabel>How it works</SectionLabel>
            <h2 id="pathway-title">One pathway.<br />Three stages.</h2>
          </div>
          <ol className={styles.stageOverview}>
            {stages.map((stage) => (
              <li key={stage.number}>
                <b>{stage.number}</b>
                <span>{stage.meta}</span>
                <small>{stage.status}</small>
              </li>
            ))}
          </ol>
          <p className={styles.overviewNote}>
            You don&apos;t need to arrive with a polished image, industry contacts or a
            perfect CV. Start by making music. Progression happens when you&apos;re ready.
          </p>
          <p className={styles.pageMarker} aria-hidden="true">02</p>
        </section>

        <div className={styles.stages}>
          {stages.slice(0, 2).map((stage, index) => (
            <section className={styles.stage} key={stage.number} aria-labelledby={`stage-${stage.number}`}>
              <p className={styles.bigNumber} aria-hidden="true">{stage.number}</p>
              <div className={styles.stageCopy}>
                <p className={styles.stageMeta}>{stage.number} / {stage.meta}<br />Status / {stage.status}</p>
                <h2 id={`stage-${stage.number}`}>{stage.title}<span aria-hidden="true">.</span></h2>
                <p className={styles.stageLine}>{stage.line}</p>
                <p className={styles.stageBody}>{stage.body}</p>
                <ArrowLink href="#apply">{stage.action}</ArrowLink>
              </div>
              <ol className={styles.outcomes}>
                {stage.outcomes.map((outcome, outcomeIndex) => (
                  <li key={outcome}>
                    <span>{String(outcomeIndex + 1).padStart(2, "0")}</span>
                    {outcome}
                  </li>
                ))}
              </ol>
              <div className={styles.stageField} aria-hidden="true">
                <span>{index === 0 ? "Live / Community / Momentum" : "Sound / Performance / Identity / Direction"}</span>
              </div>
              <p className={styles.pageMarker} aria-hidden="true">0{index + 3}</p>
            </section>
          ))}
        </div>

        <section className={styles.system} aria-labelledby="system-title">
          <p className={styles.systemEyebrow}>UP / Artist development system</p>
          <h2 className={styles.visuallyHidden} id="system-title">Artist development system</h2>
          <div className={styles.systemFlow}>
            <div><small>Input</small><strong>Artist + music</strong></div>
            <span aria-hidden="true">→</span>
            <div><small>01</small><strong>Experience sessions</strong></div>
            <span aria-hidden="true">→</span>
            <div><small>02</small><strong>Development hub</strong></div>
            <span aria-hidden="true">→</span>
            <div><small>03</small><strong>Leadership mentoring</strong></div>
            <span aria-hidden="true">→</span>
            <div><small>Output</small><strong>Confidence + opportunity</strong></div>
          </div>
          <div className={styles.systemSignal}>
            <p>Signal: Active</p>
            <p>Gatekeeping: Off</p>
            <p>Access: Free</p>
            <p>Community: On</p>
          </div>
          <p className={styles.pageMarker} aria-hidden="true">05</p>
        </section>

        <section className={`${styles.stage} ${styles.finalStage}`} aria-labelledby="stage-03">
          <p className={styles.bigNumber} aria-hidden="true">03</p>
          <div className={styles.stageCopy}>
            <p className={styles.stageMeta}>03 / Leadership<br />Status / Coming soon</p>
            <h2 id="stage-03">UP: Mentoring<span aria-hidden="true">.</span></h2>
            <p className={styles.stageLine}>Grow by giving back.</p>
            <p className={styles.stageBody}>{stages[2].body}</p>
            <ArrowLink href="#apply">Register interest</ArrowLink>
          </div>
          <ol className={styles.outcomes}>
            {stages[2].outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {outcome}
              </li>
            ))}
          </ol>
          <div className={styles.stageField} aria-hidden="true"><span>Share / Lead / Connect / Grow</span></div>
          <p className={styles.pageMarker} aria-hidden="true">06</p>
        </section>

        <section className={styles.eligibility} aria-labelledby="eligibility-title">
          <div>
            <SectionLabel>Who can apply?</SectionLabel>
            <h2 id="eligibility-title">You bring<br />the music.</h2>
          </div>
          <ul>
            <li>Solo artists</li>
            <li>Bands</li>
            <li>DJs</li>
            <li>Producers</li>
            <li>Collectives</li>
          </ul>
          <p>16+<br />All genres<br />Scotland + UK<br />Free to access</p>
          <p className={styles.pageMarker} aria-hidden="true">07</p>
        </section>

        <section className={styles.cta} id="apply" aria-labelledby="apply-title">
          <div>
            <p>Your next move</p>
            <h2 id="apply-title">Ready to take<br />the first step?</h2>
            <small>Start with UP: Sessions.</small>
          </div>
          <ArrowLink href="mailto:hello@unsignedpathway.com" inverted>Apply as an artist</ArrowLink>
          <div className={styles.waitlist}>
            <p>Not ready yet?</p>
            <a href="mailto:hello@unsignedpathway.com?subject=Artist%20waiting%20list">Join the waiting list <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.pageMarker} aria-hidden="true">08</p>
        </section>
      </main>

      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
