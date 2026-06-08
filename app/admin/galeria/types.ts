import type { User } from "@supabase/supabase-js";

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  blurDataURL: string | null;
  created_at: string;
  order: number;

  // NUEVO: relación con categories
  category_id: string | null;
  categories?: {
    name: string;
  };
}

export interface GalleryAdminClientProps {
  session: any;
  images: GalleryImage[];
  categories: Category[];
}