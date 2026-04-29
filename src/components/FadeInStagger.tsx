"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import styles from "./FadeInOnView.module.css";

type FadeInStaggerProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/** Staggered fade/lift for direct children when entering viewport (once). */
export default function FadeInStagger({
  children,
  className = "",
  ...rest
}: FadeInStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.staggerObserve} {...rest}>
      <div
        className={`${styles.staggerRootInner} ${className} ${visible ? styles.staggerVisible : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
