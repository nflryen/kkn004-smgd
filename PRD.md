# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Digital Portal & Interactive Storybook - KKN 004 Somagede

**STATUS: REVISED DRAFT (v0.2)**

| Item | Details |
| --- | --- |
| **Product Name** | Digital Portal & Interactive Storybook - KKN 004 Somagede |
| **Document Version** | v0.2 (CMS Integration & Mobile-First English Revision) |
| **Author** | Lead Developer / Vibe Coder |
| **Client / Target** | KKN 004 Somagede Team & Somagede Village Community |
| **Organization** | UIN Prof. K.H. Saifuddin Zuhri Purwokerto |
| **Date** | August 7, 2026 |
| **Related Documents** | `DESIGN.md` (Visual Identity & UI System) |

---

## 1. Executive Summary & Vision

Community Service Program (KKN) documentation at the village level is frequently constrained to printed reports or fragmented social media posts. Consequently, village potential, work program (proker) records, and community service highlights are rarely archived in a permanent, structured, and visually engaging manner for the public, university stakeholders, or village officials.

To address this gap, KKN 004 Somagede is constructing an interactive digital web portal designed as a **digital atlas** and **storybook**. Built with a **Mobile-First** approach, the platform blends local cultural narratives, interactive maps of regional potential, MSME/tourism showcases, and transparent work program tracking. The interface incorporates rich animations inspired by modern digital storybooks (such as *Biak Elok*) and is powered by **Sanity.io Headless CMS**, allowing the media team to seamlessly manage content without touching the codebase.

---

## 2. Goals & Key Objectives

- **Centralized Digital Archive:** Consolidate all data, news, media galleries, and work program reports into a single, public-facing web platform.
- **Mobile-First Optimization:** Ensure an exceptional user experience on smartphones without compromising widescreen desktop aesthetics.
- **Digital Atlas & Map:** Deliver an interactive map and catalog showcasing local potential, tourism spots, and MSME (UMKM) products in Somagede Village.
- **Immersive Storytelling:** Engage visitors through fluid scroll-triggered animations, interactive glassmorphism UI elements, and rich editorial layouts.
- **Effortless Content Management:** Enable the media team to publish articles, upload photos, update proker statuses, and mark map coordinates via Sanity.io Studio.

---

## 3. Target Audience & Roles

- **Public Visitors / Local Villagers / Tourists:** Explore Somagede Village stories, browse the interactive map, read community news, and view media galleries on mobile or desktop devices.
- **Field Supervisors (DPL) & University Representatives:** Track group progress, evaluate work program outcomes per division, and monitor social impact.
- **KKN 004 Media Team / Administrators:** Access the Sanity.io Studio Dashboard (`/admin`) to create/edit articles, upload event photos, update proker statuses, and manage village map pins.

---

## 4. Project Scope

### 4.1 In-Scope (MVP)
- Mobile-First Responsive Landing Page with glassmorphism visual aesthetics.
- Interactive Somagede Village Potential Map (MSMEs, Tourism, Public Facilities).
- KKN 004 Team Directory & Work Program Status Tracker.
- Digital Storybook Blog (Articles & News) and Masonry Photo/Video Gallery.
- **Sanity.io Headless CMS Integration** (`/admin`) for content management.
- Motion-rich interactions (scroll-triggered reveals, glass drawer navigation, page transitions).
- Custom domain setup (`.com` or `.web.id`) hosted on Vercel with automated SSL.

### 4.2 Out-of-Scope (Future Phases)
- Real-time citizen grievance/suggestion ticketing system.
- E-commerce transaction engine for village MSME products.

---

## 5. Technical Constraints & Assumptions

- **Domain:** Custom TLD (`.com` or `.web.id`).
- **Design Strategy:** *Mobile-First Design* (optimized primarily for 360px - 430px smartphone viewports before scaling to tablets and desktops).
- **Frontend Stack:** Next.js / Astro, Tailwind CSS, Framer Motion / Motion.
- **Backend & CMS:** **Sanity.io Free Tier** paired with **Vercel** hosting (100% $0 infrastructure cost).

---

## 6. Functional Requirements

### 6.1 Public — Mobile-First Landing Page & Branding

