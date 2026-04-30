import type { FeaturedProject } from "@/lib/projects";
import styles from "./ProjectsNav.module.css";

type ProjectsNavProps = {
  projects: readonly FeaturedProject[];
};

export default function ProjectsNav({ projects }: ProjectsNavProps) {
  return (
    <nav className={styles.nav} aria-label="Jump to project">
      <div className={styles.navInner}>
        <p className={styles.navCaption}>On this page</p>
        <div className={styles.headRow} role="presentation">
          <span>#</span>
          <span>Programme</span>
          <span className={styles.headYear}>Year</span>
        </div>
        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li key={project.id} className={styles.item}>
              <a href={`#${project.id}`} className={styles.link}>
                <span className={styles.idx}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.year}>{project.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
