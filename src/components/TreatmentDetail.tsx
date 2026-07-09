import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import BookNow from '@/components/BookNow';
import Breadcrumbs from '@/components/Breadcrumbs';
import VariantSwitcher from '@/components/VariantSwitcher';
import TreatmentGallery from '@/components/TreatmentGallery';
import type { Variant } from '@/lib/treatmentsPage';

type Crumb = { label: string; href?: string };

// Shared detail layout for both leaf categories (IPL, tattoo) and sub-treatments.
export default function TreatmentDetail({
  breadcrumbs,
  image,
  name,
  intro,
  description,
  benefits,
  note,
  variants,
  galleryImages = [],
}: {
  breadcrumbs: Crumb[];
  image: string;
  name: string;
  intro?: string;
  description?: string;
  benefits?: string[];
  note?: string;
  variants?: Variant[];
  galleryImages?: string[];
}) {
  return (
    <div className="pb-24 pt-24 sm:pt-32">
      <div className="container-x">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Header artwork (name baked in) */}
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h1 className="title-xl">{name.toLowerCase()}</h1>
            </Reveal>
            {intro && (
              <Reveal delay={100}>
                <p className="mt-3 font-serif text-xl italic leading-snug text-gold">{intro}</p>
              </Reveal>
            )}

            {variants && variants.length > 0 ? (
              <Reveal delay={160}>
                <div className="mt-7">
                  <VariantSwitcher variants={variants} />
                </div>
              </Reveal>
            ) : (
              <>
                {description && (
                  <Reveal delay={160}>
                    <p className="body-copy mt-6 max-w-2xl">{description}</p>
                  </Reveal>
                )}
                {benefits && benefits.length > 0 && (
                  <Reveal delay={220}>
                    <p className="mt-6 font-serif text-[11px] uppercase tracking-[0.16em] text-gold">Benefits</p>
                    <ul className="mt-3 grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-2">
                      {benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-ink/90">
                          <span className="mt-[9px] h-px w-3 shrink-0 bg-gold" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </>
            )}

            {note && (
              <Reveal delay={280}>
                <div className="mt-8 border-l border-gold/50 pl-4">
                  <p className="font-serif text-[11px] uppercase tracking-[0.16em] text-gold">Please note</p>
                  <p className="mt-1.5 max-w-2xl text-[13px] italic leading-[1.7] text-ink-soft">{note}</p>
                </div>
              </Reveal>
            )}

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookNow variant="gold" />
                <Link href="/consultation" className="btn-outline">
                  Book a consultation
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Example gallery — only when a matching photo folder exists */}
        {galleryImages.length > 0 && (
          <Reveal className="mt-14">
            <TreatmentGallery images={galleryImages} label={name} />
          </Reveal>
        )}
      </div>
    </div>
  );
}
