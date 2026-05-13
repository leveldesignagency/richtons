"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactQuickLinks from "@/components/ContactQuickLinks";
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

const MOBILE_MQ = "(max-width: 780px)";

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export default function SiteHeader({
  links,
  disableScrollOverlay = false,
  alwaysShowOverlay = false,
  fullBleedBarUntilScroll = false,
  logoTreatment = "lightOnDark",
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const menuDockRef = useRef<HTMLElement | null>(null);
  const headerShellRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isMobile = useIsMobileLayout();
  const scrolledPastRef = useRef(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

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

  /** Desktop: click outside the expanded dock closes it. Mobile uses a body portal — no document listeners. */
  useEffect(() => {
    if (!isMenuOpen || isMobile) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const onPointerDownCapture = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuDockRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDownCapture, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDownCapture, { capture: true });
    };
  }, [isMenuOpen, isMobile]);

  /** Mobile sheet: iOS-safe scroll lock (overflow:hidden alone is not enough). */
  useEffect(() => {
    if (!isMobile || !isMenuOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobile, isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const mobilePortal =
    portalReady &&
    isMobile &&
    isMenuOpen &&
    createPortal(
      <aside
        id="site-header-mobile-sheet"
        className={styles.mobileNavSheet}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <nav className={styles.mobileNavList} aria-label="Site sections">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={`mobile-${link.label}-${link.href}`}
                href={link.href}
                className={styles.mobileNavLink}
                data-active={active ? "true" : "false"}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.mobileNavContact}>
          <div className={styles.mobileNavContactInner}>
            <ContactQuickLinks onInteract={closeMenu} alignEnd />
          </div>
        </div>
      </aside>,
      document.body,
    );

  /** Desktop: widens the pill. Mobile: same class drives hamburger → X on the real header control. */
  const dockOpenClass = isMenuOpen ? styles.menuDockOpen : "";
  const headerMenuOpenClass = isMenuOpen ? styles.headerMenuOpen : "";

  return (
    <header
      ref={headerShellRef}
      className={`${styles.headerShell} ${
        disableScrollOverlay ? styles.noScrollOverlay : ""
      } ${alwaysShowOverlay ? styles.alwaysOverlay : ""} ${
        fullBleedBarUntilScroll ? styles.headerFullBleedUntilScroll : ""
      } ${headerMenuOpenClass}`}
    >
      {mobilePortal}

      <div
        className={`${styles.headerInner} ${isMobile && isMenuOpen ? styles.headerInnerMobileMenu : ""}`}
      >
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
          className={`${styles.menuDock} ${dockOpenClass}`}
          aria-label="Main menu"
        >
          {!isMobile ? (
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
          ) : null}
          <button
            className={styles.hamburger}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls={isMobile && isMenuOpen ? "site-header-mobile-sheet" : undefined}
            onClick={() => setIsMenuOpen((open) => !open)}
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
