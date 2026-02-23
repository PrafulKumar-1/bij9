import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { env } from "@/lib/env";
import { organizationJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const fontBody = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const fontHeading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "GlobalMerch Export | Merchant Exporter from India",
    template: "%s | GlobalMerch Export",
  },
  description:
    "Premium merchant exporter connecting global buyers with compliant, quality-assured sourcing from India.",
  keywords: [
    "merchant exporter",
    "india export",
    "global sourcing",
    "B2B wholesale",
    "dehydrated products",
    "agro exports",
  ],
  openGraph: {
    type: "website",
    title: "GlobalMerch Export",
    description: "Global Trade. Premium Quality. Trusted Worldwide.",
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/api/og?title=GlobalMerch%20Export"),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalMerch Export",
    description: "Global Trade. Premium Quality. Trusted Worldwide.",
    images: [absoluteUrl("/api/og?title=GlobalMerch%20Export")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontBody.variable} ${fontHeading.variable} bg-[var(--gm-color-bg)] text-[var(--gm-color-text)] antialiased`}>
        <AppShell contactEmail={env.ADMIN_EMAIL} whatsappNumber={env.WHATSAPP_NUMBER}>
          {children}
        </AppShell>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
