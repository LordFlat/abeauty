'use client';

import { useEffect, useRef, useState } from 'react';
import type { Variant } from '@/lib/treatmentsPage';

// Level-3 techniques (e.g. Powder / Combo / Stroke) shown as a dropdown on the
// level-2 page — switching the copy in place, no separate URLs.
export default function VariantSwitcher({ variants }: { variants: Variant[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const current = variants[active];

  return (
    <div>
      <p className="mb-2 font-serif text-[11px] uppercase tracking-[0.16em] text-gold">Choose your technique</p>
      <div ref={ref} className="relative max-w-sm">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 border border-ink/25 bg-ivory px-4 py-3 text-left font-serif text-[16px] lowercase tracking-wide text-ink transition-colors hover:border-gold"
        >
          {current.name.toLowerCase()}
          <svg
            width="11"
            height="7"
            viewBox="0 0 9 6"
            fill="none"
            className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-20 mt-1 w-full border border-line bg-ivory shadow-[0_18px_40px_-18px_rgba(59,48,39,0.4)]"
          >
            {variants.map((v, i) => (
              <li key={v.slug} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left font-serif text-[15px] lowercase tracking-wide transition-colors hover:bg-beige/60 ${
                    i === active ? 'text-gold' : 'text-ink'
                  }`}
                >
                  {v.name.toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected technique copy */}
      <div className="mt-7">
        <h3 className="font-serif text-[22px] lowercase tracking-wide text-ink">{current.name.toLowerCase()}</h3>
        <p className="body-copy mt-3 max-w-2xl">{current.description}</p>

        {current.benefits && current.benefits.length > 0 && (
          <>
            <p className="mt-6 font-serif text-[11px] uppercase tracking-[0.16em] text-gold">Benefits</p>
            <ul className="mt-3 grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-2">
              {current.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-ink/90">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-gold" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
