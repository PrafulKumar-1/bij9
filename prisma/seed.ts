import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

type ProductSeed = {
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  originCountry: string;
  moqValue: number;
  moqUnit: string;
  packagingOptions: string[];
  leadTimeDays: number;
  certifications: string[];
  hsCode?: string;
  featured?: boolean;
  brochureUrl?: string;
  popularity?: number;
  images: Array<{ url: string; alt: string; sortOrder: number }>;
};

const categories = [
  {
    name: "Agro",
    slug: "agro",
    description: "Staple agro commodities sourced with quality and moisture control.",
    heroImageUrl: "/category-agro.jpg",
  },
  {
    name: "Spices",
    slug: "spices",
    description: "Whole and ground spices with export-ready cleaning and grading.",
    heroImageUrl: "/category-spices.jpg",
  },
  {
    name: "Dehydrated",
    slug: "dehydrated",
    description: "Dehydrated vegetables and mushrooms for food processing and retail channels.",
    heroImageUrl: "/category-dehydrated.jpg",
  },
  {
    name: "Fresh Produce",
    slug: "fresh-produce",
    description: "Fresh fruits and vegetables with handling protocols for international transit.",
    heroImageUrl: "/category-fresh-produce.jpg",
  },
  {
    name: "Industrial",
    slug: "industrial",
    description: "Industrial raw materials and additives from qualified Indian manufacturing partners.",
    heroImageUrl: "/category-industrial.jpg",
  },
  {
    name: "Custom Sourcing",
    slug: "custom-sourcing",
    description: "Buyer-specific sourcing for specialized requirements and private labels.",
    heroImageUrl: "/category-custom-sourcing.jpg",
  },
];

