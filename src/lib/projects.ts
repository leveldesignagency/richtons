export type FeaturedProject = {
  id: string;
  title: string;
  location: string;
  /** Short line under title (client / sector context) */
  tagline: string;
  sector: string;
  year: string;
  summary: string;
  /** Hero strip image under `/public` (same convention as About sectors). */
  imageSrc: string;
  imageAlt: string;
  /** Optional deep link; omit until detail pages exist */
  href?: string;
};

/** Featured case studies shown on the Projects page. */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "london-southeast-colleges-lambeth",
    title: "London Southeast Colleges",
    location: "Lambeth",
    tagline: "Urgent electrical works in specialist education setting",
    sector: "Education",
    year: "2024",
    imageSrc: "/projects/london southeast colleges.webp",
    imageAlt:
      "School building exterior representing education estate improvement works",
    summary:
      "Richtons completed urgent electrical works at a school for individuals with learning difficulties and disabilities, planned around staff and student needs to minimise disruption. The health-and-safety-critical programme finished ahead of schedule, and an HSE Inspector specialising in asbestos and construction commended the team for professionalism, meticulous attention to detail, and delivery quality.",
  },
  {
    id: "oxfam-ealing-broadway",
    title: "Oxfam",
    location: "Ealing Broadway",
    tagline: "Shopfront renovation support with controlled AIB removal",
    sector: "Retail",
    year: "2024",
    imageSrc: "/projects/oxfam.jpg",
    imageAlt: "Urban shopfront and adjacent back-office spaces",
    summary:
      "Richtons was appointed to remove asbestos insulation board partition walls from a four-storey back-office staircase during the Oxfam shopfront renovation. The staircase and adjacent hallways were fully contained with meticulous control of air movement, enabling safe and compliant delivery throughout. All known ACMs were removed securely and on programme to support the onsite contractor's reinstatement phase.",
  },
  {
    id: "thistle-hotel-trafalgar-square",
    title: "Thistle Hotel",
    location: "Trafalgar Square",
    tagline: "Controlled pipe insulation removal in live hotel operation",
    sector: "Hospitality",
    year: "2024",
    imageSrc: "/projects/thistle hotel.jpg",
    imageAlt:
      "Hotel interior and service areas representing controlled remediation in live hospitality settings",
    summary:
      "The project involved safe removal of asbestos pipe insulation and debris from floor voids beneath hotel-room bathrooms under fully controlled conditions. Works were delivered during operational hours with carefully managed temporary exclusions and restrictions, ensuring safety, accuracy, and continuity. Richtons collaborated closely with Westminster Council under ASB5 notification requirements to maintain full legislative compliance across a complex live environment.",
  },
  {
    id: "miles-buildings-penfold-place",
    title: "Miles Buildings",
    location: "Penfold Place",
    tagline: "Asbestos and biohazard clearance in condemned garage estate",
    sector: "Residential",
    year: "2024",
    imageSrc: "/projects/miles buildings (1).jpg",
    imageAlt:
      "Housing estate context representing condemned garages and controlled enclosure works",
    summary:
      "Engaged by a contractor working with the local authority, Richtons removed asbestos and suspected drug paraphernalia from condemned garages near a housing estate. A fully controlled enclosure enabled secure AIB removal and a comprehensive needle sweep for biohazard risk control. Teams used specialist PPE, including cut- and needle-resistant gloves, and followed strict hazardous-waste disposal protocols throughout.",
  },
  {
    id: "barley-croft-garages-harlow",
    title: "Barley Croft Garages",
    location: "Harlow",
    tagline: "Ongoing housing portfolio asbestos support programme",
    sector: "Social Housing",
    year: "2024",
    imageSrc: "/projects/barley croft garages.jpeg",
    imageAlt:
      "Housing and maintenance context representing planned roofing and façade renewal programmes",
    summary:
      "Earlier in 2024, Richtons was appointed by Eastlight Community Homes Foundation with Braintree and Colchester councils to support roofing, fascia, and soffit renewal across more than 100 homes annually. Richtons removes asbestos materials that would otherwise obstruct planned maintenance, responding to weekly requests on a schedule-of-rates basis while meeting programme timelines and tender quality standards.",
  },
  {
    id: "heycroft-primary-school-southend-on-sea",
    title: "Heycroft Primary School",
    location: "Southend on Sea",
    tagline: "Skylight upstand removals coordinated with roof renewal",
    sector: "Education",
    year: "2024",
    imageSrc: "/projects/schools education sector (1).jpg",
    imageAlt:
      "Primary school estate works with corridor and roof refurbishment context",
    summary:
      "During the 2024 summer term, Richtons removed asbestos insulating board upstands from skylights across multiple school corridors. Internal scaffolding and controlled enclosures were constructed for safe, efficient removal. The programme was coordinated with concurrent roofing renovations, delivering upgraded interiors and a modernised roof that incorporated solar technology to support long-term energy efficiency for the school community.",
  },
];
