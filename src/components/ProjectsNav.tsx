import type { FeaturedProject } from "@/lib/projects";
import styles from "./ProjectsNav.module.css";

type ProjectsNavProps = {
  projects: readonly FeaturedProject[];
};

export default function ProjectsNav({ projects }: ProjectsNavProps) {
  return (
    <nav className={styles.nav} aria-label="Jump to project">
      <div className={styles.navInner}>
        <p className={styles.navCaption}>Projects Index</p>
        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li key={project.id} className={styles.item}>
              <a href={`#${project.id}`} className={styles.link}>
                <span className={styles.idx}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.titleWrap}>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.area}>{project.location}</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
