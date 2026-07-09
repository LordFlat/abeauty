'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

type Cert = { src: string; alt: string; label: string };

const grid: Cert[] = [
  { src: '/images/about/cert-1.jpg', alt: 'Anastasia with her Lip Blush certification', label: 'Lip Blush — certified' },
  { src: '/images/about/cert-2.jpg', alt: 'Award-winning academy certificates of excellence', label: 'Certificates of Excellence' },
  { src: '/images/about/cert-3.jpg', alt: 'CPD accredited certificate of completion', label: 'CPD accredited training' },
  { src: '/images/about/cert-4.jpg', alt: 'Anastasia holding her completed course certificates', label: 'Continuous training' },
];

const award: Cert = {
  src: '/images/about/award-2024.jpg',
  alt: 'Certificate of Achievement — Anastasia Danitoiu, SPMU Artist of the Year, UK National Top 10, 2024',
  label: 'National Top 10 — 2024',
};

// Full ordered set used by the lightbox (grid first, award last).
const all: Cert[] = [...grid, award];

export default function CertificateGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setLightbox((i) => (i === null ? i : (i + dir + all.length) % all.length));
  }, []);

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
    <>
      {/* Four aligned certificate photos */}
      <Reveal delay={120}>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {grid.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View certificate: ${c.label}`}
              className="gallery-item group relative aspect-[4/5] overflow-hidden bg-ivory shadow-[0_18px_50px_-30px_rgba(59,48,39,0.6)] ring-1 ring-line/70 transition-all duration-700 hover:z-10 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(59,48,39,0.65)]"
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 23vw, 50vw"
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-center font-serif text-[12px] uppercase tracking-[0.14em] text-footer-text transition-transform duration-500 group-hover:translate-y-0">
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Featured 2024 award certificate */}
      <Reveal delay={150}>
        <div className="mt-10 grid items-center gap-8 bg-beige/50 p-6 sm:mt-14 sm:grid-cols-[auto,1fr] sm:gap-10 sm:p-10">
          <button
            type="button"
            onClick={() => setLightbox(all.length - 1)}
            aria-label="View the 2024 award certificate"
            className="group relative mx-auto aspect-[3/4] w-40 shrink-0 overflow-hidden shadow-[0_20px_50px_-25px_rgba(59,48,39,0.7)] ring-1 ring-gold/30 sm:w-48"
          >
            <Image
              src={award.src}
              alt={award.alt}
              fill
              sizes="12rem"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
          <div className="text-center sm:text-left">
            <p className="eyebrow">The UK Hair &amp; Beauty Awards 2024</p>
            <h3 className="heading-md mt-3 !text-left !text-[24px] max-sm:!text-center">
              national top 10 — spmu artist of the year
            </h3>
            <p className="body-copy mt-4 !text-center sm:!text-left">
              Recognised as an official national winner at the UK Hair and Beauty Awards — a reflection of
              the care, precision and continual training that goes into every single treatment.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox !== null && all[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
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
            aria-label="Previous certificate"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/70 transition-colors hover:text-white sm:block"
          >
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M33 9H2M9 1L2 9l7 8" />
            </svg>
          </button>

          <figure className="max-h-[88svh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={all[lightbox].src}
              alt={all[lightbox].alt}
              width={1200}
              height={1600}
              sizes="92vw"
              className="max-h-[82svh] w-auto object-contain"
              priority
            />
            <figcaption className="mt-4 text-center font-serif text-[12px] uppercase tracking-[0.12em] text-white/70">
              {all[lightbox].label} · {lightbox + 1} / {all.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next certificate"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/70 transition-colors hover:text-white sm:block"
          >
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1 9h31M25 1l7 8-7 8" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
