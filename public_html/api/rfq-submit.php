<?php
/**
 * Central India Export - RFQ Quotation Submission Handler
 * Target: Hostinger Shared Hosting
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

// Parse JSON payload
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid payload']);
    exit;
}

// Honeypot anti-spam check
if (!empty($data['honeypot'])) {
    echo json_encode(['success' => true, 'message' => 'Submission accepted']);
    exit;
}

// Sanitize inputs
$fullName    = filter_var($data['fullName'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$companyName = filter_var($data['companyName'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$country     = filter_var($data['country'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email       = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone       = filter_var($data['phone'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$productName = filter_var($data['productName'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$quantity    = filter_var($data['quantity'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message     = filter_var($data['message'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ipAddress   = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

if (!$fullName || !$email || !$country) {
    echo json_encode(['success' => false, 'message' => 'Full Name, Email, and Country are required']);
    exit;
}

// Log to MySQL Database if available
$db = getDbConnection();
if ($db) {
    try {
        $stmt = $db->prepare("INSERT INTO rfq_submissions (full_name, company_name, country, email, phone, product_slugs, quantity, message, ip_address) VALUES (:full_name, :company_name, :country, :email, :phone, :product_slugs, :quantity, :message, :ip_address)");
        $stmt->execute([
            ':full_name'    => $fullName,
            ':company_name' => $companyName,
            ':country'      => $country,
            ':email'        => $email,
            ':phone'        => $phone,
            ':product_slugs'=> $productName,
            ':quantity'     => $quantity,
            ':message'      => $message,
            ':ip_address'   => $ipAddress
        ]);
    } catch (Exception $e) {
        // Fallthrough if DB error
    }
}

// Send Email Notifications
$toRecipients = ['cie@cieindia.com', 'vaidsandeep100@yahoo.co.in'];
$subject = "New Wholesale RFQ Quote Request from " . $companyName . " (" . $country . ")";

$body = "Central India Export - New Wholesale Quotation Request\n";
$body .= "=====================================================\n\n";
$body .= "Full Name: " . $fullName . "\n";
$body .= "Company Name: " . $companyName . "\n";
$body .= "Country: " . $country . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "Product Interested In: " . ($productName ? $productName : "General Wholesale Catalog") . "\n";
$body .= "Quantity: " . $quantity . "\n";
$body .= "Message Requirements: " . $message . "\n";
$body .= "IP Address: " . $ipAddress . "\n";
$body .= "Submitted At: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: Central India Export Website <no-reply@centralindiaexport.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

foreach ($toRecipients as $to) {
    @mail($to, $subject, $body, $headers);
}

echo json_encode(['success' => true, 'message' => 'Quotation request submitted successfully']);
