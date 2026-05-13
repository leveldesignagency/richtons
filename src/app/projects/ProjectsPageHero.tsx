"use client";

import type { CSSProperties } from "react";
import FadeInOnView from "@/components/FadeInOnView";
import pageStyles from "./page.module.css";

type ProjectsPageHeroProps = {
  /** Path under `/public` for CSS `background-image` (same pattern as About). */
  heroImageSrc: string;
};

function encodePublicPath(src: string): string {
  const trimmed = src.startsWith("/") ? src.slice(1) : src;
  return `/${trimmed.split("/").map(encodeURIComponent).join("/")}`;
}

export default function ProjectsPageHero({ heroImageSrc }: ProjectsPageHeroProps) {
  const cssUrl = `url("${encodePublicPath(heroImageSrc)}")`;

  return (
    <section
      className={pageStyles.projectsHero}
      style={{ "--hero-bg-image": cssUrl } as CSSProperties}
      aria-labelledby="projects-page-heading"
    >
      <div className={pageStyles.projectsHeroContent}>
        <FadeInOnView>
          <p className={pageStyles.projectsHeroEyebrow}>Featured programmes</p>
        </FadeInOnView>
        <FadeInOnView delay={75}>
          <h1 id="projects-page-heading">Projects</h1>
        </FadeInOnView>
        <FadeInOnView delay={140}>
          <p className={pageStyles.projectsHeroLead}>
            A selection of live case studies across education, housing, hospitality, retail, and
            public-sector estates, delivered with strict controls, clear communication, and programme
            certainty.
          </p>
        </FadeInOnView>
      </div>
    </section>
  );
}
