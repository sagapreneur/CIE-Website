export interface ProductVariant {
  model: string;
  name?: string;
  optic_dia?: string;
  overall_dia?: string;
  diopter?: string;
  a_constant?: string;
  haptic_type?: string;
  sterilization?: string;
  pco?: string;
  image?: string;
  specifications?: Record<string, any>;
}

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
  model?: string;
  variants?: ProductVariant[];
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
