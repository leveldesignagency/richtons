"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import FadeInOnView from "@/components/FadeInOnView";
import FadeInStagger from "@/components/FadeInStagger";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import { contact } from "@/lib/contact";
import { serviceDetails } from "@/lib/services";
import aboutStyles from "../about/page.module.css";
import styles from "./page.module.css";

const emergencyCalloutImageSrc = `/${encodeURIComponent("24:7 service.png")}`;

export default function ServicesPage() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    if (!showEmergencyModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowEmergencyModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showEmergencyModal]);

  return (
    <main className={aboutStyles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/news" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className={aboutStyles.hero}>
        <div className={aboutStyles.heroContent}>
          <FadeInOnView>
            <p className={aboutStyles.eyebrow}>Services</p>
          </FadeInOnView>
          <FadeInOnView delay={75}>
            <h1>Asbestos & Environmental Services</h1>
          </FadeInOnView>
          <FadeInOnView delay={140}>
            <p className={aboutStyles.heroLead}>
              Richtons delivers compliant, safety-led management, removal, surveying,
              and remediation with responsive nationwide support for planned and
              emergency works.
            </p>
          </FadeInOnView>
          <FadeInStagger className={styles.servicesHeroTrust}>
            <div className={styles.servicesHeroStat}>
              <strong>24/7</strong>
              <span>Emergency Support</span>
            </div>
            <div className={styles.servicesHeroStat}>
              <strong>UK</strong>
              <span>Nationwide Delivery</span>
            </div>
            <div className={styles.servicesHeroStat}>
              <strong>100%</strong>
              <span>Compliance Focus</span>
            </div>
          </FadeInStagger>
        </div>
      </section>

      <section id="services-list" className={aboutStyles.sectorsSection}>
        <div className={aboutStyles.sectorsSectionInner}>
          <FadeInOnView className={styles.servicesHeading}>
            <RevealWordsOnScroll
              tone="dark"
              revealTiming="fast"
              text="Services"
              className={`${styles.servicesTitle} ${styles.servicesTitleReveal}`}
            />
          </FadeInOnView>

          <FadeInStagger className={styles.hubGrid}>
            {serviceDetails.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.hubCard}
              >
                <div className={styles.hubCardMedia} aria-hidden>
                  <Image
                    src={service.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                    className={styles.hubCardImage}
                  />
                  <div className={styles.gridCardFeather} />
                </div>
                <span className={styles.hubCardArrow} aria-hidden>
                  <ArrowUpRight
                    className={styles.hubCardArrowIcon}
                    size={24}
                    strokeWidth={2.35}
                    aria-hidden
                  />
                </span>
                <div className={styles.hubCardBody}>
                  <h3 className={styles.hubCardTitle}>{service.title}</h3>
                </div>
              </Link>
            ))}
            <button
              type="button"
              className={`${styles.calloutCard} ${styles.calloutCardButton}`}
              onClick={() => setShowEmergencyModal(true)}
              aria-haspopup="dialog"
              aria-controls="emergency-callout-modal"
            >
              <div className={styles.calloutCardMedia} aria-hidden>
                <Image
                  src={emergencyCalloutImageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                  className={styles.calloutCardImage}
                />
                  <div className={styles.gridCardFeather} />
              </div>
              <div className={styles.calloutCardBody}>
                <p>Emergency Call-Outs 24/7</p>
              </div>
            </button>
          </FadeInStagger>
        </div>
      </section>

      {showEmergencyModal ? (
        <div
          className={styles.emergencyModalBackdrop}
          onClick={() => setShowEmergencyModal(false)}
        >
          <div
            id="emergency-callout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="emergency-callout-title"
            className={styles.emergencyModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.emergencyModalClose}
              onClick={() => setShowEmergencyModal(false)}
              aria-label="Close emergency call-out modal"
            >
              ×
            </button>
            <p className={styles.emergencyModalEyebrow}>Emergency Support</p>
            <h3 id="emergency-callout-title">Need urgent assistance?</h3>
            <p className={styles.emergencyModalText}>
              Our emergency response team is available 24/7. Call now for immediate
              help or email your site details.
            </p>
            <div className={styles.emergencyModalActions}>
              <a href={contact.tel} className={styles.emergencyActionPrimary}>
                Call {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}?subject=Emergency%20Call-Out%20Request`}
                className={styles.emergencyActionSecondary}
              >
                Email {contact.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <FadeInOnView>
        <SiteFooter servicesHref="/services" />
      </FadeInOnView>
    </main>
  );
}