| ID | Requirement | Priority |
| --- | --- | --- |
| **HERO-1** | System displays an immersive Hero Section featuring "KKN 004 Somagede", triple-logo badge (Group, UIN Saizu, Banyumas), and quick navigation buttons. | **Must-Have** |
| **HERO-2** | System provides a thumb-friendly mobile navigation drawer with a frosted glass backdrop (`backdrop-blur-2xl`). | **Must-Have** |
| **HERO-3** | System renders key statistical highlights (total proker, divisions, village population) with count-up animations. | **Should-Have** |
| **HERO-4** | System displays a sponsor, media partner, and university grid. | **Must-Have** |

### 6.2 Public — Digital Atlas & Village Potential

| ID | Requirement | Priority |
| --- | --- | --- |
| **MAP-1** | System renders an interactive map of Somagede Village supporting touch-friendly pan and zoom gestures. | **Must-Have** |
| **MAP-2** | Tapping a map pin opens a mobile bottom-sheet / desktop popup detailing the location, photo, and WhatsApp/Maps action links. | **Should-Have** |
| **MAP-3** | System presents a filterable catalog of local MSMEs and village landmarks. | **Must-Have** |

### 6.3 Public — Team & Work Program Tracker

| ID | Requirement | Priority |
| --- | --- | --- |
| **PROK-1** | System displays the organizational structure of KKN 004 Somagede (DPL, Kordes, Division Members). | **Must-Have** |
| **PROK-2** | System displays work programs filtered by Division and Status (`Planned`, `In Progress`, `Completed`). | **Must-Have** |

### 6.4 Admin — Sanity.io Headless CMS (`/admin`)

| ID | Requirement | Priority |
| --- | --- | --- |
| **CMS-1** | Media team members can authenticate securely into Sanity Studio (`/admin`). | **Must-Have** |
| **CMS-2** | Admins can draft, publish, edit, and delete rich-text story articles with image uploads. | **Must-Have** |
| **CMS-3** | Admins can update work program execution statuses and upload proof-of-work galleries. | **Must-Have** |
| **CMS-4** | Admins can add village map locations with latitude/longitude coordinates, images, and descriptions. | **Must-Have** |

---

## 7. Key User Flows

### 7.1 Media Team Publishing Content via Sanity CMS
1. Media team member navigates to `/admin` on a phone or laptop.
2. User authenticates via Sanity.io credentials.
3. User selects **"Work Program"** or **"Storybook Post"**.
4. User enters article details, selects the division, updates status to `Completed`, and attaches media photos.
5. User clicks **Publish**. The public site automatically updates via Incremental Static Regeneration / Revalidation.

---

## 8. High-Level Data Model (Sanity Schema)

| Sanity Document | Primary Fields | Description |
| --- | --- | --- |
| `proker` | `title`, `slug`, `division`, `status`, `date`, `coverImage`, `description`, `gallery` | Work program execution data |
| `villagePotency` | `name`, `category` (MSME/Tourism), `location` (lat, lng), `description`, `coverImage`, `whatsappContact` | Village map pins & catalog entries |
| `kknMember` | `name`, `role`, `division`, `photo`, `major` | KKN 004 member profiles |
| `post` | `title`, `slug`, `publishedAt`, `mainImage`, `body` (Portable Text), `author` | Storybook news & blog posts |

---

## 9. Non-Functional Requirements

- **Mobile-First UX/UI:** All interactive controls (buttons, navigation triggers, cards) are designed around thumb-zone ergonomics for mobile screens.
- **Glassmorphism & Rich Motion:** Utilize Framer Motion for scroll reveals, floating decorative 3D elements, and smooth page transitions adhering to `DESIGN.md`.
- **Fast Media Delivery:** Images uploaded through Sanity CDN are automatically optimized and served in Next-gen formats (WebP/AVIF).
- **Security & Domain:** Enforced HTTPS encryption provided by Vercel on the custom TLD (`.com` / `.web.id`).

---

## 10. Third-Party Integrations

| Provider | Service / Function | Tier |
| --- | --- | --- |
| **Vercel** | Frontend hosting, CI/CD, SSL management | Free Tier |
| **Sanity.io** | Headless Content Management System & Image CDN | Free Tier |
| **YouTube API** | Embedded player for KKN aftermovie videos | Free Tier |
| **Leaflet.js / Mapbox** | Interactive village map rendering | Open Source / Free Tier |
