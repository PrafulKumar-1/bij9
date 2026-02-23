import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Truck } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { AnimatedSection } from "@/components/sections/animated-section";
import { CtaStrip } from "@/components/sections/cta-strip";
import { SectionHeading } from "@/components/sections/section-heading";
import { TrustBadges } from "@/components/sections/trust-badges";
import { WorldMap } from "@/components/sections/world-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedProducts, getPublishedCategories } from "@/lib/data";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Global Trade. Premium Quality. Trusted Worldwide.",
  description: "Merchant exporter from India delivering reliable global sourcing, quality assurance, and shipment execution.",
  path: "/",
});

const logisticsSteps = [
  "Inquiry",
  "Sourcing",
  "Sampling",
  "Quality Control",
  "Packing",
  "Shipping",
  "Documentation",
];

const testimonials = [
  {
    quote: "Consistent quality, transparent documentation, and dependable shipment planning every cycle.",
    author: "Procurement Lead, EU Food Importer",
  },
  {
    quote: "They understand commercial urgency and custom specs better than standard suppliers.",
    author: "Director, Middle East Trading Group",
  },
  {
    quote: "Reliable merchant exporter for mixed consignments and strict inspection protocols.",
    author: "Category Manager, North America Distributor",
  },
];

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([getPublishedCategories(), getFeaturedProducts(6)]);
  const t = getDictionary("en");

  return (
    <div className="space-y-24 pb-20 pt-8">
      <section className="relative min-h-[75vh] overflow-hidden rounded-2xl border border-[var(--gm-color-border)]">
        <Image
          alt="Premium cargo and global shipping"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/40" />

        <div className="relative flex min-h-[75vh] flex-col justify-center px-6 py-20 md:px-16">
          <AnimatedSection>
            <div className="max-w-3xl space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--gm-color-gold)]">Merchant Exporter | India → Worldwide</p>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl leading-tight text-white md:text-6xl">{t.heroTitle}</h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--gm-color-text-muted)] md:text-lg">{t.heroSubtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/products">Explore Products</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/request">Send Requirement</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/contact">Become a Buyer</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection>
        <section className="space-y-10">
          <SectionHeading
            description="Flexible, buyer-led sourcing across essential and custom categories."
            eyebrow="Categories"
            title="Premium category coverage for global procurement"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <Link
                className="group relative h-72 overflow-hidden rounded-xl border border-[var(--gm-color-border)]"
                href={`/categories/${category.slug}`}
                key={category.id}
              >
                <Image
                  alt={category.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={category.heroImageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl text-white">{category.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--gm-color-gold)]">{category._count.products} products</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="space-y-10">
          <SectionHeading
            description="Image-forward catalog curated for international wholesale requirements."
            eyebrow="Featured"
            title="High-demand export products"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Globe2,
              title: "Flexible sourcing model",
              description: "We source standard products and custom buyer specifications through vetted supplier networks.",
            },
            {
              icon: ShieldCheck,
              title: "Compliance-first execution",
              description: "Documentation, inspection, and quality checkpoints are built into each shipment flow.",
            },
            {
              icon: Truck,
              title: "Global logistics confidence",
              description: "Structured packing, route planning, and export paperwork for smooth customs clearance.",
            },
          ].map((advantage) => {
            const Icon = advantage.icon;
            return (
              <Card key={advantage.title}>
                <CardContent className="space-y-4 p-6">
                  <Icon className="h-8 w-8 text-[var(--gm-color-gold)]" />
                  <h3 className="text-2xl text-white">{advantage.title}</h3>
                  <p className="text-sm leading-7 text-[var(--gm-color-text-muted)]">{advantage.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="grid gap-8 rounded-2xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6 lg:grid-cols-2 lg:p-12">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--gm-color-gold)]">Global Reach</p>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white">Serving buyers across strategic trade corridors</h2>
            <p className="text-sm leading-7 text-[var(--gm-color-text-muted)]">
              Active dispatch coordination across North America, Europe, GCC, Africa, and Asia-Pacific with buyer-focused shipment planning.
            </p>
            <ul className="space-y-2 text-sm text-[var(--gm-color-text-muted)]">
              {["North America", "Europe", "Middle East", "Africa", "Asia-Pacific"].map((region) => (
                <li className="flex items-center gap-2" key={region}>
                  <CheckCircle2 className="h-4 w-4 text-[var(--gm-color-gold)]" />
                  {region}
                </li>
              ))}
            </ul>
          </div>
          <WorldMap />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="space-y-7 rounded-2xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-8">
          <SectionHeading
            className="max-w-4xl text-left"
            description="Certificate-backed quality system with end-to-end export documentation support."
            eyebrow="Compliance & Trust"
            title="Built for high-trust international buying"
          />
          <TrustBadges />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="space-y-8">
          <SectionHeading
            description="A transparent operational sequence from first enquiry to final documentation."
            eyebrow="Logistics"
            title="Shipment process"
          />
          <div className="grid gap-3 md:grid-cols-7">
            {logisticsSteps.map((step, index) => (
              <div
                className="flex items-center justify-between rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[var(--gm-color-text-muted)]"
                key={step}
              >
                <span>{step}</span>
                {index < logisticsSteps.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-[var(--gm-color-gold)]" /> : null}
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="space-y-8">
          <SectionHeading
            description="Representative buyer feedback on quality consistency, documentation, and delivery confidence."
            eyebrow="Testimonials"
            title="Trusted by procurement teams worldwide"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.author}>
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm leading-7 text-[var(--gm-color-text-muted)]">“{item.quote}”</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--gm-color-gold)]">{item.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <CtaStrip />
    </div>
  );
}
