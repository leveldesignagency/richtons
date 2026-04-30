"use client";

import type { CSSProperties } from "react";
import {
  Handshake,
  Leaf,
  Lightbulb,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeInOnView from "@/components/FadeInOnView";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import { useSectionScrollProgress } from "@/hooks/useSectionScrollProgress";
import { sliceProgressSnappy, windowProgress } from "@/lib/scrollProgress";
import styles from "@/app/page.module.css";

type ValueBlock = {
  title: string;
  Icon: LucideIcon;
  description: string;
};

const VALUES: readonly ValueBlock[] = [
  {
    title: "Safety",
    Icon: ShieldCheck,
    description:
      "We place care and well-being first in every survey, removal, and reinstatement project.",
  },
  {
    title: "Integrity",
    Icon: Scale,
    description:
      "Clear reporting and transparent communication keep clients informed from start to finish.",
  },
  {
    title: "Innovation",
    Icon: Lightbulb,
    description:
      "Modern methods and practical planning improve outcomes and reduce disruption.",
  },
  {
    title: "Commitment",
    Icon: Handshake,
    description:
      "Our teams deliver consistent quality with responsive support for urgent requirements.",
  },
  {
    title: "Sustainability",
    Icon: Leaf,
    description:
      "Environmental responsibility is built into how we assess, remove, and dispose of materials.",
  },
];

function cannonLift(local: number): number {
  const t = Math.min(1, Math.max(0, (local - 0.03) / 0.58));
  const eased = 1 - Math.pow(1 - t, 2.75);
  let overshoot = 0;
  if (t > 0.74) {
    const u = (t - 0.74) / 0.26;
    overshoot = Math.sin(u * Math.PI) * 6;
  }
  return (1 - eased) * 44 - overshoot;
}

export default function HomeValuesScroll() {
  const { ref, progress } = useSectionScrollProgress();
  const n = Math.max(1, VALUES.length);
  /** Starts deeper into the section; completes earlier than full traverse. */
  const gated = windowProgress(progress, 0.54, 0.76);

  return (
    <section ref={ref} id="values" className={styles.valuesSection}>
      <div className={styles.valuesHeadingRow}>
        <FadeInOnView>
          <p className={styles.valuesEyebrow}>Our Standards</p>
        </FadeInOnView>
        <RevealWordsOnScroll
          tone="dark"
          revealTiming="late"
          text="Core values behind every project"
          className={styles.valuesHeadingReveal}
          afterReveal={
            <p className={styles.valuesIntro}>
              Every survey, remediation plan, and site handover follows the same principles - clear
              communication, disciplined execution, and practical care for people and place.
            </p>
          }
        />
      </div>

      <div className={styles.valuesGrid}>
        {VALUES.map(({ title, Icon, description }, index) => {
          const local = sliceProgressSnappy(gated, index, n, 0.12, 0.34);
          const dy = cannonLift(local);

          const shellStyle = {
            "--value-scroll-y": `${dy}px`,
          } as CSSProperties;

          return (
            <article key={title} className={styles.valueCard} style={shellStyle}>
              <div className={styles.valueCardInner}>
                <div className={styles.valueCardTop}>
                  <Icon className={styles.valueIcon} strokeWidth={1.75} size={26} aria-hidden />
                  <span className={styles.valueNumber}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
