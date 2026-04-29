"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { serviceDetails } from "@/lib/services";
import styles from "@/app/page.module.css";

function truncateCaption(text: string, maxChars: number): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars - 1).trimEnd()}…`;
}

/** One slide per core service (order matches `/services`, starting with asbestos removal). */
const HOME_HERO_SLIDES = serviceDetails.map((service) => ({
  src: service.heroImage,
  alt: `${service.title} — Richtons specialist works`,
  serviceHref: `/services/${service.slug}`,
  title: service.cardTitle,
  caption: truncateCaption(service.shortDescription, 92),
}));

const IDLE_FULLSCREEN_MS = 5000;
/** Matches portrait mask transition on `.heroImageClip` (~1.15s). */
const LAYOUT_TRANSITION_MS = 1150;
const SLIDE_DWELL_MS = 4500;

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => resolve();
    const t = window.setTimeout(finish, ms);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(t);
        finish();
      },
      { once: true },
    );
  });
}

export default function HomeHero() {
  const [composed, setComposed] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const cycleAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    cycleAbortRef.current?.abort();
    const controller = new AbortController();
    cycleAbortRef.current = controller;
    const { signal } = controller;

    async function runCycle() {
      while (!signal.aborted) {
        await sleep(IDLE_FULLSCREEN_MS, signal);
        if (signal.aborted) break;
        setComposed(true);
        await sleep(LAYOUT_TRANSITION_MS, signal);
        if (signal.aborted) break;

        const sequence = [...HOME_HERO_SLIDES.map((_, i) => i), 0];
        for (const i of sequence) {
          setSlideIndex(i);
          await sleep(SLIDE_DWELL_MS, signal);
          if (signal.aborted) break;
        }
        if (signal.aborted) break;

        setComposed(false);
        await sleep(LAYOUT_TRANSITION_MS, signal);
      }
    }

    runCycle();
    return () => controller.abort();
  }, []);

  const slide = HOME_HERO_SLIDES[slideIndex];

  return (
    <section
      className={`${styles.hero} ${composed ? styles.heroComposed : ""}`}
      aria-label="Introduction"
    >
      <div className={styles.heroImageStageWrap}>
        <div className={styles.heroGreenShape} aria-hidden />
        <div className={styles.heroImageClip}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className={styles.heroStageImage}
            priority
          />
        </div>
        <div className={styles.heroBadgeAnchor}>
          <Link
            href={slide.serviceHref}
            className={styles.heroMiniBadge}
            aria-label={`${slide.title}: ${slide.caption}`}
          >
            <p className={styles.heroMiniBadgeValue} aria-hidden>
              {slide.title}
            </p>
          </Link>
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Environmental Services Across The UK</p>
          <h1>Asbestos & Hazardous Material Specialists</h1>
          <p>
            Partnering with residential, commercial, and education sectors with
            licensed teams, fast mobilisation, and dependable compliance-led
            delivery.
          </p>
          <div className={styles.heroActions}>
            <Button label="Get a Quote" href="/contact" size="lg" effect="glow" />
            <Button
              label="View Services"
              href="#services"
              variant="secondary"
              size="lg"
              effect="glow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
