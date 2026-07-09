import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TreatmentDetail from '@/components/TreatmentDetail';
import { getSubTreatment, treatmentParams, titleImage } from '@/lib/treatmentsPage';
import { getGalleryImages } from '@/lib/treatmentImages';

export function generateStaticParams() {
  return treatmentParams();
}

export function generateMetadata({ params }: { params: { category: string; treatment: string } }): Metadata {
  const found = getSubTreatment(params.category, params.treatment);
  if (!found) return {};
  const { sub } = found;
  return {
    title: sub.name,
    description: sub.description ?? sub.intro ?? sub.cardDesc,
  };
}

export default function TreatmentPage({ params }: { params: { category: string; treatment: string } }) {
  const found = getSubTreatment(params.category, params.treatment);
  if (!found) notFound();
  const { category, sub } = found;

  return (
    <TreatmentDetail
      breadcrumbs={[
        { label: 'Treatments', href: '/treatments' },
        { label: category.title, href: `/treatments/${category.slug}` },
        { label: sub.name },
      ]}
      image={titleImage(sub.slug)}
      name={sub.name}
      intro={sub.intro}
      description={sub.description}
      benefits={sub.benefits}
      note={sub.note}
      variants={sub.variants}
      galleryImages={getGalleryImages(sub.galleryKey)}
    />
  );
}
