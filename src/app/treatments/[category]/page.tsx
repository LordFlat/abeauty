import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import TreatmentCard from '@/components/TreatmentCard';
import TreatmentDetail from '@/components/TreatmentDetail';
import { getCategory, categoryParams, isLeafCategory, titleImage } from '@/lib/treatmentsPage';
import { getGalleryImages } from '@/lib/treatmentImages';

export function generateStaticParams() {
  return categoryParams();
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.title,
    description: category.intro,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  // Leaf categories (IPL, Laser Tattoo Removal) are a treatment themselves.
  if (isLeafCategory(category)) {
    return (
      <TreatmentDetail
        breadcrumbs={[{ label: 'Treatments', href: '/treatments' }, { label: category.title }]}
        image={titleImage(category.slug)}
        name={category.title}
        intro={category.intro}
        description={category.description}
        benefits={category.benefits}
        note={category.note}
        galleryImages={getGalleryImages(category.galleryKey)}
      />
    );
  }

  return (
    <div className="pb-24 pt-24 sm:pt-32">
      <Reveal className="container-x mb-14 max-w-3xl text-center sm:mb-20">
        <p className="eyebrow mb-4">Treatments</p>
        <h1 className="title-xl">{category.title.toLowerCase()}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.9] text-ink/90">{category.intro}</p>
      </Reveal>

      <div className="container-x grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {category.subs.map((sub, i) => (
          <Reveal key={sub.slug} delay={(i % 3) * 90}>
            <TreatmentCard
              href={`/treatments/${category.slug}/${sub.slug}`}
              image={titleImage(sub.slug)}
              title={sub.name}
              description={sub.cardDesc}
              priority={i < 3}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
