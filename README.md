# STORMGLIDE B2B Supply Portal
**Enterprise Logistics & Supply Solutions — Accra, Ghana**

A full-stack B2B marketplace and admin portal built with Next.js 14, Supabase, and Resend.

---

## What's Included

| Feature | Details |
|---|---|
| 🏠 Marketing homepage | Hero, services, supply, why us, industries, contact form |
| 📦 Product catalog | Search + filter, 12+ products with full specs |
| 🔬 Product detail pages | Technical specs table, certifications, applications, sticky quote form |
| 📋 Quote system | Form → Supabase → email notification to you + auto-reply to client |
| 🔐 Admin portal | Dashboard, quote inbox, status management, product visibility toggle |

---

## Phase 1 Setup (Get Live in 1–2 Hours)

### 1. Install dependencies
```bash
npm install
```

### 2. Create your Supabase project
1. Go to https://supabase.com and create a free account
2. Create a new project (name it `stormglide`, region: EU West or closest)
3. Go to **SQL Editor** → **New Query**, paste the contents of `supabase/schema.sql` and run it
4. Go to **Settings** → **API**, copy your Project URL, anon key, and service role key

### 3. Set up Resend (email notifications)
1. Go to https://resend.com, create a free account
2. Add and verify your domain (stormglide.com) OR use their test domain for now
3. Copy your API key

### 4. Create your environment file
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` and fill in all values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
NOTIFY_EMAIL=john@stormglide.com
ADMIN_PASSWORD=choose_a_strong_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run locally
```bash
npm run dev
```
Visit:
- http://localhost:3000 — Public website
- http://localhost:3000/catalog — Product catalog
- http://localhost:3000/catalog/sp-300 — Product detail (example)
- http://localhost:3000/admin — Admin portal

---

## Adding / Editing Products

All products live in `lib/data/products.js`. To add a new product:

1. Open `lib/data/products.js`
2. Copy an existing product block
3. Change the `id` (unique slug, no spaces), update all fields
4. Save — the product appears on the catalog immediately

No database, no CMS login needed for catalog edits.

### Product fields reference
```js
{
  id: 'unique-slug',           // URL: /catalog/unique-slug
  name: 'Product Name',
  category: 'chem',            // 'chem' | 'mach' | 'veh'
  subtitle: 'Short tagline',
  description: `Full paragraph description...`,
  certifications: ['ISO 9001', 'EN 934-2'],
  availability: 'In stock',    // 'In stock' | 'Limited stock' | 'Order basis (8-10 weeks)'
  minOrder: '1,000 kg',
  packagingOptions: ['200 L drum', '1,000 L IBC'],
  origin: 'China (Jiangsu)',
  specs: {
    'Key': 'Value',            // Rendered as a specs table
  },
  applications: ['Application 1', 'Application 2'],
  qualityNote: 'Quality context and international equivalents...',
  tags: ['tag1', 'tag2'],      // Used for search matching
}
```

---

## Admin Portal Usage

1. Visit `/admin`
2. Enter your `ADMIN_PASSWORD` from `.env.local`
3. **Dashboard** — overview of new quotes and activity
4. **Quotes** — click any row to open detail panel, update status, add notes, reply via email/WhatsApp
5. **Products** — toggle product visibility on the public catalog

### Quote workflow
1. Client submits form on catalog or homepage
2. Quote saved to Supabase → you receive email at `NOTIFY_EMAIL` → client receives auto-reply
3. Log into `/admin` → Quotes tab → click quote → reply via email or WhatsApp link
4. Mark as "Replied" or "Closed" to track status

---

## Deployment (Vercel — Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project → Settings → Environment Variables
# Add all variables from .env.local
```

After deploying, update `NEXT_PUBLIC_SITE_URL` to your production domain.

### Custom domain
In Vercel dashboard: **Project → Settings → Domains** → add `stormglide.com`
Then update your DNS records as instructed.

---

## Phase 2 Roadmap (Build Next)

- [ ] Client account login (email magic link via Supabase Auth)
- [ ] Shipment tracker — clients log in to see live status of their cargo
- [ ] Document vault — upload and share BLs, certificates, invoices per client
- [ ] Freight quote calculator (LCL CBM pricing, FCL flat rates)
- [ ] WhatsApp Business API integration for automated follow-ups
- [ ] Admin: bulk email clients about new products

## Phase 3 Roadmap

- [ ] Supplier RFQ system — send quote requests to your China suppliers from the portal
- [ ] Fleet management module (for auto-tech integration with your other venture)
- [ ] Multi-language (French for Guinea, Francophone West Africa expansion)
- [ ] Mobile app (React Native) for field team and client shipment tracking

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth (admin) | Password via env var (upgrade to Supabase Auth in Phase 2) |
| Email | Resend |
| Deployment | Vercel |
| Fonts | Google Fonts (Oswald + Plus Jakarta Sans) |

---

*Built for STORMGLIDE Enterprise Systems & Logistics Solutions, Accra, Ghana.*
