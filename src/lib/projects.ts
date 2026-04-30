export type FeaturedProject = {
  id: string;
  title: string;
  /** Short line under title (client / sector context) */
  tagline: string;
  sector: string;
  year: string;
  summary: string;
  /** Hero strip image under `/public` (same convention as About sectors). */
  imageSrc: string;
  imageAlt: string;
  /** Optional deep link — omit until detail pages exist */
  href?: string;
};

/** Curated highlights (max four) for the Projects grid. */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "st-johns-college",
    title: "St John’s College, Cambridge",
    tagline: "Education · licensed removal",
    sector: "Education",
    year: "2024",
    imageSrc: "/schools education sector.jpg",
    imageAlt: "Education sector building exterior — representative of college estate works",
    summary:
      "Controlled asbestos removal and reinstatement within a live college estate, coordinated around term dates and heritage constraints.",
    href: "/contact",
  },
  {
    id: "miles-buildings",
    title: "Miles Buildings residential programme",
    tagline: "Housing · remediation",
    sector: "Residential",
    year: "2023",
    imageSrc: "/residential.jpg",
    imageAlt: "Residential housing blocks — representative of occupied estate programmes",
    summary:
      "Multi-phase soft strip, ACM removal, and contamination cleaning across occupied blocks with tight logistics and resident liaison.",
    href: "/contact",
  },
  {
    id: "acute-trust",
    title: "Acute NHS trust — ACM management",
    tagline: "Healthcare · surveying & management",
    sector: "Healthcare",
    year: "2024",
    imageSrc: "/hospital.jpg",
    imageAlt: "Healthcare facility exterior — representative of acute trust environments",
    summary:
      "Survey-led register updates, priority risk scoring, and pragmatic management plans aligned to HTM guidance and operational wards.",
    href: "/contact",
  },
  {
    id: "industrial-decon",
    title: "Industrial decontamination rollout",
    tagline: "Industrial · nationwide support",
    sector: "Industrial",
    year: "2023",
    imageSrc: "/industrial.jpg",
    imageAlt: "Industrial site — representative of plant and nationwide programmes",
    summary:
      "Rapid mobilisation for contamination cleaning and waste segregation across multiple sites under a single programme governance model.",
    href: "/contact",
  },
];
