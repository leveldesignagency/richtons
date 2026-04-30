import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/lib/contact";
import { serviceDetails, servicesBySlug } from "@/lib/services";
import styles from "./page.module.css";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const serviceDeepDiveContent: Record<
  string,
  {
    definition: string;
    surveyingAndManagement: string;
    industryApplications: Array<{ industry: string; application: string }>;
  }
> = {
  "asbestos-surveying-management": {
    definition:
      "Asbestos is a naturally occurring mineral fibre used widely in UK construction products until it was fully banned, because it offered heat resistance and durability. The risk appears when asbestos-containing materials are disturbed and fibres become airborne. Once inhaled, fibres can lodge in the lungs and lead to serious diseases, often with a long latency period. Effective control starts with identifying where asbestos is present, understanding its condition, and preventing uncontrolled disturbance during day-to-day occupation, maintenance, and refurbishment.",
    surveyingAndManagement:
      "Surveying establishes what is present, where it is located, and how likely it is to release fibres. Management then turns that information into an actionable control plan: responsibilities, priority actions, communication routes, and re-inspection schedules. In practice, this means translating technical findings into decisions site teams and dutyholders can use - whether that is safe in-situ management, encapsulation, controlled removal, access restrictions, or permit conditions for contractors.",
    industryApplications: [
      {
        industry: "Education",
        application:
          "Programmes are phased around term dates and daily occupancy, with clear zoning, caretaker briefings, and practical controls to protect pupils, staff, and contractors.",
      },
      {
        industry: "Healthcare",
        application:
          "Surveying and management plans are coordinated with infection control, critical service continuity, and clinical access requirements in sensitive live environments.",
      },
      {
        industry: "Commercial & Offices",
        application:
          "Dutyholders receive structured registers and contractor control processes that support planned maintenance, fit-outs, and landlord/tenant obligations.",
      },
      {
        industry: "Local Authority & Public Estate",
        application:
          "Multi-site portfolios are standardised through consistent templates, prioritised action plans, and governance-ready reporting for audit and budget planning.",
      },
      {
        industry: "Industrial Sites",
        application:
          "Controls are tailored to plant operations, restricted shutdown windows, and high-risk maintenance tasks where robust permit and isolation coordination is essential.",
      },
      {
        industry: "Residential Blocks & Housing",
        application:
          "Management strategies focus on resident safety, communication, and practical sequencing for responsive repairs, void works, and cyclical maintenance.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) {
    return { title: "Service | Richtons Environmental Services" };
  }
  return {
    title: `${service.title} | Richtons Environmental Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  const deepDive = serviceDeepDiveContent[slug];

  if (!service) {
    return (
      <main className={styles.page}>
        <SiteHeader
          links={[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <section className={styles.notFoundSection}>
          <div className={styles.notFoundInner}>
            <h1>Service not found</h1>
          </div>
        </section>
        <SiteFooter servicesHref="/services" />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section
        className={styles.hero}
        style={
          {
            "--hero-bg-image": `url("${service.heroImage}")`,
          } as CSSProperties
        }
      >
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <Link href="/services" className={styles.backToServicesLink}>
              <span className={styles.backArrow} aria-hidden />
              <span>Back to Services</span>
            </Link>
            <p className={styles.eyebrow}>Service Detail</p>
          </div>
          <div className={styles.heroMid}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>{service.heroHeadingLines[0]}</span>
              <span className={styles.heroTitleLine}>{service.heroHeadingLines[1]}</span>
            </h1>
            <p className={styles.heroLead}>{service.shortDescription}</p>
            <div className={styles.heroStats}>
              <span>24/7 Emergency Response</span>
              <span>UK-Wide Delivery</span>
              <span>Compliance-First Approach</span>
            </div>
          </div>
          <div className={styles.quickNav}>
            <p className={styles.quickNavLabel}>Quick navigation</p>
            <div className={styles.quickNavLinks}>
              {serviceDetails
                .filter((item) => item.slug !== service.slug)
                .map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`}>
                    {item.cardTitle}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <article className={styles.overviewCard}>
            <p className={styles.sectionEyebrow}>Overview</p>
            <h2>What this service delivers</h2>
            <p>{service.overview}</p>
            <p>
              We structure every engagement around programme certainty, risk control,
              and clear client communication so stakeholders can make confident
              decisions at every stage.
            </p>
          </article>

          {deepDive ? (
            <article className={styles.deepDiveCard}>
              <p className={styles.sectionEyebrow}>In-Depth Guidance</p>
              <h2>Understanding asbestos surveying and management in practice</h2>
              <div className={styles.deepDiveStack}>
                <div>
                  <h3>What asbestos is and why it must be managed</h3>
                  <p>{deepDive.definition}</p>
                </div>
                <div>
                  <h3>What surveying and management actually involve</h3>
                  <p>{deepDive.surveyingAndManagement}</p>
                </div>
              </div>
              <h3 className={styles.deepDiveSubheading}>
                How this is applied across industries
              </h3>
              <div className={styles.industryGrid}>
                {deepDive.industryApplications.map((item) => (
                  <article key={item.industry} className={styles.industryCard}>
                    <h4>{item.industry}</h4>
                    <p>{item.application}</p>
                  </article>
                ))}
              </div>
            </article>
          ) : null}

          <div className={styles.gridTwo}>
            <article className={styles.detailCard}>
              <p className={styles.sectionEyebrow}>Scope</p>
              <h3>Included within this service</h3>
              <ul className={styles.list}>
                {service.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.detailCard}>
              <p className={styles.sectionEyebrow}>Process</p>
              <h3>How projects are delivered</h3>
              <ol className={styles.listOrdered}>
                {service.process.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>

          <div className={styles.gridTwo}>
            <article className={styles.detailCard}>
              <p className={styles.sectionEyebrow}>Compliance</p>
              <h3>Governance and assurance</h3>
              <ul className={styles.list}>
                {service.compliance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.detailCard}>
              <p className={styles.sectionEyebrow}>Frequently Asked Questions</p>
              <h3>Common client queries</h3>
              <div className={styles.faqStack}>
                {service.faqs.map((faq) => (
                  <div key={faq.q} className={styles.faqItem}>
                    <h4>{faq.q}</h4>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className={styles.ctaStrip}>
            <div>
              <p className={styles.sectionEyebrow}>Need a rapid response?</p>
              <h3>Speak to our team about this service today</h3>
            </div>
            <div className={styles.ctaActions}>
              <a href={contact.tel}>Call {contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>Email {contact.email}</a>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter servicesHref="/services" />
    </main>
  );
}

