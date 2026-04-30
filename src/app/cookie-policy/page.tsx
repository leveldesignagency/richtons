import type { Metadata } from "next";
import Link from "next/link";
import LegalReader, { type LegalTocItem } from "@/components/LegalReader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/lib/contact";
import styles from "../../styles/legal-document.module.css";

const LAST_UPDATED = "29 April 2026";

const COOKIE_TOC: LegalTocItem[] = [
  { id: "c-what", tab: "1", title: "What are cookies?" },
  { id: "c-how", tab: "2", title: "How we use cookies" },
  { id: "c-types", tab: "3", title: "Types of cookies" },
  { id: "c-current", tab: "4", title: "Current deployment" },
  { id: "c-third", tab: "5", title: "Third-party content" },
  { id: "c-manage", tab: "6", title: "Managing cookies" },
  { id: "c-changes", tab: "7", title: "Updates" },
  { id: "c-contact", tab: "8", title: "Contact" },
];

export const metadata: Metadata = {
  title: "Cookie Policy | Richtons Environmental Services",
  description:
    "Information about cookies and similar technologies used on the Richtons Environmental Services website.",
};

export default function CookiePolicyPage() {
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
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.lead}>
            This policy explains how our website uses cookies and similar technologies,
            how they support core functionality, and how you can manage preferences.
          </p>

          <LegalReader toc={COOKIE_TOC}>
          <article className={styles.article}>
            <section aria-labelledby="c-what">
              <h2 id="c-what">1. What are cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a
                website. They often include an identifier and help sites remember
                preferences, maintain secure sessions, or understand how pages are used.
                Similar technologies include local storage and pixels — we refer to them
                collectively as “cookies” below unless stated otherwise.
              </p>
            </section>

            <section aria-labelledby="c-how">
              <h2 id="c-how">2. How we use cookies</h2>
              <p>
                We use cookies where necessary to deliver the site reliably and securely,
                and — where we introduce optional analytics or marketing tools — only with
                an appropriate lawful basis under UK GDPR (typically consent for
                non-essential cookies).
              </p>
            </section>

            <section aria-labelledby="c-types">
              <h2 id="c-types">3. Types of cookies</h2>

              <h3>Strictly necessary</h3>
              <p>
                Required for core functions such as security, network management,
                accessibility preferences you choose, load balancing, or remembering your
                cookie choices. These cookies cannot usually be switched off without
                impairing site operation.
              </p>

              <h3>Functional (where enabled)</h3>
              <p>
                May remember UI preferences or optional settings you choose — only where
                implemented on our site.
              </p>

              <h3>Analytics / performance (where enabled)</h3>
              <p>
                Help us understand aggregated traffic (pages viewed, approximate geography,
                devices). Where used, we aim to rely on anonymisation or pseudonymisation
                where feasible and obtain consent before setting non-essential analytics
                cookies.
              </p>

              <h3>Marketing (where enabled)</h3>
              <p>
                Would support relevance measurement across campaigns — only if we deploy
                such tools and obtain consent where legally required.
              </p>
            </section>

            <section aria-labelledby="c-current">
              <h2 id="c-current">4. Current deployment</h2>
              <p>
                Our website is built with modern web tooling that may set strictly necessary
                cookies or storage entries needed for routing, resilience, or developer
                tooling in production environments. Unless we integrate optional analytics
                or advertising scripts that place additional cookies, your experience should
                rely predominantly on essential cookies.
              </p>
              <p>
                For details about personal data linked to cookies, see our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </section>

            <section aria-labelledby="c-third">
              <h2 id="c-third">5. Third-party content</h2>
              <p>
                If we embed maps, videos, social feeds, or other third-party widgets,
                those providers may set their own cookies governed by their privacy notices.
                We recommend reviewing their policies when you interact with embedded
                content.
              </p>
            </section>

            <section aria-labelledby="c-manage">
              <h2 id="c-manage">6. Managing cookies</h2>
              <p>You can:</p>
              <ul>
                <li>
                  adjust browser settings to block or delete cookies (
                  <a
                    href="https://www.aboutcookies.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AboutCookies.org
                  </a>{" "}
                  provides guidance for common browsers);
                </li>
                <li>
                  use private/incognito browsing modes for temporary sessions (cookies may
                  still be set during the session);
                </li>
                <li>
                  contact us if you have questions about optional cookies we operate —
                  non-essential cookies should support granular consent where supplied via a
                  banner or preference centre when deployed.
                </li>
              </ul>
            </section>

            <section aria-labelledby="c-changes">
              <h2 id="c-changes">7. Updates</h2>
              <p>
                We may revise this Cookie Policy when our technologies or practices
                change. Please revisit this page periodically; the “Last updated” date above
                reflects the latest revision.
              </p>
            </section>

            <section aria-labelledby="c-contact">
              <h2 id="c-contact">8. Contact</h2>
              <p>
                Cookie-related queries:{" "}
                <a href={`mailto:${contact.email}?subject=Cookie%20policy%20enquiry`}>
                  {contact.email}
                </a>
                . Postal address: {contact.address.singleLine}.
              </p>
            </section>

            <p className={styles.note}>
              Align this policy with any consent banner or analytics vendor factsheets you
              adopt — update cookie inventories whenever marketing or analytics scripts are
              added to the site.
            </p>
          </article>
          </LegalReader>
        </div>
      </main>

      <SiteFooter servicesHref="/services" />
    </div>
  );
}
