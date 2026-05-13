import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ProjectGridClient from "@/components/ProjectGridClient";
import ProjectsNav from "@/components/ProjectsNav";
import { featuredProjects } from "@/lib/projects";
import ProjectsPageHero from "./ProjectsPageHero";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const heroImageSrc = "/projects.jpg";

  return (
    <main className={styles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <ProjectsPageHero heroImageSrc={heroImageSrc} />

      <div className={styles.projectsBody}>
        <ProjectsNav projects={featuredProjects} />
        <ProjectGridClient projects={featuredProjects} />
      </div>

      <SiteFooter />
    </main>
  );
}
