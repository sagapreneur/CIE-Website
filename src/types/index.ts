export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  category_path: string;
  main_category: string;
  short_description: string;
  long_description: string;
  specifications: Record<string, any>;
  image: string;
  image_url?: string;
  is_featured: boolean;
}

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: SubCategory[];
  product_count: number;
}

export interface ExportRegion {
  region: string;
  countries: string[];
}

export interface RfqFormData {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  productSlugs: string[];
  productName?: string;
  quantity: string;
  message: string;
  honeypot?: string;
}
