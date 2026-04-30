import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { contact } from "@/lib/contact";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  /** Services page route. */
  servicesHref?: string;
};

export default function SiteFooter({
  servicesHref = "/services",
}: SiteFooterProps) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerTop}>
        <Image
          src="/Richtons Logo-03.svg"
          alt="Richtons Environmental Services"
          width={960}
          height={210}
          className={styles.footerLogo}
        />
      </div>

      <nav className={styles.footerNav} aria-label="Footer">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href={servicesHref}>Services</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className={styles.footerMain}>
        <div className={styles.footerInfo}>
          <h2>Contact Us Today</h2>
          <div className={styles.footerContactList}>
            <a href={contact.tel} className={styles.footerContactLink}>
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={styles.footerContactLink}
            >
              {contact.email}
            </a>
            <a
              href={contact.mapSearchUrl}
              className={styles.footerContactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.address.singleLine}
            </a>
          </div>
        </div>

        <div className={styles.footerAction}>
          <Button
            label="Start your project"
            href="/contact"
            size="lg"
            effect="glow"
          />
        </div>
      </div>

      <div className={styles.footerCompany}>
        <p>Company Number: {contact.companyNumber}</p>
      </div>

      <div className={styles.footerMeta}>
        <div className={styles.legalLinks}>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/site-map">Sitemap</Link>
        </div>
        <p className={styles.designedBy}>
          Designed by{" "}
          <a
            href="https://www.leveldesignagency.com"
            target="_blank"
            rel="noreferrer"
          >
            LEVEL DESIGN AGENCY
          </a>
        </p>
      </div>
    </footer>
  );
}
