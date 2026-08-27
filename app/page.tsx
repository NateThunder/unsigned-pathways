import Image from "next/image";
import { AboutSection } from "../components/about/AboutSection";
import { BenefitsSection } from "../components/benefits/BenefitsSection";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { Footer } from "../components/Footer";
import { MobileNavigation } from "../components/MobileNavigation";
import logo from "../public/photos/flat logo.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main>
        <section className={styles.hero} id="home" aria-label="Unsigned Pathways">
          <Image className={styles.logo} src={logo} alt="Unsigned Pathways" priority />
          <DesktopNavigation />
          <MobileNavigation />
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source
              src="/videos/No_Copyright_Studio_Footage_Music_Recording_Studio_Video_Royalty_Free_Video-oglxG9AkBQM.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.videoShade} aria-hidden="true" />
        </section>
        <AboutSection />
        <BenefitsSection />
      </main>
      <Footer />
    </>
  );
}
