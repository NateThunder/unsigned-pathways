import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Mono } from "next/font/google";
import { Footer } from "../../components/Footer";
import { PathwayChain } from "../../components/about/PathwayChain";
import { AboutHeroScene } from "./AboutHeroScene";
import { CommunityGuitarScene } from "./CommunityGuitarScene";
import { MusicSpeakerScene } from "./MusicSpeakerScene";
import { OpportunityCabScene } from "./OpportunityCabScene";
import { YouthPedalScene } from "./YouthPedalScene";
import styles from "./page.module.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-about-mono",
});

export const metadata: Metadata = {
  title: "About | Unsigned Pathway",
  description:
    "Learn about Unsigned Pathway, our mission, community, and programmes for emerging artists and young people.",
};

const focusAreas = [
  {
    number: "01",
    title: "Music",
    body: "Providing platforms, experience and creative development.",
  },
  {
    number: "02",
    title: "Youth",
    body: "Empowering young people to build confidence and leadership.",
  },
  {
    number: "03",
    title: "Opportunity",
    body: "Opening doors through mentorship, networks and real experiences.",
  },
  {
    number: "04",
    title: "Community",
    body: "Building a safe, inclusive community where everyone can belong.",
  },
] as const;

const programmes = [
  {
    age: "16+",
    title: "Unsigned\nPathway",
    description: "A development platform for emerging artists.",
    points: [
      "Live performance opportunities",
      "Structured artist development",
      "Mentorship and guidance",
      "Access to showcases and platforms",
    ],
  },
  {
    age: "12–15",
    title: "Unsigned\nPathway:\nAccess",
    description:
      "An artist-led early intervention programme supporting young people.",
    points: [
      "Music and creative expression",
      "Sport and physical development",
      "Mentorship and guidance",
    ],
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

function Corners() {
  return (
    <div className={styles.corners} aria-hidden="true">
      <span className={styles.topLeft} />
      <span className={styles.topRight} />
      <span className={styles.bottomLeft} />
      <span className={styles.bottomRight} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className={`${styles.page} ${ibmPlexMono.variable}`}>
      <main id="home">
        <section className={`${styles.section} ${styles.hero}`} aria-labelledby="about-title">
          <div className={styles.heroCopy}>
            <SectionLabel>What is</SectionLabel>
            <h1 id="about-title">
              Unsigned
              <br />
              Pathway?
            </h1>
            <div className={styles.heroBody}>
              <p>
                Unsigned Pathway C.I.C. is a community-led organisation supporting
                emerging artists and young people through music, mentorship, and
                creative opportunities.
              </p>
              <p>
                We create real pathways into the creative industry by removing
                barriers, building confidence, and providing access to spaces where
                talent can grow.
              </p>
            </div>
          </div>
          <div className={styles.heroVisual} aria-label="Blue studio microphone">
            <AboutHeroScene />
          </div>
          <p className={styles.sideLabel} aria-hidden="true">
            About&nbsp; Unsigned&nbsp; Pathway
          </p>
          <a className={styles.scrollCue} href="#focus" aria-label="Continue to our focus areas">
            ↓
          </a>
          <Corners />
        </section>

        <section className={`${styles.section} ${styles.focus}`} id="focus" aria-label="Our focus areas">
          <PathwayChain className={styles.focusRoute} />
          <div className={styles.focusGrid}>
            {focusAreas.map((area, index) => (
              <article
                className={styles.focusItem}
                style={{ "--item-index": index } as React.CSSProperties}
                key={area.number}
              >
                <p className={styles.number}>{area.number}</p>
                <h2>{area.title}</h2>
                <p className={styles.focusDescription}>{area.body}</p>
                {index === 0 && (
                  <div className={styles.musicVisual} aria-label="Blue speaker driver">
                    <MusicSpeakerScene />
                  </div>
                )}
                {index === 1 && (
                  <div className={styles.musicVisual} aria-label="Blue vintage echo pedal">
                    <YouthPedalScene />
                  </div>
                )}
                {index === 2 && (
                  <div className={styles.musicVisual} aria-label="Blue instrument cabinet">
                    <OpportunityCabScene />
                  </div>
                )}
                {index === 3 && (
                  <div className={styles.musicVisual} aria-label="Blue vintage digital mixer">
                    <CommunityGuitarScene />
                  </div>
                )}
              </article>
            ))}
          </div>
          <Corners />
        </section>

        <section className={`${styles.section} ${styles.identity}`} aria-label="Who we are and our mission">
          <div className={styles.whoWeAre}>
            <SectionLabel>Who we are</SectionLabel>
            <p>
              Unsigned Pathway supports emerging artists and young people through
              music, mentorship and real-world opportunities.
            </p>
            <p>
              We exist to break down barriers within the creative industries,
              creating access to opportunities for those often overlooked.
            </p>
          </div>
          <div className={styles.mission}>
            <SectionLabel>Our mission</SectionLabel>
            <h2>
              To create clear, accessible pathways for young people and emerging
              artists through music, personal development, mentorship, education,
              and the creative industries.
            </h2>
          </div>
        </section>

        <section className={`${styles.section} ${styles.programmes}`} aria-labelledby="programmes-title">
          <div className={styles.programmesIntro}>
            <SectionLabel>Our programmes</SectionLabel>
            <p id="programmes-title">Delivered across two core areas.</p>
          </div>
          <div className={styles.programmeGrid}>
            {programmes.map((programme, index) => (
              <article
                className={styles.programme}
                style={{ "--item-index": index } as React.CSSProperties}
                key={programme.age}
              >
                <div className={styles.programmeMain}>
                  <p className={styles.age}>{programme.age}</p>
                  <h2>
                    {programme.title.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <p className={styles.programmeDescription}>{programme.description}</p>
                </div>
                <ul>
                  {programme.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Corners />
        </section>

        <section className={`${styles.section} ${styles.founder}`} aria-labelledby="founder-title">
          <div className={styles.founderPortrait}>
            <Image
              src="/photos/fifi.jpg"
              alt="Fifidiny Greasley, founder of Unsigned Pathway"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              className={styles.founderImage}
            />
          </div>
          <div className={styles.founderCopy}>
            <SectionLabel>The people behind the pathway</SectionLabel>
            <h2 id="founder-title">Our Founder</h2>
            <p className={styles.founderName}>Fifidiny Greasley</p>
            <div className={styles.founderBody}>
              <p>
                Unsigned Pathway was founded by Fifidiny Greasley, an artist with over 10 years of
                trauma-informed experience working with young people in residential
                schools, care and community settings, including those with complex
                behavioural needs.
              </p>
              <p>
                With a background in music and a Bachelor&apos;s degree in Popular Music,
                the organisation is built on both professional experience and lived
                understanding.
              </p>
              <p>
                This combination of professional experience and lived understanding
                allows Unsigned Pathway to connect with individuals in a way
                traditional approaches often cannot — bridging the gap between lived
                experience and real opportunity.
              </p>
            </div>
          </div>
          <Corners />
        </section>

        <section className={`${styles.section} ${styles.team}`} aria-labelledby="team-title">
          <h2 id="team-title" className={styles.teamTitle}>The team</h2>
          <div className={styles.teamGrid}>
            <article className={styles.teamMember} aria-labelledby="sean-title">
              <div className={styles.teamPortrait}>
                <Image
                  src="/photos/Sean.jpg"
                  alt="Sean McLaughlin"
                  fill
                  sizes="(max-width: 600px) 38vw, (max-width: 1000px) 32vw, 20vw"
                  className={styles.teamImage}
                />
              </div>
              <div className={styles.teamCopy}>
              <p className={styles.teamExpertise}>Music education &amp;<br /> creative practice</p>
              <h3 id="sean-title">Séan<br />McLaughlin</h3>
              <div className={styles.teamBody}>
                <p>
                  Séan brings extensive experience in music education, creative
                  practice and community music. His work at the University of the
                  Highlands and Islands spans teaching, programme leadership and
                  the supervision of postgraduate creative research.
                </p>
                <details className={styles.teamProfile}>
                  <summary>Profile</summary>
                  <p>
                  As a director of Make Music Tayside, he supports access to music
                  through free tuition, musical instruments and community
                  workshops, helping more people take part in making music.
                  </p>
                </details>
              </div>
              </div>
            </article>
            <article className={styles.teamMember} aria-labelledby="nathan-title">
              <div className={styles.teamPortrait}>
                <Image
                  src="/photos/Nathan Somevi.png"
                  alt="Nathan Somevi"
                  fill
                  sizes="(max-width: 600px) 38vw, (max-width: 1000px) 32vw, 20vw"
                  className={styles.teamImage}
                />
              </div>
              <div className={styles.teamCopy}>
              <p className={styles.teamExpertise}>Music technology &amp;<br /> creative development</p>
              <h3 id="nathan-title">Nathan<br />Somevi</h3>
              <div className={styles.teamBody}>
                <p>
                  Nathan is an independent musician, composer, creative
                  technologist and software engineer. A jazz guitarist performing
                  across Scotland, he brings first-hand experience of building an
                  independent music career, delivering commissioned work and
                  collaborating with arts organisations.
                </p>
                <details className={styles.teamProfile}>
                  <summary>Profile</summary>
                  <p>
                  Alongside his music, Nathan designs and builds digital platforms
                  for artists, businesses and community organisations, combining
                  creative experience with skills in technology, project delivery
                  and digital strategy.
                  </p>
                </details>
              </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
      <div className={styles.noise} aria-hidden="true" />
    </div>
  );
}
