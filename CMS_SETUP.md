# PAG CMS Setup (Non-Technical Team Friendly)

This site uses **Decap CMS**.

## Do You Need Supabase?
No. Supabase is **not required** for this CMS setup.

The easiest production setup is:
- **Netlify hosting**
- **Netlify Identity**
- **Git Gateway**

## What Is Already Done
- CMS admin page exists at `app/public/admin/index.html`
- CMS config is ready at `app/public/admin/config.yml`
- Editable content is in `app/content/*.json`

## One-Time Setup (Production)
1. Deploy the `app` folder to Netlify.
2. In Netlify dashboard: `Site configuration -> Identity`:
   - Enable Identity
   - Set registration to `Invite only` (recommended)
3. In the same Identity section:
   - Enable **Git Gateway**
4. Invite your editors:
   - `Identity -> Users -> Invite users`
5. Update this file with your real domain:
   - `app/public/admin/config.yml`
   - Replace:
     - `site_url: https://your-domain.com`
     - `display_url: https://your-domain.com`
6. Redeploy.

## How Editors Use It
1. Go to: `https://your-domain.com/admin/`
2. Log in from invited email.
3. Edit sections (Hero, About, Activities, Model, Presence, Contact, Footer).
4. Click **Publish**.

Changes are committed to Git automatically.

## Local Test (Optional)
If you want to test CMS locally:
1. In `app/public/admin/config.yml`, uncomment:
   - `local_backend: true`
2. Run:
   - `npx decap-server`
   - `npm run dev`
3. Open:
   - `http://localhost:5173/admin/`
