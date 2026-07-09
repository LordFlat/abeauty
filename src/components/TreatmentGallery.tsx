'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// A small, elegant example gallery for a single treatment: clean grid,
// subtle hover zoom (.gallery-item) and a lightweight lightbox.
export default function TreatmentGallery({ images, label }: { images: string[]; label: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length));
    },
    [images.length]
  );

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

  if (!images.length) return null;

  // One photo reads best as a single refined frame; two or more as a grid.
  const single = images.length === 1;

  return (
    <div className="mt-6">
      <p className="mb-4 font-serif text-[11px] uppercase tracking-[0.16em] text-gold">Examples</p>
      <div
        className={
          single
            ? 'max-w-sm'
            : 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4'
        }
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Open ${label} photo ${i + 1}`}
            className="gallery-item block aspect-[4/5] overflow-hidden bg-beige"
          >
            <Image
              src={src}
              alt={`${label} — example ${i + 1}`}
              width={560}
              height={700}
              sizes="(min-width: 640px) 30vw, 50vw"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} photo viewer`}
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

          {images.length > 1 && (
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
          )}

          <figure className="max-h-[88svh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightbox]}
              alt={`${label} — example ${lightbox + 1}`}
              width={1100}
              height={1375}
              sizes="92vw"
              className="max-h-[82svh] w-auto object-contain"
              priority
            />
            <figcaption className="mt-4 text-center font-serif text-[12px] uppercase tracking-[0.12em] text-white/70">
              {label} · {lightbox + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
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
          )}
        </div>
      )}
    </div>
  );
}
