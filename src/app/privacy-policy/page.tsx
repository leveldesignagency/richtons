import type { Metadata } from "next";
import Link from "next/link";
import LegalReader, { type LegalTocItem } from "@/components/LegalReader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/lib/contact";
import styles from "../../styles/legal-document.module.css";

const LAST_UPDATED = "29 April 2026";

const PRIVACY_TOC: LegalTocItem[] = [
  { id: "p-controller", tab: "1", title: "Who we are" },
  { id: "p-collect", tab: "2", title: "Personal data we may collect" },
  { id: "p-use", tab: "3", title: "Purposes and lawful bases" },
  { id: "p-share", tab: "4", title: "Sharing personal data" },
  { id: "p-intl", tab: "5", title: "International transfers" },
  { id: "p-retention", tab: "6", title: "Retention" },
  { id: "p-rights", tab: "7", title: "Your rights" },
  { id: "p-security", tab: "8", title: "Security" },
  { id: "p-changes", tab: "9", title: "Changes to this policy" },
  { id: "p-contact", tab: "10", title: "Contact" },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Richtons Environmental Services",
  description:
    "How Richtons Environmental Services Limited collects, uses, and protects personal data in line with UK data protection law.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lead}>
            We respect your privacy. This policy describes how we collect and use
            personal information when you interact with our website and services, in line
            with the UK General Data Protection Regulation (UK GDPR) and the Data
            Protection Act 2018.
          </p>

          <LegalReader toc={PRIVACY_TOC}>
          <article className={styles.article}>
            <section aria-labelledby="p-controller">
              <h2 id="p-controller">1. Who we are</h2>
              <p>
                The data controller responsible for personal data processed in connection
                with this website and our business operations is{" "}
                <strong>Richtons Environmental Services Limited</strong> (
                <strong>Company No. {contact.companyNumber}</strong>), registered office:{" "}
                {contact.address.singleLine}.
              </p>
              <p>
                General enquiries about privacy:{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> or{" "}
                <a href={contact.tel}>{contact.phoneDisplay}</a>.
              </p>
            </section>

            <section aria-labelledby="p-collect">
              <h2 id="p-collect">2. Personal data we may collect</h2>
              <p>Depending on how you interact with us, we may process:</p>
              <ul>
                <li>
                  <strong>Identity &amp; contact:</strong> name, job title, organisation,
                  postal address, telephone number, email address.
                </li>
                <li>
                  <strong>Communication content:</strong> messages you send via contact
                  forms, email, phone, or post; records of enquiries and follow-up.
                </li>
                <li>
                  <strong>Technical data:</strong> IP address, browser type and version,
                  device identifiers, approximate location derived from IP, pages viewed,
                  referring URLs, timestamps — collected via cookies and similar
                  technologies where applicable (see our{" "}
                  <Link href="/cookie-policy">Cookie Policy</Link>).
                </li>
                <li>
                  <strong>Contract &amp; project data:</strong> information necessary to
                  scope works, quotations, contracts, site visits, emergency response,
                  invoicing, and regulatory reporting — often supplied by you or your
                  representatives.
                </li>
              </ul>
            </section>

            <section aria-labelledby="p-use">
              <h2 id="p-use">3. Purposes and lawful bases</h2>
              <p>We process personal data only where we have a lawful basis under UK GDPR:</p>
              <ul>
                <li>
                  <strong>Contract:</strong> to respond to enquiries, prepare quotations,
                  deliver contracted asbestos/environmental works, invoicing, and related
                  administration.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> to operate and secure our website,
                  analyse aggregated usage trends (where configured), communicate service
                  updates where appropriate, protect against fraud or misuse, and manage
                  business continuity — balanced against your rights.
                </li>
                <li>
                  <strong>Legal obligation:</strong> health &amp; safety, environmental,
                  asbestos-specific regulation, taxation, accounting, and court orders or
                  regulator requests where applicable.
                </li>
                <li>
                  <strong>Consent:</strong> where required for optional cookies or specific
                  marketing communications — you may withdraw consent at any time without
                  affecting processing prior to withdrawal.
                </li>
              </ul>
            </section>

            <section aria-labelledby="p-share">
              <h2 id="p-share">4. Sharing personal data</h2>
              <p>
                We may share data with trusted processors who assist our operations under
                strict contractual terms — for example IT hosting, email delivery,
                accounting systems, or subcontracted specialists involved in delivering
                works with your knowledge where appropriate.
              </p>
              <p>
                We may disclose information where required by law or to protect rights,
                safety, or property. We do not sell personal data.
              </p>
            </section>

            <section aria-labelledby="p-intl">
              <h2 id="p-intl">5. International transfers</h2>
              <p>
                Where personal data is transferred outside the UK/EEA, we ensure appropriate
                safeguards (such as adequacy regulations or approved standard contractual
                clauses) unless a limited exception applies.
              </p>
            </section>

            <section aria-labelledby="p-retention">
              <h2 id="p-retention">6. Retention</h2>
              <p>
                We retain personal data only as long as necessary for the purposes above,
                including statutory retention periods for financial, safety, or asbestos
                documentation where applicable. Retention schedules vary by record type;
                contact us for indicative periods relating to your matter.
              </p>
            </section>

            <section aria-labelledby="p-rights">
              <h2 id="p-rights">7. Your rights</h2>
              <p>Subject to exemptions, you may have the right to:</p>
              <ul>
                <li>access your personal data;</li>
                <li>rectify inaccurate data;</li>
                <li>erase data in certain circumstances;</li>
                <li>restrict processing;</li>
                <li>object to processing based on legitimate interests;</li>
                <li>data portability where processing is automated and contract/consent-based;</li>
                <li>withdraw consent where processing relies on consent;</li>
                <li>
                  lodge a complaint with the Information Commissioner&apos;s Office (
                  <a
                    href="https://ico.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ico.org.uk
                  </a>
                  ).
                </li>
              </ul>
              <p>
                To exercise rights, email{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>. We may request
                verification of identity before responding.
              </p>
            </section>

            <section aria-labelledby="p-security">
              <h2 id="p-security">8. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect
                personal data against unauthorised access, alteration, disclosure, or
                destruction. No online transmission can be guaranteed fully secure.
              </p>
            </section>

            <section aria-labelledby="p-changes">
              <h2 id="p-changes">9. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy periodically. Material changes will be
                reflected here with an updated “Last updated” date. Please review this
                page occasionally.
              </p>
            </section>

            <section aria-labelledby="p-contact">
              <h2 id="p-contact">10. Contact</h2>
              <p>
                Privacy queries:{" "}
                <a href={`mailto:${contact.email}?subject=Privacy%20enquiry`}>
                  {contact.email}
                </a>
                . Postal address: {contact.address.singleLine}.
              </p>
            </section>

            <p className={styles.note}>
              This policy is designed as a practical overview for website visitors and
              clients. Your obligations under asbestos and environmental regulation remain
              governed by statute and contract — seek independent advice where necessary.
            </p>
          </article>
          </LegalReader>
        </div>
      </main>

      <SiteFooter servicesHref="/services" />
    </div>
  );
}
