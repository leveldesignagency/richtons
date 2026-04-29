"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

type HeaderLink = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  links: HeaderLink[];
  disableScrollOverlay?: boolean;
  alwaysShowOverlay?: boolean;
  /** Full-width grey bar while at top; fades off on scroll so the default pill header can show. */
  fullBleedBarUntilScroll?: boolean;
};

export default function SiteHeader({
  links,
  disableScrollOverlay = false,
  alwaysShowOverlay = false,
  fullBleedBarUntilScroll = false,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuDockRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!menuDockRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.headerShell} ${isScrolled ? styles.scrolled : ""} ${
        disableScrollOverlay ? styles.noScrollOverlay : ""
      } ${alwaysShowOverlay ? styles.alwaysOverlay : ""} ${
        fullBleedBarUntilScroll ? styles.headerFullBleedUntilScroll : ""
      }`}
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Richtons home">
          <Image
            src="/header logo richtons.svg"
            alt="Richtons Environmental Services"
            width={220}
            height={56}
            priority
            className={styles.logo}
          />
        </Link>

        <nav
          ref={menuDockRef}
          className={`${styles.menuDock} ${isMenuOpen ? styles.menuDockOpen : ""}`}
          aria-label="Main menu"
        >
          <div className={styles.menuLinks}>
            {links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className={styles.hamburger}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={(event) => {
              const button = event.currentTarget;
              setIsMenuOpen((open) => {
                const nextOpen = !open;
                if (!nextOpen) {
                  // Prevent :focus-within from keeping the dock expanded.
                  button.blur();
                }
                return nextOpen;
              });
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
