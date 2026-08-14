# ENV.md — Environment Variables Setup & Configuration

This document defines the required environment variables for local development and production deployment on Vercel.

---

## 1. Local Environment Setup (`.env.local`)

Create a `.env.local` file in the root of your project and populate it with the following keys:

```bash
# =====================================================================
# SANITY.IO HEADLESS CMS CONFIGURATION
# =====================================================================
# Your Sanity Project ID (found at https://www.sanity.io/manage)
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id_here"

# Dataset name (default is "production")
NEXT_PUBLIC_SANITY_DATASET="production"

# API Version string (YYYY-MM-DD format)
NEXT_PUBLIC_SANITY_API_VERSION="2026-08-07"

# Read Token for fetching draft or private data (Optional for public data)
SANITY_API_READ_TOKEN="your_sanity_read_token_here"


# =====================================================================
# PUBLIC SITE CONFIGURATION
# =====================================================================
# Base URL for OpenGraph metadata, canonical links, and social shares
NEXT_PUBLIC_SITE_URL="https://kkn004somagede.com"
```

---

## 2. Vercel Deployment Instructions
When deploying to Vercel:
1. Navigate to your project settings in the Vercel Dashboard.
2. Select **Environment Variables**.
3. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `NEXT_PUBLIC_SITE_URL`.
4. Ensure the variables are enabled for **Production**, **Preview**, and **Development** environments.
