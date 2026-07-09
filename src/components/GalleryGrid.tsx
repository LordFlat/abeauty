'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/content';

export default function GalleryGrid({
  images,
  categories,
  initialCategory = 'all',
}: {
  images: GalleryImage[];
  categories: string[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState<string>(initialCategory);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const filtered = active === 'all' ? images : images.filter((i) => i.category === active);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));
    },
    [filtered.length]
  );

  // keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {['all', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActive(cat);
              setLightbox(null);
            }}
            className={`px-5 py-2 font-serif text-[13px] uppercase tracking-[0.1em] transition-colors ${
              active === cat ? 'bg-ink text-footer-text' : 'border border-ink/50 text-ink hover:border-ink/25 hover:text-ink/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Uniform vertical rectangles, three per row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Open photo: ${img.alt}`}
            className="gallery-item block aspect-[4/5] overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={640}
              height={800}
              sizes="(min-width: 640px) 33vw, 50vw"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 p-2 text-white/80 transition-colors hover:text-white"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/70 transition-colors hover:text-white sm:block"
          >
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M33 9H2M9 1L2 9l7 8" />
            </svg>
          </button>

          <figure className="max-h-[88svh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              width={1200}
              height={1500}
              sizes="92vw"
              className="max-h-[82svh] w-auto object-contain"
              priority
            />
            <figcaption className="mt-4 text-center font-serif text-[12px] uppercase tracking-[0.12em] text-white/70">
              {lightbox + 1} / {filtered.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/70 transition-colors hover:text-white sm:block"
          >
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1 9h31M25 1l7 8-7 8" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
