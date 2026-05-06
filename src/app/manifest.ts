import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Richtons Environmental Services",
    short_name: "Richtons",
    description:
      "Licensed asbestos and hazardous material specialists delivering safe, compliant, and responsive environmental services.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090c",
    theme_color: "#4ab449",
    icons: [
      {
        src: "/Richtons%20Favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Richtons%20Favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/Richtons%20Favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
