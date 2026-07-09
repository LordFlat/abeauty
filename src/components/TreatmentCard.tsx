import Link from 'next/link';
import Image from 'next/image';

// Editorial "cover" card used at every level: the artwork (with the name baked in)
// on top, then a slim bordered caption strip with a short description + a gold cue.
// The whole card is a link to the next level. Straight corners, thin borders.
export default function TreatmentCard({
  href,
  image,
  title,
  description,
  priority = false,
}: {
  href: string;
  image: string;
  /** Used for the image alt only — no visible duplicate title (it's in the artwork). */
  title: string;
  description: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-line bg-ivory transition-colors duration-500 hover:border-gold"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 transition-colors duration-500 group-hover:border-gold/60">
        <p className="text-[13px] leading-[1.5] text-ink-soft">{description}</p>
        <span
          aria-hidden
          className="mt-0.5 shrink-0 translate-x-0 text-gold transition-transform duration-500 group-hover:translate-x-1"
        >
          <svg width="26" height="10" viewBox="0 0 26 10" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M1 5h23M20 1l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
