"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./LegalReader.module.css";

export type LegalTocItem = {
  /** Must match `id` on each section heading (`<h2 id={...}>`) */
  id: string;
  /** Compact label shown in the TOC (e.g. `1`, `2`) */
  tab: string;
  /** Full section title ; shown next to the number */
  title: string;
};

type LegalReaderProps = {
  toc: LegalTocItem[];
  children: ReactNode;
};

/** Left-hand section index + scroll spy ; sticky TOC stays reachable while scrolling */
export default function LegalReader({ toc, children }: LegalReaderProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    const nodes = toc
      .map((t) => document.getElementById(t.id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        visible.sort(
          (a, b) =>
            (a.target as HTMLElement).getBoundingClientRect().top -
            (b.target as HTMLElement).getBoundingClientRect().top,
        );

        const top = visible[0]?.target as HTMLElement | undefined;
        if (top?.id) setActiveId(top.id);
      },
      { rootMargin: "-12% 0px -48% 0px", threshold: [0, 0.15] },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Jump to section">
        <p className={styles.sidebarLabel}>Jump to section</p>
        <nav className={styles.nav}>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeId === item.id ? styles.navActive : ""}`}
              title={item.title}
              onClick={(e) => {
                if (typeof window === "undefined") return;
                if (window.location.hash === `#${item.id}`) {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              {item.tab}. {item.title}
            </a>
          ))}
        </nav>
      </aside>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
