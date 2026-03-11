# Contact Email Delivery Runbook

This runbook explains how the website contact form sends email reliably.

## 1) Current Design

- Endpoint: `/api/contact.php`
- Primary send method: Resend API
- Fallback send method: PHP `mail()` (optional)
- Recipient: `info@pag-global.com`

## 2) Secure Configuration

Create file on server:

- `/home/pagglocq/contact-config.php`

Example:

```php
<?php
return [
  'CONTACT_RESEND_API_KEY' => 're_xxxxxxxxxxxxxxxxx',
  'CONTACT_FROM_EMAIL' => 'info@pag-global.com',
  'CONTACT_FALLBACK_MAIL' => 'false',
];
```

Notes:

- Keep this file outside `public_html`.
- Do not commit real API keys to GitHub.

## 3) Resend Setup

1. Create account at `resend.com`.
2. Add domain `pag-global.com` and verify DNS records.
3. Create API key with sending permission.
4. Put API key in `contact-config.php`.
5. Set `CONTACT_FROM_EMAIL` to a verified sender on that domain.

## 4) Testing Procedure

1. Submit contact form from live site.
2. Check inbox and junk for `info@pag-global.com`.
3. In cPanel, use `Track Delivery` to inspect event details.

Expected:

- Successful delivery event appears.
- Recipient is resolved correctly.

## 5) If Messages Go to Junk

- Ensure domain verification is complete in Resend.
- Keep `From` aligned with verified domain.
- Keep user email only in `Reply-To`.
- Add mailbox rule as temporary mitigation while reputation warms.

## 6) If No New Event Appears in cPanel

- Confirm `/api/contact.php` is reachable on live site.
- Confirm latest build is deployed from GitHub Actions.
- Confirm form submission returns JSON response from API.

## 7) Incident Response Checklist

When contact form fails:

1. Capture test timestamp.
2. Capture form response message.
3. Capture cPanel Track Delivery event details.
4. Check GitHub Actions deploy status.
5. Check DNS/mail routing changes made recently.

