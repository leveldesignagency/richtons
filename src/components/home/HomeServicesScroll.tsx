"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/Button";
import FadeInOnView from "@/components/FadeInOnView";
import FadeInStagger from "@/components/FadeInStagger";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import type { ServiceDetail } from "@/lib/services";
import styles from "@/app/page.module.css";

function serviceCardBgStyle(imagePath: string): CSSProperties {
  return {
    ["--service-card-image" as string]: `url("${imagePath}")`,
  };
}

type HomeServicesScrollProps = {
  services: readonly ServiceDetail[];
};

export default function HomeServicesScroll({ services }: HomeServicesScrollProps) {
  const first = services[0];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.sectionHeader}>
        <RevealWordsOnScroll
          tone="dark"
          revealTiming="fast"
          text="The Work We Do"
          className={styles.sectionHeaderTitleReveal}
        />
        <FadeInOnView delay={70} className={styles.servicesHeaderViewAllDesktop}>
          <Button label="View all" href="/services" variant="secondary" effect="glow" />
        </FadeInOnView>
      </div>

      <FadeInStagger className={styles.servicesGrid}>
        <Link
          href={first ? `/services/${first.slug}` : "/services"}
          className={styles.serviceCardLink}
        >
          <article
            className={styles.coreServiceCard}
            style={first ? serviceCardBgStyle(first.heroImage) : undefined}
          >
            <span className={styles.arrow}>
              <ArrowUpRight className={styles.arrowIcon} size={28} strokeWidth={2.35} aria-hidden />
            </span>
            <h3>{first?.cardTitle}</h3>
          </article>
        </Link>

        <div className={styles.rightCardsGrid}>
          {services.slice(1).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={styles.serviceCardLink}
            >
              <article className={styles.serviceCard} style={serviceCardBgStyle(service.heroImage)}>
                <span className={styles.arrow}>
                  <ArrowUpRight className={styles.arrowIcon} size={28} strokeWidth={2.35} aria-hidden />
                </span>
                <h3>{service.cardTitle}</h3>
              </article>
            </Link>
          ))}
        </div>
      </FadeInStagger>

      <FadeInOnView delay={90} className={styles.servicesFooterViewAllMobile}>
        <Button label="View all" href="/services" variant="secondary" effect="glow" />
      </FadeInOnView>
    </section>
  );
}
