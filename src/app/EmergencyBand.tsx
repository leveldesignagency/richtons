"use client";

import Image from "next/image";
import FadeInOnView from "@/components/FadeInOnView";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import { serviceDetails } from "@/lib/services";
import styles from "./page.module.css";

export default function EmergencyBand() {
  const serviceLabels = serviceDetails.map((service) => service.cardTitle);

  return (
    <section id="emergency" className={styles.emergencyBand}>
      <div className={styles.emergencyVisual} aria-hidden>
        <Image
          src="/nationwide/nationwide-01.svg"
          alt=""
          width={300}
          height={300}
          className={styles.emergencyVisualBack}
        />
        <Image
          src="/nationwide/nationwide-02.svg"
          alt=""
          width={210}
          height={210}
          className={styles.emergencyVisualFront}
        />
      </div>

      <div className={styles.emergencyContent}>
        <RevealWordsOnScroll
          as="p"
          tone="green"
          revealTiming="default"
          text="We offer a round the clock service, day or night, week or weekend."
          className={styles.emergencyStatementReveal}
        />
        <FadeInOnView>
          <div className={styles.emergencyServicesMask} aria-label="Service list">
            <div className={styles.emergencyServicesTrack}>
              {[...serviceLabels, ...serviceLabels].map((label, index) => (
                <span key={`${label}-${index}`} className={styles.emergencyServicePill}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </FadeInOnView>
      </div>
    </section>
  );
}
