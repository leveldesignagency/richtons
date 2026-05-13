"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInStagger from "@/components/FadeInStagger";
import type { FeaturedProject } from "@/lib/projects";
import styles from "./ProjectGridClient.module.css";

/** Encode path segments so filenames with spaces work under `/public`. */
function encodePublicPath(src: string): string {
  const trimmed = src.startsWith("/") ? src.slice(1) : src;
  return `/${trimmed.split("/").map(encodeURIComponent).join("/")}`;
}

type ProjectGridClientProps = {
  projects: FeaturedProject[];
};

export default function ProjectGridClient({ projects }: ProjectGridClientProps) {
  return (
    <FadeInStagger className={styles.grid} aria-label="Featured projects">
      {projects.map((project) => {
        const imgSrc = encodePublicPath(project.imageSrc);

        const CardInner = (
          <div className={styles.cardMedia}>
            <div className={styles.cardImageSlot}>
              <Image
                src={imgSrc}
                alt={project.imageAlt}
                fill
                className={styles.cardImage}
                sizes="(max-width: 980px) 100vw, 40vw"
              />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.location}>{project.location}</p>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <div className={styles.cardTop}>
                <div className={styles.meta}>
                  <span>{project.sector}</span>
                  <span className={styles.dot} aria-hidden>
                    ·
                  </span>
                  <span className={styles.year}>{project.year}</span>
                </div>
              </div>
              <p className={styles.worksLabel}>Works carried out</p>
              <p className={styles.tagline}>{project.tagline}</p>
              <p className={styles.summary}>{project.summary}</p>
            </div>
          </div>
        );

        return (
          <article key={project.id} id={project.id} className={styles.card}>
            {project.href ? (
              <Link href={project.href} className={styles.cardLink}>
                {CardInner}
              </Link>
            ) : (
              <div className={styles.cardStatic}>{CardInner}</div>
            )}
          </article>
        );
      })}
    </FadeInStagger>
  );
}
