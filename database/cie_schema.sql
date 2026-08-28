-- Central India Export Database Schema
-- Client: Central India Export (Nagpur, India)
-- Target: Hostinger MySQL / phpMyAdmin

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT NULL,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_path VARCHAR(255) NOT NULL,
  main_category VARCHAR(150) NOT NULL,
  brand VARCHAR(100) NULL,
  name VARCHAR(250) NOT NULL,
  slug VARCHAR(250) NOT NULL UNIQUE,
  short_description TEXT,
  long_description TEXT,
  specifications JSON,
  image_primary VARCHAR(255),
  is_featured TINYINT(1) DEFAULT 0,
  status ENUM('draft','published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rfq_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  country VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  product_slugs TEXT,
  quantity VARCHAR(100),
  message TEXT,
  ip_address VARCHAR(45),
  status ENUM('new','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS export_countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  region_name VARCHAR(120) NOT NULL,
  country_name VARCHAR(120) NOT NULL,
  verified TINYINT(1) DEFAULT 1
);
