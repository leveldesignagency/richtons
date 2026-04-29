import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Handshake,
  Leaf,
  Lightbulb,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import FadeInOnView from "@/components/FadeInOnView";
import FadeInStagger from "@/components/FadeInStagger";
import HomeHero from "@/components/HomeHero";
import RevealWordsOnScroll from "@/components/RevealWordsOnScroll";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EmergencyBand from "./EmergencyBand";
import { serviceDetails, type ServiceDetail } from "@/lib/services";
import styles from "./page.module.css";

const homeServices = [
  serviceDetails.find((s) => s.cardTitle === "Asbestos Removal"),
  serviceDetails.find((s) => s.cardTitle === "Surveying & Management"),
  serviceDetails.find((s) => s.cardTitle === "Lead Paint Removal"),
  serviceDetails.find((s) => s.cardTitle === "Soft Strip Demolition"),
  serviceDetails.find((s) => s.cardTitle === "Contamination Cleaning"),
].filter((service): service is ServiceDetail => Boolean(service));

function serviceCardBgStyle(imagePath: string): CSSProperties {
  return {
    ["--service-card-image" as string]: `url("${imagePath}")`,
  };
}

const partnerLogos = [
  {
    name: "Eton Environmental",
    src: "/company logos/Eton Environmental.svg",
  },
  {
    name: "Eastlight Community Homes",
    src: "/company logos/Eastlight Community Homes.png",
  },
  {
    name: "PCH Associates",
    src: "/company logos/PCH ASSOCIATES.png",
  },
  {
    name: "Archer Building Consultancy",
    src: "/company logos/Archer Building Consultancy  .png",
  },
  {
    name: "Warmer Energy",
    src: "/company logos/warmer energy.png",
  },
];

const values: Array<{
  title: string;
  Icon: LucideIcon;
  description: string;
}> = [
  {
    title: "Safety",
    Icon: ShieldCheck,
    description:
      "We place care and well-being first in every survey, removal, and reinstatement project.",
  },
  {
    title: "Integrity",
    Icon: Scale,
    description:
      "Clear reporting and transparent communication keep clients informed from start to finish.",
  },
  {
    title: "Innovation",
    Icon: Lightbulb,
    description:
      "Modern methods and practical planning improve outcomes and reduce disruption.",
  },
  {
    title: "Commitment",
    Icon: Handshake,
    description:
      "Our teams deliver consistent quality with responsive support for urgent requirements.",
  },
  {
    title: "Sustainability",
    Icon: Leaf,
    description:
      "Environmental responsibility is built into how we assess, remove, and dispose of materials.",
  },
];

