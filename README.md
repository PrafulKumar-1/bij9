# GlobalMerch Export

Production-ready Next.js B2B merchant exporter website (India -> Worldwide) with premium UI, product catalog, enquiry funnels, and auth-protected admin dashboard.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS + shadcn-style UI components
- Framer Motion (subtle premium animations)
- Prisma ORM + SQLite (Prisma 7 config + better-sqlite3 adapter, Postgres-upgrade friendly)
- Custom JWT admin auth (`/admin`)
- React Hook Form + Zod validation
- Local filesystem upload adapter (`/public/uploads`) with future S3/R2-ready abstraction
- Email notifications via Resend or SMTP (Nodemailer)
- SEO metadata + JSON-LD + dynamic OG image + sitemap + robots

## Features Implemented

- Premium responsive public website:
  - Home, Products, Product detail, Category detail
  - Send Requirement, About, Compliance, Logistics, Contact
  - Strong B2B CTAs on all pages
- Product catalog:
  - Search, category filter, sorting, pagination
- Product detail:
  - Gallery, specs table, packaging chips, brochure support, sticky enquiry panel
- Admin dashboard (auth protected):
  - Categories CRUD
  - Products CRUD
  - Media upload manager
  - Enquiries status pipeline (New/Contacted/Quoted/Closed)
  - Requirements status pipeline (New/Contacted/Quoted/Closed)
  - CSV product import endpoint + page
- End-to-end enquiry + requirement flow:
  - Stores in database
  - Sends admin email notifications
- Seed data:
  - 6 categories + 12 products including dehydrated mushroom, onion, garlic
- Local placeholder image pack:
  - `hero.jpg`, `map.jpg`, `category-*.jpg`, `product-*.jpg`

## Project Structure

- `app/` routes and API handlers
- `components/` reusable UI + page sections + admin/forms
- `lib/` db/auth/storage/validators/seo/utils
- `styles/` design tokens
- `prisma/` schema + seed
- `public/` media placeholders and uploads

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Apply schema to local database:

```bash
npm run prisma:migrate
```

5. Seed database:

```bash
npm run prisma:seed
```

6. Start dev server:

```bash
npm run dev
```

## Admin Login

- URL: `http://localhost:3000/admin/login`
- Credentials come from `.env`:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`

Seed behavior:
- If `ADMIN_PASSWORD` is plain text, seed hashes it with bcrypt.
- If `ADMIN_PASSWORD` is already a bcrypt hash (`$2...`), seed stores it directly.

## Environment Variables

Required:

- `DATABASE_URL="file:./dev.db"`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SITE_URL`
- `WHATSAPP_NUMBER`

Email (choose one path):

- Resend:
  - `EMAIL_PROVIDER_API_KEY`
  - `EMAIL_FROM`

- SMTP:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `EMAIL_FROM`

Auth:

- `AUTH_SECRET` (recommended, fallback is `ADMIN_PASSWORD`)

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
npm run prisma:generate
npm run prisma:migrate
npm run prisma:push
npm run prisma:seed
```

## Notes for Production (Vercel)

- Replace SQLite with Postgres by changing Prisma datasource provider/url.
- Swap local storage adapter with S3/R2 adapter (same interface in `lib/storage/adapter.ts`).
- Set all env vars in Vercel project settings.
- Keep `/admin` credentials strong and rotate `AUTH_SECRET`.
- Migration SQL baseline is committed in `prisma/migrations/20260223110500_init/migration.sql`.
