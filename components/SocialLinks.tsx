import styles from "./socialLinks.module.css";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/unsignedpathway",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle className={styles.fill} cx="17.4" cy="6.6" r="1" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@unsignedpathway",
    path: <path d="M14.2 3v11.15a4.65 4.65 0 1 1-4-4.6v3.15a1.65 1.65 0 1 0 1 1.52V3h3Zm0 0c.35 2.15 1.6 3.55 3.8 3.95V10a7.2 7.2 0 0 1-3.8-1.45" />,
  },
] as const;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <nav className={`${styles.links}${className ? ` ${className}` : ""}`} aria-label="Social media">
      {socialLinks.map((social) => (
        <a
          href={social.href}
          aria-label={social.label}
          key={social.label}
          rel="noreferrer"
          target="_blank"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            {social.path}
          </svg>
        </a>
      ))}
    </nav>
  );
}
