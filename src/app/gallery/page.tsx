import type { Metadata } from 'next';
import { getGallery, getGalleryCategories } from '@/lib/content';
import GalleryGrid from '@/components/GalleryGrid';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Recent work at AD Beauty — brows, lips, lashes, nails and the clinic in Evesham.',
};

export default function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  const images = getGallery();
  const categories = getGalleryCategories();
  const initialCategory = searchParams.category && categories.includes(searchParams.category) ? searchParams.category : 'all';

  return (
    <div className="container-x pb-24 pt-24 sm:pt-32">
      <Reveal className="mb-14 text-center">
        <p className="eyebrow mb-4">Portfolio</p>
        <h1 className="title-xl">gallery</h1>
        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-[1.8] text-ink/90">
          Real clients, real results — healed work wherever possible, no filters.
        </p>
      </Reveal>
      <GalleryGrid images={images} categories={categories} initialCategory={initialCategory} />
    </div>
  );
}
