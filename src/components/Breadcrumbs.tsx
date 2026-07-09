import Link from 'next/link';
import { Fragment } from 'react';

type Crumb = { label: string; href?: string };

// Subtle breadcrumb trail for the treatments hierarchy. The last item is the
// current page (no link).
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 font-serif text-[11px] uppercase tracking-[0.14em] text-ink-soft">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${c.label}-${i}`}>
            {c.href && !last ? (
              <Link href={c.href} className="transition-colors hover:text-gold">
                {c.label}
              </Link>
            ) : (
              <span className={last ? 'text-gold' : undefined}>{c.label}</span>
            )}
            {!last && <span className="px-2 text-line">/</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
