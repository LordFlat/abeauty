import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import TreatmentCard from '@/components/TreatmentCard';
import { treatmentCategories, treatmentsIntro, titleImage } from '@/lib/treatmentsPage';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Semi-permanent makeup, advanced facials, HIFU, brows & waxing, IPL laser hair removal and laser tattoo removal in Evesham — lip blush, powder, combo & stroke brows and semi-permanent eyeliner by Anastasia Danitoiu.',
  keywords: [
    'semi-permanent makeup Evesham',
    'lip blush',
    'powder brows',
    'combo brows',
    'semi-permanent eyeliner',
    'HIFU face lift',
    'carbon facial',
    'brow lamination',
    'lash lift',
    'IPL laser hair removal',
    'laser tattoo removal',
  ],
};

export default function TreatmentsPage() {
  return (
    <div className="pb-24 pt-24 sm:pt-32">
      {/* Intro */}
      <Reveal className="container-x mb-14 max-w-3xl text-center sm:mb-20">
        <p className="eyebrow mb-4">{treatmentsIntro.eyebrow}</p>
        <h1 className="title-xl">{treatmentsIntro.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.9] text-ink/90">{treatmentsIntro.body}</p>
      </Reveal>

      {/* Six category covers */}
      <div className="container-x grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {treatmentCategories.map((category, i) => (
          <Reveal key={category.slug} delay={(i % 3) * 90}>
            <TreatmentCard
              href={`/treatments/${category.slug}`}
              image={titleImage(category.slug)}
              title={category.title}
              description={category.cardDesc}
              priority={i < 3}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
