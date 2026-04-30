"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import styles from "./page.module.css";

export default function NeedToKnowBand() {
  const [deferredVisible, setDeferredVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const floatingPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setDeferredVisible(true);
    const onChange = () => {
      if (mq.matches) setDeferredVisible(true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = floatingPhotoRef.current;
    if (!section || !photo) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 780px)");

    let scheduled = false;

    const tick = () => {
      scheduled = false;
      if (mqReduce.matches || mqMobile.matches) {
        photo.style.removeProperty("--nk-float-parallax-y");
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionMidY = rect.top + rect.height / 2;
      const viewMidY = window.innerHeight / 2;
      const delta = viewMidY - sectionMidY;
      const shift = Math.max(-64, Math.min(64, delta * 0.18));
      photo.style.setProperty("--nk-float-parallax-y", `${shift}px`);
    };

    const onFrame = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        tick();
      });
    };

    tick();
    window.addEventListener("scroll", onFrame, { passive: true });
    window.addEventListener("resize", onFrame);

    const onPrefs = () => tick();
    mqReduce.addEventListener("change", onPrefs);
    mqMobile.addEventListener("change", onPrefs);

    return () => {
      window.removeEventListener("scroll", onFrame);
      window.removeEventListener("resize", onFrame);
      mqReduce.removeEventListener("change", onPrefs);
      mqMobile.removeEventListener("change", onPrefs);
    };
  }, []);

  const onTitleRevealComplete = useCallback(() => setDeferredVisible(true), []);

  return (
    <section ref={sectionRef} id="about" className={styles.needToKnow}>
      <div className={styles.needToKnowMedia} aria-hidden>
        <div className={styles.needToKnowBgImageWrap}>
          <div className={styles.needToKnowBgImage} />
        </div>
        <div className={styles.needToKnowGrain} />
      </div>

      <div className={styles.needToKnowGreenShadow} aria-hidden />

      <div className={styles.needToKnowGreenPane}>
        <svg
          className={styles.needToKnowDiagonalStroke}
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="100"
            y1="0"
            x2="82"
            y2="100"
            stroke="rgba(255, 255, 255, 0.92)"
            strokeWidth="0.32"
            vectorEffect="nonScalingStroke"
          />
        </svg>

        <div className={styles.needToKnowForeground}>
          <div className={styles.needToKnowContent}>
            <RevealWordsOnScroll
              tone="green"
              revealTiming="fast"
              text={"Everything you\nneed to know"}
              className={styles.needToKnowTitleReveal}
              onRevealComplete={onTitleRevealComplete}
              afterReveal={
                <p className={styles.needToKnowLead}>
                  At Richtons, we understand asbestos and environmental concerns can feel overwhelming.
                  Our fully licensed specialists provide clear guidance, practical planning, and reliable
                  project delivery for local authorities, schools, and private clients.
                </p>
              }
            />
            <div
              className={`${styles.needToKnowDeferredHighlightsWrap} ${deferredVisible ? styles.needToKnowDeferredHighlightsWrapVisible : ""}`}
              aria-live="polite"
            >
              <div className={styles.needToKnowHighlights} aria-label="Key benefits">
                <p>HSE certified</p>
                <p>Clear compliant reporting</p>
                <p>Rapid mobilisation and support</p>
              </div>
            </div>
          </div>
          <div className={styles.learnMoreWrap}>
            <Button label="Learn more" href="/about" variant="secondary" effect="glow" />
          </div>
        </div>
      </div>

      <div ref={floatingPhotoRef} className={styles.needToKnowFloatingPhoto} aria-hidden>
        <Image
          alt=""
          src="/surveying.jpg"
          fill
          sizes="680px"
          className={styles.needToKnowFloatingImg}
        />
      </div>
    </section>
  );
}
