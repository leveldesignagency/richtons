import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { aboutPageSectors } from "@/lib/about-sectors";
import { contact } from "@/lib/contact";
import { serviceDetails } from "@/lib/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sitemap | Richtons Environmental Services",
  description:
    "Browse every area of the site, main destinations in one row, with relevant subsection links grouped underneath.",
};

type MapColumn = {
  href: string;
  label: string;
  description: string;
  sublinks: { label: string; href: string }[];
};

const SITE_MAP_COLUMNS: MapColumn[] = [
  {
    href: "/",
    label: "Home",
    description: "Landing page sections",
    sublinks: [
      { label: "Partner logos", href: "/#partners" },
      { label: "Everything you need to know", href: "/#about" },
      { label: "The Work We Do", href: "/#services" },
      { label: "24/7 emergency support band", href: "/#emergency" },
      { label: "Meet the team", href: "/#team" },
      { label: "Core values", href: "/#values" },
    ],
  },
  {
    href: "/about",
    label: "About",
    description: "Company story & sectors",
    sublinks: [
      { label: "Sectors we support", href: "/about#sectors" },
      ...aboutPageSectors.map((sector, index) => ({
        label: sector.title,
        href: `/about#sector-tab-${index}`,
      })),
    ],
  },
  {
    href: "/services",
    label: "Services",
    description: "Programmes & detail pages",
    sublinks: serviceDetails.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Featured programmes",
    sublinks: [{ label: "Selected project work", href: "/projects" }],
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Reach the team",
    sublinks: [
      { label: "Contact form & office details", href: "/contact" },
      { label: contact.phoneDisplay, href: contact.tel },
      { label: contact.email, href: `mailto:${contact.email}` },
    ],
  },
  {
    href: "/careers",
    label: "Careers",
    description: "Join us",
    sublinks: [{ label: "Careers overview", href: "/careers" }],
  },
];

export default function SiteMapPage() {
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
        <header className={styles.intro}>
          <h1>Sitemap</h1>
          <p>
            Main destinations across the top, drill into each column for anchors on the
            home page, sector tabs on About, individual service routes, and contact
            shortcuts.
          </p>
        </header>

        <nav className={styles.board} aria-label="Site pages overview">
          <ol className={styles.columnGrid}>
            {SITE_MAP_COLUMNS.map((col) => (
              <li key={col.href} className={styles.column}>
                <div className={styles.columnInner}>
                  <Link href={col.href} className={styles.columnHead}>
                    {col.label}
                  </Link>
                  <p className={styles.columnHint}>{col.description}</p>
                  <ul className={styles.sublist}>
                    {col.sublinks.map((link) => (
                      <li key={`${col.href}-${link.href}-${link.label}`}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.legalStrip}>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <span className={styles.legalSep} aria-hidden>
            |
          </span>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span className={styles.legalSep} aria-hidden>
            |
          </span>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>

        <p className={styles.xmlHint}>
          Machine-readable URL list for search engines:{" "}
          <a href="/sitemap.xml">sitemap.xml</a>
        </p>
      </main>

      <SiteFooter servicesHref="/services" />
    </div>
  );
}