const products: ProductSeed[] = [
  {
    title: "Dehydrated Shiitake Mushroom",
    slug: "dehydrated-shiitake-mushroom",
    categorySlug: "dehydrated",
    shortDescription: "Uniformly dried shiitake slices for sauces, soups, and ready-meal manufacturing.",
    description:
      "Premium dehydrated shiitake mushroom with strict moisture control and consistent slice quality. Suitable for private label retail and industrial food processing.",
    originCountry: "India",
    moqValue: 1200,
    moqUnit: "kg",
    packagingOptions: ["10kg carton", "25kg moisture barrier bag"],
    leadTimeDays: 18,
    certifications: ["HACCP", "ISO 22000"],
    hsCode: "071239",
    featured: true,
    popularity: 95,
    images: [
      { url: "/product-1.jpg", alt: "Dehydrated shiitake mushroom slices", sortOrder: 0 },
      { url: "/product-2.jpg", alt: "Packed dehydrated mushroom lot", sortOrder: 1 },
    ],
  },
  {
    title: "Dehydrated White Onion Flakes",
    slug: "dehydrated-white-onion-flakes",
    categorySlug: "dehydrated",
    shortDescription: "High-purity onion flakes with controlled moisture and color retention.",
    description:
      "Dehydrated white onion flakes tailored for seasoning blenders and foodservice buyers. Processed, sorted, and packed under food safety controls.",
    originCountry: "India",
    moqValue: 1500,
    moqUnit: "kg",
    packagingOptions: ["20kg poly-lined carton", "25kg kraft bag"],
    leadTimeDays: 14,
    certifications: ["HACCP", "FSSAI"],
    hsCode: "071220",
    featured: true,
    popularity: 88,
    images: [
      { url: "/product-3.jpg", alt: "Dehydrated onion flakes close-up", sortOrder: 0 },
      { url: "/product-4.jpg", alt: "Bulk onion flake packaging", sortOrder: 1 },
    ],
  },
  {
    title: "Dehydrated Garlic Granules",
    slug: "dehydrated-garlic-granules",
    categorySlug: "dehydrated",
    shortDescription: "Consistent granulation and aroma profile for seasoning and food manufacturing.",
    description:
      "Garlic granules produced with strict sorting and metal detection steps. Ideal for processors requiring clean label ingredient consistency.",
    originCountry: "India",
    moqValue: 1000,
    moqUnit: "kg",
    packagingOptions: ["20kg carton", "25kg bag"],
    leadTimeDays: 16,
    certifications: ["ISO 22000", "HACCP"],
    hsCode: "071290",
    featured: true,
    popularity: 90,
    images: [
      { url: "/product-5.jpg", alt: "Dehydrated garlic granules", sortOrder: 0 },
      { url: "/product-6.jpg", alt: "Garlic granules in export pack", sortOrder: 1 },
    ],
  },
  {
    title: "Turmeric Fingers",
    slug: "turmeric-fingers",
    categorySlug: "spices",
    shortDescription: "Curcumin-rich turmeric fingers cleaned and graded for export spice channels.",
    description:
      "Sun-dried turmeric fingers sourced from certified farms and processed for low impurity levels. Fit for wholesale and extraction buyers.",
    originCountry: "India",
    moqValue: 2000,
    moqUnit: "kg",
    packagingOptions: ["50kg jute bag", "25kg PP bag"],
    leadTimeDays: 20,
    certifications: ["APEDA", "FSSAI"],
    hsCode: "091030",
    featured: false,
    popularity: 77,
    images: [
      { url: "/product-7.jpg", alt: "Turmeric fingers lot", sortOrder: 0 },
      { url: "/product-8.jpg", alt: "Turmeric export bags", sortOrder: 1 },
    ],
  },
  {
    title: "Cumin Seeds",
    slug: "cumin-seeds",
    categorySlug: "spices",
    shortDescription: "Machine-clean cumin seeds with controlled foreign matter and uniform color.",
    description:
      "Export-grade cumin seeds processed through color sorting and gravity cleaning for premium spice distributors.",
    originCountry: "India",
    moqValue: 1800,
    moqUnit: "kg",
    packagingOptions: ["25kg PP bag", "50kg bulk bag"],
    leadTimeDays: 15,
    certifications: ["FSSAI", "APEDA"],
    hsCode: "090931",
    featured: true,
    popularity: 83,
    images: [
      { url: "/product-9.jpg", alt: "Cumin seeds close-up", sortOrder: 0 },
      { url: "/product-10.jpg", alt: "Cumin packed in sacks", sortOrder: 1 },
    ],
  },
  {
    title: "Red Chili Whole",
    slug: "red-chili-whole",
    categorySlug: "spices",
    shortDescription: "Premium whole chili with heat-level customization and export packaging support.",
    description:
      "Dried whole red chili sorted by stem cut, color, and pungency profile for spice processors and global buyers.",
    originCountry: "India",
    moqValue: 2500,
    moqUnit: "kg",
    packagingOptions: ["25kg woven bag", "10kg carton"],
    leadTimeDays: 21,
    certifications: ["APEDA", "HACCP"],
    hsCode: "090421",
    featured: false,
    popularity: 70,
    images: [
      { url: "/product-11.jpg", alt: "Whole dry red chili", sortOrder: 0 },
      { url: "/product-12.jpg", alt: "Packed red chili consignment", sortOrder: 1 },
    ],
  },
  {
    title: "Fresh Pomegranate",
    slug: "fresh-pomegranate",
    categorySlug: "fresh-produce",
    shortDescription: "Export-grade fresh pomegranate with calibrated sorting and transit-ready packing.",
    description:
      "Selected fresh pomegranate packed with ventilation standards for overseas shelf-life retention.",
    originCountry: "India",
    moqValue: 10000,
    moqUnit: "kg",
    packagingOptions: ["3.5kg carton", "5kg carton"],
    leadTimeDays: 8,
    certifications: ["Phytosanitary", "APEDA"],
    hsCode: "081090",
    featured: false,
    popularity: 62,
    images: [
      { url: "/product-2.jpg", alt: "Fresh pomegranate shipment", sortOrder: 0 },
    ],
  },
  {
    title: "Fresh Green Chilli",
    slug: "fresh-green-chilli",
    categorySlug: "fresh-produce",
    shortDescription: "Fresh green chili with calibrated grading and destination-specific packing.",
    description:
      "Fresh produce line managed with sorting, rapid pre-cooling, and export documentation for regional markets.",
    originCountry: "India",
    moqValue: 6000,
    moqUnit: "kg",
    packagingOptions: ["4kg carton", "7kg carton"],
    leadTimeDays: 6,
    certifications: ["Phytosanitary"],
    hsCode: "070960",
    featured: false,
    popularity: 59,
    images: [
      { url: "/product-4.jpg", alt: "Fresh green chilli crate", sortOrder: 0 },
    ],
  },
  {
    title: "Basmati Rice 1121",
    slug: "basmati-rice-1121",
    categorySlug: "agro",
    shortDescription: "Long-grain basmati with aroma retention and moisture-managed export packing.",
    description:
      "Export basmati rice in private label and bulk options, cleaned and packed under quality supervision.",
    originCountry: "India",
    moqValue: 25000,
    moqUnit: "kg",
    packagingOptions: ["25kg bag", "50kg bag", "5kg retail bag"],
    leadTimeDays: 12,
    certifications: ["ISO 22000", "FSSAI"],
    hsCode: "100630",
    featured: true,
    popularity: 91,
    images: [
      { url: "/product-6.jpg", alt: "Basmati rice grains", sortOrder: 0 },
    ],
  },
  {
    title: "Yellow Maize Feed Grade",
    slug: "yellow-maize-feed-grade",
    categorySlug: "agro",
    shortDescription: "Feed-grade yellow maize with aflatoxin-managed sourcing and shipment planning.",
    description:
      "Bulk maize supply supported by lab testing, moisture checks, and vessel or container dispatch options.",
    originCountry: "India",
    moqValue: 50000,
    moqUnit: "kg",
    packagingOptions: ["Bulk container load", "50kg bag"],
    leadTimeDays: 10,
    certifications: ["SGS Inspection"],
    hsCode: "100590",
    featured: false,
    popularity: 66,
    images: [
      { url: "/product-8.jpg", alt: "Yellow maize bulk", sortOrder: 0 },
    ],
  },
  {
    title: "Guar Gum Powder",
    slug: "guar-gum-powder",
    categorySlug: "industrial",
    shortDescription: "Industrial-grade guar gum powder for food and process applications.",
    description:
      "Viscosity-controlled guar gum with batch testing and industrial export documentation support.",
    originCountry: "India",
    moqValue: 3000,
    moqUnit: "kg",
    packagingOptions: ["25kg multiwall paper bag"],
    leadTimeDays: 14,
    certifications: ["ISO 9001"],
    hsCode: "130232",
    featured: false,
    popularity: 64,
    images: [
      { url: "/product-10.jpg", alt: "Guar gum powder", sortOrder: 0 },
    ],
  },
  {
    title: "Custom Sourcing Program",
    slug: "custom-sourcing-program",
    categorySlug: "custom-sourcing",
    shortDescription: "Buyer-specific sourcing program for non-standard products and private labels.",
    description:
      "Structured sourcing service for custom requirements including sample development, supplier discovery, compliance checks, and shipment planning.",
    originCountry: "India",
    moqValue: 1,
    moqUnit: "project",
    packagingOptions: ["As per buyer specification"],
    leadTimeDays: 21,
    certifications: ["Documentation support", "Inspection coordination"],
    featured: true,
    popularity: 99,
    images: [
      { url: "/product-12.jpg", alt: "Custom sourcing workflow", sortOrder: 0 },
    ],
  },
];

