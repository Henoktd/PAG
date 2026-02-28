const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 32;
const MAX_CATEGORY = 80;
const MAX_MESSAGE = 3000;
const REQUEST_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimitStore = new Map();

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  };
}

function sanitizeString(value, maxLength) {
  const normalized = String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalized.slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[+\d\s().-]{7,32}$/.test(phone);
}

function getClientIp(event) {
  const forwardedFor = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }
  return event.headers['client-ip'] || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + REQUEST_WINDOW_MS });
    return false;
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  return false;
}

function isAllowedOrigin(originHeader) {
  const allowList = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowList.length === 0) return true;
  return allowList.includes(originHeader);
}

async function sendEmail(payload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!resendApiKey || !toAddress) {
    return {
      ok: false,
      message: 'Server email integration is not configured.',
      statusCode: 503,
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: payload.email,
      subject: `PAG Institutional Inquiry: ${payload.visitors}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Inquiry Category: ${payload.visitors}`,
        '',
        'Message:',
        payload.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: 'Inquiry delivery failed on the mail gateway.',
      statusCode: 502,
    };
  }

  return { ok: true };
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Method not allowed.' });
  }

  const origin = event.headers.origin || event.headers.Origin || '';
  if (!isAllowedOrigin(origin)) {
    return json(403, { message: 'Request origin is not allowed.' });
  }

  const ip = getClientIp(event);
  if (isRateLimited(ip)) {
    return json(429, { message: 'Too many submissions. Please try again later.' });
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { message: 'Invalid JSON payload.' });
  }

  // Honeypot field. Return a generic accepted response to avoid signaling spam detection.
  if (String(requestBody.website || '').trim() !== '') {
    return json(202, { message: 'Inquiry submitted.' });
  }

  const name = sanitizeString(requestBody.name, MAX_NAME);
  const email = sanitizeString(requestBody.email, MAX_EMAIL).toLowerCase();
  const phone = sanitizeString(requestBody.phone, MAX_PHONE);
  const visitors = sanitizeString(requestBody.visitors, MAX_CATEGORY);
  const message = sanitizeString(requestBody.message, MAX_MESSAGE);

  if (name.length < 2) return json(400, { message: 'Please provide a valid full name.' });
  if (!isValidEmail(email)) return json(400, { message: 'Please provide a valid work email.' });
  if (!isValidPhone(phone)) return json(400, { message: 'Please provide a valid phone number.' });
  if (visitors.length < 2) return json(400, { message: 'Please choose an inquiry category.' });
  if (message.length < 20) return json(400, { message: 'Please provide a detailed message (minimum 20 characters).' });

  const delivery = await sendEmail({ name, email, phone, visitors, message });
  if (!delivery.ok) {
    return json(delivery.statusCode || 500, { message: delivery.message || 'Inquiry submission failed.' });
  }

  return json(200, { message: 'Inquiry submitted successfully.' });
}
