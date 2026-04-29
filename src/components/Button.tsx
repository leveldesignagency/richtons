import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  effect?: "default" | "draw" | "glow";
};

export default function Button({
  label,
  href,
  variant = "primary",
  size = "md",
  effect = "default",
}: ButtonProps) {
  const isDraw = effect === "draw";
  const isGlow = effect === "glow";

  return (
    <Link
      href={href}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        isDraw ? styles.draw : ""
      } ${isGlow ? styles.glow : ""}`}
    >
      {isDraw ? (
        <>
          <svg
            className={styles.drawSvg}
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <rect
              className={styles.drawRect}
              x="1.5"
              y="1.5"
              width="97"
              height="37"
              rx="18.5"
              ry="18.5"
            />
          </svg>
          <span className={styles.buttonLabel}>{label}</span>
        </>
      ) : (
        label
      )}
    </Link>
  );
}
