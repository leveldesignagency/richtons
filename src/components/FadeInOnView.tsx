"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./FadeInOnView.module.css";

type FadeInOnViewProps = {
  children: ReactNode;
  className?: string;
  /** Delay before transition starts (ms) */
  delay?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/** Fade + slight lift when section enters the viewport (runs once). */
export default function FadeInOnView({
  children,
  className = "",
  delay = 0,
  style,
  ...rest
}: FadeInOnViewProps) {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mergedStyle: CSSProperties = {
    ...style,
    transitionDelay: visible ? `${delay}ms` : "0ms",
  };

  return (
    <div
      ref={ref}
      className={`${styles.fadeIn} ${visible ? styles.fadeInVisible : ""} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
