import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/theme.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Enables `env(safe-area-inset-*)` on notched devices without changing desktop breakpoints. */
export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Richtons Environmental Services",
  description:
    "Licensed asbestos and hazardous material specialists delivering safe, compliant, and responsive environmental services.",
  /* Explicit icon avoids the implicit /favicon.ico metadata route, which can race with dev rebuilds. */
  icons: {
    icon: [{ url: "/Richtons%20Favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
