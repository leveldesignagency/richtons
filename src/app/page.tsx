import HomePartnersScroll from "@/components/home/HomePartnersScroll";
import HomeServicesScroll from "@/components/home/HomeServicesScroll";
import HomeTeamScroll from "@/components/home/HomeTeamScroll";
import HomeValuesScroll from "@/components/home/HomeValuesScroll";
import HomeHero from "@/components/HomeHero";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EmergencyBand from "./EmergencyBand";
import NeedToKnowBand from "./NeedToKnowBand";
import { serviceDetails, type ServiceDetail } from "@/lib/services";
import styles from "./page.module.css";

const homeServices = [
  serviceDetails.find((s) => s.cardTitle === "Asbestos Removal"),
  serviceDetails.find((s) => s.cardTitle === "Surveying & Management"),
  serviceDetails.find((s) => s.cardTitle === "Lead Paint Removal"),
  serviceDetails.find((s) => s.cardTitle === "Soft Strip Demolition"),
  serviceDetails.find((s) => s.cardTitle === "Contamination Cleaning"),
].filter((service): service is ServiceDetail => Boolean(service));

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

const teamMembers = [
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
          { label: "Projects", href: "/projects" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <HomeHero />

      <HomePartnersScroll logos={partnerLogos} />

      <NeedToKnowBand />

      <HomeServicesScroll services={homeServices} />

      <EmergencyBand />

      <HomeTeamScroll members={teamMembers} />

      <HomeValuesScroll />

      <SiteFooter />
    </main>
  );
}
