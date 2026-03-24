# PAG Deployment Setup Guide

This document explains the actual deployment setup used for the Pan Africa Group website.

## 1. Stack Overview

- Frontend: React + TypeScript + Vite
- Hosting: cPanel (`public_html`)
- CDN / DNS: Cloudflare
- CI/CD: GitHub Actions
- Deployment method: FTP upload from GitHub Actions to cPanel
- Optional CMS layer: Sanity

## 2. Repository and Key Paths

- Repository app root: `app/`
- Deployment workflow: `.github/workflows/deploy-cpanel.yml`
- Build output: `dist/`
- Public server target: `public_html`
- Contact endpoint: `public/api/contact.php`

## 3. GitHub to cPanel Deployment Flow

The deployment path is:

1. Make local changes in the `app` folder
2. Commit and push to GitHub `main`
3. GitHub Actions runs automatically
4. The workflow builds the Vite app into `dist/`
5. GitHub uploads `dist/` to cPanel over FTP
6. Cloudflare serves the updated site

## 4. GitHub Workflow Used

Workflow file:

- `.github/workflows/deploy-cpanel.yml`

What it does:

1. Checks out the repository
2. Sets up Node 20
3. Runs `npm ci`
4. Runs `npm run build`
5. Creates SPA `.htaccess` rules inside `dist/`
6. Uploads `dist/` to cPanel using `SamKirkland/FTP-Deploy-Action`

## 5. GitHub Secrets Required

Set these in:

- `GitHub Repo -> Settings -> Secrets and variables -> Actions`

Required cPanel / FTP secrets:

- `CPANEL_FTP_SERVER`
- `CPANEL_FTP_PORT`
- `CPANEL_FTP_USERNAME`
- `CPANEL_FTP_PASSWORD`
- `CPANEL_TARGET_DIR`

Required Sanity build secrets:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Recommended cPanel target directory:

- `CPANEL_TARGET_DIR=/`

Use `/` only if the FTP user is already scoped to `public_html`.

## 6. cPanel Setup We Used

The cPanel deployment relies on a dedicated FTP user.

Typical values used:

- FTP host: `ftp.pag-global.com`
- FTP port: `21`
- FTP user: FTP account created inside cPanel
- FTP directory target: `public_html`

Best practice:

1. Create a dedicated FTP user only for GitHub deployment
2. Limit that user to `public_html`
3. Use that FTP user in GitHub Secrets

## 7. Apache / SPA Routing

Because this is a React single-page application, the server needs SPA rewrite rules.

The workflow creates this `.htaccess` file in `dist/` during deploy:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
```

This allows routes like:

- `/about`
- `/capabilities`
- `/areas-of-operation`
- `/initiatives`
- `/contact`

to work correctly on cPanel.

## 8. Cloudflare Setup

Cloudflare sits in front of cPanel.

Important points:

1. Root domain `@` should point to the cPanel server IP
2. `www` should point correctly to the website target
3. FTP host should be DNS-only if used for FTP connectivity
4. After deploy, purge Cloudflare cache if old assets are still served

Typical post-deploy cache step:

- `Cloudflare -> Caching -> Purge Everything`

## 9. How to Deploy Future Updates

From the project directory:

```powershell
cd "C:\Users\Administrator\OneDrive - Solstice Ventures Holding Limited\Desktop\PAG\app"
git add .
git commit -m "Describe the change"
git push origin main
```

After push:

1. Open GitHub `Actions`
2. Confirm the latest `Deploy to cPanel` run is green
3. Hard refresh the live website
4. Purge Cloudflare cache if needed

## 10. How to Verify Deployment Worked

Use this checklist:

1. GitHub Action run completed successfully
2. cPanel `public_html/index.html` has a fresh timestamp
3. cPanel `public_html/assets/` files have fresh timestamps
4. The live site loads the latest hashed JS/CSS assets
5. The visible website reflects the new change

## 11. Current Sanity Behavior

Sanity is integrated, but the app currently uses local JSON by default unless explicitly enabled.

This was done to avoid live CMS content overriding the final approved website copy.

Important implication:

- Code/content changes in local JSON are deployed through GitHub
- Sanity content should only be re-enabled intentionally

If Sanity is re-enabled later:

1. Make sure Sanity content matches the approved website copy
2. Otherwise Sanity can override the deployed local content

## 12. Contact Form Delivery

The contact form endpoint is:

- `/api/contact.php`

Primary delivery path:

- Resend API

Detailed mail operations guide:

- `docs/EMAIL_DELIVERY_RUNBOOK.md`

## 13. Recommended Handover Notes for Client

The client/admin should know:

1. Website code is deployed from GitHub to cPanel automatically
2. Cloudflare may cache old versions temporarily
3. cPanel is the hosting environment
4. The contact form depends on server-side mail configuration
5. Sanity exists, but should only be reactivated if content governance is ready

## 14. Related Documents

- `docs/HANDOVER.md`
- `docs/CMS_EDITOR_GUIDE.md`
- `docs/EMAIL_DELIVERY_RUNBOOK.md`
