# Sanity Setup (Free Tier)

This website is now Sanity-ready and still keeps local JSON fallback.

## 1) Create Sanity project

1. Create account at `sanity.io` (free tier).
2. Create project and dataset (recommended: `production`).
3. Note your `projectId`.

## 2) Add environment variables

Create `app/.env` from `.env.example`:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```

## 3) Content model expected by this website

The frontend fetches one published document per type:

- `hero`
- `about`
- `activities`
- `model`
- `presence`
- `contact`
- `footer`

Optional:

- `partners`
- `governance`

Each document can be either:

1. Root fields matching current JSON structure, or
2. Wrapped under a `data` object with the same structure.

Example for `hero`:

```json
{
  "_type": "hero",
  "data": {
    "scriptText": "Pan Africa Group LLC",
    "mainTitle": "Cross-Border Business Development Across Gulf & East Africa",
    "ctaButtonText": "Start a Conversation",
    "backgroundImage": "/images/hero/uae.jpg",
    "decorativeText": "",
    "stats": [
      { "value": 3, "suffix": "", "label": "Office Locations" },
      { "value": 2, "suffix": "", "label": "Trade Corridors" },
      { "value": 4, "suffix": "", "label": "Core Activities" }
    ]
  }
}
```

## 4) Run website

```bash
npm install
npm run dev
```

If Sanity env vars are missing or content is unavailable, the site uses local `content/*.json` automatically.

## 5) Deploy on cPanel

1. Build:
```bash
npm run build
```
2. Upload files from `app/dist` to your cPanel public web root.
3. Add the same `VITE_SANITY_*` variables during build time (locally/CI before deploying `dist`).

