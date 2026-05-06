import type { Metadata } from "next";
import Link from "next/link";
import LegalReader, { type LegalTocItem } from "@/components/LegalReader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/lib/contact";
import styles from "../../styles/legal-document.module.css";

const LAST_UPDATED = "29 April 2026";

const TERMS_TOC: LegalTocItem[] = [
  { id: "t-intro", tab: "1", title: "Introduction" },
  { id: "t-company", tab: "2", title: "Company details" },
  { id: "t-use", tab: "3", title: "Permitted use" },
  { id: "t-ip", tab: "4", title: "Intellectual property" },
  { id: "t-accuracy", tab: "5", title: "Information on this website" },
  { id: "t-services", tab: "6", title: "Quotations and contracted works" },
  { id: "t-liability", tab: "7", title: "Limitation of liability" },
  { id: "t-links", tab: "8", title: "Third-party links" },
  { id: "t-changes", tab: "9", title: "Changes" },
  { id: "t-law", tab: "10", title: "Governing law" },
  { id: "t-other", tab: "11", title: "Related policies" },
  { id: "t-contact", tab: "12", title: "Contact" },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | Richtons Environmental Services",
  description:
    "Website terms of use for Richtons Environmental Services Limited, access, acceptable use, liability, and governing law.",
};

export default function TermsAndConditionsPage() {
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
          <h1 className={styles.title}>Terms &amp; Conditions</h1>
          <p className={styles.lead}>
            These terms govern your use of this website. Your statutory rights are
            not affected. Professional services are supplied under separate written
            agreements where applicable.
          </p>

          <LegalReader toc={TERMS_TOC}>
          <article className={styles.article}>
            <section aria-labelledby="t-intro">
              <h2 id="t-intro">1. Introduction</h2>
              <p>
                This website is operated by{" "}
                <strong>Richtons Environmental Services Limited</strong> (“we”, “us”,
                “our”). By accessing or using this website you agree to these Terms
                &amp; Conditions. If you do not agree, please stop using the website.
              </p>
            </section>

            <section aria-labelledby="t-company">
              <h2 id="t-company">2. Company details</h2>
              <p>
                Registered office: {contact.address.singleLine}. Company registration
                number: <strong>{contact.companyNumber}</strong>. Primary contact
                email:{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>. Telephone:{" "}
                <a href={contact.tel}>{contact.phoneDisplay}</a>.
              </p>
            </section>

            <section aria-labelledby="t-use">
              <h2 id="t-use">3. Permitted use</h2>
              <p>You may use this website to:</p>
              <ul>
                <li>view information about our organisation and services;</li>
                <li>
                  submit enquiries or instructions where contact forms or links are
                  provided;
                </li>
                <li>
                  navigate to permitted resources we make available from time to time.
                </li>
              </ul>
              <p>You must not:</p>
              <ul>
                <li>
                  misuse the site (including introducing viruses or harmful material,
                  probing vulnerabilities, or attempting unauthorised access);
                </li>
                <li>
                  scrape, harvest, or automate access to our content except as allowed by
                  law or with our prior written consent;
                </li>
                <li>
                  use the site in any way that infringes third-party rights or breaches
                  applicable law.
                </li>
              </ul>
            </section>

            <section aria-labelledby="t-ip">
              <h2 id="t-ip">4. Intellectual property</h2>
              <p>
                Unless stated otherwise, we own or licence the content on this website
                (including text, graphics, logos, layout, and imagery). You may view and
                temporarily cache pages for personal or internal business use. You must
                not copy, reproduce, distribute, or create derivative works from our
                content without permission, except where permitted by law.
              </p>
            </section>

            <section aria-labelledby="t-accuracy">
              <h2 id="t-accuracy">5. Information on this website</h2>
              <p>
                We aim to keep information accurate and up to date. Content is provided
                for general information only and does not constitute technical,
                commercial, or legal advice. Site materials may change without notice.
                Always rely on formal quotations, specifications, risk assessments, and
                contracts issued for your specific project.
              </p>
            </section>

            <section aria-labelledby="t-services">
              <h2 id="t-services">6. Quotations and contracted works</h2>
              <p>
                Any asbestos, hazardous material, environmental, or related site works
                are subject to survey, assessment, regulatory requirements, and our
                written terms of contract or purchase order documentation agreed at the
                time of engagement. Nothing on this website replaces those contractual
                arrangements. Emergency response descriptions do not guarantee response
                times in every circumstance (traffic, capacity, scope verification).
              </p>
            </section>

            <section aria-labelledby="t-liability">
              <h2 id="t-liability">7. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, we exclude liability for any
                indirect or consequential loss arising from use of this website or
                reliance on its content. Our total aggregate liability arising out of or
                in connection with your use of the website (excluding liability that
                cannot be excluded under applicable law, including death or personal
                injury caused by negligence where applicable) shall not exceed{" "}
                <strong>£100</strong> or the amount you have paid us specifically for use
                of online-only paid features in the twelve months before the claim,
                whichever is higher, unless a mandatory provision requires otherwise.
              </p>
              <p>
                Nothing in these terms excludes liability that cannot legally be excluded.
              </p>
            </section>

            <section aria-labelledby="t-links">
              <h2 id="t-links">8. Third-party links</h2>
              <p>
                Where we link to external websites, those sites are independent; we do
                not endorse their content and are not responsible for their availability,
                policies, or practices.
              </p>
            </section>

            <section aria-labelledby="t-changes">
              <h2 id="t-changes">9. Changes</h2>
              <p>
                We may amend these Terms &amp; Conditions from time to time. The version
                published on this page with an updated “Last updated” date applies when
                you use the site after publication. Continued use constitutes acceptance
                of the revised terms for future visits.
              </p>
            </section>

            <section aria-labelledby="t-law">
              <h2 id="t-law">10. Governing law</h2>
              <p>
                These Terms &amp; Conditions are governed by the laws of England and
                Wales. The courts of England and Wales shall have exclusive jurisdiction,
                subject to any mandatory rights you may have as a consumer where
                applicable.
              </p>
            </section>

            <section aria-labelledby="t-other">
              <h2 id="t-other">11. Related policies</h2>
              <p>
                Our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> explains how we
                handle personal data. Our{" "}
                <Link href="/cookie-policy">Cookie Policy</Link> describes cookies and
                similar technologies.
              </p>
            </section>

            <section aria-labelledby="t-contact">
              <h2 id="t-contact">12. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> or write to us at{" "}
                {contact.address.singleLine}.
              </p>
            </section>

            <p className={styles.note}>
              These terms are intended as a practical template for website use. Your
              solicitor should review them alongside your operational contracts,
              insurance position, and sector regulation for asbestos and environmental
              services.
            </p>
          </article>
          </LegalReader>
        </div>
      </main>

      <SiteFooter servicesHref="/services" />
    </div>
  );
}
