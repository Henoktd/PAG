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
$headers[] = 'From: Pan Africa Group <info@pag-global.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['message' => 'Inquiry delivery failed. Please email info@pag-global.com directly.']);
    exit;
}

http_response_code(200);
echo json_encode(['message' => 'Inquiry submitted successfully.']);