function isBcryptHash(value: string) {
  return /^\$2[aby]\$.{56}$/.test(value);
}

function serializeArray(value: string[]) {
  return JSON.stringify(value);
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@globalmerchexport.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = isBcryptHash(adminPassword) ? adminPassword : await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const categoryMap = new Map<string, string>();

  for (const category of categories) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        heroImageUrl: category.heroImageUrl,
      },
      create: category,
    });

    categoryMap.set(category.slug, record.id);
  }

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      continue;
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        originCountry: product.originCountry,
        moqValue: product.moqValue,
        moqUnit: product.moqUnit,
        packagingOptions: serializeArray(product.packagingOptions),
        leadTimeDays: product.leadTimeDays,
        certifications: serializeArray(product.certifications),
        hsCode: product.hsCode ?? null,
        featured: Boolean(product.featured),
        brochureUrl: product.brochureUrl ?? null,
        status: "published",
        popularity: product.popularity ?? 50,
        images: {
          deleteMany: {},
          create: product.images,
        },
      },
      create: {
        title: product.title,
        slug: product.slug,
        categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        originCountry: product.originCountry,
        moqValue: product.moqValue,
        moqUnit: product.moqUnit,
        packagingOptions: serializeArray(product.packagingOptions),
        leadTimeDays: product.leadTimeDays,
        certifications: serializeArray(product.certifications),
        hsCode: product.hsCode,
        featured: Boolean(product.featured),
        brochureUrl: product.brochureUrl,
        status: "published",
        popularity: product.popularity ?? 50,
        images: {
          create: product.images,
        },
      },
    });
  }

  console.info("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
