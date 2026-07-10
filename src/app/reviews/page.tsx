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
        <Link href="https://www.google.com/search?client=safari&hs=iYt&sca_esv=30a5fb343c9df574&hl=en-gb&sxsrf=APpeQnvcttv816nNpzrcfVSGRsjwEH8V3w:1783629554260&q=worcester+beauty+clinic+reviews&uds=AJ5uw19AuqHQ7wIS8mCgCgwjE413yaarW8zIlOCA7AFG8n4x8haFr-Fae4AIydDX0CSC7cduFLB6I6Vz-gYC7GgfG2iL_j-c33wXY_Mos30DZ7NNil4ljF6PM50kyqqQdsg5iATPFX3fZRCbDf_htaSRDESHQ5zDBC8TkTgPLx0FDicHLdCQj6TsFwhM6vdy9wGqL-O5mNmEEioDOMRkMFigg9aP3bjicvQou9f_ZHyt8M9FmkwGWOAkT38HpgYld13Joxm9b_LyqFfQZuKEB0_PRMyPnovQpt18ShU4zTls-HGthJpOStIqLAsEMT32K19HWcGzNF7dzwb6hBBJ0Ys9u3w0PzL44irzuDWYy5XBncbAe___-OZDDZqxDdfN4E9lYHIt9YfAC5b_fVi_IwNIdV3fPV9wnAGFy-LJsfWGiOGok1lgypSt6fIkVg0VEp7T4KhWec4jZ9x_43gEwCuJ3v63rwoFRQ&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_7qznGilVKYedBcI3Q395aHcUn6JOgJ3iGjAm6hNl9N9q_r-ixL94UqAFgy5K_jQWkSPSFr3o77qzqbSQYHpCuUbp00iuyhhm5b56n47_u8qoIt9hg%3D%3D&sa=X&ved=2ahUKEwiOgPjvucaVAxUnT0EAHW3lDEwQk8gLegQIHRAB&ictx=1&stq=1&cs=0&lei=8gZQao6_D6eehbIP7cqz4AQ#ebo=3" className="link-arrow mt-3 justify-center">
          Share your experience
        </Link>
      </Reveal>
    </div>
  );
}
