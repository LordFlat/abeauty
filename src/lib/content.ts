import fs from 'fs';
import path from 'path';
import treatmentsData from '../../content/treatments.json';
import reviewsData from '../../content/reviews.json';

export type PriceItem = { name: string; price: string; pack6?: string };
export type Treatment = {
  slug: string;
  name: string;
  subtitle?: string;
  cover: string;
  gallery: string | null;
  intro?: string;
  description: string;
  benefits?: string[];
  note?: string;
  prices: PriceItem[];
};
export type Category = {
  slug: string;
  title: string;
  menuLabel: string;
  hidden?: boolean;
  treatments: Treatment[];
};
export type PriceSection = { title: string; note?: string; columns?: string[]; hidden?: boolean; items: PriceItem[] };

// Set "hidden": true on a category/price section in treatments.json to hide it site-wide.
export const categories: Category[] = (treatmentsData.categories as Category[]).filter((c) => !c.hidden);
export const priceList: PriceSection[] = (treatmentsData.priceList as PriceSection[]).filter((s) => !s.hidden);

export function allTreatments(): { treatment: Treatment; category: Category }[] {
  return categories.flatMap((category) => category.treatments.map((treatment) => ({ treatment, category })));
}

export function getTreatment(slug: string): { treatment: Treatment; category: Category } | undefined {
  return allTreatments().find((t) => t.treatment.slug === slug);
}

export type Review = { text: string; author: string; treatment: string };
export const reviews: Review[] = reviewsData.reviews;

export type GalleryImage = { src: string; category: string; alt: string };

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');

// Gallery is folder-driven: drop a photo into public/gallery/<category>/ and redeploy.
export function getGallery(): GalleryImage[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  const images: GalleryImage[] = [];
  for (const dir of fs.readdirSync(GALLERY_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const file of fs.readdirSync(path.join(GALLERY_DIR, dir.name)).sort()) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
      images.push({
        src: `/gallery/${dir.name}/${file}`,
        category: dir.name,
        alt: `${dir.name} — ${file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}`,
      });
    }
  }
  return images;
}

export function getGalleryCategories(): string[] {
  return [...new Set(getGallery().map((i) => i.category))];
}

export function getGalleryByFolder(folder: string, limit?: number): GalleryImage[] {
  const imgs = getGallery().filter((i) => i.category === folder);
  return limit ? imgs.slice(0, limit) : imgs;
}
