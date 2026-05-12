import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { contact } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site-url";
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

const siteUrl = getSiteUrl();
const siteName = "Richtons Environmental Services";
const ogImagePath = "/og-share-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Licensed asbestos and hazardous material specialists delivering safe, compliant, and responsive environmental services.",
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "asbestos removal",
    "asbestos surveying",
    "asbestos management",
    "environmental remediation",
    "hazardous material specialists",
    "UK asbestos contractor",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title: siteName,
    description:
      "Licensed asbestos and hazardous material specialists delivering safe, compliant, and responsive environmental services.",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "Richtons Environmental Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Licensed asbestos and hazardous material specialists delivering safe, compliant, and responsive environmental services.",
    images: [ogImagePath],
  },
  manifest: "/site.webmanifest",
  /* Explicit icon avoids the implicit /favicon.ico metadata route, which can race with dev rebuilds. */
  icons: {
    icon: [
      { url: "/Richtons%20Favicon.svg", type: "image/svg+xml" },
      { url: "/Richtons%20Favicon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/Richtons%20Favicon.svg"],
    apple: [{ url: "/Richtons%20Favicon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/header%20logo%20richtons.svg`,
    image: `${siteUrl}${ogImagePath}`,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.lines[0],
      addressLocality: "Fordham, Colchester",
      postalCode: "CO6 3NY",
      addressCountry: "GB",
    },
    areaServed: "United Kingdom",
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-GB",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
