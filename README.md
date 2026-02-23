# GlobalMerch Export

Premium B2B merchant-export website (India -> Worldwide) built with Next.js App Router, Prisma, admin CMS, enquiry pipelines, and Netlify-ready deployment.

## Stack

- Next.js 16 + TypeScript + Tailwind + Framer Motion
- Prisma 7 + PostgreSQL (`@prisma/adapter-pg`)
- Auth-protected admin dashboard (`/admin`)
- React Hook Form + Zod
- Durable media storage options:
  - `local` (dev only)
  - `netlify-blobs` (recommended on Netlify)
- SEO metadata, JSON-LD, dynamic OG, sitemap, robots

## What works

- Public pages: Home, Products, Product detail, Categories, Request, About, Compliance, Logistics, Contact
- Admin pages: Products/Categories CRUD, media uploads, enquiries, requirements, CSV import
- Enquiry + requirement forms: validation, DB writes, email notifications
- File uploads: type/size validation + rate limiting + secure admin-only upload folder

## Project layout

- `app/` routes + API
- `components/` UI + sections + admin/forms
- `lib/` auth/db/storage/validators/utils
- `prisma/` schema + seed
- `public/` placeholders + uploads
- `netlify.toml` Netlify build/plugin config

## Local setup

1. Install dependencies

```bash
npm install
```

2. Create env

```bash
cp .env.example .env
```

3. Set your local Postgres URL in `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/globalmerch?schema=public"
```

4. Generate Prisma client + push schema + seed

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

5. Run app

```bash
npm run dev
```

## Netlify deployment (copy-paste friendly)

1. Push this repo to GitHub.
2. In Netlify: **Add new site -> Import from Git**.
3. Build config is already in `netlify.toml`.
   - Build command: `npm run prisma:generate && npm run build`
4. Add these env vars in Netlify (Builds + Functions scopes):

```env
DATABASE_URL=postgresql://...            # Neon/Supabase/Prisma Postgres
DATABASE_PROVIDER=postgresql
STORAGE_PROVIDER=netlify-blobs
NETLIFY_BLOBS_STORE=globalmerch-uploads
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=StrongPassword123!
AUTH_SECRET=long-random-secret
SITE_URL=https://your-site.netlify.app
WHATSAPP_NUMBER=919999999999
EMAIL_PROVIDER_API_KEY=...               # if using Resend
EMAIL_FROM=no-reply@yourdomain.com
# OR SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/EMAIL_FROM
```

5. Before first production deploy, apply schema + seed to production DB once from your machine:

```bash
DATABASE_URL="postgresql://..." npm run prisma:generate
DATABASE_URL="postgresql://..." npm run prisma:push
DATABASE_URL="postgresql://..." ADMIN_EMAIL="admin@yourdomain.com" ADMIN_PASSWORD="StrongPassword123!" npm run prisma:seed
```

6. Trigger Netlify deploy.

## Admin login

- URL: `/admin/login`
- Uses `ADMIN_EMAIL` + `ADMIN_PASSWORD` from env.

## Storage behavior

- `STORAGE_PROVIDER=local`
  - Saves uploads to `public/uploads` (dev only)
- `STORAGE_PROVIDER=netlify-blobs`
  - Saves files to Netlify Blobs
  - Files served via `/api/media/[...path]`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run build:netlify
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```
