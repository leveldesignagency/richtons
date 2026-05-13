import { Mail, Phone } from "lucide-react";
import { contact } from "@/lib/contact";
import styles from "./ContactQuickLinks.module.css";

type ContactQuickLinksProps = {
  /** e.g. close mobile menu after tapping a link */
  onInteract?: () => void;
  /** Right-align row (mobile menu); default centres for modals */
  alignEnd?: boolean;
};

export default function ContactQuickLinks({ onInteract, alignEnd }: ContactQuickLinksProps) {
  const wrapClass = `${styles.wrap} ${alignEnd ? styles.alignEnd : ""}`;

  return (
    <div className={wrapClass}>
      <a
        href={contact.tel}
        className={styles.circle}
        onClick={onInteract}
        aria-label={`Call ${contact.phoneDisplay}`}
      >
        <Phone className={styles.icon} aria-hidden strokeWidth={2.25} />
      </a>
      <a
        href={`mailto:${contact.email}`}
        className={styles.circle}
        onClick={onInteract}
        aria-label={`Email ${contact.email}`}
      >
        <Mail className={styles.icon} aria-hidden strokeWidth={2.25} />
      </a>
    </div>
  );
}
