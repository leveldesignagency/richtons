/** Shared with About page tabs & HTML sitemap sector anchors (`/about#sector-tab-*`). */
export type AboutSector = {
  title: string;
  image: string;
  description: string;
};

export const aboutPageSectors: AboutSector[] = [
  {
    title: "Residential",
    image: "/residential.jpg",
    description:
      "Richtons offers asbestos removal and specialist services tailored for residential clients. Our experienced teams ensure safe handling and clear communication throughout every stage.",
  },
  {
    title: "Education Sector",
    image: "/schools education sector.jpg",
    description:
      "We coordinate closely with schools and colleges to deliver compliant works while minimising disruption to pupils, staff, and day-to-day operations.",
  },
  {
    title: "Local Authorities",
    image: "/local authourities.jpg",
    description:
      "From surveys to full remediation, we support local authorities with dependable reporting, controlled planning, and responsive delivery.",
  },
  {
    title: "Commercial",
    image: "/hero image.png",
    description:
      "Commercial projects are delivered with efficient scheduling, rigorous safety standards, and practical solutions aligned to business continuity.",
  },
  {
    title: "Industrial",
    image: "/industrial.jpg",
    description:
      "Our teams are equipped for complex industrial environments, delivering specialist hazardous material management with strict control measures.",
  },
  {
    title: "Hospitals & Healthcare",
    image: "/hospital.jpg",
    description:
      "We work in sensitive healthcare spaces with enhanced controls, clear protocols, and careful phasing to protect patients and staff.",
  },
];
