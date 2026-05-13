"use client";

import { Headphones, Mail, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "@/lib/contact";
import styles from "./HomeCustomerServiceFab.module.css";

export default function HomeCustomerServiceFab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <div
      className={styles.shell}
      data-open={open ? "true" : "false"}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Customer service" : undefined}
    >
      <div className={styles.track}>
        <a
          href={contact.tel}
          className={styles.plainHit}
          aria-hidden={!open}
          tabIndex={open ? undefined : -1}
          aria-label={`Call ${contact.phoneDisplay}`}
        >
          <Phone className={styles.glyph} aria-hidden strokeWidth={2.25} />
        </a>
        <a
          href={`mailto:${contact.email}`}
          className={styles.plainHit}
          aria-hidden={!open}
          tabIndex={open ? undefined : -1}
          aria-label={`Email ${contact.email}`}
        >
          <Mail className={styles.glyph} aria-hidden strokeWidth={2.25} />
        </a>
        <button
          type="button"
          className={styles.plainHit}
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close" : "Customer service — open phone and email"}
        >
          <X
            className={`${styles.glyph} ${open ? styles.glyphShow : styles.glyphHide}`}
            aria-hidden
            strokeWidth={2.35}
          />
          <Headphones
            className={`${styles.glyph} ${open ? styles.glyphHide : styles.glyphShow}`}
            aria-hidden
            strokeWidth={2.1}
          />
        </button>
      </div>
    </div>
  );
}
