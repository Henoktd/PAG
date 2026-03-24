# PAG Website Handover Guide

This document is the operational handover for the Pan Africa Group website.

## 1) Stack and Ownership

- Frontend: React + TypeScript + Vite
- CMS: Sanity Studio (hosted by Sanity)
- Hosting: cPanel (`public_html`) behind Cloudflare
- CI/CD: GitHub Actions deploy to cPanel via FTP on push to `main`
- Contact form backend: `public/api/contact.php`
- Contact delivery provider: Resend API (with optional PHP `mail()` fallback)

## 2) Main Repositories and Paths

- App root: `app/`
- Frontend source: `app/src/`
- Static/public files: `app/public/`
- Contact API endpoint: `app/public/api/contact.php`
- Content fallback JSON: `app/content/`
- Deployment workflow: `app/.github/workflows/deploy-cpanel.yml`
- Sanity setup notes: `app/SANITY_SETUP.md`
- Deployment setup guide: `app/docs/DEPLOYMENT_SETUP.md`

## 3) Live URLs

- Website: `https://pag-global.com`
- Studio (CMS): Sanity-hosted Studio URL from project dashboard
  - Note: CMS is not hosted at `/admin` on this website.

## 4) GitHub Secrets Required for Deployment

Set these in GitHub repo `Settings -> Secrets and variables -> Actions`.

- `CPANEL_FTP_SERVER`
- `CPANEL_FTP_PORT`
- `CPANEL_FTP_USERNAME`
- `CPANEL_FTP_PASSWORD`
- `CPANEL_TARGET_DIR`
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Recommended:

- `CPANEL_TARGET_DIR=/` when FTP user is already chrooted to `public_html`.

## 5) cPanel Required Files

Create this file outside web root:

- `/home/pagglocq/contact-config.php`

Template is in repo:

- `app/contact-config.example.php`

Do not commit real keys. The local secret file `contact-config.php` is ignored by git.

## 6) Cloudflare and DNS Baseline

- `@` record points to cPanel origin IP.
- `www` should point to `@` (CNAME recommended) for website traffic.
- FTP hostname should be DNS-only when used for FTP connectivity.
- Mail records must match your actual mail provider path (Office 365 or gateway provider).

## 7) CMS Editing Flow (Non-Technical Team)

1. Open Sanity Studio URL.
2. Edit sections (Hero, About, Activities, Operating Model, Regional Presence, Contact, Footer).
3. Click `Publish`.
4. Refresh website and verify content.

Detailed steps: `docs/CMS_EDITOR_GUIDE.md`.

## 8) Code Deployment Flow

1. Developer pushes changes to `main`.
2. GitHub Action builds `dist/` and deploys to cPanel via FTP.
3. Verify in GitHub Actions that workflow succeeded.
4. Hard refresh browser and purge Cloudflare cache if required.

## 9) Contact Form Delivery Flow

1. Website POSTs JSON to `/api/contact.php`.
2. API tries Resend first.
3. If configured, fallback to PHP mail.
4. Recipient mailbox: `info@pag-global.com`.

Detailed email setup and troubleshooting: `docs/EMAIL_DELIVERY_RUNBOOK.md`.

## 10) Operational Checklists

Pre-release:

- GitHub Action success
- Homepage, About, Contact render correctly
- Contact form test sent and received
- `www` and root domain both resolve correctly

Post-release:

- Verify no placeholder page is served
- Confirm mail not landing in Junk
- Verify CMS publish reflects on frontend

## 11) Known Lessons from Implementation

- If website keeps old placeholder, verify cPanel target directory and remove nested `public_html/public_html`.
- If contact form appears successful but no mail logs, verify `/api/contact.php` is actually reachable on live server.
- If mail goes to Junk, use authenticated provider sending (Resend) and verified domain alignment.
