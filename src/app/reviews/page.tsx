import type { Metadata } from 'next';
import Link from 'next/link';
import { reviews } from '@/lib/content';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'What clients say about AD Beauty — semi permanent makeup, facials, HIFU, brows and IPL in Evesham.',
};

export default function ReviewsPage() {
  return (
    <div className="container-x pb-24 pt-24 sm:pt-32">
      <Reveal className="mb-14 text-center">
        <p className="eyebrow mb-4">Kind words</p>
        <h1 className="title-xl">reviews</h1>
      </Reveal>
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
        {reviews.map((r, i) => (
          <Reveal key={r.author} delay={(i % 3) * 80}>
            <figure className="break-inside-avoid bg-ivory p-8">
              <blockquote className="font-serif text-[17px] lowercase leading-relaxed text-ink">“{r.text}”</blockquote>
              <figcaption className="mt-6 font-serif text-[12px] uppercase tracking-[0.12em] text-gold">
                {r.author}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 text-center">
        <p className="text-[14px] text-ink/90">Had a treatment at AD Beauty?</p>
        <Link href="/contact" className="link-arrow mt-3 justify-center">
          Share your experience
        </Link>
      </Reveal>
    </div>
  );
}
