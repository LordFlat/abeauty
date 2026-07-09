'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { site, nav } from '@/lib/site';
import { categories } from '@/lib/categories';
import BookNow from '@/components/BookNow';
import SocialLinks from '@/components/SocialLinks';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [treatmentsOpen, setTreatmentsOpen] = useState(false); // mobile accordion
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setTreatmentsOpen(false);
    // Every route change lands at the very top (SmoothScroll resets scroll),
    // so drop the previous page's "scrolled" state instead of keeping it —
    // otherwise the header stays in its solid/scrolled look while at the top.
    if (typeof window === 'undefined' || !window.location.hash) setScrolled(false);
  }, [pathname]);

  // On the home hero the header sits over a dark photo → light text, like the reference.
  const overDark = pathname === '/' && !scrolled && !open;
  const linkColor = overDark ? 'text-footer-text hover:text-beige' : 'text-ink hover:text-gold';

  // Small logo: hidden while over the hero, revealed once scrolled; always shown on inner pages.
  // Clicking it always returns to the top of the homepage.
  const goHomeTop = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const l = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
      if (l) l.scrollTo(0, { duration: 1.1, force: true });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-cream/95 shadow-[0_1px_0_0_#D9CFC3] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-x relative flex h-16 items-center justify-center gap-6 sm:h-20">
        {/* Small logo — links home & scrolls to the top; fades in once past the hero. */}
        <Link
          href="/"
          onClick={goHomeTop}
          aria-label={`${site.name} — home`}
          className={`absolute left-0 flex items-center transition-opacity duration-500 ${
            overDark ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src="/images/logo-dark.png"
            alt={site.name}
            width={430}
            height={242}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* desktop nav — centred */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 font-serif text-[14px] uppercase tracking-[0.08em] transition-colors ${linkColor} ${
                    pathname.startsWith('/treatments') && !overDark ? '!text-gold' : ''
                  }`}
                >
                  {item.label}
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="transition-transform duration-300 group-hover:rotate-180">
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[16rem] bg-ivory p-3 shadow-[0_18px_40px_-18px_rgba(59,48,39,0.4)]">
                    {categories.map((c) =>
                      c.treatments.length > 1 ? (
                        <div key={c.slug} className="py-1">
                          <p className="px-3 pb-1 pt-2 font-serif text-[11px] uppercase tracking-[0.14em] text-gold">{c.menuLabel}</p>
                          {c.treatments.map((t) => (
                            <Link
                              key={t.slug}
                              href={`/treatments/${t.slug}`}
                              className="block whitespace-nowrap px-3 py-1.5 text-[13px] text-ink transition-colors hover:text-gold"
                            >
                              {t.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={c.slug}
                          href={`/treatments/${c.treatments[0].slug}`}
                          className="block whitespace-nowrap px-3 py-2 font-serif text-[12px] uppercase tracking-[0.1em] text-ink transition-colors hover:text-gold"
                        >
                          {c.menuLabel}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`font-serif text-[14px] uppercase tracking-[0.08em] transition-colors ${linkColor} ${
                  pathname === item.href && !overDark ? '!text-gold' : ''
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <SocialLinks size={18} className="gap-3.5" linkClassName={linkColor} />
          <BookNow variant={overDark ? 'light' : 'dark'} className="!px-5 !py-2.5" />
        </nav>

        {/* mobile burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="absolute right-0 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 transition-transform duration-300 ${overDark ? 'bg-footer-text' : 'bg-ink'} ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 transition-transform duration-300 ${overDark ? 'bg-footer-text' : 'bg-ink'} ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-line bg-cream transition-all duration-500 lg:hidden ${
          open ? 'max-h-[calc(100dvh-4rem)] overflow-y-auto border-t sm:max-h-[calc(100dvh-5rem)]' : 'max-h-0'
        }`}
      >
        <nav className="container-x flex flex-col py-4">
          {nav.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="border-b border-line/70">
                <button
                  type="button"
                  onClick={() => setTreatmentsOpen((v) => !v)}
                  aria-expanded={treatmentsOpen}
                  className="flex w-full items-center justify-between py-4 text-left font-serif text-[15px] uppercase tracking-[0.08em] text-ink"
                >
                  {item.label}
                  <svg width="10" height="7" viewBox="0 0 9 6" fill="none" className={`transition-transform duration-300 ${treatmentsOpen ? 'rotate-180' : ''}`}>
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${treatmentsOpen ? 'max-h-[40rem] pb-3' : 'max-h-0'}`}>
                  <Link href="/treatments" className="block py-2 pl-4 font-serif text-[13px] uppercase tracking-[0.08em] text-gold">
                    All treatments
                  </Link>
                  {categories.map((c) =>
                    c.treatments.length > 1 ? (
                      <div key={c.slug} className="pl-4">
                        <p className="py-2 font-serif text-[11px] uppercase tracking-[0.14em] text-gold/80">{c.menuLabel}</p>
                        {c.treatments.map((t) => (
                          <Link key={t.slug} href={`/treatments/${t.slug}`} className="block py-1.5 pl-3 text-[13px] text-ink/80">
                            {t.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={c.slug}
                        href={`/treatments/${c.treatments[0].slug}`}
                        className="block py-2 pl-4 font-serif text-[13px] uppercase tracking-[0.08em] text-ink/80"
                      >
                        {c.menuLabel}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line/70 py-4 font-serif text-[15px] uppercase tracking-[0.08em] text-ink"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="py-5">
            <BookNow className="w-full" />
          </div>
          <div className="flex justify-center pb-4">
            <SocialLinks className="gap-6" linkClassName="text-ink/80 hover:text-gold" />
          </div>
        </nav>
      </div>
    </header>
  );
}
