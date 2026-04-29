"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import FadeInOnView from "@/components/FadeInOnView";
import FadeInStagger from "@/components/FadeInStagger";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { aboutPageSectors as sectors } from "@/lib/about-sectors";
import styles from "./page.module.css";

export default function AboutPage() {
  const [activeSector, setActiveSector] = useState(0);
  const activeSectorItem = sectors[activeSector];
  const activeTitle = activeSectorItem.title;
  const revealRef = useRef<HTMLElement | null>(null);
  const revealTextRef = useRef<HTMLParagraphElement | null>(null);

  const revealText =
    "Richtons is a progressive company focused on exceptional service and sustainable practices in asbestos management, removal, surveying, and remediation.";
  const revealWords = revealText.split(" ");

  useEffect(() => {
    const container = revealRef.current;
    const textContainer = revealTextRef.current;
    if (!container || !textContainer) return;

    const words = Array.from(textContainer.querySelectorAll("span"));
    if (!words.length) return;

    const revealWordsForScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const start = rect.top + scrollTop;
      // Animate in a shorter, more noticeable window after entering the band.
      const triggerStart = 0;
      const triggerEnd = start + rect.height * 0.08;
      const current = window.scrollY || document.documentElement.scrollTop;

      let activeWords = 0;
      if (current <= triggerStart) {
        activeWords = 0;
      } else if (current >= triggerEnd) {
        activeWords = words.length;
      } else {
        const progress = (current - triggerStart) / Math.max(1, triggerEnd - triggerStart);
        activeWords = Math.round(progress * words.length);
      }

      words.forEach((word, index) => {
        (word as HTMLElement).style.opacity = index < activeWords ? "1" : "0.12";
      });
    };

    revealWordsForScroll();
    window.addEventListener("scroll", revealWordsForScroll, { passive: true });
    window.addEventListener("resize", revealWordsForScroll);
    return () => {
      window.removeEventListener("scroll", revealWordsForScroll);
      window.removeEventListener("resize", revealWordsForScroll);
    };
  }, []);

  return (
    <main className={styles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/news" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section
        className={styles.hero}
        style={
          {
            "--hero-bg-image": 'url("/About page.png")',
          } as CSSProperties
        }
      >
        <div className={styles.heroContent}>
          <FadeInOnView>
            <p className={styles.eyebrow}>About Us</p>
          </FadeInOnView>
          <FadeInOnView delay={75}>
            <h1>About Richtons Environmental</h1>
          </FadeInOnView>
          <FadeInOnView delay={140}>
            <p className={styles.heroLead}>
              Richtons Environmental Services provides expert, ethical, and
              sustainable solutions for asbestos and environmental challenges.
              Guided by safety, integrity, and innovation, we protect communities
              while delivering exceptional results.
            </p>
          </FadeInOnView>
          <FadeInStagger className={styles.heroStats}>
            <div className={styles.heroStatItem}>
              <strong>24/7</strong>
              <span>Response Support</span>
            </div>
            <div className={styles.heroStatItem}>
              <strong>UK</strong>
              <span>Nationwide Coverage</span>
            </div>
            <div className={styles.heroStatItem}>
              <strong>100%</strong>
              <span>Compliance Focused</span>
            </div>
          </FadeInStagger>
        </div>
      </section>

      <section ref={revealRef} className={styles.greenBand}>
        <p ref={revealTextRef} className={styles.greenBandCopy}>
          {revealWords.map((word, index) => (
            <span key={`${word}-${index}`}>
              {word}
              {" "}
            </span>
          ))}
        </p>
      </section>

      <section id="sectors" className={styles.sectorsSection}>
        <div className={styles.sectorsSectionInner}>
          <FadeInOnView>
            <div className={styles.sectorsHeading}>
              <h2 className={styles.sectorsTitle}>Sectors we support</h2>
              <p className={styles.sectorsIntro}>
                Choose a sector to read how we deliver safe, compliant work in that
                environment.
              </p>
            </div>
          </FadeInOnView>

          <FadeInOnView delay={110}>
            <div className={styles.sectorsLayout}>
              <nav
                className={styles.sectorNav}
                aria-label="Sectors"
                role="tablist"
              >
                {sectors.map((sector, index) => {
                  const isActive = activeSector === index;
                  return (
                    <button
                      key={sector.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="sector-panel"
                      id={`sector-tab-${index}`}
                      className={`${styles.sectorNavItem} ${isActive ? styles.sectorNavItemActive : ""}`}
                      onClick={() => setActiveSector(index)}
                    >
                      {sector.title}
                    </button>
                  );
                })}
              </nav>

              <article
                id="sector-panel"
                role="tabpanel"
                aria-labelledby={`sector-tab-${activeSector}`}
                className={styles.sectorPanel}
                aria-live="polite"
              >
                <p className={styles.sectorPanelEyebrow}>Sector focus</p>
                <h3 className={styles.sectorPanelTitle}>{activeTitle}</h3>
                <p className={styles.sectorPanelBody}>
                  {activeSectorItem.description}
                </p>
                <div
                  className={styles.sectorPanelVisual}
                  style={
                    {
                      "--sector-image": `url("${activeSectorItem.image}")`,
                    } as CSSProperties
                  }
                  aria-hidden
                />
              </article>
            </div>
          </FadeInOnView>
        </div>
      </section>

      <FadeInOnView>
        <SiteFooter servicesHref="/services" />
      </FadeInOnView>
    </main>
  );
}
