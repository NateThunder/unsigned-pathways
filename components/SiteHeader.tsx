import Image from "next/image";
import Link from "next/link";
import logo from "../public/photos/flat logo with blue.png";
import styles from "../app/page.module.css";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  return (
    <>
      <Link href="/#home" aria-label="Unsigned Pathway home">
        <Image className={styles.logo} src={logo} alt="" priority />
      </Link>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}
