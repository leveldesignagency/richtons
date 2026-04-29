import Link from "next/link";

export default function NewsPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        padding: "4rem 1.25rem",
        background: "#0b0f14",
        color: "#eff4f9",
        fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <p style={{ color: "#9fb0c0", marginBottom: "0.75rem" }}>Richtons</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "0.9rem" }}>
          News
        </h1>
        <p style={{ maxWidth: "42rem", lineHeight: 1.7, color: "#d7e0ea" }}>
          Latest project updates, safety insights, and company announcements will
          be published here.
        </p>
        <Link href="/" style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--color-brand)" }}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
