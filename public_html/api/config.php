<?php
/**
 * Central India Export - API Database Configuration
 * Target: Hostinger Shared Hosting (MySQL + PHP 8)
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_cie_db'); // Replace with Hostinger MySQL DB Name
define('DB_USER', 'u123456789_cie_user'); // Replace with Hostinger MySQL DB User
define('DB_PASS', 'Hostinger_Password_Here'); // Replace with Hostinger DB Password

function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // Return null if DB not connected (graceful fallback)
        return null;
    }
}
