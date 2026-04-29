import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        color: "#f4f6f8",
        background: "#07090c",
        textAlign: "center",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: 0 }}>Page not found</h1>
      <p style={{ color: "#9eb0c0", margin: 0, maxWidth: "32rem" }}>
        The page you&rsquo;re looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{ color: "var(--color-brand)", fontWeight: 600, marginTop: "0.5rem" }}
      >
        Back to home
      </Link>
    </main>
  );
}
