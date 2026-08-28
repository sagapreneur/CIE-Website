# Central India Export — Corporate Website Redesign

**Central India Export** (est. 1985, Nagpur, India) is a premier B2B manufacturer and exporter of ophthalmic surgical instruments, ioVue intraocular lenses (IOLs), micro-surgical blades, and ophthalmic equipment.

This repository contains the complete redesigned website codebase built strictly to [Central_India_Export_PRD.md](file:///d:/Marketolytics/Clients/Central%20India%20Export%202024/centralindiaexport.com/Central_India_Export_PRD.md) specifications.

---

## 🚀 Technical Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide Icons
- **Backend API**: Plain PHP 8 scripts (`public_html/api/rfq-submit.php`, `config.php`)
- **Database**: MySQL schema (`database/cie_schema.sql`) for RFQ submissions and catalog backup
- **Target Hosting**: Hostinger Shared Hosting (Apache + PHP 8 + MySQL, `public_html`)

---

## 🛠️ Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Frontend Dev Server
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

---

## 📦 Production Deployment for Hostinger Shared Hosting

### Step 1: Build Production Assets
```bash
npm run build
```
This compiles the entire frontend static application directly into the `public_html/` folder.

### Step 2: Upload Files to Hostinger
1. Open Hostinger File Manager or connect via FTP/SFTP.
2. Upload the **entire contents of `public_html/`** into your Hostinger domain's `public_html/` root directory.
   - Ensures `index.html`, `.htaccess`, `assets/`, `data/`, and `api/` are in place.

### Step 3: Database Import & Config
1. Log in to Hostinger **phpMyAdmin**.
2. Create a new MySQL database (e.g. `cie_db`).
3. Import `database/cie_schema.sql`.
4. Edit `public_html/api/config.php` with your Hostinger MySQL database name, user, and password:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_hostinger_dbname');
   define('DB_USER', 'your_hostinger_dbuser');
   define('DB_PASS', 'your_hostinger_dbpassword');
   ```

---

## 📋 Features Delivered
- **457 Products Catalog**: Fully categorized with specifications tables and search filtering.
- **ioVue Flagship Microsite**: Dedicated `/iovue` brand page showcasing intraocular lenses.
- **Interactive SVG World Map**: Data-driven global reach visualization (`export-countries.json`).
- **Wholesale RFQ System**: Modal and page quotation submissions saving to MySQL and emailing `cie@cieindia.com`.
- **Anti-AI Aesthetic**: Blueprint grid overlays, custom ophthalmic line icons, locked CIE brand palette (`#28B2A8`, `#0D3666`).
