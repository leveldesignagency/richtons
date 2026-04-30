import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/lib/contact";
import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact us | Richtons Environmental Services",
  description:
    "Contact Richtons for asbestos, hazardous material, and environmental services — call, email, or send an enquiry from this page.",
};

function PhoneIcon() {
  return (
    <svg
      className={styles.svgIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className={styles.svgIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      className={styles.svgIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <SiteHeader
        fullBleedBarUntilScroll
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section
        className={styles.contactSection}
        aria-labelledby="contact-page-heading"
      >
        <div className={styles.contactSectionInner}>
          <div className={styles.contactLayout}>
            <div className={styles.contactBoard}>
              <div className={styles.contactBoardGrid}>
                <aside
                  className={styles.leftColumn}
                  aria-label="Contact details and office hours"
                >
                  <h1 className={styles.contactTitle} id="contact-page-heading">
                    Let&rsquo;s start a conversation
                  </h1>
                  <div className={styles.detailsBody}>
                    <ul className={styles.detailList}>
                      <li className={styles.detailItem}>
                        <div className={styles.detailIcon} aria-hidden>
                          <PhoneIcon />
                        </div>
                        <div className={styles.detailBody}>
                          <span className={styles.detailLabel}>Phone</span>
                          <a className={styles.contactLink} href={contact.tel}>
                            {contact.phoneDisplay}
                          </a>
                        </div>
                      </li>
                      <li className={styles.detailItem}>
                        <div className={styles.detailIcon} aria-hidden>
                          <MailIcon />
                        </div>
                        <div className={styles.detailBody}>
                          <span className={styles.detailLabel}>Email</span>
                          <a
                            className={styles.contactLink}
                            href={`mailto:${contact.email}`}
                          >
                            {contact.email}
                          </a>
                        </div>
                      </li>
                      <li className={styles.detailItem}>
                        <div className={styles.detailIcon} aria-hidden>
                          <MapIcon />
                        </div>
                        <div className={styles.detailBody}>
                          <span className={styles.detailLabel}>Address</span>
                          <a
                            href={contact.mapSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.contactLink} ${styles.mapLink}`}
                          >
                            <span className={styles.addrLines}>
                              {contact.address.lines.map((line) => (
                                <span key={line}>{line}</span>
                              ))}
                            </span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <p className={styles.hours}>
                    <strong>Office hours</strong>
                    <br />
                    Monday to Friday, 8:00&thinsp;am – 5:00&thinsp;pm. For
                    out-of-hours emergencies, please call and follow the
                    instructions on the line.
                  </p>
                </aside>

                <div className={styles.formColumn}>
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Send an enquiry</h2>
                    <p className={styles.formIntro}>
                      Tell us what you need and the best way to get back to you.
                      We usually reply within one business day.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
