'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Review } from '@/lib/content';

// Dark fading quote carousel with prev/next arrows, like the reference's testimonial block.
export default function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setVisible(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIndex((i) => (i + dir + reviews.length) % reviews.length);
        setVisible(true);
      }, 400);
    },
    [reviews.length]
  );

  useEffect(() => {
    const auto = setInterval(() => go(1), 7000);
    return () => {
      clearInterval(auto);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [go]);

  const review = reviews[index];

  return (
    <div className="relative flex min-h-[26rem] items-center bg-ink text-footer-text">
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous review"
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-footer-text/60 transition-colors hover:text-gold sm:left-10"
      >
        <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M33 9H2M9 1L2 9l7 8" />
        </svg>
      </button>

      <div className={`fade-swap container-x px-16 text-center sm:px-24 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="mx-auto max-w-2xl font-serif text-xl lowercase leading-relaxed sm:text-2xl">“{review.text}”</p>
        <p className="mt-8 font-serif text-[13px] uppercase tracking-[0.12em] text-gold">
          {review.author}
        </p>
      </div>

      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next review"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-footer-text/60 transition-colors hover:text-gold sm:right-10"
      >
        <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 9h31M25 1l7 8-7 8" />
        </svg>
      </button>
    </div>
  );
}
