<?php
/**
 * Copy this file to:
 *   /home/<cpanel-user>/contact-config.php
 * (outside public_html), then fill values.
 */
return [
    // Resend API key (recommended)
    'CONTACT_RESEND_API_KEY' => 're_xxxxxxxxxxxxxxxxxxxxx',

    // Must be a verified sender/domain in Resend
    'CONTACT_FROM_EMAIL' => 'info@pag-global.com',

    // Keep true while migrating; set false after Resend works reliably
    'CONTACT_FALLBACK_MAIL' => 'true',
];

