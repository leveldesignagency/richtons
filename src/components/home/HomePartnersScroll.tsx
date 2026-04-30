"use client";

import Image from "next/image";
import FadeInOnView from "@/components/FadeInOnView";
import styles from "@/app/page.module.css";

export type PartnerLogo = {
  name: string;
  src: string;
};

type HomePartnersScrollProps = {
  logos: readonly PartnerLogo[];
};

export default function HomePartnersScroll({ logos }: HomePartnersScrollProps) {
  return (
    <section id="partners" className={styles.logoMarquee} aria-label="Trusted partner logos">
      <FadeInOnView className={styles.logoMarqueeInner}>
        <div className={styles.marqueeViewport}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((segment) => (
              <div
                key={segment}
                className={styles.marqueeSegment}
                aria-hidden={segment === 1}
              >
                {logos.map((logo) => (
                  <div key={`${segment}-${logo.name}`} className={styles.logoPill}>
                    <Image
                      src={logo.src}
                      alt={segment === 0 ? `${logo.name} logo` : ""}
                      width={180}
                      height={54}
                      className={styles.partnerLogo}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeInOnView>
    </section>
  );
}