type TeamMember = {
  name: string;
  role: string;
  email: string;
  copyEmail: string;
  image?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Tony Needham",
    role: "Managing Director",
    email: "tony@richtons.co.uk",
    copyEmail: "tony@richtons.co.uk",
    image: "/team/tony.png",
  },
  {
    name: "Victoria Needham",
    role: "Company Secretary",
    email: "victoria@richtons.co.uk",
    copyEmail: "victoria@richtons.co.uk",
    image: "/team/victoria.jpg",
  },
  {
    name: "Richard Grotes",
    role: "Asbestos Manager",
    email: "richard.g@richtons.co.uk",
    copyEmail: "richard.g@richtons.co.uk",
    image: "/team/richard.jpg",
  },
  {
    name: "Level Design",
    role: "PR and Marketing",
    email: "www.leveldesignagency.com",
    copyEmail: "help@leveldesignagency.com",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader
        links={[
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/news" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <HomeHero />

      <section
        id="partners"
        className={styles.logoMarquee}
        aria-label="Trusted partner logos"
      >
        <FadeInOnView className={styles.logoMarqueeInner}>
          <div className={styles.marqueeViewport}>
            <div className={styles.marqueeTrack}>
              {[0, 1].map((segment) => (
                <div
                  key={segment}
                  className={styles.marqueeSegment}
                  aria-hidden={segment === 1}
                >
                  {partnerLogos.map((logo) => (
                    <div key={`${segment}-${logo.name}`} className={styles.logoPill}>
                      <Image
                        src={logo.src}
                        alt={segment === 0 ? `${logo.name} logo` : ""}
                        width={180}
                        height={54}
                        className={styles.partnerLogo}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeInOnView>
      </section>

      <section id="about" className={styles.needToKnow}>
        <div className={styles.needToKnowContent}>
          <RevealWordsOnScroll
            tone="green"
            revealTiming="fast"
            text={"Everything you\nneed to know"}
            className={styles.needToKnowTitleReveal}
          />
          <FadeInOnView delay={90}>
            <p className={styles.needToKnowLead}>
              At Richtons, we understand asbestos and environmental concerns can
              feel overwhelming. Our fully licensed specialists provide clear
              guidance, practical planning, and reliable project delivery for local
              authorities, schools, and private clients.
            </p>
          </FadeInOnView>
          <FadeInStagger className={styles.needToKnowHighlights} aria-label="Key benefits">
            <p>HSE certified</p>
            <p>Clear compliant reporting</p>
            <p>Rapid mobilisation and support</p>
          </FadeInStagger>
        </div>
        <FadeInOnView delay={120} className={styles.learnMoreWrap}>
          <Button label="Learn more" href="/about" variant="secondary" effect="glow" />
        </FadeInOnView>
      </section>

      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <RevealWordsOnScroll
            tone="dark"
            revealTiming="fast"
            text="The Work We Do"
            className={styles.sectionHeaderTitleReveal}
          />
          <FadeInOnView delay={70}>
            <Button
              label="View all"
              href="/services"
              variant="secondary"
              effect="glow"
            />
          </FadeInOnView>
        </div>
        <FadeInStagger className={styles.servicesGrid}>
          <Link
            href={`/services/${homeServices[0]?.slug}`}
            className={styles.serviceCardLink}
          >
            <article
              className={styles.coreServiceCard}
              style={
                homeServices[0]
                  ? serviceCardBgStyle(homeServices[0].heroImage)
                  : undefined
              }
            >
              <span className={styles.arrow}>
                <ArrowUpRight
                  className={styles.arrowIcon}
                  size={28}
                  strokeWidth={2.35}
                  aria-hidden
                />
              </span>
              <h3>{homeServices[0]?.cardTitle}</h3>
            </article>
          </Link>

          <div className={styles.rightCardsGrid}>
            {homeServices.slice(1).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.serviceCardLink}
              >
                <article
                  className={styles.serviceCard}
                  style={serviceCardBgStyle(service.heroImage)}
                >
                  <span className={styles.arrow}>
                    <ArrowUpRight
                      className={styles.arrowIcon}
                      size={28}
                      strokeWidth={2.35}
                      aria-hidden
                    />
                  </span>
                  <h3>{service.cardTitle}</h3>
                </article>
              </Link>
            ))}
          </div>
        </FadeInStagger>
      </section>

      <EmergencyBand />

      <section id="team" className={styles.teamSection}>
        <div className={styles.teamSectionHeader}>
          <RevealWordsOnScroll
            tone="dark"
            revealTiming="late"
            text="Meet The Team"
            className={styles.teamHeadingReveal}
          />
          <FadeInOnView delay={80}>
            <p className={styles.teamSectionIntro}>
              Dedicated specialists with practical expertise across asbestos,
              environmental control, and project coordination.
            </p>
          </FadeInOnView>
        </div>
        <FadeInStagger className={styles.teamGrid}>
          {teamMembers.map((member) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <article key={member.name} className={styles.teamCard}>
                <div className={styles.teamCardVisual}>
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      className={styles.teamCardPhoto}
                      sizes="(max-width: 960px) 90vw, (max-width: 1400px) 30vw, 360px"
                    />
                  ) : (
                    <span className={styles.teamAvatarInitial} aria-hidden>
                      {initials}
                    </span>
                  )}
                </div>
                <div className={styles.teamCardBody}>
                  <h3>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <a
                    className={styles.teamEmail}
                    href={`mailto:${encodeURIComponent(member.copyEmail)}`}
                  >
                    {member.email}
                  </a>
                </div>
              </article>
            );
          })}
        </FadeInStagger>
      </section>

      <section id="values" className={styles.valuesSection}>
        <div className={styles.valuesHeadingRow}>
          <FadeInOnView>
            <p className={styles.valuesEyebrow}>Our Standards</p>
          </FadeInOnView>
          <RevealWordsOnScroll
            tone="dark"
            revealTiming="late"
            text="Core values behind every project"
            className={styles.valuesHeadingReveal}
          />
          <FadeInOnView delay={100}>
            <p className={styles.valuesIntro}>
              Every survey, remediation plan, and site handover follows the same
              principles - clear communication, disciplined execution, and practical
              care for people and place.
            </p>
          </FadeInOnView>
        </div>
        <FadeInStagger className={styles.valuesGrid}>
          {values.map(({ title, Icon, description }, index) => (
            <article key={title} className={styles.valueCard}>
              <div className={styles.valueCardTop}>
                <Icon className={styles.valueIcon} strokeWidth={1.75} size={26} aria-hidden />
                <span className={styles.valueNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </FadeInStagger>
      </section>

      <SiteFooter />
    </main>
  );
}
