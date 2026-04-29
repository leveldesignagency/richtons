export type ServiceDetail = {
  slug: string;
  /** Hero / card imagery under `/public`. */
  heroImage: string;
  title: string;
  /** Two-line hero title so layout stays stable across services. */
  heroHeadingLines: readonly [string, string];
  cardTitle: string;
  shortDescription: string;
  overview: string;
  scope: string[];
  process: string[];
  compliance: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "licensed-asbestos-removal",
    heroImage: "/hero image.png",
    title: "Licensed Asbestos Removal",
    heroHeadingLines: ["Fully licensed", "Asbestos removal"],
    cardTitle: "Asbestos Removal",
    shortDescription:
      "Controlled licensed removal with full containment, negative pressure, compliant waste handling, and decontamination.",
    overview:
      "Richtons delivers licensed asbestos removal for residential, commercial, education, healthcare, and industrial sites. Every programme is planned around safety, sequencing, and compliance, from pre-start surveys through enclosure setup, removal, packaging, transport, and final clearance.",
    scope: [
      "Asbestos cement, insulation board, textured coatings, pipe lagging, and other ACM categories",
      "Full enclosure design and setup with controlled access and decontamination routes",
      "Negative pressure management and environmental monitoring throughout removal",
      "Waste segregation, bagging, transport coordination, and compliant disposal records",
    ],
    process: [
      "Site survey and method statement planning",
      "Enclosure and control setup with welfare and decontamination provision",
      "Licensed removal by trained operatives following task-specific controls",
      "Cleaning, clearance support, and documentation handover",
    ],
    compliance: [
      "Control of Asbestos Regulations-aligned delivery",
      "Risk-assessed method statements and RAMS packs",
      "Auditable site records and waste documentation",
    ],
    faqs: [
      {
        q: "Can you work around occupied buildings?",
        a: "Yes. We phase works around occupied areas and use containment, sequencing, and clear communication to minimise disruption.",
      },
      {
        q: "Do you provide all compliance paperwork?",
        a: "Yes. We provide relevant method statements, removal records, and disposal documentation for client audit trails.",
      },
    ],
  },
  {
    slug: "asbestos-surveying-management",
    heroImage: "/surveying.jpg",
    title: "Asbestos Surveying & Management",
    heroHeadingLines: ["Asbestos Surveying &", "Management"],
    cardTitle: "Surveying & Management",
    shortDescription:
      "Comprehensive asbestos surveys and practical management plans for compliant, low-risk property operation.",
    overview:
      "Our surveying teams identify and assess asbestos-containing materials so clients can make informed, compliant decisions. We translate survey findings into practical management plans with prioritised actions and clear responsibilities.",
    scope: [
      "Management and refurbishment-style survey support",
      "Material and priority risk profiling",
      "Action registers and phased mitigation planning",
      "Re-inspection strategy and reporting",
    ],
    process: [
      "Survey brief, site access planning, and scope confirmation",
      "Sampling and material assessment",
      "Risk classification with client-ready reporting",
      "Management planning and review cadence setup",
    ],
    compliance: [
      "Dutyholder-focused reporting outputs",
      "Clear recommendation hierarchy for remediation vs. management",
      "Documentation suitable for internal governance and contractor control",
    ],
    faqs: [
      {
        q: "Do you only provide surveys or ongoing support too?",
        a: "Both. We can provide one-off surveys and ongoing management support, including action review and re-inspection scheduling.",
      },
      {
        q: "Can surveys be phased across multiple sites?",
        a: "Yes. We regularly structure multi-site programmes with consistent templates and reporting standards.",
      },
    ],
  },
  {
    slug: "lead-paint-removal",
    heroImage: "/lead paint removal.jpg",
    title: "Lead Paint Removal",
    heroHeadingLines: ["Lead Paint", "Removal"],
    cardTitle: "Lead Paint Removal",
    shortDescription:
      "Safe lead paint removal using controlled preparation, containment, and decontamination practices.",
    overview:
      "Richtons manages lead paint removal in sensitive environments where health protection and contamination control are critical. We tailor methods to substrate, occupancy constraints, and programme demands.",
    scope: [
      "Lead paint assessment and controlled removal planning",
      "Containment and localised extraction strategy",
      "Surface preparation and post-removal cleaning",
      "Waste handling and contamination control",
    ],
    process: [
      "Condition assessment and method selection",
      "Protection setup and controlled removal",
      "Validation checks and area clean-down",
      "Handover with recommended next-step treatments",
    ],
    compliance: [
      "Task-specific controls and PPE strategy",
      "Documented safe-system workflow",
      "Client handover records for internal assurance",
    ],
    faqs: [
      {
        q: "Can this be done in occupied spaces?",
        a: "Yes, with phased access, containment, and strict cleaning protocols to control risk.",
      },
      {
        q: "Do you support repainting prep?",
        a: "Yes. We can prepare surfaces for follow-on decorators or principal contractors.",
      },
    ],
  },
  {
    slug: "soft-strip-demolition-strip-out",
    heroImage: "/soft strip demolition.jpg",
    title: "Soft Strip Demolition & Strip Out",
    heroHeadingLines: ["Soft Strip Demolition", "and Strip Out"],
    cardTitle: "Soft Strip Demolition",
    shortDescription:
      "Non-structural demolition and internal strip-out to prepare spaces for safe redevelopment.",
    overview:
      "We deliver controlled soft-strip demolition and internal strip-out programmes that remove non-structural elements while protecting retained fabric and keeping downstream trades on schedule.",
    scope: [
      "Partition, ceiling, and fixture removal",
      "Internal de-fit and services exposure for follow-on packages",
      "Segregation for reuse, recycling, and compliant disposal",
      "Programme-aligned phased delivery",
    ],
    process: [
      "Scope walkdown and sequencing plan",
      "Isolations, permits, and controlled access setup",
      "Strip-out execution with daily coordination",
      "Area sign-off and readiness handover",
    ],
    compliance: [
      "Method statements aligned to principal contractor workflows",
      "Structured waste segregation and documentation",
      "Safe access/egress and dust/noise control approach",
    ],
    faqs: [
      {
        q: "Do you coordinate with live site operations?",
        a: "Yes. We phase and zone works around live operations and restricted access windows.",
      },
      {
        q: "Can you deliver to tight programmes?",
        a: "Yes. We plan labour and sequencing to maintain programme certainty and reduce rework risk.",
      },
    ],
  },
  {
    slug: "contaminated-land-remediation",
    heroImage: "/contamination cleaning.png",
    title: "Contaminated Land Remediation",
    heroHeadingLines: ["Contaminated Land", "Remediation"],
    cardTitle: "Contamination Cleaning",
    shortDescription:
      "Assessment, treatment, removal, and reinstatement solutions for contaminated land and hazardous materials.",
    overview:
      "Richtons provides practical contaminated land remediation support from risk identification through treatment and reinstatement. We focus on safe execution, transparent reporting, and practical outcomes for redevelopment and compliance.",
    scope: [
      "Risk assessment and remediation planning",
      "Excavation, containment, treatment, and removal",
      "Material classification and waste route coordination",
      "Reinstatement and close-out verification support",
    ],
    process: [
      "Desk study and site risk profile review",
      "Targeted remediation scope and controls",
      "Execution with monitored environmental controls",
      "Completion reporting and next-stage readiness",
    ],
    compliance: [
      "Documented risk-to-action remediation workflow",
      "Traceable material handling and disposal records",
      "Client-ready completion documentation",
    ],
    faqs: [
      {
        q: "Can you support multi-stage remediation projects?",
        a: "Yes. We regularly phase remediation around programme, access, and budget constraints.",
      },
      {
        q: "Do you coordinate with external consultants?",
        a: "Yes. We can align with consultant-led validation and principal contractor programme controls.",
      },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  serviceDetails.map((service) => [service.slug, service]),
);

