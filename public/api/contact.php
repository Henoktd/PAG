<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$config = [];
$configPath = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? ''), '/\\') . '/../contact-config.php';
if ($configPath !== '/../contact-config.php' && is_readable($configPath)) {
    $loaded = include $configPath;
    if (is_array($loaded)) {
        $config = $loaded;
    }
}

function config_value(string $key, array $config, string $default = ''): string {
    $env = getenv($key);
    if ($env !== false && trim((string)$env) !== '') {
        return trim((string)$env);
    }
    $cfg = $config[$key] ?? '';
    if (is_string($cfg) && trim($cfg) !== '') {
        return trim($cfg);
    }
    return $default;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON payload.']);
    exit;
}

// Honeypot field
if (!empty(trim((string)($data['website'] ?? '')))) {
    http_response_code(202);
    echo json_encode(['message' => 'Inquiry submitted.']);
    exit;
}

function clean_text(string $value, int $max): string {
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    $value = trim($value);
    return mb_substr($value, 0, $max);
}

$name = clean_text((string)($data['name'] ?? ''), 120);
$email = strtolower(clean_text((string)($data['email'] ?? ''), 254));
$phone = clean_text((string)($data['phone'] ?? ''), 32);
$category = clean_text((string)($data['visitors'] ?? ''), 80);
$message = clean_text((string)($data['message'] ?? ''), 3000);

if (mb_strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['message' => 'Please provide a valid full name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Please provide a valid work email.']);
    exit;
}

if (!preg_match('/^[+\d\s().-]{7,32}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['message' => 'Please provide a valid phone number.']);
    exit;
}

if (mb_strlen($category) < 2) {
    http_response_code(400);
    echo json_encode(['message' => 'Please choose an inquiry category.']);
    exit;
}

if (mb_strlen($message) < 20) {
    http_response_code(400);
    echo json_encode(['message' => 'Please provide a detailed message (minimum 20 characters).']);
    exit;
}

$to = 'info@pag-global.com';
$subject = "PAG Institutional Inquiry: {$category}";
$body = "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Phone: {$phone}\n"
    . "Inquiry Category: {$category}\n\n"
    . "Message:\n{$message}\n";

$headers = [];
$headers[] = 'To: ' . $to;
$headers[] = 'From: Pan Africa Group <info@pag-global.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$resendApiKey = config_value('CONTACT_RESEND_API_KEY', $config);
$fromAddress = config_value('CONTACT_FROM_EMAIL', $config, 'info@pag-global.com');
$fallbackEnabled = strtolower(config_value('CONTACT_FALLBACK_MAIL', $config, 'true')) !== 'false';

$sent = false;

if ($resendApiKey !== '' && function_exists('curl_init')) {
    $payload = [
        'from' => "Pan Africa Group <{$fromAddress}>",
        'to' => [$to],
        'reply_to' => $email,
        'subject' => $subject,
        'text' => $body,
    ];

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $resendApiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);

    $responseBody = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $responseJson = json_decode((string)$responseBody, true);
    $sent = ($httpCode >= 200 && $httpCode < 300)
        && is_array($responseJson)
        && isset($responseJson['id']);
}

if (!$sent && $fallbackEnabled) {
    // Force a valid envelope sender for Exim/cPanel routing.
    $envelopeSender = '-f info@pag-global.com';
    $sent = @mail($to, $subject, $body, implode("\r\n", $headers), $envelopeSender);
}

if (!$sent) {
    http_response_code(500);
    echo json_encode(['message' => 'Inquiry delivery failed. Please email info@pag-global.com directly.']);
    exit;
}

http_response_code(200);
echo json_encode(['message' => 'Inquiry submitted successfully.']);
