import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Richtons Environmental Services",
  description:
    "Selected asbestos, remediation, and environmental projects, education, housing, healthcare, and industrial programmes delivered safely and compliantly.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="projectsRouteRoot">{children}</div>;
}
