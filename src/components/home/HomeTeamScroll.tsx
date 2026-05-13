"use client";

import type { CSSProperties } from "react";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import { useSectionScrollProgress } from "@/hooks/useSectionScrollProgress";
import {
  sliceProgressSnappy,
  smoothstep,
  windowProgress,
} from "@/lib/scrollProgress";
import styles from "@/app/page.module.css";

export type TeamMember = {
  name: string;
  role: string;
  email: string;
  copyEmail: string;
  image?: string;
};

type HomeTeamScrollProps = {
  members: readonly TeamMember[];
};

export default function HomeTeamScroll({ members }: HomeTeamScrollProps) {
  const { ref, progress } = useSectionScrollProgress();
  const n = Math.max(1, members.length);
  /** Short window so every card (incl. last) finishes while the band is still on screen */
  const gated = windowProgress(progress, 0.32, 0.54);

  return (
    <section ref={ref} id="team" className={styles.teamSection}>
      <div className={styles.teamSectionHeader}>
        <RevealWordsOnScroll
          tone="dark"
          revealTiming="late"
          text="Meet The Team"
          className={styles.teamHeadingReveal}
          afterReveal={
            <p className={styles.teamSectionIntro}>
              Dedicated specialists with practical expertise across asbestos, environmental control,
              and project coordination.
            </p>
          }
        />
      </div>

      <div className={styles.teamGrid}>
        {members.map((member, index) => {
          const local = sliceProgressSnappy(gated, index, n, 0.06, 0.2);
          const t = smoothstep(0, 1, local);
          /** Very subtle forward pop ; depth reads as z-index + slight scale */
          const scale = 0.993 + t * 0.017;
          const zIndex = 1 + index + Math.round(t * 28);

          const shimmerIn = smoothstep(0.06, 0.38, local);
          const shimmerOut = 1 - smoothstep(0.42, 0.88, local);
          const shimmerOpacity = Math.max(0, Math.min(1, shimmerIn * shimmerOut * 1.25));
          const shimmerPos = local * 168 - 34;

          const shellStyle = {
            "--team-card-scale": String(scale),
            "--team-card-z": String(zIndex),
          } as CSSProperties;

          return (
            <div key={member.name} className={styles.teamCardSlot}>
              <article className={styles.teamCard} style={shellStyle}>
                <div className={styles.teamCardInner}>
                <div
                  className={styles.teamCardShimmer}
                  style={{
                    opacity: shimmerOpacity,
                    backgroundPosition: `${shimmerPos}% 50%`,
                  }}
                  aria-hidden
                />
                <div className={styles.teamCardVisual} aria-hidden />
                <div className={styles.teamCardBody}>
                  <h3>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                </div>
              </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
