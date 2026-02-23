import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = absoluteUrl(`/api/og?title=${encodeURIComponent(title)}`);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "GlobalMerch Export",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GlobalMerch Export",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/hero.jpg"),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: process.env.WHATSAPP_NUMBER,
      email: process.env.ADMIN_EMAIL,
      availableLanguage: ["English"],
    },
    areaServed: ["North America", "Europe", "Middle East", "Asia-Pacific", "Africa"],
  };
}

export function productJsonLd(payload: {
  name: string;
  description: string;
  image: string;
  category: string;
  sku?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: payload.name,
    description: payload.description,
    image: [absoluteUrl(payload.image)],
    category: payload.category,
    sku: payload.sku ?? undefined,
    brand: {
      "@type": "Brand",
      name: "GlobalMerch Export",
    },
  };
}
