import type { PriceSection } from '@/lib/content';

// Dark, gold-accented price table styled after the clinic's own printed menu (option.jpg).
export default function PriceList({ sections }: { sections: PriceSection[] }) {
  return (
    <div className="bg-footer-bg p-6 text-footer-text sm:p-12">
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="break-inside-avoid">
            <h3 className="border-b border-gold/40 pb-2 font-serif text-[15px] uppercase tracking-[0.14em] text-gold">
              {section.title}
            </h3>
            {section.columns && (
              <div className="flex items-baseline justify-end gap-8 pt-3 text-[10px] uppercase tracking-[0.12em] text-footer-text/50">
                {section.columns.map((c) => (
                  <span key={c} className="w-16 text-right">
                    {c}
                  </span>
                ))}
              </div>
            )}
            <ul className="mt-2 divide-y divide-footer-text/10">
              {section.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-6 py-2.5">
                  <span className="text-[14px] text-footer-text/90">{item.name}</span>
                  <span className="flex shrink-0 items-baseline gap-8 whitespace-nowrap">
                    <span className="w-16 text-right font-serif text-[15px] text-gold">{item.price}</span>
                    {section.columns && (
                      <span className="w-16 text-right font-serif text-[15px] text-footer-text/60">{item.pack6 ?? '—'}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {section.note && <p className="mt-3 text-[12px] italic text-gold/80">{section.note}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}
