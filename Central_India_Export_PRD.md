# Product Requirements Document (PRD)
## Central India Export — Corporate Website Redesign

| | |
|---|---|
| **Client** | Central India Export (est. 1985) |
| **Owner/CEO** | Sandeep Vaid |
| **Industry** | Ophthalmic Surgical Equipment Export / B2B Manufacturing Trade |
| **HQ** | Nagpur, Maharashtra, India |
| **GSTIN** | 27AAEFC8743J1Z5 |
| **Document version** | 1.0 |
| **Prepared for** | Development execution via "Antigravity" AI coding agent |
| **Hosting target** | Hostinger Shared Hosting (Apache + PHP + MySQL, `public_html`) |

---

## 1. Executive Summary

Central India Export runs a 39-year-old ophthalmic equipment export business out of Nagpur (India's "Zero Mile," next to the MIHAN cargo hub). Their current website (centralindiaexport.com) is a dated WooCommerce storefront with login/cart mechanics that don't fit their actual business model — **this is a wholesale B2B export catalog, not an e-commerce store.**

This PRD defines a ground-up redesign: a **fast, credible, quotation-driven (RFQ) corporate export website**, built on the locked CIE brand palette, with premium interaction design that reads as **hand-crafted and considered — not templated or "AI-generated."** No login/cart/checkout. Every product ends in one action: **Request a Quote.**

The final deliverable must be deployable as static-first `public_html` files + a single `.sql` file, suitable for Hostinger shared hosting, and must also run identically on `localhost` during development.

---

## 2. Goals & Non-Goals

### 2.1 Goals
- Replace the WooCommerce look with a premium, modern, medical/industrial-B2B aesthetic matching the locked palette.
- Make **categories immediately visible and browsable from the homepage** (client's explicit requirement, referencing the old site's left-hand category rail).
- Feature **ioVue** (their in-house IOL brand) prominently as the flagship product line.
- Show a **world map with the countries CIE exports to**, as a trust/credibility section.
- Every product/category page drives to a **"Request a Quote" (RFQ) form** — zero authentication, zero cart.
- Motion and interaction should feel purposeful and restrained, not decorative for its own sake.
- Ship as **portable PHP + static assets** for Hostinger shared hosting, with a matching `localhost` dev environment.
- Product copy (short + long descriptions) must be **fact-checked/verified against public sources**, not fabricated — flagged explicitly as an execution task below (§9).

### 2.2 Non-Goals
- No user accounts, login, registration, wishlist, or cart/checkout flow.
- No payment gateway.
- No Node.js **runtime** in production (Hostinger shared hosting does not reliably run persistent Node processes) — Node is a **build-time** tool only.
- No content that copies the layout/structure of the reference `skills.md` verbatim — it is a style *reference*, not a spec to clone.

---

## 3. Brand System (Locked — do not deviate)

### 3.1 Color tokens

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-primary-teal` | `#28B2A8` | 40,178,188 | Primary actions, links, accents (~60%) |
| `--color-primary-blue` | `#0D3666` | 13,59,102 | Headers, nav, footer, trust blocks (~25%) |
| `--color-teal-blue` | `#1FA6C9` | 31,166,201 | Secondary accents, hover states (~10%) |
| `--color-light-gray` | `#EBF1F5` | 232,241,245 | Section backgrounds (~3%) |
| `--color-soft-gray` | `#E2F5F7` | 242,245,247 | Card/surface backgrounds (~2%) |
| `--color-dark-navy` | `#1A2638` | 26,38,56 | Body text, high-contrast surfaces |
| `--gradient-brand` | `linear-gradient(135deg, #2BB2A8 0%, #0D3666 100%)` | — | Hero backdrops, CTA banners, badges |

Logo: `CIE_logo.png` (eye-globe mark + wordmark, teal→navy gradient). Use on light backgrounds only; provide a white/reversed variant for the dark-navy footer and mobile nav overlay.

### 3.2 Typography direction
- Do **not** default to Inter for everything (that is the #1 tell of an AI-generated template). Pair a **geometric/grotesk display face** (e.g., "Fraunces" or "Space Grotesk" for headings — pick one with real character) with a clean workhorse text face (Inter or "IBM Plex Sans") for body copy. This pairing must be finalized and locked before component build begins.
- Headings: tight tracking, confident scale jumps (not the safe 1.25 modular scale everyone uses) — e.g. 14 / 16 / 20 / 28 / 40 / 56 / 72 with intentional gaps.
- Numerals (stats, specs, model numbers) should use tabular figures.

### 3.3 "Do not look AI-generated" constraints
This is a hard requirement, not a suggestion. Antigravity must actively avoid:
- Purple/violet-tinted glassmorphism, generic blob gradients centered behind every hero, and the "3 feature cards with a colored icon circle in a light-gray rounded box" pattern repeated verbatim on every section.
- Perfectly symmetric, center-everything layouts on every section back-to-back. Vary rhythm: some sections left-anchored, some full-bleed, some asymmetric split.
- Overused combo of `rounded-2xl` + soft drop-shadow + hover `-translate-y-1` on literally every element. Use it selectively (product cards, buttons) — not on stat blocks, not on nav, not on section dividers.
- Stock "diverse team smiling at laptop" imagery or generic 3D render icon packs. Use **real product photography** (client will supply), technical line-art/blueprint iconography for instruments, and an eye/optics-specific visual motif (iris rings, corneal cross-section curves, precision crosshair marks) instead of generic rocket/lightbulb/shield SaaS icons.
- Emoji as icons. Use a proper icon set (Lucide or a custom SVG line-icon set drawn for ophthalmic/medical/export context — customs documents, cargo container, precision instrument, eye).
- The site should look like it was art-directed for **this specific 39-year-old Nagpur export business**, not reskinned from a SaaS landing page template. Reference cues: technical/blueprint grid overlays (nod to precision instruments), navy-and-teal medical trust palette, MIHAN/logistics motif in the trade-credibility section, actual instrument photography with soft studio shadows rather than flat cutouts.

---

## 4. Information Architecture / Sitemap

```
/ (Home)
/about-us
/products/                      → Category grid (all categories)
/products/{category-slug}/      → Category listing (filterable grid, RFQ CTA per item)
/products/{category-slug}/{product-slug}/  → Product detail (specs, RFQ CTA)
/iovue/                         → Featured brand microsite-in-a-page for ioVue IOLs
/global-reach/                  → (or homepage section) world map + export countries
/blog/                          → optional, phase 2
/contact-us
/request-a-quote/{product?}     → RFQ form (also opens as modal from any product card)
/thank-you
/privacy-policy, /terms
```

### Homepage section order (client-mandated: categories visible on homepage)
1. **Header/Nav** — logo, mega-menu with all categories (sticky, condenses on scroll)
2. **Hero** — blueprint-grid technical backdrop, headline + dual CTA (Explore Products / Request a Quote), hero product image (client to supply)
3. **Trust strip** — "39 Years", "10,000+ Customers", "MIHAN Nagpur Origin", "Global Export" as animated counters
4. **Category Grid** — all top-level categories as cards with icon + image + count, direct from old-site pattern but redesigned (this satisfies the client's explicit requirement)
5. **Featured Brand: ioVue** — dedicated full-width section, gradient brand background, IOL close-up imagery, "Request ioVue Catalog" CTA
6. **Why Choose Us** — Precision / Trust / Innovation / Global (reuse brand-values icons from the palette sheet, redrawn as custom line icons)
7. **Global Reach — World Map** — interactive SVG map, highlighted countries/regions CIE serves, hover tooltips
8. **Featured Products carousel** — pulled from top categories, each card → RFQ
9. **Process / How RFQ Works** — 3–4 step strip (Enquire → Quote → Sample/Docs → Shipment)
10. **CTA banner** — gradient band, "Get a Quotation Today"
11. **Footer** — categories, contact (Nagpur address, phones, emails), certifications, socials

---

## 5. Product Catalog

### 5.1 Source data
`central_india_export_products.csv` was supplied (456 rows) with columns: `S.No, Main Category, Category Path, Product Name, Short Description, Long Description, Product Slug, Image Path`.

**Data quality findings Antigravity must handle:**
- ~55% of rows have **empty** Short/Long Description and empty Image Path (only name + slug present) — these are placeholder/stub rows from the old WooCommerce export.
- `Image Path` values point to the old WordPress `wp-content/uploads` structure — **not usable directly**; new photography/assets will be supplied separately by the client and must be mapped by slug.
- Two near-duplicate category buckets exist due to a typo: **"Miscellaneous"** and **"Miscellaneouss"** — merge into one category during import.
- Category hierarchy uses a `>` delimited `Category Path` (e.g. `Instruments > Cannulas > ...`) — use this to build the nested category/subcategory taxonomy, not `Main Category` alone.
- A few Long Description fields contain literal spec-table text mashed into one string (e.g. Exophthalmometer, Trial Lens Set) — these should be parsed into a structured **Specifications table** (key/value pairs) rather than displayed as a paragraph.
- Row 158 has a corrupted description (`"Checking your browser before accessing"` — a scraped bot-block message, not real content). Discard and flag for content fetch.
- The IOL/lens products (Anterior Chamber IOLs, Iris Claw Lens, Hydrophilic/Hydrophobic Acrylic Foldable IOLs, PMMA lenses) reference the **ioVue** brand in their long descriptions — tag these `brand: ioVue` and surface them in the featured brand section.

### 5.2 Top-level categories (derived from CSV, for homepage grid)
1. Artificial Eyes & Implants
2. Instruments *(with subcategories: Cannulas, Forceps → Corneal Fixation / Fixation & Superior Rectus / Foldable IOL / Iris / Jewelers / Lasik / Mosquito / Muscle / Prechop / Suturing / Tissue / Tying / Vitreous, Lacrimal Instruments, Lens Manipulators & Rotators, Markers & Calipers, Needle Holder, Punches Curettes & Spoons, Scissors, Spatulas & Spuds, Speculums & Retractors)*
3. Intraocular Lenses *(incl. Disposable Injector & Cartridge, Hydrophobic Foldable, PMMA/Advance Capsular Tension Ring)*
4. Micro Surgical Blades & Knives
5. Miscellaneous *(merge with "Miscellaneouss")*
6. Ophthalmic Solutions *(incl. Ophthalmic Solutions & Strips)*
7. Retina Equipments
8. Vision Drum / Acuity Chart
9. *(Uncategorised → must be manually re-bucketed before launch, do not ship an "Uncategorised" nav item)*

### 5.3 Product page requirements
Each product page must render:
- Product name, category breadcrumb, hero image gallery (placeholder image system until client supplies real photos — see §9)
- Short description (1–2 lines, used in cards/listing)
- Long description (rewritten in clean prose, not a data dump)
- **Specifications table** — parsed from the CSV's structured spec text where present (material, optic diameter, power range, haptic design, A-constant, sterilization, etc.)
- Primary CTA: **"Request a Quote"** (opens RFQ modal pre-filled with product name/slug) — every single product and category page.
- Secondary: "Download Datasheet" (placeholder/disabled until client supplies PDFs — phase 2)
- Related products from the same category

### 5.4 Featured brand: ioVue
Client confirmed ioVue is the flagship product line (see `1787843074844_image.png` old homepage banner — "Best Seller: Acrylic Foldable Intraocular Lens"). Build a dedicated homepage section + `/iovue/` landing page: brand logo lockup, key specs (Constant, Square Edge, Diopters, Diameter, Filter, Haptics), and its own "Request ioVue Quote" CTA. Do **not** reuse the exact banner design from the old site — reinterpret it with the new brand system.

---

## 6. RFQ (Request for Quotation) System

Since there is no login/cart, RFQ is the single conversion mechanism site-wide.

**Trigger points:** product card "Get Quote" button, product detail page CTA, category page floating CTA, header "Request a Quote" button, footer form.

**Form fields:**
- Full Name* · Company Name* · Country* (dropdown) · Email* · Phone (with country code) · Product(s) interested in (auto-filled if launched from a product page, otherwise multi-select/search) · Quantity (approx.) · Message/Requirements · (honeypot + simple math/JS challenge for spam — no CAPTCHA vendor dependency required, but leave a hook to add Google reCAPTCHA v3 later)

**Behavior:**
1. Client-side validation (JS) → submit via `fetch()` to `/api/rfq-submit.php`
2. PHP validates + sanitizes, inserts into MySQL `rfq_submissions` table
3. PHP sends email notification to `cie@cieindia.com` and `vaidsandeep100@yahoo.co.in` via PHP `mail()`/SMTP (use PHPMailer with Hostinger SMTP credentials — do not rely on bare `mail()`, it's unreliable on shared hosting)
4. User redirected/shown a success state (inline, not a jarring full-page redirect) — "Thanks, our export team will respond within 24 hours."
5. Rate-limit by IP (basic, table-based) to prevent spam floods.

---

## 7. World Map / Global Reach Section

The old site has a static orange world map image with a generic "Across Continents" caption but **no verified, sourced list of specific countries CIE exports to** was provided in any uploaded file. Do not fabricate a country list.

**Instruction to Antigravity:** Build the interactive SVG/HTML world map component as **data-driven** from a single editable config file (e.g. `/data/export-countries.json`), pre-populated with placeholder region-level entries (e.g. "Africa", "Middle East", "South East Asia", "Latin America" — matching the vague framing already used on the old site) and clearly marked `// TODO: replace with client-verified country list before launch`. Ship the component fully functional (hover states, tooltips, count badge) so it only needs a data-file edit, not a rebuild, once the client provides the real list.

---

## 8. Motion & Interaction Spec

- Use **Framer Motion** (React) as the animation library.
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)` for all transitions, 0.4–0.6s durations.
- Scroll reveals via `whileInView`, `viewport={{ once: true, margin: "-10%" }}`, staggered children at 0.06–0.09s offset for grids/lists.
- Interactive elements (buttons, product cards, nav items) get **purposeful** hover states: card lift + shadow bloom + image scale(1.03) on product cards; underline sweep on text links; icon translate on arrow links.
- Counters (stats strip) animate on viewport entry using a lightweight custom hook, not a heavy dependency.
- World map: hover = tooltip + marker pulse; click = filter/scroll to relevant proof point (optional phase 2: link to filtered case studies).
- **Respect `prefers-reduced-motion`** — disable non-essential motion, no exceptions.
- Motion should reinforce the medical-precision brand feel — no bouncy/playful springs; use controlled, confident, slightly clinical easing (equipment-grade smoothness, not a consumer app).

---

## 9. Content & Data Execution Tasks (explicit instruction for Antigravity)

> **These are mandatory execution steps, not optional polish.**

1. **Verified product content pass:** For every product in the CSV — especially the ~250 rows with blank Short/Long Description — Antigravity must **search the web for the exact, verifiable product** (matching the eponym naming convention, e.g. "Kelman-Mc Pherson Tying Forceps," "Castroviejo Caliper") against manufacturer/distributor/medical-supply catalog sources, and write a short + long description **grounded in real, cross-checked information** about what that named ophthalmic instrument actually is and does. Do not invent specifications (dimensions, materials, power ranges) that cannot be verified — if a spec can't be confirmed, omit it rather than guess.
2. Flag any product where no reliable source can be found, and exclude it from the public catalog until the client confirms details, rather than publishing unverified claims (this is a medical/surgical instrument context — accuracy matters for compliance and client trust).
3. Normalize naming (e.g. "Mc Intyre" vs "McIntyre") consistently across the catalog.
4. Merge the "Miscellaneous"/"Miscellaneouss" categories and rebucket "Uncategorised" items into their correct category.
5. All final copy must read as professionally written prose (rewritten from the CSV's repetitive templated phrasing — "X are essential instruments used in ophthalmic surgeries for..." appears near-verbatim hundreds of times in the source CSV and must **not** ship as-is).
6. Product images: use clearly labeled placeholder blocks (with product name watermark, brand-colored) until the client supplies real photography — never scrape/hotlink random stock photos of unrelated instruments.

---

## 10. Technical Architecture

### 10.1 Hosting constraint → architecture decision
Hostinger shared hosting = Apache, PHP, MySQL, static file serving. **No persistent Node.js server in production.** Therefore:

- **Frontend:** Built with **React + Vite + TailwindCSS + Framer Motion**, compiled at build time (`npm run build`) into static HTML/CSS/JS. This is how Node is used — only as a build tool, never in production runtime.
- **Product catalog data:** Pre-rendered into static JSON at build time (from a maintained source file/spreadsheet or, if a lightweight admin is wanted later, from MySQL via a PHP export script). Product/category pages can be statically generated (SSG) at build time so they load fast and need zero server-side rendering.
- **Dynamic parts (PHP, actually runtime):**
  - `/api/rfq-submit.php` — RFQ form handler → MySQL insert + email via PHPMailer/SMTP
  - `/api/newsletter-subscribe.php` — optional
  - Both are plain PHP scripts placed directly inside `public_html/api/`, no framework needed (keep it dependency-light for shared hosting: PHPMailer via Composer, vendored and committed, since Composer CLI may not be available on the host).
- **Database:** MySQL, one `.sql` file (`database/cie_schema.sql`) with `CREATE TABLE` statements + safe seed data, importable via Hostinger's phpMyAdmin.

### 10.2 Suggested schema (`cie_schema.sql`)
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT NULL,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  icon VARCHAR(100),
  sort_order INT DEFAULT 0,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  brand VARCHAR(100) NULL,          -- e.g. 'ioVue'
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  short_description TEXT,
  long_description TEXT,
  specifications JSON,
  image_primary VARCHAR(255),
  is_featured TINYINT(1) DEFAULT 0,
  status ENUM('draft','published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE rfq_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200),
  country VARCHAR(100),
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  product_slugs TEXT,
  quantity VARCHAR(100),
  message TEXT,
  ip_address VARCHAR(45),
  status ENUM('new','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE export_countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  region_or_country VARCHAR(120) NOT NULL,
  iso_code VARCHAR(5),
  verified TINYINT(1) DEFAULT 0
);
```
> `products`/`categories` tables exist so the site is upgrade-ready for a future lightweight admin panel, even though phase 1 ships product data as static JSON generated from the cleaned CSV.

### 10.3 Deployment folder structure (final `public_html`)
```
public_html/
├── index.html
├── about-us/index.html
├── products/index.html
├── products/{category}/index.html
├── products/{category}/{product}/index.html
├── iovue/index.html
├── contact-us/index.html
├── assets/ (css, js, images — hashed filenames from Vite build)
├── data/products.json, categories.json, export-countries.json
├── api/
│   ├── rfq-submit.php
│   ├── config.php        (DB creds — gitignored, use .env-style include outside web root if possible)
│   └── vendor/ (PHPMailer, committed since Composer isn't guaranteed on host)
├── .htaccess              (clean URLs, force HTTPS, gzip, cache headers)
database/
└── cie_schema.sql
```

### 10.4 Local development parity
- Frontend: `npm run dev` (Vite dev server, hot reload) — proxies `/api/*` calls to local PHP.
- Backend: run via `php -S localhost:8000 -t public_html` (PHP's built-in server) or Laragon/XAMPP, with a local MySQL instance seeded from `cie_schema.sql`.
- Provide a root `README.md` with exact setup commands so the whole project runs on `localhost` before anything touches Hostinger.
- Environment toggle: `VITE_API_BASE_URL` env var (`http://localhost:8000/api` in dev, relative `/api` in production) — no hardcoded URLs.

---

## 11. Non-Functional Requirements
- **Performance:** Lighthouse ≥ 90 mobile for Performance/Accessibility/Best Practices/SEO. Images served responsively (`srcset`, WebP with fallback), lazy-loaded below the fold.
- **Accessibility:** WCAG AA contrast (palette already checked for this), full keyboard navigation, visible `focus-visible` rings, `prefers-reduced-motion` respected, semantic HTML/ARIA on nav and forms.
- **SEO:** Server-rendered/static HTML per product+category page (not client-side-only rendering, since B2B buyers and search engines both need crawlable pages), structured data (`Product`, `Organization`, `BreadcrumbList` JSON-LD), per-page meta titles/descriptions, sitemap.xml, robots.txt.
- **Security:** All PHP inputs sanitized/prepared statements (PDO, no raw string SQL), CSRF token on the RFQ form, HTTPS-forced via `.htaccess`, `config.php` DB credentials never committed with real values.
- **Browser support:** Latest 2 versions of Chrome/Edge/Firefox/Safari + iOS Safari/Chrome Android.

---

## 12. Antigravity Execution Prompts

Use these as sequential prompts inside the Antigravity agent. All uploaded reference files (`skills.md`, `CIE_logo.png`, palette sheet image, product CSV, old-site screenshot) are assumed available in the project root — instruct Antigravity to read them before each relevant phase.

### Prompt 1 — Project bootstrap
```
Read /skills.md, /CIE_logo.png, the CIE color palette reference image, the old-site screenshot,
and /central_india_export_products.csv in the project root before doing anything else.

Scaffold a new project:
- Frontend: React + Vite + TypeScript + TailwindCSS + Framer Motion, output as a static build.
- Backend: plain PHP 8 scripts (no framework) under /public_html/api, using PDO + prepared statements.
- Set up the folder structure exactly as defined in "Deployment folder structure" in the PRD
  (Central_India_Export_PRD.md, section 10.3), so the Vite build output lands directly inside
  /public_html/assets and pages build as static HTML files at the routes listed in section 4.
- Configure Tailwind theme tokens from PRD section 3.1 (exact hex values) as CSS variables —
  do not hardcode hex codes anywhere in components.
- Set up two npm scripts: `dev` (Vite dev server + PHP built-in server concurrently) and
  `build` (outputs directly into /public_html).
- Do not add any authentication, cart, or checkout dependencies.
```

### Prompt 2 — Design system
```
Using PRD section 3 (Brand System) and section 3.3 (anti-AI-slop constraints) as hard rules,
build the design token file and base primitives: Container, Section, SectionHeading, Button
(primary/secondary/ghost/dark variants with the specified motion), Card variants for
Product/Category/Blog cards, and the icon system (import Lucide, but also draw 4-6 custom
line icons for: precision instrument, cargo/export, eye/iris, certification/trust,
global shipping, quotation/document).

Explicitly avoid: purple glassmorphism, generic centered-blob hero backgrounds, identical
rounded-2xl+shadow treatment on every UI element, and stock icon-in-a-circle SaaS card
patterns. Reference the uploaded old-site screenshot only for what functionality/content
users expect (e.g. category sidebar, featured product banner) — do not copy its visual style.

Typography: pick and lock a display font paired with a body font per PRD 3.2, load via
self-hosted font files (not a generic Google Fonts CDN default like Inter alone).
```

### Prompt 3 — Data pipeline
```
Read /central_india_export_products.csv. Following PRD section 5.1 and section 9:
1. Parse Category Path into a nested category/subcategory tree; merge "Miscellaneous" and
   "Miscellaneouss"; flag "Uncategorised" rows for manual review.
2. For every product missing Short/Long Description, search the web for the real, named
   ophthalmic instrument or product and write verified, non-fabricated short + long
   descriptions and (only if confirmable) a specifications table. If nothing reliable is
   found, mark status "draft" and exclude from the public build, logging it to
   /data/needs-review.json instead of guessing.
3. Rewrite all templated/repetitive descriptions already present in the CSV into original,
   professional prose — do not ship the CSV's boilerplate phrasing verbatim.
4. Parse any long-description fields that are actually spec-table text mashed into a
   paragraph (e.g. Exophthalmometer, Trial Lens Set, hydrophilic IOL rows) into structured
   key/value specification objects.
5. Tag IOL/lens products referencing "IOVUE" with brand: "ioVue" and mark relevant ones
   is_featured: true.
6. Output the cleaned catalog as /data/products.json and /data/categories.json (shape must
   match the `products`/`categories` tables in PRD section 10.2), plus generate
   /database/cie_schema.sql with CREATE TABLE statements from section 10.2 and INSERT
   statements seeded from the cleaned JSON.
```

### Prompt 4 — Homepage
```
Build the homepage exactly per PRD section 4 "Homepage section order" (11 sections listed).
Category grid must be immediately visible without scrolling past unrelated content — this is
a hard client requirement. The ioVue section must be visually distinct (full-bleed gradient
band) from the generic "Why Choose Us" section. Build the World Map component per PRD
section 7 as data-driven from /data/export-countries.json, seeded with the placeholder
region-level values and a visible `// TODO` comment for the client's verified list.
Implement all motion per PRD section 8 (easing curve, stagger, prefers-reduced-motion guard).
```

### Prompt 5 — Category & product templates
```
Build /products/index (category grid), /products/{category}/index (filterable listing,
breadcrumb, RFQ CTA on every card), and /products/{category}/{product}/index (gallery,
short+long description, specifications table, sticky "Request a Quote" CTA, related
products) per PRD section 5.3-5.4. Statically generate these routes at build time from
/data/products.json so they ship as crawlable static HTML (see PRD section 11, SEO).
Add Product/BreadcrumbList JSON-LD structured data to every product page.
```

### Prompt 6 — RFQ system (frontend + PHP + MySQL)
```
Build the RFQ modal/page and form per PRD section 6: fields, client-side validation,
honeypot + basic spam guard, and POST to /api/rfq-submit.php. Write rfq-submit.php using
PDO prepared statements against the rfq_submissions table (PRD section 10.2), sanitize all
inputs, send a notification email via PHPMailer/SMTP to cie@cieindia.com and
vaidsandeep100@yahoo.co.in, and return a JSON success/error response the frontend can show
inline. Add basic IP-based rate limiting. Do not use bare PHP mail().
```

### Prompt 7 — Remaining pages, SEO, and local/prod parity
```
Build About Us, Contact Us (with the verified Nagpur address/phones/emails from the PRD
header), Privacy/Terms, and 404 pages. Add sitemap.xml, robots.txt, per-page meta tags,
and Organization JSON-LD (name, address, GSTIN if applicable, logo, contact points from
the PRD). Verify the project runs identically via `npm run dev` on localhost (with the
local PHP + MySQL setup from PRD section 10.4) and after `npm run build` when served from
/public_html by Apache. Produce a README with exact local setup and Hostinger deployment
steps (upload public_html contents, import database/cie_schema.sql via phpMyAdmin, set
api/config.php DB credentials, update .htaccess for the live domain).
```

---

## 13. QA / Acceptance Checklist

- [ ] Categories are visible and browsable directly from the homepage without extra clicks
- [ ] Every product and category page has a working "Request a Quote" CTA — no dead buttons
- [ ] No login, registration, cart, or checkout UI exists anywhere on the site
- [ ] ioVue has a distinct, prominent featured treatment on the homepage and its own page
- [ ] World map renders and is clearly marked as placeholder-data pending client's verified country list
- [ ] No product ships with fabricated specs or unverified claims; unverifiable rows are excluded, not guessed
- [ ] "Miscellaneous"/"Miscellaneouss" merged; no "Uncategorised" nav item ships
- [ ] Site does not visually resemble a generic SaaS/AI-template (§3.3 checklist honored — spot-check against it manually)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Lighthouse mobile scores ≥ 90 across Performance/Accessibility/Best Practices/SEO
- [ ] RFQ submissions land correctly in MySQL and trigger email notifications
- [ ] Identical behavior confirmed on `localhost` and after deployment to Hostinger `public_html`
- [ ] `cie_schema.sql` imports cleanly via phpMyAdmin on a fresh Hostinger database

---

## 14. Open Items Requiring Client Input Before Launch
1. **Verified list of export countries/regions** for the world map (none supplied — see §7).
2. Real product photography for ioVue and priority categories (current CSV image paths are unusable).
3. Final confirmation on which of the ~250 blank-description CSV rows should be published vs. removed.
4. Display font pairing sign-off (§3.2) — one round of options should be presented before component build locks in.
5. SMTP credentials (Hostinger email account) for the RFQ mailer.
6. Confirmation on including a blog (currently phase 2 / optional).
