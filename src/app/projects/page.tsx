import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ProjectGridClient, {
  ProjectsIntroClient,
} from "@/components/ProjectGridClient";
import ProjectsNav from "@/components/ProjectsNav";
import { featuredProjects } from "@/lib/projects";
import styles from "./page.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader
        logoTreatment="brand"
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className={styles.main}>
        <ProjectsIntroClient
          eyebrow="Featured programmes"
          title="Projects"
          lead="A selection of live case studies across education, housing, hospitality, retail, and public-sector estates, delivered with strict controls, clear communication, and programme certainty."
        />
        <div className={styles.projectsBody}>
          <ProjectsNav projects={featuredProjects} />
          <ProjectGridClient projects={featuredProjects} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
