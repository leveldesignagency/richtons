"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  /** Default inverts logo to white for dark pages; `brand` keeps SVG fills (e.g. light backgrounds). */
  logoTreatment?: "lightOnDark" | "brand";
};

export default function SiteHeader({
  links,
  disableScrollOverlay = false,
  alwaysShowOverlay = false,
  fullBleedBarUntilScroll = false,
  logoTreatment = "lightOnDark",
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuDockRef = useRef<HTMLElement | null>(null);
  const headerShellRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  /** Hysteresis avoids true/false thrash at ~24px (trackpad bounce → fewer repaints / no React scroll work). */
  const scrolledPastRef = useRef(false);

  useLayoutEffect(() => {
    const el = headerShellRef.current;
    if (!el) return;

    let rafId = 0;

    const syncScrolledClass = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      let next = scrolledPastRef.current;
      if (scrolledPastRef.current) {
        if (y < 6) next = false;
      } else {
        if (y > 32) next = true;
      }
      if (next !== scrolledPastRef.current) {
        scrolledPastRef.current = next;
        el.classList.toggle(styles.scrolled, next);
      }
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        syncScrolledClass();
      });
    };

    syncScrolledClass();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
      ref={headerShellRef}
      className={`${styles.headerShell} ${
        disableScrollOverlay ? styles.noScrollOverlay : ""
      } ${alwaysShowOverlay ? styles.alwaysOverlay : ""} ${
        fullBleedBarUntilScroll ? styles.headerFullBleedUntilScroll : ""
      } ${isMenuOpen ? styles.headerMenuOpen : ""}`}
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Richtons home">
          <Image
            src="/header logo richtons.svg"
            alt="Richtons Environmental Services"
            width={220}
            height={56}
            priority
            className={`${styles.logo} ${logoTreatment === "brand" ? styles.logoBrand : ""}`.trim()}
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
                className={styles.menuLink}
                data-active={
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                    ? "true"
                    : "false"
                }
                onClick={() => {
                  const href = link.href;
                  const alreadyHere =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(`${href}/`));
                  /* Never queue close before navigation: microtasks run before the link/router
                     default runs on mobile and can strand taps (overlay gets pointer-events:none). */
                  if (alreadyHere) setIsMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.menuFooter} aria-hidden>
              <Image
                src="/header logo richtons.svg"
                alt=""
                width={210}
                height={54}
                className={styles.menuFooterLogo}
              />
            </div>
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
