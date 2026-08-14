# ARCHITECTURE.md — System Architecture & Technical Guidelines

**Project:** KKN 004 Somagede (UIN Prof. K.H. Saifuddin Zuhri Purwokerto)  
**Target Architecture:** Jamstack / Modern Serverless Web Application  
**Primary Tech Stack:** Next.js (App Router, React 19, TypeScript), Tailwind CSS, Framer Motion, Sanity.io Studio CMS  
**Deployment Infrastructure:** Vercel Edge Network & Sanity Content Lake (100% Free Tier Compliant)  

---

## 1. System Architecture Overview

The system follows a modern **Jamstack / Decoupled Architecture**. The frontend is rendered dynamically and statically via **Next.js App Router**, while content management (articles, work programs, team profiles, and village map locations) is handled by **Sanity.io Studio** embedded directly at the `/admin` route.

```text
[ Client Device / Smartphone / Desktop ]
                   │
                   ▼ (HTTPS Request)
    [ Vercel Edge Network / Next.js Frontend ]
        │                             │
        ├── (On-Demand ISR / Fetch)  └── (Direct Studio Route /admin)
        ▼                             ▼
  [ Sanity.io Content Lake CDN ]   [ Sanity Studio CMS Interface ]
  (GraphQL / GROQ Data Queries)    (Rich Text & Media Uploads)
```

---

## 2. Directory & Project Structure

The project uses Next.js App Router with TypeScript and a modular feature-driven structure.

```text
kkn-004-somagede/
├── public/
│   ├── assets/
│   │   ├── logos/           # Group, University, and Regional Logos
│   │   ├── backgrounds/     # Landscape blurs & ambient backgrounds
│   │   └── glass-3d/        # Floating glass element SVGs/images
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (public)/        # Public website route group
│   │   │   ├── page.tsx     # Hero, Highlights, & Map Preview
│   │   │   ├── stories/     # Blog / Storybook pages
│   │   │   │   └── [slug]/
│   │   │   ├── map/         # Interactive Village Atlas page
│   │   │   ├── proker/      # Work Program Tracker page
│   │   │   └── team/        # KKN 004 Organizational Structure
│   │   ├── admin/           # Embedded Sanity Studio route
│   │   │   └── [[...index]]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx       # Root layout with Glass Provider & Navbar
│   │   └── globals.css      # CSS Variables & Tailwind Custom Glass Utilities
│   ├── components/          # Reusable UI Components
│   │   ├── ui/              # Atom components (Buttons, GlassCard, Badges)
│   │   ├── glass/           # Frosted glass wrappers & floating motion decorators
│   │   ├── map/             # Leaflet/Mapbox interactive village map components
│   │   ├── layout/          # Header, TripleLogoBadge, MobileDrawer, Footer
│   │   └── sections/        # Section blocks (HeroSection, ProkerGrid, TeamCard)
│   ├── lib/                 # Utilities & Clients
│   │   ├── sanity/          # Sanity client, GROQ queries, image builder
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   └── utils.ts         # Tailwind class merger (cn helper)
│   └── sanity/              # Sanity Studio Schemas
│       ├── schemaTypes/
│       │   ├── proker.ts
│       │   ├── villagePotency.ts
│       │   ├── kknMember.ts
│       │   └── post.ts
│       └── env.ts
├── .env.local               # Environment variables
├── next.config.mjs          # Next.js configuration (Sanity CDN Domains)
├── tailwind.config.ts       # Glassmorphism tokens & color extensions
├── tsconfig.json
└── package.json
```

---

## 3. Data Fetching & Content Management Strategy

1. **Headless CMS Querying (GROQ):**  
   Data is fetched using GROQ (*Graph-Relational Object Queries*) from Sanity.io. All queries reside in `@/lib/sanity/queries.ts`.

2. **On-Demand Incremental Static Regeneration (ISR):**  
   Public pages use Next.js `revalidate = 60` or Sanity Webhooks to purge and revalidate pages automatically when the media team publishes content in Sanity Studio (`/admin`).

3. **Optimized Image Pipeline:**  
   All images uploaded to Sanity are transformed on-the-fly via `@sanity/image-url` and served in Next-gen WebP/AVIF formats through Next.js `<Image />` tags.

---

## 4. Key Sanity Schema Definitions

### A. Work Program (`proker.ts`)
```typescript
export default {
  name: 'proker',
  title: 'Work Program (Proker)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'division', title: 'Division', type: 'string', 
      options: { list: ['Kordes', 'Sekretaris', 'Bendahara', 'Logistik', 'Humas', 'Media', 'Acara'] } },
    { name: 'status', title: 'Status', type: 'string', 
      options: { list: ['Planned', 'In Progress', 'Completed'] } },
    { name: 'date', title: 'Execution Date', type: 'date' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description / Impact', type: 'text' },
  ]
}
```

### B. Village Potential / Map Pin (`villagePotency.ts`)
```typescript
export default {
  name: 'villagePotency',
  title: 'Village Potential & Map Pin',
  type: 'document',
  fields: [
    { name: 'name', title: 'Location Name', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['UMKM', 'Tourism', 'Public Facility', 'Culture'] } },
    { name: 'latitude', title: 'Latitude', type: 'number' },
    { name: 'longitude', title: 'Longitude', type: 'number' },
    { name: 'coverImage', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'whatsappContact', title: 'WhatsApp Contact Number', type: 'string' },
  ]
}
```

---

## 5. Environment Variables & Setup (`.env.local`)

To run the application locally or deploy to Vercel, configure the following keys:

```bash
# Sanity.io Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-08-07"
SANITY_API_READ_TOKEN="your_read_token"

# Base Application URL
NEXT_PUBLIC_SITE_URL="https://kkn004somagede.com"
```

---

## 6. Coding Standards & AI Agent Guidelines

When executing tasks or generating components via AI Agents (Antigravity / Vibe Coding):

1. **Mobile-First Utility Classes:** Always write Tailwind classes starting from mobile viewports (e.g., `p-4 md:p-8 lg:p-12`).
2. **Glassmorphism Utility Usage:** Ensure cards use `backdrop-blur-md bg-white/10 border border-white/20 shadow-xl` matching `DESIGN.md`.
3. **Motion Performance:** Wrap heavy scroll or floating animations inside Framer Motion `<motion.div>` blocks with explicit `viewport={{ once: true }}` to preserve mobile battery and frame rates.
4. **No Inline Styling:** Use Tailwind CSS or CSS Variables defined in `globals.css` for custom glass properties.
