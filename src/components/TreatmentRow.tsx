import Link from 'next/link';
import Image from 'next/image';
import type { Treatment } from '@/lib/content';
import Reveal from '@/components/Reveal';

// Horizontal card, one per row; photo and text swap sides on alternating rows (example-cards.png).
export default function TreatmentRow({ treatment, flip }: { treatment: Treatment; flip: boolean }) {
  return (
    <Reveal>
      <article className="overflow-hidden bg-ivory shadow-[0_24px_60px_-30px_rgba(59,48,39,0.28)]">
        <div className="grid md:grid-cols-2">
          <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[26rem] ${flip ? 'md:order-2' : ''}`}>
            <Image src={treatment.cover} alt={treatment.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className={`flex flex-col justify-center gap-5 p-8 sm:p-12 ${flip ? 'md:order-1' : ''}`}>
            {treatment.subtitle && <p className="eyebrow">{treatment.subtitle}</p>}
            <h3 className="font-serif text-3xl lowercase leading-[1.15] text-ink sm:text-4xl">{treatment.name}</h3>
            <p className="body-copy">{treatment.description}</p>
            <Link href={`/treatments/${treatment.slug}`} className="link-arrow mt-1">
              {treatment.name}
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
